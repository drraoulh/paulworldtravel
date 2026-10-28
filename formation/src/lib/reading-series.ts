import { readingQuestions } from '../content/reading.ts';
import { extraReadingQuestions, type ReadingLevel, type ReadingQuestion } from '../content/reading-extra.ts';
import { enrichedReadingQuestions } from '../content/reading-enriched.ts';
export const readingBank: readonly ReadingQuestion[] = [...readingQuestions, ...extraReadingQuestions, ...enrichedReadingQuestions];
export const READING_BLUEPRINT: readonly [ReadingLevel, number][] = [['A1',4],['A2',6],['B1',9],['B2',10],['C1',6],['C2',4]];
export const READING_BANK_VERSION = '2026-10-28-v2';
export const FULL_READING_SECONDS = 60 * 60;
function randomFrom(seed: string) {
  let state = 2166136261;
  for (const char of seed) state = Math.imul(state ^ char.charCodeAt(0), 16777619);
  return () => { state += 0x6D2B79F5; let t = Math.imul(state ^ state >>> 15, 1 | state); t ^= t + Math.imul(t ^ t >>> 7, 61 | t); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
}
/** A month identifies an original practice selection, never a past official exam. */
export function buildReadingSeries(month: string, variant: number): ReadingQuestion[] {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month) || !Number.isInteger(variant) || variant < 1 || variant > 3) throw new Error('Série invalide');
  const random = randomFrom(`${READING_BANK_VERSION}:${month}:${variant}`);
  return READING_BLUEPRINT.flatMap(([level, count]) => {
    const pool = readingBank.filter(q => q.level === level);
    if (pool.length < count) throw new Error(`Banque insuffisante pour ${level}`);
    return shuffle(pool, random).slice(0,count).map(q => {
      const order = shuffle([0,1,2,3], random);
      return { ...q, choices: order.map(i => q.choices[i]), answer: order.indexOf(q.answer) };
    });
  });
}
