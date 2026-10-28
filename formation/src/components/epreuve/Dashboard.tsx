'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProgressBar } from '@/components/parcours/Progress';
import { expressionBand } from '@/content/tcf';
import { readResults, seriesKey } from '@/lib/results';
import { getSupabase } from '@/lib/supabase/client';

type Submission = { id: string; task_prompt: string; ai_score: number | null; trainer_score: number | null; status: string; created_at: string };
type Results = ReturnType<typeof readResults>;

const date = (iso: string) => new Date(iso).toLocaleDateString('fr-CA', { day: 'numeric', month: 'long' });

export default function Dashboard({ epreuve, slug, lessonIds, series }: {
  epreuve: 'co' | 'ce' | 'ee' | 'eo';
  slug: string;
  lessonIds: string[];
  series: { number: number; total: number }[];
}) {
  const expression = epreuve === 'ee' || epreuve === 'eo';
  const [results, setResults] = useState<Results>({ series: {}, mocks: [] });
  const [subs, setSubs] = useState<Submission[] | null | 'signed-out'>(null);

  useEffect(() => setResults(readResults()), []);

  useEffect(() => {
    if (!expression) return;
    const supabase = getSupabase();
    if (!supabase) { setSubs('signed-out'); return; }
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setSubs('signed-out'); return; }
      const { data } = await supabase
        .from('submissions')
        .select('id, task_prompt, ai_score, trainer_score, status, created_at')
        .eq('user_id', user.id)
        .eq('kind', epreuve)
        .order('created_at', { ascending: false })
        .limit(30);
      setSubs((data as Submission[] | null) ?? []);
    })();
  }, [expression, epreuve]);

  const scored = Array.isArray(subs) ? subs.map((s) => s.trainer_score ?? s.ai_score).filter((n): n is number => n !== null) : [];
  const avg = scored.length ? Math.round((scored.reduce((a, b) => a + b, 0) / scored.length) * 10) / 10 : null;
  const best = scored.length ? Math.max(...scored) : null;
  const mocks = results.mocks;

  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6">
          <p className="font-semibold text-night">Méthodologie</p>
          <div className="mt-4"><ProgressBar ids={lessonIds} /></div>
          <Link href={`/epreuve/${slug}/methodologie/`} className="mt-4 inline-block text-sm font-bold text-ocean hover:underline">Continuer les leçons</Link>
        </div>
        {expression ? (
          <>
            <div className="rounded-2xl bg-white p-6">
              <p className="font-semibold text-night">Moyenne de vos corrections</p>
              <p className="display mt-2 text-4xl text-night">{avg ?? '–'}<span className="text-lg text-slate"> / 20</span></p>
              {avg !== null && <p className="mt-1 text-sm text-slate">Correspondance indicative : {expressionBand(avg).nclc}</p>}
            </div>
            <div className="rounded-2xl bg-white p-6">
              <p className="font-semibold text-night">Meilleure note</p>
              <p className="display mt-2 text-4xl text-night">{best ?? '–'}<span className="text-lg text-slate"> / 20</span></p>
              <p className="mt-1 text-sm text-slate">{scored.length} correction{scored.length > 1 ? 's' : ''}</p>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-2xl bg-white p-6">
              <p className="font-semibold text-night">Séries terminées</p>
              <p className="display mt-2 text-4xl text-night">{series.filter((s) => results.series[seriesKey(epreuve as 'ce' | 'co', s.number)]).length}<span className="text-lg text-slate"> / {series.length}</span></p>
            </div>
            <div className="rounded-2xl bg-white p-6">
              <p className="font-semibold text-night">Examens blancs</p>
              <p className="display mt-2 text-4xl text-night">{mocks.length}</p>
              <Link href="/examen-blanc/" className="mt-1 inline-block text-sm font-bold text-ocean hover:underline">Passer un examen blanc</Link>
            </div>
          </>
        )}
      </div>

      {!expression && (
        <section>
          <h2 className="heading text-xl text-night">Vos séries</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl bg-white">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="border-b border-rule text-slate">
                <tr><th className="px-5 py-3 font-semibold">Série</th><th className="px-5 py-3 font-semibold">Dernier score</th><th className="px-5 py-3 font-semibold">A1-A2</th><th className="px-5 py-3 font-semibold">B1-B2</th><th className="px-5 py-3 font-semibold">C1-C2</th><th className="px-5 py-3 font-semibold">Meilleur</th></tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {series.map((s) => {
                  const r = results.series[seriesKey(epreuve as 'ce' | 'co', s.number)];
                  const band = (k: string) => (r?.last.bands[k] ? `${r.last.bands[k][0]} / ${r.last.bands[k][1]}` : '–');
                  return (
                    <tr key={s.number}>
                      <td className="px-5 py-3"><Link href={`/epreuve/${slug}/series/${s.number}/`} className="font-semibold text-ocean hover:underline">Série {s.number}</Link></td>
                      <td className="px-5 py-3 text-ink">{r ? `${r.last.score} / ${r.last.total}, le ${date(r.last.date)}` : 'Pas encore faite'}</td>
                      <td className="px-5 py-3">{band('A1-A2')}</td>
                      <td className="px-5 py-3">{band('B1-B2')}</td>
                      <td className="px-5 py-3">{band('C1-C2')}</td>
                      <td className="px-5 py-3 font-semibold text-night">{r ? `${r.best} / ${r.last.total}` : '–'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate">Résultats enregistrés sur ce navigateur. Scores par palier indicatifs, pas des scores TCF officiels.</p>
        </section>
      )}

      {expression && (
        <section>
          <h2 className="heading text-xl text-night">Vos corrections</h2>
          {subs === null && <p className="mt-4 text-slate">Chargement…</p>}
          {subs === 'signed-out' && (
            <p className="mt-4 rounded-2xl bg-white p-6 text-slate">
              <Link href={`/connexion/?suite=/epreuve/${slug}/tableau-de-bord/`} className="font-semibold text-ocean hover:underline">Connectez-vous</Link> pour retrouver vos corrections.
            </p>
          )}
          {Array.isArray(subs) && subs.length === 0 && (
            <p className="mt-4 rounded-2xl bg-white p-6 text-slate">
              Aucune correction pour l’instant. <Link href={`/epreuve/${slug}/simulateur/`} className="font-semibold text-ocean hover:underline">Ouvrir le simulateur</Link>
            </p>
          )}
          {Array.isArray(subs) && subs.length > 0 && (
            <ul className="mt-4 divide-y divide-rule rounded-2xl bg-white">
              {subs.map((s) => (
                <li key={s.id} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm text-slate">{date(s.created_at)}</p>
                    <p className="line-clamp-2 text-ink">{s.task_prompt}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    {s.trainer_score !== null
                      ? <><span className="heading text-xl text-night">{s.trainer_score} / 20</span><span className="block text-sm text-green-700">relu par un formateur</span></>
                      : <><span className="heading text-xl text-night">{s.ai_score ?? '–'} / 20</span><span className="block text-sm text-slate">estimation IA</span></>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
