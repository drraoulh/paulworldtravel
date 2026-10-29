'use client';

import Link from 'next/link';
import { useCourse } from './useCourse';

/** "Mon parcours" card for the student's space. */
export default function CourseProgressCard({ ids }: { ids: string[] }) {
  const { ready, isDone } = useCourse();
  const pct = ready && ids.length ? Math.round((ids.filter((id) => isDone(id)).length / ids.length) * 100) : 0;
  const link = pct === 0 ? 'Commencer le parcours' : pct === 100 ? 'Voir le parcours' : 'Reprendre le parcours';

  return (
    <div className="rounded-lg bg-white p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="heading text-lg text-night">Mon parcours</h2>
        <span className="heading text-xl text-night">{ready ? `${pct} %` : '…'}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progression du parcours">
        <div className="h-full rounded-full bg-ocean transition-[width] duration-700" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 text-slate">Votre progression est enregistrée sur votre compte.</p>
      <Link href="/parcours/" className="mt-4 inline-block font-bold text-ocean hover:underline">{link}</Link>
    </div>
  );
}
