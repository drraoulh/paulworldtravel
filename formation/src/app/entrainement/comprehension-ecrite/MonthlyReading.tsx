'use client';
import { useMemo, useState } from 'react';
import { buildReadingSeries, FULL_READING_SECONDS, readingBank, READING_BANK_VERSION } from '@/lib/reading-series';
import ReadingPractice from '../ReadingPractice';
export default function MonthlyReading({ initialMonth, initialVariant = 1 }: { initialMonth: string; initialVariant?: number }) {
  const [month, setMonth] = useState(initialMonth);
  const [variant, setVariant] = useState(initialVariant);
  const [active, setActive] = useState(false);
  const [selectionError, setSelectionError] = useState('');
  const questions = useMemo(() => buildReadingSeries(month, variant), [month, variant]);
  const label = new Date(month + '-01T12:00:00Z').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric', timeZone: 'Africa/Douala' });
  return <div className="space-y-6">
    <div className="rounded-2xl border border-rule bg-white p-6">
      <h2 className="heading text-2xl">Votre programme mensuel</h2>
      <p className="mt-3 text-slate">{readingBank.length} questions originales dans la banque. Chaque combinaison contient 39 questions distinctes, classées par difficulté indicative croissante de A1 à C2. Messages, annonces, horaires, tableaux et textes argumentés permettent de varier les méthodes de lecture. Le chronomètre de 60 minutes reprend la durée de l’épreuve de compréhension écrite.</p>
      <p className="mt-3 text-sm text-slate">Le mois organise votre entraînement : il ne désigne pas une session réelle ni des annales. Les combinaisons réutilisent la même banque ; elles peuvent partager des questions. Le niveau des exercices n’a pas été étalonné par France Éducation international.</p>
      <fieldset disabled={active} className="mt-5 flex flex-wrap gap-4 disabled:opacity-60"><legend className="sr-only">Choisir une combinaison</legend>
        <label className="grid gap-2 text-sm font-semibold">Mois et année<input type="month" value={month} onChange={e => { const value = e.target.value; if (/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) { setMonth(value); setSelectionError(''); } else setSelectionError('Choisissez un mois et une année valides.'); }} className="rounded-lg border border-rule p-3" /></label>
        <label className="grid gap-2 text-sm font-semibold">Combinaison<select value={variant} onChange={e => setVariant(Number(e.target.value))} className="rounded-lg border border-rule p-3"><option value={1}>Série 1</option><option value={2}>Série 2</option><option value={3}>Série 3</option></select></label>
      </fieldset>
      {active && <p role="status" className="mt-3 text-sm">La sélection reste fixe pendant la série. Terminez-la pour changer de combinaison.</p>}
      {selectionError && <p role="alert" className="mt-3 text-sm text-maple">{selectionError}</p>}
      <p className="mt-5 font-bold text-ocean">{label} · Série {variant} · 39 questions · 60 minutes en mode chronométré</p>
    </div>
    <ReadingPractice key={`${month}-${variant}`} questions={questions} duration={FULL_READING_SECONDS} seriesKey={`${READING_BANK_VERSION}-${month}-${variant}`} onActiveChange={setActive} />
  </div>;
}
