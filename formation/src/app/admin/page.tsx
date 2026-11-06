import Link from 'next/link';
import { requireStaff } from '@/lib/staff';
import { createAdminClient } from '@/lib/supabase/admin';
import { AdminHeading, AdminBody, DataError, adminButton, adminLink } from '@/components/admin/ui';
import { learnerDirectory, learnerName, daysSince, type DirectoryRow } from '@/lib/admin/learners';
import { packs, packName } from '@/content/offers';
import { formatDate } from '@/lib/labels';

const card = 'rounded-xl border border-rule bg-white';

function PeopleList({ rows, empty, detail }: { rows: DirectoryRow[]; empty: string; detail: (r: DirectoryRow) => string }) {
  if (!rows.length) return <p className="p-5 text-sm text-slate">{empty}</p>;
  return (
    <ul className="divide-y divide-rule">
      {rows.slice(0, 8).map((r) => (
        <li key={r.id}>
          <Link href={`/admin/apprenants/${r.id}/`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 hover:bg-paper">
            <span><span className="block text-sm font-bold">{learnerName(r)}</span><span className="text-xs text-slate">{r.pack ? packName(r.pack) : 'Compte gratuit'}{r.phone ? `, ${r.phone}` : ''}</span></span>
            <span className="text-xs font-semibold text-slate">{detail(r)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function Admin({ searchParams }: { searchParams: Promise<{ erreur?: string }> }) {
  const { supabase, isAdmin } = await requireStaff('/admin/');
  const admin = createAdminClient();
  const monthStart = `${new Date().toISOString().slice(0, 7)}-01`;
  const [dir, pending, corrections, payments] = await Promise.all([
    learnerDirectory(),
    supabase.from('enrollments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('submissions').select('id', { count: 'exact', head: true }).eq('status', 'ai_reviewed'),
    admin ? admin.from('payments').select('amount,currency').eq('status', 'paid').gte('created_at', monthStart) : null,
  ]);

  const rows = dir.rows;
  const week = rows.filter((r) => (daysSince(r.created_at) ?? 99) < 7);
  const active = rows.filter((r) => r.access === 'active');
  const expiring = active
    .filter((r) => r.current?.ends_at && (daysSince(r.current.ends_at) ?? -99) >= -7)
    .sort((a, b) => (a.current!.ends_at ?? '').localeCompare(b.current!.ends_at ?? ''));
  // Paying learners first: they are the ones to keep on track.
  const inactive = rows
    .filter((r) => !r.disabled && (daysSince(r.lastActive ?? r.created_at) ?? 0) >= 14)
    .sort((a, b) => Number(b.access === 'active') - Number(a.access === 'active'));
  const perPack = packs.map((p) => ({ ...p, count: active.filter((r) => r.pack === p.id).length }));
  const maxPack = Math.max(1, ...perPack.map((p) => p.count));
  const income = (payments?.data ?? []).reduce<Record<string, number>>((t, p) => ({ ...t, [p.currency]: (t[p.currency] ?? 0) + p.amount }), {});

  const cards = [
    { title: 'Apprenants', value: dir.error ? '—' : rows.length, detail: `+${week.length} cette semaine`, href: '/admin/apprenants/' },
    { title: 'Packs actifs', value: dir.error ? '—' : active.length, detail: `${expiring.length} se terminent dans 7 jours`, href: '/admin/apprenants/?statut=active' },
    { title: 'Paiements à vérifier', value: pending.error ? '—' : pending.count ?? 0, detail: 'Demandes en attente', href: '/admin/inscriptions/?statut=pending' },
    { title: 'Encaissé ce mois', value: Object.entries(income).map(([c, n]) => `${n.toLocaleString('fr-FR')} ${c}`).join(' + ') || '0', detail: 'Voir les paiements', href: '/admin/paiements/' },
    { title: 'Corrections à relire', value: corrections.error ? '—' : corrections.count ?? 0, detail: 'Productions corrigées par l’IA', href: '/admin/corrections/' },
  ];

  return (
    <>
      <AdminHeading
        eyebrow="Pilotage de la formation"
        title="Vue d’ensemble"
        description="Qui s’inscrit, qui paie, qui décroche : les informations pour accompagner vos apprenants au jour le jour."
        action={isAdmin && <Link href="/admin/apprenants/nouveau/" className={adminButton}>Ajouter un apprenant</Link>}
      />
      <AdminBody>
        {(await searchParams).erreur === 'droits' && <DataError>Cette modification est réservée à un administrateur.</DataError>}
        {(dir.error || pending.error || corrections.error) && <DataError>Certaines données n’ont pas pu être chargées. Les indicateurs indisponibles sont signalés par un tiret.</DataError>}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map((c) => (
            <Link key={c.title} href={c.href} className={`${card} p-5 hover:border-ocean`}>
              <p className="text-xs font-semibold text-slate">{c.title}</p>
              <p className="mt-3 text-3xl font-extrabold text-night">{c.value}</p>
              <p className="mt-3 text-xs font-bold text-emerald-700">{c.detail}</p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <section className={card}>
            <div className="flex justify-between border-b border-rule p-5"><h2 className="font-bold">Packs qui se terminent dans 7 jours</h2><span className="text-xs text-slate">{expiring.length}</span></div>
            <PeopleList rows={expiring} empty="Aucun pack ne se termine cette semaine." detail={(r) => `Fin le ${formatDate(r.current?.ends_at ?? null)}`} />
          </section>
          <section className={card}>
            <div className="flex justify-between border-b border-rule p-5"><h2 className="font-bold">Inactifs depuis 14 jours</h2><span className="text-xs text-slate">{inactive.length}</span></div>
            <PeopleList rows={inactive} empty="Tous les apprenants ont été actifs ces deux dernières semaines." detail={(r) => (r.lastActive ? `Vu le ${formatDate(r.lastActive)}` : 'Jamais connecté')} />
            {inactive.length > 0 && <p className="border-t border-rule px-5 py-3 text-xs text-slate">Ouvrez une fiche pour relancer par email ou WhatsApp.</p>}
          </section>
          <section className={card}>
            <div className="flex justify-between border-b border-rule p-5"><h2 className="font-bold">Inscrits cette semaine</h2><Link href="/admin/apprenants/" className={`text-xs ${adminLink}`}>Voir tous</Link></div>
            <PeopleList rows={week} empty="Aucune inscription cette semaine." detail={(r) => formatDate(r.created_at)} />
          </section>
          <section className={`${card} p-5`}>
            <h2 className="font-bold">Packs actifs par formule</h2>
            <ul className="mt-5 space-y-4">
              {perPack.map((p) => (
                <li key={p.id}>
                  <div className="mb-1.5 flex justify-between text-sm"><Link href={`/admin/apprenants/?pack=${p.id}&statut=active`} className="font-semibold hover:text-ocean">{p.name}</Link><span className="font-bold">{p.count}</span></div>
                  <div className="h-2 rounded-full bg-paper"><div className="h-full rounded-full bg-ocean" style={{ width: `${(p.count / maxPack) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-slate">{rows.filter((r) => !r.pack).length} apprenants utilisent le compte gratuit.</p>
          </section>
        </div>
      </AdminBody>
    </>
  );
}
