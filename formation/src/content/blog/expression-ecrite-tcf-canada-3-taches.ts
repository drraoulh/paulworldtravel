import type { Article } from './types';

export const expressionEcrite: Article = {
  slug: 'expression-ecrite-tcf-canada-3-taches',
  title: 'Expression écrite du TCF Canada : les 3 tâches expliquées avec exemples',
  description: 'Message, récit et texte argumenté : ce que demande chaque tâche, le nombre de mots, la structure à suivre, un exemple commenté et la gestion de l’heure d’épreuve.',
  category: 'Méthode',
  published: '2026-11-05',
  image: { src: '/images/ecriture.jpg', alt: 'Une main qui écrit dans un cahier' },
  lead: 'L’expression écrite dure 60 minutes pour trois rédactions de difficulté croissante. Chaque tâche a ses codes, et la note sur 20 récompense d’abord une réponse qui respecte la consigne. Voici les trois tâches, avec une structure et un exemple pour chacune.',
  blocks: [
    { type: 'h2', id: 'vue-ensemble', text: 'Vue d’ensemble' },
    { type: 'table', head: ['Tâche', 'Ce qu’on vous demande', 'Longueur', 'Temps conseillé'], rows: [
      ['1', 'Un message à un ou plusieurs destinataires : décrire, raconter, expliquer, inviter', '60 à 120 mots', '10 min'],
      ['2', 'Un article, un courrier ou une note pour plusieurs destinataires, qui raconte une expérience et donne un avis', '120 à 150 mots', '20 min'],
      ['3', 'Un texte en deux parties : la synthèse de deux documents opposés (40 à 60 mots), puis votre opinion (80 à 120 mots)', '120 à 180 mots', '30 min'],
    ] },
    { type: 'p', text: 'Le temps conseillé n’est pas imposé : vous gérez vous-même l’heure. Mais la tâche 3 est la plus exigeante, et beaucoup de candidats la sacrifient faute de temps. Gardez-lui au moins 25 à 30 minutes.' },
    { type: 'callout', title: 'Respectez les longueurs', text: 'Un texte trop court ne montre pas assez votre niveau ; un texte beaucoup trop long fait perdre du temps et multiplie les erreurs. Entraînez-vous à estimer vos mots : comptez combien vous en écrivez par ligne, puis multipliez par le nombre de lignes.' },

    { type: 'h2', id: 'tache-1', text: 'Tâche 1 : le message' },
    { type: 'p', text: 'La consigne précise un destinataire (un ami, un voisin, un collègue, un formateur) et, le plus souvent, **trois éléments** à traiter : par exemple décrire votre logement, présenter votre quartier et inviter votre ami. Chaque élément oublié coûte des points.' },
    { type: 'ol', items: [
      '**Formule d’appel** adaptée : « Salut Karim, » pour un ami, « Bonjour Madame Lefebvre, » pour un formateur.',
      '**Une phrase d’introduction** qui dit pourquoi vous écrivez.',
      '**Les trois points de la consigne**, un paragraphe court chacun, avec des détails concrets (jour, heure, lieu, prix).',
      '**Une phrase de clôture** qui appelle une réponse, puis une formule finale et votre prénom.',
    ] },
    { type: 'p', text: 'Le piège principal est le **registre** : on tutoie un ami, on vouvoie un voisin qu’on connaît peu, un supérieur ou un formateur. Et on ne mélange pas les deux dans le même message.' },
    { type: 'example', title: 'Exemple (consigne : inviter un ami à fêter votre installation)', text: 'Salut Karim,\n\nJ’ai enfin emménagé dans mon nouvel appartement à Laval ! Il est au deuxième étage d’un petit immeuble calme, avec deux chambres et une cuisine lumineuse.\n\nLe quartier me plaît beaucoup : il y a un grand parc juste en face et une épicerie au coin de la rue. Le métro est à dix minutes à pied.\n\nEst-ce que tu serais libre samedi prochain ? Je t’invite à souper vers 19 h pour fêter mon installation. Dis-moi si ça te va !\n\nÀ bientôt,\nAïcha' },

    { type: 'h2', id: 'tache-2', text: 'Tâche 2 : le récit ou le compte rendu' },
    { type: 'p', text: 'Vous racontez une expérience à un public plus large : un article pour le journal de votre quartier, un message sur un blogue, une note à vos collègues. On attend un **récit au passé** bien organisé, puis votre **avis** ou ce que vous retenez de l’expérience.' },
    { type: 'ol', items: [
      '**Un titre** si c’est un article.',
      '**La situation** : quand, où, avec qui, pourquoi.',
      '**Le déroulement**, dans l’ordre chronologique, avec des connecteurs de temps : d’abord, ensuite, au bout d’une heure, finalement.',
      '**Un moment marquant** et vos sentiments : surprise, fierté, déception.',
      '**La conclusion** : votre avis, une recommandation ou une invitation adressée aux lecteurs.',
    ] },
    { type: 'p', text: 'Le point de grammaire décisif est l’alternance **imparfait et passé composé** : l’imparfait pour le décor et les habitudes (« il faisait froid, la ville était couverte de neige »), le passé composé pour les actions qui font avancer le récit (« une voisine m’a montré comment marcher sur la glace »).' },
    { type: 'example', title: 'Exemple d’ouverture et de conclusion', text: 'Mon premier hiver à Québec\n\nJe suis arrivé à Québec en janvier dernier pour commencer mes études. Le premier matin, il faisait moins vingt degrés et la ville était couverte de neige. […]\n\nAujourd’hui, je garde un excellent souvenir de cette expérience. Si vous partez au Canada en hiver, préparez-vous bien, mais n’ayez pas peur : on s’adapte vite !' },

    { type: 'h2', id: 'tache-3', text: 'Tâche 3 : comparer deux points de vue' },
    { type: 'p', text: 'On vous donne **deux courts documents** qui défendent des positions opposées sur un sujet de société : le télétravail, les écrans chez les enfants, la voiture en ville. Vous écrivez un texte en deux parties nettement séparées.' },
    { type: 'h3', text: 'Partie 1 : la synthèse (40 à 60 mots)' },
    { type: 'p', text: 'Vous présentez **objectivement** les deux points de vue, avec vos propres mots, sans donner votre avis. Ne recopiez pas les phrases des documents : reformulez. Une structure efficace : « Le premier document affirme que… En revanche, le second estime que… »' },
    { type: 'h3', text: 'Partie 2 : votre opinion (80 à 120 mots)' },
    { type: 'p', text: 'Vous prenez position clairement, avec **deux arguments**, au moins **un exemple** concret, et une **conclusion**. Une phrase de nuance (« certes…, mais… ») montre un niveau B2 et plus.' },
    { type: 'example', title: 'Exemple de synthèse (sujet : le télétravail)', text: 'Le premier document présente le télétravail comme un progrès : moins de temps dans les transports, plus d’autonomie et un meilleur équilibre entre vie professionnelle et vie familiale. Le second, au contraire, insiste sur ses risques : l’isolement des salariés, la difficulté à séparer travail et vie privée et l’affaiblissement de l’esprit d’équipe.' },
    { type: 'p', text: 'Cette synthèse fait environ 55 mots, ne donne aucun avis et reformule les deux positions. La partie opinion pourrait commencer par : « Pour ma part, je pense que le télétravail est bénéfique s’il reste partiel. »' },

    { type: 'h2', id: 'erreurs', text: 'Les erreurs les plus fréquentes' },
    { type: 'ul', items: [
      'Oublier un des points de la consigne en tâche 1.',
      'Écrire un récit au présent en tâche 2, ou mélanger les temps sans logique.',
      'Donner son avis dans la synthèse de la tâche 3, ou recopier les documents.',
      'Ne pas relire : accords (« les gens sont venus »), accents, majuscules, ponctuation. Gardez cinq minutes de relecture à la fin.',
      'Utiliser des formules apprises par cœur qui ne répondent pas au sujet. Les correcteurs les repèrent.',
    ] },

    { type: 'h2', id: 'progresser', text: 'Comment progresser' },
    { type: 'ol', items: [
      'Apprenez les structures et les expressions utiles de chaque tâche avec nos [modèles de réponses](/modeles-de-reponses/), à copier ou imprimer.',
      'Rédigez sur les [sujets et corrigés](/epreuve/expression-ecrite/sujets/), puis comparez avec le corrigé commenté.',
      'Faites corriger vos textes par le [simulateur d’expression écrite](/epreuve/expression-ecrite/simulateur/) : note indicative sur 20, erreurs expliquées et version améliorée.',
      'Chronométrez-vous sur l’heure complète au moins une fois par semaine.',
    ] },
    { type: 'p', text: 'Rappel du barème : une note de **10 sur 20** correspond au NCLC 7, **12** au NCLC 8 et **14** au NCLC 9, d’après le [tableau d’IRCC](https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html).' },
  ],
  sources: [
    { label: 'France Éducation international : TCF Canada (présentation des épreuves)', href: 'https://www.france-education-international.fr/test/tcf-canada' },
    { label: 'IRCC : tableau de correspondance TCF Canada et NCLC', href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html' },
  ],
  related: ['expression-orale-tcf-canada-3-taches', 'niveaux-nclc-bareme-tcf-canada', 'preparation-tcf-canada-planning-30-jours'],
};
