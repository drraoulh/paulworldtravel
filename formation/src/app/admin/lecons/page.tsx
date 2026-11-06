import Link from 'next/link';
import { requireStaff } from '@/lib/staff';
import { modules } from '@/content/parcours';
import { validateLesson } from '@/lib/admin/lesson-validation';
import { AdminHeading, AdminBody, DataError, fieldClass, adminButton, adminSecondary, adminSmall, adminLink } from '@/components/admin/ui';
import { archiveLesson } from './actions';
export default async function Lessons({ searchParams }: { searchParams: Promise<{ module?: string; q?: string; erreur?: string; succes?: string }> }) {
  const { supabase, isAdmin } = await requireStaff('/admin/lecons/');
  const [drafts, publications, p] = await Promise.all([
    supabase.from('lesson_drafts').select('id,content,revision,updated_at').limit(1000),
    supabase.from('lesson_publications').select('id,content,revision,archived,published_at').limit(1000), searchParams,
  ]);
  const ids = new Set(modules.flatMap((m) => m.lessons.map((l) => `${m.id}/${l.slug}`)));
  for (const r of [...(drafts.data ?? []), ...(publications.data ?? [])]) ids.add(r.id);
  const rows = [...ids].map((id) => {
    const [moduleId, slug] = id.split('/');
    const trainingModule = modules.find((m) => m.id === moduleId);
    const base = trainingModule?.lessons.find((l) => l.slug === slug);
    const draft = drafts.data?.find((d) => d.id === id);
    const publication = publications.data?.find((d) => d.id === id);
    const checked = validateLesson(draft?.content ?? publication?.content ?? base);
    return { id, module: trainingModule, base, draft, publication, lesson: checked.lesson, title: checked.lesson?.title ?? id };
  }).filter((r) => (!p.module || r.module?.id === p.module) && (!p.q || `${r.title} ${r.id}`.toLowerCase().includes(p.q.slice(0,100).toLowerCase())));
  return <><AdminHeading title="Leçons et quiz" description="Préparez vos modifications en brouillon, vérifiez le quiz, puis publiez la version destinée aux apprenants." action={isAdmin && <Link href="/admin/lecons/nouvelle/" className={adminButton}>+ Créer une leçon</Link>} /><AdminBody>{p.erreur && <DataError>{p.erreur === 'conflit' ? 'La leçon a changé. Rechargez la page avant de modifier son statut.' : 'La modification n’a pas pu être enregistrée.'}</DataError>}{p.succes && <p role="status" className="rounded-xl bg-green-50 p-4 text-sm text-green-800">Le statut de la leçon a été mis à jour.</p>}{(drafts.error || publications.error) && <DataError>La base de contenu n’est pas entièrement disponible. Les leçons du catalogue initial restent visibles.</DataError>}<form className="flex flex-col gap-3 sm:flex-row"><label className="min-w-0 flex-1"><span className="sr-only">Rechercher une leçon</span><input name="q" defaultValue={p.q ?? ''} maxLength={100} placeholder="Titre ou adresse de la leçon…" className={fieldClass} /></label><label><span className="sr-only">Compétence</span><select name="module" defaultValue={p.module ?? ''} className={fieldClass}><option value="">Toutes les compétences</option>{modules.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}</select></label><button className={adminButton}>Filtrer</button></form><p className="text-sm text-slate">{rows.length} leçons affichées</p><div className="space-y-3">{rows.map((r) => {
    const published = !!r.publication || !!r.base;
    const archived = !!r.publication?.archived;
    const modified = r.draft && (!r.publication || r.draft.revision > r.publication.revision);
    return <article key={r.id} className="flex flex-col justify-between gap-4 rounded-xl border border-rule bg-white p-5 xl:flex-row xl:items-center"><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-wide text-slate">{r.module?.name ?? 'Compétence inconnue'}</p><Link href={`/admin/lecons/${r.id}/`} className="mt-1 inline-block text-lg font-bold text-night hover:text-ocean">{r.title}</Link><p className="mt-2 text-xs text-slate">{r.lesson?.minutes ?? '—'} min de lecture · {r.lesson?.quiz.length ?? '—'} questions</p><div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold"><span className={`rounded-full px-3 py-1 ${archived ? 'bg-slate-100 text-slate-600' : published ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-800'}`}>{archived ? 'Archivée' : published ? 'Publiée' : 'Brouillon uniquement'}</span>{modified && <span className="rounded-full bg-blue-50 px-3 py-1 text-ocean">Modifications non publiées</span>}</div></div><div className="flex shrink-0 flex-wrap items-center gap-3"><Link href={`/admin/lecons/${r.id}/`} className={adminButton}>{isAdmin ? 'Modifier' : 'Consulter'}</Link>{published && !archived && r.module && <Link href={`/epreuve/${r.module.slug}/methodologie/${r.id.split('/')[1]}/`} className={`text-xs ${adminLink}`}>Voir la version apprenant</Link>}{isAdmin && published && <form action={archiveLesson}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="archived" value={String(!archived)} /><input type="hidden" name="revision" value={r.publication?.revision ?? 0} /><button className={`${adminSecondary} ${adminSmall}`}>{archived ? 'Restaurer' : 'Archiver'}</button></form>}</div></article>;
  })}{!rows.length && <p className="rounded-xl border border-rule bg-white p-8 text-sm text-slate">Aucune leçon correspondant à ces critères.</p>}</div><p className="text-xs text-slate">Archiver retire la leçon du parcours et de la recherche. Le contenu est conservé et peut être restauré. Une leçon créée en brouillon n’est pas accessible aux apprenants.</p></AdminBody></>;
}
