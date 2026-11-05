'use client';
import { useEffect, useState } from 'react';

/** Copies a skeleton to the clipboard, with a short confirmation. */
export function CopyButton({ text, label = 'Copier' }: { text: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'error'>('idle');
  useEffect(() => {
    if (state === 'idle') return;
    const t = setTimeout(() => setState('idle'), 2000);
    return () => clearTimeout(t);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState('done');
    } catch {
      setState('error');
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-rule bg-white px-3.5 py-1.5 text-sm font-bold text-night transition-colors hover:border-ocean hover:text-ocean print:hidden"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {state === 'done' ? <path d="m5 12 4 4L19 6" /> : <path d="M9 9h10v12H9zM5 15H4V3h12v1" />}
      </svg>
      <span aria-live="polite">{state === 'done' ? 'Copié' : state === 'error' ? 'Copie impossible' : label}</span>
    </button>
  );
}

/** Opens the browser’s print dialog (the page has print styles). */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-rule bg-white px-6 py-3.5 font-bold text-night transition-colors hover:border-ocean hover:text-ocean print:hidden"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M8 14h8v7H8z" /></svg>
      Imprimer les modèles
    </button>
  );
}
