import type { Metadata } from 'next';
import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import { Container } from '@/components/ui';
import { MONTHS, type CombinaisonContent, type ReportContent } from '@/lib/combinaisons';
import { formatDate } from '@/lib/labels';
import { requireStaff } from '@/lib/staff';
import { reformulate, saveCombinaison, setCombinaisonStatus } from './actions';

export const metadata: Metadata = { title: 'Combinaisons des candidats', robots: { index: false } };
export const dynamic = 'force-dynamic';
// The AI reformulation can take up to a minute.
export const maxDuration = 60;

type Row<C> = { id: string; theme: string | null; status: string; created_at: string; content: C };

const field = 'mt-1 w-full rounded-lg border border-rule bg-white p-2.5 text-sm text-ink focus:border-ocean focus:outline-none';

function Editor({ row, year, month }: { row?: Row<CombinaisonContent>; year: number; month: number }) {
  const c = row?.content;
  const t = (i: number) => c?.tasks[i];
  return (
    <form action={saveCombinaison} className="space-y-4">
      {row && <input type="hidden" name="id" value={row.id} />}
      <div className="grid gap-3 sm:grid-cols-4">
        <label className="sm:col-span-2"><span className="text-sm font-semibold text-night">Thème</span><input name="theme" defaultValue={row?.theme ?? ''} className={field} /></label>
        <label><span className="text-sm font-semibold text-night">Mois de session</span>
          <select name="month" defaultValue={c?.month ?? month} className={field}>{MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}</select>
        </label>
        <label><span className="text-sm font-semibold text-night">Année</span><input name="year" type="number" defaultValue={c?.year ?? year} className={field} /></label>
      </div>
      <label className="block"><span className="text-sm font-semibold text-night">Source</span>
        <select name="source" defaultValue={c?.source ?? 'candidats'} className={field}>
          <option value="candidats">Rapportée par des candidats (reformulée)</option>
          <option value="equipe">Proposée par l’équipe</option>
        </select>
      </label>
      {[1, 2, 3].map((n) => (
        <fieldset key={n} className="rounded-xl border border-rule p-4">
          <legend className="px-1 text-sm font-bold text-night">Tâche {n}</legend>
          <label className="block"><span className="text-sm text-slate">Consigne</span><textarea name={`t${n}`} rows={3} defaultValue={t(n - 1)?.prompt ?? ''} className={field} /></label>
          {n === 3 && (
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <label><span className="text-sm text-slate">Document 1</span><textarea name="d1" rows={3} defaultValue={t(2)?.documents?.[0] ?? ''} className={field} /></label>
              <label><span className="text-sm text-slate">Document 2</span><textarea name="d2" rows={3} defaultValue={t(2)?.documents?.[1] ?? ''} className={field} /></label>
            </div>
          )}
          <label className="mt-2 block"><span className="text-sm text-slate">Corrigé (facultatif)</span><textarea name={`c${n}`} rows={4} defaultValue={t(n - 1)?.corrige ?? ''} className={field} /></label>
        </fieldset>
      ))}
      <div className="flex flex-wrap gap-3">
        <button name="intent" value="publish" className="rounded-full bg-container px-5 py-2.5 text-sm font-bold text-night hover:bg-container-hover">{row?.status === 'approved' ? 'Enregistrer (reste publiée)' : 'Publier'}</button>
        <button name="intent" value="save" className="rounded-full border border-rule px-5 py-2.5 text-sm font-semibold text-night hover:border-night">{row?.status === 'approved' ? 'Retirer et garder en brouillon' : 'Enregistrer le brouillon'}</button>
      </div>
    </form>
  );
}

