import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { effectiveStatus } from '@/lib/enrollment';

export type Feature = 'writing' | 'speaking' | 'tutor' | 'generate';
export type Plan = 'trial' | 'active' | 'staff';

/*
 * Usage limits. Trial = signed-in candidate without an active enrolment:
 * a lifetime allowance to try the AI. Active and staff limits are per day.
 */
export const LIMITS: Record<Plan, Record<Feature, number>> = {
  trial: { writing: 2, speaking: 1, tutor: 15, generate: 0 },
  active: { writing: 6, speaking: 4, tutor: 60, generate: 0 },
  staff: { writing: 50, speaking: 30, tutor: 300, generate: 40 },
};

export const FEATURE_LABEL: Record<Feature, string> = {
  writing: 'corrections d’expression écrite',
  speaking: 'corrections d’expression orale',
  tutor: 'messages au tuteur',
  generate: 'générations de contenu',
};

export class AccessError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Signed-in user, plan and remaining allowance for a feature. Throws AccessError. */
export async function checkAccess(feature: Feature) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new AccessError(401, 'Connectez-vous pour utiliser cette fonction.');

  const admin = createAdminClient();
  if (!admin) throw new AccessError(503, 'Cette fonction n’est pas encore activée.');

  const [{ data: profile }, { data: enrollments }] = await Promise.all([
    admin.from('profiles').select('role, first_name').eq('id', user.id).single(),
    admin.from('enrollments').select('status, starts_at, ends_at').eq('user_id', user.id),
  ]);
  const staff = profile?.role === 'admin' || profile?.role === 'trainer';
  const active = (enrollments ?? []).some((e) => effectiveStatus(e) === 'active');
  const plan: Plan = staff ? 'staff' : active ? 'active' : 'trial';
  if (feature === 'generate' && profile?.role !== 'admin') throw new AccessError(403, 'Réservé aux administrateurs.');

  let query = admin.from('ai_usage').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('feature', feature);
  if (plan !== 'trial') query = query.gte('created_at', new Date(Date.now() - 86_400_000).toISOString());
  const { count } = await query;
  const limit = LIMITS[plan][feature];
  const used = count ?? 0;
  if (used >= limit) {
    throw new AccessError(
      429,
      plan === 'trial'
        ? `Votre essai gratuit est terminé (${limit} ${FEATURE_LABEL[feature]}). Activez votre formule pour continuer.`
        : `Limite atteinte pour aujourd’hui (${limit} ${FEATURE_LABEL[feature]}). Revenez demain.`
    );
  }

  return {
    user,
    admin,
    plan,
    firstName: profile?.first_name ?? null,
    remaining: limit - used - 1,
    record: () => admin.from('ai_usage').insert({ user_id: user.id, feature }),
  };
}

export function errorResponse(error: unknown) {
  if (error instanceof AccessError) return Response.json({ error: error.message }, { status: error.status });
  console.error('AI route failed', error);
  return Response.json({ error: 'Le service est momentanément indisponible. Réessayez dans quelques minutes.' }, { status: 502 });
}
