'use client';

import { useCallback, useEffect, useState } from 'react';
import { readResults } from '@/lib/results';
import type { CourseItem } from '@/content/parcours/course';

/*
 * Course progress, kept in this browser (like the lesson checkmarks):
 *  - finished items: lessons, simulations, level test (pwt-parcours-done);
 *  - series and mock exams: read from the practice results (pwt-results);
 *  - the last item opened, the days of activity and the weekly goal (pwt-parcours-meta).
 */
const DONE = 'pwt-parcours-done';
const META = 'pwt-parcours-meta';
export const PROGRESS_EVENT = 'pwt-parcours-change';

interface Meta { last?: { id: string; href: string; title: string }; days: string[]; goal: number }

const today = () => new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD, local time

function readJson<T>(key: string, fallback: T): T {
  try {
    const v = JSON.parse(localStorage.getItem(key) ?? 'null');
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function readDone(): string[] {
  const v = readJson<unknown>(DONE, []);
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

function readMeta(): Meta {
  const m = readJson<Partial<Meta>>(META, {});
  return { last: m.last, days: Array.isArray(m.days) ? m.days : [], goal: [3, 5, 7].includes(m.goal ?? 0) ? m.goal! : 5 };
}

function write(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* progress is optional */ }
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

function addDay(meta: Meta) {
  const d = today();
  return meta.days.includes(d) ? meta.days : [...meta.days, d].slice(-120);
}

/** Marks an item finished (or not). Usable outside React, e.g. after an AI correction. */
export function markDone(id: string, value = true) {
  if (typeof window === 'undefined') return;
  const current = readDone();
  const next = value ? Array.from(new Set([...current, id])) : current.filter((v) => v !== id);
  write(DONE, next);
  if (value) { const meta = readMeta(); write(META, { ...meta, days: addDay(meta) }); }
}

/** Remembers the item being studied, for the "Reprendre" button. */
export function markVisit(item: { id: string; href: string; title: string }) {
  const meta = readMeta();
  write(META, { ...meta, last: item, days: addDay(meta) });
}

export function setWeeklyGoal(goal: number) {
  write(META, { ...readMeta(), goal });
}

interface State { done: string[]; meta: Meta; series: string[]; mocks: string[]; ready: boolean }

export function useCourse() {
  const [s, setS] = useState<State>({ done: [], meta: { days: [], goal: 5 }, series: [], mocks: [], ready: false });

  useEffect(() => {
    const sync = () => {
      const r = readResults();
      setS({
        done: readDone(),
        meta: readMeta(),
        series: Object.entries(r.series).map(([k, v]) => `serie:${k}|${v.last.date}`),
        mocks: r.mocks.map((m) => m.date),
        ready: true,
      });
    };
    sync();
    window.addEventListener(PROGRESS_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener(PROGRESS_EVENT, sync); window.removeEventListener('storage', sync); };
  }, []);

  const seriesIds = s.series.map((x) => x.split('|')[0]);
  const isDone = useCallback(
    (id: string) => (id === 'examen-blanc' ? s.mocks.length > 0 : id.startsWith('serie:') ? seriesIds.includes(id) : s.done.includes(id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [s],
  );

  // Days with any activity: lessons and visits, series and mock exams taken.
  const days = new Set([
    ...s.meta.days,
    ...s.series.map((x) => x.split('|')[1]?.slice(0, 10)).filter(Boolean),
    ...s.mocks.map((d) => d.slice(0, 10)),
  ]);

  return { ready: s.ready, isDone, last: s.meta.last, goal: s.meta.goal, days };
}

/** Share of items done, as a whole percentage. */
export const percent = (items: CourseItem[], isDone: (id: string) => boolean) =>
  items.length ? Math.round((items.filter((it) => isDone(it.id)).length / items.length) * 100) : 0;
