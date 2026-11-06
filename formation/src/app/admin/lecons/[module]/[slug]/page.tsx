import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireStaff } from '@/lib/staff';
import { modules } from '@/content/parcours';
import { validateLesson, lessonKeyValid } from '@/lib/admin/lesson-validation';
import LessonEditor from '@/components/admin/LessonEditor';
import { AdminHeading, AdminBody, DataError, adminLink } from '@/components/admin/ui';
export default async function EditLesson({ params, searchParams }: { params: Promise<{ module: string; slug: string }>; searchParams: Promise<{ succes?: string }> }) {
  const { supabase, isAdmin } = await requireStaff('/admin/lecons/');
  const { module: moduleId, slug } = await params;
  const id = `${moduleId}/${slug}`;
  if (!lessonKeyValid(id)) notFound();
  const trainingModule = modules.find((m) => m.id === moduleId);
  if (!trainingModule) notFound();
  const [draft, publication] = await Promise.all([
    supabase.from('lesson_drafts').select('content,revision,updated_at').eq('id', id).maybeSingle(),
    supabase.from('lesson_publications').select('content,revision,archived').eq('id', id).maybeSingle(),
  ]);
  if (draft.error || publication.error) return <AdminBody><DataError>La leçon ne peut pas être chargée. Aucun changement n’a été effectué.</DataError></AdminBody>;
  const checked = validateLesson(draft.data?.content ?? publication.data?.content ?? trainingModule.lessons.find((l) => l.slug === slug));
  if (!checked.lesson) notFound();
  return <><AdminHeading eyebrow={`Leçons / ${trainingModule.name}`} title={checked.lesson.title} description={publication.data?.archived ? 'Leçon archivée. Publier une nouvelle version la remettra dans le parcours.' : 'L’enregistrement d’un brouillon ne modifie pas la version publiée.'} action={<Link href="/admin/lecons/" className={`text-sm ${adminLink}`}>← Toutes les leçons</Link>} /><AdminBody>{(await searchParams).succes && <p role="status" className="rounded-xl bg-green-50 p-4 text-sm text-green-800">Leçon enregistrée.</p>}<LessonEditor initial={checked.lesson} moduleId={moduleId} revision={draft.data?.revision ?? 0} isAdmin={isAdmin} /></AdminBody></>;
}
