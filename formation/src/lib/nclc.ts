/*
 * TCF Canada scores and NCLC levels. Pure functions, no imports, so that node's
 * test runner can load this file directly (tests/nclc.test.mjs).
 *
 * 1. The official IRCC equivalence: TCF Canada result → NCLC, for each skill.
 *    Source: IRCC language test equivalency charts (canada.ca), checked in
 *    November 2026. IRCC can change them: check canada.ca before relying on them.
 * 2. An ESTIMATE of the TCF score (100 to 699) from one of our practice series.
 *    France Éducation international does not publish the weight of each question.
 *    We use the per-level grid commonly used by preparation sites (A1 3 points,
 *    A2 9, B1 15, B2 21, C1 26, C2 33), which totals 699 for the distribution
 *    that grid assumes (39 questions: 4 A1, 6 A2, 9 B1, 10 B2, 6 C1, 4 C2). When a
 *    series has a slightly different distribution, the points are scaled so that
 *    a perfect series gives 699. The result is kept between 100 and 699.
 *    It is an indication, never an official score.
 */

export type Skill = 'co' | 'ce' | 'ee' | 'eo';
export type Cefr = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export const TCF_MIN = 100;
export const TCF_MAX = 699;

/** Points of a right answer, by level of the question. */
export const LEVEL_POINTS: Record<Cefr, number> = { A1: 3, A2: 9, B1: 15, B2: 21, C1: 26, C2: 33 };

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Estimated TCF score (100-699) from the answers of a series: one item per question. */
export function estimateTcfScore(items: { level: Cefr; correct: boolean }[]): number {
  let earned = 0;
  let possible = 0;
  for (const it of items) {
    const p = LEVEL_POINTS[it.level] ?? 0;
    possible += p;
    if (it.correct) earned += p;
  }
  if (!possible) return TCF_MIN;
  return clamp(Math.round((earned / possible) * TCF_MAX), TCF_MIN, TCF_MAX);
}

/** Average points of a question in each band, in the distribution of that grid (4/6, 9/10, 6/4). */
const BAND_POINTS: Record<string, number> = {
  'A1-A2': (4 * 3 + 6 * 9) / 10,
  'B1-B2': (9 * 15 + 10 * 21) / 19,
  'C1-C2': (6 * 26 + 4 * 33) / 10,
};

/** Same estimate from the results per band (for results saved before per-question levels were kept). */
export function estimateFromBands(bands: Record<string, [number, number]>): number {
  let earned = 0;
  let possible = 0;
  for (const [band, [ok, total]] of Object.entries(bands)) {
    const p = BAND_POINTS[band];
    if (p === undefined) continue;
    earned += ok * p;
    possible += total * p;
  }
  if (!possible) return TCF_MIN;
  return clamp(Math.round((earned / possible) * TCF_MAX), TCF_MIN, TCF_MAX);
}

type Range = [number, number];

/** IRCC table for the TCF Canada, from NCLC 10 down to NCLC 4. */
export const NCLC_TABLE: { nclc: number; co: Range; ce: Range; ee: Range; eo: Range }[] = [
  { nclc: 10, co: [549, 699], ce: [549, 699], ee: [16, 20], eo: [16, 20] },
  { nclc: 9, co: [523, 548], ce: [524, 548], ee: [14, 15], eo: [14, 15] },
  { nclc: 8, co: [503, 522], ce: [499, 523], ee: [12, 13], eo: [12, 13] },
  { nclc: 7, co: [458, 502], ce: [453, 498], ee: [10, 11], eo: [10, 11] },
  { nclc: 6, co: [398, 457], ce: [406, 452], ee: [7, 9], eo: [7, 9] },
  { nclc: 5, co: [369, 397], ce: [375, 405], ee: [6, 6], eo: [6, 6] },
  { nclc: 4, co: [331, 368], ce: [342, 374], ee: [4, 5], eo: [4, 5] },
];

/** Highest valid result of each skill. */
export const SKILL_MAX: Record<Skill, number> = { co: TCF_MAX, ce: TCF_MAX, ee: 20, eo: 20 };
export const SKILL_MIN: Record<Skill, number> = { co: TCF_MIN, ce: TCF_MIN, ee: 0, eo: 0 };

/**
 * NCLC level of a result, per the IRCC table: null below NCLC 4 (or for an invalid
 * result). Expression notes with a decimal (our AI estimates) are rounded down.
 */
export function nclcFor(skill: Skill, score: number): number | null {
  if (!Number.isFinite(score) || score < SKILL_MIN[skill] || score > SKILL_MAX[skill]) return null;
  const s = Math.floor(score);
  const row = NCLC_TABLE.find((r) => s >= r[skill][0] && s <= r[skill][1]);
  return row ? row.nclc : null;
}

/** Overall level: the lowest of the four skills (null if one is below NCLC 4). */
export function overallNclc(levels: (number | null)[]): number | null {
  if (!levels.length || levels.some((l) => l === null)) return null;
  return Math.min(...(levels as number[]));
}

/** « NCLC 7 », « NCLC 10 et plus » or « Inférieur au NCLC 4 ». */
export function nclcLabel(level: number | null): string {
  if (level === null) return 'Inférieur au NCLC 4';
  return level >= 10 ? 'NCLC 10 et plus' : `NCLC ${level}`;
}

/** CEFR level of a comprehension score on the TCF scale (France Éducation international). */
export function cefrForScore(score: number): Cefr | null {
  if (!Number.isFinite(score) || score < TCF_MIN) return null;
  const s = Math.min(TCF_MAX, Math.floor(score));
  return (['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const)[Math.floor(s / 100) - 1];
}

/** Indicative CEFR level of an NCLC level, as in the TCF Canada correspondence for the expression tests. */
export const NCLC_CEFR: Record<number, string> = { 4: 'A2', 5: 'B1', 6: 'B1', 7: 'B2', 8: 'B2', 9: 'C1', 10: 'C1-C2' };
