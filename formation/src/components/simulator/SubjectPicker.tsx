'use client';

import { useEffect, useState, type ReactNode, type RefObject } from 'react';

type Subject = { id: string; task: 1 | 2 | 3; prompt: string };

const TASKS = [1, 2, 3] as const;

/**
 * Subject choice for the expression simulators: one tab per task and a short,
 * scrollable list, so the work area stays close. Choosing a subject scrolls to it.
 */
export default function SubjectPicker<T extends Subject>({
  subjects,
  selected,
  onSelect,
  workArea,
  describeTask,
  meta,
  disabled = false,
  extra,
}: {
  subjects: T[];
  selected: T;
  onSelect: (subject: T) => void;
  workArea: RefObject<HTMLElement | null>;
  describeTask: (task: 1 | 2 | 3) => string;
  meta?: (subject: T) => ReactNode;
  disabled?: boolean;
  extra?: ReactNode;
}) {
  const [tab, setTab] = useState<1 | 2 | 3>(selected.task);
  useEffect(() => setTab(selected.task), [selected.task]);
  const list = subjects.filter((s) => s.task === tab);

  const choose = (subject: T) => {
    onSelect(subject);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => workArea.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }));
  };

  return (
    <fieldset id="choix-du-sujet" className="scroll-mt-24" disabled={disabled}>
      <legend className="heading mb-3 text-lg text-night">Choisissez une tâche, puis un sujet</legend>
      {extra}
      <div role="tablist" aria-label="Tâches" className="grid grid-cols-3 gap-2">
        {TASKS.map((n) => (
          <button
            key={n}
            type="button"
            role="tab"
            aria-selected={tab === n}
            onClick={() => setTab(n)}
            className={`rounded-xl border-2 px-3 py-3 text-left transition-colors ${tab === n ? 'border-ocean bg-container' : 'border-rule bg-white hover:border-ocean/50'}`}
          >
            <span className="block font-bold text-night">Tâche {n}</span>
            <span className="mt-0.5 block text-xs text-slate sm:text-sm">{describeTask(n)}</span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-sm">
        <span className="text-slate">{list.length} sujet{list.length > 1 ? 's' : ''} pour la tâche {tab}</span>
        {list.length > 1 && (
          <button type="button" onClick={() => choose(list[Math.floor(Math.random() * list.length)])} className="font-semibold text-ocean underline-offset-4 hover:underline">
            Sujet au hasard
          </button>
        )}
      </div>

      <ul role="tabpanel" aria-label={`Sujets de la tâche ${tab}`} className="mt-2 max-h-[22rem] space-y-2 overflow-y-auto rounded-2xl border border-rule bg-paper p-2">
        {list.map((s) => (
          <li key={s.id}>
            <label className={`block cursor-pointer rounded-xl border-2 bg-white px-4 py-3 ${s.id === selected.id ? 'border-ocean' : 'border-transparent hover:border-ocean/40'}`}>
              <input type="radio" name="subject" className="sr-only" checked={s.id === selected.id} onChange={() => choose(s)} />
              <span className="line-clamp-2 block text-sm text-ink">{s.prompt}</span>
              {meta && <span className="mt-1 block text-xs text-slate">{meta(s)}</span>}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

/** Link shown at the top of the work area to go back to the subject list. */
export function ChangeSubject() {
  return (
    <a href="#choix-du-sujet" className="text-sm font-semibold text-ocean underline-offset-4 hover:underline">Changer de sujet</a>
  );
}
