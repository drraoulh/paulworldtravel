/*
 * Types and constants of the series, safe to import from the browser.
 * The series themselves weigh several megabytes: they live in './catalog',
 * which only server code may import.
 */
export type { Series, SeriesQuestion, Level } from './types';
export { rightChoice } from './types';

/** Official durations of the full test, in seconds. */
export const SERIES_SECONDS = { ce: 60 * 60, co: 35 * 60 } as const;

/** Level bands used to show where points were lost. */
export const BANDS = [
  { label: 'A1-A2', levels: ['A1', 'A2'] },
  { label: 'B1-B2', levels: ['B1', 'B2'] },
  { label: 'C1-C2', levels: ['C1', 'C2'] },
] as const;
