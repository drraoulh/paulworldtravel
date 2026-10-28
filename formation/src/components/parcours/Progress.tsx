'use client';

import { useDoneLessons } from './useDoneLessons';

/** Count of completed lessons among `ids`, with a bar. */
export function ProgressBar({ ids, label = 'leçons terminées', dark = false }: { ids: string[]; label?: string; dark?: boolean }) {
  const { done } = useDoneLessons();
  const n = ids.filter((id) => done.includes(id)).length;
  return (
    <div>
      <p className={`text-sm ${dark ? 'text-blue-100' : 'text-slate'}`}>{n} / {ids.length} {label}</p>
      <div className={`mt-2 h-1.5 overflow-hidden rounded-full ${dark ? 'bg-white/15' : 'bg-paper'}`} aria-hidden="true">
        <div className={`h-full ${dark ? 'bg-container' : 'bg-ocean'} transition-all`} style={{ width: `${ids.length ? (n / ids.length) * 100 : 0}%` }} />
      </div>
    </div>
  );
}

/** Small round marker: filled when the lesson is completed. */
export function LessonMark({ id }: { id: string }) {
  const { done } = useDoneLessons();
  const ok = done.includes(id);
  return (
    <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 ${ok ? 'border-green-600 bg-green-600 text-white' : 'border-rule bg-white'}`}>
      {ok && <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" /></svg>}
      <span className="sr-only">{ok ? 'Terminée' : 'À faire'}</span>
    </span>
  );
}

export function DoneButton({ id }: { id: string }) {
  const { done, toggle } = useDoneLessons();
  const ok = done.includes(id);
  return (
    <button onClick={() => toggle(id)} className={`rounded-xl px-5 py-3 font-bold ${ok ? 'border-2 border-green-600 text-green-800' : 'bg-container text-night hover:bg-container-hover'}`}>
      {ok ? 'Leçon terminée' : 'Marquer comme terminée'}
    </button>
  );
}
