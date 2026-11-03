import 'server-only';
import { requireStaff } from '@/lib/staff';
import { progressSummary } from './progress';
import { authUsers } from './accounts';
import { publishedModules } from '@/lib/training-content';
import { buildCourse } from '@/content/parcours/course';
import { effectiveStatus } from '@/lib/labels';

export const PAGE_SIZE = 25;
export const safeSearch = (q: string) => q.replace(/[^\p{L}\p{N}@ ._+-]/gu, ' ').trim().slice(0, 100);
export const validUuid = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
export const learnerName = (p: { first_name: string | null; last_name: string | null; email: string }) => [p.first_name, p.last_name].filter(Boolean).join(' ') || p.email;

type EnrollmentLite = { id: string; formule: string; status: string; starts_at: string | null; ends_at: string | null; created_at: string };
type Raw = {
  id: string; email: string; first_name: string | null; last_name: string | null; phone: string | null; city: string | null; created_at: string;
  learner_progress: { snapshot: unknown; updated_at: string } | null;
  enrollments: EnrollmentLite[];
  level_test_results: { level: string; created_at: string }[];
};

/** Access state shown in lists: the most relevant pack of the learner. */
export type Access = 'active' | 'scheduled' | 'pending' | 'expired' | 'cancelled' | 'none';
export const accessLabel: Record<Access, string> = {
  active: 'Pack actif', scheduled: 'Pack à venir', pending: 'Paiement en attente', expired: 'Pack terminé', cancelled: 'Annulé', none: 'Compte gratuit',
};
const rank: Access[] = ['active', 'scheduled', 'pending', 'expired', 'cancelled'];

export interface LearnerFilters { q?: string; pack?: string; statut?: string; ville?: string; niveau?: string }
export const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

/** All candidates with their pack, level, progress and last activity (small volumes: filtered in memory). */
export async function learnerDirectory(filters: LearnerFilters = {}) {
  const { supabase } = await requireStaff('/admin/apprenants/');
  const course = buildCourse(await publishedModules());
  const raw: Raw[] = [];
  let error = null;
  for (let from = 0; from < 20000; from += 1000) {
    const res = await supabase
      .from('profiles')
      .select('id,email,first_name,last_name,phone,city,created_at,learner_progress(snapshot,updated_at),enrollments!enrollments_user_id_fkey(id,formule,status,starts_at,ends_at,created_at),level_test_results(level,created_at)')
      .eq('role', 'candidate')
      .order('created_at', { ascending: false })
      .range(from, from + 999)
      .returns<Raw[]>();
    if (res.error) { error = res.error; break; }
    raw.push(...(res.data ?? []));
    if ((res.data ?? []).length < 1000) break;
  }
  const auth = await authUsers();

  const rows = raw.map((p) => {
    const states = p.enrollments.map((e) => ({ ...e, state: effectiveStatus(e) as Access }));
    const current = states.sort((a, b) => rank.indexOf(a.state) - rank.indexOf(b.state) || b.created_at.localeCompare(a.created_at))[0] ?? null;
    const level = [...p.level_test_results].sort((a, b) => b.created_at.localeCompare(a.created_at))[0]?.level ?? null;
    const a = auth.get(p.id);
    const lastActive = [p.learner_progress?.updated_at, a?.lastSignIn].filter(Boolean).sort().at(-1) ?? null;
    return {
      ...p,
      summary: progressSummary(p.learner_progress?.snapshot, course),
      access: (current?.state ?? 'none') as Access,
      pack: current && current.state !== 'cancelled' ? current.formule : null,
      current,
      level,
      lastActive,
      disabled: a?.disabled ?? false,
    };
  });

  const q = safeSearch(filters.q ?? '').toLowerCase();
  const city = safeSearch(filters.ville ?? '').toLowerCase();
  const filtered = rows.filter((r) =>
    (!q || [r.email, r.first_name, r.last_name, r.phone].some((v) => v?.toLowerCase().includes(q))) &&
    (!filters.pack || (filters.pack === 'aucun' ? !r.pack : r.pack === filters.pack)) &&
    (!filters.statut || (filters.statut === 'desactive' ? r.disabled : r.access === filters.statut)) &&
    (!city || r.city?.toLowerCase().includes(city)) &&
    (!filters.niveau || (filters.niveau === 'aucun' ? !r.level : r.level?.startsWith(filters.niveau))),
  );
  return { rows: filtered, total: rows.length, error };
}

export type DirectoryRow = Awaited<ReturnType<typeof learnerDirectory>>['rows'][number];

export async function learnerPage(filters: LearnerFilters, page = 0) {
  const d = await learnerDirectory(filters);
  return { count: d.rows.length, error: d.error, rows: d.rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE) };
}

/** Days since a date (null when unknown). */
export const daysSince = (iso: string | null) => (iso ? Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000) : null);
