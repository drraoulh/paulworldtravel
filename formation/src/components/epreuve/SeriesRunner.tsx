'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BANDS, rightChoice, SERIES_SECONDS, type SeriesQuestion } from '@/content/series';
import { seededOrder } from '@/lib/shuffle';
import { saveSeriesResult, seriesKey, type SeriesResult } from '@/lib/results';
import { playDocument, stopSpeaking, warmUpVoices } from '@/lib/speech';

type Mode = 'exam' | 'training';
type Listen = 'ready' | 'playing' | 'heard';

const LETTERS = ['A', 'B', 'C', 'D'];
const fmt = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.floor(Math.max(0, s)) % 60).padStart(2, '0')}`;
/** Propositions that are only heard: the screen shows letters, not text. */
const heardOnly = (q: SeriesQuestion) => q.kind === 'image' || q.kind === 'reponse';

function grade(questions: SeriesQuestion[], answers: (number | null)[]) {
  const bands: SeriesResult['bands'] = {};
  let score = 0;
  questions.forEach((q, i) => {
    const band = BANDS.find((b) => (b.levels as readonly string[]).includes(q.level))!.label;
    const [ok, total] = bands[band] ?? [0, 0];
    const right = answers[i] === rightChoice(q);
    if (right) score++;
    bands[band] = [ok + (right ? 1 : 0), total + 1];
  });
  return { score, bands };
}

function Transcript({ q }: { q: SeriesQuestion }) {
  return (
    <div className="space-y-2 text-ink">
      {q.lines!.map((l, k) => (
        <p key={k}>{q.lines!.length > 1 && !heardOnly(q) && <strong>{l.voice === 'a' ? 'Voix 1 : ' : 'Voix 2 : '}</strong>}{l.text}</p>
      ))}
    </div>
  );
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
  const total = SERIES_SECONDS[epreuve];
  const [mode, setMode] = useState<Mode | null>(forceMode ?? null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [checked, setChecked] = useState<boolean[]>(questions.map(() => false));
  const [listen, setListen] = useState<Listen>('ready');
  const [plays, setPlays] = useState(0);
  const [progress, setProgress] = useState<{ cur: number; dur: number } | null>(null);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [left, setLeft] = useState<number>(total);
  const [done, setDone] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const orders = useMemo(
    () => questions.map((q, i) => (heardOnly(q) ? [0, 1, 2, 3] : seededOrder(`${epreuve}${number}-${i}-${q.prompt}`, 4))),
    [questions, epreuve, number],
  );
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
    if (m === 'exam') setDeadline(Date.now() + total * 1000);
  };
  useEffect(() => { if (forceMode === 'exam') setDeadline(Date.now() + total * 1000); }, [forceMode, total]);

  const playAt = (i: number) => {
    setListen('playing');
    setPlays((n) => n + 1);
    setProgress(null);
    playDocument(
      `/audio/co/co-${number}-${i + 1}.mp3`,
      questions[i].lines ?? [],
      () => { setListen('heard'); setProgress((p) => (p ? { cur: p.dur, dur: p.dur } : p)); },
      (cur, dur) => setProgress({ cur, dur }),
    );
  };

  const go = (i: number) => {
    stopSpeaking();
    setIndex(i);
    setListen('ready');
    setPlays(0);
    setProgress(null);
    top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // At the exam, each recording starts on its own.
    if (isCo && mode === 'exam') playAt(i);
  };

  const pick = (choice: number) => setAnswers((a) => a.map((v, i) => (i === index ? choice : v)));
  const check = () => setChecked((c) => c.map((v, i) => (i === index ? true : v)));

  if (!mode) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <button onClick={() => start('exam')} className="rounded-2xl border-2 border-rule bg-white p-6 text-left hover:border-ocean">
          <span className="heading block text-xl text-night">Conditions d’examen</span>
          <span className="mt-2 block text-slate">
            {questions.length} questions en {total / 60} minutes, chronomètre visible.
            {isCo ? ' Chaque document n’est diffusé qu’une fois et l’on ne revient pas en arrière.' : ' Vous pouvez naviguer entre les questions.'} Correction à la fin.
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
      <div ref={top} className="scroll-mt-24 space-y-6">
        <div className="rounded-2xl bg-night p-6 text-white sm:p-8">
          <p className="text-sm text-blue-200">Résultat, série {number}</p>
          <p className="display mt-1 text-5xl text-container">{g.score}<span className="text-2xl text-blue-200"> / {questions.length}</span></p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {BANDS.map((b) => {
              const [ok, n] = g.bands[b.label] ?? [0, 0];
              return (
                <div key={b.label}>
                  <p className="text-sm text-blue-100">Questions {b.label}</p>
                  <p className="heading text-xl">{ok} / {n}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full bg-container" style={{ width: `${n ? (ok / n) * 100 : 0}%` }} /></div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-blue-100">
            Indication sur votre niveau de réussite par palier, pas un score officiel : le TCF pondère chaque question selon sa difficulté et calcule un score de 100 à 699. France Éducation international ne publie pas le poids de chaque question.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 sm:p-8">
          <h2 className="heading text-xl text-night">Revoir les questions</h2>
          <ol className="mt-4 divide-y divide-rule">
            {questions.map((qq, i) => {
              const good = rightChoice(qq);
              const right = answers[i] === good;
              const label = (c: number) => (heardOnly(qq) ? `${LETTERS[c]}. ` : '') + qq.choices[c];
              return (
                <li key={i} className="py-4">
                  <details>
                    <summary className="cursor-pointer">
                      <span className={`mr-2 font-bold ${right ? 'text-green-700' : 'text-maple'}`}>{right ? 'Juste' : answers[i] === null ? 'Sans réponse' : 'Faux'}</span>
                      <span className="text-ink">{i + 1}. {heardOnly(qq) ? (qq.kind === 'image' ? 'Image : ' + qq.image?.alt : qq.lines?.[0].text) : qq.prompt}</span>
                      <span className="ml-2 text-xs text-slate">({qq.level})</span>
                    </summary>
                    <div className="mt-3 space-y-2 text-sm">
                      {qq.image && <Image src={qq.image.src} alt={qq.image.alt} width={320} height={213} className="rounded-lg" />}
                      {qq.doc && <p className="whitespace-pre-line rounded-lg bg-paper p-3 text-ink">{qq.doc}</p>}
                      {qq.lines && <div className="rounded-lg bg-paper p-3"><Transcript q={qq} /></div>}
                      <p><strong className="text-green-800">Bonne réponse : </strong>{label(good)}</p>
                      {!right && answers[i] !== null && <p><strong className="text-maple">Votre réponse : </strong>{label(answers[i]!)}</p>}
                      <p className="text-slate">{qq.explanation}</p>
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
        {!onFinish && (
          <button onClick={() => { setAnswers(questions.map(() => null)); setChecked(questions.map(() => false)); setDone(false); setIndex(0); setListen('ready'); setPlays(0); setProgress(null); setDeadline(null); setLeft(total); setMode(null); }} className="rounded-full bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean">
            Refaire la série
          </button>
        )}
      </div>
    );
  }

  const exam = mode === 'exam';
  const isChecked = checked[index];
  const chosen = answers[index];
  const good = rightChoice(q);
  const letters = heardOnly(q);
  const heard = listen === 'heard' || (!exam && plays > 0 && listen !== 'playing');
  // Listening: the question of a document appears after the recording, as at the exam.
  const showPrompt = !isCo || letters || heard;
  const canAnswer = !isCo || listen === 'heard' || (!exam && plays > 0 && listen !== 'playing') || (letters && listen === 'playing');
  const canReplay = !exam || plays === 0;
  const answeredCount = answers.filter((a) => a !== null).length;
  // At the listening exam, there is no going back.
  const canJump = !(exam && isCo);
  const last = index === questions.length - 1;
  const showTranscript = isCo && !exam && q.lines && (isChecked || (plays > 0 && listen !== 'playing'));

  const endNow = () => {
    if (confirm(`Terminer maintenant ? ${questions.length - answeredCount} question(s) sans réponse compteront comme fausses.`)) finish();
  };

  const grid = (
    <nav aria-label="Navigation des questions" className="rounded-2xl bg-white p-5">
      <p className="font-bold text-night">Navigation des questions</p>
      <p className="mt-1 text-sm text-slate">{answeredCount} / {questions.length} réponses</p>
      <ol className="mt-4 grid grid-cols-7 gap-1.5">
        {questions.map((_, i) => {
          const state = i === index ? 'bg-ocean text-white ring-2 ring-ocean/30' : answers[i] !== null ? 'border border-green-600/50 bg-green-50 text-night' : 'border border-rule bg-white text-slate';
          return (
            <li key={i}>
              <button onClick={() => go(i)} disabled={!canJump || i === index} aria-current={i === index ? 'step' : undefined}
                aria-label={`Question ${i + 1}${answers[i] !== null ? ', répondue' : ''}`}
                className={`h-9 w-full rounded-lg text-sm font-semibold tabular-nums ${state} ${canJump && i !== index ? 'hover:border-ocean' : ''}`}>
                {i + 1}
              </button>
            </li>
          );
        })}
      </ol>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-rule pt-3 text-sm text-slate">
        <li className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded bg-ocean" />Actuelle</li>
        <li className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded border border-green-600/50 bg-green-50" />Répondue</li>
        <li className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded border border-rule bg-white" />Non répondue</li>
      </ul>
      {!canJump && <p className="mt-3 text-xs text-slate">À l’examen, on ne revient pas sur une question de compréhension orale.</p>}
    </nav>
  );

  return (
    <div ref={top} className="scroll-mt-24">
      {/* Small screens: question number and timer stay visible. */}
      <div className="sticky top-[4.5rem] z-10 mb-4 flex items-center justify-between gap-3 rounded-2xl bg-white/95 px-5 py-3 shadow-sm backdrop-blur lg:hidden">
        <span className="font-semibold text-night">Question {index + 1} / {questions.length}</span>
        {exam
          ? <span className={`font-mono text-lg ${left < 300 ? 'text-maple' : 'text-night'}`} aria-label="Temps restant">{fmt(left)}</span>
          : <span className="text-sm text-slate">Entraînement</span>}
      </div>

      <div className="grid gap-5 lg:grid-cols-[18rem_1fr] lg:items-start">
        <aside className="order-2 space-y-4 lg:sticky lg:top-24 lg:order-1">
          <div className="hidden rounded-2xl bg-night p-5 text-white lg:block">
            {exam ? (
              <>
                <p className={`font-mono text-4xl tabular-nums ${left < 300 ? 'text-container' : ''}`} aria-label="Temps restant">{fmt(left)}</p>
                <p className="text-sm text-blue-100">Temps restant sur {total / 60} minutes</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-container transition-[width] duration-500" style={{ width: `${(left / total) * 100}%` }} /></div>
              </>
            ) : (
              <>
                <p className="heading text-xl">Mode entraînement</p>
                <p className="mt-1 text-sm text-blue-100">Sans chronomètre. Vérifiez chaque réponse.</p>
              </>
            )}
          </div>
          {grid}
          {showTranscript && (
            <details className="rounded-2xl bg-white p-5">
              <summary className="cursor-pointer font-semibold text-night">Afficher la transcription</summary>
              <div className="mt-3 text-sm"><Transcript q={q} /></div>
            </details>
          )}
          <button onClick={() => (exam ? endNow() : finish())} className="w-full rounded-2xl border border-rule bg-white px-5 py-3 font-semibold text-slate hover:border-maple hover:text-maple">
            {exam ? 'Terminer l’examen' : 'Terminer et voir mon résultat'}
          </button>
        </aside>

        <div className="order-1 rounded-2xl bg-white p-5 sm:p-8 lg:order-2">
          {q.image && (
            <div className="mx-auto mb-6 max-w-xl overflow-hidden rounded-xl bg-paper">
              <Image src={q.image.src} alt={exam ? 'Image de la question' : q.image.alt} width={900} height={600} sizes="(min-width: 1024px) 36rem, 100vw" className="h-auto w-full" priority />
            </div>
          )}

          {isCo && (
            <p className="heading text-center text-lg text-night sm:text-xl">
              {letters ? q.prompt : 'Écoutez le document. La question apparaît après l’écoute.'}
            </p>
          )}

          {isCo ? (
            <div className="mt-5 flex items-center gap-4 rounded-2xl bg-blue-50 p-4 sm:p-5">
              <button onClick={() => playAt(index)} disabled={!canReplay || listen === 'playing'}
                aria-label={plays === 0 ? 'Écouter l’extrait' : 'Réécouter l’extrait'}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ocean text-white shadow hover:bg-night disabled:opacity-50">
                {plays === 0
                  ? <svg viewBox="0 0 20 20" fill="currentColor" className="ml-0.5 h-6 w-6" aria-hidden="true"><path d="M6 4l10 6-10 6V4z" /></svg>
                  : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="h-6 w-6" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></svg>}
              </button>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ocean">
                  {listen === 'playing' ? 'Écoute en cours' : plays === 0 ? 'Extrait audio' : exam ? 'Extrait diffusé' : 'Extrait audio : vous pouvez réécouter'}
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100" role="progressbar" aria-label="Progression de l’extrait"
                  aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress ? Math.round((progress.cur / progress.dur) * 100) : listen === 'heard' ? 100 : 0}>
                  {progress
                    ? <div className="h-full rounded-full bg-ocean" style={{ width: `${(progress.cur / progress.dur) * 100}%` }} />
                    : <div className={`h-full rounded-full bg-ocean ${listen === 'playing' ? 'w-1/3 animate-pulse' : listen === 'heard' ? 'w-full' : 'w-0'}`} />}
                </div>
                <div className="mt-1.5 flex justify-between text-sm tabular-nums text-slate">
                  <span>{fmt(progress?.cur ?? 0)}</span>
                  <span>{progress ? fmt(progress.dur) : '--:--'}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-line rounded-xl border-l-4 border-sky bg-paper p-5 text-lg leading-relaxed text-ink">{q.doc}</p>
          )}
          {exam && isCo && plays > 0 && listen !== 'playing' && <p className="mt-2 text-sm text-slate">Une seule écoute en conditions d’examen.</p>}

          <div className="mt-6">
            {!letters && (showPrompt
              ? <p className="heading text-lg text-night">{q.prompt}</p>
              : <p className="text-slate">Écoutez d’abord l’extrait.</p>)}
            <div className={`mt-4 grid gap-3 ${letters ? 'sm:grid-cols-2' : ''}`}>
              {orders[index].map((ci, k) => {
                const cls = !isChecked ? (chosen === ci ? 'border-ocean bg-blue-50' : 'border-rule hover:border-ocean/50')
                  : ci === good ? 'border-green-600 bg-green-50' : chosen === ci ? 'border-maple bg-red-50' : 'border-rule opacity-70';
                const reveal = !letters || isChecked;
                return (
                  <label key={ci} className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-ink ${canAnswer && !isChecked ? 'cursor-pointer' : ''} ${cls}`}>
                    <input type="radio" name={`q-${index}`} className="sr-only" checked={chosen === ci} disabled={!canAnswer || isChecked} onChange={() => pick(ci)} />
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${chosen === ci ? 'bg-ocean text-white' : 'bg-paper text-night'}`}>{LETTERS[k]}</span>
                    {reveal && <span>{q.choices[ci]}</span>}
                  </label>
                );
              })}
            </div>
          </div>

          {!exam && isChecked && (
            <p className={`mt-5 ${chosen === good ? 'text-green-800' : 'text-maple'}`} aria-live="polite">
              <strong>{chosen === good ? 'Bonne réponse. ' : `Pas tout à fait : la bonne réponse est ${letters ? LETTERS[good] : 'en vert'}. `}</strong>
              <span className="text-slate">{q.explanation}</span>
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-rule pt-5">
            {canJump && index > 0 && (
              <button onClick={() => go(index - 1)} className="rounded-full border border-rule px-5 py-3 font-semibold text-night hover:border-ocean">Précédent</button>
            )}
            <span className="flex items-center gap-2 sm:mx-auto">
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-ocean">Question {index + 1}</span>
              <span className="rounded-full bg-container/40 px-3 py-2 text-sm font-bold text-night" title="Niveau de la question">{q.level}</span>
            </span>
            <span className="ml-auto flex gap-3">
              {!exam && !isChecked && (
                <button onClick={check} disabled={chosen === null} className="rounded-full bg-night px-6 py-3 font-bold text-white hover:bg-ocean disabled:opacity-50">Vérifier</button>
              )}
              {(exam || isChecked) && !last && (
                <button onClick={() => go(index + 1)} disabled={exam && isCo && listen === 'playing'} className="rounded-full bg-ocean px-6 py-3 font-bold text-white hover:bg-night disabled:opacity-50">
                  Suivant
                </button>
              )}
              {last && (exam || isChecked) && (
                <button onClick={finish} className="rounded-full bg-container px-6 py-3 font-bold text-night hover:bg-container-hover">Voir mon résultat</button>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
