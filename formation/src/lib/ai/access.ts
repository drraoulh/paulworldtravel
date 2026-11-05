import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { effectiveStatus } from '@/lib/enrollment';
import { FREE_TRIAL, packs } from '@/content/offers';
import { TranscriptionError } from './huggingface';

export type Feature = 'writing' | 'speaking' | 'tutor' | 'generate';
export type Plan = 'trial' | 'active' | 'staff';

export const LIMITS: Record<Plan, Record<Feature, number>> = {
  trial: { ...FREE_TRIAL, generate: 0 },
  active: { writing: 0, speaking: 0, tutor: 0, generate: 0 },
  staff: { writing: 10, speaking: 5, tutor: 50, generate: 10 },
};
export const FEATURE_LABEL: Record<Feature, string> = {
  writing: 'corrections écrites', speaking: 'corrections orales',
  tutor: 'messages au tuteur', generate: 'générations de contenu',
};
const sinceYesterday = () => new Date(Date.now() - 86_400_000).toISOString();

export class AccessError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export async function accountAccess() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new AccessError(401, 'Connectez-vous pour utiliser cette fonction.');
  const admin = createAdminClient();
  if (!admin) throw new AccessError(503, 'Cette fonction n’est pas encore activée.');

  const [profile, enrollments] = await Promise.all([
    admin.from('profiles').select('role,first_name').eq('id', user.id).single(),
    admin.from('enrollments').select('id,formule,status,starts_at,ends_at,created_at').eq('user_id', user.id),
  ]);
  if (profile.error || enrollments.error) {
    throw new AccessError(503, 'Impossible de vérifier votre accès. Réessayez plus tard.');
  }
  const staff = profile.data?.role === 'admin' || profile.data?.role === 'trainer';
  const active = (enrollments.data ?? []).filter((e) => effectiveStatus(e) === 'active');
  // Unknown or legacy enrollment names do not grant an arbitrary AI allowance.
  const pack = packs.filter((p) => active.some((e) => e.formule === p.id))
    .sort((a, b) => b.ai.writing - a.ai.writing || b.ai.tutor - a.ai.tutor)[0] ?? null;
  const plan: Plan = staff ? 'staff' : active.length ? 'active' : 'trial';
  const enrollment = active.filter((e) => e.formule === pack?.id)
    .sort((a, b) => String(b.starts_at ?? b.created_at).localeCompare(String(a.starts_at ?? a.created_at)))[0] ?? null;
  return { user, admin, plan, pack, enrollment, role: profile.data?.role, firstName: profile.data?.first_name ?? null };
}

/** Also checked on existing oral tickets, without consuming a second allowance. */
export async function requireAiEntitlement() {
  const access = await accountAccess();
  if (access.plan !== 'staff' && !access.pack) {
    throw new AccessError(403, 'L’IA est réservée aux packs payants actifs. Le compte gratuit ne comprend pas d’accès à l’IA.');
  }
  return access;
}

export function examAllowance(account: Awaited<ReturnType<typeof requireAiEntitlement>>) {
  return account.plan === 'staff'
    ? { limit: 24, enrollmentId: null, days: 30 }
    : { limit: account.pack!.mockExams, enrollmentId: account.enrollment!.id, days: account.pack!.days };
}

export async function examStatus(account: Awaited<ReturnType<typeof requireAiEntitlement>>) {
  const allowance = examAllowance(account);
  if (account.plan !== 'staff' && !allowance.enrollmentId) throw new AccessError(503, 'Impossible de vérifier votre pack.');
  let query = account.admin.from('ai_exam_sessions').select('id', { count: 'exact', head: true }).eq('user_id', account.user.id);
  query = allowance.enrollmentId ? query.eq('enrollment_id', allowance.enrollmentId) : query.is('enrollment_id', null).gte('created_at', new Date(Date.now() - 30 * 86400000).toISOString());
  const result = await query;
  if (result.error || result.count === null) throw new AccessError(503, 'Impossible de vérifier vos crédits d’examen blanc.');
  return { remaining: Math.max(0, allowance.limit - result.count), limit: allowance.limit, days: allowance.days };
}

export async function accessStatus() {
  let access;
  try {
    access = await accountAccess();
  } catch (e) {
    if (e instanceof AccessError && e.status === 401) return null;
    throw e;
  }
  const { admin, user, plan, pack, enrollment, firstName } = access;
  const remaining = { writing: 0, speaking: 0, tutor: 0 };
  if (plan === 'staff' || pack) {
    await Promise.all((['writing', 'speaking', 'tutor'] as const).map(async (feature) => {
      const result = await admin.from('ai_usage').select('id', { count: 'exact', head: true })
        .eq('user_id', user.id).eq('feature', feature).gte('created_at', sinceYesterday());
      if (result.error || result.count === null) throw new AccessError(503, 'Impossible de vérifier votre quota.');
      const limit = plan === 'staff' ? LIMITS.staff[feature] : pack!.ai[feature];
      remaining[feature] = Math.max(0, limit - result.count);
    }));
  }
  const exams = plan === 'staff' || pack ? await examStatus(access) : { remaining: 0, limit: 0, days: 0 };
  return { plan, pack: pack?.id ?? null, endsAt: enrollment?.ends_at ?? null, firstName, remaining, exams, configured: true, aiAllowed: plan === 'staff' || Boolean(pack) };
}

export async function checkAccess(feature: Feature) {
  const access = await requireAiEntitlement();
  const { admin, user, plan, pack } = access;
  if (feature === 'generate' && access.role !== 'admin') throw new AccessError(403, 'Réservé aux administrateurs.');
  const limit = plan === 'staff' ? LIMITS.staff[feature] : feature === 'generate' ? 0 : pack!.ai[feature];
  const usage = await admin.from('ai_usage').select('id', { count: 'exact', head: true })
    .eq('user_id', user.id).eq('feature', feature).gte('created_at', sinceYesterday());
  if (usage.error || usage.count === null) throw new AccessError(503, 'Impossible de vérifier votre quota.');
  if (usage.count >= limit) {
    throw new AccessError(429, `Quota atteint pour les dernières 24 h (${limit} ${FEATURE_LABEL[feature]}). Réessayez lorsque vos utilisations précédentes auront expiré.`);
  }
  return {
    ...access,
    remaining: limit - usage.count - 1,
    record: () => admin.from('ai_usage').insert({ user_id: user.id, feature }),
  };
}

export function errorResponse(error: unknown) {
  if (error instanceof AccessError) return Response.json({ error: error.message }, { status: error.status });
  if (error instanceof TranscriptionError) return Response.json({ error: error.message }, { status: 503 });
  console.error('AI route failed', error);
  return Response.json({ error: 'Le service est momentanément indisponible. Réessayez dans quelques minutes.' }, { status: 502 });
}
