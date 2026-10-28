import type { Module } from './types';

export const ce: Module = {
  id: 'ce',
  slug: 'comprehension-ecrite',
  name: 'Compréhension écrite',
  intro:
    'Lire vite et juste : des affiches et des courriels aux articles d’opinion. Ici, la gestion du temps et la lecture ciblée font gagner des dizaines de points.',
  facts: [
    { label: 'Durée', value: '60 minutes' },
    { label: 'Questions', value: '39 QCM, 4 choix' },
    { label: 'Rythme moyen', value: '1 min 30 par question' },
    { label: 'Score', value: '100 à 699' },
  ],
  tasks: [
    { title: 'Début de l’épreuve (A1-A2)', detail: 'Panneaux, horaires, petites annonces, messages courts. Une information à trouver rapidement.' },
    { title: 'Milieu de l’épreuve (B1-B2)', detail: 'Courriels, lettres, articles informatifs. Il faut comprendre l’objectif du texte et les relations entre les idées.' },
    { title: 'Fin de l’épreuve (C1-C2)', detail: 'Textes d’opinion, éditoriaux, extraits littéraires ou spécialisés. Les questions portent sur la thèse, l’implicite et la nuance.' },
  ],
  practice: { href: '/epreuve/comprehension-ecrite/series/', label: 'Faire la série de lecture' },
  lessons: [
    {
      slug: 'gerer-60-minutes',
      title: 'Gérer ses 60 minutes',
      minutes: 6,
      goal: 'Répartir son temps pour atteindre les dernières questions, qui rapportent le plus.',
      sections: [
        {
          heading: 'Un budget de temps, pas une course',
          paragraphs: [
            'Avec 39 questions en 60 minutes, la moyenne est d’environ 1 min 30 par question. Mais les textes s’allongent : il faut gagner du temps au début pour en avoir à la fin.',
          ],
          list: [
            'Questions 1 à 10 : environ 30 secondes chacune. Ce sont des documents très courts.',
            'Questions 11 à 25 : environ 1 min 15 chacune.',
            'Questions 26 à 39 : environ 2 min 30 chacune. Ce sont les textes les plus longs et les plus difficiles.',
          ],
        },
        {
          heading: 'Toujours répondre',
          paragraphs: [
            'Une question sans réponse ne rapporte rien. Si le temps presse ou si vous hésitez, éliminez ce qui est impossible et choisissez. Ne laissez jamais de case vide.',
          ],
        },
        {
          heading: 'Lire la question avant le texte',
          paragraphs: [
            'La question vous dit quoi chercher. Lisez-la, parcourez les propositions, puis lisez le texte avec cet objectif. Vous lirez plus vite et plus juste.',
          ],
        },
      ],
      pitfalls: [
        'Passer trois minutes sur une question facile du début.',
        'Relire tout le texte pour chaque proposition au lieu de chercher le passage utile.',
        'Laisser des questions vides à la fin.',
      ],
      quiz: [
        {
          prompt: 'Quelle est la durée moyenne disponible par question en compréhension écrite ?',
          choices: ['Environ 30 secondes', 'Environ 1 min 30', 'Environ 3 minutes', 'Environ 5 minutes'],
          answer: 1,
          explanation: '60 minutes pour 39 questions donnent un peu plus de 1 min 30 par question en moyenne.',
        },
        {
          prompt: 'Pourquoi aller vite sur les premières questions ?',
          choices: ['Parce qu’elles ne comptent pas', 'Pour garder du temps pour les textes longs de la fin', 'Parce qu’il faut finir en 30 minutes', 'Pour pouvoir relire le début'],
          answer: 1,
          explanation: 'Les derniers textes sont longs et difficiles : ils demandent plus de temps.',
        },
        {
          prompt: 'Il reste 30 secondes et vous hésitez entre deux réponses. Que faire ?',
          choices: ['Laisser vide', 'Choisir l’une des deux', 'Cocher deux réponses', 'Recommencer la question'],
          answer: 1,
          explanation: 'Une réponse vide ne rapporte rien. Entre deux propositions, vous avez une chance sur deux.',
        },
      ],
    },
    {
      slug: 'documents-pratiques',
      title: 'Affiches, annonces et horaires',
      minutes: 7,
      goal: 'Trouver une information précise sans tout lire.',
      sections: [
        {
          heading: 'La lecture repérage',
          paragraphs: [
            'Pour un document pratique, ne lisez pas ligne par ligne. Balayez le texte des yeux à la recherche du mot ou du chiffre lié à la question : une date, un prix, un lieu, une condition.',
          ],
        },
        {
          heading: 'Les conditions et les exceptions',
          paragraphs: [
            'Les questions portent souvent sur une règle et son exception. Repérez les mots qui limitent : « sauf », « uniquement », « seulement », « à condition de », « sur présentation de », « dans la limite des places disponibles ».',
          ],
        },
        {
          heading: 'Obligatoire ou conseillé ?',
          list: [
            'Obligatoire : exigé, obligatoire, indispensable, requis, il faut.',
            'Conseillé : recommandé, conseillé, apprécié, souhaité, de préférence.',
            'Interdit : interdit, défendu, il est interdit de, prière de ne pas.',
          ],
        },
      ],
      model: {
        title: 'Exemple commenté',
        text:
          'PISCINE MUNICIPALE — Bonnet de bain obligatoire. Accès gratuit pour les moins de 6 ans accompagnés d’un adulte. Fermeture du bassin extérieur en cas d’orage.',
        note:
          'Trois informations différentes : une obligation (bonnet), une condition (gratuit seulement si l’enfant a moins de 6 ans et vient avec un adulte), une exception (orage). Une question peut porter sur chacune.',
      },
      phrases: {
        heading: 'Mots qui limitent une règle',
        items: ['sauf', 'uniquement', 'seulement', 'à condition de', 'sur présentation de', 'dans la limite de', 'à l’exception de', 'hors'],
      },
      pitfalls: ['Oublier une condition (« accompagnés d’un adulte »).', 'Confondre « recommandé » et « obligatoire ».'],
      quiz: [
        {
          prompt: '« Entrée libre, sauf le dimanche : 5 $. » Combien coûte l’entrée le mardi ?',
          choices: ['5 $', 'Elle est gratuite', '10 $', 'Le document ne le dit pas'],
          answer: 1,
          explanation: 'L’entrée est libre (gratuite) tous les jours sauf le dimanche.',
        },
        {
          prompt: '« Réservation conseillée. » La réservation est :',
          choices: ['Obligatoire', 'Interdite', 'Recommandée mais pas obligatoire', 'Impossible'],
          answer: 2,
          explanation: '« Conseillée » signifie recommandée : on peut venir sans réserver.',
        },
        {
          prompt: '« Remboursement sur présentation du ticket de caisse. » Pour être remboursé, il faut :',
          choices: ['Téléphoner au magasin', 'Montrer le ticket de caisse', 'Revenir le jour même', 'Payer des frais'],
          answer: 1,
          explanation: '« Sur présentation de » indique une condition : montrer le ticket.',
        },
      ],
    },
    {
      slug: 'courriels-et-lettres',
      title: 'Courriels et lettres : l’objectif du message',
      minutes: 7,
      goal: 'Identifier qui écrit, à qui, et pour obtenir quoi.',
      sections: [
        {
          heading: 'Les questions types',
          list: [
            'Pourquoi cette personne écrit-elle ? (informer, se plaindre, demander, remercier, inviter)',
            'Que demande-t-elle au destinataire ?',
            'Quelle est la relation entre l’auteur et le destinataire ?',
          ],
        },
        {
          heading: 'Où trouver la réponse',
          paragraphs: [
            'L’objet du courriel et la première phrase annoncent souvent le thème. Mais la demande réelle se trouve fréquemment à la fin : « Je vous serais reconnaissant de… », « Pourriez-vous… », « Merci de me faire savoir… ».',
            'Le registre aide à comprendre la relation : « Cher collègue » ou « Madame la directrice » ne s’adressent pas à la même personne que « Salut Karim ! ».',
          ],
        },
      ],
      model: {
        title: 'Exemple commenté',
        text:
          'Objet : Commande n° 4521\nMadame, Monsieur,\nJ’ai reçu hier ma commande, mais l’un des deux fauteuils est abîmé. Je souhaiterais savoir si vous pouvez le remplacer, ou à défaut me rembourser. Je reste disponible pour envoyer des photos.\nCordialement,\nAmina Ndiaye',
        note:
          'L’objectif n’est pas seulement « informer d’un problème » : la cliente demande un remplacement ou un remboursement. La proposition « elle veut annuler toute la commande » est fausse.',
      },
      phrases: {
        heading: 'Formules qui signalent une demande',
        items: ['Je vous serais reconnaissant(e) de…', 'Pourriez-vous… ?', 'Merci de bien vouloir…', 'Je souhaiterais savoir si…', 'Auriez-vous l’amabilité de… ?'],
      },
      pitfalls: ['S’arrêter au premier paragraphe.', 'Choisir une réponse trop large (« elle se plaint ») quand une plus précise existe (« elle demande un remplacement »).'],
      quiz: [
        {
          prompt: '« Pourriez-vous m’indiquer les horaires de la formation du soir ? » L’auteur veut :',
          choices: ['S’inscrire immédiatement', 'Obtenir une information', 'Annuler une inscription', 'Se plaindre des horaires'],
          answer: 1,
          explanation: 'Il pose une question : il demande une information.',
        },
        {
          prompt: 'Un courriel commence par « Madame la directrice ». La relation est plutôt :',
          choices: ['Amicale', 'Familiale', 'Formelle et hiérarchique', 'Commerciale entre amis'],
          answer: 2,
          explanation: 'La formule d’appel indique un registre formel et une relation hiérarchique.',
        },
        {
          prompt: 'Où se trouve souvent la demande principale d’un courriel ?',
          choices: ['Dans l’objet uniquement', 'Vers la fin du message', 'Dans la signature', 'Dans la date'],
          answer: 1,
          explanation: 'Le début présente la situation ; la demande précise est souvent formulée à la fin.',
        },
      ],
    },
    {
      slug: 'textes-d-opinion',
      title: 'Articles et textes d’opinion',
      minutes: 9,
      goal: 'Dégager la thèse de l’auteur, ses arguments et ses nuances.',
      sections: [
        {
          heading: 'Repérer la thèse',
          paragraphs: [
            'La thèse est l’idée que l’auteur défend. Elle apparaît souvent dans l’introduction ou la conclusion, et peut être annoncée par « il faut », « il est temps de », « rien ne justifie », « on aurait tort de ».',
          ],
        },
        {
          heading: 'Suivre la logique grâce aux connecteurs',
          list: [
            'Opposition : mais, pourtant, cependant, en revanche, or.',
            'Concession : certes, bien que, même si, il est vrai que.',
            'Cause : car, puisque, en raison de, étant donné que.',
            'Conséquence : donc, ainsi, c’est pourquoi, si bien que.',
          ],
        },
        {
          heading: 'L’implicite',
          paragraphs: [
            'Au niveau C1, l’auteur ne dit pas toujours directement ce qu’il pense. L’ironie, les guillemets autour d’un mot (« progrès ») ou une question rhétorique (« Faut-il vraiment s’en réjouir ? ») révèlent une critique.',
          ],
        },
      ],
      model: {
        title: 'Exemple commenté',
        text:
          '« On nous promet des villes “intelligentes”, truffées de capteurs. Mais une ville intelligente est-elle celle qui collecte le plus de données, ou celle qui écoute le mieux ses habitants ? »',
        note:
          'Les guillemets et la question rhétorique montrent que l’auteur doute de cette promesse. Sa thèse implicite : la technologie ne suffit pas, il faut associer les habitants.',
      },
      phrases: {
        heading: 'Indices d’une critique implicite',
        items: ['des guillemets autour d’un mot', 'une question rhétorique', '« prétendu », « soi-disant »', '« on nous promet que… »', '« reste à savoir si… »'],
      },
      pitfalls: ['Confondre l’opinion que l’auteur rapporte et celle qu’il défend.', 'Ignorer le « mais » qui suit une concession.'],
      quiz: [
        {
          prompt: '« Certes, la réforme simplifie les démarches. Pourtant, elle oublie ceux qui n’ont pas Internet. » L’auteur est :',
          choices: ['Entièrement favorable', 'Critique malgré un avantage reconnu', 'Indifférent', 'Contre toute démarche en ligne'],
          answer: 1,
          explanation: 'Il reconnaît un avantage (certes), puis formule une critique (pourtant).',
        },
        {
          prompt: 'Un auteur écrit le mot « progrès » entre guillemets. Il veut probablement :',
          choices: ['Citer un dictionnaire', 'Exprimer un doute sur ce prétendu progrès', 'Féliciter les responsables', 'Définir le mot'],
          answer: 1,
          explanation: 'Les guillemets prennent ici une distance ironique avec le mot.',
        },
        {
          prompt: 'Quel connecteur exprime une conséquence ?',
          choices: ['Pourtant', 'Bien que', 'C’est pourquoi', 'Certes'],
          answer: 2,
          explanation: '« C’est pourquoi » introduit la conséquence de ce qui précède.',
        },
      ],
    },
    {
      slug: 'pieges-des-reponses',
      title: 'Les pièges des propositions',
      minutes: 6,
      goal: 'Éliminer les mauvaises propositions avec méthode.',
      sections: [
        {
          heading: 'Les quatre pièges classiques',
          list: [
            'Le mot recopié : la proposition reprend un mot exact du texte, mais dans un autre sens.',
            'L’absolu : « toujours », « jamais », « tous », « aucun » alors que le texte nuance.',
            'Le vrai hors sujet : l’information est dans le texte, mais ne répond pas à la question posée.',
            'L’extrapolation : la proposition va plus loin que ce que dit le texte.',
          ],
        },
        {
          heading: 'La méthode d’élimination',
          paragraphs: [
            'Pour chaque proposition, demandez-vous : « Le texte dit-il exactement cela ? » Si la réponse est « pas tout à fait », éliminez. La bonne réponse est souvent une reformulation fidèle, avec d’autres mots.',
          ],
        },
      ],
      phrases: {
        heading: 'Mots à vérifier deux fois dans une proposition',
        items: ['toujours', 'jamais', 'tous', 'aucun', 'seulement', 'uniquement', 'entièrement', 'forcément'],
      },
      pitfalls: ['Choisir la proposition qui « sonne » comme le texte.', 'Répondre avec ses connaissances personnelles au lieu du texte.'],
      quiz: [
        {
          prompt: 'Le texte dit : « La plupart des participants ont apprécié l’atelier. » Quelle proposition est correcte ?',
          choices: ['Tous les participants ont adoré l’atelier', 'Une majorité de participants a aimé l’atelier', 'Personne n’a aimé l’atelier', 'L’atelier a été annulé'],
          answer: 1,
          explanation: '« La plupart » = la majorité. « Tous » est un absolu que le texte ne permet pas.',
        },
        {
          prompt: 'Une proposition contient une information vraie du texte mais ne répond pas à la question. Elle est :',
          choices: ['Correcte', 'Un piège à éliminer', 'Toujours la bonne réponse', 'À choisir en cas de doute'],
          answer: 1,
          explanation: 'C’est le piège du « vrai hors sujet » : il faut répondre à la question posée.',
        },
        {
          prompt: 'Que faut-il utiliser pour répondre ?',
          choices: ['Ses connaissances personnelles', 'Uniquement ce que dit le texte', 'La réponse la plus longue', 'La première proposition'],
          answer: 1,
          explanation: 'Les questions portent sur le document. Une réponse vraie dans la vie peut être fausse selon le texte.',
        },
      ],
    },
  ],
};
