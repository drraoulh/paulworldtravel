import Link from 'next/link';
import { requireStaff } from '@/lib/staff';
import { AdminHeading, AdminBody, DataError, fieldClass, adminButton } from '@/components/admin/ui';
import LearnerTable from '@/components/admin/LearnerTable';
import { accessLabel, learnerPage, levels, PAGE_SIZE, type LearnerFilters } from '@/lib/admin/learners';
import { packs } from '@/content/offers';

type Params = LearnerFilters & { page?: string; succes?: string };
const keys = ['q', 'pack', 'statut', 'ville', 'niveau'] as const;

export default async function Learners({ searchParams }: { searchParams: Promise<Params> }) {
  const { isAdmin } = await requireStaff('/admin/apprenants/');
  const p = await searchParams;
  const filters: LearnerFilters = Object.fromEntries(keys.map((k) => [k, String(p[k] ?? '').slice(0, 100)]).filter(([, v]) => v));
  const page = Math.max(0, Math.min(10000, Number.parseInt(p.page ?? '0') || 0));
  const data = await learnerPage(filters, page);
  const query = (extra: Record<string, string> = {}) => new URLSearchParams({ ...(filters as Record<string, string>), ...extra }).toString();
  const active = Object.keys(filters).length > 0;

  return (
    <>
      <AdminHeading
        title="Les apprenants"
        description="Retrouvez chaque candidat, son pack, son niveau et son activité. Ajoutez des apprenants inscrits au bureau ou par téléphone."
        action={isAdmin && (
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/apprenants/importer/" className="rounded-lg border border-rule bg-white px-4 py-2.5 text-sm font-bold text-night hover:border-ocean">Importer une liste</Link>
            <Link href="/admin/apprenants/nouveau/" className={adminButton}>Ajouter un apprenant</Link>
          </div>
        )}
      />
      <AdminBody>
        {p.succes === 'supprime' && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">Le compte a été supprimé.</p>}
        <form className="grid gap-3 rounded-xl border border-rule bg-white p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]">
          <label className="text-xs font-semibold text-slate">Recherche<input name="q" defaultValue={filters.q} placeholder="Nom, email ou téléphone" className={`mt-1 ${fieldClass}`} /></label>
          <label className="text-xs font-semibold text-slate">Pack
            <select name="pack" defaultValue={filters.pack ?? ''} className={`mt-1 ${fieldClass}`}>
              <option value="">Tous</option>
              {packs.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
              <option value="aucun">Sans pack</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-slate">Statut
            <select name="statut" defaultValue={filters.statut ?? ''} className={`mt-1 ${fieldClass}`}>
              <option value="">Tous</option>
              {(['active', 'pending', 'scheduled', 'expired', 'none'] as const).map((s) => <option key={s} value={s}>{accessLabel[s]}</option>)}
              <option value="desactive">Compte désactivé</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-slate">Ville<input name="ville" defaultValue={filters.ville} placeholder="Douala, Toronto…" className={`mt-1 ${fieldClass}`} /></label>
          <label className="text-xs font-semibold text-slate">Niveau
            <select name="niveau" defaultValue={filters.niveau ?? ''} className={`mt-1 ${fieldClass}`}>
              <option value="">Tous</option>
              {levels.map((l) => <option key={l} value={l}>{l}</option>)}
              <option value="aucun">Pas de test</option>
            </select>
          </label>
          <div className="flex items-end gap-2"><button className={adminButton}>Filtrer</button></div>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-slate">
            {data.count} apprenant{data.count > 1 ? 's' : ''}{active ? ' correspondent aux filtres' : ''}
            {active && <Link href="/admin/apprenants/" className="ml-3 font-bold text-ocean hover:underline">Effacer les filtres</Link>}
          </p>
          <a href={`/admin/apprenants/export/?${query()}`} className="font-bold text-ocean hover:underline">Exporter vers Excel (CSV)</a>
        </div>

        {data.error ? <DataError /> : data.rows.length ? <LearnerTable rows={data.rows} /> : (
          <p className="rounded-xl border border-rule bg-white p-8 text-sm text-slate">
            {active ? 'Aucun apprenant ne correspond à ces filtres.' : 'Aucun apprenant pour le moment.'}{' '}
            {isAdmin && <Link href="/admin/apprenants/nouveau/" className="font-bold text-ocean hover:underline">Ajouter le premier apprenant</Link>}
          </p>
        )}

        <nav aria-label="Pagination des apprenants" className="flex justify-between text-sm font-bold text-ocean">
          {page > 0 ? <Link href={`/admin/apprenants/?${query({ page: String(page - 1) })}`}>← Précédent</Link> : <span />}
          {(page + 1) * PAGE_SIZE < data.count && <Link href={`/admin/apprenants/?${query({ page: String(page + 1) })}`}>Suivant →</Link>}
        </nav>
      </AdminBody>
    </>
  );
}
