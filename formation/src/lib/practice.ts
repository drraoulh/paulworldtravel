export type PracticeMode = 'practice' | 'timed';
export const PRACTICE_DURATION_SECONDS = 8 * 60;

export function gradeAnswers(questions: readonly { answer: number }[], answers: readonly (number | null)[]) {
  return {
    correct: questions.reduce((score, q, i) => score + (answers[i] === q.answer ? 1 : 0), 0),
    total: questions.length,
    answered: questions.reduce((count, _, i) => count + (Number.isInteger(answers[i]) && (answers[i] as number) >= 0 ? 1 : 0), 0),
  };
}

export function remainingSeconds(deadline: number, now: number) {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}

export function isValidEndDate(value: string, today: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value && value >= today;
}
