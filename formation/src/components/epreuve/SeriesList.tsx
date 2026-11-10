'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readResults, seriesKey } from '@/lib/results';
import { FREE_SERIES } from '@/content/offers';
import { hasPack, useAccess } from '@/components/access/useAccess';
import { nclcFor, nclcLabel } from '@/lib/nclc';

type Stored = ReturnType<typeof readResults>['series'];

export default function SeriesList({ epreuve, slug, series }: { epreuve: 'ce' | 'co'; slug: string; series: { number: number; count: number }[] }) {
  const [results, setResults] = useState<Stored>({});
  useEffect(() => setResults(readResults().series), []);
  const minutes = epreuve === 'ce' ? 60 : 35;
  const access = useAccess();
  // Neutral while loading: a candidate with a pack never sees « Gratuit » or a lock.
  const unlocked = access === null || hasPack(access);
  const locked = (n: number) => n > FREE_SERIES && !unlocked;

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {series.map((s) => {
        const r = results[seriesKey(epreuve, s.number)];
        return (
          <Link key={s.number} href={`/epreuve/${slug}/series/${s.number}/`} className={`group flex flex-col rounded-3xl p-6 shadow-[0_8px_30px_rgba(20,33,61,.08)] ring-1 transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(20,33,61,.14)] hover:ring-ocean ${locked(s.number) ? 'bg-white/70 ring-rule' : 'bg-white ring-rule'}`}>
            <span className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-3">
                <span className={`display flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${r ? 'bg-gradient-to-br from-ocean to-night text-white' : 'bg-blue-50 text-ocean'}`}>{s.number}</span>
                <span className="heading text-xl text-night group-hover:text-ocean">Série {s.number}</span>
              </span>
              {s.number <= FREE_SERIES
                ? !unlocked && <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-800">Gratuit</span>
                : !unlocked && <span className="inline-flex items-center gap-1 rounded-full bg-paper px-3 py-1 text-xs font-bold text-slate"><svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor"><path d="M6 8V6a4 4 0 1 1 8 0v2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h1Zm2 0h4V6a2 2 0 1 0-4 0v2Z"/></svg>Pack</span>}
            </span>
            <span className="mt-3 text-sm text-slate">{s.count} questions · {minutes} minutes · A1 à C2</span>
            <span className="mt-4 flex-1 text-sm">
              {r
                ? <>
                  <span className="flex flex-wrap items-center gap-2">
                    {r.last.tcf && <span className="rounded-full bg-ocean px-3 py-1 font-bold text-white">{r.last.tcf} / 699</span>}
                    {r.last.tcf && <span className="rounded-full bg-container px-3 py-1 font-bold text-night">{nclcLabel(nclcFor(epreuve, r.last.tcf))}</span>}
                  </span>
                  <span className="mt-2 block text-slate">Meilleur : {r.best} / {r.last.total} · {r.attempts} tentative{r.attempts > 1 ? 's' : ''} · {new Date(r.last.date).toLocaleDateString('fr-CA')}</span>
                </>
                : <span className="text-slate">Pas encore commencée</span>}
            </span>
            <span className={`mt-5 inline-flex items-center justify-center gap-2 self-start rounded-xl px-4 py-2.5 text-sm font-bold transition ${locked(s.number) ? 'border-2 border-ocean bg-white text-ocean group-hover:bg-ocean group-hover:text-white' : 'bg-ocean text-white group-hover:bg-night'}`}>{locked(s.number) ? 'Débloquer avec un pack' : r ? 'Refaire la série' : s.number <= FREE_SERIES && !unlocked ? 'Commencer gratuitement' : 'Commencer'}</span>
          </Link>
        );
      })}
    </div>
  );
}
