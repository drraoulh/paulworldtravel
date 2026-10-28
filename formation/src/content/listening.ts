/**
 * Original listening material (not official TCF questions). The browser reads each
 * script aloud with its built-in French voice; `voice` switches between two speakers.
 */
export interface ListeningItem {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  kind: string;
  lines: { voice: 'a' | 'b'; text: string }[];
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
}

export const listeningItems: ListeningItem[] = [
  {
    id: 'gare',
    level: 'A1',
    kind: 'Annonce',
    lines: [{ voice: 'a', text: 'Mesdames et messieurs, le train pour Québec, prévu à quatorze heures quinze, partira avec vingt minutes de retard. Merci de votre compréhension.' }],
    prompt: 'À quelle heure le train va-t-il partir ?',
    choices: ['À 14 h 15', 'À 14 h 20', 'À 14 h 35', 'À 15 h 15'],
    answer: 2,
    explanation: 'Le départ prévu est 14 h 15, avec vingt minutes de retard : le train part à 14 h 35.',
  },
  {
    id: 'pharmacie',
    level: 'A2',
    kind: 'Message vocal',
    lines: [{ voice: 'b', text: 'Bonjour madame Mbarga, c’est la pharmacie du Parc. Vos médicaments sont arrivés. Vous pouvez passer les chercher dès demain matin. N’oubliez pas votre carte d’assurance maladie. Bonne journée !' }],
    prompt: 'Que doit apporter madame Mbarga ?',
    choices: ['Son ordonnance', 'Sa carte d’assurance maladie', 'De l’argent liquide', 'Une pièce d’identité'],
    answer: 1,
    explanation: 'Le message dit : « N’oubliez pas votre carte d’assurance maladie. »',
  },
  {
    id: 'collegue',
    level: 'A2',
    kind: 'Dialogue',
    lines: [
      { voice: 'a', text: 'Tu viens manger avec nous ce midi ? On va au restaurant vietnamien.' },
      { voice: 'b', text: 'J’aimerais bien, mais j’ai une réunion jusqu’à une heure. Allez-y sans moi, on se voit demain.' },
    ],
    prompt: 'Que répond la deuxième personne ?',
    choices: ['Elle accepte avec plaisir', 'Elle refuse à cause d’une réunion', 'Elle propose un autre restaurant', 'Elle demande l’adresse'],
    answer: 1,
    explanation: '« J’aimerais bien, mais… allez-y sans moi » : elle refuse poliment, car elle a une réunion.',
  },
  {
    id: 'appartement',
    level: 'B1',
    kind: 'Dialogue',
    lines: [
      { voice: 'a', text: 'Alors, cet appartement, il te plaît ?' },
      { voice: 'b', text: 'Le quartier est super et le loyer est raisonnable. Par contre, la chambre est vraiment petite, et sans ascenseur au quatrième étage, avec mon dos… Je préfère continuer à chercher.' },
    ],
    prompt: 'Pourquoi la personne ne prend-elle pas l’appartement ?',
    choices: ['Le loyer est trop cher', 'Le quartier ne lui plaît pas', 'La chambre est petite et il n’y a pas d’ascenseur', 'Il est trop loin de son travail'],
    answer: 2,
    explanation: 'Elle apprécie le quartier et le loyer ; ce qui la fait renoncer, ce sont la petite chambre et l’absence d’ascenseur.',
  },
  {
    id: 'inscription',
    level: 'B1',
    kind: 'Message d’information',
    lines: [{ voice: 'a', text: 'Les inscriptions aux cours de français du soir ouvrent le lundi trois mars. Les places sont limitées à vingt personnes par groupe. Les personnes déjà inscrites l’an dernier peuvent se réinscrire en ligne dès maintenant ; les nouveaux participants doivent se présenter au secrétariat avec une preuve de résidence.' }],
    prompt: 'Que doivent faire les nouveaux participants ?',
    choices: ['S’inscrire en ligne dès maintenant', 'Se présenter au secrétariat avec une preuve de résidence', 'Attendre le mois d’avril', 'Envoyer un courriel'],
    answer: 1,
    explanation: 'L’inscription en ligne est réservée aux anciens participants. Les nouveaux vont au secrétariat avec une preuve de résidence.',
  },
  {
    id: 'velo',
    level: 'B2',
    kind: 'Reportage',
    lines: [
      { voice: 'a', text: 'Depuis l’ouverture des nouvelles pistes cyclables, la circulation à vélo a augmenté de trente pour cent dans le centre-ville.' },
      { voice: 'b', text: 'C’est encourageant, bien sûr. Mais tant que les pistes s’arrêteront brusquement aux limites du centre, les habitants des quartiers périphériques continueront à prendre leur voiture. Il faut penser le réseau dans son ensemble.' },
    ],
    prompt: 'Quelle est la position de la deuxième intervenante ?',
    choices: ['Elle juge les pistes inutiles', 'Elle se réjouit mais demande un réseau plus étendu', 'Elle veut interdire les voitures', 'Elle doute des chiffres annoncés'],
    answer: 1,
    explanation: '« C’est encourageant… mais » : elle salue le progrès tout en demandant que le réseau s’étende aux quartiers périphériques.',
  },
  {
    id: 'emploi',
    level: 'B2',
    kind: 'Entretien',
    lines: [
      { voice: 'a', text: 'Qu’est-ce qui vous a décidé à quitter un poste stable pour créer votre entreprise ?' },
      { voice: 'b', text: 'Ce n’est pas l’argent, contrairement à ce qu’on pourrait croire. J’avais surtout le sentiment de ne plus apprendre. Créer ma propre structure, c’était l’occasion de me remettre en question, même si les débuts ont été financièrement difficiles.' },
    ],
    prompt: 'Pourquoi a-t-il créé son entreprise ?',
    choices: ['Pour gagner plus d’argent', 'Parce qu’il avait perdu son emploi', 'Pour continuer à apprendre et se remettre en question', 'Pour travailler moins'],
    answer: 2,
    explanation: 'Il écarte l’argent et explique qu’il avait « le sentiment de ne plus apprendre ».',
  },
  {
    id: 'numerique',
    level: 'C1',
    kind: 'Chronique',
    lines: [{ voice: 'a', text: 'On se félicite volontiers que toutes les démarches administratives soient désormais accessibles en ligne. Encore faudrait-il s’assurer que chacun dispose de l’équipement et des compétences nécessaires. Sans quoi, ce qui se présente comme une simplification risque fort de devenir, pour une partie de la population, un obstacle supplémentaire.' }],
    prompt: 'Que suggère la chroniqueuse ?',
    choices: ['Que la numérisation est une simplification pour tous', 'Qu’il faut supprimer les démarches en ligne', 'Que la numérisation peut exclure ceux qui n’ont pas les moyens de l’utiliser', 'Que les administrations sont trop lentes'],
    answer: 2,
    explanation: '« Encore faudrait-il… Sans quoi… un obstacle supplémentaire » : elle met en garde contre l’exclusion des personnes sans équipement ni compétences.',
  },
];
