import type { Article } from './types';

export const expressionOrale: Article = {
  slug: 'expression-orale-tcf-canada-3-taches',
  title: 'Expression orale du TCF Canada : les 3 tâches expliquées',
  description: 'Entretien dirigé, exercice en interaction et point de vue : comment se déroulent les 12 minutes face à l’examinateur, ce qu’il attend et comment structurer chaque tâche.',
  category: 'Méthode',
  published: '2026-11-05',
  image: { src: '/images/oral.jpg', alt: 'Deux personnes en conversation' },
  lead: 'L’expression orale est la plus courte des épreuves : 12 minutes, dont 2 de préparation. Mais c’est aussi celle qui stresse le plus, parce qu’on parle face à une personne. Bonne nouvelle : chacune des trois tâches suit un schéma prévisible, que l’on peut préparer.',
  blocks: [
    { type: 'h2', id: 'deroulement', text: 'Comment se déroule l’épreuve' },
    { type: 'p', text: 'Vous êtes seul avec un examinateur, qui conduit l’entretien. Les trois tâches s’enchaînent :' },
    { type: 'table', head: ['Tâche', 'Ce qu’on vous demande', 'Durée'], rows: [
      ['1. Entretien dirigé', 'Répondre à des questions sur vous : parcours, travail, famille, loisirs, projets', 'Environ 2 min, sans préparation'],
      ['2. Exercice en interaction', 'Obtenir des informations dans une situation du quotidien en posant des questions à l’examinateur, qui joue votre interlocuteur', 'Environ 5 min 30, dont 2 min de préparation'],
      ['3. Expression d’un point de vue', 'Donner et défendre votre avis sur une question de société', 'Environ 4 min 30, sans préparation'],
    ] },
    { type: 'p', text: 'Les durées totales sont publiées par France Éducation international : **12 minutes, dont 2 minutes de préparation**. La note est sur 20, convertie en NCLC par IRCC : 10 pour le NCLC 7, 12 pour le NCLC 8, 14 pour le NCLC 9.' },
    { type: 'callout', text: 'Ce qui compte : répondre vraiment à la tâche, parler de façon fluide et compréhensible, utiliser un vocabulaire varié et des phrases correctes. Un accent n’est pas une faute ; une prononciation qui gêne la compréhension, si.' },

    { type: 'h2', id: 'tache-1', text: 'Tâche 1 : l’entretien dirigé' },
    { type: 'p', text: 'L’examinateur vous pose des questions simples sur vous. C’est la tâche la plus prévisible : vous pouvez la préparer presque entièrement. L’erreur est de répondre par une phrase sèche ; l’objectif est de **développer chaque réponse** en deux ou trois phrases.' },
    { type: 'p', text: 'Préparez une présentation en cinq blocs que vous savez dire naturellement, sans réciter :' },
    { type: 'ol', items: [
      '**Identité** : prénom, âge, ville d’origine et ville actuelle.',
      '**Famille** : situation, enfants, personnes avec qui vous vivez.',
      '**Études et travail** : votre domaine, votre poste, ce que vous aimez dans ce métier.',
      '**Loisirs** : une ou deux activités, avec un détail concret (depuis quand, avec qui, pourquoi).',
      '**Projet** : pourquoi le Canada, ce que vous souhaitez y faire.',
    ] },
    { type: 'example', title: 'Développer une réponse', text: 'Question : « Qu’est-ce que vous faites pendant votre temps libre ? »\n\nRéponse trop courte : « Je fais du sport. »\n\nRéponse développée : « Je joue au football avec des collègues, tous les samedis matin. Ça me permet de décompresser après la semaine de travail. Et depuis quelques mois, je cours aussi le dimanche, parce que j’aimerais participer à un semi-marathon l’année prochaine. »' },

    { type: 'h2', id: 'tache-2', text: 'Tâche 2 : l’exercice en interaction' },
    { type: 'p', text: 'On vous donne une situation : vous voulez louer un appartement, vous inscrire à un cours, organiser un voyage, acheter un vélo d’occasion. L’examinateur joue le propriétaire, le secrétaire ou le vendeur. **C’est vous qui menez l’échange** : il faut poser des questions pour obtenir toutes les informations utiles.' },
    { type: 'p', text: 'Pendant les 2 minutes de préparation, notez des mots-clés pour chaque catégorie d’information : prix, horaires, lieu, conditions, durée, modalités de paiement, possibilités de réduction ou d’annulation.' },
    { type: 'ul', items: [
      '**Ouvrez poliment** : « Bonjour, je vous appelle au sujet de l’annonce pour l’appartement. Je peux vous poser quelques questions ? »',
      '**Variez les formes de questions** : l’intonation (« C’est meublé ? »), est-ce que (« Est-ce que les charges sont comprises ? »), l’inversion (« Combien de temps dure le bail ? », « Pourriez-vous me dire… ? »).',
      '**Réagissez aux réponses** : « D’accord », « Ah, c’est intéressant », « Et dans ce cas… ? ». Un échange n’est pas une liste de questions.',
      '**Demandez des précisions** et **reformulez** pour vérifier : « Si je comprends bien, le dépôt est d’un mois de loyer ? »',
      '**Concluez** : remerciez, résumez la suite (« Je vous rappelle demain pour la visite ») et prenez congé.',
    ] },
    { type: 'p', text: 'Notre page de [modèles de réponses](/modeles-de-reponses/) propose une banque de questions par thème (logement, études, travail, loisirs, achats, transports) avec plusieurs formes interrogatives.' },

    { type: 'h2', id: 'tache-3', text: 'Tâche 3 : exprimer un point de vue' },
    { type: 'p', text: 'L’examinateur vous présente une question ou une affirmation : « Faut-il interdire les téléphones portables à l’école ? », « Le télétravail est-il l’avenir du travail ? ». Vous parlez de manière continue pour donner votre avis et le justifier, puis il peut vous relancer ou vous contredire.' },
    { type: 'ol', items: [
      '**Introduire** : reformulez la question pour gagner quelques secondes et montrer que vous l’avez comprise. « On me demande si… C’est une question importante aujourd’hui, parce que… »',
      '**Annoncer votre position** : « Personnellement, je suis plutôt favorable à… »',
      '**Premier argument + exemple** : « D’abord… Par exemple, dans mon entreprise… »',
      '**Deuxième argument + exemple** : « Ensuite… »',
      '**Nuancer** : « Cela dit, je reconnais que… »',
      '**Conclure** : « En résumé, je pense que… à condition que… »',
    ] },
    { type: 'p', text: 'Les exemples personnels ou observés (votre ville, votre travail, un proche) rendent votre propos crédible et plus facile à développer qu’une idée abstraite. Quand l’examinateur vous contredit, ne changez pas d’avis : **reconnaissez** son argument, puis **défendez** le vôtre. « C’est vrai, mais… »' },

    { type: 'h2', id: 'erreurs', text: 'Les erreurs à éviter' },
    { type: 'ul', items: [
      'Réciter un texte appris par cœur : l’examinateur le remarque et peut vous interrompre par une question imprévue.',
      'Répondre par oui ou non en tâche 1.',
      'En tâche 2, attendre que l’examinateur parle : c’est à vous de poser les questions.',
      'En tâche 3, rester neutre ou changer de position en cours de route.',
      'Avoir peur des silences : « Laissez-moi réfléchir un instant » vaut mieux qu’un long blanc.',
    ] },

    { type: 'h2', id: 'entrainement', text: 'S’entraîner à l’oral, même seul' },
    { type: 'ol', items: [
      '**Enregistrez-vous** sur votre téléphone, chronométré, puis réécoutez : vous repérerez vos hésitations et vos tics de langage.',
      '**Pratiquez avec un partenaire** qui joue l’examinateur en tâche 2 et vous contredit en tâche 3.',
      '**Utilisez le [simulateur d’expression orale](/epreuve/expression-orale/simulateur/)** : vous parlez au micro, un interlocuteur IA vous répond en tâche 2, et vous recevez une note indicative sur 20 et un modèle.',
      '**Travaillez les [sujets et corrigés](/epreuve/expression-orale/sujets/)** pour enrichir votre stock d’idées sur les thèmes de société fréquents.',
    ] },
    { type: 'p', text: 'Pour l’écrit, la logique de la tâche 3 est très proche : voir [Expression écrite : les 3 tâches expliquées](/blog/expression-ecrite-tcf-canada-3-taches/).' },
  ],
  sources: [
    { label: 'France Éducation international : TCF Canada (présentation des épreuves)', href: 'https://www.france-education-international.fr/test/tcf-canada' },
    { label: 'IRCC : tableau de correspondance TCF Canada et NCLC', href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html' },
  ],
  related: ['expression-ecrite-tcf-canada-3-taches', 'tcf-canada-guide-complet-2026', 'preparation-tcf-canada-planning-30-jours'],
};
