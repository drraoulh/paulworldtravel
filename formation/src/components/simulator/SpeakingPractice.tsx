'use client';

import { useEffect, useRef, useState } from 'react';
import { speakingTasks, type SpeakingTask } from '@/content/expression';
import SignInPrompt from '@/components/ai/SignInPrompt';
import { useSignedIn } from '@/components/ai/useSignedIn';
import { fmt } from '@/components/ai/useRecorder';
import MonologuePractice from './MonologuePractice';
import InteractionPractice from './InteractionPractice';
import TrialBanner from '@/components/access/TrialBanner';
import SubjectPicker, { ChangeSubject } from './SubjectPicker';
import MicTest from './MicTest';

const duration = (t: SpeakingTask) =>
  t.prepSeconds ? `${fmt(t.prepSeconds)} de préparation, puis ${fmt(t.seconds)} d’échange` : `${fmt(t.seconds)} de parole, sans préparation`;

export default function SpeakingPractice({ sessionTask }: { sessionTask?: SpeakingTask }) {
  const signedIn = useSignedIn();
  const workArea = useRef<HTMLDivElement>(null);
  const [task, setTask] = useState<SpeakingTask>(sessionTask ?? speakingTasks[0]);
  const [busy, setBusy] = useState(false);

  // A subject chosen from the "Sujets et corrigés" page.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('sujet');
    const asked = sessionTask?.id === id ? sessionTask : speakingTasks.find((t) => t.id === id);
    if (asked) {
      setTask(asked);
      // Coming from a subject page: open straight on the work area.
      requestAnimationFrame(() => workArea.current?.scrollIntoView({ block: 'start' }));
    }
  }, [sessionTask]);

  return (
    <div className="space-y-8">
      <TrialBanner feature="speaking" />
      <SubjectPicker
        subjects={speakingTasks}
        selected={task}
        onSelect={setTask}
        workArea={workArea}
        disabled={busy}
        describeTask={(n) => ({ 1: 'Entretien dirigé, 2 min', 2: 'Obtenir des informations, avec l’IA', 3: 'Exprimer un point de vue' })[n]}
        meta={duration}
        extra={sessionTask && (
          <label className={`mb-4 block cursor-pointer rounded-2xl border-2 bg-white p-4 ${sessionTask.id === task.id ? 'border-ocean' : 'border-rule hover:border-ocean/50'}`}>
            <input type="radio" name="subject" className="sr-only" checked={sessionTask.id === task.id} disabled={busy} onChange={() => setTask(sessionTask)} />
            <span className="block text-sm font-bold text-night">Sujet de session : {sessionTask.title}</span>
            <span className="mt-1 line-clamp-2 block text-sm text-slate">{sessionTask.prompt}</span>
          </label>
        )}
      />

      <div ref={workArea} className="scroll-mt-24 rounded-2xl border border-rule bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm font-bold text-ocean">{task.title}, {duration(task)}</p>
          <ChangeSubject />
        </div>
        <p className="mt-3 text-lg text-ink">{task.prompt}</p>
        <ul className="mt-4 space-y-1 text-sm text-slate">{task.tips.map((t) => <li key={t}>• {t}</li>)}</ul>
        {signedIn === false && <div className="mt-6"><SignInPrompt next="/epreuve/expression-orale/simulateur/" /></div>}
        {signedIn && <MicTest />}
        {signedIn && (task.mode === 'interaction'
          ? <InteractionPractice key={task.id} task={task} onBusy={setBusy} />
          : <MonologuePractice key={task.id} task={task} onBusy={setBusy} />)}
      </div>
    </div>
  );
}
