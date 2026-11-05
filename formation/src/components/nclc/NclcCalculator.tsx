'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { estimateFromBands, NCLC_TABLE, nclcFor, nclcLabel, overallNclc, SKILL_MAX, SKILL_MIN, type Skill } from '@/lib/nclc';
import { readResults } from '@/lib/results';

const SKILLS: { id: Skill; name: string; unit: string }[] = [
  { id: 'co', name: 'Compréhension orale', unit: 'score de 100 à 699' },
  { id: 'ce', name: 'Compréhension écrite', unit: 'score de 100 à 699' },
  { id: 'ee', name: 'Expression écrite', unit: 'note de 0 à 20' },
  { id: 'eo', name: 'Expression orale', unit: 'note de 0 à 20' },
];

const TARGET = 7;
const minFor = (skill: Skill, level: number) => NCLC_TABLE.find((r) => r.nclc === level)![skill][0];
const inputCls = 'mt-1.5 w-full rounded-md border border-rule bg-white px-4 py-3 text-lg tabular-nums text-ink focus:border-ocean focus:outline-none';

type Values = Record<Skill, string>;

/** Latest estimated scores of the practice series saved in this browser, if any. */
function latestPractice(): Partial<Values> {
  const out: Partial<Values> = {};
  const series = Object.entries(readResults().series);
  for (const skill of ['co', 'ce'] as const) {
    const last = series
      .filter(([k]) => k.startsWith(`${skill}-`))
      .map(([, e]) => e.last)
      .sort((a, b) => b.date.localeCompare(a.date))[0];
    if (last) out[skill] = String(last.tcf ?? estimateFromBands(last.bands));
  }
  return out;
}

export default function NclcCalculator() {
  const [values, setValues] = useState<Values>({ co: '', ce: '', ee: '', eo: '' });
  const [practice, setPractice] = useState<Partial<Values>>({});
  useEffect(() => setPractice(latestPractice()), []);

  const parsed = SKILLS.map((s) => {
    const raw = values[s.id].trim().replace(',', '.');
    const n = raw === '' ? null : Number(raw);
    const invalid = n !== null && (!Number.isFinite(n) || n < SKILL_MIN[s.id] || n > SKILL_MAX[s.id]);
    return { ...s, n, invalid, level: n === null || invalid ? undefined : nclcFor(s.id, n) };
  });
  const complete = parsed.every((p) => p.level !== undefined);
  const overall = complete ? overallNclc(parsed.map((p) => p.level ?? null)) : undefined;
  const below = parsed.filter((p) => p.level !== undefined && (p.level === null || p.level < TARGET));

  return (
    <div className="space-y-8">
      <form className="rounded-2xl bg-white p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="heading text-xl text-night">Vos résultats au TCF Canada</h2>
          {(practice.co || practice.ce) && (
            <button type="button" onClick={() => setValues((v) => ({ ...v, ...practice }))} className="text-sm font-bold text-ocean hover:underline">
              Reprendre mes scores estimés d’entraînement
            </button>
          )}
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {parsed.map((p) => (
            <label key={p.id} className="block">
              <span className="font-semibold text-night">{p.name}</span>
              <span className="block text-sm text-slate">{p.unit}</span>
              <input
                type="number" inputMode="decimal" min={SKILL_MIN[p.id]} max={SKILL_MAX[p.id]} step={p.id === 'co' || p.id === 'ce' ? 1 : 0.5}
                value={values[p.id]} onChange={(e) => setValues((v) => ({ ...v, [p.id]: e.target.value }))}
                aria-invalid={p.invalid || undefined} aria-describedby={`nclc-${p.id}`}
                placeholder={p.id === 'co' || p.id === 'ce' ? 'Ex. : 470' : 'Ex. : 11'}
                className={`${inputCls} ${p.invalid ? 'border-maple' : ''}`}
              />
              <span id={`nclc-${p.id}`} className={`mt-2 block text-sm ${p.invalid ? 'text-maple' : 'text-night'}`} aria-live="polite">
                {p.invalid
                  ? `Entrez une valeur entre ${SKILL_MIN[p.id]} et ${SKILL_MAX[p.id]}.`
                  : p.level !== undefined ? <strong>{nclcLabel(p.level)}</strong> : ' '}
              </span>
            </label>
          ))}
        </div>
      </form>

      <section aria-live="polite" className="rounded-2xl bg-night p-6 text-white sm:p-8">
        <p className="text-sm text-blue-200">Votre niveau global</p>
        {complete ? (
          <>
            <p className="display mt-1 text-5xl text-container">{nclcLabel(overall ?? null)}</p>
            <p className="mt-3 max-w-2xl text-blue-100">
              Le niveau retenu est celui de votre compétence la plus faible : IRCC vérifie chaque compétence séparément.
            </p>
            <div className="mt-6 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-4">
              {parsed.map((p) => (
                <div key={p.id}>
                  <p className="text-sm text-blue-100">{p.name}</p>
                  <p className="heading text-xl">{nclcLabel(p.level ?? null)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-white/10 p-5">
              {below.length === 0 ? (
                <p><strong>Vous atteignez le NCLC 7 dans les quatre compétences.</strong> C’est le minimum du Programme des travailleurs qualifiés (fédéral) d’Entrée express et le seuil des points supplémentaires pour le français.</p>
              ) : (
                <>
                  <p><strong>Pour atteindre le NCLC 7 dans les quatre compétences :</strong></p>
                  <ul className="mt-2 space-y-1 text-blue-100">
                    {below.map((p) => {
                      const gap = minFor(p.id, TARGET) - Math.floor(p.n!);
                      return <li key={p.id}>{p.name} : il vous manque {gap} point{gap > 1 ? 's' : ''} (minimum {minFor(p.id, TARGET)}{p.id === 'ee' || p.id === 'eo' ? ' sur 20' : ''}).</li>;
                    })}
                  </ul>
                </>
              )}
            </div>
          </>
        ) : (
          <p className="mt-2 text-blue-100">Entrez vos quatre résultats pour voir votre NCLC global. Le NCLC de chaque compétence s’affiche dès que vous la remplissez.</p>
        )}
        <p className="mt-6 text-sm text-blue-100">
          Calcul fait avec le tableau d’équivalence d’IRCC pour le TCF Canada.{' '}
          <Link href="/niveaux-nclc/" className="font-semibold text-container hover:underline">Voir le tableau complet</Link>
        </p>
      </section>
    </div>
  );
}
