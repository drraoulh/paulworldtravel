'use client';

import { useEffect, useState } from 'react';
import { writingTasks, wordCount, type WritingTask } from '@/content/expression';
import type { Feedback } from '@/lib/ai/prompts';
import FeedbackView from '@/components/ai/FeedbackView';
import Quota from '@/components/ai/Quota';
import SignInPrompt from '@/components/ai/SignInPrompt';
import { useSignedIn } from '@/components/ai/useSignedIn';
import { isCombinaison, parseCombiTaskId, toWritingTask, type Combinaison } from '@/lib/combinaisons';
import { getSupabase } from '@/lib/supabase/client';

const DRAFT_KEY = 'pwt-ee-draft';

export default function WritingPractice() {
  const signedIn = useSignedIn();
  const [task, setTask] = useState<WritingTask>(writingTasks[0]);
  // Task from a candidates' combination, shown above the regular subjects.
  const [extra, setExtra] = useState<WritingTask | null>(null);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [quota, setQuota] = useState<{ remaining: number | null; plan: string | null }>({ remaining: null, plan: null });
  const words = wordCount(text);
  const inRange = words >= task.minWords && words <= task.maxWords;

  // Keep the draft if the page is closed by accident. A subject chosen from the
  // "Sujets et corrigés" page (?sujet=…) wins over the saved draft.
  useEffect(() => {
    let saved: { taskId?: string; text?: unknown } | null = null;
    try { saved = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? 'null'); } catch { /* Draft is optional. */ }
    const savedTask = writingTasks.find((x) => x.id === saved?.taskId);
    const savedText = typeof saved?.text === 'string' ? saved.text : '';
    const asked = writingTasks.find((x) => x.id === new URLSearchParams(window.location.search).get('sujet'));
    const chosen = asked ?? savedTask;
    if (chosen) {
      setTask(chosen);
      setText(chosen.id === savedTask?.id ? savedText : '');
    }
    // A task of a candidates' combination: loaded from the published list.
    const combi = parseCombiTaskId(new URLSearchParams(window.location.search).get('sujet') ?? '');
    const supabase = getSupabase();
    if (combi && supabase) {
      supabase.from('question_drafts').select('id, theme, created_at, content').eq('id', combi.id).eq('status', 'approved').maybeSingle()
        .then(({ data }: { data: Combinaison | null }) => {
          if (!data || !isCombinaison(data.content)) return;
          const t = toWritingTask(data, combi.task);
          setExtra(t);
          setTask(t);
          setText(savedTask === undefined && saved?.taskId === t.id ? savedText : '');
        });
    }
  }, []);
  useEffect(() => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ taskId: task.id, text })); } catch { /* ignore */ }
  }, [task, text]);

  const submit = async () => {
    setBusy(true);
    setError('');
    setFeedback(null);
    try {
      const res = await fetch('/api/ai/writing/', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ taskId: task.id, text }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'La correction a échoué.');
      setFeedback(data.feedback);
      setQuota({ remaining: data.remaining, plan: data.plan });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'La correction a échoué.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="heading mb-3 text-lg text-night">Choisissez un sujet</legend>
        {extra && (
          <label className={`mb-5 block cursor-pointer rounded-2xl border-2 bg-white p-4 ${extra.id === task.id ? 'border-ocean' : 'border-rule hover:border-ocean/50'}`}>
            <input type="radio" name="task" className="sr-only" checked={extra.id === task.id} onChange={() => { setTask(extra); setFeedback(null); }} />
            <span className="block text-sm font-bold text-night">Combinaison des candidats : {extra.title}</span>
            <span className="mt-1 line-clamp-2 block text-sm text-slate">{extra.prompt}</span>
          </label>
        )}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {([1, 2, 3] as const).map((n) => (
            <div key={n} className="space-y-3">
              <p className="text-sm font-bold text-night">Tâche {n}</p>
              {writingTasks.filter((t) => t.task === n).map((t) => (
                <label key={t.id} className={`block cursor-pointer rounded-2xl border-2 bg-white p-4 ${t.id === task.id ? 'border-ocean' : 'border-rule hover:border-ocean/50'}`}>
                  <input type="radio" name="task" className="sr-only" checked={t.id === task.id} onChange={() => { setTask(t); setFeedback(null); }} />
                  <span className="line-clamp-3 block text-sm text-slate">{t.prompt}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      </fieldset>

      <div className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
        <p className="text-sm font-bold text-ocean">{task.title} · {task.minWords} à {task.maxWords} mots · environ {task.minutes} min</p>
        <p className="mt-3 text-lg text-ink">{task.prompt}</p>
        {task.documents && (
          <div className="mt-4 space-y-2">{task.documents.map((d) => <blockquote key={d} className="border-l-4 border-sky bg-paper p-4 text-sm">{d}</blockquote>)}</div>
        )}
        <label className="mt-6 block">
          <span className="sr-only">Votre texte</span>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={12} spellCheck={false} placeholder="Rédigez votre texte ici…" className="w-full rounded-xl border border-rule p-4 text-ink focus:border-ocean focus:outline-none" />
        </label>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className={inRange ? 'font-semibold text-green-700' : 'text-slate'}>{words} mot{words > 1 ? 's' : ''} {inRange ? '(longueur respectée)' : `(attendu : ${task.minWords} à ${task.maxWords})`}</span>
          <Quota remaining={quota.remaining} plan={quota.plan} unit="correction" />
        </div>
        {signedIn === false ? (
          <div className="mt-6"><SignInPrompt next="/epreuve/expression-ecrite/simulateur/" /></div>
        ) : (
          <button onClick={submit} disabled={busy || words < 20 || signedIn === null} className="mt-6 inline-flex items-center justify-center rounded-full bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover disabled:opacity-50">
            {busy ? 'Correction en cours (30 s environ)…' : 'Faire corriger mon texte'}
          </button>
        )}
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-maple">{error}</p>}
      </div>

      {feedback && <FeedbackView feedback={feedback} />}
    </div>
  );
}
