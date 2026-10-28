'use client';

/*
 * Practice results kept in this browser only (a convenience for the dashboard).
 * Corrections by the AI are stored in the candidate's account instead.
 */
const KEY = 'pwt-results';

export interface SeriesResult { score: number; total: number; mode: 'exam' | 'training'; date: string; bands: Record<string, [number, number]> }
export interface MockResult { serie: number; co: number; ce: number; total: number; date: string }
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
}

export const seriesKey = (epreuve: 'ce' | 'co', number: number) => `${epreuve}-${number}`;

export function saveSeriesResult(key: string, result: SeriesResult) {
  const store = readResults();
  const prev = store.series[key];
  store.series[key] = { last: result, best: Math.max(prev?.best ?? 0, result.score), attempts: (prev?.attempts ?? 0) + 1 };
  write(store);
}

export function saveMockResult(result: MockResult) {
  const store = readResults();
  store.mocks = [result, ...store.mocks].slice(0, 20);
  write(store);
}
