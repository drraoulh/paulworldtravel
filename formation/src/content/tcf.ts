// Facts about the TCF Canada exam, used across the site.

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
 * NCLC equivalence used by IRCC for the TCF Canada.
 * Check the official table on canada.ca before relying on it: IRCC can update it.
 */
export const nclcTable: { nclc: string; co: string; ce: string; ee: string; eo: string }[] = [
  { nclc: '10 et plus', co: '549 – 699', ce: '549 – 699', ee: '16 – 20', eo: '16 – 20' },
  { nclc: '9', co: '523 – 548', ce: '524 – 548', ee: '14 – 15', eo: '14 – 15' },
  { nclc: '8', co: '503 – 522', ce: '499 – 523', ee: '12 – 13', eo: '12 – 13' },
  { nclc: '7', co: '458 – 502', ce: '453 – 498', ee: '10 – 11', eo: '10 – 11' },
  { nclc: '6', co: '398 – 457', ce: '406 – 452', ee: '7 – 9', eo: '7 – 9' },
  { nclc: '5', co: '369 – 397', ce: '375 – 405', ee: '6', eo: '6' },
  { nclc: '4', co: '331 – 368', ce: '342 – 374', ee: '4 – 5', eo: '4 – 5' },
];
