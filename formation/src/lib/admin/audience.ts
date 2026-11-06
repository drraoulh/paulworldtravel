import 'server-only';
import { effectiveStatus } from '@/lib/labels';
import { authUsers, service, type Recipient } from './accounts';

export type Audience = 'tous' | 'pack' | 'gratuit';
export const audienceName: Record<Audience, string> = {
  tous: 'Tous les apprenants',
  pack: 'Apprenants avec un pack actif',
  gratuit: 'Apprenants sans pack (compte gratuit)',
};

/** Learners who can receive a group email: candidates only, suspended accounts left out. */
export async function audiences() {
  const admin = service();
  const [{ data: profiles }, { data: enrollments }, auth] = await Promise.all([
    admin.from('profiles').select('id, email, first_name').eq('role', 'candidate'),
    admin.from('enrollments').select('user_id, status, starts_at, ends_at'),
    authUsers(),
  ]);
  const withPack = new Set((enrollments ?? []).filter((e) => effectiveStatus(e) === 'active').map((e) => e.user_id));
  const all = (profiles ?? []).filter((p) => p.email && !auth.get(p.id)?.disabled);
  const pick = (ids: (p: { id: string }) => boolean): Recipient[] => all.filter(ids).map((p) => ({ email: p.email, first_name: p.first_name }));
  return {
    tous: pick(() => true),
    pack: pick((p) => withPack.has(p.id)),
    gratuit: pick((p) => !withPack.has(p.id)),
  } satisfies Record<Audience, Recipient[]>;
}
