/**
 * Model answers ("corrigés") for each practice subject, keyed by subject id.
 * Original texts written for this platform. They are shown to candidates, never sent to the AI.
 */
export interface Corrige {
  text: string;
  /** What makes the model work, in one or two sentences. */
  note: string;
}

export const corriges: Record<string, Corrige> = {
  // Expression écrite, tâche 1
  'ee1-demenagement': {
    text: 'Salut Karim,\n\nJ’ai enfin emménagé dans mon nouvel appartement à Laval ! Il est au deuxième étage d’un petit immeuble calme, avec deux chambres et une cuisine lumineuse. Le quartier me plaît beaucoup : il y a un grand parc juste en face et une épicerie au coin de la rue. Le métro est à dix minutes à pied, donc c’est très pratique pour aller au travail.\n\nEst-ce que tu serais libre samedi prochain ? Je t’invite à souper vers 19 h pour fêter mon installation. Dis-moi si ça te va !\n\nÀ bientôt,\nAïcha',
    note: 'Les trois points de la consigne sont traités : le logement, le quartier, l’invitation. Le tutoiement est cohérent et l’invitation est précise (jour, heure).',
  },
  'ee1-cours': {
    text: 'Bonjour Madame Lefebvre,\n\nJe suis désolé, mais je ne pourrai pas assister au cours de français de samedi prochain. Mon employeur m’a demandé de remplacer un collègue malade ce jour-là, et je n’ai pas pu refuser.\n\nJe ne voudrais pas prendre de retard, surtout avant l’examen blanc. Pourriez-vous m’indiquer les exercices à faire à la maison ? Si c’est possible, je pourrais aussi rejoindre le groupe du mercredi soir pour rattraper la séance.\n\nJe vous remercie par avance pour votre compréhension.\n\nCordialement,\nMoussa Keita',
    note: 'Registre formel adapté à un formateur : excuse, raison précise, puis deux propositions concrètes pour rattraper le cours.',
  },
  'ee1-voisin': {
    text: 'Chers voisins,\n\nNous organisons une petite fête chez nous, au 3e étage, ce samedi soir à partir de 19 h, pour l’anniversaire de notre fille. Nous serons une quinzaine de personnes.\n\nNous ferons attention au volume de la musique et nous baisserons le son à partir de 23 h. Nous vous prions de nous excuser à l’avance pour le bruit éventuel.\n\nSi quelque chose vous dérange, n’hésitez pas à frapper à notre porte ou à nous appeler au 514 555-0142. Et si vous voulez passer prendre un morceau de gâteau, vous êtes les bienvenus !\n\nBien cordialement,\nFamille Nkoulou',
    note: 'Le message prévient, s’excuse et donne un moyen de contact, comme demandé. Le ton reste poli et chaleureux, avec une invitation qui rassure les voisins.',
  },
  'ee1-recommandation': {
    text: 'Bonjour Chloé,\n\nPour l’anniversaire de ton mari, je te conseille « Le Jardin d’Hiver », rue Saint-Joseph. C’est un petit restaurant chaleureux, avec des lumières douces et une terrasse fleurie en été.\n\nLe chef prépare une cuisine québécoise moderne : son canard à l’érable est délicieux et les desserts sont faits maison. Compte environ 50 $ par personne avec le vin.\n\nIl est ouvert du mercredi au dimanche, à partir de 17 h 30. Réserve absolument, surtout le week-end, et précise que c’est un anniversaire : ils offrent souvent le dessert !\n\nBonne soirée à vous deux,\nNadia',
    note: 'Le lieu, les plats et les informations pratiques (adresse, prix, horaires, réservation) sont tous présents. Le vocabulaire est précis et varié.',
  },

  // Expression écrite, tâche 2
  'ee2-evenement': {
    text: 'Une course solidaire sous le soleil\n\nLe mois dernier, j’ai participé pour la première fois à la course de cinq kilomètres organisée au parc Jarry au profit de la banque alimentaire. Nous étions plus de six cents coureurs, de tous les âges.\n\nAu départ, j’étais un peu stressée : je ne m’étais entraînée que trois semaines. Mais l’ambiance m’a vite portée. Tout au long du parcours, des bénévoles distribuaient de l’eau et des enfants nous encourageaient en tapant dans nos mains. Au troisième kilomètre, j’ai eu envie d’abandonner, puis une coureuse plus âgée m’a lancé : « Courage, on y est presque ! »\n\nJ’ai fini en trente-quatre minutes, très fière de moi. Au-delà de la performance, j’ai surtout aimé cette solidarité entre inconnus. Je recommande cette course à tous les habitants du quartier : on y retourne ensemble l’an prochain ?',
    note: 'Un récit chronologique au passé (imparfait pour le décor, passé composé pour les actions), un moment marquant et un avis final, comme le demande la consigne.',
  },
  'ee2-experience': {
    text: 'Mon premier hiver à Québec\n\nJe suis arrivé à Québec en janvier dernier pour commencer mes études. Le premier matin, il faisait moins vingt degrés et la ville était couverte de neige. Je n’avais jamais vu un tel paysage !\n\nD’abord, j’ai dû apprendre à m’habiller : un manteau, des bottes, une tuque et des mitaines. Ensuite, une voisine m’a montré comment marcher sur la glace sans tomber. Ce qui m’a le plus surpris, c’est la gentillesse des gens : dans le bus, un inconnu m’a conseillé un magasin pour acheter des vêtements chauds moins chers.\n\nAprès quelques semaines, je me suis habitué au froid et j’ai même essayé le patin à glace. Aujourd’hui, je garde un excellent souvenir de cette expérience. Si vous partez au Canada en hiver, préparez-vous bien, mais n’ayez pas peur : on s’adapte vite !',
    note: 'La surprise, la difficulté et ce que l’auteur en retient sont clairement présents. Les connecteurs de temps structurent le récit.',
  },
  'ee2-benevolat': {
    text: 'Une journée au service des aînés\n\nSamedi dernier, une dizaine de membres de notre association ont passé la journée à la résidence Les Érables pour accompagner des personnes âgées et leur offrir un moment de compagnie.\n\nLe matin, nous avons aidé le personnel à servir le petit-déjeuner, puis nous avons organisé un atelier de chant. Monsieur Gagnon, quatre-vingt-onze ans, connaissait toutes les chansons par cœur ! L’après-midi, nous avons accompagné les résidents qui le souhaitaient pour une promenade dans le jardin. Certains ne sortaient presque plus et nous ont remerciés les larmes aux yeux.\n\nJe pensais venir aider ; j’ai finalement beaucoup reçu. Ces conversations m’ont rappelé mes grands-parents restés au Cameroun et m’ont donné envie de m’engager régulièrement. La résidence cherche des bénévoles un samedi par mois : qui veut se joindre à moi ?',
    note: 'Le déroulement de la journée est raconté étape par étape, avec un détail humain marquant, puis l’apport personnel de l’expérience.',
  },
  'ee2-formation': {
    text: 'Note à l’équipe : formation « Service client et gestion des plaintes »\n\nMardi dernier, j’ai suivi la journée de formation organisée par le centre de formation professionnelle de Laval.\n\nLa matinée a commencé par une présentation des attentes des clients, illustrée par des exemples réels. Ensuite, nous avons fait des jeux de rôle : chacun jouait tour à tour un client mécontent et un conseiller. C’était un peu intimidant au début, mais très utile. L’après-midi était consacré aux réponses écrites aux plaintes, avec des modèles de courriels.\n\nJ’ai surtout retenu une méthode simple : écouter sans interrompre, reformuler le problème, puis proposer une solution concrète avec un délai. Je l’ai déjà testée cette semaine, avec succès.\n\nJe recommande vivement cette formation, en particulier aux nouveaux collègues. Je peux partager les documents reçus à ceux qui le souhaitent.',
    note: 'Le compte rendu suit l’ordre de la journée, précise ce qui a été appris et se termine par une recommandation argumentée, adressée aux collègues.',
  },

  // Expression écrite, tâche 3
  'ee3-teletravail': {
    text: 'Télétravail : liberté ou isolement ?\n\nLe travail à distance divise. Selon le premier document, il fait gagner du temps, réduit le stress des transports et rend les salariés plus autonomes. Le second texte affirme au contraire qu’il isole les employés, nuit à l’esprit d’équipe et efface la frontière avec la vie privée.\n\nÀ mon avis, le télétravail est une bonne solution à condition de le limiter. D’une part, il améliore réellement la qualité de vie : ma sœur, qui habite loin de son bureau, économise deux heures de trajet par jour et se sent moins fatiguée. D’autre part, je reconnais que le contact humain reste indispensable. Dans mon entreprise, les réunions en présentiel permettent de régler en dix minutes des problèmes qui prendraient des jours par courriel.\n\nC’est pourquoi je pense qu’un équilibre de deux ou trois jours de télétravail par semaine est idéal : on garde la souplesse sans perdre le lien avec ses collègues.',
    note: 'Titre, résumé neutre des deux documents avec un connecteur d’opposition (environ 50 mots), puis une opinion nuancée avec deux exemples (environ 100 mots).',
  },
  'ee3-ecrans': {
    text: 'Écrans et enfants : interdire ou accompagner ?\n\nLe temps d’écran des enfants fait débat. Pour l’auteur du premier document, les écrans sont des outils d’apprentissage qu’il serait dommage d’interdire. Le second document souligne au contraire leurs effets négatifs sur le sommeil, la concentration et la vie de famille.\n\nPersonnellement, je pense qu’il faut limiter le temps d’écran, mais surtout choisir les contenus. En effet, mon fils de dix ans a beaucoup progressé en anglais grâce à une application de langue, utilisée vingt minutes par jour. En revanche, j’ai remarqué qu’il dort mal lorsqu’il regarde des vidéos le soir. Nous avons donc fixé une règle simple : pas d’écran pendant les repas ni après 19 h.\n\nEn définitive, l’écran n’est ni un ennemi ni une baby-sitter : c’est un outil, et c’est aux parents de fixer le cadre de son utilisation.',
    note: 'La première partie oppose clairement les deux documents ; la seconde défend une position médiane avec des exemples personnels concrets.',
  },
  'ee3-etudiants': {
    text: 'Travailler pendant ses études : atout ou danger ?\n\nFaut-il travailler pendant ses études ? Le premier document y voit une occasion d’apprendre à gérer son temps et son argent, et une première expérience utile pour le CV. Le second estime au contraire qu’un emploi trop prenant fatigue les étudiants et menace leur réussite.\n\nSelon moi, un petit emploi est bénéfique s’il reste raisonnable. D’abord, il rend plus autonome : lorsque je travaillais dix heures par semaine dans une librairie, j’ai appris à mieux m’organiser et à parler avec des clients. Ensuite, il ouvre des portes : c’est grâce à ce poste que j’ai obtenu mon premier stage. Cependant, je comprends les craintes du second document : une amie qui travaillait vingt-cinq heures par semaine a dû redoubler sa deuxième année.\n\nC’est pourquoi je pense qu’il faudrait limiter le travail étudiant à une quinzaine d’heures par semaine pendant les sessions.',
    note: 'L’opinion est nuancée et s’appuie sur deux exemples personnels, puis sur un contre-exemple qui rejoint le second document.',
  },
  'ee3-uniforme': {
    text: 'L’uniforme à l’école : égalité ou uniformité ?\n\nL’uniforme scolaire divise les parents. Le premier document estime qu’il gomme les différences sociales, limite les moqueries et renforce le sentiment d’appartenance. Le second y voit au contraire une atteinte à la personnalité des jeunes et une dépense de plus pour les familles.\n\nPour ma part, je suis plutôt favorable à l’uniforme. Au Cameroun, je l’ai porté pendant toute ma scolarité, et je me souviens que personne ne jugeait les autres sur leurs vêtements : cela nous permettait de nous concentrer sur nos études. Par ailleurs, l’uniforme évite les discussions quotidiennes entre parents et enfants sur la tenue à porter. Je reconnais toutefois que son coût peut peser sur les familles modestes ; l’école devrait donc proposer des uniformes d’occasion ou une aide financière.\n\nAinsi, bien encadré, l’uniforme me semble favoriser l’égalité plutôt que l’uniformité.',
    note: 'Le titre reprend le débat avec un jeu de mots, la synthèse est neutre, et l’opinion répond à l’objection du coût par une proposition concrète.',
  },

  // Expression orale, tâche 1
  'eo1-presentation': {
    text: '« Je m’appelle Clarisse, j’ai trente et un ans et je viens de Bafoussam, dans l’ouest du Cameroun. Je vis à Douala depuis huit ans avec mon mari et nos deux enfants, qui ont six et trois ans.\nJe suis comptable dans une entreprise de transport. J’ai fait mes études à l’Université de Douala, puis j’ai obtenu un diplôme d’expertise comptable. Ce que j’aime dans mon métier, c’est la précision, et le fait d’aider l’entreprise à prendre de bonnes décisions.\nPendant mon temps libre, je chante dans une chorale et j’aime cuisiner pour la famille le dimanche.\nNotre projet, c’est de nous installer à Sherbrooke, au Québec. J’aimerais faire reconnaître mon diplôme et travailler dans un cabinet comptable. Nous avons choisi cette ville parce qu’elle est calme, qu’il y a une université et que le coût de la vie y est plus bas qu’à Montréal. »',
    note: 'Chaque thème est développé avec des détails concrets. Les trois temps (passé, présent, futur ou conditionnel) montrent l’étendue de la grammaire.',
  },
  'eo1-loisirs': {
    text: '« J’habite à Bonamoussadi, un quartier animé de Douala. Le matin, on entend les vendeurs de beignets et les motos ; le soir, les gens se retrouvent devant les boutiques pour discuter.\nPendant mon temps libre, je joue au football avec des amis le samedi, et le dimanche, je vais souvent à la plage de Kribi avec ma famille quand nous en avons l’occasion. J’aime aussi lire des romans policiers.\nSi je pars au Canada, ce qui me manquera le plus, c’est la chaleur, dans les deux sens du mot : le soleil, bien sûr, mais aussi la chaleur humaine, cette habitude de parler avec tout le monde dans la rue. En revanche, les embouteillages ne me manqueront pas du tout ! Je pense que je vais découvrir de nouveaux loisirs, comme le patin à glace ou la randonnée en forêt. »',
    note: 'La description est vivante grâce aux détails sensoriels. Le jeu sur le mot « chaleur » et l’opposition « en revanche » montrent un bon niveau.',
  },
  'eo1-travail': {
    text: '« Je suis enseignant de mathématiques dans un lycée de Yaoundé. Ma journée commence tôt : j’arrive à sept heures pour préparer mes cours, puis j’enseigne jusqu’à midi à des classes de quarante à cinquante élèves. L’après-midi, je corrige des copies et je reçois parfois des parents.\nCe que j’aime le plus, c’est le moment où un élève qui avait des difficultés comprend enfin un exercice : on voit son visage s’éclairer. Ce qui est difficile, ce sont les classes très chargées : il est compliqué de suivre chaque élève.\nAu Canada, j’aimerais continuer à enseigner. Je sais qu’il faudra obtenir une autorisation d’enseigner et peut-être suivre une formation complémentaire. C’est pourquoi je prépare déjà mon dossier. À plus long terme, je voudrais me spécialiser dans l’aide aux élèves en difficulté. »',
    note: 'La journée type est racontée dans l’ordre, avec un point positif, une difficulté et un projet réaliste, ce qui montre une bonne connaissance de la démarche.',
  },

  // Expression orale, tâche 2
  'eo2-logement': {
    text: 'Questions modèles :\n• Bonjour Monsieur, je vous appelle au sujet de l’appartement de la rue Saint-Denis. Est-il toujours disponible ?\n• À partir de quelle date serait-il libre ?\n• Combien coûte le loyer, et les charges sont-elles comprises ?\n• L’électricité est-elle incluse ? À combien faut-il s’attendre par mois ?\n• À quel étage se trouve l’appartement ? Y a-t-il un ascenseur ?\n• Le quartier est-il bien desservi par les transports en commun ?\n• Les animaux sont-ils acceptés ? J’ai un chat.\n• Faut-il verser un dépôt à la signature du bail ?\n• Serait-il possible de visiter samedi matin ?\n• Merci beaucoup pour toutes ces informations. Je vous confirme la visite demain.',
    note: 'Les questions couvrent tous les points de la consigne et varient les formes : inversion, « est-ce que », mots interrogatifs, conditionnel de politesse.',
  },
  'eo2-sport': {
    text: 'Questions modèles :\n• Bonjour, je viens d’arriver dans le quartier et j’aimerais m’inscrire au centre sportif. Quelles activités proposez-vous ?\n• Quels sont vos horaires en semaine et la fin de semaine ?\n• Combien coûte l’abonnement ? Y a-t-il une différence entre un abonnement mensuel et annuel ?\n• Proposez-vous un tarif réduit pour les nouveaux arrivants ?\n• Quels documents dois-je fournir pour m’inscrire ?\n• Est-il possible d’essayer un cours avant de m’engager ?\n• Faut-il réserver les cours collectifs à l’avance ?\n• Qu’est-ce que je dois apporter pour la piscine ?\n• Parfait, je reviens demain avec mes documents. Merci pour votre accueil !',
    note: 'Le candidat présente sa situation, demande des précisions utiles (réduction, essai) et termine par une formule qui annonce la suite.',
  },
  'eo2-voyage': {
    text: 'Questions modèles :\n• Bonjour, nous aimerions passer une fin de semaine à Québec en famille, avec deux enfants de huit et onze ans. Qu’est-ce que vous nous proposez ?\n• Comment se fait le transport ? Est-ce qu’il vaut mieux prendre le train ou l’autocar ?\n• Où se trouve l’hôtel ? Le petit-déjeuner est-il compris ?\n• Quel est le prix total pour deux adultes et deux enfants ?\n• Quelles activités sont incluses dans le forfait ?\n• Y a-t-il des activités en option adaptées aux enfants ?\n• Que se passe-t-il si nous devons annuler ?\n• Comment se fait le paiement : en une fois ou en plusieurs ?\n• Très bien, je vais en parler avec mon mari et je vous rappelle d’ici jeudi.',
    note: 'La situation est posée dès le début, ce qui permet des questions pertinentes. Le candidat compare les options et n’oublie pas les conditions (annulation, paiement).',
  },

  // Expression orale, tâche 3
  'eo3-transport': {
    text: '« Faut-il interdire les voitures dans le centre des grandes villes ? Personnellement, je suis plutôt favorable à cette idée, mais pas sans conditions.\nD’abord, la pollution est un vrai problème de santé. À Douala, aux heures de pointe, l’air devient difficile à respirer, et beaucoup d’enfants souffrent d’asthme. Moins de voitures, c’est un air plus sain.\nEnsuite, un centre sans voitures est plus agréable à vivre. J’ai visité Strasbourg, où le centre est piéton : les gens se promènent, les commerces sont pleins, on entend les conversations plutôt que les klaxons.\nCela dit, il faut reconnaître que cette mesure peut pénaliser certaines personnes : les personnes âgées, les artisans qui transportent du matériel, ou ceux qui habitent loin, sans bus. Une interdiction n’a de sens que si les transports en commun sont efficaces et si des exceptions sont prévues.\nPour conclure, je dirais oui à un centre sans voitures, à condition de proposer d’abord de vraies solutions pour se déplacer autrement. »',
    note: 'Position nette dès le début, deux arguments illustrés par des exemples vécus, une nuance sérieuse, puis une conclusion qui reprend la position.',
  },
  'eo3-reseaux': {
    text: '« Les réseaux sociaux nous rapprochent-ils de nos proches ? Je dirais qu’ils nous rapprochent, oui, mais d’une manière qui a ses limites.\nD’un côté, ils ont changé la vie des familles séparées par la distance. Ma tante, qui vit à Paris, voit grandir ses petits-enfants grâce aux photos et aux appels vidéo. Il y a vingt ans, on attendait une lettre pendant des semaines ; aujourd’hui, on se parle tous les jours, gratuitement.\nDe l’autre côté, ce contact permanent peut rester superficiel. On « aime » une photo, on envoie un émoji, et on a l’impression d’avoir pris des nouvelles, alors qu’on n’a pas vraiment parlé. J’ai remarqué que, dans ma famille, on s’appelle moins longtemps qu’avant, justement parce qu’on croit tout savoir grâce aux réseaux.\nPour conclure, je pense que les réseaux sociaux sont un excellent outil pour garder le lien, à condition de ne pas les confondre avec une vraie conversation. »',
    note: 'L’opinion est construite en deux temps (d’un côté, de l’autre), chacun appuyé sur un exemple, puis la conclusion fait la synthèse.',
  },
  'eo3-langues': {
    text: '« Apprendre une deuxième langue dès la maternelle ? Je suis tout à fait d’accord, et je vais vous expliquer pourquoi.\nPremièrement, les jeunes enfants apprennent les langues avec une facilité étonnante. Au Cameroun, beaucoup d’enfants parlent leur langue maternelle, le français et parfois l’anglais avant dix ans, simplement parce qu’ils les entendent autour d’eux. Mon neveu de cinq ans passe d’une langue à l’autre sans même y penser.\nDeuxièmement, parler plusieurs langues ouvre des portes : pour les études, pour le travail, et pour comprendre d’autres cultures. Au Canada, être bilingue français-anglais est un vrai avantage pour trouver un emploi.\nBien sûr, il y a des conditions. Il faut des enseignants formés, et il ne faut pas que la deuxième langue fasse oublier la langue maternelle, qui reste la base de l’identité.\nEn somme, commencer tôt est une chance, à condition de bien l’organiser. »',
    note: 'Les arguments sont annoncés (premièrement, deuxièmement), illustrés par des exemples précis, puis nuancés par des conditions réalistes.',
  },
};
