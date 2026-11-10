import Link from 'next/link';
import type { SeriesQuestion } from '@/content/series';
import { rightChoice } from '@/content/series';
import { cefrForScore, estimateTcfScore, LEVEL_POINTS, NCLC_TABLE, nclcFor, nclcLabel, TCF_MAX, TCF_MIN, type Cefr } from '@/lib/nclc';

const LEVELS: Cefr[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const pct = (score: number) => ((score - TCF_MIN) / (TCF_MAX - TCF_MIN)) * 100;

/**
 * Result of a 39-question series, presented like the official attestation:
 * score out of 699, CEFR level, NCLC level, then where the points were lost.
 * The method follows France Éducation international (score from 100 to 699 that
 * weighs each right answer by the difficulty of the question, no penalty for a
 * wrong answer) and the IRCC table for the NCLC. See src/lib/nclc.ts.
 */
export default function ScoreReport({ epreuve, title, questions, answers }: {
  epreuve: 'ce' | 'co';
  title: string;
  questions: SeriesQuestion[];
  answers: (number | null)[];
}) {
  const items = questions.map((q, i) => ({ level: q.level as Cefr, correct: answers[i] === rightChoice(q), answered: answers[i] !== null }));
  const right = items.filter((i) => i.correct).length;
  const blank = items.filter((i) => !i.answered).length;
  const tcf = estimateTcfScore(items);
  const nclc = nclcFor(epreuve, tcf);
  const cefr = cefrForScore(tcf);
  // Next NCLC level and the points still missing to reach it.
  const table = [...NCLC_TABLE].sort((a, b) => a.nclc - b.nclc);
  const next = table.find((r) => r[epreuve][0] > tcf);
  const rows = LEVELS.map((level) => {
    const of = items.filter((i) => i.level === level);
    const ok = of.filter((i) => i.correct).length;
    return { level, ok, total: of.length, earned: ok * LEVEL_POINTS[level], possible: of.length * LEVEL_POINTS[level] };
  }).filter((r) => r.total > 0);
  const weakest = rows.filter((r) => r.ok < r.total).sort((a, b) => (b.possible - b.earned) - (a.possible - a.earned))[0];
  const ring = 2 * Math.PI * 54;

  return (
    <section aria-label="Votre résultat" className="overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgba(20,33,61,.10)]">
      <div className="bg-gradient-to-br from-night-deep via-night to-ocean p-6 text-white sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">{title}</p>
        <div className="mt-6 grid items-center gap-8 md:grid-cols-[auto_1fr]">
          <div className="relative mx-auto h-44 w-44">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="10" />
              <circle cx="60" cy="60" r="54" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeDasharray={ring} strokeDashoffset={ring * (1 - pct(tcf) / 100)} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="display text-5xl">{tcf}</span>
              <span className="text-sm text-blue-200">sur 699</span>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-lg font-bold text-night">{nclcLabel(nclc)}</span>
              {cefr && <span className="rounded-full bg-white/15 px-4 py-2 text-lg font-bold">Niveau {cefr}</span>}
            </div>
            <dl className="mt-6 grid grid-cols-3 gap-4 text-center sm:max-w-md sm:text-left">
              <div><dt className="text-sm text-blue-200">Bonnes réponses</dt><dd className="heading text-2xl">{right} / {questions.length}</dd></div>
              <div><dt className="text-sm text-blue-200">Erreurs</dt><dd className="heading text-2xl">{questions.length - right - blank}</dd></div>
              <div><dt className="text-sm text-blue-200">Sans réponse</dt><dd className="heading text-2xl">{blank}</dd></div>
            </dl>
            <p className="mt-5 text-blue-50">
              {next
                ? <>Il vous manque <strong className="text-white">{next[epreuve][0] - tcf} points</strong> pour atteindre le {nclcLabel(next.nclc)} ({next[epreuve][0]} points).</>
                : <>Vous êtes au plus haut niveau du barème : NCLC 10 et plus.</>}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8 p-6 sm:p-10">
        <div>
          <h2 className="heading text-xl text-night">Où vous situez-vous ?</h2>
          <div className="relative mt-10">
            <div className="flex h-3 overflow-hidden rounded-full">
              {['bg-slate-200', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-500', 'bg-blue-700'].map((c, i) => <span key={i} className={`flex-1 ${c} ${i ? 'border-l-2 border-white' : ''}`} />)}
            </div>
            <span className="absolute -top-8 -translate-x-1/2 rounded-md bg-night px-2 py-0.5 text-sm font-bold text-white" style={{ left: `${pct(tcf)}%` }}>{tcf}</span>
            <span className="absolute -top-1.5 h-6 w-1 -translate-x-1/2 rounded bg-night" style={{ left: `${pct(tcf)}%` }} aria-hidden="true" />
            <div className="mt-2 flex text-center text-xs font-semibold text-slate">
              {LEVELS.map((l, i) => <span key={l} className="flex-1">{l}<span className="hidden font-normal sm:block">{(i + 1) * 100} à {i === 5 ? 699 : (i + 1) * 100 + 99}</span></span>)}
            </div>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {table.map((r) => (
              <li key={r.nclc} className={`rounded-lg border px-3 py-1.5 text-sm ${nclc === r.nclc ? 'border-ocean bg-ocean font-bold text-white' : tcf >= r[epreuve][0] ? 'border-blue-200 bg-blue-50 text-night' : 'border-rule text-slate'}`}>
                NCLC {r.nclc}{r.nclc === 10 ? '+' : ''} <span className="opacity-80">dès {r[epreuve][0]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="heading text-xl text-night">Vos points, niveau par niveau</h2>
          <p className="mt-1 text-slate">Plus une question est difficile, plus elle rapporte : une erreur en C1 ou C2 coûte bien plus qu’une erreur en A1.</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[30rem] text-left">
              <thead className="text-sm text-slate">
                <tr><th className="py-2 pr-3 font-semibold">Niveau</th><th className="py-2 pr-3 font-semibold">Réussite</th><th className="py-2 pr-3 font-semibold">Par question</th><th className="py-2 pr-3 font-semibold">Points gagnés</th><th className="py-2 font-semibold">Points perdus</th></tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {rows.map((r) => (
                  <tr key={r.level}>
                    <th scope="row" className="py-3 pr-3"><span className="rounded-md bg-container px-2.5 py-1 font-bold text-night">{r.level}</span></th>
                    <td className="py-3 pr-3">
                      <span className="font-semibold text-night">{r.ok} / {r.total}</span>
                      <span className="mt-1 block h-1.5 w-24 overflow-hidden rounded-full bg-rule"><span className="block h-full rounded-full bg-ocean" style={{ width: `${(r.ok / r.total) * 100}%` }} /></span>
                    </td>
                    <td className="py-3 pr-3 text-slate">{LEVEL_POINTS[r.level]} pts</td>
                    <td className="py-3 pr-3 font-semibold text-green-800">{r.earned}</td>
                    <td className={`py-3 font-semibold ${r.possible - r.earned ? 'text-maple' : 'text-slate'}`}>{r.possible - r.earned ? `− ${r.possible - r.earned}` : '0'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {weakest && (
            <p className="mt-4 rounded-xl border-l-4 border-ocean bg-blue-50 p-4 text-night">
              <strong>Votre priorité : les questions {weakest.level}.</strong> C’est là que vous perdez le plus de points ({weakest.possible - weakest.earned} sur {weakest.possible}). Revoyez ces questions ci-dessous avant de refaire une série.
            </p>
          )}
        </div>

        <details className="rounded-xl bg-paper p-5">
          <summary className="font-semibold text-night">Comment ce score est-il calculé ?</summary>
          <div className="mt-3 space-y-3 text-sm text-slate">
            <p><strong className="text-night">À l’examen officiel.</strong> France Éducation international corrige les 39 questions de façon centralisée et transforme le nombre de bonnes réponses en un score de 100 à 699 qui tient compte de la difficulté de chaque question. Une mauvaise réponse n’enlève pas de point : répondez toujours. Chaque centaine correspond à un niveau (A1 de 100 à 199, A2 de 200 à 299… C2 de 600 à 699).</p>
            <p><strong className="text-night">Sur cette plateforme.</strong> Le poids exact de chaque question officielle n’est pas publié. Nous appliquons la grille par niveau utilisée en préparation : A1 3 points, A2 9, B1 15, B2 21, C1 26, C2 33, soit 699 points pour 39 questions. Le résultat est une estimation, pas un score officiel.</p>
            <p><strong className="text-night">Le NCLC.</strong> Immigration Canada (IRCC) convertit le score de chaque épreuve en niveau de compétence linguistique canadien. C’est ce niveau, épreuve par épreuve, qui compte dans votre dossier.</p>
            <p><Link href="/calculateur-nclc/" className="font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Calculer mon NCLC sur les quatre épreuves</Link></p>
          </div>
        </details>
      </div>
    </section>
  );
}
