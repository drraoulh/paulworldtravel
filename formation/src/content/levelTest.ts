// Free placement test: 15 original questions, 3 per level, easiest first.
// The result is an estimate, not a TCF score.

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface Question {
  level: Level;
  text?: string; // short document to read before answering
  prompt: string;
  choices: string[];
  answer: number; // index in choices
  explanation: string;
}

export const questions: Question[] = [
  {
    level: 'A1',
    prompt: 'Je ___ étudiant à Douala.',
    choices: ['suis', 'es', 'est', 'sommes'],
    answer: 0,
    explanation: 'Avec « je », le verbe être se conjugue « suis ».',
  },
  {
    level: 'A1',
    prompt: 'Il est 8 h. Le cours commence à 8 h 30. Le cours commence…',
    choices: ['dans une demi-heure', 'il y a une heure', 'à midi', 'demain matin'],
    answer: 0,
    explanation: 'De 8 h à 8 h 30, il reste trente minutes, soit une demi-heure.',
  },
  {
    level: 'A1',
    prompt: 'Quel mot désigne un membre de la famille ?',
    choices: ['la table', 'la tante', 'la tasse', 'la tente'],
    answer: 1,
    explanation: 'La tante est la sœur du père ou de la mère.',
  },
  {
    level: 'A2',
    prompt: 'Hier, nous ___ au marché avec nos enfants.',
    choices: ['allons', 'irons', 'sommes allés', 'allions aller'],
    answer: 2,
    explanation: '« Hier » demande le passé composé : nous sommes allés.',
  },
  {
    level: 'A2',
    text: 'Pharmacie du Centre. Fermée le lundi. Ouverte du mardi au samedi de 9 h à 18 h.',
    prompt: 'Quand pouvez-vous aller à la pharmacie ?',
    choices: ['Le lundi à 10 h', 'Le mercredi à 10 h', 'Le samedi à 19 h', 'Le dimanche à 9 h'],
    answer: 1,
    explanation: 'Le mercredi est entre mardi et samedi, et 10 h est entre 9 h et 18 h.',
  },
  {
    level: 'A2',
    prompt: 'C’est la ville ___ je suis né.',
    choices: ['que', 'qui', 'dont', 'où'],
    answer: 3,
    explanation: '« Où » remplace un lieu : je suis né dans cette ville.',
  },
  {
    level: 'B1',
    prompt: 'Si j’avais plus de temps, j’___ le piano.',
    choices: ['apprendrai', 'apprendrais', 'apprends', 'appris'],
    answer: 1,
    explanation: '« Si » + imparfait est suivi du conditionnel présent : j’apprendrais.',
  },
  {
    level: 'B1',
    text: 'En raison de travaux, la ligne 2 sera interrompue entre les stations Centre et Gare du 3 au 10 juin. Un bus de remplacement circulera toutes les 10 minutes.',
    prompt: 'Le 5 juin, comment aller de Centre à Gare ?',
    choices: ['Prendre la ligne 2', 'Prendre le bus de remplacement', 'Attendre le 3 juin', 'Il n’y a aucune solution'],
    answer: 1,
    explanation: 'Le 5 juin est pendant les travaux : un bus remplace la ligne 2.',
  },
  {
    level: 'B1',
    prompt: 'Il faut que tu ___ ce dossier avant vendredi.',
    choices: ['finis', 'finiras', 'finisses', 'finirais'],
    answer: 2,
    explanation: '« Il faut que » est suivi du subjonctif : que tu finisses.',
  },
  {
    level: 'B2',
    prompt: 'Le match a eu lieu ___ la pluie.',
    choices: ['grâce à', 'malgré', 'à cause de', 'pendant que'],
    answer: 1,
    explanation: '« Malgré » introduit un obstacle qui n’a pas empêché l’action.',
  },
  {
    level: 'B2',
    text: 'Le télétravail, longtemps perçu comme un privilège, s’est imposé dans de nombreux secteurs. Pourtant, certains salariés regrettent la perte des échanges informels qui faisaient la richesse de la vie de bureau.',
    prompt: 'Que regrettent certains salariés ?',
    choices: ['Leur salaire', 'Les échanges spontanés avec leurs collègues', 'Le temps de transport', 'Le privilège du télétravail'],
    answer: 1,
    explanation: 'Les « échanges informels » sont les conversations spontanées entre collègues.',
  },
  {
    level: 'B2',
    prompt: 'Je regrette qu’il ___ partir si tôt.',
    choices: ['a dû', 'ait dû', 'doit', 'devra'],
    answer: 1,
    explanation: '« Regretter que » est suivi du subjonctif ; ici au passé : qu’il ait dû.',
  },
  {
    level: 'C1',
    prompt: 'Son argumentation, pourtant solidement ___, n’a convaincu personne.',
    choices: ['bâclée', 'lacunaire', 'étayée', 'confuse'],
    answer: 2,
    explanation: '« Pourtant » oppose une qualité au résultat : une argumentation étayée, donc bien appuyée.',
  },
  {
    level: 'C1',
    prompt: 'Quoi qu’il ___, nous maintiendrons la réunion.',
    choices: ['advient', 'adviendra', 'advienne', 'advenait'],
    answer: 2,
    explanation: '« Quoi que » est toujours suivi du subjonctif : quoi qu’il advienne.',
  },
  {
    level: 'C1',
    text: 'Loin de constituer une panacée, la numérisation des services publics risque, si l’on n’y prend garde, d’exclure les usagers les moins familiers des outils informatiques.',
    prompt: 'Selon l’auteur, la numérisation des services publics…',
    choices: ['règle tous les problèmes', 'ne présente aucun risque', 'peut écarter une partie des usagers', 'ne concerne que les jeunes'],
    answer: 2,
    explanation: 'Une « panacée » est un remède universel ; l’auteur dit justement qu’elle n’en est pas une et qu’elle peut exclure certains usagers.',
  },
];

/** Estimated level from the number of correct answers (out of 15). */
export function estimateLevel(correct: number): Level {
  if (correct >= 14) return 'C1';
  if (correct >= 11) return 'B2';
  if (correct >= 8) return 'B1';
  if (correct >= 5) return 'A2';
  return 'A1';
}

export const levelAdvice: Record<Level, string> = {
  A1: 'Vous débutez. Une préparation longue, avec des bases de grammaire et de vocabulaire, vous fera progresser vers le TCF.',
  A2: 'Vous avez des bases. Il faut renforcer la grammaire et la compréhension avant de viser un NCLC 5 ou 6.',
  B1: 'Vous êtes autonome au quotidien. Avec une méthode par épreuve, un NCLC 6 ou 7 est un objectif réaliste.',
  B2: 'Bon niveau. L’entraînement sur le format de l’examen peut vous mener au NCLC 7 ou 8.',
  C1: 'Très bon niveau. Travaillez la gestion du temps et l’expression pour viser le NCLC 9 ou plus.',
};
