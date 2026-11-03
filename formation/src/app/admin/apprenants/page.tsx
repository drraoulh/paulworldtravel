import Link from 'next/link';
import { AdminHeading, AdminBody, DataError, fieldClass, adminButton } from '@/components/admin/ui';
import LearnerTable from '@/components/admin/LearnerTable';
import { learnerPage, PAGE_SIZE, safeSearch } from '@/lib/admin/learners';
export default async function Learners({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const p = await searchParams;
  const q = safeSearch(p.q ?? '');
  const page = Math.max(0, Math.min(10000, Number.parseInt(p.page ?? '0') || 0));
  const data = await learnerPage(q, page);
  const href = (n: number) => `/admin/apprenants/?${new URLSearchParams({ q, page: String(n) })}`;
  return <><AdminHeading title="Les apprenants" description="Retrouvez chaque candidat, ses coordonnées, ses accès et son suivi pédagogique." /><AdminBody><form className="flex max-w-2xl flex-col gap-3 sm:flex-row"><label className="flex-1"><span className="sr-only">Rechercher un apprenant</span><input name="q" defaultValue={q} placeholder="Nom, prénom ou email…" className={fieldClass} /></label><button className={adminButton}>Rechercher</button>{q && <Link href="/admin/apprenants/" className="self-center text-sm text-slate hover:underline">Effacer</Link>}</form>{data.error ? <DataError /> : <><p className="text-sm text-slate">{data.count} apprenant{data.count > 1 ? 's' : ''}{q ? ' correspondant à la recherche' : ' inscrits'}</p>{data.rows.length ? <LearnerTable rows={data.rows} /> : <div className="rounded-xl border border-dashed border-rule bg-white p-10 text-center"><h2 className="font-bold">Aucun apprenant à afficher</h2><p className="mt-2 text-sm text-slate">{q ? 'Essayez un autre nom ou une autre adresse email.' : 'Les candidats apparaîtront ici après la création de leur compte.'}</p></div>}<nav aria-label="Pagination des apprenants" className="flex justify-between text-sm font-bold text-ocean">{page > 0 ? <Link href={href(page - 1)}>← Précédent</Link> : <span />}{(page + 1) * PAGE_SIZE < data.count && <Link href={href(page + 1)}>Suivant →</Link>}</nav></>}</AdminBody></>;
}
