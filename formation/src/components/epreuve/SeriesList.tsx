'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readResults, seriesKey } from '@/lib/results';
import { FREE_SERIES } from '@/content/offers';
import { hasPack, useAccess } from '@/components/access/useAccess';

type Stored = ReturnType<typeof readResults>['series'];

export default function SeriesList({ epreuve, slug, series }: { epreuve: 'ce' | 'co'; slug: string; series: { number: number; count: number }[] }) {
  const [results, setResults] = useState<Stored>({});
  useEffect(() => setResults(readResults().series), []);
  const minutes = epreuve === 'ce' ? 60 : 35;
  const unlocked = hasPack(useAccess());

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {series.map((s) => {
        const r = results[seriesKey(epreuve, s.number)];
        return (
          <Link key={s.number} href={`/epreuve/${slug}/series/${s.number}/`} className={`group flex flex-col rounded-2xl border-2 p-6 shadow-[0_6px_20px_rgba(20,33,61,.07)] transition hover:-translate-y-1 hover:border-ocean hover:shadow-lg ${s.number > FREE_SERIES && !unlocked ? 'border-rule bg-paper/70' : 'border-rule bg-white'}`}>
            <span className="flex items-center justify-between gap-3">
              <span className="heading text-2xl text-night group-hover:text-ocean">Série {s.number}</span>
              {s.number <= FREE_SERIES
                ? <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-800">Gratuit</span>
                : !unlocked && <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate"><svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor"><path d="M6 8V6a4 4 0 1 1 8 0v2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h1Zm2 0h4V6a2 2 0 1 0-4 0v2Z"/></svg>Pack</span>}
            </span>
            <span className="mt-1 text-slate">{s.count} questions, {minutes} minutes, A1 à C2</span>
            <span className="mt-5 text-sm">
              {r
                ? <><strong className="text-night">Meilleur score : {r.best} / {r.last.total}</strong><span className="block text-slate">{r.attempts} tentative{r.attempts > 1 ? 's' : ''}, dernière le {new Date(r.last.date).toLocaleDateString('fr-CA')}</span></>
                : <span className="text-slate">Pas encore commencée</span>}
            </span>
            <span className={`mt-5 inline-flex items-center justify-center gap-2 self-start rounded-lg px-4 py-2.5 text-sm font-bold transition ${s.number > FREE_SERIES && !unlocked ? 'border-2 border-ocean bg-white text-ocean group-hover:bg-ocean group-hover:text-white' : 'bg-ocean text-white group-hover:bg-night'}`}>{s.number > FREE_SERIES && !unlocked ? 'Débloquer avec un pack' : r ? 'Refaire la série' : s.number <= FREE_SERIES ? 'Commencer gratuitement' : 'Commencer'}</span>
          </Link>
        );
      })}
    </div>
  );
}
