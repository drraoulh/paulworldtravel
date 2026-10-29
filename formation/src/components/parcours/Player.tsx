'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import type { CourseItem } from '@/content/parcours/course';
import { KIND_LABEL, KindIcon, StatusMark } from './CourseHome';
import { markDone, markVisit, percent, useCourse } from './useCourse';

/** Remembers the item for the "Reprendre" button of the course page. */
export function TrackVisit({ item }: { item: { id: string; href: string; title: string } }) {
  useEffect(() => { markVisit(item); }, [item]);
  return null;
}

/** Module progress, shown in the player's top bar. */
export function ModuleProgress({ items }: { items: CourseItem[] }) {
  const { isDone, ready } = useCourse();
  const pct = ready ? percent(items, isDone) : 0;
  return (
    <div className="flex min-w-48 items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-paper" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progression du module">
        <div className="h-full rounded-full bg-ocean transition-[width] duration-700" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-semibold tabular-nums text-night">{pct} %</span>
    </div>
  );
}

/** The module outline, beside the lesson. */
export function ModuleOutline({ title, number, items, currentId }: { title: string; number: number; items: CourseItem[]; currentId: string }) {
  const { isDone } = useCourse();
  return (
    <nav aria-label={`Module ${number}`} className="rounded-2xl bg-white p-4">
      <p className="px-2 text-sm text-slate">Module {number}</p>
      <p className="heading px-2 text-lg text-night">{title}</p>
      <ol className="mt-3 space-y-0.5">
        {items.map((it) => {
          const current = it.id === currentId;
          return (
            <li key={it.id}>
              <Link href={it.href} aria-current={current ? 'page' : undefined}
                className={`flex items-start gap-3 rounded-xl px-2 py-2.5 text-sm ${current ? 'bg-blue-50 font-semibold text-night' : 'text-ink hover:bg-paper'}`}>
                <StatusMark done={isDone(it.id)} current={current} />
                <span className="min-w-0 flex-1">
                  <span className="block">{it.title}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-xs font-normal text-slate"><KindIcon kind={it.kind} className="h-3.5 w-3.5" />{KIND_LABEL[it.kind]}, {it.minutes} min</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Bottom bar: mark the lesson finished, then go to the next item. */
export function NextBar({ id, next }: { id: string; next: CourseItem | null }) {
  const { isDone } = useCourse();
  const ok = isDone(id);
  return (
    <div className="sticky bottom-0 z-10 -mx-4 border-t border-rule bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
      <div className="flex items-center gap-3">
        <button onClick={() => markDone(id, !ok)} aria-pressed={ok}
          className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold ${ok ? 'bg-green-50 text-green-800' : 'border border-rule text-night hover:border-night'}`}>
          <StatusMark done={ok} />
          <span className="hidden sm:inline">{ok ? 'Terminée' : 'Marquer comme terminée'}</span>
          <span className="sm:hidden">{ok ? 'Terminée' : 'Terminer'}</span>
        </button>
        {next ? (
          <Link href={next.href} onClick={() => { if (!ok) markDone(id); }}
            className="ml-auto flex min-w-0 items-center rounded-full bg-night px-5 py-3 text-sm font-bold text-white hover:bg-ocean">
            <span className="truncate">Suivant : {next.title}</span>
          </Link>
        ) : (
          <Link href="/parcours/" className="ml-auto shrink-0 rounded-full bg-container px-5 py-3 text-sm font-bold text-night hover:bg-container-hover">Retour au parcours</Link>
        )}
      </div>
    </div>
  );
}
