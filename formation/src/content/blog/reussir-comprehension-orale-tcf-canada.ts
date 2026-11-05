import type { Article } from './types';

export const comprehensionOrale: Article = {
  slug: 'reussir-comprehension-orale-tcf-canada',
  title: 'Réussir la compréhension orale du TCF Canada : la méthode',
  description: '39 questions, 35 minutes, une seule écoute : comment anticiper, repérer l’information utile, éviter les pièges des distracteurs et s’entraîner chaque jour pour monter en NCLC.',
  category: 'Méthode',
  published: '2026-11-05',
  image: { src: '/images/ecoute.jpg', alt: 'Une personne écoute un document avec un casque' },
  lead: 'En compréhension orale, vous n’entendez chaque document qu’une fois. Ce n’est pas une épreuve de mémoire, mais d’anticipation et de tri : savoir ce que l’on cherche avant que l’enregistrement commence. Voici une méthode en cinq temps, puis un programme d’entraînement.',
  blocks: [
    { type: 'h2', id: 'format', text: 'Ce que vous devez savoir sur l’épreuve' },
    { type: 'ul', items: [
      '**39 questions à choix multiple**, quatre réponses proposées, une seule correcte, en **35 minutes**.',
      'Les documents sont classés **du plus simple au plus difficile** : des messages du quotidien niveau A1 jusqu’à des extraits d’émissions ou de conférences niveau C2.',
      'Chaque document est diffusé **une seule fois**. Vous ne pouvez pas revenir en arrière.',
      'Le résultat est un score de 100 à 699, converti en NCLC : il faut au moins **458** pour le NCLC 7 (voir [le barème](/blog/niveaux-nclc-bareme-tcf-canada/)).',
    ] },
    { type: 'p', text: 'Conséquence directe : les premières questions sont les plus faciles et les plus « rentables ». Une erreur d’inattention au début coûte autant qu’une question difficile ratée à la fin. La concentration doit être maximale dès la première minute.' },

    { type: 'h2', id: 'methode', text: 'La méthode en cinq temps' },
    { type: 'h3', text: '1. Lire la question avant l’écoute' },
    { type: 'p', text: 'Dès qu’une question s’affiche, lisez-la avec ses quatre réponses. Soulignez mentalement le mot interrogatif : **qui**, **où**, **quand**, **pourquoi**, **que propose**, **quel est le ton**. Vous saurez alors s’il faut guetter un nom, un lieu, une heure, une cause ou une attitude.' },
    { type: 'h3', text: '2. Imaginer la situation' },
    { type: 'p', text: 'Les réponses proposées disent beaucoup de la situation : une annonce dans une gare, un message sur un répondeur, un échange entre collègues. En deux secondes, faites-vous une image de la scène. Votre cerveau reconnaîtra plus vite les mots attendus : « quai », « retard », « correspondance » pour une gare, par exemple.' },
    { type: 'h3', text: '3. Écouter le sens global d’abord' },
    { type: 'p', text: 'Ne cherchez pas à tout comprendre. Repérez qui parle, à qui, et dans quel but : informer, se plaindre, convaincre, proposer. Pour les questions de niveau B2 et plus, c’est souvent **l’intention** ou **l’opinion** du locuteur qui est demandée, pas un détail.' },
    { type: 'h3', text: '4. Se méfier des mots entendus' },
    { type: 'p', text: 'C’est le piège le plus fréquent : la mauvaise réponse reprend **un mot exact** du document, alors que la bonne le **reformule**. Si le locuteur dit « je ne pourrai pas venir avant jeudi », la bonne réponse sera plutôt « il arrivera en fin de semaine » que « il viendra lundi ». Une réponse qui « sonne » comme le document n’est pas forcément juste.' },
    { type: 'h3', text: '5. Répondre tout de suite, puis passer' },
    { type: 'p', text: 'Choisissez dès la fin de l’écoute, même si vous hésitez, et concentrez-vous sur la question suivante. Ruminer une réponse fait manquer le document d’après. Ne laissez aucune question sans réponse : une case vide ne rapporte jamais rien.' },

    { type: 'h2', id: 'pieges', text: 'Les pièges classiques' },
    { type: 'table', head: ['Piège', 'Comment le déjouer'], rows: [
      ['La négation', 'Écoutez « ne… plus », « ne… jamais », « ne… que » : « il ne reste que deux places » veut dire qu’il en reste, pas qu’il n’y en a plus.'],
      ['La correction', '« Le rendez-vous est à 14 h… ah non, pardon, à 15 h 30. » La seconde information remplace la première.'],
      ['Les chiffres', '« Soixante-dix », « quatre-vingt-dix », les années, les prix : entraînez-vous spécifiquement, ils tombent souvent au début de l’épreuve.'],
      ['L’opinion nuancée', '« Ce n’est pas inintéressant, mais… » : ce qui suit « mais », « pourtant », « en revanche » porte en général l’avis réel.'],
      ['L’ironie et le ton', 'Aux niveaux C1 et C2, le ton compte autant que les mots : « Bravo, vraiment, quelle organisation ! » peut être un reproche.'],
    ] },

    { type: 'h2', id: 'accents', text: 'Accents et registres : s’habituer à la variété' },
    { type: 'p', text: 'Les enregistrements font entendre différents accents de la francophonie et différents registres : langue standard des médias, conversation familière, discours plus soutenu. Si vous n’écoutez qu’un seul type de français, les documents d’un autre registre vous paraîtront plus difficiles qu’ils ne le sont.' },
    { type: 'p', text: 'Variez donc vos sources : radio publique française, radio canadienne, podcasts, journaux télévisés, interviews. L’objectif n’est pas de tout comprendre, mais d’entraîner votre oreille à reconnaître le français parlé à vitesse normale, avec ses liaisons et ses mots avalés (« j’sais pas », « y a »).' },

    { type: 'h2', id: 'entrainement', text: 'Un programme d’entraînement simple' },
    { type: 'ol', items: [
      '**Tous les jours, 15 minutes d’écoute active** : un journal radio ou un extrait de podcast. Écoutez une fois, résumez à voix haute en trois phrases, réécoutez pour vérifier.',
      '**Deux fois par semaine, une série chronométrée** en conditions d’examen : une seule écoute, 35 minutes, sans pause. Les [séries de compréhension orale](/epreuve/comprehension-orale/series/) reprennent ce format.',
      '**Après chaque série, analysez vos erreurs** en mode entraînement : réécoutez le document, lisez la transcription et classez l’erreur (vocabulaire, chiffre, piège du mot entendu, inattention).',
      '**Notez le vocabulaire qui revient** : logement, transports, travail, santé, démarches administratives, environnement. Ce sont des thèmes fréquents des documents de la vie quotidienne.',
      '**Une fois par mois, un examen blanc complet** pour vous habituer à enchaîner l’écoute avec les autres épreuves.',
    ] },
    { type: 'callout', title: 'Conseil pratique', text: 'Entraînez-vous avec des écouteurs, dans un endroit calme, et ne mettez pas l’enregistrement en pause. Le jour de l’examen, vous ne pourrez ni arrêter ni réécouter : votre entraînement doit vous y habituer.' },

    { type: 'h2', id: 'jour-j', text: 'Le jour de l’examen' },
    { type: 'ul', items: [
      'Arrivez reposé : la compréhension orale est souvent la première épreuve, et la fatigue se paie tout de suite.',
      'Si vous passez le test sur papier, cochez proprement la feuille de réponses : FEI publie une page sur la façon de [remplir la feuille de réponses des QCM](https://www.france-education-international.fr/test/tcf-canada).',
      'Si vous ratez un document, lâchez-le immédiatement. Le suivant est une nouvelle chance.',
    ] },
    { type: 'p', text: 'Pour la lecture, la logique est voisine mais le temps se gère différemment : voir [Réussir la compréhension écrite](/blog/reussir-comprehension-ecrite-tcf-canada/).' },
  ],
  sources: [
    { label: 'France Éducation international : TCF Canada (présentation des épreuves)', href: 'https://www.france-education-international.fr/test/tcf-canada' },
    { label: 'IRCC : tableau de correspondance TCF Canada et NCLC', href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html' },
  ],
  related: ['reussir-comprehension-ecrite-tcf-canada', 'preparation-tcf-canada-planning-30-jours', 'tcf-canada-guide-complet-2026'],
};
