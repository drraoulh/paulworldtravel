import { ce1 } from './ce-1';
import { ce2 } from './ce-2';
import { co1 } from './co-1';
import { co2 } from './co-2';
import type { Series } from './types';

export type { Series, SeriesQuestion, Level } from './types';

export const allSeries: Series[] = [ce1, ce2, co1, co2];

export const seriesFor = (epreuve: 'ce' | 'co') => allSeries.filter((s) => s.epreuve === epreuve);
export const getSeries = (epreuve: 'ce' | 'co', number: number) => allSeries.find((s) => s.epreuve === epreuve && s.number === number);

/** Official durations of the full test, in seconds. */
export const SERIES_SECONDS = { ce: 60 * 60, co: 35 * 60 } as const;

/** Level bands used to show where points were lost. */
export const BANDS = [
  { label: 'A1-A2', levels: ['A1', 'A2'] },
  { label: 'B1-B2', levels: ['B1', 'B2'] },
  { label: 'C1-C2', levels: ['C1', 'C2'] },
] as const;
