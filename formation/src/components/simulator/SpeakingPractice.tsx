'use client';

import { useEffect, useState } from 'react';
import { speakingTasks, type SpeakingTask } from '@/content/expression';
import SignInPrompt from '@/components/ai/SignInPrompt';
import { useSignedIn } from '@/components/ai/useSignedIn';
import { fmt } from '@/components/ai/useRecorder';
import MonologuePractice from './MonologuePractice';
import InteractionPractice from './InteractionPractice';

const duration = (t: SpeakingTask) =>
  t.prepSeconds ? `${fmt(t.prepSeconds)} de préparation, puis ${fmt(t.seconds)} d’échange` : `${fmt(t.seconds)} de parole, sans préparation`;

export default function SpeakingPractice() {
  const signedIn = useSignedIn();
  const [task, setTask] = useState<SpeakingTask>(speakingTasks[0]);
  const [busy, setBusy] = useState(false);

  // A subject chosen from the "Sujets et corrigés" page.
  useEffect(() => {
    const asked = speakingTasks.find((t) => t.id === new URLSearchParams(window.location.search).get('sujet'));
    if (asked) setTask(asked);
  }, []);

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="heading mb-3 text-lg text-night">Choisissez une tâche</legend>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[...speakingTasks].sort((a, b) => a.task - b.task).map((t) => (
            <label key={t.id} className={`cursor-pointer rounded-2xl border-2 bg-white p-4 ${t.id === task.id ? 'border-ocean' : 'border-rule hover:border-ocean/50'} ${busy ? 'pointer-events-none opacity-60' : ''}`}>
              <input type="radio" name="task" className="sr-only" checked={t.id === task.id} disabled={busy} onChange={() => setTask(t)} />
              <span className="block text-sm font-bold text-night">{t.title}</span>
              <span className="mt-1 line-clamp-2 block text-sm text-ink">{t.prompt}</span>
              <span className="mt-2 block text-xs text-slate">{duration(t)}</span>
              {t.mode === 'interaction' && <span className="mt-2 block text-xs font-semibold text-night">Dialogue avec un interlocuteur IA</span>}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
        <p className="text-lg text-ink">{task.prompt}</p>
        <ul className="mt-4 space-y-1 text-sm text-slate">{task.tips.map((t) => <li key={t}>• {t}</li>)}</ul>
        {signedIn === false && <div className="mt-6"><SignInPrompt next="/epreuve/expression-orale/simulateur/" /></div>}
        {signedIn && (task.mode === 'interaction'
          ? <InteractionPractice key={task.id} task={task} onBusy={setBusy} />
          : <MonologuePractice key={task.id} task={task} onBusy={setBusy} />)}
      </div>
    </div>
  );
}
