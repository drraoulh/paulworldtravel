import { writingTasks, speakingTasks, type SpeakingTask, type WritingTask } from './expression';

/**
 * Writing and speaking subjects of the monthly mock exams, rewritten by the team from the
 * themes candidates reported that month. Keyed by the series number of the exam.
 */
const monthly: Record<number, { writing: WritingTask[]; speaking: SpeakingTask[] }> = {
  101: {
    writing: [
      {
        id: 'oct26-ee1-chateau',
        task: 1,
        title: 'Tâche 1 : un message',
        prompt: 'Vous vous mariez dans un château à la campagne. Votre ami(e), invité(e), vous écrit qu’il (elle) ne connaît pas ce lieu. Répondez-lui pour décrire le château et lui expliquer comment s’y rendre (situation, accès, transports, stationnement).',
        minWords: 60,
        maxWords: 120,
        minutes: 10,
      },
      {
        id: 'oct26-ee2-etranger',
        task: 2,
        title: 'Tâche 2 : un article',
        prompt: 'Un site de voyage pose la question : « Partir un an à l’étranger et tout quitter : bonne ou mauvaise idée ? » Donnez votre avis dans un commentaire, en vous appuyant sur votre expérience personnelle ou celle d’un proche.',
        minWords: 120,
        maxWords: 150,
        minutes: 20,
      },
      {
        id: 'oct26-ee3-colocation',
        task: 3,
        title: 'Tâche 3 : un texte argumenté',
        prompt: 'La colocation : une bonne solution pour se loger ? Présentez brièvement les deux points de vue ci-dessous, puis donnez votre opinion argumentée.',
        documents: [
          'Document 1 : « Partager un appartement permet de payer un loyer plus bas et de ne pas se sentir seul en arrivant dans une nouvelle ville. On se répartit les tâches, on cuisine ensemble, on apprend des autres. Pour un étudiant ou un nouvel arrivant, c’est souvent la meilleure façon de commencer. »',
          'Document 2 : « Vivre avec des inconnus demande beaucoup de compromis. Chacun a ses horaires, ses habitudes et sa conception du ménage. Le manque d’intimité pèse vite, et un seul conflit peut rendre la vie quotidienne difficile. À partir d’un certain âge, on a besoin de son propre espace. »',
        ],
        minWords: 120,
        maxWords: 180,
        minutes: 30,
      },
    ],
    speaking: [
      {
        id: 'oct26-eo1-presentation',
        task: 1,
        title: 'Tâche 1 : entretien dirigé',
        prompt: 'Présentez-vous : votre parcours, votre travail ou vos études, votre famille, vos loisirs et votre projet au Canada.',
        tips: ['Parlez de vous au présent, au passé et au futur.', 'Donnez des détails concrets plutôt qu’une liste.'],
        seconds: 120,
        mode: 'monologue',
      },
      {
        id: 'oct26-eo2-garde',
        task: 2,
        title: 'Tâche 2 : obtenir des informations',
        prompt: 'Je suis votre ami(e) canadien(ne). Vous venez de vous installer au Canada avec votre famille et vous cherchez une solution pour faire garder vos enfants. Vous me posez des questions sur les possibilités (types de garde, prix, inscription, horaires, etc.).',
        tips: [
          'Pendant les 2 minutes de préparation, notez les questions à poser.',
          'Expliquez d’abord votre situation : l’âge des enfants, vos horaires de travail.',
          'Réagissez aux réponses et demandez des précisions (« Et si… ? », « Combien de temps… ? »).',
        ],
        seconds: 210,
        mode: 'interaction',
        prepSeconds: 120,
        partner: {
          role: 'un(e) ami(e) canadien(ne) qui a deux enfants et connaît bien les services de garde',
          opening: 'Salut ! Alors, l’installation se passe bien ?',
          facts:
            'Il existe trois solutions principales. ' +
            'Les garderies subventionnées (CPE) : environ 9 $ par jour, mais il faut s’inscrire sur la liste d’attente en ligne dès l’arrivée, l’attente peut dépasser un an. ' +
            'Les garderies privées : entre 40 $ et 60 $ par jour, une partie est remboursée par un crédit d’impôt, places plus rapides. ' +
            'Les milieux familiaux (une personne qui garde quelques enfants chez elle) : 25 $ à 45 $ par jour, souvent plus souples sur les horaires. ' +
            'Horaires habituels : 7 h à 18 h, du lundi au vendredi. ' +
            'Pour les enfants d’âge scolaire, le service de garde de l’école accueille avant et après les cours, environ 10 $ par jour. ' +
            'Documents demandés : certificat de naissance, carnet de vaccination, preuve d’adresse. ' +
            'L’ami(e) a inscrit ses enfants dans un milieu familial de son quartier et en est très content(e).',
        },
      },
      {
        id: 'oct26-eo3-langue',
        task: 3,
        title: 'Tâche 3 : exprimer un point de vue',
        prompt: '« Pour bien s’intégrer dans un pays, il suffit d’en parler la langue. » Qu’en pensez-vous ? Donnez votre avis et justifiez-le avec des exemples.',
        tips: ['Annoncez clairement votre position.', 'Donnez au moins deux arguments illustrés, puis une nuance.'],
        seconds: 270,
        mode: 'monologue',
      },
    ],
  },
};

/** Shared by the browser and server so an exam credit only covers its six subjects. */
export const mockWritingTasks = (serie: number) => monthly[serie]?.writing ?? ([1, 2, 3] as const).map((n) => {
  const list = writingTasks.filter((t) => t.task === n);
  return list[(serie - 1) % list.length];
});
export const mockSpeakingTasks = (serie: number) => monthly[serie]?.speaking ?? ([1, 2, 3] as const).map((n) => {
  const list = speakingTasks.filter((t) => t.task === n);
  return list[(serie - 1) % list.length];
});
