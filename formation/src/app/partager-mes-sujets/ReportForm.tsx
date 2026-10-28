'use client';

import { useActionState } from 'react';
import { MONTHS } from '@/lib/combinaisons';
import { submitReport, type ReportState } from './actions';

export default function ReportForm() {
  const [state, action, pending] = useActionState<ReportState, FormData>(submitReport, null);
  const now = new Date();
  const years = [now.getFullYear(), now.getFullYear() - 1, now.getFullYear() - 2];
  const field = 'mt-2 w-full rounded-xl border border-rule bg-white p-3 text-ink focus:border-ocean focus:outline-none';

  if (state?.ok) return <p role="status" className="rounded-2xl bg-white p-6 text-lg text-ink">{state.message}</p>;

  return (
    <form action={action} className="space-y-6 rounded-2xl bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="font-semibold text-night">Mois de l’examen</span>
          <select name="month" required defaultValue={now.getMonth() + 1} className={field}>
            {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="font-semibold text-night">Année</span>
          <select name="year" required defaultValue={years[0]} className={field}>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="font-semibold text-night">Ville du centre (facultatif)</span>
          <input name="city" maxLength={80} className={field} placeholder="Douala, Yaoundé…" />
        </label>
      </div>
      {[
        ['t1', 'Tâche 1 : le message', 'À qui fallait-il écrire, et pour dire quoi ?'],
        ['t2', 'Tâche 2 : le récit ou compte rendu', 'Quelle expérience ou quel événement fallait-il raconter ?'],
        ['t3', 'Tâche 3 : le texte argumenté', 'Quel était le débat ? Que disaient les deux documents ?'],
      ].map(([name, label, hint]) => (
        <label key={name} className="block">
          <span className="font-semibold text-night">{label}</span>
          <span className="block text-sm text-slate">{hint} Avec vos mots, même approximativement.</span>
          <textarea name={name} rows={name === 't3' ? 5 : 3} maxLength={name === 't3' ? 2500 : 1500} className={field} />
        </label>
      ))}
      <label className="block">
        <span className="font-semibold text-night">Remarques (facultatif)</span>
        <textarea name="notes" rows={2} maxLength={800} className={field} placeholder="Sujets d’oral, difficultés, conseils…" />
      </label>
      <label className="flex items-start gap-3 text-ink">
        <input type="checkbox" name="consent" className="mt-1 h-4 w-4" />
        <span>J’accepte que Paul World Travel reformule ces sujets et les publie sans mon nom, pour aider d’autres candidats.</span>
      </label>
      {state && !state.ok && <p role="alert" className="rounded-xl bg-red-50 p-4 text-maple">{state.message}</p>}
      <button disabled={pending} className="rounded-full bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover disabled:opacity-50">
        {pending ? 'Envoi…' : 'Envoyer mes sujets'}
      </button>
    </form>
  );
}
