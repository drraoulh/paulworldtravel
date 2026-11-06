/** Series numbers of the monthly mock exams and their month (YYYY-MM). */
export const MOCK_MONTHS: Record<number, string> = { 101: '2026-10' };

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
export const monthLabel = (month: string) => {
  const [y, m] = month.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};

/** « Examen blanc 3 » or « Examen blanc d’octobre 2026 ». */
export const mockName = (serie: number) => {
  const month = MOCK_MONTHS[serie];
  if (!month) return `Examen blanc ${serie}`;
  const label = monthLabel(month);
  return `Examen blanc ${/^[ao]/.test(label) ? 'd’' : 'de '}${label}`;
};
