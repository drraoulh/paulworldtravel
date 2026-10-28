'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const inputCls = 'mt-1 w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-ink';

export default function GenerateForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch('/api/ai/generate/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'La génération a échoué.');
      setMessage({ ok: true, text: `${data.created} exercice${data.created > 1 ? 's' : ''} ajouté${data.created > 1 ? 's' : ''} aux brouillons ci-dessous.` });
      router.refresh();
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : 'La génération a échoué.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-4 rounded-2xl border border-rule bg-white p-6 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
      <label className="text-sm font-semibold text-night">Épreuve
        <select name="epreuve" className={inputCls}><option value="ce">Compréhension écrite</option><option value="co">Compréhension orale (script)</option></select>
      </label>
      <label className="text-sm font-semibold text-night">Niveau
        <select name="level" defaultValue="B1" className={inputCls}>{['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((l) => <option key={l}>{l}</option>)}</select>
      </label>
      <label className="text-sm font-semibold text-night lg:col-span-2">Thème
        <input name="theme" maxLength={120} placeholder="Logement, travail, santé, démarches…" className={inputCls} />
      </label>
      <label className="text-sm font-semibold text-night">Nombre
        <select name="count" defaultValue="3" className={inputCls}>{[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}</select>
      </label>
      <div className="sm:col-span-2 lg:col-span-5">
        <button disabled={busy} className="rounded-xl bg-container px-6 py-3 font-bold text-night hover:bg-container-hover disabled:opacity-50">{busy ? 'Génération en cours…' : 'Générer des brouillons'}</button>
        {message && <p role="status" className={`mt-3 text-sm ${message.ok ? 'text-green-700' : 'text-maple'}`}>{message.text}</p>}
      </div>
    </form>
  );
}
