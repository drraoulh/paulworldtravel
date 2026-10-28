'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase/client';

type Exercise = {
  id: string;
  level: string;
  content: { title: string; document: string; questions: { prompt: string; choices: string[]; answer: number; explanation: string }[] };
};

/** Reading exercises written by the team (AI drafts reviewed and approved in /admin/generer/). */
export default function TeamSeries() {
  const [items, setItems] = useState<Exercise[]>([]);
  const [picked, setPicked] = useState<Record<string, number>>({});

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    supabase
      .from('question_drafts')
      .select('id, level, content')
      .eq('status', 'approved')
      .eq('epreuve', 'ce')
      .order('created_at', { ascending: false })
      .limit(12)
      .then((res: { data: Exercise[] | null }) => setItems(res.data ?? []));
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="heading text-2xl text-night">Exercices de l’équipe</h2>
      <p className="mt-2 max-w-3xl text-slate">De nouveaux documents ajoutés régulièrement par nos formateurs. Choisissez une réponse pour voir la correction.</p>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {items.map((ex) => (
          <article key={ex.id} className="rounded-2xl border border-rule bg-white p-6">
            <p className="text-sm font-bold text-ocean">Niveau {ex.level}</p>
            <h3 className="heading mt-1 text-lg text-night">{ex.content.title}</h3>
            <p className="mt-3 whitespace-pre-line rounded-xl bg-paper p-4 text-sm">{ex.content.document}</p>
            {ex.content.questions.map((q, qi) => {
              const key = `${ex.id}-${qi}`;
              const choice = picked[key];
              return (
                <fieldset key={key} className="mt-5">
                  <legend className="font-semibold text-night">{q.prompt}</legend>
                  <div className="mt-2 space-y-2">
                    {q.choices.map((c, ci) => {
                      const state = choice === undefined ? 'border-rule hover:border-ocean' : ci === q.answer ? 'border-green-600 bg-green-50' : ci === choice ? 'border-maple bg-red-50' : 'border-rule opacity-70';
                      return (
                        <label key={ci} className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 text-sm ${state}`}>
                          <input type="radio" name={key} disabled={choice !== undefined} onChange={() => setPicked({ ...picked, [key]: ci })} className="accent-ocean" />
                          {c}
                        </label>
                      );
                    })}
                  </div>
                  {choice !== undefined && <p className="mt-2 text-sm text-slate" aria-live="polite">{choice === q.answer ? 'Bonne réponse. ' : ''}{q.explanation}</p>}
                </fieldset>
              );
            })}
          </article>
        ))}
      </div>
    </div>
  );
}
