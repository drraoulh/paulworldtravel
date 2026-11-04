// Original practice subjects for the TCF Canada expression tests (not official subjects).

import { moreWritingTasks } from './expression-ee-plus';
import { moreSpeakingTasks } from './expression-eo-plus';

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

const baseWritingTasks: WritingTask[] = [
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
    id: 'ee1-remerciement',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Pendant vos trois semaines de vacances au Cameroun, votre voisine a arrosé vos plantes et récupéré votre courrier. Écrivez-lui un message pour la remercier, lui raconter brièvement votre séjour et lui proposer quelque chose pour la remercier.',
    minWords: 60,
    maxWords: 120,
    minutes: 10,
  },
  {
    id: 'ee1-covoiturage',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Vous avez appris qu’un collègue habite près de chez vous. Écrivez-lui un message pour lui proposer de partager la voiture pour aller au travail : expliquez votre proposition, l’organisation possible et les avantages pour vous deux.',
    minWords: 60,
    maxWords: 120,
    minutes: 10,
  },
  {
    id: 'ee1-mariage',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Un ami d’enfance vous invite à son mariage à Douala en décembre. Répondez-lui : acceptez l’invitation, posez-lui des questions pratiques sur l’organisation et proposez-lui votre aide.',
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
    id: 'ee2-imprevu',
    task: 2,
    title: 'Tâche 2 : un récit',
    prompt: 'Le bulletin de votre immeuble invite les résidents à partager leurs souvenirs. Racontez une situation imprévue que vous avez vécue (tempête, panne, retard important…), expliquez comment vous y avez fait face et dites ce que vous en avez pensé.',
    minWords: 120,
    maxWords: 150,
    minutes: 20,
  },
  {
    id: 'ee2-achat',
    task: 2,
    title: 'Tâche 2 : un témoignage',
    prompt: 'Sur un forum de consommateurs, racontez un achat en ligne qui vous a déçu ou, au contraire, satisfait : ce que vous avez commandé, comment s’est passée la livraison et ce que vous conseillez aux autres acheteurs.',
    minWords: 120,
    maxWords: 150,
    minutes: 20,
  },
  {
    id: 'ee2-demarches',
    task: 2,
    title: 'Tâche 2 : un article',
    prompt: 'L’infolettre d’un organisme d’accueil des immigrants recherche des témoignages. Racontez une démarche administrative que vous avez faite à votre arrivée (ouvrir un compte bancaire, obtenir une carte d’assurance maladie, inscrire un enfant à l’école…) et donnez votre avis sur cette expérience.',
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
  {
    id: 'ee3-paiement',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Un site d’actualité économique ouvre un débat : faut-il abandonner l’argent liquide ? Présentez les deux opinions ci-dessous, puis donnez la vôtre avec des arguments.',
    documents: [
      'Document 1 : « Payer par carte ou par téléphone est rapide, pratique et plus sûr : on ne craint plus de se faire voler son portefeuille. Au Cameroun, le paiement mobile a déjà transformé le quotidien, du marché au taxi. Chaque transaction laisse une trace, ce qui limite la fraude et le travail au noir. L’argent liquide appartient au passé : il est temps d’en finir. »',
      'Document 2 : « Supprimer l’argent liquide exclurait les personnes âgées, les plus pauvres et tous ceux qui n’ont ni compte bancaire ni téléphone intelligent. En cas de panne de réseau, plus personne ne pourrait payer. De plus, chaque achat électronique est enregistré : nos habitudes deviennent visibles pour les banques et les entreprises. Les billets restent une garantie de liberté et de vie privée. »',
    ],
    minWords: 120,
    maxWords: 180,
    minutes: 30,
  },
  {
    id: 'ee3-tourisme',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Un magazine de voyage ouvre un débat : le tourisme est-il une chance pour les régions qui accueillent les visiteurs ? Présentez les deux opinions ci-dessous, puis donnez la vôtre avec des arguments.',
    documents: [
      'Document 1 : « Le tourisme fait vivre des régions entières. À Kribi comme en Gaspésie, il crée des emplois dans les hôtels, les restaurants et les transports, et permet aux artisans de vendre leurs produits. Il encourage aussi la protection du patrimoine et des paysages qui attirent les visiteurs. Sans touristes, beaucoup de jeunes quitteraient leur village pour chercher du travail en ville. »',
      'Document 2 : « L’arrivée massive de touristes fait monter le prix des logements et des produits, au point que les habitants ne peuvent plus vivre chez eux. Les plages sont polluées, les routes embouteillées, et les traditions deviennent des spectacles pour visiteurs. Quant aux bénéfices, ils vont souvent à de grandes entreprises venues d’ailleurs plutôt qu’aux populations locales. »',
    ],
    minWords: 120,
    maxWords: 180,
    minutes: 30,
  },
  {
    id: 'ee3-sucre',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Le site d’information de votre province ouvre un débat : faut-il taxer les boissons sucrées ? Présentez les deux opinions ci-dessous, puis donnez la vôtre avec des arguments.',
    documents: [
      'Document 1 : « Les boissons sucrées sont l’une des principales causes de l’obésité et du diabète, en particulier chez les jeunes. Une taxe ferait monter leur prix et inciterait les consommateurs à choisir de l’eau ou du lait. Plusieurs pays l’ont déjà adoptée avec succès. L’argent récolté pourrait financer des programmes de sport et d’alimentation saine dans les écoles. »',
      'Document 2 : « Une nouvelle taxe toucherait surtout les familles modestes, qui paient déjà cher leur épicerie. Ce n’est pas à l’État de décider de ce que les adultes boivent. De plus, une taxe ne change pas vraiment les habitudes : les gens achèteront ailleurs ou se tourneront vers d’autres produits sucrés. Mieux vaut informer et éduquer que punir. »',
    ],
    minWords: 120,
    maxWords: 180,
    minutes: 30,
  },
];

