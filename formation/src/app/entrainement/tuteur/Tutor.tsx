'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Quota from '@/components/ai/Quota';
import SignInPrompt from '@/components/ai/SignInPrompt';
import { useSignedIn } from '@/components/ai/useSignedIn';

type Message = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'Quand utiliser le subjonctif après « bien que » ?',
  'Comment structurer la tâche 3 de l’expression écrite ?',
  'Quelle est la différence entre « dont » et « que » ?',
  'Quel score faut-il pour un NCLC 7 ?',
];

export default function Tutor() {
  const signedIn = useSignedIn();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [quota, setQuota] = useState<{ remaining: number | null; plan: string | null }>({ remaining: null, plan: null });
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => end.current?.scrollIntoView({ block: 'nearest' }), [messages, busy]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    const next: Message[] = [...messages, { role: 'user', content: q }];
    setMessages(next);
    setInput('');
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/ai/tutor/', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: next }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Le tuteur ne répond pas.');
      setMessages([...next, { role: 'assistant', content: data.reply }]);
      setQuota({ remaining: data.remaining, plan: data.plan });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Le tuteur ne répond pas.');
    } finally {
      setBusy(false);
    }
  };

  const submit = (e: FormEvent) => { e.preventDefault(); ask(input); };

  if (signedIn === false) return <SignInPrompt next="/entrainement/tuteur/" />;

  return (
    <div className="rounded-2xl border border-rule bg-white">
      <div className="max-h-[60vh] min-h-72 space-y-4 overflow-y-auto p-5 sm:p-8">
        {messages.length === 0 && (
          <div>
            <p className="text-slate">Posez une question sur la grammaire, le vocabulaire ou la méthode du TCF Canada. Par exemple :</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => ask(s)} disabled={signedIn === null} className="rounded-full border border-rule px-4 py-2 text-left text-sm hover:border-ocean hover:text-ocean">{s}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <p className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 ${m.role === 'user' ? 'bg-night text-white' : 'bg-paper text-ink'}`}>{m.content}</p>
          </div>
        ))}
        {busy && <p className="text-sm text-slate" aria-live="polite">Le tuteur rédige sa réponse…</p>}
        <div ref={end} />
      </div>
      <form onSubmit={submit} className="border-t border-rule p-4 sm:p-5">
        {error && <p role="alert" className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-maple">{error}</p>}
        <div className="flex gap-3">
          <label className="flex-1">
            <span className="sr-only">Votre question</span>
            <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={1500} placeholder="Votre question…" className="w-full rounded-full border border-rule px-4 py-3 focus:border-ocean focus:outline-none" />
          </label>
          <button disabled={busy || !input.trim()} className="rounded-full bg-container px-5 py-3 font-bold text-night hover:bg-container-hover disabled:opacity-50">Envoyer</button>
        </div>
        <div className="mt-2"><Quota remaining={quota.remaining} plan={quota.plan} unit="question" /></div>
      </form>
    </div>
  );
}
