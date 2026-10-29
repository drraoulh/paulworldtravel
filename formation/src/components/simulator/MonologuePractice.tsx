'use client';

import { useEffect, useRef, useState } from 'react';
import type { SpeakingTask } from '@/content/expression';
import type { Feedback } from '@/lib/ai/prompts';
import FeedbackView from '@/components/ai/FeedbackView';
import Quota from '@/components/ai/Quota';
import { toMp3 } from '@/components/ai/toMp3';
import { fmt, MIC_ERROR, useRecorder } from '@/components/ai/useRecorder';
import { markDone } from '@/components/parcours/useCourse';

type Phase = 'idle' | 'recording' | 'recorded' | 'sending';

export default function MonologuePractice({ task, onBusy }: { task: SpeakingTask; onBusy: (busy: boolean) => void }) {
  const rec = useRecorder();
  const [phase, setPhase] = useState<Phase>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [audio, setAudio] = useState<{ blob: Blob; url: string; seconds: number } | null>(null);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ transcript: string; feedback: Feedback } | null>(null);
  const [quota, setQuota] = useState<{ remaining: number | null; plan: string | null }>({ remaining: null, plan: null });
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { onBusy(phase === 'recording' || phase === 'sending'); }, [phase, onBusy]);
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const stop = async () => {
    if (timer.current) clearInterval(timer.current);
    const recording = await rec.stop();
    if (!recording) return;
    setAudio({ ...recording, url: URL.createObjectURL(recording.blob) });
    setPhase('recorded');
  };

  const start = async () => {
    setError('');
    setResult(null);
    if (audio) URL.revokeObjectURL(audio.url);
    setAudio(null);
    try {
      await rec.start();
    } catch {
      setError(MIC_ERROR);
      return;
    }
    setElapsed(0);
    setPhase('recording');
    timer.current = setInterval(() => {
      const s = rec.elapsed();
      setElapsed(s);
      if (s >= task.seconds) stop();
    }, 250);
  };

  const send = async () => {
    if (!audio) return;
    setPhase('sending');
    setError('');
    try {
      // Convert to MP3: smaller upload, and a format the transcription accepts.
      let file: Blob = audio.blob;
      try { file = await toMp3(audio.blob); } catch { /* fall back to the original recording */ }
      const form = new FormData();
      form.append('taskId', task.id);
      form.append('seconds', String(audio.seconds));
      form.append('audio', file, file.type === 'audio/mpeg' ? 'reponse.mp3' : 'reponse.m4a');
      const res = await fetch('/api/ai/speaking/', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'La correction a échoué.');
      setResult({ transcript: data.transcript, feedback: data.feedback });
      markDone(`eo/simulation-${task.task}`);
      setQuota({ remaining: data.remaining, plan: data.plan });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'La correction a échoué.');
    }
    setPhase('recorded');
  };

  return (
    <>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {phase !== 'recording' ? (
            <button onClick={start} disabled={phase === 'sending'} className="inline-flex items-center gap-2 rounded-full bg-maple px-6 py-3.5 font-bold text-white hover:bg-red-800 disabled:opacity-50">
              <span className="h-3 w-3 rounded-full bg-white" aria-hidden="true" /> {audio ? 'Recommencer l’enregistrement' : 'Commencer l’enregistrement'}
            </button>
          ) : (
            <button onClick={stop} className="inline-flex items-center gap-2 rounded-full bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean">
              <span className="h-3 w-3 bg-white" aria-hidden="true" /> Arrêter
            </button>
          )}
          <span className="font-mono text-lg text-night" aria-live="polite">{fmt(phase === 'recording' ? elapsed : audio?.seconds ?? 0)} / {fmt(task.seconds)}</span>
          {phase === 'recording' && <span className="text-sm font-semibold text-maple">Enregistrement…</span>}
        </div>
        {phase === 'recording' && (
          <div className="h-1.5 overflow-hidden rounded-full bg-paper" aria-hidden="true"><div className="h-full bg-maple transition-all" style={{ width: `${Math.min(100, (elapsed / task.seconds) * 100)}%` }} /></div>
        )}
        {audio && phase !== 'recording' && (
          <>
            <audio controls src={audio.url} className="w-full max-w-md" />
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={send} disabled={phase === 'sending'} className="inline-flex items-center justify-center rounded-full bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover disabled:opacity-50">
                {phase === 'sending' ? 'Transcription et correction (1 min environ)…' : 'Faire corriger mon oral'}
              </button>
              <Quota remaining={quota.remaining} plan={quota.plan} unit="correction" />
            </div>
          </>
        )}
      </div>
      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-maple">{error}</p>}
      <p className="mt-6 text-sm text-slate">Votre enregistrement sert uniquement à la correction : il est transcrit puis supprimé. Seule la transcription est conservée dans votre espace.</p>

      {result && (
        <div className="mt-8 space-y-8">
          <details className="rounded-2xl border border-rule bg-paper p-6" open>
            <summary className="heading cursor-pointer text-lg text-night">Ce que l’IA a entendu</summary>
            <p className="mt-4 whitespace-pre-line text-ink">{result.transcript}</p>
          </details>
          <FeedbackView feedback={result.feedback} improvedLabel="Réponse modèle à vous entraîner à dire" />
        </div>
      )}
    </>
  );
}
