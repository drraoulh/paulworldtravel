'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/staff';
import { modules } from '@/content/parcours';
import { validateLesson, lessonKeyValid } from '@/lib/admin/lesson-validation';
export type LessonSaveState = { ok: boolean; message: string; revision: number };
export async function saveLesson(previous: LessonSaveState, form: FormData): Promise<LessonSaveState> {
  const { supabase, user } = await requireAdmin('/admin/lecons/');
  const id = String(form.get('id') ?? '');
  const revision = Number(form.get('revision'));
  const intent = String(form.get('intent'));
  const fail = (message: string, savedRevision = previous.revision): LessonSaveState => ({ ok: false, message, revision: savedRevision });
  if (!lessonKeyValid(id) || !Number.isSafeInteger(revision) || revision < 0 || !['draft','publish'].includes(intent)) return fail('La demande est invalide. Rechargez la page.');
  const raw = String(form.get('content') ?? '');
  if (new TextEncoder().encode(raw).length > 131072) return fail('Cette leçon est trop volumineuse. Réduisez le contenu.');
  let content: unknown;
  try { content = JSON.parse(raw); } catch { return fail('Le contenu ne peut pas être lu.'); }
  const checked = validateLesson(content);
  if (!checked.lesson) return fail(checked.error);
  if (id.split('/')[1] !== checked.lesson.slug) return fail('L’adresse de la leçon ne peut pas être modifiée.');
  if (form.get('creating') === 'yes' && modules.some((m) => m.lessons.some((l) => `${m.id}/${l.slug}` === id))) return fail('Cette adresse existe déjà dans le catalogue. Modifiez la leçon existante.');
  const nextRevision = revision + 1;
  const values = { content: checked.lesson, revision: nextRevision, updated_by: user.id };
  const saved = revision === 0
    ? await supabase.from('lesson_drafts').insert({ id, ...values }).select('revision').single()
    : await supabase.from('lesson_drafts').update(values).eq('id', id).eq('revision', revision).select('revision').single();
  if (saved.error || !saved.data) return fail(saved.error?.code === '23505' || saved.error?.code === 'PGRST116' ? 'Une autre version existe. Rechargez la page avant d’enregistrer pour préserver les modifications.' : 'L’enregistrement a échoué. Vérifiez votre connexion puis réessayez.');
  if (intent === 'publish') {
    const { error } = await supabase.rpc('publish_training_lesson', { p_id: id, p_revision: nextRevision });
    if (error) { revalidatePath('/admin/lecons/'); return fail('Le brouillon est enregistré, mais la publication n’a pas abouti. Rechargez la page avant de réessayer.', nextRevision); }
  }
  revalidatePath('/', 'layout');
  if (form.get('creating') === 'yes') redirect(`/admin/lecons/${id}/?succes=${intent}`);
  return { ok: true, message: intent === 'publish' ? 'Leçon publiée. Les apprenants voient cette version.' : 'Brouillon enregistré. La version apprenant reste inchangée.', revision: nextRevision };
}
export async function archiveLesson(form: FormData) {
  const { supabase } = await requireAdmin('/admin/lecons/');
  const id = String(form.get('id') ?? '');
  if (!lessonKeyValid(id)) redirect('/admin/lecons/?erreur=identifiant');
  const archived = form.get('archived') === 'true';
  const expected = Number(form.get('revision'));
  const { data: publication, error } = await supabase.from('lesson_publications').select('revision').eq('id', id).maybeSingle();
  if (error || (publication?.revision ?? 0) !== expected) redirect('/admin/lecons/?erreur=conflit');
  if (publication) {
    const result = await supabase.from('lesson_publications').update({ archived }).eq('id', id).eq('revision', expected).select('id').single();
    if (result.error || !result.data) redirect('/admin/lecons/?erreur=enregistrement');
  } else {
    const [moduleId, slug] = id.split('/');
    const lesson = modules.find((m) => m.id === moduleId)?.lessons.find((l) => l.slug === slug);
    if (!lesson) redirect('/admin/lecons/?erreur=identifiant');
    const result = await supabase.from('lesson_publications').insert({ id, content: lesson, revision: 1, archived });
    if (result.error) redirect('/admin/lecons/?erreur=enregistrement');
  }
  revalidatePath('/', 'layout');
  redirect('/admin/lecons/?succes=statut');
}
