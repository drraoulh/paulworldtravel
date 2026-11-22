import Link from 'next/link';
import { requireStaff } from '@/lib/staff';
import { createAdminClient } from '@/lib/supabase/admin';
import { AdminHeading, AdminBody, DataError, adminLink } from '@/components/admin/ui';
import { learnerName } from '@/lib/admin/learners';
import { formatDate } from '@/lib/labels';

type TokenRow = { user_id: string; feature: string; calls: number; input_tokens: number; output_tokens: number; audio_seconds: number; last_used: string };
type QuotaRow = { user_id: string; feature: string; uses: number; last_used: string };
type Person = { id: string; email: string; first_name: string | null; last_name: string | null; role: string | null };

const PERIODS = [
  { id: '24h', label: '24 heures', days: 1 },
  { id: '7j', label: '7 jours', days: 7 },
  { id: '30j', label: '30 jours', days: 30 },
  { id: 'tout', label: 'Depuis le début', days: 0 },
] as const;

const FEATURES: Record<string, string> = {
  writing: 'Expression écrite', speaking: 'Expression orale', dialogue: 'Dialogue oral (tâche 2)',
  tutor: 'Tuteur IA', exam: 'Examens blancs', generate: 'Banque d’exercices', combinaisons: 'Sujets des candidats',
};
const featureName = (f: string) => FEATURES[f] ?? f;
const n = (v: number) => Math.round(v).toLocaleString('fr-FR');
const minutes = (s: number) => (s >= 60 ? `${n(s / 60)} min` : `${n(s)} s`);

type Line = { id: string; tokensIn: number; tokensOut: number; audio: number; calls: number; uses: Record<string, number>; last: string };

