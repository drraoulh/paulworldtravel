'use client';

import { useEffect, useRef, useState } from 'react';
import { speakingTasks, type SpeakingTask } from '@/content/expression';
import type { Feedback } from '@/lib/ai/prompts';
import FeedbackView from '@/components/ai/FeedbackView';
import Quota from '@/components/ai/Quota';
import SignInPrompt from '@/components/ai/SignInPrompt';
import { useSignedIn } from '@/components/ai/useSignedIn';
import { toMp3 } from '@/components/ai/toMp3';

type Phase = 'idle' | 'recording' | 'recorded' | 'sending';

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

function pickMime() {
  const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
  return types.find((t) => typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)) ?? '';
}

export default function SpeakingPractice() {
  const signedIn = useSignedIn();
  const [task, setTask] = useState<SpeakingTask>(speakingTasks[0]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [audio, setAudio] = useState<{ blob: Blob; url: string; seconds: number } | null>(null);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ transcript: string; feedback: Feedback } | null>(null);
  const [quota, setQuota] = useState<{ remaining: number | null; plan: string | null }>({ remaining: null, plan: null });
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const started = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
    recorder.current?.stream.getTracks().forEach((t) => t.stop());
  }, []);

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    if (recorder.current?.state === 'recording') recorder.current.stop();
  };

  const start = async () => {
    setError('');
    setResult(null);
    if (audio) URL.revokeObjectURL(audio.url);
    setAudio(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      const mimeType = pickMime();
      const rec = new MediaRecorder(stream, { ...(mimeType ? { mimeType } : {}), audioBitsPerSecond: 32000 });
      chunks.current = [];
      rec.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks.current, { type: rec.mimeType || 'audio/webm' });
        const seconds = Math.round((Date.now() - started.current) / 1000);
        setAudio({ blob, url: URL.createObjectURL(blob), seconds });
        setPhase('recorded');
      };
      recorder.current = rec;
      started.current = Date.now();
      setElapsed(0);
      rec.start(1000);
      setPhase('recording');
      timer.current = setInterval(() => {
        const s = Math.round((Date.now() - started.current) / 1000);
        setElapsed(s);
        if (s >= task.seconds) stop();
      }, 250);
    } catch {
      setError('Impossible d’accéder au micro. Autorisez le micro dans votre navigateur, puis réessayez.');
    }
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
      setQuota({ remaining: data.remaining, plan: data.plan });
      setPhase('recorded');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'La correction a échoué.');
      setPhase('recorded');
    }
  };

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="heading mb-3 text-lg text-night">Choisissez une tâche</legend>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {speakingTasks.map((t) => (
            <label key={t.id} className={`cursor-pointer rounded-2xl border-2 bg-white p-4 ${t.id === task.id ? 'border-ocean' : 'border-rule hover:border-ocean/50'} ${phase === 'recording' ? 'pointer-events-none opacity-60' : ''}`}>
              <input type="radio" name="task" className="sr-only" checked={t.id === task.id} onChange={() => { setTask(t); setResult(null); }} />
              <span className="block text-sm font-bold text-ocean">{t.title}</span>
              <span className="mt-1 block text-sm text-slate">{fmt(t.seconds)} de parole</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
        <p className="text-lg text-ink">{task.prompt}</p>
        <ul className="mt-4 space-y-1 text-sm text-slate">{task.tips.map((t) => <li key={t}>• {t}</li>)}</ul>

        {signedIn === false ? (
          <div className="mt-6"><SignInPrompt next="/entrainement/expression-orale/" /></div>
        ) : (
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {phase !== 'recording' ? (
                <button onClick={start} disabled={phase === 'sending' || signedIn === null} className="inline-flex items-center gap-2 rounded-xl bg-maple px-6 py-3.5 font-bold text-white hover:bg-red-800 disabled:opacity-50">
                  <span className="h-3 w-3 rounded-full bg-white" aria-hidden="true" /> {audio ? 'Recommencer l’enregistrement' : 'Commencer l’enregistrement'}
                </button>
              ) : (
                <button onClick={stop} className="inline-flex items-center gap-2 rounded-xl bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean">
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
                  <button onClick={send} disabled={phase === 'sending'} className="inline-flex items-center justify-center rounded-xl bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover disabled:opacity-50">
                    {phase === 'sending' ? 'Transcription et correction (1 min environ)…' : 'Faire corriger mon oral'}
                  </button>
                  <Quota remaining={quota.remaining} plan={quota.plan} unit="correction" />
                </div>
              </>
            )}
          </div>
        )}
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-maple">{error}</p>}
        <p className="mt-6 text-sm text-slate">Votre enregistrement sert uniquement à la correction : il est transcrit puis supprimé. Seule la transcription est conservée dans votre espace.</p>
      </div>

      {result && (
        <>
          <details className="rounded-2xl border border-rule bg-white p-6" open>
            <summary className="heading cursor-pointer text-lg text-night">Ce que l’IA a entendu</summary>
            <p className="mt-4 whitespace-pre-line text-ink">{result.transcript}</p>
          </details>
          <FeedbackView feedback={result.feedback} improvedLabel="Réponse modèle à vous entraîner à dire" />
        </>
      )}
    </div>
  );
}
