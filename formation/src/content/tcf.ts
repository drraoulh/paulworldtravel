// Facts about the TCF Canada exam, used across the site.
import { NCLC_CEFR, NCLC_TABLE, nclcFor, nclcLabel } from '@/lib/nclc';

export type EpreuveId = 'co' | 'ce' | 'ee' | 'eo';

export interface Epreuve {
  id: EpreuveId;
  name: string;
  short: string;
  minutes: number;
  format: string;
  scale: string;
  what: string;
  how: string;
}

export const epreuves: Epreuve[] = [
  {
    id: 'co',
    name: 'Compréhension orale',
    short: 'Écouter',
    minutes: 35,
    format: '39 questions à choix multiple',
    scale: 'Score de 100 à 699',
    what: 'Comprendre des conversations, des annonces, des messages et des interviews, du plus simple au plus complexe.',
    how: 'Écoutes chronométrées sur tous les accents, puis correction expliquée question par question.',
  },
  {
    id: 'ce',
    name: 'Compréhension écrite',
    short: 'Lire',
    minutes: 60,
    format: '39 questions à choix multiple',
    scale: 'Score de 100 à 699',
    what: 'Lire des documents du quotidien, des articles et des textes argumentés, et en tirer l’information demandée.',
    how: 'Méthode de lecture rapide, pièges fréquents, séries de questions par niveau.',
  },
  {
    id: 'ee',
    name: 'Expression écrite',
    short: 'Écrire',
    minutes: 60,
    format: '3 tâches de rédaction',
    scale: 'Note de 0 à 20',
    what: 'Écrire un message court, un article ou un récit, puis un texte argumenté à partir de deux documents.',
    how: 'Modèles de plans, rédactions corrigées par un formateur avec la grille officielle.',
  },
  {
    id: 'eo',
    name: 'Expression orale',
    short: 'Parler',
    minutes: 12,
    format: '3 tâches face à un examinateur',
    scale: 'Note de 0 à 20',
    what: 'Se présenter, obtenir des informations dans une situation donnée, puis défendre un point de vue.',
    how: 'Simulations d’entretien, enregistrements réécoutés et commentés avec vous.',
  },
];

export const totalMinutes = epreuves.reduce((sum, e) => sum + e.minutes, 0);

/*
 * NCLC equivalence used by IRCC for the TCF Canada, read from src/lib/nclc.ts.
 * Check the official table on canada.ca before relying on it: IRCC can update it.
 */
const range = ([a, b]: [number, number]) => (a === b ? String(a) : `${a} – ${b}`);
export const nclcTable: { nclc: string; co: string; ce: string; ee: string; eo: string }[] = NCLC_TABLE.map((r) => ({
  nclc: r.nclc === 10 ? '10 et plus' : String(r.nclc),
  co: range(r.co), ce: range(r.ce), ee: range(r.ee), eo: range(r.eo),
}));

/**
 * NCLC and CEFR level matching an expression note out of 20, per the official table.
 * The AI never picks the NCLC: it is always read from this table.
 */
export function expressionBand(score: number) {
  const level = nclcFor('ee', score);
  return level === null
    ? { nclc: nclcLabel(null), cecr: 'Inférieur à A2' }
    : { nclc: nclcLabel(level), cecr: NCLC_CEFR[level] };
}