export default async function AiUsage({ searchParams }: { searchParams: Promise<{ periode?: string }> }) {
  const { isAdmin } = await requireStaff('/admin/ia/');
  const heading = <AdminHeading title="Consommation IA" description="Qui utilise le plus l’IA, et combien de tokens chaque apprenant consomme : corrections, dialogues, tuteur et examens blancs." />;
  if (!isAdmin) return <>{heading}<AdminBody><DataError>Cette page est réservée aux administrateurs.</DataError></AdminBody></>;
  const admin = createAdminClient();
  if (!admin) return <>{heading}<AdminBody><DataError>La clé serveur Supabase manque : la consommation ne peut pas être affichée.</DataError></AdminBody></>;

  const asked = (await searchParams).periode;
  const period = PERIODS.find((p) => p.id === asked) ?? PERIODS[2];
  const since = period.days ? new Date(Date.now() - period.days * 86_400_000).toISOString() : '2000-01-01T00:00:00Z';

  // Raw rows, read page by page (the API returns at most 1 000 rows per call), aggregated here.
  type Raw = Record<string, unknown>;
  const all = async (table: string, columns: string) => {
    const out: Raw[] = [];
    for (let from = 0; from < 50_000; from += 1000) {
      const { data, error } = await admin.from(table).select(columns).gte('created_at', since).order('id').range(from, from + 999);
      if (error) return { rows: out, error };
      out.push(...((data ?? []) as unknown as Raw[]));
      if (!data || data.length < 1000) break;
    }
    return { rows: out, error: null };
  };
  const [tokenRaw, quotaRaw, first] = await Promise.all([
    all('ai_token_usage', 'id,user_id,feature,input_tokens,output_tokens,audio_seconds,created_at'),
    all('ai_usage', 'id,user_id,feature,created_at'),
    admin.from('ai_token_usage').select('created_at').order('created_at', { ascending: true }).limit(1).maybeSingle(),
  ]);
  if (quotaRaw.error) return <>{heading}<AdminBody><DataError /></AdminBody></>;
  const tokensReady = !tokenRaw.error;
  const tokens = { data: tokenRaw.rows.map((r) => ({ user_id: String(r.user_id), feature: String(r.feature), calls: 1, input_tokens: Number(r.input_tokens), output_tokens: Number(r.output_tokens), audio_seconds: Number(r.audio_seconds), last_used: String(r.created_at) })) };
  const quotas = { data: quotaRaw.rows.map((r) => ({ user_id: String(r.user_id), feature: String(r.feature), uses: 1, last_used: String(r.created_at) })) };

  const lines = new Map<string, Line>();
  const line = (id: string) => lines.get(id) ?? lines.set(id, { id, tokensIn: 0, tokensOut: 0, audio: 0, calls: 0, uses: {}, last: '' }).get(id)!;
  const byFeature = new Map<string, { tokens: number; audio: number; calls: number; uses: number }>();
  const feat = (f: string) => byFeature.get(f) ?? byFeature.set(f, { tokens: 0, audio: 0, calls: 0, uses: 0 }).get(f)!;
  for (const r of (tokens.data ?? []) as TokenRow[]) {
    const l = line(r.user_id);
    l.tokensIn += Number(r.input_tokens); l.tokensOut += Number(r.output_tokens); l.audio += Number(r.audio_seconds); l.calls += Number(r.calls);
    if (r.last_used > l.last) l.last = r.last_used;
    const f = feat(r.feature); f.tokens += Number(r.input_tokens) + Number(r.output_tokens); f.audio += Number(r.audio_seconds); f.calls += Number(r.calls);
  }
  for (const r of (quotas.data ?? []) as QuotaRow[]) {
    const l = line(r.user_id);
    l.uses[r.feature] = (l.uses[r.feature] ?? 0) + Number(r.uses);
    if (r.last_used > l.last) l.last = r.last_used;
    feat(r.feature).uses += Number(r.uses);
  }

  const ids = [...lines.keys()];
  const { data: people } = ids.length
    ? await admin.from('profiles').select('id,email,first_name,last_name,role').in('id', ids).returns<Person[]>()
    : { data: [] as Person[] };
  const who = new Map((people ?? []).map((p) => [p.id, p]));

  const total = (l: Line) => l.tokensIn + l.tokensOut;
  const usesOf = (l: Line) => Object.values(l.uses).reduce((a, b) => a + b, 0);
  const rows = [...lines.values()].sort((a, b) => total(b) - total(a) || usesOf(b) - usesOf(a));
  const sum = rows.reduce((t, l) => ({ in: t.in + l.tokensIn, out: t.out + l.tokensOut, audio: t.audio + l.audio, calls: t.calls + l.calls }), { in: 0, out: 0, audio: 0, calls: 0 });
  const grand = sum.in + sum.out;
  const trackedSince = first.data?.created_at as string | undefined;

  return (
    <>
      {heading}
      <AdminBody>
        <nav aria-label="Période" className="flex flex-wrap gap-2">
          {PERIODS.map((p) => (
            <Link key={p.id} href={`/admin/ia/?periode=${p.id}`} aria-current={p.id === period.id ? 'page' : undefined}
              className={`rounded-full border-2 px-4 py-2 text-sm font-bold ${p.id === period.id ? 'border-ocean bg-ocean text-white' : 'border-rule bg-white text-night hover:border-ocean'}`}>
              {p.label}
            </Link>
          ))}
        </nav>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-rule bg-white p-5"><p className="text-xs text-slate">Tokens consommés</p><p className="mt-2 text-2xl font-extrabold">{n(grand)}</p><p className="mt-1 text-xs text-slate">{n(sum.in)} en entrée, {n(sum.out)} en sortie</p></div>
          <div className="rounded-xl border border-rule bg-white p-5"><p className="text-xs text-slate">Audio transcrit</p><p className="mt-2 text-2xl font-extrabold">{minutes(sum.audio)}</p><p className="mt-1 text-xs text-slate">Expression orale et dialogues</p></div>
          <div className="rounded-xl border border-rule bg-white p-5"><p className="text-xs text-slate">Appels à l’IA</p><p className="mt-2 text-2xl font-extrabold">{n(sum.calls)}</p><p className="mt-1 text-xs text-slate">Corrections, répliques, transcriptions</p></div>
          <div className="rounded-xl border border-rule bg-white p-5"><p className="text-xs text-slate">Utilisateurs de l’IA</p><p className="mt-2 text-2xl font-extrabold">{n(rows.length)}</p><p className="mt-1 text-xs text-slate">sur {period.label.toLowerCase()}</p></div>
        </div>

        {byFeature.size > 0 && (
          <div className="rounded-xl border border-rule bg-white p-5">
            <h2 className="font-bold text-night">Par fonction</h2>
            <ul className="mt-3 divide-y divide-rule text-sm">
              {[...byFeature.entries()].sort((a, b) => b[1].tokens - a[1].tokens || b[1].uses - a[1].uses).map(([f, v]) => (
                <li key={f} className="grid grid-cols-2 gap-2 py-2 sm:grid-cols-4">
                  <span className="font-semibold">{featureName(f)}</span>
                  <span>{n(v.tokens)} tokens{grand ? <span className="text-slate"> ({Math.round((v.tokens / grand) * 100)} %)</span> : null}</span>
                  <span className="text-slate">{v.uses ? `${n(v.uses)} utilisation${v.uses > 1 ? 's' : ''}` : ''}</span>
                  <span className="text-slate">{v.audio ? `${minutes(v.audio)} d’audio` : ''}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!tokensReady && (
          <DataError>Le comptage des tokens n’est pas encore activé dans la base : exécutez le fichier supabase/ai-tokens.sql dans l’éditeur SQL de Supabase. En attendant, la page montre les utilisations de chaque apprenant.</DataError>
        )}
        <p className="text-xs text-slate">
          Les tokens sont comptés {trackedSince ? `depuis le ${formatDate(trackedSince)}` : 'à partir de maintenant'} ; les utilisations (corrections, dialogues, questions au tuteur) le sont depuis l’ouverture de l’IA.
          Le coût réel figure sur le tableau de bord OpenAI.
        </p>

        {rows.length === 0 ? (
          <p className="rounded-xl border border-rule bg-white p-8 text-sm text-slate">Aucune utilisation de l’IA sur {period.label.toLowerCase()}.</p>
        ) : (
          <div role="region" aria-label="Consommation par apprenant" tabIndex={0} className="overflow-x-auto rounded-xl border border-rule bg-white">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-rule bg-slate-50 text-xs text-slate">
                <tr>
                  <th className="px-5 py-3">Utilisateur</th><th className="px-5 py-3">Utilisations</th><th className="px-5 py-3 text-right">Tokens</th>
                  <th className="px-5 py-3 text-right">Part</th><th className="px-5 py-3 text-right">Audio</th><th className="px-5 py-3">Dernière utilisation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {rows.map((l) => {
                  const p = who.get(l.id);
                  return (
                    <tr key={l.id}>
                      <td className="px-5 py-3">
                        {p ? <Link href={`/admin/apprenants/${p.id}/`} className={adminLink}>{learnerName(p)}</Link> : <span className="text-slate">Compte supprimé</span>}
                        {p?.email && <span className="block text-xs text-slate">{p.email}</span>}
                        {(p?.role === 'admin' || p?.role === 'trainer') && <span className="mt-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate">Équipe</span>}
                      </td>
                      <td className="px-5 py-3 text-xs">
                        {Object.entries(l.uses).sort((a, b) => b[1] - a[1]).map(([f, k]) => <span key={f} className="block">{featureName(f)} : <b>{k}</b></span>)}
                        {!usesOf(l) && <span className="text-slate">{n(l.calls)} appel{l.calls > 1 ? 's' : ''}</span>}
                      </td>
                      <td className="px-5 py-3 text-right font-bold">{n(total(l))}<span className="block text-xs font-normal text-slate">{n(l.tokensIn)} / {n(l.tokensOut)}</span></td>
                      <td className="px-5 py-3 text-right">{grand ? `${Math.round((total(l) / grand) * 100)} %` : '–'}</td>
                      <td className="px-5 py-3 text-right">{l.audio ? minutes(l.audio) : '–'}</td>
                      <td className="px-5 py-3 text-xs text-slate">{l.last ? formatDate(l.last) : '–'}</td>
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
