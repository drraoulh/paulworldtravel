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
    id: 'ee1-voisin',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Vous organisez une petite fête chez vous samedi soir. Écrivez un message à vos voisins pour les prévenir, vous excuser à l’avance pour le bruit et leur laisser un moyen de vous joindre.',
    minWords: 60,
    maxWords: 120,
    minutes: 10,
  },
  {
    id: 'ee1-recommandation',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Une collègue vient d’arriver dans votre ville et cherche un bon restaurant pour l’anniversaire de son mari. Écrivez-lui un message pour lui recommander un restaurant : décrivez le lieu, les plats et donnez-lui des informations pratiques.',
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
    id: 'ee2-benevolat',
    task: 2,
    title: 'Tâche 2 : un compte rendu',
    prompt: 'Vous avez participé comme bénévole à une journée de solidarité (collecte de vêtements, nettoyage d’un parc, aide aux personnes âgées…). Rédigez un article pour le bulletin de votre association : racontez la journée et dites ce que cette expérience vous a apporté.',
    minWords: 120,
    maxWords: 150,
    minutes: 20,
  },
  {
    id: 'ee2-formation',
    task: 2,
    title: 'Tâche 2 : un compte rendu',
    prompt: 'Votre entreprise vous a envoyé à une journée de formation. Rédigez une note pour vos collègues : racontez le déroulement de la journée, ce que vous avez appris et dites si vous recommandez cette formation.',
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
  {
    id: 'ee3-etudiants',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Le site d’information de votre ville ouvre un débat : les étudiants devraient-ils travailler pendant leurs études ? Présentez les deux opinions ci-dessous, puis donnez la vôtre avec des arguments.',
    documents: [
      'Document 1 : « Un petit emploi apprend aux jeunes à gérer leur temps et leur argent. C’est aussi une première expérience professionnelle qui compte sur un CV. »',
      'Document 2 : « Un étudiant qui travaille vingt heures par semaine dort moins, révise moins et risque d’échouer. Les études doivent rester la priorité. »',
    ],
    minWords: 120,
    maxWords: 180,
    minutes: 30,
  },
  {
    id: 'ee3-uniforme',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Le journal de votre quartier ouvre un débat : faut-il imposer l’uniforme à l’école ? Présentez les deux opinions ci-dessous, puis donnez la vôtre avec des arguments.',
    documents: [
      'Document 1 : « L’uniforme efface les différences sociales entre les élèves et évite les moqueries liées aux vêtements de marque. Il crée aussi un sentiment d’appartenance. »',
      'Document 2 : « Imposer une tenue, c’est empêcher les jeunes d’exprimer leur personnalité. Et pour les familles, l’achat de plusieurs uniformes représente une dépense supplémentaire. »',
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
  /** Official speaking time, in seconds (for task 2: the dialogue, without preparation). */
  seconds: number;
  /** 'interaction': the candidate talks with an AI partner, turn by turn. */
  mode: 'monologue' | 'interaction';
  /** Official preparation time, in seconds. */
  prepSeconds?: number;
  /** Role played by the AI in an interaction. `facts` keeps its answers consistent. */
  partner?: { role: string; opening: string; facts: string };
}

export const speakingTasks: SpeakingTask[] = [
  {
    id: 'eo1-presentation',
    task: 1,
    title: 'Tâche 1 : entretien dirigé',
    prompt: 'Présentez-vous : votre parcours, votre travail ou vos études, votre famille, vos loisirs et votre projet au Canada.',
    tips: ['Parlez de vous au présent, au passé et au futur.', 'Donnez des détails concrets plutôt qu’une liste.'],
    seconds: 120,
    mode: 'monologue',
  },
  {
    id: 'eo1-loisirs',
    task: 1,
    title: 'Tâche 1 : entretien dirigé',
    prompt: 'Parlez de votre ville, de votre quartier et de ce que vous aimez faire pendant votre temps libre. Expliquez ce qui vous manquera, ou ce qui ne vous manquera pas, si vous partez au Canada.',
    tips: ['Décrivez avec des détails précis : lieux, habitudes, personnes.', 'Utilisez le futur ou le conditionnel pour parler du départ.'],
    seconds: 120,
    mode: 'monologue',
  },
  {
    id: 'eo1-travail',
    task: 1,
    title: 'Tâche 1 : entretien dirigé',
    prompt: 'Parlez de votre travail ou de vos études : en quoi consiste une journée type, ce que vous aimez, ce qui est difficile, et ce que vous aimeriez faire au Canada.',
    tips: ['Décrivez une journée dans l’ordre : le matin, l’après-midi, le soir.', 'Expliquez vos choix avec « parce que », « c’est pourquoi ».'],
    seconds: 120,
    mode: 'monologue',
  },
  {
    id: 'eo2-logement',
    task: 2,
    title: 'Tâche 2 : obtenir des informations',
    prompt: 'Vous voulez louer un appartement à Montréal. Vous appelez le propriétaire : posez-lui des questions sur le logement, le loyer, les charges, le quartier et la date de disponibilité.',
    tips: [
      'Pendant les 2 minutes de préparation, notez les questions à poser.',
      'Saluez et présentez la raison de votre appel.',
      'Variez les formes de questions (est-ce que, inversion, combien, quand…) et réagissez aux réponses.',
    ],
    seconds: 210,
    mode: 'interaction',
    prepSeconds: 120,
    partner: {
      role: 'le propriétaire de l’appartement, qui répond au téléphone',
      opening: 'Allô, oui, bonjour !',
      facts:
        'Appartement 4 ½ (deux chambres) au 3e étage sans ascenseur, rue Saint-Denis, sur le Plateau-Mont-Royal. ' +
        'Loyer : 1 450 $ par mois, chauffage et eau chaude inclus ; électricité en plus, environ 60 $ par mois. ' +
        'Libre le 1er juillet. Bail de 12 mois. Pas de chien, un chat est accepté. ' +
        'Métro Mont-Royal à 5 minutes à pied, épicerie, pharmacie et parc La Fontaine à proximité. ' +
        'Laveuse et sécheuse dans le sous-sol commun. Pas de stationnement, vignette de rue possible. ' +
        'Pas de dépôt de garantie : le premier mois se paie à la signature. Visite possible samedi à 10 h.',
    },
  },
  {
    id: 'eo3-transport',
    task: 3,
    title: 'Tâche 3 : exprimer un point de vue',
    prompt: '« Dans les grandes villes, il faudrait interdire les voitures dans le centre. » Qu’en pensez-vous ? Donnez votre avis et justifiez-le avec des exemples.',
    tips: ['Annoncez clairement votre position.', 'Donnez au moins deux arguments illustrés, puis une nuance.'],
    seconds: 270,
    mode: 'monologue',
  },
  {
    id: 'eo2-sport',
    task: 2,
    title: 'Tâche 2 : obtenir des informations',
    prompt: 'Vous venez d’arriver à Montréal et vous voulez vous inscrire dans un centre sportif. Vous parlez avec l’employé de l’accueil : posez-lui des questions sur les activités, les horaires, les tarifs, l’inscription et l’équipement.',
    tips: [
      'Pendant les 2 minutes de préparation, notez les questions à poser.',
      'Présentez votre situation : nouvel arrivant, disponibilités, budget.',
      'Variez les questions et demandez des précisions (réductions, essai gratuit…).',
    ],
    seconds: 210,
    mode: 'interaction',
    prepSeconds: 120,
    partner: {
      role: 'l’employé de l’accueil du centre sportif',
      opening: 'Bonjour, bienvenue au centre sportif du quartier ! Je peux vous aider ?',
      facts:
        'Ouvert de 6 h à 22 h en semaine, de 8 h à 18 h la fin de semaine. Activités : piscine, salle de musculation, cours collectifs (yoga, zumba, natation pour adultes). ' +
        'Abonnement mensuel 45 $, annuel 420 $ ; tarif réduit de 20 % pour les étudiants et les nouveaux arrivants de moins d’un an, sur présentation d’un justificatif. ' +
        'Inscription à l’accueil avec une pièce d’identité et une photo ; un premier cours d’essai gratuit. Cadenas pour le casier à apporter ou à acheter 8 $. ' +
        'Bonnet de bain obligatoire à la piscine. Cours collectifs sur réservation en ligne, 48 heures à l’avance.',
    },
  },
  {
    id: 'eo2-voyage',
    task: 2,
    title: 'Tâche 2 : obtenir des informations',
    prompt: 'Vous voulez passer une fin de semaine à Québec avec votre famille. Vous parlez avec un conseiller dans une agence de voyages : posez-lui des questions sur le transport, l’hébergement, les activités, les prix et les conditions d’annulation.',
    tips: [
      'Pendant les 2 minutes de préparation, notez les questions à poser.',
      'Précisez votre situation : nombre de personnes, dates, budget.',
      'Comparez les options proposées et demandez des précisions.',
    ],
    seconds: 210,
    mode: 'interaction',
    prepSeconds: 120,
    partner: {
      role: 'le conseiller de l’agence de voyages',
      opening: 'Bonjour, bienvenue à l’agence ! Qu’est-ce que je peux faire pour vous ?',
      facts:
        'Forfait fin de semaine à Québec, départ de Montréal le vendredi à 17 h, retour le dimanche à 18 h. Transport en train (3 h 15) ou en autocar (3 h). ' +
        'Hôtel 3 étoiles dans le Vieux-Québec, petit-déjeuner inclus, chambre familiale pour 4 personnes. ' +
        'Prix : 289 $ par adulte en train, 249 $ en autocar ; enfants de moins de 12 ans à moitié prix. ' +
        'Activités incluses : visite guidée du Vieux-Québec à pied ; en option, chute Montmorency (25 $ par personne). ' +
        'Annulation gratuite jusqu’à 7 jours avant le départ ; ensuite, 50 % du prix est retenu. Paiement : 30 % à la réservation, le reste 15 jours avant.',
    },
  },
  {
    id: 'eo3-reseaux',
    task: 3,
    title: 'Tâche 3 : exprimer un point de vue',
    prompt: '« Les réseaux sociaux nous rapprochent de nos proches, même à des milliers de kilomètres. » Êtes-vous d’accord ? Donnez votre avis et justifiez-le avec des exemples.',
    tips: ['Pensez à votre propre expérience : famille au pays, amis à l’étranger.', 'Présentez aussi une limite : temps passé, isolement, fausses informations.'],
    seconds: 270,
    mode: 'monologue',
  },
  {
    id: 'eo3-langues',
    task: 3,
    title: 'Tâche 3 : exprimer un point de vue',
    prompt: '« Les enfants devraient apprendre une deuxième langue dès la maternelle. » Qu’en pensez-vous ? Donnez votre avis et justifiez-le avec des exemples.',
    tips: ['Appuyez-vous sur votre expérience : langues parlées en famille, à l’école.', 'Envisagez les conditions : enseignants, temps, langue maternelle.'],
    seconds: 270,
    mode: 'monologue',
  },
];

export const wordCount = (text: string) => (text.trim() ? text.trim().split(/\s+/u).length : 0);
