import type { Module } from './types';

export const ee: Module = {
  id: 'ee',
  slug: 'expression-ecrite',
  name: 'Expression écrite',
  intro:
    'Trois textes en une heure : un message, un récit, puis une comparaison argumentée. Chaque tâche a sa structure ; une fois apprise, vous écrivez plus vite et mieux.',
  facts: [
    { label: 'Durée', value: '60 minutes' },
    { label: 'Tâches', value: '3 rédactions' },
    { label: 'Longueur', value: '60 à 180 mots selon la tâche' },
    { label: 'Note', value: 'Sur 20' },
  ],
  tasks: [
    { title: 'Tâche 1 : le message', detail: 'Décrire, raconter ou expliquer à un ou plusieurs destinataires précisés dans la consigne. 60 à 120 mots. Conseil : 10 minutes.' },
    { title: 'Tâche 2 : le récit ou compte rendu', detail: 'Un article, un courrier ou une note pour plusieurs destinataires, qui raconte une expérience. 120 à 150 mots. Conseil : 20 minutes.' },
    { title: 'Tâche 3 : comparer deux points de vue', detail: 'Un texte qui présente les deux opinions de deux documents (40 à 60 mots), puis la vôtre (80 à 120 mots). 120 à 180 mots au total. Conseil : 30 minutes.' },
  ],
  practice: { href: '/epreuve/expression-ecrite/simulateur/', label: 'Rédiger et faire corriger par l’IA' },
  lessons: [
    {
      slug: 'organiser-l-heure',
      title: 'Organiser son heure et compter ses mots',
      minutes: 6,
      goal: 'Répartir les 60 minutes et respecter les longueurs demandées.',
      sections: [
        {
          heading: 'Le plan de l’heure',
          list: [
            'Tâche 1 : 10 minutes (2 de plan, 6 d’écriture, 2 de relecture).',
            'Tâche 2 : 20 minutes (4 de plan, 13 d’écriture, 3 de relecture).',
            'Tâche 3 : 30 minutes (7 de lecture et de plan, 18 d’écriture, 5 de relecture).',
          ],
          paragraphs: ['Commencez par la tâche que vous maîtrisez le mieux si cela vous rassure, mais gardez toujours 30 minutes pour la tâche 3.'],
        },
        {
          heading: 'La longueur compte',
          paragraphs: [
            'Un texte trop court ne montre pas assez votre niveau ; un texte très au-delà du maximum peut être pénalisé. Visez le milieu de la fourchette : environ 90 mots pour la tâche 1, 135 pour la tâche 2, 160 pour la tâche 3.',
            'Pour compter vite : comptez les mots d’une ligne type de votre écriture, puis multipliez par le nombre de lignes.',
          ],
        },
        {
          heading: 'Le brouillon utile',
          paragraphs: ['N’écrivez pas tout au brouillon : vous n’aurez pas le temps de recopier. Notez seulement le plan, les connecteurs et deux ou trois mots précis que vous voulez placer.'],
        },
      ],
      pitfalls: ['Passer 25 minutes sur la tâche 1 et bâcler la tâche 3.', 'Recopier un brouillon complet.', 'Oublier de relire les accords.'],
      quiz: [
        {
          prompt: 'Combien de mots faut-il écrire pour la tâche 2 ?',
          choices: ['40 à 60', '60 à 120', '120 à 150', '200 à 250'],
          answer: 2,
          explanation: 'La tâche 2 demande entre 120 et 150 mots.',
        },
        {
          prompt: 'Combien de temps faut-il garder pour la tâche 3 ?',
          choices: ['10 minutes', '20 minutes', 'Environ 30 minutes', '5 minutes'],
          answer: 2,
          explanation: 'C’est la tâche la plus exigeante : il faut lire deux documents, planifier et argumenter.',
        },
        {
          prompt: 'Que faut-il écrire au brouillon ?',
          choices: ['Le texte complet', 'Le plan et quelques mots-clés', 'Rien', 'Uniquement la conclusion'],
          answer: 1,
          explanation: 'Un plan court suffit. Recopier un texte entier fait perdre un temps précieux.',
        },
      ],
    },
    {
      slug: 'tache-1-message',
      title: 'Tâche 1 : écrire un message efficace',
      minutes: 9,
      goal: 'Rédiger un message clair, adapté au destinataire, qui répond à tous les points de la consigne.',
      sections: [
        {
          heading: 'Lire la consigne comme une liste de contrôle',
          paragraphs: [
            'La consigne précise le destinataire (un ami, un voisin, un collègue, un service) et ce que vous devez faire : décrire, raconter, expliquer, inviter, demander. Soulignez chaque point : chacun doit apparaître dans votre message.',
          ],
        },
        {
          heading: 'La structure en quatre temps',
          list: [
            'Formule d’appel adaptée : « Salut Léa, » ou « Madame, ».',
            'Raison du message en une phrase.',
            'Développement : les points de la consigne, dans l’ordre, avec des détails concrets.',
            'Clôture : une proposition ou une question, puis une formule de fin et votre prénom.',
          ],
        },
        {
          heading: 'Tutoyer ou vouvoyer ?',
          paragraphs: [
            'Un ami ou un membre de la famille : tutoiement et ton chaleureux. Un voisin que vous connaissez peu, un collègue, un service : vouvoiement et formules polies. Ne mélangez jamais les deux dans un même message.',
          ],
        },
      ],
      model: {
        title: 'Modèle (environ 90 mots)',
        text:
          'Salut Karim,\n\nJ’ai enfin emménagé dans mon nouvel appartement à Laval ! Il est au deuxième étage d’un petit immeuble calme, avec deux chambres et une cuisine lumineuse. Le quartier me plaît beaucoup : il y a un grand parc juste en face et une épicerie au coin de la rue. Le métro est à dix minutes à pied, donc c’est très pratique pour aller au travail.\n\nEst-ce que tu serais libre samedi prochain ? Je t’invite à souper vers 19 h pour fêter mon installation. Dis-moi si ça te va !\n\nÀ bientôt,\nAïcha',
        note: 'Tous les points sont traités : le logement, le quartier, l’invitation. Le tutoiement est cohérent, les détails sont concrets et la longueur est au milieu de la fourchette.',
      },
      phrases: {
        heading: 'Formules utiles',
        items: [
          'Ouvrir (ami) : « Salut…, », « Coucou…, », « Cher… / Chère…, »',
          'Ouvrir (formel) : « Madame, Monsieur, », « Bonjour Madame…, »',
          'Annoncer : « Je t’écris pour… », « Je me permets de vous écrire afin de… »',
          'Inviter : « Ça te dirait de… ? », « Seriez-vous disponible pour… ? »',
          'Clore (ami) : « À très vite ! », « Je t’embrasse, »',
          'Clore (formel) : « Je vous remercie par avance. Cordialement, »',
        ],
      },
      pitfalls: ['Oublier un point de la consigne.', 'Passer du « tu » au « vous ».', 'Écrire une lettre administrative à un ami.', 'Ne pas signer le message.'],
      quiz: [
        {
          prompt: 'Vous écrivez à votre voisine que vous connaissez peu. Quelle formule d’appel choisir ?',
          choices: ['« Salut ma belle ! »', '« Bonjour Madame Tremblay, »', '« Yo ! »', '« Cher ami, »'],
          answer: 1,
          explanation: 'Une voisine peu connue appelle le vouvoiement et une formule polie.',
        },
        {
          prompt: 'La consigne demande de décrire votre logement et d’inviter un ami. Votre message décrit seulement le logement. Que se passe-t-il ?',
          choices: ['Rien, c’est suffisant', 'La tâche est incomplète et la note baisse', 'C’est mieux, le texte est plus court', 'Le correcteur ajoute l’invitation'],
          answer: 1,
          explanation: 'Chaque point de la consigne doit être traité. Un oubli pénalise le respect de la consigne.',
        },
        {
          prompt: 'Comment terminer un message à un ami ?',
          choices: ['« Veuillez agréer mes salutations distinguées »', '« À bientôt ! » suivi de votre prénom', 'Sans rien', '« Cordialement, la direction »'],
          answer: 1,
          explanation: 'Une formule simple et amicale, puis votre prénom.',
        },
      ],
    },
    {
      slug: 'tache-2-recit',
      title: 'Tâche 2 : raconter une expérience',
      minutes: 10,
      goal: 'Écrire un récit vivant et bien construit, avec les temps du passé maîtrisés.',
      sections: [
        {
          heading: 'Raconter, pas argumenter',
          paragraphs: [
            'La tâche 2 vous demande de raconter ou de rendre compte d’une expérience pour plusieurs lecteurs : un article de blog, un message sur un forum, une note pour des collègues. Le cœur du texte est le récit ; votre impression vient en fin de texte.',
          ],
        },
        {
          heading: 'Le plan du récit',
          list: [
            'Un titre si c’est un article.',
            'Le cadre : quand, où, avec qui, pourquoi.',
            'Le déroulement : deux ou trois étapes, avec des connecteurs de temps.',
            'Un moment marquant : une surprise, une difficulté, une rencontre.',
            'Le bilan : ce que vous avez ressenti et ce que vous en retenez.',
          ],
        },
        {
          heading: 'Passé composé ou imparfait ?',
          paragraphs: [
            'Le passé composé raconte les actions qui font avancer l’histoire : « Nous sommes arrivés à 8 h. » L’imparfait décrit le décor, les états et les habitudes : « Il faisait froid et la salle était pleine. »',
            'Astuce : si vous pouvez ajouter « soudain » ou « ensuite », c’est le passé composé ; si vous pouvez ajouter « à ce moment-là, en général », c’est souvent l’imparfait.',
          ],
        },
      ],
      model: {
        title: 'Modèle (environ 135 mots)',
        text:
          'Mon premier hiver à Québec\n\nJe suis arrivé à Québec en janvier dernier pour commencer mes études. Le premier matin, il faisait moins vingt degrés et la ville était couverte de neige. Je n’avais jamais vu un tel paysage !\n\nD’abord, j’ai dû apprendre à m’habiller : un manteau, des bottes, une tuque et des mitaines. Ensuite, une voisine m’a montré comment marcher sur la glace sans tomber. Ce qui m’a le plus surpris, c’est la gentillesse des gens : dans le bus, un inconnu m’a conseillé un magasin pour acheter des vêtements chauds moins chers.\n\nAprès quelques semaines, je me suis habitué au froid et j’ai même essayé le patin à glace. Aujourd’hui, je garde un excellent souvenir de cette expérience. Si vous partez au Canada en hiver, préparez-vous bien, mais n’ayez pas peur : on s’adapte vite !',
        note: 'Le cadre, les étapes, le moment marquant et le bilan sont présents. Les temps sont bien choisis : imparfait pour le décor, passé composé pour les actions.',
      },
      phrases: {
        heading: 'Connecteurs du récit',
        items: ['D’abord, ensuite, puis, enfin', 'Au début, quelques jours plus tard, finalement', 'Soudain, tout à coup, à ce moment-là', 'Ce qui m’a le plus surpris, c’est…', 'Avec le recul, je retiens que…'],
      },
      pitfalls: ['Transformer le récit en texte d’opinion.', 'Tout écrire au présent.', 'Mélanger passé composé et imparfait sans logique.', 'Oublier le bilan personnel.'],
      quiz: [
        {
          prompt: 'Quel temps utiliser pour décrire le décor : « La salle … pleine » ?',
          choices: ['a été', 'était', 'sera', 'est été'],
          answer: 1,
          explanation: 'L’imparfait décrit un état, un décor.',
        },
        {
          prompt: '« Soudain, le téléphone … » Quel verbe convient ?',
          choices: ['sonnait', 'a sonné', 'sonne', 'sonnera'],
          answer: 1,
          explanation: '« Soudain » introduit une action ponctuelle : le passé composé.',
        },
        {
          prompt: 'Quel est l’objectif principal de la tâche 2 ?',
          choices: ['Défendre une opinion avec des arguments', 'Raconter une expérience à plusieurs lecteurs', 'Poser des questions', 'Résumer deux documents'],
          answer: 1,
          explanation: 'La tâche 2 est un récit ou un compte rendu d’expérience.',
        },
      ],
    },
    {
      slug: 'tache-3-deux-points-de-vue',
      title: 'Tâche 3 : comparer deux points de vue',
      minutes: 12,
      goal: 'Résumer deux opinions opposées puis défendre la vôtre, en respectant les deux parties.',
      sections: [
        {
          heading: 'La structure attendue',
          list: [
            'Un titre court qui annonce le sujet.',
            'Première partie (40 à 60 mots) : présentez le sujet, puis résumez les deux documents avec vos mots, en montrant qu’ils s’opposent.',
            'Deuxième partie (80 à 120 mots) : donnez votre opinion, avec deux arguments illustrés, puis une conclusion.',
          ],
        },
        {
          heading: 'Résumer sans recopier',
          paragraphs: [
            'Le correcteur veut voir que vous avez compris les documents. Reformulez : « Selon le premier document, … », « L’auteur du second texte estime au contraire que… ». Ne recopiez pas de phrases entières.',
          ],
        },
        {
          heading: 'Une opinion nette et nuancée',
          paragraphs: [
            'Prenez clairement position, mais montrez que vous voyez la complexité : « Je partage en partie l’avis du premier document, car… Cependant… ». Chaque argument s’appuie sur un exemple précis.',
          ],
        },
      ],
      model: {
        title: 'Modèle (environ 150 mots)',
        text:
          'Télétravail : liberté ou isolement ?\n\nLe travail à distance divise. Selon le premier document, il fait gagner du temps, réduit le stress des transports et rend les salariés plus autonomes. Le second texte affirme au contraire qu’il isole les employés, nuit à l’esprit d’équipe et efface la frontière avec la vie privée.\n\nÀ mon avis, le télétravail est une bonne solution à condition de le limiter. D’une part, il améliore réellement la qualité de vie : ma sœur, qui habite loin de son bureau, économise deux heures de trajet par jour et se sent moins fatiguée. D’autre part, je reconnais que le contact humain reste indispensable. Dans mon entreprise, les réunions en présentiel permettent de régler en dix minutes des problèmes qui prendraient des jours par courriel.\n\nC’est pourquoi je pense qu’un équilibre de deux ou trois jours de télétravail par semaine est idéal : on garde la souplesse sans perdre le lien avec ses collègues.',
        note: 'Le titre annonce le sujet. La première partie (environ 50 mots) résume les deux documents avec un connecteur d’opposition. La seconde (environ 100 mots) défend une position nuancée avec deux exemples.',
      },
      phrases: {
        heading: 'Expressions pour les deux parties',
        items: [
          'Présenter : « Le premier document affirme que… », « Selon l’auteur du second texte… »',
          'Opposer : « … au contraire… », « En revanche… », « Tandis que… »',
          'Donner son avis : « À mon avis… », « Je suis convaincu que… », « Je partage en partie… »',
          'Argumenter : « D’une part…, d’autre part… », « Par exemple… », « En effet… »',
          'Nuancer et conclure : « Cependant… », « C’est pourquoi… », « En définitive… »',
        ],
      },
      pitfalls: ['Oublier le titre.', 'Donner son avis dès la première partie.', 'Recopier les documents.', 'Une deuxième partie sans exemple.'],
      quiz: [
        {
          prompt: 'Combien de mots doit compter la première partie de la tâche 3 ?',
          choices: ['10 à 20', '40 à 60', '80 à 120', '150 à 200'],
          answer: 1,
          explanation: 'La première partie, qui résume les deux documents, compte 40 à 60 mots.',
        },
        {
          prompt: 'Que contient la première partie ?',
          choices: ['Votre opinion personnelle', 'Le résumé des deux points de vue', 'Un récit personnel', 'Des questions au lecteur'],
          answer: 1,
          explanation: 'Elle présente le sujet et résume les deux documents de manière neutre.',
        },
        {
          prompt: 'Quelle phrase reformule bien un document au lieu de le recopier ?',
          choices: ['Je recopie la première phrase du document', '« L’auteur du second texte estime au contraire que… »', '« Document 2 : … »', '« Je ne suis pas d’accord avec tout »'],
          answer: 1,
          explanation: 'Une reformulation avec un verbe d’opinion montre que vous avez compris.',
        },
      ],
    },
    {
      slug: 'relire-et-corriger',
      title: 'Relire et corriger en 5 minutes',
      minutes: 7,
      goal: 'Repérer et corriger ses erreurs les plus fréquentes avant de rendre la copie.',
      sections: [
        {
          heading: 'La relecture en trois passages',
          list: [
            'Passage 1, la consigne : tous les points sont-ils traités ? La longueur est-elle respectée ?',
            'Passage 2, les verbes : chaque verbe est-il accordé avec son sujet ? Les temps sont-ils cohérents ?',
            'Passage 3, les accords : noms et adjectifs (genre et nombre), participes passés.',
          ],
        },
        {
          heading: 'Les erreurs qui coûtent cher',
          list: [
            '« Ils ont pris » et non « Ils ont prit ».',
            '« Je suis allé(e) » : avec être, le participe s’accorde avec le sujet.',
            '« Les gens sont gentils » : « gens » est pluriel.',
            '« Si j’avais su, je serais venu » : jamais de conditionnel après « si ».',
            '« Malgré le froid » et non « malgré que ».',
          ],
        },
        {
          heading: 'Varier pour montrer son niveau',
          paragraphs: [
            'Un texte correct mais répétitif ne montre pas tout votre niveau. Remplacez un « très » par un adverbe précis, un « chose » par un nom exact, et utilisez au moins une phrase complexe (relative avec « dont » ou « où », subordonnée avec « bien que » + subjonctif).',
          ],
        },
      ],
      phrases: {
        heading: 'Mots à remplacer pour enrichir',
        items: ['une chose → un élément, un aspect, un objet', 'très bien → remarquablement, parfaitement', 'faire → réaliser, organiser, effectuer', 'dire → affirmer, expliquer, souligner', 'beaucoup de → de nombreux, une multitude de'],
      },
      pitfalls: ['Relire seulement le sens, pas l’orthographe.', 'Ajouter des phrases à la dernière minute sans les relire.'],
      quiz: [
        {
          prompt: 'Quelle phrase est correcte ?',
          choices: ['Si j’aurais le temps, je viendrais.', 'Si j’avais le temps, je viendrais.', 'Si j’avais le temps, je viendrai.', 'Si j’ai le temps, je viendrais.'],
          answer: 1,
          explanation: 'Après « si », on emploie l’imparfait, puis le conditionnel dans la principale.',
        },
        {
          prompt: '« Mes amies sont … hier soir. » Quelle forme convient ?',
          choices: ['arrivé', 'arrivés', 'arrivée', 'arrivées'],
          answer: 3,
          explanation: 'Avec « être », le participe s’accorde avec le sujet : « mes amies » est féminin pluriel.',
        },
        {
          prompt: 'Quel est le premier point à vérifier en relisant ?',
          choices: ['La couleur de l’encre', 'Que tous les points de la consigne sont traités', 'Le nombre de virgules', 'L’écriture du titre en majuscules'],
          answer: 1,
          explanation: 'Une copie hors consigne perd des points, quelle que soit la qualité de la langue.',
        },
      ],
    },
  ],
};
