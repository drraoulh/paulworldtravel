import type { Article } from './types';

export const guideComplet: Article = {
  slug: 'tcf-canada-guide-complet-2026',
  title: 'TCF Canada : le guide complet 2026',
  description: 'Format, durées, déroulement des quatre épreuves, scores, NCLC, délais de résultats et validité de deux ans : tout ce qu’il faut savoir avant de s’inscrire au TCF Canada.',
  category: 'L’examen',
  published: '2026-11-05',
  image: { src: '/images/examen.jpg', alt: 'Une salle d’examen prête pour une session' },
  lead: 'Le TCF Canada est l’un des deux tests de français acceptés par Immigration, Réfugiés et Citoyenneté Canada (IRCC). Voici, d’après les sources officielles, comment il se déroule, comment il est noté et combien de temps vos résultats restent valables.',
  blocks: [
    { type: 'h2', id: 'a-quoi-sert', text: 'À quoi sert le TCF Canada ?' },
    { type: 'p', text: 'Le Test de connaissance du français pour le Canada est conçu par **France Éducation international** (FEI), un établissement public français. Il s’adresse à toute personne qui doit prouver son niveau de français dans le cadre d’une démarche d’immigration économique au Canada ou d’une demande de citoyenneté canadienne.' },
    { type: 'p', text: 'IRCC l’accepte pour **Entrée express** (travailleurs qualifiés, catégorie de l’expérience canadienne, métiers spécialisés), pour plusieurs programmes fédéraux et pour la citoyenneté. Depuis fin janvier 2022, il est aussi reconnu par le ministère de l’Immigration du Québec (MIFI) pour les demandes d’immigration dans cette province, selon la [page officielle du TCF Canada](https://www.france-education-international.fr/test/tcf-canada).' },
    { type: 'callout', title: 'À retenir', text: 'Il existe plusieurs déclinaisons du TCF (tout public, Québec, IRN…). Pour un dossier fédéral, c’est bien le **TCF Canada** qu’il faut passer. Vérifiez l’intitulé exact au moment de réserver votre place.' },

    { type: 'h2', id: 'les-quatre-epreuves', text: 'Les quatre épreuves et leur durée' },
    { type: 'p', text: 'Le TCF Canada comprend quatre épreuves obligatoires. Il n’est pas possible d’en passer une seule, ni d’en être dispensé. La durée totale est de **2 h 47**.' },
    {
      type: 'table',
      caption: 'Format officiel publié par France Éducation international',
      head: ['Épreuve', 'Contenu', 'Durée', 'Résultat'],
      rows: [
        ['Compréhension orale', '39 questions à choix multiple, 4 réponses proposées, une seule correcte', '35 min', 'Score de 100 à 699'],
        ['Compréhension écrite', '39 questions à choix multiple, 4 réponses proposées, une seule correcte', '60 min', 'Score de 100 à 699'],
        ['Expression écrite', '3 tâches de rédaction', '60 min', 'Note de 0 à 20'],
        ['Expression orale', '3 tâches en face à face avec un examinateur', '12 min, dont 2 min de préparation', 'Note de 0 à 20'],
      ],
    },
    { type: 'p', text: 'Les deux compréhensions et l’expression écrite sont des épreuves **collectives** : tous les candidats les passent en même temps, sur papier ou sur ordinateur selon le centre. L’expression orale est **individuelle** et se déroule face à un examinateur, parfois à un autre moment de la journée.' },

    { type: 'h3', text: 'Compréhension orale' },
    { type: 'p', text: 'Vous écoutez des documents de plus en plus difficiles : messages, annonces, conversations, interviews, extraits d’émissions. Chaque document est diffusé **une seule fois**. Les questions vont du niveau A1 au niveau C2. Notre article [Réussir la compréhension orale](/blog/reussir-comprehension-orale-tcf-canada/) détaille la méthode.' },
    { type: 'h3', text: 'Compréhension écrite' },
    { type: 'p', text: 'Même principe à l’écrit : des documents courts au début (affiche, courriel, petite annonce), puis des articles et des textes argumentés. Avec 60 minutes pour 39 questions, la gestion du temps décide souvent du score. Voir [Réussir la compréhension écrite](/blog/reussir-comprehension-ecrite-tcf-canada/).' },
    { type: 'h3', text: 'Expression écrite' },
    { type: 'p', text: 'Trois rédactions en une heure : un message de 60 à 120 mots, un récit ou un article de 120 à 150 mots, puis un texte qui compare deux points de vue et donne le vôtre (120 à 180 mots). Le détail des trois tâches est dans [Expression écrite : les 3 tâches expliquées](/blog/expression-ecrite-tcf-canada-3-taches/).' },
    { type: 'h3', text: 'Expression orale' },
    { type: 'p', text: 'Douze minutes en trois temps : un entretien dirigé sur vous (environ 2 minutes, sans préparation), un exercice en interaction où vous posez des questions à l’examinateur (environ 5 min 30, dont 2 minutes de préparation), puis l’expression d’un point de vue (environ 4 min 30). Voir [Expression orale : les 3 tâches expliquées](/blog/expression-orale-tcf-canada-3-taches/).' },

    { type: 'h2', id: 'scores-et-nclc', text: 'Scores, niveaux CECR et NCLC' },
    { type: 'p', text: 'Votre attestation indique un résultat par épreuve : un score sur 699 pour chaque compréhension, une note sur 20 pour chaque expression, avec le niveau du Cadre européen (A1 à C2) correspondant. IRCC convertit ensuite chaque résultat en **niveau de compétence linguistique canadien** (NCLC), compétence par compétence.' },
    { type: 'p', text: 'C’est le NCLC qui compte dans votre dossier. Par exemple, le Programme des travailleurs qualifiés (fédéral) exige au moins le **NCLC 7 dans les quatre compétences** pour la première langue officielle, selon la [page d’IRCC sur les résultats d’examen linguistique](https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html). Le tableau complet et la façon de lire vos résultats sont expliqués dans [Comprendre les niveaux NCLC et le barème](/blog/niveaux-nclc-bareme-tcf-canada/).' },
    { type: 'callout', text: 'Le français peut aussi rapporter des points supplémentaires dans le Système de classement global (SCG) d’Entrée express : 25 ou 50 points si vous avez au moins le NCLC 7 dans les quatre compétences en français, selon votre niveau d’anglais ([critères du SCG sur canada.ca](https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/verifier-note/criteries-scg.html)). IRCC a consulté en 2026 sur une réforme de ces points : vérifiez la règle en vigueur au moment de votre profil.' },

    { type: 'h2', id: 'inscription', text: 'Comment s’inscrire' },
    { type: 'p', text: 'On ne s’inscrit pas auprès de France Éducation international, mais directement auprès d’un **centre de passation agréé** : Institut français, Alliance française, université ou école. Chaque centre fixe son calendrier, son tarif et ses modalités (papier ou ordinateur). FEI publie la [carte des centres de passation](https://www.france-education-international.fr/centres-d-examen/liste) pour trouver le plus proche.' },
    { type: 'ul', items: [
      'Au Cameroun, l’inscription à l’Institut français se fait en ligne : voir [S’inscrire au TCF Canada au Cameroun](/blog/tcf-canada-cameroun-centres-prix-inscription/).',
      'Au Canada, chaque centre a sa propre procédure : voir [Passer le TCF Canada au Canada](/blog/passer-tcf-canada-au-canada/).',
      'Le jour de l’examen, présentez-vous avec votre convocation et une pièce d’identité valide, celle utilisée à l’inscription.',
    ] },
    { type: 'p', text: 'Vous pouvez vous présenter au TCF Canada autant de fois que vous le souhaitez, mais FEI impose d’attendre **20 jours entre deux passations** de cette déclinaison du test.' },

    { type: 'h2', id: 'resultats-et-validite', text: 'Résultats et validité' },
    { type: 'p', text: 'Selon FEI, les résultats sont disponibles dans votre espace candidat et transmis au centre dans un délai de **15 jours ouvrés** à compter de la réception du matériel de session par France Éducation international. Dans la pratique, comptez aussi le temps d’acheminement depuis votre centre : renseignez-vous auprès de lui.' },
    { type: 'p', text: 'Pour IRCC, vos résultats doivent avoir **moins de deux ans** au moment où vous créez votre profil Entrée express **et** au moment où vous présentez votre demande de résidence permanente. Si votre attestation risque d’expirer pendant que vous êtes dans le bassin, prévoyez de repasser le test à temps.' },
    { type: 'callout', tone: 'warning', title: 'Recorrection suspendue', text: 'France Éducation international annonce qu’à partir des sessions du 1er septembre 2026, les demandes de recorrection des épreuves d’expression orale et écrite ne sont plus acceptées, pour une période d’environ un an. Raison de plus pour arriver bien préparé.' },

    { type: 'h2', id: 'se-preparer', text: 'Par où commencer sa préparation' },
    { type: 'p', text: 'Le TCF Canada ne repose sur aucun programme de cours : il mesure votre capacité générale à utiliser le français. La préparation consiste donc surtout à connaître le format, à vous entraîner dans les conditions réelles et à travailler vos points faibles.' },
    { type: 'ol', items: [
      'Faites le [test de niveau gratuit](/test-de-niveau/) pour savoir d’où vous partez.',
      'Lisez les leçons de méthode de chaque épreuve, puis faites une première série chronométrée en [compréhension orale](/epreuve/comprehension-orale/series/) et en [compréhension écrite](/epreuve/comprehension-ecrite/series/).',
      'Apprenez les structures des tâches d’expression avec nos [modèles de réponses](/modeles-de-reponses/), puis rédigez et parlez dans les simulateurs.',
      'Terminez par un [examen blanc complet](/examen-blanc/) quelques jours avant la date.',
    ] },
    { type: 'p', text: 'Combien de temps prévoir ? Cela dépend de l’écart entre votre niveau et le NCLC visé. Notre article [Combien de temps pour se préparer](/blog/preparation-tcf-canada-planning-30-jours/) propose un planning de 30 jours pour celles et ceux qui sont déjà proches de l’objectif.' },
  ],
  sources: [
    { label: 'France Éducation international : TCF Canada (format, inscription, résultats)', href: 'https://www.france-education-international.fr/test/tcf-canada' },
    { label: 'France Éducation international : carte des centres de passation', href: 'https://www.france-education-international.fr/centres-d-examen/liste' },
    { label: 'IRCC : Entrée express, résultats d’examen linguistique', href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html' },
    { label: 'IRCC : critères du Système de classement global', href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/verifier-note/criteries-scg.html' },
  ],
  related: ['niveaux-nclc-bareme-tcf-canada', 'tcf-canada-cameroun-centres-prix-inscription', 'preparation-tcf-canada-planning-30-jours'],
};
