'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BANDS, SERIES_SECONDS, type SeriesQuestion } from '@/content/series';
import { seededOrder } from '@/lib/shuffle';
import { saveSeriesResult, seriesKey, type SeriesResult } from '@/lib/results';
import { playDocument, stopSpeaking, warmUpVoices } from '@/lib/speech';

type Mode = 'exam' | 'training';
type Listen = 'ready' | 'playing' | 'heard';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

function grade(questions: SeriesQuestion[], answers: (number | null)[]) {
  const bands: SeriesResult['bands'] = {};
  let score = 0;
  questions.forEach((q, i) => {
    const band = BANDS.find((b) => (b.levels as readonly string[]).includes(q.level))!.label;
    const [ok, total] = bands[band] ?? [0, 0];
    const right = answers[i] === 0;
    if (right) score++;
    bands[band] = [ok + (right ? 1 : 0), total + 1];
  });
  return { score, bands };
}

export default function SeriesRunner({ epreuve, number, questions, forceMode, onFinish }: {
  epreuve: 'ce' | 'co';
  number: number;
  questions: SeriesQuestion[];
  /** Mock exam: skip the mode choice and report the score. */
  forceMode?: Mode;
  onFinish?: (score: number) => void;
}) {
  const isCo = epreuve === 'co';
  const [mode, setMode] = useState<Mode | null>(forceMode ?? null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [checked, setChecked] = useState<boolean[]>(questions.map(() => false));
  const [listen, setListen] = useState<Listen>('ready');
  const [plays, setPlays] = useState(0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [left, setLeft] = useState<number>(SERIES_SECONDS[epreuve]);
  const [done, setDone] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const orders = useMemo(() => questions.map((q, i) => seededOrder(`${epreuve}${number}-${i}-${q.prompt}`, 4)), [questions, epreuve, number]);
  const q = questions[index];

  useEffect(() => { warmUpVoices(); return stopSpeaking; }, []);

  const finish = useCallback(() => {
    stopSpeaking();
    setDone(true);
  }, []);

  // Save once, when the series ends.
  useEffect(() => {
    if (!done || !mode) return;
    const { score, bands } = grade(questions, answers);
    saveSeriesResult(seriesKey(epreuve, number), { score, total: questions.length, mode, date: new Date().toISOString(), bands });
    onFinish?.(score);
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  // Exam timer.
  useEffect(() => {
    if (!deadline || done) return;
    const tick = () => {
      const s = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setLeft(s);
      if (s === 0) finish();
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [deadline, done, finish]);

  const start = (m: Mode) => {
    setMode(m);
    if (m === 'exam') setDeadline(Date.now() + SERIES_SECONDS[epreuve] * 1000);
  };
  useEffect(() => { if (forceMode === 'exam') setDeadline(Date.now() + SERIES_SECONDS[epreuve] * 1000); }, [forceMode, epreuve]);

  const go = (i: number) => {
    stopSpeaking();
    setIndex(i);
    setListen('ready');
    setPlays(0);
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const play = () => {
    setListen('playing');
    setPlays((n) => n + 1);
    playDocument(isCo ? `/audio/co/co-${number}-${index + 1}.mp3` : undefined, q.lines ?? [], () => setListen('heard'));
  };

  const pick = (choice: number) => setAnswers((a) => a.map((v, i) => (i === index ? choice : v)));
  const check = () => setChecked((c) => c.map((v, i) => (i === index ? true : v)));


  if (!mode) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <button onClick={() => start('exam')} className="rounded-2xl border-2 border-rule bg-white p-6 text-left hover:border-ocean">
          <span className="heading block text-xl text-night">Conditions d’examen</span>
          <span className="mt-2 block text-slate">
            {questions.length} questions en {SERIES_SECONDS[epreuve] / 60} minutes, chronomètre visible.
            {isCo ? ' Chaque document n’est diffusé qu’une fois.' : ' Vous pouvez naviguer entre les questions.'} Correction à la fin.
          </span>
        </button>
        <button onClick={() => start('training')} className="rounded-2xl border-2 border-rule bg-white p-6 text-left hover:border-ocean">
          <span className="heading block text-xl text-night">Mode entraînement</span>
          <span className="mt-2 block text-slate">Sans chronomètre. Correction et explication après chaque question{isCo ? ', réécoute et transcription' : ''}.</span>
        </button>
      </div>
    );
  }

  if (done) {
    const g = grade(questions, answers);
    return (
      <div ref={top} className="scroll-mt-28 space-y-6">
        <div className="rounded-2xl bg-night p-6 text-white sm:p-8">
          <p className="text-sm text-blue-200">Résultat, série {number}</p>
          <p className="display mt-1 text-5xl text-container">{g.score}<span className="text-2xl text-blue-200"> / {questions.length}</span></p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {BANDS.map((b) => {
              const [ok, total] = g.bands[b.label] ?? [0, 0];
              return (
                <div key={b.label}>
                  <p className="text-sm text-blue-100">Questions {b.label}</p>
                  <p className="heading text-xl">{ok} / {total}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full bg-container" style={{ width: `${total ? (ok / total) * 100 : 0}%` }} /></div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-blue-100">
            Indication sur votre niveau de réussite par palier, pas un score officiel : le TCF pondère chaque question selon sa difficulté et calcule un score de 100 à 699.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 sm:p-8">
          <h2 className="heading text-xl text-night">Revoir les questions</h2>
          <ol className="mt-4 divide-y divide-rule">
            {questions.map((qq, i) => {
              const right = answers[i] === 0;
              return (
                <li key={i} className="py-4">
                  <details>
                    <summary className="cursor-pointer">
                      <span className={`mr-2 font-bold ${right ? 'text-green-700' : 'text-maple'}`}>{right ? 'Juste' : answers[i] === null ? 'Sans réponse' : 'Faux'}</span>
                      <span className="text-ink">{i + 1}. {qq.prompt}</span>
                      <span className="ml-2 text-xs text-slate">({qq.level})</span>
                    </summary>
                    <div className="mt-3 space-y-2 text-sm">
                      {qq.doc && <p className="whitespace-pre-line rounded-lg bg-paper p-3 text-ink">{qq.doc}</p>}
                      {qq.lines && <div className="space-y-1 rounded-lg bg-paper p-3 text-ink">{qq.lines.map((l, k) => <p key={k}>{qq.lines!.length > 1 && <strong>{l.voice === 'a' ? 'Voix 1 : ' : 'Voix 2 : '}</strong>}{l.text}</p>)}</div>}
                      <p><strong className="text-green-800">Bonne réponse : </strong>{qq.choices[0]}</p>
                      {!right && answers[i] !== null && <p><strong className="text-maple">Votre réponse : </strong>{qq.choices[answers[i]!]}</p>}
                      <p className="text-slate">{qq.explanation}</p>
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
        {!onFinish && (
          <button onClick={() => { setAnswers(questions.map(() => null)); setChecked(questions.map(() => false)); setDone(false); setIndex(0); setListen('ready'); setPlays(0); setDeadline(null); setLeft(SERIES_SECONDS[epreuve]); setMode(null); }} className="rounded-full bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean">
            Refaire la série
          </button>
        )}
      </div>
    );
  }

  const exam = mode === 'exam';
  const isChecked = checked[index];
  const chosen = answers[index];
  // Listening: the question appears after the document, as at the exam.
  const showPrompt = !isCo || listen === 'heard' || (!exam && plays > 0);
  const canAnswer = !isCo || listen === 'heard' || (!exam && plays > 0 && listen !== 'playing');
  const canReplay = !exam || plays === 0;
  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <div ref={top} className="scroll-mt-28 space-y-4">
      <div className="sticky top-16 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/95 px-5 py-3 shadow-sm backdrop-blur lg:top-[6.9rem]">
        <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-semibold text-night">Question {index + 1} sur {questions.length}</span>
          <span className="flex items-center gap-1" aria-label={`Niveau ${q.level}`}>
            {LEVELS.map((l) => (
              <span key={l} className={`rounded px-1.5 py-0.5 text-xs tabular-nums ${l === q.level ? 'bg-container font-bold text-night' : 'text-slate/60'}`}>{l}</span>
            ))}
          </span>
        </span>
        {exam
          ? <span className={`font-mono text-lg ${left < 300 ? 'text-maple' : 'text-night'}`} aria-label="Temps restant">{fmt(left)}</span>
          : <span className="text-sm text-slate">Mode entraînement</span>}
      </div>

      <div className="rounded-2xl bg-white p-6 sm:p-8">
        {isCo ? (
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={play} disabled={!canReplay || listen === 'playing'} className="inline-flex items-center gap-2 rounded-full bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean disabled:opacity-50">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M6 4l10 6-10 6V4z" /></svg>
              {listen === 'playing' ? 'Écoute en cours…' : plays === 0 ? 'Écouter le document' : 'Réécouter'}
            </button>
            {exam && plays > 0 && listen !== 'playing' && <span className="text-sm text-slate">Une seule écoute en conditions d’examen.</span>}
          </div>
        ) : (
          <p className="whitespace-pre-line rounded-xl border-l-4 border-sky bg-paper p-5 text-lg leading-relaxed text-ink">{q.doc}</p>
        )}

        <div className="mt-6">
          {showPrompt
            ? <p className="heading text-lg text-night">{q.prompt}</p>
            : <p className="text-slate">Lisez les propositions pendant l’écoute. La question s’affichera ensuite.</p>}
          <div className="mt-4 grid gap-2">
            {orders[index].map((ci) => {
              const cls = !isChecked ? (chosen === ci ? 'border-ocean bg-blue-50' : 'border-rule hover:border-ocean/50')
                : ci === 0 ? 'border-green-600 bg-green-50' : chosen === ci ? 'border-maple bg-red-50' : 'border-rule opacity-70';
              return (
                <label key={ci} className={`flex items-start gap-3 rounded-xl border-2 px-4 py-3 text-ink ${canAnswer && !isChecked ? 'cursor-pointer' : ''} ${cls}`}>
                  <input type="radio" name={`q-${index}`} className="mt-1 h-4 w-4" checked={chosen === ci} disabled={!canAnswer || isChecked} onChange={() => pick(ci)} />
                  <span>{q.choices[ci]}</span>
                </label>
              );
            })}
          </div>
        </div>

        {!exam && isChecked && (
          <div className="mt-5 space-y-3" aria-live="polite">
            <p className={chosen === 0 ? 'text-green-800' : 'text-maple'}><strong>{chosen === 0 ? 'Bonne réponse. ' : 'Pas tout à fait. '}</strong><span className="text-slate">{q.explanation}</span></p>
            {q.lines && (
              <details className="rounded-xl bg-paper p-4">
                <summary className="cursor-pointer font-semibold text-night">Lire la transcription</summary>
                <div className="mt-3 space-y-2 text-ink">{q.lines.map((l, k) => <p key={k}>{q.lines!.length > 1 && <strong>{l.voice === 'a' ? 'Voix 1 : ' : 'Voix 2 : '}</strong>}{l.text}</p>)}</div>
              </details>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!exam && !isChecked && (
            <button onClick={check} disabled={chosen === null} className="rounded-full bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean disabled:opacity-50">Vérifier</button>
          )}
          {(exam || isChecked) && index < questions.length - 1 && (
            <button onClick={() => go(index + 1)} disabled={exam && isCo && chosen === null && listen !== 'heard'} className="rounded-full bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean disabled:opacity-50">
              Question suivante
            </button>
          )}
          {!isCo && index > 0 && <button onClick={() => go(index - 1)} className="rounded-full border border-rule px-5 py-3 font-semibold text-night hover:border-ocean">Précédente</button>}
          {(index === questions.length - 1 || exam) && (
            <button
              onClick={() => { if (!exam || index === questions.length - 1 || confirm(`Terminer maintenant ? ${questions.length - answeredCount} question(s) sans réponse compteront comme fausses.`)) finish(); }}
              className={index === questions.length - 1 ? 'rounded-full bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover' : 'ml-auto text-sm font-semibold text-slate hover:text-maple'}
            >
              {index === questions.length - 1 ? 'Voir mon résultat' : 'Terminer la série'}
            </button>
          )}
        </div>
      </div>

      {exam && !isCo && (
        <nav aria-label="Aller à une question" className="rounded-2xl bg-white p-5">
          <p className="mb-3 text-sm text-slate">{answeredCount} / {questions.length} réponses</p>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((_, i) => (
              <button key={i} onClick={() => go(i)} aria-current={i === index ? 'step' : undefined}
                className={`h-9 w-9 rounded-lg text-sm font-semibold ${i === index ? 'bg-night text-white' : answers[i] !== null ? 'bg-blue-100 text-night' : 'bg-paper text-slate hover:bg-blue-50'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