export default async function AdminCombinaisons() {
  const { supabase } = await requireStaff('/admin/combinaisons/');
  const { data } = await supabase
    .from('question_drafts')
    .select('id, theme, status, created_at, content')
    .eq('epreuve', 'ee')
    .order('created_at', { ascending: false })
    .limit(300);
  const rows = data ?? [];
  const reports = rows.filter((r) => r.content?.kind === 'report' && r.status === 'draft') as Row<ReportContent>[];
  const drafts = rows.filter((r) => r.content?.kind === 'combinaison' && r.status === 'draft') as Row<CombinaisonContent>[];
  const published = rows.filter((r) => r.content?.kind === 'combinaison' && r.status === 'approved') as Row<CombinaisonContent>[];
  const now = new Date();
  const keyMissing = !process.env.SUPABASE_SECRET_KEY;

  return (
    <>
      <header className="bg-night text-white">
        <Container className="py-10 sm:py-14">
          <AdminNav current="/admin/combinaisons/" />
          <h1 className="display text-3xl sm:text-4xl">Combinaisons des candidats</h1>
          <p className="mt-3 max-w-2xl text-blue-100">
            Les candidats rapportent leurs sujets. Reformulez-les avec l’IA, relisez, corrigez si besoin, puis publiez : la combinaison apparaît dans le mois de sa session.
          </p>
        </Container>
      </header>
      <section className="bg-paper py-10">
        <Container className="space-y-12">
          {keyMissing && (
            <p className="rounded-2xl border-2 border-maple bg-white p-5 text-ink">
              Ajoutez <strong>SUPABASE_SECRET_KEY</strong> dans Vercel (projet paulworldtravel-formation) puis redéployez : sans elle, les candidats ne peuvent pas envoyer leurs sujets et vous ne pouvez pas publier.
            </p>
          )}

          <section>
            <h2 className="heading text-2xl text-night">Sujets rapportés à traiter ({reports.length})</h2>
            {reports.length === 0 && <p className="mt-3 text-slate">Aucun nouveau sujet. Partagez le lien <Link href="/partager-mes-sujets/" className="font-semibold text-ocean hover:underline">formation.paulworldtravel.com/partager-mes-sujets</Link> à vos élèves après leur examen.</p>}
            <div className="mt-4 space-y-4">
              {reports.map((r) => (
                <article key={r.id} className="rounded-2xl bg-white p-6">
                  <p className="text-sm text-slate">Session {MONTHS[r.content.month - 1]} {r.content.year}{r.content.city ? `, ${r.content.city}` : ''}, reçu le {formatDate(r.created_at)}</p>
                  <ol className="mt-3 space-y-2 text-ink">{r.content.tasks.map((t, i) => <li key={i}><strong>Tâche {i + 1} : </strong>{t || <em className="text-slate">non décrite</em>}</li>)}</ol>
                  {r.content.notes && <p className="mt-2 text-sm text-slate">Remarques : {r.content.notes}</p>}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <form action={reformulate}><input type="hidden" name="id" value={r.id} /><button className="rounded-full bg-night px-5 py-2.5 text-sm font-bold text-white hover:bg-ocean">Reformuler avec l’IA</button></form>
                    <form action={setCombinaisonStatus}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="status" value="rejected" /><button className="rounded-full border border-rule px-5 py-2.5 text-sm font-semibold text-slate hover:text-maple">Ignorer</button></form>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="heading text-2xl text-night">Brouillons à relire ({drafts.length})</h2>
            <div className="mt-4 space-y-4">
              {drafts.map((d) => (
                <details key={d.id} className="rounded-2xl bg-white p-6" open={drafts.length <= 3}>
                  <summary className="cursor-pointer font-semibold text-night">{d.theme || 'Sans thème'} <span className="font-normal text-slate">({MONTHS[d.content.month - 1]} {d.content.year})</span></summary>
                  <div className="mt-4"><Editor row={d} year={d.content.year} month={d.content.month} /></div>
                  <form action={setCombinaisonStatus} className="mt-3"><input type="hidden" name="id" value={d.id} /><input type="hidden" name="status" value="rejected" /><button className="text-sm font-semibold text-slate hover:text-maple">Supprimer ce brouillon</button></form>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="heading text-2xl text-night">Créer une combinaison à la main</h2>
            <details className="mt-4 rounded-2xl bg-white p-6">
              <summary className="cursor-pointer font-semibold text-night">Nouvelle combinaison</summary>
              <div className="mt-4"><Editor year={now.getFullYear()} month={now.getMonth() + 1} /></div>
            </details>
          </section>

          <section>
            <h2 className="heading text-2xl text-night">Publiées ({published.length})</h2>
            <ul className="mt-4 divide-y divide-rule rounded-2xl bg-white">
              {published.map((p) => (
                <li key={p.id} className="p-5">
                  <details>
                    <summary className="cursor-pointer text-ink"><strong>{MONTHS[p.content.month - 1]} {p.content.year}</strong> : {p.theme || 'Sans thème'}</summary>
                    <div className="mt-4"><Editor row={p} year={p.content.year} month={p.content.month} /></div>
                  </details>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </section>
    </>
  );
}
