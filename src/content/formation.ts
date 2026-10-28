import { readingQuestions } from "../../formation/src/content/reading";

export type SkillId = "ce" | "co" | "ee" | "eo";
export type ChoiceQuestion = {
  id: string;
  level: string;
  text: string;
  prompt: string;
  choices: readonly string[];
  answer: number;
  explanation: string;
};
export const skills: {
  id: SkillId;
  slug: string;
  title: string;
  verb: string;
  description: string;
  detail: string;
  minutes: number;
  color: string;
}[] = [
  {
    id: "co",
    slug: "comprehension-orale",
    title: "Compréhension orale",
    verb: "Écouter",
    description:
      "Repérez les informations et les intentions dans des annonces et des dialogues.",
    detail: "4 écoutes · QCM corrigés",
    minutes: 5,
    color: "bg-blue-50 text-blue-800",
  },
  {
    id: "ce",
    slug: "comprehension-ecrite",
    title: "Compréhension écrite",
    verb: "Lire",
    description:
      "Comprenez des documents du quotidien et des textes argumentés.",
    detail: "6 textes · QCM corrigés",
    minutes: 8,
    color: "bg-emerald-50 text-emerald-800",
  },
  {
    id: "ee",
    slug: "expression-ecrite",
    title: "Expression écrite",
    verb: "Écrire",
    description:
      "Structurez vos idées, respectez la consigne et relisez vos productions.",
    detail: "3 tâches · Compteur de mots",
    minutes: 12,
    color: "bg-amber-50 text-amber-800",
  },
  {
    id: "eo",
    slug: "expression-orale",
    title: "Expression orale",
    verb: "Parler",
    description:
      "Présentez-vous, posez des questions et défendez votre point de vue.",
    detail: "3 tâches · Enregistrement local",
    minutes: 6,
    color: "bg-purple-50 text-purple-800",
  },
];
export const reading: readonly ChoiceQuestion[] = readingQuestions;
export const listening: readonly ChoiceQuestion[] = [
  {
    id: "train",
    level: "A2",
    text: "Votre attention s’il vous plaît. Le train à destination de Lyon, initialement prévu à quatorze heures dix, partira avec vingt minutes de retard. Les voyageurs sont invités à rejoindre la voie six.",
    prompt: "À quelle heure le train doit-il partir ?",
    choices: ["À 14 h 10", "À 14 h 20", "À 14 h 30", "À 14 h 40"],
    answer: 2,
    explanation:
      "Le départ était prévu à 14 h 10. Avec vingt minutes de retard, il est annoncé à 14 h 30.",
  },
  {
    id: "rendezvous",
    level: "A2",
    text: "Bonjour Madame, c’est le secrétariat du docteur Martin. Votre rendez-vous de mardi est déplacé à jeudi à neuf heures. Merci de nous rappeler si ce nouvel horaire ne vous convient pas.",
    prompt: "Pourquoi le secrétariat appelle-t-il ?",
    choices: [
      "Pour modifier un rendez-vous",
      "Pour annoncer une fermeture définitive",
      "Pour demander un paiement",
      "Pour confirmer le rendez-vous de mardi",
    ],
    answer: 0,
    explanation:
      "Le rendez-vous est déplacé du mardi au jeudi. Le rappel n’est demandé que si le nouvel horaire ne convient pas.",
  },
  {
    id: "atelier",
    level: "B1",
    text: "Alors, tu participes à l’atelier samedi ? J’aurais bien aimé, mais je travaille jusqu’à midi. L’atelier commence à dix heures et se termine à onze heures trente. Je vais plutôt m’inscrire à la prochaine session.",
    prompt: "Pourquoi la personne ne participe-t-elle pas samedi ?",
    choices: [
      "Elle trouve le tarif trop élevé",
      "Elle travaille pendant l’atelier",
      "Elle a oublié de s’inscrire",
      "La session est annulée",
    ],
    answer: 1,
    explanation:
      "Elle travaille jusqu’à midi, alors que l’atelier se termine à 11 h 30. Les horaires ne sont pas compatibles.",
  },
  {
    id: "mobilite",
    level: "B2",
    text: "Installer des pistes cyclables est une avancée, à condition qu’elles forment un réseau continu. Quelques tronçons isolés ne suffisent pas à convaincre les habitants de laisser leur voiture. Il faut pouvoir rejoindre son travail sans interruption dangereuse.",
    prompt: "Quelle condition favorise l’usage du vélo selon l’intervenant ?",
    choices: [
      "La gratuité de tous les vélos",
      "L’interdiction immédiate des voitures",
      "La multiplication des parkings",
      "La continuité des itinéraires cyclables",
    ],
    answer: 3,
    explanation:
      "L’intervenant insiste sur un réseau continu et sur l’absence d’interruptions dangereuses.",
  },
];
export const writingTasks = [
  {
    id: "invitation",
    title: "Un message à un proche",
    min: 60,
    max: 120,
    prompt:
      "Vous venez d’arriver dans une nouvelle ville. Écrivez à un ami pour lui décrire votre quartier, expliquer ce qui vous plaît et l’inviter à vous rendre visite.",
    tips: [
      "Adressez-vous directement à votre ami.",
      "Décrivez au moins deux aspects du quartier.",
      "Proposez une visite avec un détail concret.",
    ],
    example:
      "Salut Léa, je suis enfin installé à Montréal ! Mon quartier est calme et bien desservi par le métro. Il y a un marché à deux rues de chez moi et un grand parc où je marche le soir. J’aime surtout la proximité des commerces : je peux presque tout faire à pied. Tu pourrais venir le mois prochain ? Nous visiterions le centre-ville ensemble et je te ferais découvrir mon café préféré. J’ai une chambre libre pour t’accueillir. Dis-moi quelles dates te conviendraient. À très bientôt !",
  },
  {
    id: "experience",
    title: "Raconter une expérience",
    min: 120,
    max: 150,
    prompt:
      "Vous avez participé à un atelier de cuisine dans une association. Rédigez un article pour le blog de votre quartier : racontez cette expérience, donnez votre avis et expliquez à qui vous conseilleriez cet atelier.",
    tips: [
      "Donnez un titre à votre article.",
      "Racontez une expérience précise, puis donnez votre avis.",
      "Expliquez à qui l’atelier pourrait plaire.",
    ],
    example:
      "Plan possible : un titre accrocheur ; le contexte et les participants ; deux moments marquants de l’atelier ; votre avis justifié par un exemple ; une recommandation au lecteur. Utilisez le passé pour le récit et le présent pour votre appréciation. Ce plan est une aide, pas une correction de votre texte.",
  },
  {
    id: "argumentation",
    title: "Comparer et prendre position",
    min: 120,
    max: 180,
    prompt:
      "Document A : le télétravail réduit les trajets et permet une meilleure organisation. Document B : la présence au bureau favorise les échanges et sépare vie privée et travail. Présentez les deux points de vue, puis donnez votre opinion argumentée sur le travail hybride.",
    tips: [
      "Reformulez les deux documents sans les recopier.",
      "Annoncez clairement votre position.",
      "Appuyez vos arguments sur des exemples et nuancez votre conclusion.",
    ],
    example:
      "Plan possible : résumer l’avantage mis en avant par chaque document ; annoncer votre position ; développer un argument avec un exemple ; reconnaître une limite ; conclure sur les conditions d’un travail hybride réussi. Aucun texte modèle ne permet à lui seul d’évaluer votre niveau.",
  },
] as const;
export const speakingTasks = [
  {
    id: "presentation",
    title: "Se présenter",
    seconds: 60,
    prompt:
      "Présentez-vous : votre activité, votre ville, un centre d’intérêt et votre projet pour les prochains mois.",
    tips: [
      "Organisez votre présentation.",
      "Développez vos idées avec des exemples.",
      "Évitez de réciter des phrases apprises.",
    ],
  },
  {
    id: "interaction",
    title: "Demander des renseignements",
    seconds: 120,
    prompt:
      "Vous souhaitez vous inscrire à une association sportive. Imaginez les questions que vous poseriez au responsable sur les horaires, les activités, les tarifs et le matériel. Dans cette démonstration, il n’y a pas d’interlocuteur automatique.",
    tips: [
      "Variez vos questions.",
      "Utilisez des formulations polies.",
      "Préparez une relance pour préciser une réponse.",
    ],
  },
  {
    id: "opinion",
    title: "Défendre son point de vue",
    seconds: 180,
    prompt:
      "Faut-il privilégier les transports en commun dans les grandes villes ? Présentez votre opinion, donnez des exemples et évoquez un argument contraire.",
    tips: [
      "Annoncez votre position.",
      "Donnez au moins deux raisons.",
      "Nuancez et concluez clairement.",
    ],
  },
] as const;
export const selfReview = [
  "J’ai répondu à toutes les parties de la consigne.",
  "J’ai organisé mes idées de manière compréhensible.",
  "J’ai utilisé des exemples précis.",
  "J’ai relu ou réécouté ma production pour repérer les points à améliorer.",
];
