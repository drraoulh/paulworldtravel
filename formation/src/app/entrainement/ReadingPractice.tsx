'use client';

import { useEffect, useRef, useState } from 'react';
import { readingQuestions as questions } from '../../content/reading';
import { gradeAnswers, PRACTICE_DURATION_SECONDS, remainingSeconds, type PracticeMode } from '../../lib/practice';

export default function ReadingPractice() {
  const [mode, setMode] = useState<PracticeMode | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState(false);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(PRACTICE_DURATION_SECONDS);
  const [history, setHistory] = useState<{ correct: number; total: number; date: string } | null>(null);
  const [storageFailed, setStorageFailed] = useState(false);
  const saved = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const q = questions[index];
  const result = gradeAnswers(questions, answers);

  useEffect(() => {
    try {
      const record = JSON.parse(localStorage.getItem('pwt-reading-last') ?? 'null');
      if (record && Number.isInteger(record.correct) && record.correct >= 0 && record.correct <= questions.length && record.total === questions.length && typeof record.date === 'string' && Number.isFinite(Date.parse(record.date))) setHistory(record);
    } catch { /* Local history is optional. */ }
  }, []);

  useEffect(() => {
    if (!deadline || done) return;
    const tick = () => {
      const seconds = remainingSeconds(deadline, Date.now());
      setRemaining(seconds);
      if (seconds === 0) setDone(true);
    };
    tick();
    const timer = setInterval(tick, 500);
    return () => clearInterval(timer);
  }, [deadline, done]);

  useEffect(() => {
    if (!mode || done) return;
    const preventLeave = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener('beforeunload', preventLeave);
    return () => window.removeEventListener('beforeunload', preventLeave);
  }, [mode, done]);

  useEffect(() => { if (mode) heading.current?.focus(); }, [index, mode, done]);

  useEffect(() => {
    if (!done || saved.current) return;
    saved.current = true;
    const record = { correct: result.correct, total: result.total, date: new Date().toISOString() };
    try { localStorage.setItem('pwt-reading-last', JSON.stringify(record)); setHistory(record); }
    catch { setStorageFailed(true); }
  }, [done, result.correct, result.total]);

  const start = (value: PracticeMode) => {
    setMode(value); setIndex(0); setAnswers(questions.map(() => null)); setChecked(false); setDone(false);
    setStorageFailed(false); saved.current = false;
    setRemaining(PRACTICE_DURATION_SECONDS);
    setDeadline(value === 'timed' ? Date.now() + PRACTICE_DURATION_SECONDS * 1000 : null);
  };
  const move = (next: number) => { setIndex(next); setChecked(false); };
  const button = 'rounded-xl bg-night px-5 py-3 font-bold text-white hover:bg-ocean disabled:cursor-not-allowed disabled:opacity-40';

  if (!mode) return (
    <div className="grid gap-6 md:grid-cols-2">
      {(['practice', 'timed'] as const).map((value) => <article key={value} className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
        <p className="eyebrow text-ocean">{value === 'practice' ? 'À votre rythme' : 'Gérer son temps'}</p>
        <h2 className="heading mt-4 text-2xl text-night">{value === 'practice' ? 'Exercices guidés' : 'Série chronométrée'}</h2>
        <p className="mt-4 text-slate">{value === 'practice' ? 'Six textes, de A2 à B2. Une correction expliquée après chaque réponse, sans limite de temps.' : 'Six textes en huit minutes. Les corrections apparaissent à la fin, les questions sans réponse comptent comme incorrectes.'}</p>
        <button className={`${button} mt-6`} onClick={() => start(value)}>Commencer {value === 'practice' ? 'les exercices' : 'la série'}</button>
      </article>)}
      {history && <div className="text-sm text-slate md:col-span-2"><p>Dernier résultat sur cet appareil : {history.correct}/{history.total}, le {new Date(history.date).toLocaleDateString('fr-FR')}.</p><button className="mt-2 font-semibold text-ocean underline" onClick={() => { try { localStorage.removeItem('pwt-reading-last'); setHistory(null); } catch { setStorageFailed(true); } }}>Effacer ce résultat</button></div>}
      {storageFailed && <p role="status">Le stockage de cet appareil est indisponible.</p>}
    </div>
  );

  if (done) return (
    <section className="rounded-2xl border border-rule bg-white p-6 sm:p-10">
      <h2 ref={heading} tabIndex={-1} className="heading text-3xl text-night">Votre bilan : {result.correct}/{result.total}</h2>
      <p className="mt-4 text-slate">{result.answered} question(s) répondue(s). {mode === 'timed' && remaining === 0 ? 'Le temps est écoulé. ' : ''}Ce résultat d’entraînement ne correspond pas à un score TCF ni à un niveau NCLC.</p>
      <p className="mt-2 text-sm text-slate">{storageFailed ? 'Le résultat n’a pas pu être enregistré sur cet appareil.' : 'Seul votre dernier score est conservé sur cet appareil, sans envoi à un serveur.'}</p>
      <ol className="mt-8 space-y-5">{questions.map((item, i) => <li key={item.id} className="rounded-xl border border-rule p-5">
        <h3 className="font-bold text-night">{i + 1}. {item.prompt}</h3>
        <p className="mt-3 text-sm text-slate">{item.text}</p>
        <p className="mt-3">Votre réponse : {answers[i] === null ? 'Sans réponse' : item.choices[answers[i]!]}</p>
        <p className="mt-2 font-semibold text-night">{answers[i] === item.answer ? 'Bonne réponse.' : `Bonne réponse : ${item.choices[item.answer]}`}</p>
        <p className="mt-2 text-slate">{item.explanation}</p>
      </li>)}</ol>
      <button className={`${button} mt-8`} onClick={() => { setMode(null); setDone(false); }}>Choisir un autre mode</button>
    </section>
  );

  return (
    <section className="rounded-2xl border border-rule bg-white p-6 sm:p-10">
      <div className="flex flex-wrap justify-between gap-3 text-sm text-slate"><span>Question {index + 1}/{questions.length} · {q.level}</span>{mode === 'timed' && <span role="timer" aria-label="Temps restant" className="font-bold text-night">{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}</span>}</div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper" role="progressbar" aria-label="Questions répondues" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={result.answered}><div className="h-full bg-ocean" style={{ width: `${result.answered / questions.length * 100}%` }} /></div>
      <blockquote className="mt-8 rounded-xl border-l-4 border-ocean bg-paper p-5 leading-relaxed">{q.text}</blockquote>
      <h2 ref={heading} tabIndex={-1} id="reading-question" className="heading mt-7 text-xl text-night">{q.prompt}</h2>
      <fieldset aria-labelledby="reading-question" className="mt-5 grid gap-3 sm:grid-cols-2">{q.choices.map((choice, i) => <label key={choice} className={`flex items-start gap-3 rounded-xl border-2 p-4 ${answers[index] === i ? 'border-ocean bg-blue-50' : 'border-rule'}`}>
        <input type="radio" name={`reading-${q.id}`} checked={answers[index] === i} disabled={checked} onChange={() => setAnswers(old => old.map((a, n) => n === index ? i : a))} className="mt-1 accent-ocean" /><span>{choice}</span>
      </label>)}</fieldset>
      {checked && <p role="status" className="mt-5 rounded-xl bg-paper p-5"><strong>{answers[index] === q.answer ? 'Bonne réponse. ' : `Bonne réponse : ${q.choices[q.answer]}. `}</strong>{q.explanation}</p>}
      <div className="mt-8 flex flex-wrap gap-3">
        {mode === 'practice' ? <button className={button} disabled={answers[index] === null} onClick={() => { if (!checked) setChecked(true); else if (index < questions.length - 1) move(index + 1); else setDone(true); }}>{!checked ? 'Corriger ma réponse' : index === questions.length - 1 ? 'Voir le bilan' : 'Question suivante'}</button> : <>
          <button className={button} disabled={index === 0} onClick={() => move(index - 1)}>Précédente</button>
          {index < questions.length - 1 && <button className={button} onClick={() => move(index + 1)}>Suivante</button>}
          <button className="rounded-xl border-2 border-night px-5 py-3 font-bold text-night" onClick={() => { if (result.answered === questions.length || window.confirm('Certaines questions sont sans réponse. Terminer quand même ?')) setDone(true); }}>Terminer la série</button>
        </>}
      </div>
      <p className="mt-5 text-sm text-slate">Le rechargement de cette page abandonne la série en cours.</p>
    </section>
  );
}
