import Link from 'next/link';
import { requireStaff } from '@/lib/staff';
import { createAdminClient } from '@/lib/supabase/admin';
import { AdminHeading, AdminBody, DataError, fieldClass, adminButton, adminLink } from '@/components/admin/ui';
import { paymentMethodName } from '@/lib/admin/accounts';
import { learnerName } from '@/lib/admin/learners';
import { packName } from '@/content/offers';
import { formatDate } from '@/lib/labels';

type Payment = { id: string; user_id: string | null; pack: string; amount: number; currency: string; provider: string; reference: string | null; status: string; paid_at: string | null; created_at: string };

const monthLabel = (m: string) => new Date(`${m}-01T12:00:00Z`).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
const money = (n: number, c: string) => `${n.toLocaleString('fr-FR')} ${c}`;

export default async function Payments({ searchParams }: { searchParams: Promise<{ mois?: string }> }) {
  await requireStaff('/admin/paiements/');
  const asked = (await searchParams).mois;
  const month = asked && /^\d{4}-\d{2}$/.test(asked) ? asked : new Date().toISOString().slice(0, 7);
  const admin = createAdminClient();
  if (!admin) return <><AdminHeading title="Paiements" /><AdminBody><DataError>La clé serveur Supabase manque : les paiements ne peuvent pas être affichés.</DataError></AdminBody></>;

  const start = `${month}-01`;
  const next = new Date(`${start}T00:00:00Z`);
  next.setUTCMonth(next.getUTCMonth() + 1);
  const end = next.toISOString().slice(0, 10);
  const { data, error } = await admin.from('payments').select('*').gte('created_at', start).lt('created_at', end).order('created_at', { ascending: false }).returns<Payment[]>();
  const rows = data ?? [];
  const ids = [...new Set(rows.map((r) => r.user_id).filter((v): v is string => Boolean(v)))];
  const { data: people } = ids.length ? await admin.from('profiles').select('id,email,first_name,last_name').in('id', ids) : { data: [] };
  const who = new Map((people ?? []).map((p) => [p.id, p]));

  const paid = rows.filter((r) => r.status === 'paid');
  const totals = paid.reduce<Record<string, number>>((t, r) => ({ ...t, [r.currency]: (t[r.currency] ?? 0) + r.amount }), {});
  const byPack = paid.reduce<Record<string, number>>((t, r) => ({ ...t, [r.pack]: (t[r.pack] ?? 0) + 1 }), {});
  const prev = new Date(`${start}T00:00:00Z`); prev.setUTCMonth(prev.getUTCMonth() - 1);

  return (
    <>
      <AdminHeading title="Paiements" description="Les paiements reçus par Mobile Money, en espèces ou par virement, enregistrés depuis la fiche de chaque apprenant." />
      <AdminBody>
        <form className="flex flex-wrap items-end gap-3">
          <label className="text-xs font-semibold text-slate">Mois<input type="month" name="mois" defaultValue={month} className={`mt-1 ${fieldClass}`} /></label>
          <button className={adminButton}>Afficher</button>
          <Link href={`/admin/paiements/?mois=${prev.toISOString().slice(0, 7)}`} className={`self-center text-sm ${adminLink}`}>Mois précédent</Link>
        </form>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-rule bg-white p-5">
            <p className="text-xs text-slate">Encaissé en {monthLabel(month)}</p>
            {Object.keys(totals).length ? Object.entries(totals).map(([c, n]) => <p key={c} className="mt-2 text-2xl font-extrabold">{money(n, c)}</p>) : <p className="mt-2 text-2xl font-extrabold">0</p>}
          </div>
          <div className="rounded-xl border border-rule bg-white p-5"><p className="text-xs text-slate">Paiements reçus</p><p className="mt-2 text-2xl font-extrabold">{paid.length}</p></div>
          <div className="rounded-xl border border-rule bg-white p-5">
            <p className="text-xs text-slate">Par pack</p>
            <ul className="mt-2 space-y-1 text-sm">{Object.entries(byPack).map(([k, n]) => <li key={k} className="flex justify-between"><span>{packName(k)}</span><span className="font-bold">{n}</span></li>)}{!paid.length && <li className="text-slate">Aucun</li>}</ul>
          </div>
        </div>

        {error ? <DataError /> : rows.length === 0 ? (
          <p className="rounded-xl border border-rule bg-white p-8 text-sm text-slate">Aucun paiement en {monthLabel(month)}. Pour en enregistrer un, ouvrez la fiche de l’apprenant puis « Activer un pack » ou « Enregistrer un paiement ».</p>
        ) : (
          <div role="region" aria-label="Liste des paiements" tabIndex={0} className="overflow-x-auto rounded-xl border border-rule bg-white">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-b border-rule bg-slate-50 text-xs text-slate"><tr><th className="px-5 py-3">Date</th><th className="px-5 py-3">Apprenant</th><th className="px-5 py-3">Pack</th><th className="px-5 py-3">Montant</th><th className="px-5 py-3">Moyen</th></tr></thead>
              <tbody className="divide-y divide-rule">
                {rows.map((r) => {
                  const p = r.user_id ? who.get(r.user_id) : undefined;
                  return (
                    <tr key={r.id}>
                      <td className="px-5 py-3 text-xs text-slate">{formatDate(r.paid_at ?? r.created_at)}</td>
                      <td className="px-5 py-3">{p ? <Link href={`/admin/apprenants/${p.id}/`} className="font-semibold text-night hover:text-ocean">{learnerName(p)}</Link> : <span className="text-slate">Compte supprimé</span>}</td>
                      <td className="px-5 py-3">{packName(r.pack)}</td>
                      <td className="px-5 py-3 font-bold">{money(r.amount, r.currency)}{r.status !== 'paid' && <span className="ml-2 text-xs font-normal text-maple">{r.status}</span>}</td>
                      <td className="px-5 py-3 text-xs text-slate">{paymentMethodName(r.provider)}{r.reference && <span className="block">Réf. {r.reference}</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </AdminBody>
    </>
  );
}
