// Original practice subjects for the TCF Canada expression tests (not official subjects).

export interface WritingTask {
  id: string;
  task: 1 | 2 | 3;
  title: string;
  prompt: string;
  documents?: string[];
  minWords: number;
  maxWords: number;
  minutes: number;
}

export const writingTasks: WritingTask[] = [
  {
    id: 'ee1-demenagement',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Vous venez d’emménager dans une nouvelle ville. Écrivez un message à un ami pour lui décrire votre logement et votre quartier, et l’inviter à venir vous voir.',
    minWords: 60,
    maxWords: 120,
    minutes: 10,
  },
  {
    id: 'ee1-cours',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Vous ne pourrez pas assister au cours de français de samedi. Écrivez un message à votre formateur pour vous excuser, expliquer la raison et demander comment rattraper la séance.',
    minWords: 60,
    maxWords: 120,
    minutes: 10,
  },
  {
    id: 'ee2-evenement',
    task: 2,
    title: 'Tâche 2 : un article',
    prompt: 'Le journal de votre quartier recherche des témoignages. Racontez un événement culturel ou sportif auquel vous avez participé récemment et dites ce que vous en avez pensé.',
    minWords: 120,
    maxWords: 150,
    minutes: 20,
  },
  {
    id: 'ee2-experience',
    task: 2,
    title: 'Tâche 2 : un récit',
    prompt: 'Sur un forum consacré à l’expatriation, racontez votre première expérience dans un pays ou une ville que vous ne connaissiez pas : ce qui vous a surpris, ce qui a été difficile et ce que vous en retenez.',
    minWords: 120,
    maxWords: 150,
    minutes: 20,
  },
  {
    id: 'ee3-teletravail',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Vous participez à un débat sur le travail à distance. Présentez brièvement les deux points de vue ci-dessous, puis donnez votre opinion argumentée.',
    documents: [
      'Document 1 : « Travailler de chez soi fait gagner du temps et réduit le stress des transports. Les salariés sont plus autonomes et souvent plus efficaces. »',
      'Document 2 : « Le télétravail isole. Sans contact avec les collègues, on perd la motivation et l’esprit d’équipe, et la frontière avec la vie privée disparaît. »',
    ],
    minWords: 120,
    maxWords: 180,
    minutes: 30,
  },
  {
    id: 'ee3-ecrans',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Un magazine de parents ouvre le débat : faut-il limiter le temps d’écran des enfants ? Présentez les deux opinions ci-dessous, puis donnez la vôtre avec des arguments.',
    documents: [
      'Document 1 : « Les écrans sont des outils d’apprentissage : vidéos éducatives, applications de langue, recherches pour l’école. Les interdire, c’est priver les enfants d’une ressource. »',
      'Document 2 : « Trop d’écran nuit au sommeil, à la concentration et aux relations familiales. Les enfants ont besoin de jouer dehors et de parler avec les autres. »',
    ],
    minWords: 120,
    maxWords: 180,
    minutes: 30,
  },
];

export interface SpeakingTask {
  id: string;
  task: 1 | 2 | 3;
  title: string;
  prompt: string;
  tips: string[];
  /** Maximum recording length, in seconds (official speaking time). */
  seconds: number;
}

export const speakingTasks: SpeakingTask[] = [
  {
    id: 'eo1-presentation',
    task: 1,
    title: 'Tâche 1 : entretien dirigé',
    prompt: 'Présentez-vous : votre parcours, votre travail ou vos études, votre famille, vos loisirs et votre projet au Canada.',
    tips: ['Parlez de vous au présent, au passé et au futur.', 'Donnez des détails concrets plutôt qu’une liste.'],
    seconds: 120,
  },
  {
    id: 'eo2-logement',
    task: 2,
    title: 'Tâche 2 : obtenir des informations',
    prompt: 'Vous voulez louer un appartement à Montréal. Vous appelez le propriétaire : posez-lui des questions sur le logement, le loyer, les charges, le quartier et la date de disponibilité.',
    tips: ['Saluez et présentez la raison de votre appel.', 'Variez les formes de questions (est-ce que, inversion, combien, quand…).'],
    seconds: 210,
  },
  {
    id: 'eo3-transport',
    task: 3,
    title: 'Tâche 3 : exprimer un point de vue',
    prompt: '« Dans les grandes villes, il faudrait interdire les voitures dans le centre. » Qu’en pensez-vous ? Donnez votre avis et justifiez-le avec des exemples.',
    tips: ['Annoncez clairement votre position.', 'Donnez au moins deux arguments illustrés, puis une nuance.'],
    seconds: 270,
  },
];

export const wordCount = (text: string) => (text.trim() ? text.trim().split(/\s+/u).length : 0);
