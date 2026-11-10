/*
 * The series, licensed from TCF Canada Ltd (contract of 23 October 2026):
 * 44 reading series and 43 listening series of 39 questions.
 * Server side only: these files weigh several megabytes and must not reach the
 * browser bundle (client components receive the questions they need as props).
 */
import 'server-only';
import type { Series } from './types';
import ce from './licence/ce.json';
import co from './licence/co.json';

export const allSeries = [...ce, ...co] as Series[];

export const seriesFor = (epreuve: 'ce' | 'co') => allSeries.filter((s) => s.epreuve === epreuve).sort((a, b) => a.number - b.number);
export const getSeries = (epreuve: 'ce' | 'co', number: number) => allSeries.find((s) => s.epreuve === epreuve && s.number === number);

/** A mock exam pairs the listening and the reading series of the same number. */
export const mockNumbers = () => {
  const ce = new Set(seriesFor('ce').map((s) => s.number));
  return seriesFor('co').map((s) => s.number).filter((n) => ce.has(n));
};
