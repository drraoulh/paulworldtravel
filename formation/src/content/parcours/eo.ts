import type { Module } from './types';

export const eo: Module = {
  id: 'eo',
  slug: 'expression-orale',
  name: 'Expression orale',
  intro:
    'Douze minutes en face à face avec un examinateur : se présenter, obtenir des informations, défendre un avis. On ne récite pas, on échange ; et ça s’apprend.',
  facts: [
    { label: 'Durée', value: '12 minutes' },
    { label: 'Tâches', value: '3, face à un examinateur' },
    { label: 'Préparation', value: '2 minutes, tâche 2 seulement' },
    { label: 'Note', value: 'Sur 20' },
  ],
  tasks: [
    { title: 'Tâche 1 : entretien dirigé', detail: 'Sans préparation, 2 minutes. L’examinateur vous pose des questions sur vous : parcours, travail, famille, loisirs, projets.' },
    { title: 'Tâche 2 : exercice en interaction', detail: '5 minutes 30, dont 2 minutes de préparation puis 3 minutes 30 d’échange. Vous devez obtenir des informations dans une situation du quotidien ; l’examinateur joue votre interlocuteur.' },
    { title: 'Tâche 3 : expression d’un point de vue', detail: 'Sans préparation, 4 minutes 30. Vous donnez votre avis sur une question et le défendez de manière continue et convaincante.' },
  ],
  practice: { href: '/epreuve/expression-orale/simulateur/', label: 'S’entraîner au micro avec l’IA' },
  lessons: [
    {
      slug: 'comprendre-l-epreuve-orale',
      title: 'Ce que l’examinateur attend',
      minutes: 6,
      goal: 'Savoir comment se déroulent les 12 minutes et ce qui est évalué.',
      sections: [
        {
          heading: 'Le déroulement',
          paragraphs: [
            'L’épreuve est individuelle, en face à face, et enregistrée. Les trois tâches s’enchaînent : l’entretien dirigé, l’interaction préparée, puis le point de vue. Seule la tâche 2 comprend 2 minutes de préparation.',
          ],
        },
        {
          heading: 'Ce qui fait la note',
          list: [
            'Réaliser la tâche demandée : répondre vraiment à la question, poser les bonnes questions, défendre un avis.',
            'Parler de façon fluide et organisée, avec des liens entre les idées.',
            'Utiliser un vocabulaire varié et précis.',
            'Construire des phrases correctes, y compris complexes.',
            'Adapter son registre : politesse, vouvoiement de l’examinateur.',
          ],
        },
        {
          heading: 'L’attitude qui aide',
          paragraphs: [
            'Regardez l’examinateur, parlez assez fort et à un rythme normal. Une petite erreur corrigée vous-même (« pardon, je voulais dire… ») est un bon signe, pas un mauvais.',
          ],
        },
      ],
      pitfalls: ['Réciter un texte appris par cœur : l’examinateur le remarque et relance sur autre chose.', 'Répondre par oui ou non.', 'Rester silencieux trop longtemps.'],
      quiz: [
        {
          prompt: 'Quelle tâche comprend 2 minutes de préparation ?',
          choices: ['La tâche 1', 'La tâche 2', 'La tâche 3', 'Aucune'],
          answer: 1,
          explanation: 'Seule la tâche 2 (interaction) prévoit 2 minutes de préparation.',
        },
        {
          prompt: 'Combien de temps dure l’épreuve d’expression orale ?',
          choices: ['5 minutes', '12 minutes', '30 minutes', '1 heure'],
          answer: 1,
          explanation: '12 minutes au total, préparation de la tâche 2 comprise.',
        },
        {
          prompt: 'Vous vous trompez de mot et vous vous corrigez. L’examinateur :',
          choices: ['Vous pénalise fortement', 'Y voit plutôt une preuve de maîtrise', 'Arrête l’épreuve', 'Ne remarque rien'],
          answer: 1,
          explanation: 'L’autocorrection montre que vous contrôlez votre langue.',
        },
      ],
    },
    {
      slug: 'tache-1-se-presenter',
      title: 'Tâche 1 : parler de soi avec aisance',
      minutes: 8,
      goal: 'Répondre aux questions personnelles avec des réponses développées et naturelles.',
      sections: [
        {
          heading: 'Les thèmes à préparer',
          list: ['Votre identité et votre ville d’origine.', 'Vos études et votre parcours professionnel.', 'Votre famille.', 'Vos loisirs et une journée typique.', 'Votre projet au Canada et ses raisons.'],
        },
        {
          heading: 'La règle des trois phrases',
          paragraphs: [
            'Pour chaque question, donnez la réponse, puis un détail, puis une précision ou un exemple. « J’habite à Douala. C’est la capitale économique du Cameroun, une ville très animée. J’aime surtout son marché du dimanche. »',
          ],
        },
        {
          heading: 'Montrer plusieurs temps',
          paragraphs: [
            'Profitez de la tâche pour utiliser le présent (ce que vous faites), le passé (votre parcours) et le futur (votre projet). C’est une manière simple de montrer l’étendue de votre grammaire.',
          ],
        },
      ],
      model: {
        title: 'Exemple de réponse',
        text:
          '« Je suis infirmière depuis six ans dans une clinique de Yaoundé. J’ai choisi ce métier parce que ma mère était sage-femme et qu’elle m’a transmis le goût de soigner. Au Canada, j’aimerais d’abord faire reconnaître mon diplôme, puis travailler dans un hôpital de Montréal, car le Québec recrute beaucoup dans la santé. »',
        note: 'Trois temps (présent, passé, futur ou conditionnel), des raisons (« parce que », « car ») et des détails concrets.',
      },
      phrases: {
        heading: 'Pour développer une réponse',
        items: ['Ce qui me plaît le plus, c’est…', 'J’ai choisi… parce que…', 'Avant, je…, mais maintenant…', 'Mon objectif est de…', 'Par exemple, le week-end, je…'],
      },
      pitfalls: ['Réponses d’un seul mot.', 'Un monologue appris qui ne répond pas à la question posée.', 'Rester au présent tout le temps.'],
      quiz: [
        {
          prompt: '« Vous aimez votre travail ? » Quelle réponse est la plus adaptée ?',
          choices: ['« Oui. »', '« Oui, beaucoup, surtout le contact avec les patients. Par exemple… »', '« Je ne sais pas. »', '« Mon travail. »'],
          answer: 1,
          explanation: 'Une réponse développée, avec un détail et un exemple.',
        },
        {
          prompt: 'Pourquoi parler de votre passé et de vos projets en tâche 1 ?',
          choices: ['Pour gagner du temps', 'Pour montrer que vous maîtrisez plusieurs temps verbaux', 'Parce que c’est obligatoire', 'Pour éviter les questions'],
          answer: 1,
          explanation: 'Varier les temps est une manière naturelle de montrer votre niveau.',
        },
        {
          prompt: 'Combien de temps dure la tâche 1 ?',
          choices: ['2 minutes', '5 minutes 30', '4 minutes 30', '10 minutes'],
          answer: 0,
          explanation: 'L’entretien dirigé dure 2 minutes, sans préparation.',
        },
      ],
      practice: { href: '/epreuve/expression-orale/simulateur/', label: 'Enregistrer une présentation' },
    },
    {
      slug: 'tache-2-interaction',
      title: 'Tâche 2 : poser les bonnes questions',
      minutes: 10,
      goal: 'Conduire un échange pour obtenir des informations, avec des questions variées et polies.',
      sections: [
        {
          heading: 'Utiliser les 2 minutes de préparation',
          list: [
            'Identifiez votre rôle et celui de l’examinateur (le propriétaire, l’agent de voyage, le responsable du club…).',
            'Listez 8 à 10 points sur lesquels poser des questions : prix, horaires, lieu, conditions, durée, documents, options.',
            'Préparez une phrase d’ouverture et une phrase de clôture.',
          ],
        },
        {
          heading: 'Trois façons de poser une question',
          list: [
            'L’intonation : « Le chauffage est inclus ? » (oral courant).',
            '« Est-ce que » : « Est-ce que le chauffage est inclus ? » (neutre).',
            'L’inversion : « Le chauffage est-il inclus ? », « Quand pourrais-je visiter ? » (soutenu, très valorisé).',
          ],
          paragraphs: ['Variez les trois formes et les mots interrogatifs : combien, quand, où, comment, pourquoi, quel, lequel.'],
        },
        {
          heading: 'Un vrai échange',
          paragraphs: [
            'Réagissez aux réponses : « Ah, c’est un peu cher pour moi. Est-ce qu’il y a une réduction si je paie d’avance ? » C’est ce qui transforme une liste de questions en conversation. Terminez en remerciant et en annonçant la suite : « Je vais réfléchir et je vous rappelle demain. »',
          ],
        },
      ],
      model: {
        title: 'Exemple d’échange',
        text:
          'Candidat : Bonjour Monsieur, je vous appelle au sujet de l’appartement annoncé rue Saint-Denis. Est-il toujours disponible ?\nExaminateur : Oui, il est libre à partir du 1er juillet.\nCandidat : Très bien. Combien coûte le loyer, et les charges sont-elles comprises ?\nExaminateur : 1 450 $ par mois, chauffage inclus.\nCandidat : D’accord. Et l’électricité, c’est à part ? À combien faut-il s’attendre environ ?',
        note: 'Ouverture polie, questions variées (inversion, « combien », intonation) et réaction à chaque réponse.',
      },
      phrases: {
        heading: 'Formules d’interaction',
        items: [
          'Ouvrir : « Bonjour, je vous appelle au sujet de… », « J’aurais quelques questions sur… »',
          'Demander poliment : « Pourriez-vous me dire… ? », « Serait-il possible de… ? »',
          'Faire préciser : « C’est-à-dire ? », « Vous voulez dire que… ? »',
          'Réagir : « Ah, c’est intéressant. », « Je comprends. », « C’est un peu loin pour moi. »',
          'Clore : « Merci beaucoup pour ces informations. Je vous recontacte d’ici vendredi. »',
        ],
      },
      pitfalls: ['Poser toutes les questions d’un coup sans écouter les réponses.', 'N’utiliser que « est-ce que ».', 'Oublier de saluer et de remercier.', 'Tutoyer l’examinateur.'],
      quiz: [
        {
          prompt: 'Quelle question utilise l’inversion ?',
          choices: ['« Le loyer est cher ? »', '« Est-ce que le loyer est cher ? »', '« Le loyer est-il cher ? »', '« Combien le loyer ? »'],
          answer: 2,
          explanation: 'L’inversion place le pronom après le verbe : « est-il ».',
        },
        {
          prompt: 'Combien dure l’échange de la tâche 2, après la préparation ?',
          choices: ['1 minute', '2 minutes', '3 minutes 30', '5 minutes 30'],
          answer: 2,
          explanation: '5 minutes 30 au total : 2 minutes de préparation puis 3 minutes 30 d’échange.',
        },
        {
          prompt: 'L’examinateur répond que le cours coûte 300 $. Quelle réaction est la meilleure ?',
          choices: ['Passer directement à la question suivante sans rien dire', '« Ah, c’est un peu au-dessus de mon budget. Proposez-vous un paiement en plusieurs fois ? »', '« Non. »', 'Rester silencieux'],
          answer: 1,
          explanation: 'Réagir puis rebondir avec une nouvelle question rend l’échange naturel.',
        },
      ],
      practice: { href: '/epreuve/expression-orale/simulateur/', label: 'Simuler la tâche 2 avec l’interlocuteur IA' },
    },
    {
      slug: 'tache-3-point-de-vue',
      title: 'Tâche 3 : défendre un point de vue',
      minutes: 10,
      goal: 'Construire en direct un avis clair, argumenté et nuancé pendant environ 4 minutes.',
      sections: [
        {
          heading: 'Le plan à improviser en 20 secondes',
          list: [
            'Reformulez la question et annoncez votre position.',
            'Premier argument + exemple concret.',
            'Deuxième argument + exemple.',
            'Nuance : reconnaissez un point de vue différent ou une limite.',
            'Conclusion : rappelez votre position, éventuellement avec une proposition.',
          ],
        },
        {
          heading: 'Des exemples qui convainquent',
          paragraphs: [
            'Les meilleurs exemples sont précis et personnels : une situation vécue à Douala, une observation dans votre quartier, un chiffre que vous connaissez. Ils montrent que vous réfléchissez vraiment.',
          ],
        },
        {
          heading: 'Gagner du temps sans silence',
          paragraphs: [
            'Si vous avez besoin de réfléchir, dites-le en français : « C’est une question intéressante… Laissez-moi réfléchir un instant. » Puis reformulez la question. Vous gagnez quelques secondes tout en parlant.',
          ],
        },
      ],
      model: {
        title: 'Exemple de début de réponse',
        text:
          '« Faut-il interdire les voitures dans le centre des grandes villes ? Personnellement, je suis plutôt favorable à cette idée, mais pas sans conditions. D’abord, la pollution est un vrai problème de santé : à Douala, aux heures de pointe, l’air devient vraiment difficile à respirer. Ensuite… »',
        note: 'La question est reformulée, la position est nette et déjà nuancée (« pas sans conditions »), et le premier argument s’appuie sur un exemple vécu.',
      },
      phrases: {
        heading: 'Connecteurs de l’oral argumenté',
        items: ['Personnellement, je pense que…', 'D’abord… Ensuite… Enfin…', 'Prenons l’exemple de…', 'Certes…, mais…', 'Il faut tout de même reconnaître que…', 'Pour conclure, je dirais que…'],
      },
      pitfalls: ['Changer d’avis au milieu de la réponse.', 'Donner des arguments sans exemples.', 'S’arrêter après une minute.', 'Ne pas répondre à la question exacte.'],
      quiz: [
        {
          prompt: 'Par quoi commencer en tâche 3 ?',
          choices: ['Un exemple', 'Reformuler la question et annoncer sa position', 'La conclusion', 'Une question à l’examinateur'],
          answer: 1,
          explanation: 'Annoncer clairement sa position donne une direction à toute la réponse.',
        },
        {
          prompt: 'Quelle phrase permet de gagner du temps sans rester silencieux ?',
          choices: ['« Euh… euh… »', '« C’est une question intéressante, laissez-moi réfléchir un instant. »', '« Je ne sais pas. »', '« Question suivante. »'],
          answer: 1,
          explanation: 'Une formule de temporisation montre votre aisance tout en vous laissant réfléchir.',
        },
        {
          prompt: 'Combien de temps dure la tâche 3 ?',
          choices: ['2 minutes', '3 minutes 30', '4 minutes 30', '12 minutes'],
          answer: 2,
          explanation: 'La tâche 3 dure 4 minutes 30, sans préparation.',
        },
      ],
      practice: { href: '/epreuve/expression-orale/simulateur/', label: 'Enregistrer un point de vue' },
    },
    {
      slug: 'aisance-et-prononciation',
      title: 'Aisance et prononciation',
      minutes: 7,
      goal: 'Parler de façon plus fluide et plus claire grâce à quelques habitudes simples.',
      sections: [
        {
          heading: 'Le débit',
          paragraphs: [
            'Parler vite n’est pas parler bien. Un débit régulier, avec de courtes pauses entre les idées, est plus clair et vous laisse le temps de construire la phrase suivante.',
          ],
        },
        {
          heading: 'Remplacer les « euh »',
          list: ['« Alors… »', '« Disons que… »', '« Comment dire… »', '« En fait… »', '« Si je comprends bien votre question… »'],
          paragraphs: ['Ces mots de liaison donnent du temps tout en restant naturels.'],
        },
        {
          heading: 'Les sons à soigner',
          list: [
            'Les voyelles nasales : « vin », « vent », « vont » se distinguent.',
            'Le « u » et le « ou » : « dessus » / « dessous », « rue » / « roue ».',
            'Les liaisons obligatoires : « les‿enfants », « nous‿avons », « un grand‿homme ».',
          ],
        },
        {
          heading: 'L’entraînement quotidien',
          paragraphs: [
            'Enregistrez-vous 2 minutes par jour sur un sujet simple, réécoutez, puis recommencez en corrigeant un seul point. En deux semaines, la différence s’entend. Le simulateur de cette plateforme fait ce travail avec une correction écrite.',
          ],
        },
      ],
      pitfalls: ['Parler trop vite par stress.', 'Lire ses notes de préparation mot à mot.', 'Parler trop bas.'],
      quiz: [
        {
          prompt: 'Quelle formule remplace avantageusement un « euh » ?',
          choices: ['« Hum hum »', '« Disons que… »', 'Un long silence', '« Voilà voilà »'],
          answer: 1,
          explanation: '« Disons que… » donne du temps et reste naturel.',
        },
        {
          prompt: 'Quelle liaison est obligatoire ?',
          choices: ['« les‿enfants »', '« et‿alors »', '« un chat‿énorme »', 'Aucune'],
          answer: 0,
          explanation: 'La liaison est obligatoire entre un déterminant et un nom : « les‿enfants ».',
        },
        {
          prompt: 'Quelle est la meilleure façon de progresser en aisance ?',
          choices: ['Apprendre des textes par cœur', 'S’enregistrer souvent, réécouter et corriger un point à la fois', 'Parler le plus vite possible', 'Éviter de parler avant l’examen'],
          answer: 1,
          explanation: 'Une pratique courte et régulière, avec réécoute, est la plus efficace.',
        },
      ],
    },
  ],
};
