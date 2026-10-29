'use client';

import Link from 'next/link';
import type { CourseItem, CourseModule, ItemKind } from '@/content/parcours/course';
import { markDone, percent, setWeeklyGoal, useCourse } from './useCourse';

export const KIND_LABEL: Record<ItemKind, string> = {
  lecon: 'Leçon et quiz',
  exercice: 'Exercice noté',
  simulation: 'Simulation corrigée par l’IA',
  examen: 'Examen blanc',
};

export function KindIcon({ kind, className = 'h-5 w-5' }: { kind: ItemKind; className?: string }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...p}>
      {kind === 'lecon' && <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5" /></>}
      {kind === 'exercice' && <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1" /><path d="m9 13 2 2 4-4" /></>}
      {kind === 'simulation' && <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></>}
      {kind === 'examen' && <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5" /><path d="M10 2h4" /></>}
    </svg>
  );
}

export function StatusMark({ done, current }: { done: boolean; current?: boolean }) {
  if (done) {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" /></svg>
        <span className="sr-only">Terminé</span>
      </span>
    );
  }
  return (
    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${current ? 'border-ocean' : 'border-rule'}`}>
      {current && <span className="h-2.5 w-2.5 rounded-full bg-ocean" />}
      <span className="sr-only">{current ? 'En cours' : 'À faire'}</span>
    </span>
  );
}

function Bar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-paper ${className}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} aria-label="Progression">
      <div className="h-full rounded-full bg-ocean transition-[width] duration-700" style={{ width: `${value}%` }} />
    </div>
  );
}

const DAY_LETTERS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function weekDays() {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toLocaleDateString('sv-SE');
  });
}

export default function CourseHome({ course, totalMinutes }: { course: CourseModule[]; totalMinutes: number }) {
  const { ready, isDone, last, goal, days } = useCourse();
  const items = course.flatMap((m) => m.items);
  const doneCount = items.filter((it) => isDone(it.id)).length;
  const pct = percent(items, isDone);
  // Resume where the candidate stopped, else at the first unfinished item.
  // After a finished item, continue with the next unfinished one.
  const lastIndex = last ? items.findIndex((it) => it.id === last.id) : -1;
  const resume: CourseItem | undefined =
    (lastIndex >= 0 && !isDone(items[lastIndex].id) ? items[lastIndex] : undefined)
    ?? items.slice(lastIndex + 1).find((it) => !isDone(it.id))
    ?? items.find((it) => !isDone(it.id));
  const currentModule = course.find((m) => m.items.some((it) => it.id === resume?.id));
  const week = weekDays();
  const activeThisWeek = week.filter((d) => days.has(d)).length;
  const todayKey = new Date().toLocaleDateString('sv-SE');

  return (
    <>
      <section className="border-b border-rule bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_24rem] lg:items-end lg:px-8">
          <div>
            <h1 className="display max-w-2xl text-[2.3rem] text-night sm:text-[3.1rem]">Préparation complète au TCF Canada</h1>
            <p className="mt-4 max-w-2xl text-lg text-slate">
              {course.length} modules, {items.length} éléments, environ {Math.round(totalMinutes / 60)} heures. Avancez à votre rythme : chaque leçon, série et simulation terminée fait progresser votre barre.
            </p>
          </div>
          <div className="rounded-2xl border border-rule bg-paper p-6">
            <div className="flex items-baseline justify-between">
              <p className="font-semibold text-night">Votre progression</p>
              <p className="display text-3xl text-night">{ready ? pct : 0} %</p>
            </div>
            <Bar value={ready ? pct : 0} className="mt-3 bg-white" />
            <p className="mt-2 text-sm text-slate">{doneCount} sur {items.length} éléments terminés</p>
            {resume ? (
              <Link href={resume.href} className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-night px-5 py-4 text-white hover:bg-ocean">
                <span className="min-w-0">
                  <span className="block text-sm text-blue-100">{doneCount === 0 ? 'Commencer le parcours' : 'Reprendre'}</span>
                  <span className="block truncate font-bold">{resume.title}</span>
                </span>
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true"><path d="M6 4l10 6-10 6V4z" /></svg>
              </Link>
            ) : (
              <Link href="/parcours/attestation/" className="mt-5 block rounded-xl bg-container px-5 py-4 text-center font-bold text-night hover:bg-container-hover">Parcours terminé : obtenir mon attestation</Link>
            )}
          </div>
        </div>
      </section>

      <section className="bg-paper py-10 sm:py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_20rem] lg:px-8">
          <div className="space-y-4">
            <h2 className="heading text-2xl text-night">Programme du cours</h2>
            {course.map((m) => {
              const mDone = m.items.filter((it) => isDone(it.id)).length;
              const mPct = percent(m.items, isDone);
              const mMinutes = m.items.reduce((n, it) => n + it.minutes, 0);
              return (
                <details key={m.id} open={ready ? m.id === currentModule?.id : m.number <= 2} className="group overflow-hidden rounded-2xl border border-rule bg-white">
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${mPct === 100 ? 'bg-green-600 text-white' : 'bg-paper text-night'}`}>{m.number}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-slate">Module {m.number}, {m.items.length} élément{m.items.length > 1 ? 's' : ''}, {mMinutes < 90 ? `${mMinutes} min` : `${Math.round(mMinutes / 60)} h`}</span>
                      <span className="heading block text-lg text-night sm:text-xl">{m.title}</span>
                      <span className="mt-2 flex items-center gap-3">
                        <Bar value={mPct} className="max-w-48 flex-1" />
                        <span className="text-sm tabular-nums text-slate">{mDone} / {m.items.length}</span>
                      </span>
                    </span>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-slate transition-transform group-open:rotate-180" aria-hidden="true"><path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" /></svg>
                  </summary>
                  <div className="border-t border-rule">
                    <p className="px-5 pt-4 text-sm text-slate sm:px-6">{m.summary}</p>
                    <ol className="p-2 sm:p-3">
                      {m.items.map((it) => {
                        const ok = isDone(it.id);
                        const current = it.id === resume?.id;
                        return (
                          <li key={it.id} className={`flex items-center gap-3 rounded-xl px-3 py-3 ${current ? 'bg-blue-50' : 'hover:bg-paper'}`}>
                            <StatusMark done={ok} current={current} />
                            <span className="text-slate"><KindIcon kind={it.kind} /></span>
                            <Link href={it.href} className="min-w-0 flex-1">
                              <span className={`block font-semibold ${ok ? 'text-slate' : 'text-night'} hover:text-ocean`}>{it.title}</span>
                              <span className="block text-sm text-slate">{KIND_LABEL[it.kind]}, {it.minutes} min</span>
                            </Link>
                            {it.kind === 'simulation' && !ok && ready && (
                              <button onClick={() => markDone(it.id)} className="hidden shrink-0 rounded-full border border-rule px-3 py-1.5 text-xs font-semibold text-slate hover:border-ocean hover:text-ocean sm:block">
                                Marquer comme fait
                              </button>
                            )}
                            {current && <span className="hidden shrink-0 rounded-full bg-ocean px-3 py-1 text-xs font-bold text-white sm:block">En cours</span>}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </details>
              );
            })}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-white p-6">
              <h2 className="heading text-lg text-night">Objectif de la semaine</h2>
              <p className="mt-1 text-sm text-slate">{activeThisWeek} jour{activeThisWeek > 1 ? 's' : ''} d’étude sur {goal} cette semaine.</p>
              <ol className="mt-4 grid grid-cols-7 gap-1.5">
                {week.map((d, i) => {
                  const on = days.has(d);
                  return (
                    <li key={d} className="text-center">
                      <span className={`flex aspect-square items-center justify-center rounded-lg text-xs font-bold ${on ? 'bg-container text-night' : 'bg-paper text-slate'} ${d === todayKey ? 'ring-2 ring-ocean/40' : ''}`}>
                        {on ? '✓' : ''}
                      </span>
                      <span className="mt-1 block text-xs text-slate">{DAY_LETTERS[i]}</span>
                    </li>
                  );
                })}
              </ol>
              <fieldset className="mt-4">
                <legend className="text-sm text-slate">Jours par semaine</legend>
                <div className="mt-2 flex gap-2">
                  {[3, 5, 7].map((g) => (
                    <button key={g} onClick={() => setWeeklyGoal(g)} aria-pressed={goal === g}
                      className={`flex-1 rounded-full py-2 text-sm font-semibold ${goal === g ? 'bg-night text-white' : 'border border-rule text-night hover:border-night'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="rounded-2xl bg-white p-6">
              <h2 className="heading text-lg text-night">Attestation de parcours</h2>
              {pct === 100 && ready ? (
                <>
                  <p className="mt-2 text-sm text-slate">Bravo, vous avez terminé tous les éléments du parcours.</p>
                  <Link href="/parcours/attestation/" className="mt-4 block rounded-full bg-container py-3 text-center font-bold text-night hover:bg-container-hover">Obtenir mon attestation</Link>
                </>
              ) : (
                <>
                  <p className="mt-2 text-sm text-slate">Terminez tous les éléments pour obtenir votre attestation Paul World Travel. Il vous reste {items.length - doneCount} élément{items.length - doneCount > 1 ? 's' : ''}.</p>
                  <Bar value={ready ? pct : 0} className="mt-4" />
                </>
              )}
            </div>

            <div className="rounded-2xl bg-white p-6 text-sm text-slate">
              Une question pendant le parcours ? <Link href="/entrainement/tuteur/" className="font-semibold text-ocean hover:underline">Demandez au tuteur IA</Link>. Votre progression est enregistrée sur cet appareil.
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
