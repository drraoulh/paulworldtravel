/*
 * Every series: the team's own (index.ts) plus the licensed ones. Server side only:
 * the licensed files weigh several megabytes and must not reach the browser bundle
 * (client components import './index' and receive the questions they need as props).
 */
import { allSeries as teamSeries } from './index';
import type { Series } from './types';
import ce from './licence/ce.json';
import co from './licence/co.json';

/** Licensed from TCF Canada Ltd (contract of 23 October 2026): CE 25 to 68, CO 11 to 53. */
export const licensedSeries = [...ce, ...co] as Series[];

export const allSeries: Series[] = [...teamSeries, ...licensedSeries];

/** Training series (monthly mock exams are left out), in number order. */
export const seriesFor = (epreuve: 'ce' | 'co') => allSeries.filter((s) => s.epreuve === epreuve && !s.month).sort((a, b) => a.number - b.number);
export const getSeries = (epreuve: 'ce' | 'co', number: number) => allSeries.find((s) => s.epreuve === epreuve && s.number === number);
