// Ready-to-use answer structures for the expression tasks, shown on /modeles-de-reponses/.
// Original material written for this platform. Brackets mark what the candidate fills in.

export interface Skeleton {
  label: string;
  text: string;
}

export interface ExpressionGroup {
  title: string;
  items: string[];
}

export interface AnswerTemplate {
  id: string;
  epreuve: 'ee' | 'eo';
  task: 1 | 2 | 3;
  title: string;
  /** What the task asks, in one or two sentences. */
  summary: string;
  /** Length or duration, as on the exam. */
  meta: string;
  skeletons: Skeleton[];
  expressions: ExpressionGroup[];
  /** Expression orale, tâche 2: questions to ask, by theme. */
  questionBank?: ExpressionGroup[];
  mistakes: string[];
  example: { prompt: string; text: string; note: string };
}

export const answerTemplates: AnswerTemplate[] = [
  // ——— Expression écrite ———
  {
    id: 'ee-tache-1',
    epreuve: 'ee',
    task: 1,
    title: 'Tâche 1 : le message',
    summary: 'Un message à un ou plusieurs destinataires nommés dans la consigne, qui traite les trois points demandés (décrire, expliquer, inviter, remercier, proposer…).',
    meta: '60 à 120 mots · environ 10 minutes',
    skeletons: [
      {
        label: 'Version « tu » (ami, proche, collègue familier)',
        text: `Salut [prénom],

J’espère que tu vas bien ! Je t’écris parce que [raison du message].

[Point 1 de la consigne : une ou deux phrases avec un détail concret (lieu, date, prix…)].

[Point 2 de la consigne : une ou deux phrases]. En plus, [précision ou deuxième détail].

[Point 3 de la consigne : proposition, invitation ou question]. Est-ce que tu serais disponible [jour] vers [heure] ?

Dis-moi ce que tu en penses !

À bientôt,
[Votre prénom]`,
      },
      {
        label: 'Version « vous » (voisin, formateur, responsable, inconnu)',
        text: `Bonjour Madame [nom] / Bonjour Monsieur [nom],

Je me permets de vous écrire au sujet de [raison du message].

[Point 1 de la consigne : une ou deux phrases avec un détail concret].

[Point 2 de la consigne : une ou deux phrases]. Par ailleurs, [précision].

[Point 3 de la consigne : demande ou proposition]. Pourriez-vous [action demandée] ? / Seriez-vous disponible [jour] à [heure] ?

Je vous remercie par avance de votre réponse.

Cordialement,
[Prénom Nom]`,
      },
    ],
    expressions: [
      { title: 'Ouvrir le message', items: ['Je t’écris pour te dire que…', 'Je me permets de vous écrire au sujet de…', 'Comme promis, je te donne des nouvelles…', 'Je viens d’apprendre que…'] },
      { title: 'Enchaîner les points', items: ['D’abord… Ensuite… Enfin…', 'Par ailleurs…', 'En plus… / De plus…', 'Quant à [sujet]…', 'C’est pourquoi…'] },
      { title: 'Proposer, inviter', items: ['Ça te dirait de… ?', 'Je te propose de…', 'Que dirais-tu de… ?', 'Seriez-vous disponible pour… ?', 'Nous serions ravis de vous accueillir…'] },
      { title: 'S’excuser, remercier', items: ['Je suis vraiment désolé(e), mais…', 'Je vous prie de m’excuser pour…', 'Merci encore pour…', 'Je tenais à vous remercier chaleureusement de…'] },
      { title: 'Conclure', items: ['Dis-moi si ça te convient.', 'J’attends ta réponse avec impatience !', 'N’hésitez pas à me contacter au [numéro].', 'Je vous remercie par avance.'] },
      { title: 'Formules finales', items: ['À bientôt, / Bises, / Amitiés, (tu)', 'Cordialement, / Bien cordialement, (vous)', 'Bien à vous, (vous, un peu plus chaleureux)'] },
    ],
    mistakes: [
      'Oublier un des trois points de la consigne : relisez-la et cochez chaque point traité.',
      'Mélanger « tu » et « vous » dans le même message, ou tutoyer un voisin que l’on connaît peu.',
      'Rester vague : « bientôt », « quelque part ». Donnez un jour, une heure, un lieu, un prix.',
      'Oublier la formule d’appel ou la signature : c’est un message, pas une rédaction.',
      'Dépasser largement 120 mots : le temps perdu manquera pour la tâche 3.',
    ],
    example: {
      prompt: 'Votre collègue Julie vous invite à dîner samedi soir, mais vous ne pouvez pas venir. Écrivez-lui un message pour refuser, expliquer pourquoi et proposer une autre date.',
      text: `Salut Julie,

Merci beaucoup pour ton invitation, ça me touche vraiment ! Malheureusement, je ne pourrai pas venir samedi soir.

Mes parents arrivent de Douala ce jour-là et je dois aller les chercher à l’aéroport vers 21 h. Je ne les ai pas vus depuis deux ans, donc je ne veux pas manquer leur arrivée.

Est-ce que ça te dirait de déplacer le dîner au samedi suivant ? Je pourrais apporter le dessert : je fais un très bon gâteau à l’ananas !

Dis-moi si ça te convient.

À bientôt,
Carine`,
      note: 'Environ 90 mots. Les trois points sont traités dans l’ordre (refus, raison précise, nouvelle proposition), le tutoiement est cohérent et la proposition est concrète.',
    },
  },
  {
    id: 'ee-tache-2',
    epreuve: 'ee',
    task: 2,
    title: 'Tâche 2 : le récit ou l’article',
    summary: 'Un article, un courrier ou une note pour plusieurs lecteurs, qui raconte une expérience ou un événement, puis donne un avis ou une recommandation.',
    meta: '120 à 150 mots · environ 20 minutes',
    skeletons: [
      {
        label: 'Structure du récit',
        text: `[Titre accrocheur]

[Situation : quand, où, avec qui, pourquoi.] Le [date ou moment], j’ai [participé à / visité / organisé] [événement] à [lieu], avec [personnes].

[Début, à l’imparfait pour le décor :] Au début, il [faisait / y avait] [description], et je me sentais [sentiment].

[Événements, au passé composé, avec des connecteurs de temps :] D’abord, nous avons [action 1]. Ensuite, [action 2]. Au bout de [durée], [action 3].

[Moment marquant et sentiments :] Ce qui m’a le plus [marqué / surpris / touché], c’est [détail précis]. J’étais [fier / ému / étonné] de [raison].

[Conclusion : avis, leçon, recommandation :] Finalement, cette expérience m’a [appris / permis de] [bilan]. Je la recommande à [public], car [raison]. [Question ou invitation aux lecteurs] ?`,
      },
    ],
    expressions: [
      { title: 'Situer le récit', items: ['Le mois dernier, …', 'Il y a deux semaines, …', 'Samedi dernier, …', 'À l’occasion de…', 'Lors de…'] },
      { title: 'Connecteurs de temps', items: ['D’abord / Tout d’abord', 'Ensuite / Puis', 'Au bout d’une heure', 'Pendant ce temps', 'Soudain / Tout à coup', 'Finalement / Enfin'] },
      { title: 'Exprimer ses sentiments', items: ['J’étais à la fois stressé(e) et impatient(e).', 'Ce qui m’a le plus surpris, c’est…', 'J’ai été très touché(e) par…', 'Je ne m’attendais pas à…'] },
      { title: 'Donner son avis', items: ['À mon avis, …', 'Je trouve que…', 'Selon moi, c’est une expérience qui…', 'Ce qui m’a plu, c’est que…'] },
      { title: 'Conclure, recommander', items: ['Au final, je garde un excellent souvenir de…', 'Cette expérience m’a appris que…', 'Je vous recommande vivement…', 'Qui veut se joindre à nous l’année prochaine ?'] },
    ],
    mistakes: [
      'Écrire au présent : un récit d’expérience se raconte au passé.',
      'Mettre tout à l’imparfait ou tout au passé composé : l’imparfait décrit le décor, le passé composé fait avancer l’action.',
      'Oublier l’avis ou la recommandation demandés à la fin.',
      'Écrire une liste d’actions sans connecteurs : « on a fait ça, on a fait ça… ».',
      'Oublier les accords du participe passé avec « être » : « nous sommes arrivés », « elle est partie ».',
    ],
    example: {
      prompt: 'Vous avez participé à une journée de nettoyage dans votre quartier. Racontez cette journée dans un article pour le journal de votre quartier et dites ce que vous en avez pensé.',
      text: `Une matinée pour un quartier plus propre

Samedi dernier, une trentaine d’habitants se sont retrouvés au parc Lafontaine pour nettoyer le quartier, à l’initiative de l’association des locataires.

Au début, il faisait froid et nous étions un peu timides. D’abord, les organisateurs nous ont distribué des gants et des sacs. Ensuite, nous avons formé des équipes pour ramasser les déchets dans les rues voisines. Au bout de deux heures, nous avions rempli plus de quarante sacs !

Ce qui m’a le plus surprise, c’est la quantité de bouteilles en plastique cachées sous les buissons. J’ai aussi été touchée par les enfants, très fiers de montrer leurs trouvailles.

Finalement, cette matinée m’a permis de rencontrer mes voisins et de voir mon quartier autrement. Je recommande à tous de participer à la prochaine édition, en avril : qui vient avec moi ?`,
      note: 'Environ 145 mots. Titre, situation, déroulement avec connecteurs, moment marquant et sentiments, avis et invitation finale : toutes les étapes sont présentes, avec une bonne alternance imparfait et passé composé.',
    },
  },
  {
    id: 'ee-tache-3',
    epreuve: 'ee',
    task: 3,
    title: 'Tâche 3 : comparer deux points de vue',
    summary: 'À partir de deux courts documents qui s’opposent, un texte en deux parties : d’abord la synthèse neutre des deux positions, puis votre opinion argumentée.',
    meta: '120 à 180 mots au total · environ 30 minutes',
    skeletons: [
      {
        label: 'Partie 1 : la synthèse (40 à 60 mots)',
        text: `Le premier document [affirme / soutient / estime] que [position 1], car [argument principal du document 1].

En revanche, le second document [considère / souligne / rappelle] que [position 2], notamment parce que [argument principal du document 2].`,
      },
      {
        label: 'Partie 2 : votre opinion (80 à 120 mots)',
        text: `Pour ma part, je pense que [votre position claire].

D’abord, [argument 1]. Par exemple, [exemple concret : votre ville, votre travail, un proche].

Ensuite, [argument 2], ce qui [conséquence].

Certes, [concession : vous reconnaissez un point de l’autre position], mais [réponse à cette objection].

En conclusion, [rappel de votre position], à condition que [nuance ou proposition].`,
      },
    ],
    expressions: [
      { title: 'Présenter les documents (synthèse)', items: ['Le premier document affirme que…', 'Selon l’auteur du second texte, …', 'Le document 1 met en avant…', 'Le second insiste sur…', 'Les deux textes s’opposent sur la question de…'] },
      { title: 'Opposer', items: ['En revanche, …', 'Au contraire, …', 'À l’inverse, …', 'Tandis que… / Alors que…'] },
      { title: 'Donner son opinion', items: ['Pour ma part, je pense que…', 'À mon sens, …', 'Je suis convaincu(e) que…', 'Il me semble que…', 'Je suis plutôt favorable à… / opposé(e) à…'] },
      { title: 'Connecteurs logiques', items: ['D’abord… Ensuite… Enfin…', 'De plus / En outre', 'C’est pourquoi / Par conséquent', 'En effet (pour justifier)', 'Grâce à… / À cause de…'] },
      { title: 'Nuancer, concéder', items: ['Certes…, mais…', 'Il est vrai que…, cependant…', 'Même si…, …', 'Cela dit, …', 'Dans une certaine mesure, …'] },
      { title: 'Donner un exemple', items: ['Par exemple, …', 'Prenons le cas de…', 'C’est le cas notamment de…', 'Dans ma ville, …', 'Je pense notamment à…'] },
      { title: 'Conclure', items: ['En conclusion, …', 'Pour conclure, …', 'En somme, …', '…, à condition que + subjonctif', 'L’idéal serait de…'] },
    ],
    mistakes: [
      'Donner son avis dès la synthèse : la première partie doit rester neutre.',
      'Recopier des phrases des documents au lieu de les reformuler.',
      'Ne pas séparer nettement les deux parties (sautez une ligne).',
      'Une opinion sans exemple concret, ou deux arguments qui disent la même chose.',
      'Manquer de temps : cette tâche compte beaucoup, gardez-lui au moins 25 minutes.',
    ],
    example: {
      prompt: 'Document 1 : « Interdire les voitures au centre-ville réduit la pollution et rend les rues aux piétons. » Document 2 : « Une telle interdiction pénalise les commerçants et les personnes qui habitent loin des transports en commun. » Faut-il interdire les voitures dans le centre-ville ?',
      text: `Le premier document est favorable à l’interdiction des voitures en centre-ville, car elle diminuerait la pollution et redonnerait l’espace aux piétons. En revanche, le second estime que cette mesure nuirait aux commerces et aux habitants mal desservis par les transports en commun.

Pour ma part, je pense qu’il faut limiter fortement la voiture au centre-ville, sans l’interdire totalement. D’abord, l’air y serait plus sain : par exemple, depuis que ma ville a rendu sa rue principale piétonne le week-end, on y voit beaucoup plus de familles. Ensuite, moins de circulation signifie moins d’accidents et moins de bruit. Certes, les commerçants craignent de perdre des clients, mais des parkings à l’entrée de la ville et des navettes gratuites pourraient résoudre ce problème. En conclusion, je suis favorable à cette évolution, à condition qu’elle s’accompagne de vraies solutions de transport.`,
      note: 'Synthèse d’environ 50 mots, neutre et reformulée ; opinion d’environ 110 mots avec une position nuancée, deux arguments, un exemple vécu, une concession et une conclusion.',
    },
  },

  // ——— Expression orale ———
  {
    id: 'eo-tache-1',
    epreuve: 'eo',
    task: 1,
    title: 'Tâche 1 : l’entretien dirigé',
    summary: 'L’examinateur vous pose des questions sur vous. Il ne s’agit pas de réciter, mais de développer chaque réponse avec des détails et des raisons.',
    meta: 'Environ 2 minutes · sans préparation',
    skeletons: [
      {
        label: 'Plan de présentation en cinq blocs',
        text: `[Identité] Je m’appelle [prénom], j’ai [âge] ans. Je viens de [ville, pays] et j’habite actuellement à [ville], dans le quartier de [quartier].

[Famille] Je suis [marié(e) / célibataire], et [j’ai deux enfants de … ans / je vis avec …].

[Études et travail] J’ai étudié [domaine] à [établissement]. Aujourd’hui, je travaille comme [métier] chez [type d’entreprise] depuis [durée]. Ce que j’aime dans ce métier, c’est [raison].

[Loisirs] Pendant mon temps libre, j’aime [activité], surtout [quand / avec qui]. Ça me permet de [bienfait].

[Projet] J’aimerais m’installer au Canada parce que [raison]. Là-bas, je souhaiterais [projet professionnel ou personnel].`,
      },
    ],
    expressions: [
      { title: 'Développer une réponse', items: ['…, parce que…', '…, ce qui me permet de…', 'Par exemple, …', 'D’ailleurs, …', 'Depuis [durée], …'] },
      { title: 'Parler de ses goûts', items: ['Ce qui me plaît, c’est…', 'Je suis passionné(e) par…', 'J’adore… / Je déteste…', 'Je ne suis pas très… mais…'] },
      { title: 'Parler de ses projets', items: ['J’aimerais…', 'Je compte…', 'Mon objectif est de…', 'Dans cinq ans, je me vois…'] },
      { title: 'Gagner un instant', items: ['C’est une bonne question…', 'Laissez-moi réfléchir un instant…', 'Comment dire… ?'] },
      { title: 'Faire répéter poliment', items: ['Pardon, pourriez-vous répéter la question ?', 'Excusez-moi, je n’ai pas bien compris.'] },
    ],
    mistakes: [
      'Répondre par un seul mot ou par oui / non : développez toujours en deux ou trois phrases.',
      'Réciter un texte appris par cœur, sans écouter la question.',
      'Parler trop vite par stress : un débit posé est plus clair.',
      'Utiliser le présent pour le passé : « J’ai étudié », « Je suis arrivé(e) en 2023 ».',
    ],
    example: {
      prompt: 'Examinateur : « Parlez-moi un peu de votre travail. »',
      text: `Je suis comptable dans une entreprise de transport à Douala, depuis maintenant six ans. Je m’occupe surtout de la paie et des déclarations fiscales. Ce qui me plaît dans ce métier, c’est la précision : j’aime quand les chiffres sont justes et que tout est bien organisé. En plus, je travaille avec une équipe très sympathique. Au Canada, j’aimerais continuer dans la comptabilité, et peut-être obtenir un titre professionnel canadien.`,
      note: 'La réponse donne le métier, le lieu, la durée, les tâches, une raison personnelle et un lien avec le projet canadien : l’examinateur a de quoi enchaîner.',
    },
  },
  {
    id: 'eo-tache-2',
    epreuve: 'eo',
    task: 2,
    title: 'Tâche 2 : l’exercice en interaction',
    summary: 'Une situation du quotidien : vous devez obtenir des informations en posant des questions à l’examinateur, qui joue votre interlocuteur. C’est vous qui menez l’échange.',
    meta: 'Environ 5 min 30, dont 2 minutes de préparation',
    skeletons: [
      {
        label: 'Déroulé de l’échange',
        text: `[Ouverture polie] Bonjour [Madame / Monsieur], je vous [appelle / contacte] au sujet de [annonce, inscription, service]. Est-ce que je peux vous poser quelques questions ?

[Questions sur l’essentiel] Pourriez-vous me dire [prix / horaires / lieu] ? Est-ce que [condition] ?

[Réaction et relance] D’accord, c’est [intéressant / un peu cher]. Et est-ce qu’il y a [réduction / autre option] ?

[Précisions] Combien de temps [durée] ? Qu’est-ce qu’il faut prévoir pour [inscription, paiement] ?

[Reformulation] Si je comprends bien, [résumé des informations obtenues], c’est bien ça ?

[Clôture] Merci beaucoup pour ces informations. Je vais [réfléchir / passer / vous rappeler] [moment]. Bonne journée !`,
      },
    ],
    questionBank: [
      { title: 'Logement', items: ['L’appartement est-il toujours disponible ?', 'À combien s’élève le loyer, charges comprises ?', 'Est-ce que le chauffage et l’électricité sont inclus ?', 'Combien de chambres y a-t-il ?', 'Le logement est-il meublé ?', 'Est-il possible de le visiter cette semaine ?', 'Quels documents faut-il fournir pour le dossier ?'] },
      { title: 'Études et cours', items: ['Quand commence la prochaine session ?', 'Combien d’heures de cours y a-t-il par semaine ?', 'Les cours ont-ils lieu le soir ou le week-end ?', 'Faut-il passer un test de niveau ?', 'Quel est le prix total de la formation ?', 'Peut-on payer en plusieurs fois ?', 'Est-ce qu’on obtient une attestation à la fin ?'] },
      { title: 'Travail', items: ['En quoi consiste exactement le poste ?', 'Quels sont les horaires de travail ?', 'Le poste est-il à temps plein ou à temps partiel ?', 'Quel est le salaire proposé ?', 'Y a-t-il une période d’essai ?', 'Le télétravail est-il possible ?', 'Quand pourrais-je commencer ?'] },
      { title: 'Loisirs et sport', items: ['Quelles activités proposez-vous ?', 'Combien coûte l’abonnement mensuel ?', 'Y a-t-il des tarifs pour les étudiants ou les familles ?', 'Est-ce que la première séance est gratuite ?', 'Faut-il apporter son propre matériel ?', 'À quelle heure la salle ouvre-t-elle le dimanche ?'] },
      { title: 'Achats et services', items: ['Ce modèle existe-t-il dans une autre couleur ?', 'Quelle est la durée de la garantie ?', 'Est-ce que la livraison est comprise dans le prix ?', 'Dans combien de jours pourrais-je le recevoir ?', 'Peut-on l’échanger s’il ne convient pas ?', 'Acceptez-vous le paiement par carte ?'] },
      { title: 'Voyages et transports', items: ['À quelle heure part le premier train pour Québec ?', 'Combien de temps dure le trajet ?', 'Faut-il réserver à l’avance ?', 'Le billet est-il remboursable ?', 'Y a-t-il une réduction pour un aller-retour ?', 'Le petit-déjeuner est-il inclus à l’hôtel ?'] },
    ],
    expressions: [
      { title: 'Formes interrogatives à varier', items: ['Intonation : C’est loin du métro ?', 'Est-ce que : Est-ce que les animaux sont acceptés ?', 'Inversion : Proposez-vous des cours le soir ?', 'Mot interrogatif : Combien… ? Quand… ? Où… ? Comment… ? Pourquoi… ?', 'Quel / Quelle : Quels sont les horaires ?', 'Question indirecte : Pourriez-vous me dire si… / à quelle heure… ?', 'Conditionnel poli : Serait-il possible de… ?'] },
      { title: 'Ouvertures polies', items: ['Bonjour Madame, je vous appelle au sujet de…', 'Excusez-moi de vous déranger, j’aurais quelques questions sur…', 'J’ai vu votre annonce sur…, et j’aimerais avoir des précisions.'] },
      { title: 'Réagir et relancer', items: ['Ah, d’accord, je vois.', 'C’est parfait. Et en ce qui concerne… ?', 'C’est un peu au-dessus de mon budget. Est-ce qu’il y a une autre formule ?', 'Et si jamais… ?'] },
      { title: 'Vérifier, reformuler', items: ['Si je comprends bien, …', 'Donc, si je résume, …', 'Vous voulez dire que… ?'] },
      { title: 'Clôtures polies', items: ['Merci beaucoup pour toutes ces informations.', 'Je vais y réfléchir et je vous rappelle demain.', 'Je passerai samedi pour m’inscrire. Bonne journée !'] },
    ],
    mistakes: [
      'Attendre que l’examinateur parle : c’est vous qui posez les questions.',
      'Enchaîner les questions sans écouter ni réagir aux réponses.',
      'Utiliser toujours la même forme (« Est-ce que… ? ») : variez.',
      'Oublier l’ouverture et la clôture polies.',
      'Utiliser le tutoiement avec un interlocuteur professionnel.',
    ],
    example: {
      prompt: 'Vous voulez vous inscrire dans une salle de sport près de chez vous. Vous posez des questions au réceptionniste.',
      text: `Candidat : Bonjour Monsieur. J’habite dans le quartier et j’aimerais m’inscrire à la salle. Je peux vous poser quelques questions ?
Examinateur : Bien sûr, je vous écoute.
Candidat : Quels sont vos horaires d’ouverture ?
Examinateur : De 6 h à 22 h en semaine, et de 8 h à 18 h le week-end.
Candidat : Parfait, je pourrai venir avant le travail. Combien coûte l’abonnement ?
Examinateur : 45 $ par mois, avec un engagement d’un an.
Candidat : Ah, d’accord. Et est-ce qu’il existe une formule sans engagement ?
Examinateur : Oui, à 60 $ par mois.
Candidat : Je vois. Les cours collectifs sont-ils compris dans le prix ?
Examinateur : Oui, tous les cours sont inclus.
Candidat : Très bien. Si je comprends bien, avec l’abonnement à 45 $, j’ai accès à la salle et à tous les cours, c’est ça ?
Examinateur : Exactement.
Candidat : Merci beaucoup. Je reviens samedi pour m’inscrire. Bonne journée !`,
      note: 'Ouverture polie, questions variées (mot interrogatif, est-ce que, inversion), réactions aux réponses, reformulation et clôture : le candidat mène l’échange.',
    },
  },
  {
    id: 'eo-tache-3',
    epreuve: 'eo',
    task: 3,
    title: 'Tâche 3 : exprimer un point de vue',
    summary: 'L’examinateur pose une question de société. Vous donnez votre avis et le défendez de manière continue et convaincante, puis répondez à ses relances.',
    meta: 'Environ 4 min 30 · sans préparation',
    skeletons: [
      {
        label: 'Plan de l’exposé',
        text: `[Introduction : reformuler la question] On me demande si [question reformulée]. C’est un sujet important aujourd’hui, parce que [contexte].

[Position] Personnellement, je [suis plutôt favorable / opposé(e)] à [idée].

[Argument 1 + exemple] D’abord, [argument 1]. Par exemple, [situation vécue ou observée].

[Argument 2 + exemple] Ensuite, [argument 2]. C’est le cas notamment de [exemple].

[Nuance] Cela dit, je reconnais que [point de vue opposé]. Mais [votre réponse].

[Conclusion] En résumé, je pense que [position], à condition que [nuance].`,
      },
    ],
    expressions: [
      { title: 'Introduire le sujet', items: ['La question est de savoir si…', 'C’est un sujet dont on parle beaucoup en ce moment.', 'C’est une question complexe, mais…'] },
      { title: 'Donner son opinion', items: ['Personnellement, je pense que…', 'À mon avis, …', 'Je suis persuadé(e) que…', 'J’ai le sentiment que…', 'De mon point de vue, …'] },
      { title: 'Connecteurs logiques', items: ['D’abord / Premièrement', 'Ensuite / De plus', 'Enfin / Pour finir', 'Car / En effet', 'Donc / C’est pourquoi'] },
      { title: 'Nuancer', items: ['Cela dit, …', 'Il est vrai que…, mais…', 'Ça dépend de…', 'Dans certains cas, …', 'Je ne dirais pas que…, plutôt que…'] },
      { title: 'Donner un exemple', items: ['Je vais vous donner un exemple : …', 'Dans mon pays, …', 'J’ai un ami qui…', 'Prenons l’exemple de…'] },
      { title: 'Répondre à une objection', items: ['Je comprends votre point de vue, mais…', 'C’est vrai, cependant…', 'Je ne suis pas tout à fait d’accord, parce que…'] },
      { title: 'Conclure', items: ['En résumé, …', 'Pour conclure, …', 'Finalement, je dirais que…', 'L’essentiel, c’est de…'] },
    ],
    mistakes: [
      'Rester neutre ou changer de position quand l’examinateur vous contredit.',
      'Annoncer des arguments sans les illustrer par un exemple.',
      'S’arrêter au bout d’une minute : développez chaque argument.',
      'Lire mentalement un texte préparé au lieu de parler naturellement.',
      'Laisser de longs silences : utilisez une formule pour gagner du temps.',
    ],
    example: {
      prompt: 'Examinateur : « Selon vous, les réseaux sociaux rapprochent-ils les gens ? »',
      text: `On me demande si les réseaux sociaux rapprochent les gens. C’est une question importante, parce qu’aujourd’hui presque tout le monde les utilise. Personnellement, je pense qu’ils rapprochent les personnes éloignées, mais qu’ils peuvent éloigner celles qui sont proches.

D’abord, ils permettent de garder le contact malgré la distance. Par exemple, ma sœur vit à Montréal et moi à Yaoundé : grâce aux appels vidéo, nous nous voyons chaque semaine et mes enfants connaissent leurs cousins.

Ensuite, ils aident à rencontrer des gens qui partagent nos passions. J’ai un ami qui a trouvé un club de course grâce à un groupe en ligne.

Cela dit, je reconnais qu’on passe parfois plus de temps sur son téléphone qu’avec sa famille, même pendant les repas. C’est pourquoi il faut fixer des limites.

En résumé, je dirais que les réseaux sociaux rapprochent les gens, à condition de les utiliser comme un complément, et pas à la place des vraies rencontres.`,
      note: 'Une position nette mais nuancée, deux arguments illustrés par des exemples personnels, une concession et une conclusion qui reprend la position.',
    },
  },
];

export const templatesFor = (epreuve: 'ee' | 'eo') => answerTemplates.filter((t) => t.epreuve === epreuve);
