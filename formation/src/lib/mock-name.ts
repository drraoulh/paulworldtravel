/** « Examen blanc n° 7 ». */
export const mockName = (serie: number) => `Examen blanc n° ${serie}`;

/**
 * The next mock exam for a learner: chosen at random among the three first exams
 * they have not taken yet (the first weighs the most). When every exam has been
 * taken, the one taken longest ago comes back.
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
