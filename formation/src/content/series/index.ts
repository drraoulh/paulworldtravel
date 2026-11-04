import { ce1 } from './ce-1';
import { ce2 } from './ce-2';
import { ce3 } from './ce-3';
import { ce4 } from './ce-4';
import { ce5 } from './ce-5';
import { ce6 } from './ce-6';
import { ce7 } from './ce-7';
import { ce8 } from './ce-8';
import { co1 } from './co-1';
import { co2 } from './co-2';
import { co3 } from './co-3';
import { co4 } from './co-4';
import { co5 } from './co-5';
import { co6 } from './co-6';
import type { Series } from './types';

export type { Series, SeriesQuestion, Level } from './types';
export { rightChoice } from './types';

export const allSeries: Series[] = [ce1, ce2, ce3, ce4, ce5, ce6, ce7, ce8, co1, co2, co3, co4, co5, co6];

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
