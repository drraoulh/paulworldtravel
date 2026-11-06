'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readResults, type MockResult } from '@/lib/results';
import { nclcFor, nclcLabel } from '@/lib/nclc';
import { PROGRESS_EVENT } from '@/components/parcours/useCourse';

type Store = ReturnType<typeof readResults>;
const day = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
const twenty = (n: number | null | undefined) => (typeof n === 'number' ? `${String(n).replace('.', ',')} / 20` : null);

function Part({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg bg-paper p-3">
      <p className="text-xs font-semibold text-slate">{label}</p>
      <p className="mt-0.5 font-bold text-night">{value}</p>
      {sub && <p className="text-xs text-slate">{sub}</p>}
    </div>
  );
}

function Mock({ m }: { m: MockResult }) {
  // Older results saved before the step-by-step record have both comprehensions.
  const done = m.done ?? ['co', 'ce'];
  const comp = (skill: 'co' | 'ce', score: number, tcf?: number) =>
    done.includes(skill) ? { value: `${score} / ${m.total}`, sub: tcf ? `${tcf} / 699, ${nclcLabel(nclcFor(skill, tcf))}` : undefined } : { value: 'Non passée' };
  const co = comp('co', m.co, m.tcfCo);
  const ce = comp('ce', m.ce, m.tcfCe);
  return (
    <li className="rounded-xl border border-rule p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-bold text-night">Examen blanc {m.serie}</p>
        <p className="text-sm text-slate">{day(m.date)} · {done.length === 4 ? 'terminé' : `${done.length} épreuve${done.length > 1 ? 's' : ''} sur 4`}</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Part label="Compréhension orale" {...co} />
        <Part label="Compréhension écrite" {...ce} />
        <Part label="Expression écrite" value={done.includes('ee') ? twenty(m.ee) ?? 'Rédigée' : 'Non passée'} />
        <Part label="Expression orale" value={done.includes('eo') ? twenty(m.eo) ?? 'Passée' : 'Non passée'} />
      </div>
    </li>
  );
}

/** Mock exams and series scores, kept in the browser and synced with the account. */
export default function MyScores() {
  const [store, setStore] = useState<Store | null>(null);
  useEffect(() => {
    const load = () => setStore(readResults());
    load();
    window.addEventListener(PROGRESS_EVENT, load);
    return () => window.removeEventListener(PROGRESS_EVENT, load);
  }, []);
  if (!store) return null;

  const series = Object.entries(store.series)
    .map(([key, r]) => ({ key, ...r }))
    .sort((a, b) => Date.parse(b.last.date) - Date.parse(a.last.date))
    .slice(0, 8);
  const label = (key: string) => `${key.startsWith('co') ? 'Compréhension orale' : 'Compréhension écrite'}, série ${key.split('-')[1]}`;

  return (
    <div className="rounded-2xl border border-rule bg-white p-6">
      <h3 className="heading text-lg text-night">Mes examens blancs</h3>
      {store.mocks.length === 0 ? (
        <p className="mt-2 text-slate">Vos examens blancs apparaîtront ici, avec le score de chaque épreuve dès qu’elle est terminée.</p>
      ) : (
        <ul className="mt-4 space-y-3">{store.mocks.map((m) => <Mock key={m.date} m={m} />)}</ul>
      )}
      <Link href="/examen-blanc/" className="mt-4 inline-block font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Passer un examen blanc</Link>

      <h3 className="heading mt-8 text-lg text-night">Mes séries d’entraînement</h3>
      {series.length === 0 ? (
        <p className="mt-2 text-slate">Les scores de vos séries de compréhension orale et écrite apparaîtront ici.</p>
      ) : (
        <ul className="mt-3 divide-y divide-rule">
          {series.map((s) => {
            const skill = s.key.startsWith('co') ? 'co' : 'ce';
            return (
              <li key={s.key} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                <span className="font-semibold text-night">{label(s.key)}</span>
                <span className="text-sm text-slate">
                  <strong className="text-night">{s.last.score} / {s.last.total}</strong>
                  {s.last.tcf ? ` · ${nclcLabel(nclcFor(skill, s.last.tcf))}` : ''} · meilleur {s.best} / {s.last.total} · {day(s.last.date)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
