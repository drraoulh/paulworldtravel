import type { Article } from './types';

export const tcfOuTef: Article = {
  slug: 'tcf-canada-ou-tef-canada',
  title: 'TCF Canada ou TEF Canada : lequel choisir ?',
  description: 'Les deux tests sont acceptés par IRCC. Format, durée, type de tâches, délai entre deux passages, prix et disponibilité des places : une comparaison pour choisir selon votre profil.',
  category: 'L’examen',
  published: '2026-11-05',
  image: { src: '/images/classroom.jpg', alt: 'Une salle de classe avec des tables alignées' },
  lead: 'Pour prouver votre français auprès d’IRCC, vous avez le choix entre deux tests : le TCF Canada et le TEF Canada. Aucun n’est « plus facile » par nature, et IRCC ne favorise ni l’un ni l’autre. Le bon choix dépend surtout de votre façon de travailler et des places disponibles près de chez vous.',
  blocks: [
    { type: 'h2', id: 'points-communs', text: 'Ce qu’ils ont en commun' },
    { type: 'ul', items: [
      'Les deux sont **approuvés par IRCC** pour Entrée express, les autres programmes économiques fédéraux et la citoyenneté, selon la [page d’IRCC sur les examens linguistiques](https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html).',
      'Les deux évaluent les **quatre compétences** : compréhension de l’oral, compréhension de l’écrit, expression orale et expression écrite.',
      'Les deux donnent des résultats convertis en **NCLC** par IRCC, avec la même exigence de validité : **moins de deux ans**.',
      'Les deux se passent en centre agréé, avec une expression orale en face à face.',
    ] },

    { type: 'h2', id: 'qui', text: 'Qui les organise ?' },
    { type: 'p', text: 'Le **TCF Canada** est conçu par **France Éducation international**, un établissement public français. Le **TEF Canada** est conçu par **Le français des affaires**, un service de la Chambre de commerce et d’industrie de Paris Île-de-France ; il est reconnu par IRCC depuis 2002. Chacun a son propre réseau de centres, parfois les mêmes établissements (beaucoup d’Instituts et d’Alliances françaises proposent les deux).' },

    { type: 'h2', id: 'format', text: 'Le format, épreuve par épreuve' },
    { type: 'table', caption: 'D’après les pages officielles de France Éducation international et du Français des affaires', head: ['Épreuve', 'TCF Canada', 'TEF Canada'], rows: [
      ['Compréhension orale', '39 questions, 35 min', '40 questions, 40 min'],
      ['Compréhension écrite', '39 questions, 60 min', '40 questions, 60 min'],
      ['Expression écrite', '3 tâches en 60 min : message, récit, comparaison de deux points de vue', '2 sections en 60 min : suite d’un article (25 min, 80 mots minimum), puis un texte argumenté (35 min)'],
      ['Expression orale', '3 tâches en 12 min, dont 2 de préparation : entretien, interaction, point de vue', '2 sections en 15 min : obtenir des renseignements (5 min), argumenter pour convaincre (10 min)'],
      ['Durée totale', '2 h 47', 'Environ 2 h 55'],
    ] },

    { type: 'h2', id: 'differences', text: 'Les vraies différences pour un candidat' },
    { type: 'h3', text: 'L’expression écrite : trois textes courts ou deux textes plus longs' },
    { type: 'p', text: 'Au TCF, vous écrivez trois textes de 60 à 180 mots, de nature différente. Au TEF, deux textes, dont le second est un véritable argumentaire plus long. Si vous êtes à l’aise pour développer une argumentation sur la durée, le format TEF peut vous convenir ; si vous préférez des tâches courtes et bien cadrées, le TCF est souvent plus confortable.' },
    { type: 'h3', text: 'L’expression orale : trois temps ou deux' },
    { type: 'p', text: 'Le TCF commence par un entretien sur vous, une tâche très prévisible qui met en confiance. Le TEF entre directement dans le jeu de rôle (obtenir des renseignements), puis demande de **convaincre** l’examinateur pendant dix minutes. Les deux tests ont donc une tâche d’interaction et une tâche d’argumentation, mais dans des proportions différentes.' },
    { type: 'h3', text: 'La compréhension : très proche' },
    { type: 'p', text: 'Dans les deux cas, ce sont des questions à choix multiple de difficulté croissante, avec une seule écoute à l’oral. Une bonne préparation pour l’un sert largement pour l’autre.' },

    { type: 'h2', id: 'pratique', text: 'Les critères pratiques' },
    { type: 'ul', items: [
      '**Les places disponibles.** C’est souvent le critère décisif : prenez le test dont la prochaine session utile est proche de chez vous.',
      '**Le délai entre deux passages.** Au TCF Canada, France Éducation international impose 20 jours entre deux passations. Le TEF a aussi un délai minimum entre deux passages, fixé par Le français des affaires : vérifiez-le avant de planifier un éventuel deuxième essai.',
      '**Le prix.** Il dépend du centre. Au Cameroun, la grille de l’Institut français affiche par exemple le même montant pour le TCF Canada et pour le TEF Canada : 210 000 FCFA.',
      '**Le support.** Selon les centres, les épreuves se passent sur papier ou sur ordinateur. Au TEF Canada, Le français des affaires indique que les compréhensions et l’expression écrite se déroulent sur ordinateur ; le TCF existe en version papier ou ordinateur selon le centre.',
    ] },

    { type: 'h2', id: 'choisir', text: 'Alors, lequel choisir ?' },
    { type: 'table', head: ['Votre profil', 'Piste'], rows: [
      ['Vous aimez les consignes courtes et précises, vous écrivez vite mais pas très long', 'TCF Canada'],
      ['Vous êtes à l’aise pour argumenter longuement, à l’écrit comme à l’oral', 'TEF Canada'],
      ['L’entretien sur vous-même vous rassure avant d’argumenter', 'TCF Canada'],
      ['Une session de l’un des deux tests est disponible bien plus tôt près de chez vous', 'Celui-là, en adaptant votre préparation'],
    ] },
    { type: 'p', text: 'Évitez en revanche de choisir sur la foi d’une rumeur (« le TEF est plus facile », « le TCF note plus sévèrement ») : aucune donnée officielle ne permet de l’affirmer. Choisissez un test, apprenez **son** format, et entraînez-vous sur **ses** tâches.' },
    { type: 'h2', id: 'questions', text: 'Questions fréquentes' },
    { type: 'h3', text: 'Peut-on préparer les deux tests en même temps ?' },
    { type: 'p', text: 'C’est possible pour les compréhensions, très proches, mais déconseillé pour les expressions : les tâches, les durées et les longueurs diffèrent. Mieux vaut choisir un test, automatiser ses structures, puis basculer vers l’autre seulement si une session plus proche se libère.' },
    { type: 'h3', text: 'Un bon score à l’un garantit-il le même score à l’autre ?' },
    { type: 'p', text: 'Non. Votre niveau de français reste le même, mais la familiarité avec le format pèse beaucoup le jour J. Un candidat qui change de test au dernier moment perd souvent ses repères de temps, surtout en expression écrite.' },
    { type: 'h3', text: 'Les deux tests sont-ils acceptés pour la citoyenneté ?' },
    { type: 'p', text: 'Oui : le [centre d’aide d’IRCC](https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=572) cite le TCF et le TEF Canada parmi les tests acceptés comme preuve de connaissance du français pour la citoyenneté. Vérifiez la version exacte demandée sur canada.ca avant de vous inscrire.' },
    { type: 'callout', title: 'Notre plateforme', text: 'Paul World Travel Formation prépare au TCF Canada : séries au format officiel de 39 questions, trois tâches d’expression, simulateurs et examens blancs. Si vous hésitez, le [test de niveau gratuit](/test-de-niveau/) et le [guide complet du TCF Canada](/blog/tcf-canada-guide-complet-2026/) vous aideront à décider.' },
  ],
  sources: [
    { label: 'IRCC : Entrée express, résultats d’examen linguistique', href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html' },
    { label: 'France Éducation international : TCF Canada', href: 'https://www.france-education-international.fr/test/tcf-canada' },
    { label: 'Le français des affaires : TEF Canada, présentation', href: 'https://www.lefrancaisdesaffaires.fr/candidat/test-evaluation-francais/tef-canada/presentation' },
    { label: 'Le français des affaires : TEF Canada, passer le test', href: 'https://www.lefrancaisdesaffaires.fr/candidat/test-evaluation-francais/tef-canada/passation' },
  ],
  related: ['tcf-canada-guide-complet-2026', 'niveaux-nclc-bareme-tcf-canada', 'tcf-canada-cameroun-centres-prix-inscription'],
};
