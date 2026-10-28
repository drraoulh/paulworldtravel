'use client';

import { useMemo, useState } from 'react';
import type { QuizQuestion } from '@/content/parcours';
import { seededOrder as order } from '@/lib/shuffle';
import { useDoneLessons } from './progress';

export default function LessonQuiz({ questions, lessonId }: { questions: QuizQuestion[]; lessonId: string }) {
  const orders = useMemo(() => questions.map((q) => order(q.prompt, q.choices.length)), [questions]);
  const [picked, setPicked] = useState<(number | null)[]>(questions.map(() => null));
  const [checked, setChecked] = useState(false);
  const { toggle } = useDoneLessons();
  const score = questions.reduce((n, q, i) => n + (picked[i] === q.answer ? 1 : 0), 0);
  const complete = picked.every((p) => p !== null);

  const check = () => {
    setChecked(true);
    if (score === questions.length) toggle(lessonId, true);
  };

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => (
        <fieldset key={q.prompt} className="rounded-2xl border border-rule bg-white p-5 sm:p-6">
          <legend className="sr-only">Question {qi + 1}</legend>
          <p className="font-semibold text-night">{qi + 1}. {q.prompt}</p>
          <div className="mt-4 grid gap-2">
            {orders[qi].map((ci) => {
              const chosen = picked[qi] === ci;
              const state = !checked ? (chosen ? 'border-ocean bg-blue-50' : 'border-rule hover:border-ocean/50')
                : ci === q.answer ? 'border-green-600 bg-green-50' : chosen ? 'border-maple bg-red-50' : 'border-rule opacity-70';
              return (
                <label key={ci} className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 px-4 py-3 text-ink ${state}`}>
                  <input
                    type="radio"
                    name={`q-${qi}`}
                    className="mt-1 h-4 w-4 accent-[var(--color-ocean)]"
                    checked={chosen}
                    disabled={checked}
                    onChange={() => setPicked((p) => p.map((v, i) => (i === qi ? ci : v)))}
                  />
                  <span>{q.choices[ci]}</span>
                </label>
              );
            })}
          </div>
          {checked && (
            <p className={`mt-4 text-sm ${picked[qi] === q.answer ? 'text-green-800' : 'text-maple'}`}>
              <strong>{picked[qi] === q.answer ? 'Bonne réponse. ' : 'Pas tout à fait. '}</strong>
              <span className="text-slate">{q.explanation}</span>
            </p>
          )}
        </fieldset>
      ))}
      <div className="flex flex-wrap items-center gap-4" aria-live="polite">
        {!checked ? (
          <button onClick={check} disabled={!complete} className="rounded-xl bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean disabled:opacity-50">
            Vérifier mes réponses
          </button>
        ) : (
          <>
            <p className="heading text-xl text-night">{score} / {questions.length}</p>
            <p className="text-slate">{score === questions.length ? 'Leçon validée.' : 'Relisez les passages concernés, puis réessayez.'}</p>
            <button onClick={() => { setPicked(questions.map(() => null)); setChecked(false); }} className="rounded-xl border border-rule px-5 py-3 font-semibold text-night hover:border-ocean">
              Recommencer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
