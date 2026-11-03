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
          <Link key={s.number} href={`/epreuve/${slug}/series/${s.number}/`} className="group flex flex-col rounded-2xl border border-rule bg-white p-6 transition-colors hover:border-ocean">
            <span className="flex items-center justify-between gap-3">
              <span className="heading text-2xl text-night group-hover:text-ocean">Série {s.number}</span>
              {s.number <= FREE_SERIES
                ? <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-800">Gratuit</span>
                : !unlocked && <span className="rounded-full bg-paper px-3 py-1 text-xs font-bold text-slate">Pack</span>}
            </span>
            <span className="mt-1 text-slate">{s.count} questions, {minutes} minutes, A1 à C2</span>
            <span className="mt-5 text-sm">
              {r
                ? <><strong className="text-night">Meilleur score : {r.best} / {r.last.total}</strong><span className="block text-slate">{r.attempts} tentative{r.attempts > 1 ? 's' : ''}, dernière le {new Date(r.last.date).toLocaleDateString('fr-CA')}</span></>
                : <span className="text-slate">Pas encore commencée</span>}
            </span>
            <span className="mt-5 font-bold text-ocean">{s.number > FREE_SERIES && !unlocked ? 'Débloquer avec un pack' : r ? 'Refaire la série' : s.number <= FREE_SERIES ? 'Commencer gratuitement' : 'Commencer'}</span>
          </Link>
        );
      })}
    </div>
  );
}
