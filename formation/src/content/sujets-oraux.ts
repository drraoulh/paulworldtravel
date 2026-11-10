import licensed from './licence/sujets-oraux.json';

/**
 * Speaking subjects of the exam sessions, month by month (tasks 2 and 3), under the
 * TCF Canada Ltd licence (contract of 23 October 2026), 2023 to 2026, newest first.
 * c2 and c3: sample answer of each subject, same order as t2 and t3 ('' when none).
 */
export interface OralMonth { year: number; month: number; t2: string[]; t3: string[]; c2?: string[]; c3?: string[] }

export const oralMonths = licensed as OralMonth[];

export const getOralMonth = (year: number, month: number) => oralMonths.find((m) => m.year === year && m.month === month);
