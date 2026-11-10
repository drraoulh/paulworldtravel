import type { Combinaison } from '@/lib/combinaisons';
import licensed from './licence/combinaisons.json';

/** Session sets under the TCF Canada Ltd licence (contract of 23 October 2026), 2024 to 2026, newest first. */
export const sessionCombinaisons = licensed as Combinaison[];

export const getSessionCombinaison = (id: string) => sessionCombinaisons.find((x) => x.id === id) ?? null;
