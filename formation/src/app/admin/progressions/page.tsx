import Link from 'next/link';
import { AdminHeading, AdminBody, DataError } from '@/components/admin/ui';
import LearnerTable from '@/components/admin/LearnerTable';
import { learnerPage, PAGE_SIZE } from '@/lib/admin/learners';
export default async function Progressions({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = Math.max(0, Math.min(10000, Number.parseInt((await searchParams).page ?? '0') || 0));
  const data = await learnerPage({}, page);
  return <><AdminHeading title="Progressions pédagogiques" description="Distinguez les leçons consultées, les quiz réussis et les entraînements terminés." /><AdminBody><p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate">Les progressions proviennent des activités synchronisées du compte. Elles servent au suivi pédagogique et ne constituent pas une note officielle. Les activités réalisées sans connexion restent sur l’appareil jusqu’à synchronisation.</p>{data.error ? <DataError /> : data.rows.length ? <LearnerTable rows={data.rows} progress /> : <p className="rounded-xl border border-rule bg-white p-8 text-sm text-slate">Aucun apprenant à suivre pour le moment.</p>}<nav aria-label="Pagination des progressions" className="flex justify-between text-sm font-bold text-ocean">{page > 0 ? <Link href={`/admin/progressions/?page=${page - 1}`}>← Précédent</Link> : <span />}{(page + 1) * PAGE_SIZE < data.count && <Link href={`/admin/progressions/?page=${page + 1}`}>Suivant →</Link>}</nav></AdminBody></>;
}
