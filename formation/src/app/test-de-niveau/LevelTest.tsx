'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { estimateLevel, levelAdvice, questions } from '@/content/levelTest';
import { getSupabase } from '@/lib/supabase/client';
import { audienceOf, useAccess } from '@/components/access/useAccess';
import { markDone } from '@/components/parcours/useCourse';

export default function LevelTest({ firstLessonHref }: { firstLessonHref: string }) {
  const audience = audienceOf(useAccess());
  const signedIn = audience === null ? null : audience !== 'visitor';
  const withPack = audience === 'pack';
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  // Save the result (linked to the account when signed in) for the candidate's space and our statistics.
  useEffect(() => {
    if (!done) return;
    const supabase = getSupabase();
    if (!supabase) return;
    (async () => {
      const { data } = await supabase.auth.getSession();
      await supabase.from('level_test_results').insert({
        user_id: data.session?.user.id ?? null,
        level: estimateLevel(correct),
        score: correct,
        total: questions.length,
      });
    })().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  // Bring the card back into view when the question or the result changes.
  useEffect(() => {
    const el = top.current;
    if (el && el.getBoundingClientRect().top < 80) el.scrollIntoView({ block: 'start' });
  }, [index, done]);

  const q = questions[index];
  const picked = answers[index];
  const correct = answers.filter((a, i) => a === questions[i].answer).length;

  const pick = (choice: number) => {
    if (checked) return;
    setAnswers((prev) => prev.map((a, i) => (i === index ? choice : a)));
  };
  const next = () => {
    if (!checked) return setChecked(true);
    setChecked(false);
    if (index + 1 < questions.length) setIndex(index + 1);
    else { setDone(true); markDone('test-niveau'); }
  };
  const restart = () => {
    setAnswers(questions.map(() => null));
    setIndex(0);
    setChecked(false);
    setDone(false);
  };

  if (done) {
    const level = estimateLevel(correct);
    return (
      <div ref={top} className="scroll-mt-24 rounded-lg bg-white p-6 sm:p-10" aria-live="polite">
        <p className="text-slate">Votre niveau estimé</p>
        <p className="display mt-2 text-7xl text-night">{level}</p>
        <p className="mt-2 font-semibold text-night">{correct} bonnes réponses sur {questions.length}</p>
        <p className="mt-6 max-w-2xl text-lg">{levelAdvice[level]}</p>
        <p className="mt-4 max-w-2xl text-sm text-slate">
          Cette indication porte sur la grammaire, le vocabulaire et la lecture. L’écoute, l’expression écrite et l’expression orale ne sont pas évaluées. Ce résultat n’est pas un score officiel TCF ou NCLC.
        </p>
        <div className="mt-6 rounded-xl bg-paper p-5">
          <h2 className="heading text-xl text-night">Votre première séance : découvrir la méthode de lecture</h2>
          <p className="mt-2 text-slate">{withPack
            ? 'Commencez par la leçon de méthode, puis faites les séries de lecture et d’écoute de votre pack. Travaillez ensuite les autres compétences pour compléter ce premier bilan.'
            : 'Commencez par une leçon gratuite, puis faites la série gratuite. Travaillez ensuite les autres compétences pour compléter ce premier bilan.'}</p>
          <Link href={firstLessonHref} className="mt-4 inline-flex rounded-full bg-night px-6 py-3 font-bold text-white hover:bg-ocean">{withPack ? 'Commencer ma première leçon' : 'Commencer ma première leçon gratuite'}</Link>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={signedIn ? '/parcours/' : `/inscription/?niveau=${level}`} className="inline-flex items-center justify-center rounded-full bg-container px-6 py-3 font-bold text-night hover:bg-container-hover">
            {signedIn ? 'Continuer mon parcours' : 'Créer mon compte gratuit'}
          </Link>
          <button onClick={restart} className="inline-flex items-center justify-center rounded-md border-2 border-night px-6 py-3 font-bold text-night hover:bg-night hover:text-white">
            Recommencer le test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={top} className="scroll-mt-24 rounded-lg bg-white p-6 sm:p-10">
      <div className="flex items-center justify-between gap-4 text-sm text-slate">
        <span>Question {index + 1} sur {questions.length}</span>
        <span>Niveau {q.level}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper" aria-hidden="true">
        <div className="h-full bg-ocean transition-all" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>

      {q.text && (
        <blockquote className="mt-8 border-l-4 border-sky bg-paper p-5 text-ink">{q.text}</blockquote>
      )}
      <fieldset className="mt-8">
        <legend className="heading text-xl text-night sm:text-2xl">{q.prompt}</legend>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {q.choices.map((choice, i) => {
            const isPicked = picked === i;
            const isRight = checked && i === q.answer;
            const isWrong = checked && isPicked && i !== q.answer;
            const state = isRight
              ? 'border-green-600 bg-green-50'
              : isWrong
                ? 'border-maple bg-red-50'
                : isPicked
                  ? 'border-ocean bg-blue-50'
                  : 'border-rule hover:border-ocean';
            return (
              <label key={choice} className={`flex cursor-pointer items-center gap-3 rounded-md border-2 p-4 ${state} ${checked ? 'cursor-default' : ''}`}>
                <input
                  type="radio"
                  name={`q${index}`}
                  checked={isPicked}
                  onChange={() => pick(i)}
                  disabled={checked}
                  className="h-4 w-4 accent-ocean"
                />
                <span className="font-medium">{choice}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {checked && (
        <p className="mt-6 rounded-md bg-paper p-4" aria-live="polite">
          <span className={`font-bold ${picked === q.answer ? 'text-green-700' : 'text-maple'}`}>
            {picked === q.answer ? 'Bonne réponse. ' : `La bonne réponse était « ${q.choices[q.answer]} ». `}
          </span>
          {q.explanation}
        </p>
      )}

      <button
        onClick={next}
        disabled={picked === null}
        className="mt-8 inline-flex items-center justify-center rounded-md bg-night px-6 py-3 font-bold text-white hover:bg-ocean disabled:cursor-not-allowed disabled:opacity-40"
      >
        {!checked ? 'Valider ma réponse' : index + 1 < questions.length ? 'Question suivante' : 'Voir mon résultat'}
      </button>
    </div>
  );
}
