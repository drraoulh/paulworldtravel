import type { Article } from './types';

export const planning30Jours: Article = {
  slug: 'preparation-tcf-canada-planning-30-jours',
  title: 'Combien de temps pour se préparer au TCF Canada ? Notre planning de 30 jours',
  description: 'Comment estimer votre temps de préparation selon l’écart avec le NCLC visé, puis un planning jour par jour sur quatre semaines pour les candidats déjà proches de l’objectif.',
  category: 'Organisation',
  published: '2026-11-05',
  image: { src: '/images/classe.jpg', alt: 'Un groupe d’apprenants en cours de français' },
  lead: 'Il n’existe pas de durée universelle : tout dépend de votre niveau de départ, du NCLC visé et du temps que vous pouvez y consacrer chaque jour. Voici comment estimer votre propre délai, puis un planning de 30 jours pour celles et ceux qui sont déjà proches de leur objectif.',
  blocks: [
    { type: 'h2', id: 'estimer', text: 'Estimer son temps de préparation' },
    { type: 'p', text: 'Trois questions suffisent pour vous situer :' },
    { type: 'ol', items: [
      '**Où en êtes-vous ?** Faites le [test de niveau gratuit](/test-de-niveau/), puis une série chronométrée en [compréhension orale](/epreuve/comprehension-orale/series/) et en [compréhension écrite](/epreuve/comprehension-ecrite/series/), et une rédaction dans le [simulateur](/epreuve/expression-ecrite/simulateur/). Vous obtenez une estimation pour chaque compétence.',
      '**Où devez-vous aller ?** Notez le NCLC exigé par votre programme et celui qui rendrait votre profil compétitif. Le [barème](/blog/niveaux-nclc-bareme-tcf-canada/) traduit ce niveau en scores.',
      '**Combien de temps avez-vous par jour ?** Une heure régulière vaut mieux que cinq heures le week-end.',
    ] },
    { type: 'table', caption: 'Des repères, pas des promesses : chaque parcours est différent', head: ['Votre situation', 'Préparation à envisager'], rows: [
      ['Vos estimations atteignent déjà le NCLC visé partout, ou presque', 'Environ un mois pour maîtriser le format et sécuriser une marge : le planning ci-dessous'],
      ['Une ou deux compétences sont un niveau en dessous', 'Plusieurs semaines supplémentaires ciblées sur ces compétences, avant le planning final de 30 jours'],
      ['Vous êtes à plus d’un niveau de l’objectif dans plusieurs compétences', 'Plusieurs mois : travaillez d’abord la langue (grammaire, vocabulaire, écoute quotidienne), puis passez à la préparation spécifique'],
    ] },
    { type: 'callout', tone: 'warning', text: 'Ne réservez pas votre examen avant d’avoir une estimation honnête de votre niveau. Avec des résultats valables deux ans, des places limitées et un délai de 20 jours entre deux passations, un examen passé trop tôt coûte du temps et de l’argent.' },

    { type: 'h2', id: 'principes', text: 'Les principes du planning' },
    { type: 'ul', items: [
      '**Environ 1 h 30 par jour**, six jours sur sept. Le septième jour, repos ou simple écoute de radio.',
      '**Chaque jour un peu de tout**, avec une compétence principale : on progresse mieux en variant.',
      '**Des conditions réelles** dès la première semaine : chronomètre, une seule écoute, pas de dictionnaire.',
      '**L’analyse des erreurs** prend autant de temps que l’exercice lui-même. C’est là qu’on progresse.',
      '**La compétence la plus faible reçoit plus de temps** : c’est elle qui fixe votre NCLC.',
    ] },

    { type: 'h2', id: 'semaine-1', text: 'Semaine 1 : faire le point et apprendre le format' },
    { type: 'table', head: ['Jour', 'Programme'], rows: [
      ['1', 'Test de niveau. Lecture du [guide complet](/blog/tcf-canada-guide-complet-2026/). Définir son objectif en scores.'],
      ['2', 'Série de compréhension orale en conditions d’examen (35 min), puis analyse des erreurs.'],
      ['3', 'Série de compréhension écrite chronométrée (60 min), puis analyse des erreurs.'],
      ['4', 'Expression écrite : apprendre la structure des trois tâches avec les [modèles de réponses](/modeles-de-reponses/), rédiger une tâche 1.'],
      ['5', 'Expression orale : préparer sa présentation (tâche 1), s’enregistrer, réécouter.'],
      ['6', 'Leçons de méthode de l’épreuve la plus faible, avec leurs quiz.'],
      ['7', 'Repos actif : 20 minutes de radio ou de podcast francophone.'],
    ] },

    { type: 'h2', id: 'semaine-2', text: 'Semaine 2 : la méthode, épreuve par épreuve' },
    { type: 'table', head: ['Jour', 'Programme'], rows: [
      ['8', 'Méthode de la [compréhension orale](/blog/reussir-comprehension-orale-tcf-canada/) : anticipation, reformulations. Exercices en mode entraînement.'],
      ['9', 'Expression écrite, tâche 2 : un récit au passé de 120 à 150 mots, corrigé par le simulateur.'],
      ['10', 'Méthode de la [compréhension écrite](/blog/reussir-comprehension-ecrite-tcf-canada/) : gestion du temps, élimination. Demi-série chronométrée.'],
      ['11', 'Expression orale, tâche 2 : préparer des questions sur trois situations (logement, cours, voyage) et s’entraîner avec l’interlocuteur IA.'],
      ['12', 'Expression écrite, tâche 3 : une synthèse et une opinion, en 30 minutes.'],
      ['13', 'Série complète dans la compétence la plus faible, puis analyse.'],
      ['14', 'Repos actif. Relire son carnet de vocabulaire.'],
    ] },

    { type: 'h2', id: 'semaine-3', text: 'Semaine 3 : l’entraînement intensif' },
    { type: 'table', head: ['Jour', 'Programme'], rows: [
      ['15', 'Série complète de compréhension orale. Classer chaque erreur (vocabulaire, chiffre, piège, inattention).'],
      ['16', 'Les trois tâches d’expression écrite d’affilée, en 60 minutes.'],
      ['17', 'Série complète de compréhension écrite.'],
      ['18', 'Expression orale, tâche 3 : deux sujets de point de vue, 4 min 30 chacun, enregistrés.'],
      ['19', 'Reprendre les erreurs de la semaine : refaire les questions ratées, réécrire un texte corrigé.'],
      ['20', '[Examen blanc complet](/examen-blanc/) : les quatre épreuves dans l’ordre officiel.'],
      ['21', 'Repos. Lire le bilan de l’examen blanc et ajuster la dernière semaine.'],
    ] },

    { type: 'h2', id: 'semaine-4', text: 'Semaine 4 : consolider et arriver serein' },
    { type: 'table', head: ['Jour', 'Programme'], rows: [
      ['22', 'Travail ciblé sur la compétence la plus faible révélée par l’examen blanc.'],
      ['23', 'Expression écrite : deux tâches 3 sur des sujets nouveaux.'],
      ['24', 'Expression orale : simulation complète des trois tâches avec un partenaire ou le simulateur.'],
      ['25', 'Une série d’écoute et une série de lecture, en conditions réelles.'],
      ['26', 'Relire les connecteurs, les formules de politesse et ses erreurs récurrentes.'],
      ['27', 'Dernière simulation orale et dernière rédaction, sans chercher à apprendre du nouveau.'],
      ['28 à 30', 'Allègement : écoute légère, sommeil, vérification de la convocation, de la pièce d’identité et du trajet vers le centre.'],
    ] },

    { type: 'h2', id: 'moins-de-30-jours', text: 'Moins de 30 jours devant vous ?' },
    { type: 'p', text: 'Si votre examen est dans deux semaines, ne cherchez pas à tout faire. Gardez trois priorités : **connaître le format** de chaque épreuve pour ne perdre aucun point par surprise, **apprendre les structures** des six tâches d’expression, qui rapportent vite, et faire **au moins un examen blanc** complet. Supprimez les leçons de grammaire générale et concentrez-vous sur la compétence la plus éloignée de votre objectif.' },
    { type: 'p', text: 'À l’inverse, si vous avez plus de temps, étalez ce planning sur six à huit semaines en doublant les semaines 2 et 3 : l’entraînement régulier et l’analyse des erreurs comptent davantage que l’intensité.' },
    { type: 'h2', id: 'veille', text: 'La veille et le jour J' },
    { type: 'ul', items: [
      'Préparez la veille votre convocation et la pièce d’identité utilisée à l’inscription.',
      'Repérez le trajet et prévoyez d’arriver en avance : les retardataires peuvent être refusés.',
      'Si vous passez le test sur ordinateur, renseignez-vous sur le clavier utilisé (AZERTY ou QWERTY).',
      'Prenez de l’eau et un en-cas : l’épreuve dure près de trois heures, attente comprise.',
    ] },
    { type: 'p', text: 'Vous préférez être accompagné ? Les [packs](/packs/) débloquent toutes les séries, les examens blancs et des corrections quotidiennes, et certains incluent des cours avec un formateur et un suivi personnalisé.' },
  ],
  sources: [
    { label: 'France Éducation international : TCF Canada (format, délai entre deux passations)', href: 'https://www.france-education-international.fr/test/tcf-canada' },
    { label: 'IRCC : Entrée express, résultats d’examen linguistique', href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html' },
  ],
  related: ['tcf-canada-guide-complet-2026', 'reussir-comprehension-orale-tcf-canada', 'expression-ecrite-tcf-canada-3-taches'],
};
