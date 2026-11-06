/** Series numbers of the monthly mock exams and their month (YYYY-MM). */
export const MOCK_MONTHS: Record<number, string> = { 101: '2026-10' };

/** The other mock exams are named after cities of Canada and Cameroon, never by number. */
const CITY_NAMES: Record<number, string> = {
  1: 'Montréal', 2: 'Douala', 3: 'Québec', 4: 'Yaoundé', 5: 'Ottawa',
  6: 'Bafoussam', 7: 'Moncton', 8: 'Kribi', 9: 'Gatineau', 10: 'Limbé',
  11: 'Sherbrooke', 12: 'Garoua', 13: 'Winnipeg', 14: 'Bamenda', 15: 'Toronto',
};

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
export const monthLabel = (month: string) => {
  const [y, m] = month.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};

/** « Session d’octobre 2026 » or « Session Montréal ». */
export const mockName = (serie: number) => {
  const month = MOCK_MONTHS[serie];
  if (month) {
    const label = monthLabel(month);
    return `Session ${/^[ao]/.test(label) ? 'd’' : 'de '}${label}`;
  }
  return `Session ${CITY_NAMES[serie] ?? `spéciale ${serie}`}`;
};

/**
 * The next mock exam for a learner: chosen at random among the three most recent
 * exams they have not taken yet (the newest weighs the most). When every exam has
 * been taken, the one taken longest ago comes back.
 */
export function pickMock(order: number[], taken: Record<number, string>, exclude?: number): number | undefined {
  const pool = order.filter((n) => n !== exclude);
  const fresh = pool.filter((n) => !taken[n]);
  if (fresh.length === 0) return [...pool].sort((a, b) => Date.parse(taken[a]) - Date.parse(taken[b]))[0] ?? order[0];
  const top = fresh.slice(0, 3);
  const weights = top.map((_, i) => top.length - i);
  let r = Math.random() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < top.length; i++) { r -= weights[i]; if (r < 0) return top[i]; }
  return top[0];
}
