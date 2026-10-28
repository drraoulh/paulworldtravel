'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { listeningItems as items } from '@/content/listening';
import { seededOrder } from '@/lib/shuffle';

type Mode = 'exam' | 'training';
type Phase = 'ready' | 'playing' | 'answer' | 'checked';

function frenchVoices() {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('fr'));
  const ca = voices.filter((v) => v.lang === 'fr-CA');
  return [...ca, ...voices.filter((v) => v.lang !== 'fr-CA')];
}

export default function ListeningPractice() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('ready');
  const [answers, setAnswers] = useState<(number | null)[]>(items.map(() => null));
  const [plays, setPlays] = useState(0);
  const [done, setDone] = useState(false);
  const cancelled = useRef(false);
  const orders = useMemo(() => items.map((it) => seededOrder(it.id + it.prompt, it.choices.length)), []);
  const item = items[index];
  const score = items.reduce((n, it, i) => n + (answers[i] === it.answer ? 1 : 0), 0);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    // Some browsers load voices asynchronously.
    window.speechSynthesis?.getVoices();
    return () => { cancelled.current = true; window.speechSynthesis?.cancel(); };
  }, []);

  const play = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    cancelled.current = false;
    const voices = frenchVoices();
    const queue = item.lines.map((line) => {
      const u = new SpeechSynthesisUtterance(line.text);
      u.lang = 'fr-FR';
      const voice = line.voice === 'a' ? voices[0] : voices[1] ?? voices[0];
      if (voice) { u.voice = voice; u.lang = voice.lang; }
      u.pitch = line.voice === 'b' && !voices[1] ? 0.8 : 1;
      u.rate = 0.95;
      return u;
    });
    queue[queue.length - 1].onend = () => { if (!cancelled.current) setPhase((p) => (p === 'playing' ? 'answer' : p)); };
    setPhase('playing');
    setPlays((n) => n + 1);
    queue.forEach((u) => synth.speak(u));
  };

  const pick = (choice: number) => setAnswers((a) => a.map((v, i) => (i === index ? choice : v)));

  const next = () => {
    window.speechSynthesis.cancel();
    if (index === items.length - 1) {
      setDone(true);
      return;
    }
    setIndex(index + 1);
    setPhase('ready');
    setPlays(0);
  };

  const restart = (m: Mode) => {
    window.speechSynthesis?.cancel();
    setMode(m);
    setIndex(0);
    setPhase('ready');
    setPlays(0);
    setAnswers(items.map(() => null));
    setDone(false);
  };

  if (supported === false) {
    return <p className="rounded-2xl bg-white p-6 text-slate">Votre navigateur ne sait pas lire les documents à voix haute. Essayez avec Chrome, Edge ou Safari à jour.</p>;
  }

  if (!mode) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <button onClick={() => restart('exam')} className="rounded-2xl border-2 border-rule bg-white p-6 text-left hover:border-ocean">
          <span className="heading block text-xl text-night">Conditions d’examen</span>
          <span className="mt-2 block text-slate">Une seule écoute par document, comme au TCF. La question s’affiche après l’écoute.</span>
        </button>
        <button onClick={() => restart('training')} className="rounded-2xl border-2 border-rule bg-white p-6 text-left hover:border-ocean">
          <span className="heading block text-xl text-night">Mode entraînement</span>
          <span className="mt-2 block text-slate">Réécoutez autant que nécessaire, puis lisez la transcription après avoir répondu.</span>
        </button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-white p-6 sm:p-8" aria-live="polite">
        <p className="display text-5xl text-night">{score} / {items.length}</p>
        <p className="mt-3 text-slate">{score >= 7 ? 'Très bon résultat. Passez aux documents plus longs avec la radio et les podcasts.' : score >= 4 ? 'Bonne base. Relisez la leçon sur les intentions et les nuances, puis refaites la série.' : 'Commencez par les leçons du module de compréhension orale, puis refaites la série en mode entraînement.'}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => restart(mode)} className="rounded-xl bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean">Refaire la série</button>
          <button onClick={() => restart(mode === 'exam' ? 'training' : 'exam')} className="rounded-xl border border-rule px-6 py-3.5 font-semibold text-night hover:border-ocean">
            Passer en {mode === 'exam' ? 'mode entraînement' : 'conditions d’examen'}
          </button>
        </div>
      </div>
    );
  }

  const canReplay = mode === 'training' || plays === 0;
  const chosen = answers[index];

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-night">Document {index + 1} sur {items.length}</span>
        <span className="text-slate">{item.kind}, niveau {item.level}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper" aria-hidden="true"><div className="h-full bg-ocean" style={{ width: `${(index / items.length) * 100}%` }} /></div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button onClick={play} disabled={!canReplay || phase === 'playing'} className="inline-flex items-center gap-2 rounded-xl bg-maple px-6 py-3.5 font-bold text-white hover:bg-red-800 disabled:opacity-50">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M6 4l10 6-10 6V4z" /></svg>
          {phase === 'playing' ? 'Écoute en cours…' : plays === 0 ? 'Écouter le document' : 'Réécouter'}
        </button>
        {mode === 'exam' && plays > 0 && phase !== 'playing' && <span className="text-sm text-slate">Une seule écoute en conditions d’examen.</span>}
      </div>

      <div className="mt-6">
        {phase === 'ready' || phase === 'playing'
          ? <p className="text-slate">Lisez les propositions pendant l’écoute. La question s’affichera ensuite.</p>
          : <p className="heading text-lg text-night">{item.prompt}</p>}
        <div className="mt-4 grid gap-2">
          {orders[index].map((ci) => {
            const answered = phase === 'checked';
            const cls = !answered ? (chosen === ci ? 'border-ocean bg-blue-50' : 'border-rule hover:border-ocean/50')
              : ci === item.answer ? 'border-green-600 bg-green-50' : chosen === ci ? 'border-maple bg-red-50' : 'border-rule opacity-70';
            return (
              <label key={ci} className={`flex items-start gap-3 rounded-xl border-2 px-4 py-3 text-ink ${phase === 'answer' ? 'cursor-pointer' : ''} ${cls}`}>
                <input type="radio" name={`co-${index}`} className="mt-1 h-4 w-4" checked={chosen === ci} disabled={phase !== 'answer'} onChange={() => pick(ci)} />
                <span>{item.choices[ci]}</span>
              </label>
            );
          })}
        </div>
      </div>

      {phase === 'answer' && (
        <button onClick={() => setPhase('checked')} disabled={chosen === null} className="mt-6 rounded-xl bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean disabled:opacity-50">Valider</button>
      )}
      {phase === 'checked' && (
        <div className="mt-6 space-y-4" aria-live="polite">
          <p className={chosen === item.answer ? 'text-green-800' : 'text-maple'}><strong>{chosen === item.answer ? 'Bonne réponse. ' : 'Pas tout à fait. '}</strong><span className="text-slate">{item.explanation}</span></p>
          {mode === 'training' && (
            <details className="rounded-xl bg-paper p-4">
              <summary className="cursor-pointer font-semibold text-night">Lire la transcription</summary>
              <div className="mt-3 space-y-2 text-ink">{item.lines.map((l, i) => <p key={i}>{item.lines.length > 1 && <strong>{l.voice === 'a' ? 'Voix 1 : ' : 'Voix 2 : '}</strong>}{l.text}</p>)}</div>
            </details>
          )}
          <button onClick={next} className="rounded-xl bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean">{index === items.length - 1 ? 'Voir mon résultat' : 'Document suivant'}</button>
        </div>
      )}
    </div>
  );
}
