'use client';

/*
 * Practice results kept in this browser only (a convenience for the dashboard).
 * Corrections by the AI are stored in the candidate's account instead.
 */
const KEY = 'pwt-results';

export interface SeriesResult { score: number; total: number; mode: 'exam' | 'training'; date: string; bands: Record<string, [number, number]>; /** Estimated TCF score (100-699), see src/lib/nclc.ts. */ tcf?: number }
/**
 * A mock exam, saved as soon as each test is finished: `date` is when it started
 * (it identifies the exam), `done` lists the tests already taken, `tcfCo` and
 * `tcfCe` are the estimated scores out of 699, `ee` and `eo` the AI marks out of 20.
 */
export interface MockResult {
  serie: number; co: number; ce: number; total: number; date: string;
  done?: ('co' | 'ce' | 'ee' | 'eo')[]; tcfCo?: number; tcfCe?: number; ee?: number | null; eo?: number | null; updated?: string;
}
interface Store { series: Record<string, { last: SeriesResult; best: number; attempts: number }>; mocks: MockResult[] }

export function readResults(): Store {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (s && typeof s === 'object') return { series: s.series ?? {}, mocks: Array.isArray(s.mocks) ? s.mocks : [] };
  } catch { /* ignore */ }
  return { series: {}, mocks: [] };
}

function write(store: Store) {
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* storage is optional */ }
  // Lets the learning path update its progress.
  window.dispatchEvent(new Event('pwt-parcours-change'));
}

export const seriesKey = (epreuve: 'ce' | 'co', number: number) => `${epreuve}-${number}`;

export function saveSeriesResult(key: string, result: SeriesResult) {
  const store = readResults();
  const prev = store.series[key];
  store.series[key] = { last: result, best: Math.max(prev?.best ?? 0, result.score), attempts: (prev?.attempts ?? 0) + 1 };
  write(store);
}

/** Adds the mock exam, or updates it if it was already saved (same start date). */
export function saveMockResult(result: MockResult) {
  const store = readResults();
  const rest = store.mocks.filter((m) => m.date !== result.date);
  store.mocks = [{ ...result, updated: new Date().toISOString() }, ...rest].slice(0, 20);
  write(store);
}
