/*
 * Course progress as stored in the account (auth user metadata, key pwt_progress).
 * Pure functions only, so they can be tested with node's test runner.
 */
import type { MockResult, SeriesResult } from './results';

export const MAX_DAYS = 120;
export const MAX_MOCKS = 20;
export const MAX_DONE = 500;

export interface ProgressMeta { last?: { id: string; href: string; title: string }; days: string[]; goal?: number }
export interface SeriesEntry { last: SeriesResult; best: number; attempts: number }
export interface Progress {
  done: string[];
  meta: ProgressMeta;
  results: { series: Record<string, SeriesEntry>; mocks: MockResult[] };
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const strings = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);
const validGoal = (g: unknown): g is number => g === 3 || g === 5 || g === 7;
const time = (d: unknown) => { const t = typeof d === 'string' ? Date.parse(d) : NaN; return Number.isNaN(t) ? 0 : t; };
const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);

function cleanLast(v: unknown): ProgressMeta['last'] {
  if (!isObj(v) || typeof v.id !== 'string' || typeof v.href !== 'string' || typeof v.title !== 'string') return undefined;
  return { id: v.id, href: v.href, title: v.title };
}

/** Turns any stored value into a valid Progress (unknown parts are dropped). */
export function normalizeProgress(raw: unknown): Progress {
  const p = isObj(raw) ? raw : {};
  const meta = isObj(p.meta) ? p.meta : {};
  const results = isObj(p.results) ? p.results : {};
  const series: Record<string, SeriesEntry> = {};
  if (isObj(results.series)) {
    for (const [k, e] of Object.entries(results.series)) {
      if (isObj(e) && isObj(e.last) && typeof e.last.date === 'string') {
        series[k] = { last: e.last as unknown as SeriesResult, best: num(e.best), attempts: num(e.attempts) };
      }
    }
  }
  const mocks = Array.isArray(results.mocks)
    ? (results.mocks.filter((m) => isObj(m) && typeof m.date === 'string') as MockResult[])
    : [];
  const out: Progress = {
    done: strings(p.done),
    meta: { days: strings(meta.days) },
    results: { series, mocks },
  };
  const last = cleanLast(meta.last);
  if (last) out.meta.last = last;
  if (validGoal(meta.goal)) out.meta.goal = meta.goal;
  return compactProgress(out);
}

/** Removes duplicates and caps the arrays, to keep the account metadata small. */
export function compactProgress(p: Progress): Progress {
  const days = Array.from(new Set(p.meta.days)).sort().slice(-MAX_DAYS);
  const seen = new Set<string>();
  const mocks = [...p.results.mocks]
    .sort((a, b) => time(b.date) - time(a.date))
    .filter((m) => (seen.has(m.date) ? false : (seen.add(m.date), true)))
    .slice(0, MAX_MOCKS);
  const meta: ProgressMeta = { days };
  if (p.meta.last) meta.last = p.meta.last;
  if (validGoal(p.meta.goal)) meta.goal = p.meta.goal;
  return { done: Array.from(new Set(p.done)).slice(-MAX_DONE), meta, results: { series: p.results.series, mocks } };
}

function mergeSeries(a: SeriesEntry | undefined, b: SeriesEntry | undefined): SeriesEntry {
  if (!a) return b!;
  if (!b) return a;
  const newer = time(b.last.date) > time(a.last.date) ? b : a;
  return { last: newer.last, best: Math.max(a.best, b.best), attempts: Math.max(a.attempts, b.attempts) };
}

/** Merges local and remote progress. Nothing finished on either side is lost. */
export function mergeProgress(local: Progress, remote: Progress | null | undefined): Progress {
  if (!remote) return compactProgress(local);
  const series: Record<string, SeriesEntry> = {};
  for (const k of new Set([...Object.keys(local.results.series), ...Object.keys(remote.results.series)])) {
    series[k] = mergeSeries(local.results.series[k], remote.results.series[k]);
  }
  return compactProgress({
    done: [...local.done, ...remote.done],
    meta: {
      last: local.meta.last ?? remote.meta.last,
      days: [...local.meta.days, ...remote.meta.days],
      goal: validGoal(remote.meta.goal) ? remote.meta.goal : local.meta.goal,
    },
    results: { series, mocks: [...local.results.mocks, ...remote.results.mocks] },
  });
}
