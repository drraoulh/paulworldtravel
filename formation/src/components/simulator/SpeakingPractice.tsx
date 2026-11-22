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

export default function SpeakingPractice() {
  const signedIn = useSignedIn();
  const workArea = useRef<HTMLDivElement>(null);
  const [task, setTask] = useState<SpeakingTask>(speakingTasks[0]);
  const [busy, setBusy] = useState(false);

  // A subject chosen from the "Sujets et corrigés" page.
  useEffect(() => {
    const asked = speakingTasks.find((t) => t.id === new URLSearchParams(window.location.search).get('sujet'));
    if (asked) {
      setTask(asked);
      // Coming from a subject page: open straight on the work area.
      requestAnimationFrame(() => workArea.current?.scrollIntoView({ block: 'start' }));
    }
  }, []);

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
