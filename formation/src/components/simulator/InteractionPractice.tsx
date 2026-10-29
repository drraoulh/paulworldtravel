'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { SpeakingTask } from '@/content/expression';
import type { Feedback, Turn } from '@/lib/ai/prompts';
import FeedbackView from '@/components/ai/FeedbackView';
import Quota from '@/components/ai/Quota';
import { toMp3 } from '@/components/ai/toMp3';
import { fmt, MIC_ERROR, useRecorder } from '@/components/ai/useRecorder';
import { markDone } from '@/components/parcours/useCourse';

type Phase = 'intro' | 'prep' | 'starting' | 'dialog' | 'ended' | 'grading' | 'done';
type Sub = 'ready' | 'recording' | 'waiting';

/** Longest single reply, in seconds. */
const MAX_REPLY = 60;

function speak(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'fr-FR';
  const voices = window.speechSynthesis.getVoices();
  utter.voice = voices.find((v) => v.lang === 'fr-CA') ?? voices.find((v) => v.lang.startsWith('fr')) ?? null;
  utter.rate = 0.95;
  window.speechSynthesis.speak(utter);
}
const hush = () => { if (typeof window !== 'undefined') window.speechSynthesis?.cancel(); };

export default function InteractionPractice({ task, onBusy }: { task: SpeakingTask; onBusy: (busy: boolean) => void }) {
  const partner = task.partner!;
  const prepTotal = task.prepSeconds ?? 0;
  const rec = useRecorder();
  const [phase, setPhase] = useState<Phase>('intro');
  const [sub, setSub] = useState<Sub>('ready');
  const [prepLeft, setPrepLeft] = useState(prepTotal);
  const [notes, setNotes] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [voice, setVoice] = useState(true);
  const [error, setError] = useState('');
  const [quota, setQuota] = useState<{ remaining: number | null; plan: string | null }>({ remaining: null, plan: null });
  const [result, setResult] = useState<{ feedback: Feedback } | null>(null);

  // Refs read by the timer, which outlives renders.
  const ticket = useRef('');
  const turnsRef = useRef<Turn[]>([]);
  const subRef = useRef<Sub>('ready');
  const phaseRef = useRef<Phase>('intro');
  const dialogMs = useRef(0);
  const prepRef = useRef(prepTotal);
  const voiceRef = useRef(true);
  const sending = useRef(false);

  const setSubState = (s: Sub) => { subRef.current = s; setSub(s); };
  const setPhaseState = (p: Phase) => { phaseRef.current = p; setPhase(p); };
  const setTurnList = (list: Turn[]) => { turnsRef.current = list; setTurns(list); };
  const say = (text: string) => { if (voiceRef.current) speak(text); };

  useEffect(() => { onBusy(phase !== 'intro' && phase !== 'done'); }, [phase, onBusy]);
  useEffect(() => () => hush(), []);

  const sendTurn = useCallback(async (final: boolean) => {
    if (sending.current) return;
    sending.current = true;
    const recording = await rec.stop();
    setSubState('waiting');
    try {
      if (!recording) return;
      let file: Blob = recording.blob;
      try { file = await toMp3(recording.blob); } catch { /* keep the original recording */ }
      const form = new FormData();
      form.append('taskId', task.id);
      form.append('ticket', ticket.current);
      form.append('history', JSON.stringify(turnsRef.current));
      form.append('final', final ? '1' : '0');
      form.append('audio', file, file.type === 'audio/mpeg' ? 'replique.mp3' : 'replique.m4a');
      const res = await fetch('/api/ai/speaking/turn/', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'La réplique n’a pas pu être envoyée.');
      const next: Turn[] = [...turnsRef.current, { who: 'candidate', text: data.transcript }];
      if (data.reply && phaseRef.current === 'dialog') {
        next.push({ who: 'partner', text: data.reply });
        say(data.reply);
      }
      setTurnList(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'La réplique n’a pas pu être envoyée.');
    } finally {
      sending.current = false;
      setSubState('ready');
      if (final) setPhaseState('ended');
    }
  }, [rec, task.id]);

  // One clock for the preparation and the dialogue. The dialogue clock pauses while the partner "thinks".
  useEffect(() => {
    if (phase !== 'prep' && phase !== 'dialog') return;
    const id = setInterval(() => {
      if (phaseRef.current === 'prep') {
        prepRef.current = Math.max(0, prepRef.current - 1);
        setPrepLeft(prepRef.current);
        if (prepRef.current === 0) startDialog();
        return;
      }
      if (subRef.current !== 'waiting') dialogMs.current += 1000;
      const s = Math.floor(dialogMs.current / 1000);
      setElapsed(s);
      if (s >= task.seconds) {
        if (subRef.current === 'recording') sendTurn(true);
        else if (subRef.current === 'ready') setPhaseState('ended');
      } else if (subRef.current === 'recording' && rec.elapsed() >= MAX_REPLY) {
        sendTurn(false);
      }
    }, 1000);
    return () => clearInterval(id);
    // startDialog is stable for the lifetime of a phase.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, task.seconds, sendTurn, rec]);

  const startDialog = async () => {
    if (phaseRef.current !== 'prep') return;
    setPhaseState('starting');
    setError('');
    try {
      const res = await fetch('/api/ai/speaking/session/', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ taskId: task.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'L’échange n’a pas pu démarrer.');
      ticket.current = data.ticket;
      setQuota({ remaining: data.remaining, plan: data.plan });
      dialogMs.current = 0;
      setElapsed(0);
      setTurnList([{ who: 'partner', text: partner.opening }]);
      setPhaseState('dialog');
      say(partner.opening);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'L’échange n’a pas pu démarrer.');
      setPhaseState('intro');
    }
  };

  const startPrep = () => {
    setError('');
    setResult(null);
    setNotes('');
    setPrepLeft(prepTotal);
    prepRef.current = prepTotal;
    if (prepTotal) setPhaseState('prep');
    else { phaseRef.current = 'prep'; startDialog(); }
  };

  const talk = async () => {
    setError('');
    hush();
    try {
      await rec.start();
      setSubState('recording');
    } catch {
      setError(MIC_ERROR);
    }
  };

  const finish = async () => {
    if (subRef.current === 'recording') await sendTurn(true);
    else setPhaseState('ended');
    hush();
  };

  const grade = async () => {
    setPhaseState('grading');
    setError('');
    try {
      const res = await fetch('/api/ai/speaking/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, ticket: ticket.current, turns: turnsRef.current, seconds: Math.floor(dialogMs.current / 1000) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'La correction a échoué.');
      setResult({ feedback: data.feedback });
      markDone('eo/simulation-2');
      setPhaseState('done');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'La correction a échoué.');
      setPhaseState('ended');
    }
  };

  const candidateTurns = turns.filter((t) => t.who === 'candidate').length;

  return (
    <div className="mt-6 space-y-6">
      {(phase === 'intro' || phase === 'done') && (
        <div className="space-y-4">
          <p className="text-slate">
            Comme à l’examen, vous avez {fmt(prepTotal)} pour préparer vos questions, puis {fmt(task.seconds)} d’échange avec {partner.role}, joué par une IA.
            Vous parlez à tour de rôle : appuyez sur « Parler », posez votre question, puis sur « Envoyer ». Le chronomètre s’arrête pendant que l’interlocuteur répond.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={startPrep} className="inline-flex items-center rounded-full bg-maple px-6 py-3.5 font-bold text-white hover:bg-red-800">
              {phase === 'done' ? 'Refaire la tâche' : `Commencer la préparation (${fmt(prepTotal)})`}
            </button>
            <label className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={voice} onChange={(e) => { setVoice(e.target.checked); voiceRef.current = e.target.checked; }} className="h-4 w-4" />
              Entendre les réponses à voix haute
            </label>
          </div>
          <p className="text-sm text-slate">L’échange compte pour une correction d’oral, décomptée au début du dialogue.</p>
        </div>
      )}

      {phase === 'prep' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-3xl text-night" aria-live="polite">{fmt(prepLeft)}</span>
            <span className="text-slate">de préparation restantes</span>
            <button onClick={startDialog} className="ml-auto rounded-full bg-night px-5 py-3 font-bold text-white hover:bg-ocean">Je suis prêt, commencer l’échange</button>
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-night">Vos notes (elles ne sont pas envoyées)</span>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} className="mt-2 w-full rounded-xl border border-rule p-3 text-ink focus:border-ocean focus:outline-none" placeholder="Prix ? Horaires ? Conditions ? Documents à fournir ?" />
          </label>
        </div>
      )}

      {phase === 'starting' && <p className="text-slate" aria-live="polite">Mise en relation avec l’interlocuteur…</p>}

      {(phase === 'dialog' || phase === 'ended' || phase === 'grading' || phase === 'done') && turns.length > 0 && (
        <div className="space-y-4">
          {phase === 'dialog' && (
            <>
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-mono text-lg text-night" aria-live="off">{fmt(elapsed)} / {fmt(task.seconds)}</span>
                {sub === 'waiting' && <span className="text-sm font-semibold text-ocean">L’interlocuteur répond, chronomètre en pause…</span>}
                {sub === 'recording' && <span className="text-sm font-semibold text-maple">Vous parlez…</span>}
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-paper" aria-hidden="true"><div className="h-full bg-maple transition-all" style={{ width: `${Math.min(100, (elapsed / task.seconds) * 100)}%` }} /></div>
            </>
          )}
          {notes && phase === 'dialog' && <p className="whitespace-pre-line rounded-xl bg-paper p-3 text-sm text-slate">{notes}</p>}

          <ol className="space-y-3" aria-live="polite">
            {turns.map((t, i) => (
              <li key={i} className={`max-w-[85%] rounded-2xl px-4 py-3 ${t.who === 'candidate' ? 'ml-auto bg-ocean text-white' : 'bg-paper text-ink'}`}>
                <span className={`block text-xs font-bold ${t.who === 'candidate' ? 'text-blue-100' : 'text-ocean'}`}>{t.who === 'candidate' ? 'Vous' : 'Interlocuteur'}</span>
                {t.text}
                {t.who === 'partner' && voice && phase === 'dialog' && (
                  <button onClick={() => speak(t.text)} className="ml-2 text-xs font-semibold text-ocean underline">Réécouter</button>
                )}
              </li>
            ))}
          </ol>

          {phase === 'dialog' && (
            <div className="flex flex-wrap items-center gap-3">
              {sub !== 'recording' ? (
                <button onClick={talk} disabled={sub === 'waiting'} className="inline-flex items-center gap-2 rounded-full bg-maple px-6 py-3.5 font-bold text-white hover:bg-red-800 disabled:opacity-50">
                  <span className="h-3 w-3 rounded-full bg-white" aria-hidden="true" /> Parler
                </button>
              ) : (
                <button onClick={() => sendTurn(false)} className="inline-flex items-center gap-2 rounded-full bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean">
                  <span className="h-3 w-3 bg-white" aria-hidden="true" /> Envoyer ma réplique
                </button>
              )}
              <button onClick={finish} disabled={sub === 'waiting'} className="rounded-full border border-rule px-5 py-3 font-semibold text-night hover:border-ocean disabled:opacity-50">
                Terminer l’échange
              </button>
            </div>
          )}

          {(phase === 'ended' || phase === 'grading') && (
            <div className="flex flex-wrap items-center gap-4">
              <p className="w-full font-semibold text-night">Échange terminé : {candidateTurns} réplique{candidateTurns > 1 ? 's' : ''} de votre part.</p>
              <button onClick={grade} disabled={phase === 'grading' || !candidateTurns} className="inline-flex items-center justify-center rounded-full bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover disabled:opacity-50">
                {phase === 'grading' ? 'Correction en cours…' : 'Faire corriger mon échange'}
              </button>
              <Quota remaining={quota.remaining} plan={quota.plan} unit="correction" />
            </div>
          )}
        </div>
      )}

      {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-maple">{error}</p>}
      <p className="text-sm text-slate">Vos répliques sont transcrites puis supprimées. Seul le texte de l’échange est conservé dans votre espace.</p>

      {result && <FeedbackView feedback={result.feedback} improvedLabel="Questions modèles que vous auriez pu poser" />}
    </div>
  );
}
