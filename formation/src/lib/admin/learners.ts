import 'server-only';
import { requireStaff } from '@/lib/staff';
import { progressSummary } from './progress';
import { publishedModules } from '@/lib/training-content';
import { buildCourse } from '@/content/parcours/course';
export const PAGE_SIZE = 25;
export const safeSearch = (q: string) => q.replace(/[^\p{L}\p{N}@ ._+-]/gu, ' ').trim().slice(0, 100);
export const validUuid = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
export type LearnerRow = { id: string; email: string; first_name: string | null; last_name: string | null; phone: string | null; city: string | null; created_at: string; learner_progress: { snapshot: unknown; updated_at: string } | null };
export async function learnerPage(q = '', page = 0) {
  const { supabase } = await requireStaff('/admin/apprenants/');
  const course = buildCourse(await publishedModules());
  let query = supabase.from('profiles').select('id,email,first_name,last_name,phone,city,created_at,learner_progress(snapshot,updated_at)', { count: 'exact' }).eq('role', 'candidate');
  const search = safeSearch(q);
  if (search) query = query.or(`email.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%`);
  const { data, count, error } = await query.order('created_at', { ascending: false }).range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1).returns<LearnerRow[]>();
  return { count: count ?? 0, error, rows: (data ?? []).map((p) => ({ ...p, summary: progressSummary(p.learner_progress?.snapshot, course) })) };
}
export const learnerName = (p: { first_name: string | null; last_name: string | null; email: string }) => [p.first_name, p.last_name].filter(Boolean).join(' ') || p.email;
