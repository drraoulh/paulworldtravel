import type { Article } from './types';

export const comprehensionEcrite: Article = {
  slug: 'reussir-comprehension-ecrite-tcf-canada',
  title: 'Réussir la compréhension écrite du TCF Canada',
  description: '39 questions en 60 minutes, du petit document au texte argumenté : comment répartir son temps, lire de façon ciblée, repérer les reformulations et éviter les pièges.',
  category: 'Méthode',
  published: '2026-11-05',
  image: { src: '/images/lecture.jpg', alt: 'Des livres et des documents ouverts sur une table' },
  lead: 'En compréhension écrite, le texte reste sous vos yeux : la difficulté n’est pas de retenir, mais d’aller vite sans lire trop vite. La plupart des candidats perdent des points en fin d’épreuve faute de temps. Voici comment l’éviter.',
  blocks: [
    { type: 'h2', id: 'format', text: 'Le format de l’épreuve' },
    { type: 'ul', items: [
      '**39 questions à choix multiple**, quatre réponses proposées, une seule correcte, en **60 minutes**.',
      'Des documents **de plus en plus longs et difficiles** : affiches, courriels, annonces et modes d’emploi au début, puis articles de presse, chroniques et textes argumentés aux niveaux C1 et C2.',
      'Un score de 100 à 699, converti en NCLC : il faut au moins **453** pour le NCLC 7.',
    ] },
    { type: 'p', text: 'Soixante minutes pour 39 questions, cela fait en moyenne un peu plus d’une minute et demie par question. Mais cette moyenne trompe : une affiche se traite en trente secondes, un texte argumenté demande plusieurs minutes. D’où l’importance d’un plan de temps.' },

    { type: 'h2', id: 'temps', text: 'Répartir ses 60 minutes' },
    { type: 'p', text: 'L’idée est simple : **gagner du temps au début pour le dépenser à la fin**. Les premières questions portent sur des documents courts ; ne les relisez pas trois fois.' },
    { type: 'table', caption: 'Un repère de répartition, à ajuster pendant vos entraînements', head: ['Partie de l’épreuve', 'Type de documents', 'Temps indicatif'], rows: [
      ['Premières questions', 'Documents courts du quotidien (A1 à A2)', 'Environ 30 à 45 secondes par question'],
      ['Questions du milieu', 'Lettres, articles courts, annonces détaillées (B1 à B2)', 'Environ 1 min 30 par question'],
      ['Dernières questions', 'Articles d’opinion, textes littéraires ou spécialisés (C1 à C2)', 'Le temps restant, environ 2 à 3 minutes par question'],
    ] },
    { type: 'p', text: 'Regardez l’heure à des points de contrôle : par exemple, avoir traité la moitié des questions vers la 22e ou 25e minute. Si vous êtes en retard, accélérez sur les questions du milieu plutôt que de bâcler la fin, où chaque bonne réponse vaut cher.' },

    { type: 'h2', id: 'lecture-ciblee', text: 'Lire la question d’abord' },
    { type: 'p', text: 'Ne lisez pas le document de façon linéaire en espérant que la réponse apparaisse. Procédez dans l’ordre inverse :' },
    { type: 'ol', items: [
      '**Lisez la question** et repérez ce qu’elle demande : une information précise, l’objectif du document, l’opinion de l’auteur, le sens d’une expression.',
      '**Survolez le document** : titre, source, premières lignes, mise en forme. Vous saurez de quel type de texte il s’agit et à qui il s’adresse.',
      '**Allez chercher l’information** dans la partie du texte qui correspond, et lisez ce passage attentivement.',
      '**Comparez avec les quatre réponses** et éliminez celles qui sont fausses, avant de choisir.',
    ] },
    { type: 'callout', title: 'L’élimination', text: 'Quand vous hésitez, travaillez à l’envers : cherchez dans le texte la preuve que chaque réponse est **fausse**. Une réponse qui ajoute une information absente du texte, qui généralise (« toujours », « tous ») ou qui inverse la cause et la conséquence est presque toujours à écarter.' },

    { type: 'h2', id: 'reformulation', text: 'Repérer les reformulations' },
    { type: 'p', text: 'Comme à l’oral, la bonne réponse **reformule** le texte au lieu de le recopier. Le texte dit « les inscriptions seront closes à la fin du mois » ; la réponse correcte dira « il faut s’inscrire avant le 30 ». Le texte dit « la mairie envisage de » ; la réponse correcte dira « un projet est à l’étude », pas « la décision est prise ».' },
    { type: 'p', text: 'Travaillez donc les synonymes et les nominalisations, très fréquents dans la presse : « augmenter » et « hausse », « interdire » et « interdiction », « réduire » et « baisse ». Un carnet de vocabulaire organisé par thèmes est un excellent investissement.' },

    { type: 'example', title: 'Exemple d’entraînement (question originale)', text: 'Document : « À partir du 1er mars, la bibliothèque municipale ouvrira ses portes le dimanche de 10 h à 17 h. En contrepartie, elle sera fermée le lundi matin. »\n\nQuestion : Que change la bibliothèque ?\nA. Elle ferme désormais le dimanche.\nB. Elle modifie ses jours d’ouverture.\nC. Elle ouvre plus tard le lundi après-midi.\nD. Elle réduit ses heures d’ouverture.\n\nRéponse : B. Le texte ne parle ni de réduction (D) ni du lundi après-midi (C), et A dit le contraire du document. La bonne réponse reformule « ouvrira le dimanche… sera fermée le lundi matin » par une idée générale.' },
    { type: 'h2', id: 'niveaux-avances', text: 'Les questions des niveaux C1 et C2' },
    { type: 'p', text: 'Les derniers documents demandent de comprendre ce qui n’est pas dit explicitement : le point de vue de l’auteur, son ton (ironique, critique, enthousiaste), l’implicite d’une phrase. Trois réflexes aident :' },
    { type: 'ul', items: [
      '**Repérez les connecteurs** : « certes… mais », « or », « pourtant », « en réalité ». Ils indiquent où se trouve la position de l’auteur.',
      '**Distinguez les voix** : l’auteur cite souvent une opinion pour la contester. « Selon certains experts » n’est pas forcément l’avis du journaliste.',
      '**Lisez le dernier paragraphe** : la conclusion d’un texte argumenté résume souvent la thèse.',
    ] },

    { type: 'h2', id: 'pieges', text: 'Les erreurs qui coûtent des points' },
    { type: 'ul', items: [
      'Répondre avec ses connaissances au lieu de répondre avec le texte. Seul le document compte, même si vous pensez autrement.',
      'Se laisser attirer par une réponse qui contient un mot du texte, sans vérifier le sens de la phrase entière.',
      'Rester bloqué sur une question difficile. Choisissez la réponse la plus probable, notez le numéro et avancez.',
      'Laisser des questions vides en fin d’épreuve. Gardez deux minutes pour répondre à tout.',
    ] },

    { type: 'h2', id: 'entrainement', text: 'S’entraîner efficacement' },
    { type: 'ol', items: [
      '**Lisez un article de presse francophone par jour** et résumez-le en deux phrases : l’idée principale et l’opinion de l’auteur.',
      '**Chronométrez-vous** sur des [séries complètes de compréhension écrite](/epreuve/comprehension-ecrite/series/) de 39 questions en 60 minutes, au moins une fois par semaine.',
      '**Analysez chaque erreur** en mode entraînement : était-ce le vocabulaire, une reformulation non reconnue, l’implicite ou le temps ?',
      '**Révisez les leçons de méthode** de l’épreuve, chacune suivie d’un quiz, dans la [méthodologie de compréhension écrite](/epreuve/comprehension-ecrite/methodologie/).',
    ] },
    { type: 'p', text: 'La lecture rapporte aussi à l’écrit : plus vous lisez de français bien écrit, plus vos propres rédactions deviennent naturelles. Voir [Expression écrite : les 3 tâches expliquées](/blog/expression-ecrite-tcf-canada-3-taches/).' },
  ],
  sources: [
    { label: 'France Éducation international : TCF Canada (présentation des épreuves)', href: 'https://www.france-education-international.fr/test/tcf-canada' },
    { label: 'IRCC : tableau de correspondance TCF Canada et NCLC', href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html' },
  ],
  related: ['reussir-comprehension-orale-tcf-canada', 'niveaux-nclc-bareme-tcf-canada', 'preparation-tcf-canada-planning-30-jours'],
};
