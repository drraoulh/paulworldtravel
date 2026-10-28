import type { Module } from './types';

export const co: Module = {
  id: 'co',
  slug: 'comprehension-orale',
  name: 'Compréhension orale',
  intro:
    'Comprendre des messages, des conversations et des émissions, du plus simple au plus complexe, en une seule écoute. La méthode compte autant que l’oreille.',
  facts: [
    { label: 'Durée', value: '35 minutes' },
    { label: 'Questions', value: '39 QCM, 4 choix' },
    { label: 'Écoute', value: 'Une seule fois' },
    { label: 'Score', value: '100 à 699' },
  ],
  tasks: [
    { title: 'Début de l’épreuve (A1-A2)', detail: 'Annonces, messages courts, échanges du quotidien. On vous demande surtout une information précise : un lieu, une heure, un prix.' },
    { title: 'Milieu de l’épreuve (B1-B2)', detail: 'Conversations, messages professionnels, reportages courts. Il faut comprendre l’intention et l’opinion des personnes.' },
    { title: 'Fin de l’épreuve (C1-C2)', detail: 'Interviews, débats, chroniques. Vous devez saisir une nuance, un sous-entendu ou la position exacte d’un intervenant.' },
  ],
  practice: { href: '/epreuve/comprehension-orale/series/', label: 'Faire la série d’écoute' },
  lessons: [
    {
      slug: 'ecoute-unique',
      title: 'Réussir avec une seule écoute',
      minutes: 7,
      goal: 'Savoir quoi faire avant, pendant et après chaque document sonore.',
      sections: [
        {
          heading: 'Ce qui rend l’épreuve difficile',
          paragraphs: [
            'Chaque enregistrement n’est diffusé qu’une seule fois. Vous ne pouvez pas revenir en arrière, et la difficulté augmente au fil des 39 questions.',
            'La question est posée après l’écoute du document. Votre travail consiste donc à écouter de façon active, en anticipant ce qui pourrait être demandé.',
          ],
        },
        {
          heading: 'La routine en trois temps',
          list: [
            'Avant : lisez les quatre propositions. Elles vous disent de quoi le document va parler et quel type d’information chercher (un chiffre, un lieu, une opinion).',
            'Pendant : écoutez le sens général d’abord, puis les mots-clés. Ne vous bloquez pas sur un mot inconnu.',
            'Après : répondez tout de suite. Si vous hésitez, éliminez les propositions qui contredisent ce que vous avez entendu et choisissez parmi les autres.',
          ],
        },
        {
          heading: 'Gérer son énergie',
          paragraphs: [
            'Les premières questions sont faciles : ne perdez pas de points par excès de confiance. Les dernières sont longues et denses : restez concentré jusqu’au bout, chaque bonne réponse compte.',
            'Une question ratée est terminée. Passez immédiatement à la suivante sans y repenser.',
          ],
        },
      ],
      phrases: {
        heading: 'Ce que vous dit la forme des propositions',
        items: [
          'Des heures ou des prix → notez mentalement chaque chiffre entendu.',
          'Des lieux → repérez les prépositions : devant, derrière, au bout de, en face de.',
          'Des verbes d’opinion (regrette, approuve, doute) → écoutez le ton et les connecteurs.',
          'Des personnes (le client, la voisine, le directeur) → identifiez qui parle à qui.',
        ],
      },
      pitfalls: [
        'Choisir la proposition qui reprend un mot entendu : le bon choix reformule souvent le document avec d’autres mots.',
        'Rester bloqué sur la question précédente et manquer le début du document suivant.',
        'Vouloir tout comprendre : on peut répondre juste en ayant compris l’essentiel.',
      ],
      quiz: [
        {
          prompt: 'Combien de fois chaque enregistrement est-il diffusé au TCF Canada ?',
          choices: ['Une fois', 'Deux fois', 'Trois fois', 'Autant que le candidat le souhaite'],
          answer: 0,
          explanation: 'Chaque document n’est diffusé qu’une seule fois. D’où l’importance de lire les propositions avant l’écoute.',
        },
        {
          prompt: 'Les quatre propositions sont des horaires. Que devez-vous faire pendant l’écoute ?',
          choices: ['Écouter uniquement la fin', 'Noter mentalement chaque heure entendue et à quoi elle correspond', 'Ignorer les chiffres', 'Chercher le mot le plus difficile'],
          answer: 1,
          explanation: 'Plusieurs heures sont souvent citées. Il faut associer chacune à son contexte pour éviter le piège.',
        },
        {
          prompt: 'Vous n’avez pas compris un mot du document. Que faire ?',
          choices: ['Abandonner la question', 'S’appuyer sur le sens général et éliminer les propositions impossibles', 'Choisir la proposition la plus longue', 'Attendre la rediffusion'],
          answer: 1,
          explanation: 'Un mot inconnu empêche rarement de répondre. Le contexte suffit souvent pour éliminer deux ou trois propositions.',
        },
      ],
    },
    {
      slug: 'messages-du-quotidien',
      title: 'Annonces et messages du quotidien',
      minutes: 8,
      goal: 'Repérer une information précise dans une annonce ou un message vocal.',
      sections: [
        {
          heading: 'Les documents les plus fréquents',
          list: [
            'Annonces dans une gare, un aéroport, un magasin ou un centre commercial.',
            'Messages sur un répondeur : rendez-vous médical, livraison, rappel administratif.',
            'Consignes courtes : horaires d’ouverture, changement de salle, modalités d’inscription.',
          ],
        },
        {
          heading: 'Repérer le changement',
          paragraphs: [
            'Dans ces documents, l’information importante est souvent un changement : un retard, un nouveau quai, un rendez-vous déplacé. Les mots qui l’annoncent sont précieux : « au lieu de », « finalement », « exceptionnellement », « désormais ».',
            'Le piège classique : le document cite l’ancienne et la nouvelle information. La question porte presque toujours sur la nouvelle.',
          ],
        },
        {
          heading: 'Les chiffres à l’oral',
          paragraphs: [
            'Entraînez-vous à reconnaître vite les nombres difficiles : soixante-dix (70), quatre-vingts (80), quatre-vingt-dix (90), et les heures dites de deux façons : « dix-neuf heures » ou « sept heures du soir ».',
          ],
        },
      ],
      model: {
        title: 'Exemple commenté',
        text:
          '« Bonjour, ici le cabinet du docteur Lemieux. Votre rendez-vous de jeudi à 14 h ne pourra pas avoir lieu. Nous vous proposons vendredi à 9 h 30. Merci de confirmer avant mercredi midi. »',
        note:
          'Trois moments sont cités. La nouvelle date du rendez-vous est vendredi à 9 h 30 ; « mercredi midi » est la date limite pour confirmer. Une question sur « le nouveau rendez-vous » piège ceux qui retiennent jeudi.',
      },
      phrases: {
        heading: 'Mots qui signalent l’information clé',
        items: ['au lieu de', 'finalement', 'exceptionnellement', 'désormais', 'à partir de', 'jusqu’à nouvel ordre', 'n’oubliez pas de', 'merci de'],
      },
      pitfalls: [
        'Retenir la première heure entendue au lieu de la nouvelle.',
        'Confondre la date de l’événement et la date limite d’une démarche.',
      ],
      quiz: [
        {
          prompt: '« Le train de 18 h 10 partira exceptionnellement du quai 4 au lieu du quai 2. » D’où part le train ?',
          choices: ['Du quai 2', 'Du quai 4', 'Du quai 18', 'L’annonce ne le précise pas'],
          answer: 1,
          explanation: '« Au lieu de » introduit l’ancienne information. Le nouveau quai est le 4.',
        },
        {
          prompt: 'Comment s’écrit « quatre-vingt-dix-sept » en chiffres ?',
          choices: ['47', '77', '87', '97'],
          answer: 3,
          explanation: 'Quatre-vingt-dix (90) + sept = 97.',
        },
        {
          prompt: '« Merci de rappeler avant vendredi pour confirmer votre visite de lundi. » Quand a lieu la visite ?',
          choices: ['Vendredi', 'Lundi', 'Aujourd’hui', 'Avant vendredi'],
          answer: 1,
          explanation: 'Vendredi est la limite pour rappeler ; la visite a lieu lundi.',
        },
      ],
    },
    {
      slug: 'dialogues-et-intentions',
      title: 'Dialogues : qui parle, et pour quoi faire ?',
      minutes: 8,
      goal: 'Identifier la relation entre les personnes et l’intention de chacune.',
      sections: [
        {
          heading: 'Trois questions à se poser',
          list: [
            'Qui parle ? Collègues, client et vendeur, voisins, parent et enfant… Le vouvoiement ou le tutoiement est un premier indice.',
            'Où sont-ils ? Les bruits de fond et le vocabulaire (ordonnance, facture, quai) situent la scène.',
            'Que veut chaque personne ? Demander, proposer, refuser, se plaindre, s’excuser, convaincre.',
          ],
        },
        {
          heading: 'L’intention n’est pas toujours dite',
          paragraphs: [
            'Un refus poli ressemble rarement à « non ». On entend plutôt « Ça va être compliqué cette semaine » ou « Je vais y réfléchir ». À l’inverse, « Pourquoi pas ? » est souvent une acceptation.',
            'Écoutez aussi l’intonation : une même phrase peut être sincère ou ironique.',
          ],
        },
      ],
      model: {
        title: 'Exemple commenté',
        text:
          '— Tu pourrais me remplacer à la réunion de demain ?\n— Demain… J’ai déjà le rendez-vous avec le fournisseur à 10 h. Si c’était l’après-midi, je ne dis pas.',
        note:
          'La deuxième personne ne dit jamais « non », mais elle refuse : elle est occupée le matin et n’accepterait que si la réunion était l’après-midi.',
      },
      phrases: {
        heading: 'Formules d’intention fréquentes',
        items: [
          'Proposer : « Ça te dirait de… ? », « Et si on… ? »',
          'Refuser poliment : « Ça va être difficile », « Une autre fois peut-être »',
          'Se plaindre : « Ce n’est pas normal que… », « Je ne suis pas satisfait de… »',
          'S’excuser : « Je suis désolé pour… », « Toutes mes excuses »',
        ],
      },
      pitfalls: ['Prendre une réponse hésitante pour une acceptation.', 'Attribuer à une personne ce que dit l’autre.'],
      quiz: [
        {
          prompt: '« — On se voit samedi ? — Samedi, ça va être compliqué, j’ai ma famille. » Que fait la deuxième personne ?',
          choices: ['Elle accepte', 'Elle refuse poliment', 'Elle propose dimanche', 'Elle se plaint de sa famille'],
          answer: 1,
          explanation: '« Ça va être compliqué » est une manière polie de refuser.',
        },
        {
          prompt: 'Deux personnes se vouvoient et parlent de « votre commande » et de « remboursement ». Quelle est la relation la plus probable ?',
          choices: ['Deux amis', 'Un client et un service client', 'Un parent et son enfant', 'Deux collègues proches'],
          answer: 1,
          explanation: 'Le vouvoiement et le vocabulaire de la commande indiquent une relation commerciale.',
        },
        {
          prompt: '« Pourquoi pas ? » répond à une proposition. En général, cela signifie :',
          choices: ['Un refus', 'Une acceptation', 'Une question sur la raison', 'Une colère'],
          answer: 1,
          explanation: 'Dans ce contexte, « pourquoi pas ? » exprime l’accord.',
        },
      ],
    },
    {
      slug: 'interviews-et-reportages',
      title: 'Interviews, reportages et débats',
      minutes: 9,
      goal: 'Dégager l’idée principale et la position exacte d’un intervenant.',
      sections: [
        {
          heading: 'Distinguer le fait et l’opinion',
          paragraphs: [
            'Aux niveaux B2 et C1, les questions portent souvent sur ce que pense un intervenant, pas sur ce qu’il raconte. Repérez les marques d’opinion : « à mon sens », « je crains que », « ce qui me frappe », « il serait temps de ».',
          ],
        },
        {
          heading: 'Suivre la structure orale',
          list: [
            'L’annonce : « Je voudrais revenir sur… », « La question est de savoir si… »',
            'La concession : « Certes…, mais… », « Il est vrai que…, toutefois… » La position réelle suit le « mais ».',
            'La conclusion : « Au fond », « Finalement », « Ce qu’il faut retenir ».',
          ],
        },
        {
          heading: 'Les nuances qui font la différence',
          paragraphs: [
            'Un intervenant « réservé » n’est pas « opposé ». Quelqu’un qui « ne rejette pas l’idée » n’est pas forcément « enthousiaste ». À ce niveau, plusieurs propositions semblent justes : choisissez celle qui a exactement le bon degré.',
          ],
        },
      ],
      model: {
        title: 'Exemple commenté',
        text:
          '« Le télétravail a certes apporté de la souplesse. Mais à force de tout faire à distance, on perd ces échanges informels où naissent souvent les meilleures idées. Je ne dis pas qu’il faut revenir en arrière, je dis qu’il faut trouver un équilibre. »',
        note:
          'L’intervenante reconnaît un avantage, puis exprime une réserve. Sa position : ni pour, ni contre le télétravail, mais pour un équilibre. La proposition « elle veut supprimer le télétravail » est fausse.',
      },
      phrases: {
        heading: 'Marqueurs d’opinion à reconnaître',
        items: ['à mon sens', 'je suis convaincu que', 'je crains que', 'il me semble que', 'je ne suis pas certain que', 'reste à savoir si', 'ce qui me gêne, c’est'],
      },
      pitfalls: ['Retenir la concession (« certes… ») au lieu de la position finale.', 'Choisir une proposition trop forte (« totalement opposé ») pour une simple réserve.'],
      quiz: [
        {
          prompt: '« Certes, le projet coûte cher, mais il créera des emplois durables. » Quelle est la position du locuteur ?',
          choices: ['Il est contre le projet', 'Il est plutôt favorable au projet', 'Il ne donne pas d’avis', 'Il pense que le projet est gratuit'],
          answer: 1,
          explanation: 'La position réelle suit « mais » : il met en avant un avantage plus important que le coût.',
        },
        {
          prompt: 'Une experte dit : « Je ne rejette pas cette réforme, mais elle mérite d’être précisée. » Elle est :',
          choices: ['Enthousiaste', 'Totalement opposée', 'Ouverte mais réservée', 'Indifférente'],
          answer: 2,
          explanation: 'Elle accepte l’idée tout en exprimant une réserve.',
        },
        {
          prompt: 'Quel connecteur annonce généralement la conclusion d’un intervenant ?',
          choices: ['Certes', 'Au fond', 'Par exemple', 'D’abord'],
          answer: 1,
          explanation: '« Au fond » introduit l’idée essentielle, souvent la conclusion.',
        },
      ],
    },
    {
      slug: 'sons-et-accents',
      title: 'Liaisons, accents et pièges sonores',
      minutes: 7,
      goal: 'Reconnaître le français parlé réel, y compris les accents canadiens.',
      sections: [
        {
          heading: 'Le français parlé n’est pas le français écrit',
          list: [
            'Le « ne » de la négation disparaît souvent : « Je sais pas », « C’est pas grave ».',
            'Les mots s’enchaînent : « Ils ont » se prononce [ilzɔ̃] et « Ils sont » [ilsɔ̃] : la liaison fait la différence.',
            'Les élisions raccourcissent : « T’as vu ? » pour « Tu as vu ? ».',
          ],
        },
        {
          heading: 'Les accents francophones',
          paragraphs: [
            'L’épreuve fait entendre des voix variées. Au Canada, vous entendrez par exemple « présentement » (en ce moment), « magasiner » (faire les courses), « la fin de semaine » (le week-end) ou « dîner » pour le repas de midi.',
            'Écouter régulièrement des radios et des podcasts de différents pays francophones est le meilleur entraînement : 15 minutes par jour suffisent pour habituer l’oreille.',
          ],
        },
        {
          heading: 'Les paires de sons à surveiller',
          list: ['« deux » / « douze »', '« cent » / « sans »', '« il a » / « il va »', '« je l’ai » / « je les ai »', '« dessus » / « dessous »'],
        },
      ],
      phrases: {
        heading: 'Mots fréquents au Canada',
        items: ['présentement = maintenant', 'magasiner = faire les courses', 'la fin de semaine = le week-end', 'le dîner = le repas de midi', 'le souper = le repas du soir', 'un courriel = un e-mail'],
      },
      pitfalls: ['Croire qu’une phrase est affirmative parce que le « ne » n’est pas prononcé.', 'Confondre « dîner » (midi au Canada) et « dîner » (soir en France).'],
      quiz: [
        {
          prompt: 'Au Canada, « On va dîner à midi et demi » signifie :',
          choices: ['On va prendre le repas du soir', 'On va prendre le repas de midi', 'On va prendre le petit-déjeuner', 'On va annuler le repas'],
          answer: 1,
          explanation: 'Au Canada, le dîner est le repas de midi ; le souper est le repas du soir.',
        },
        {
          prompt: '« J’ai pas reçu ton courriel. » La personne :',
          choices: ['A reçu le courriel', 'N’a pas reçu le courriel', 'Va envoyer un courriel', 'Demande un courriel'],
          answer: 1,
          explanation: 'Le « ne » est omis à l’oral, mais « pas » marque bien la négation.',
        },
        {
          prompt: 'Que signifie « Je magasine présentement » ?',
          choices: ['Je travaille dans un magasin', 'Je fais des courses en ce moment', 'Je ferme mon magasin', 'J’irai faire des courses plus tard'],
          answer: 1,
          explanation: '« Magasiner » = faire des courses ; « présentement » = en ce moment.',
        },
      ],
    },
  ],
};