/** The original subjects, then the ones added later (expression-ee-plus.ts). */
export const writingTasks: WritingTask[] = [...baseWritingTasks, ...moreWritingTasks];

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

const baseSpeakingTasks: SpeakingTask[] = [
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
  {
    id: 'eo1-francais',
    task: 1,
    title: 'Tâche 1 : entretien dirigé',
    prompt: 'Parlez de votre apprentissage du français : depuis quand et comment vous l’apprenez, ce qui est facile ou difficile pour vous, et comment vous comptez continuer à progresser au Canada.',
    tips: ['Racontez votre parcours au passé, puis vos habitudes au présent.', 'Donnez des exemples concrets : une erreur amusante, une méthode qui marche pour vous.'],
    seconds: 120,
    mode: 'monologue',
  },
  {
    id: 'eo1-cuisine',
    task: 1,
    title: 'Tâche 1 : entretien dirigé',
    prompt: 'Parlez de vos habitudes alimentaires : ce que vous mangez au quotidien, votre plat préféré et la façon de le préparer, les repas de fête dans votre famille. Dites aussi si vous avez envie de découvrir la cuisine québécoise.',
    tips: ['Expliquez une recette dans l’ordre : d’abord, ensuite, enfin.', 'Utilisez un vocabulaire précis : ingrédients, saveurs, ustensiles.'],
    seconds: 120,
    mode: 'monologue',
  },
  {
    id: 'eo2-cours-langue',
    task: 2,
    title: 'Tâche 2 : obtenir des informations',
    prompt: 'Vous voulez améliorer votre anglais pour trouver un emploi à Ottawa. Vous appelez une école de langues : posez des questions sur les niveaux, les horaires, la durée de la formation, les tarifs et l’inscription.',
    tips: [
      'Pendant les 2 minutes de préparation, notez les questions à poser.',
      'Présentez votre situation : niveau actuel, objectif professionnel, disponibilités.',
      'Comparez les formules proposées et demandez des précisions (paiement, remboursement, attestation…).',
    ],
    seconds: 210,
    mode: 'interaction',
    prepSeconds: 120,
    partner: {
      role: 'la conseillère de l’école de langues, qui répond au téléphone',
      opening: 'École de langues Rideau, bonjour ! Je vous écoute.',
      facts:
        'Cours d’anglais pour adultes, six niveaux, du débutant à l’avancé. Test de classement gratuit de 45 minutes, en ligne ou sur place, obligatoire avant l’inscription. Groupes de 12 personnes au maximum. ' +
        'Deux formules : cours intensifs le jour, du lundi au vendredi de 9 h à 12 h, 4 semaines pour 780 $ ; cours du soir, mardi et jeudi de 18 h 30 à 20 h 30, 10 semaines pour 540 $. Manuel inclus dans le prix. ' +
        'Atelier « anglais des affaires » (entretien d’embauche, courriels, réunions) à partir du niveau 4, le samedi matin, 150 $ pour 5 séances. ' +
        'Prochaine session le 13 janvier ; inscriptions jusqu’au 6 janvier, en ligne ou à l’accueil, avec une pièce d’identité. Paiement en une fois ou en deux versements. ' +
        'Remboursement complet jusqu’au premier cours, 50 % pendant la première semaine, rien ensuite. Attestation de niveau remise à la fin de la session. ' +
        'École au centre-ville, rue Sparks, à deux minutes de la station Parlement de l’O-Train.',
    },
  },
  {
    id: 'eo2-colocation',
    task: 2,
    title: 'Tâche 2 : obtenir des informations',
    prompt: 'Vous allez faire vos études à Sherbrooke et vous cherchez une chambre en colocation. Vous appelez la personne qui a publié l’annonce : posez-lui des questions sur la chambre, le loyer, les colocataires, les règles de vie commune et les conditions d’entrée.',
    tips: [
      'Pendant les 2 minutes de préparation, notez les questions à poser.',
      'Présentez-vous en quelques mots : études, habitudes, date d’arrivée.',
      'Interrogez aussi la vie quotidienne (ménage, invités, bruit) et réagissez aux réponses.',
    ],
    seconds: 210,
    mode: 'interaction',
    prepSeconds: 120,
    partner: {
      role: 'Camille, l’étudiante qui a publié l’annonce et qui habite dans l’appartement',
      opening: 'Oui, allô ? Bonjour !',
      facts:
        'Appartement 5 ½ au rez-de-chaussée d’un duplex, rue King Ouest, à Sherbrooke, à 15 minutes en autobus de l’Université de Sherbrooke, sans correspondance. ' +
        'Chambre meublée de 11 m², avec lit double, bureau et grande fenêtre, libre le 1er septembre. Loyer : 525 $ par mois, électricité, chauffage et Internet inclus. ' +
        'Trois colocataires : Camille (maîtrise en biologie, c’est elle qui répond), Yannick (génie civil, originaire de Dakar) et Thomas (il travaille dans un café). ' +
        'Une salle de bain pour quatre, cuisine équipée, laveuse et sécheuse dans l’appartement, cour arrière avec barbecue. ' +
        'Règles : ménage des pièces communes en rotation chaque semaine, selon un tableau dans la cuisine ; produits de base partagés (huile, sel, papier toilette), 20 $ par mois ; invités bienvenus, mais on prévient les autres si quelqu’un dort sur place ; calme après 22 h en semaine ; pas d’animaux, car Thomas est allergique ; on ne fume pas dans l’appartement. ' +
        'Bail jusqu’au 30 juin, renouvelable. À l’entrée : le premier mois de loyer, pas de dépôt. Visite possible en vidéo ou sur place cette fin de semaine.',
    },
  },
  {
    id: 'eo3-aines',
    task: 3,
    title: 'Tâche 3 : exprimer un point de vue',
    prompt: '« Les personnes âgées devraient vivre avec leurs enfants plutôt qu’en résidence. » Qu’en pensez-vous ? Donnez votre avis et justifiez-le avec des exemples.',
    tips: ['Comparez ce que vous connaissez : votre pays d’origine et le Canada.', 'Pensez aux deux points de vue : celui des aînés et celui de leurs enfants.'],
    seconds: 270,
    mode: 'monologue',
  },
  {
    id: 'eo3-vote',
    task: 3,
    title: 'Tâche 3 : exprimer un point de vue',
    prompt: '« Le vote devrait être obligatoire pour tous les citoyens. » Êtes-vous d’accord ? Donnez votre avis et justifiez-le avec des exemples.',
    tips: ['Annoncez clairement votre position, puis développez deux arguments.', 'Envisagez une objection (liberté individuelle, vote blanc) et répondez-y.'],
    seconds: 270,
    mode: 'monologue',
  },
];

/** The original subjects, then the ones added later (expression-eo-plus.ts). */
export const speakingTasks: SpeakingTask[] = [...baseSpeakingTasks, ...moreSpeakingTasks];

export const wordCount = (text: string) => (text.trim() ? text.trim().split(/\s+/u).length : 0);
