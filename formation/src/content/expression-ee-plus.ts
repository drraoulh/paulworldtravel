// Additional original practice subjects for the TCF Canada expression écrite (not official subjects),
// with their model answers ("corrigés"), keyed by subject id.

import type { WritingTask } from './expression';
import type { Corrige } from './corriges';

export const moreWritingTasks: WritingTask[] = [
  // Tâche 1
  {
    id: 'ee1-coworking',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Depuis un mois, vous travaillez dans un espace de coworking près de chez vous. Écrivez un message à une amie travailleuse autonome pour lui décrire cet endroit, lui expliquer ce qui vous plaît et lui proposer de venir l’essayer avec vous.',
    minWords: 60,
    maxWords: 120,
    minutes: 10,
  },
  {
    id: 'ee1-bruit-dessus',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Depuis quelques semaines, votre voisin du dessus fait du bruit tard le soir (musique, meubles déplacés). Écrivez-lui un message poli pour lui expliquer la situation, lui dire en quoi cela vous gêne et lui proposer une solution.',
    minWords: 60,
    maxWords: 120,
    minutes: 10,
  },
  {
    id: 'ee1-friperie',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Une friperie (magasin de vêtements d’occasion) vient d’ouvrir dans votre quartier. Écrivez un message à un ami pour lui décrire le magasin, lui dire ce que vous y avez acheté et lui proposer d’y aller ensemble.',
    minWords: 60,
    maxWords: 120,
    minutes: 10,
  },
  {
    id: 'ee1-permis',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Vous voulez passer votre permis de conduire au Canada. Écrivez un message à une collègue qui l’a obtenu l’an dernier pour lui expliquer votre projet et lui poser des questions (auto-école, prix, examen, conseils).',
    minWords: 60,
    maxWords: 120,
    minutes: 10,
  },
  {
    id: 'ee1-carnaval',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Vous avez passé une fin de semaine à Québec pendant le Carnaval d’hiver. Écrivez un message à un ami qui vit au Cameroun pour lui raconter votre séjour, lui décrire la ville et lui proposer de vous accompagner l’année prochaine.',
    minWords: 60,
    maxWords: 120,
    minutes: 10,
  },
  {
    id: 'ee1-adoption',
    task: 1,
    title: 'Tâche 1 : un message',
    prompt: 'Vous venez d’adopter un chien dans un refuge. Écrivez un message à une amie qui a déjà un chien pour lui annoncer la nouvelle, lui décrire votre animal et lui demander des conseils.',
    minWords: 60,
    maxWords: 120,
    minutes: 10,
  },

  // Tâche 2
  {
    id: 'ee2-velo',
    task: 2,
    title: 'Tâche 2 : un témoignage',
    prompt: 'Votre ville encourage les habitants à se rendre au travail à vélo. Sur le blogue de la municipalité, racontez votre expérience : comment vous avez commencé, ce qui a été difficile et ce que cela a changé dans votre quotidien.',
    minWords: 120,
    maxWords: 150,
    minutes: 20,
  },
  {
    id: 'ee2-hiver',
    task: 2,
    title: 'Tâche 2 : un récit',
    prompt: 'Sur un forum de nouveaux arrivants au Canada, racontez votre premier hiver : vos impressions, les difficultés que vous avez rencontrées et les conseils que vous donneriez à ceux qui arrivent cette année.',
    minWords: 120,
    maxWords: 150,
    minutes: 20,
  },
  {
    id: 'ee2-jardin',
    task: 2,
    title: 'Tâche 2 : un article',
    prompt: 'Le journal de votre quartier consacre un numéro au jardinage en ville. Vous cultivez une parcelle dans un jardin communautaire depuis un an. Racontez votre expérience et dites ce qu’elle vous a apporté.',
    minWords: 120,
    maxWords: 150,
    minutes: 20,
  },
  {
    id: 'ee2-atelier-cuisine',
    task: 2,
    title: 'Tâche 2 : un compte rendu',
    prompt: 'Vous avez participé à un atelier de cuisine organisé par le centre communautaire de votre quartier. Rédigez un article pour le bulletin du centre : racontez le déroulement de l’atelier et dites ce que vous en avez pensé.',
    minWords: 120,
    maxWords: 150,
    minutes: 20,
  },
  {
    id: 'ee2-entretien',
    task: 2,
    title: 'Tâche 2 : un témoignage',
    prompt: 'Un site d’aide à l’emploi pour les immigrants recueille des témoignages. Racontez votre premier entretien d’embauche au Canada : comment vous l’avez préparé, comment il s’est déroulé et ce que vous en avez appris.',
    minWords: 120,
    maxWords: 150,
    minutes: 20,
  },
  {
    id: 'ee2-camping',
    task: 2,
    title: 'Tâche 2 : un récit',
    prompt: 'Sur votre blogue, racontez une fin de semaine de camping ou de randonnée dans un parc national : où vous êtes allé(e), ce que vous avez fait, ce qui vous a plu ou déplu, et si vous recommandez cette expérience.',
    minWords: 120,
    maxWords: 150,
    minutes: 20,
  },

  // Tâche 3
  {
    id: 'ee3-quatre-jours',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Un site d’actualité économique ouvre un débat : faut-il passer à la semaine de travail de quatre jours ? Présentez les deux opinions ci-dessous, puis donnez la vôtre avec des arguments.',
    documents: [
      'Document 1 : « Les entreprises qui ont adopté la semaine de quatre jours constatent que leurs employés sont moins stressés, moins souvent malades et tout aussi productifs. Un jour de repos supplémentaire permet de s’occuper de sa famille, de faire du sport ou de se former. C’est aussi un excellent argument pour attirer les jeunes talents, qui accordent de plus en plus d’importance à l’équilibre entre travail et vie privée. »',
      'Document 2 : « Concentrer la même charge de travail sur quatre jours, c’est allonger les journées et augmenter la fatigue. Ce modèle est impossible dans de nombreux secteurs : les hôpitaux, les écoles ou les commerces doivent rester ouverts cinq ou six jours par semaine. Pour les petites entreprises, embaucher du personnel supplémentaire coûterait trop cher. La semaine de quatre jours risque de devenir un privilège réservé aux employés de bureau. »',
    ],
    minWords: 120,
    maxWords: 180,
    minutes: 30,
  },
  {
    id: 'ee3-telephone-enfants',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Le journal de votre province ouvre un débat : faut-il interdire le téléphone intelligent aux enfants de moins de quinze ans ? Présentez les deux opinions ci-dessous, puis donnez la vôtre avec des arguments.',
    documents: [
      'Document 1 : « Les enfants reçoivent leur premier téléphone de plus en plus tôt, souvent vers dix ans. Or, de nombreuses études relient l’usage précoce des réseaux sociaux à l’anxiété, au harcèlement en ligne et aux troubles du sommeil. Les parents se sentent impuissants face à la pression du “tous mes amis en ont un”. Une interdiction claire jusqu’à quinze ans protégerait les enfants et soulagerait les familles. »',
      'Document 2 : « Le téléphone permet aux parents de joindre leurs enfants à tout moment, par exemple quand ils rentrent seuls de l’école. Au Cameroun comme au Canada, beaucoup de familles sont dispersées, et c’est grâce au téléphone que les enfants parlent à leurs grands-parents. Plutôt que d’interdire, il vaut mieux apprendre aux jeunes à l’utiliser de façon responsable, avec l’aide des parents et de l’école. »',
    ],
    minWords: 120,
    maxWords: 180,
    minutes: 30,
  },
  {
    id: 'ee3-pourboire',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Un magazine destiné aux nouveaux arrivants ouvre un débat : faut-il conserver l’habitude du pourboire ? Présentez les deux opinions ci-dessous, puis donnez la vôtre avec des arguments.',
    documents: [
      'Document 1 : « Au Canada, le pourboire de 15 à 20 % fait partie du revenu des serveurs, dont le salaire de base est souvent faible. Il récompense un service de qualité et encourage le personnel à être attentif aux clients. Refuser d’en laisser, c’est pénaliser des travailleurs qui gagnent déjà peu. Pour les nouveaux arrivants, c’est une règle de politesse à connaître absolument. »',
      'Document 2 : « Aujourd’hui, les terminaux de paiement proposent un pourboire partout : au café, à la boulangerie, même pour un simple achat à emporter. Les clients se sentent obligés de payer davantage, sous le regard du caissier. Ce n’est pas à eux de compléter les salaires : les restaurants devraient payer correctement leurs employés et afficher des prix qui incluent le service, comme dans de nombreux pays. »',
    ],
    minWords: 120,
    maxWords: 180,
    minutes: 30,
  },
  {
    id: 'ee3-rencontres',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Un magazine de société ouvre un débat : les applications de rencontre sont-elles une bonne façon de trouver l’amour ? Présentez les deux opinions ci-dessous, puis donnez la vôtre avec des arguments.',
    documents: [
      'Document 1 : « Les applications de rencontre permettent de faire la connaissance de personnes qu’on n’aurait jamais croisées autrement. Elles sont particulièrement utiles à ceux qui travaillent beaucoup, qui viennent d’arriver dans une nouvelle ville ou qui sont timides. De nombreux couples se forment désormais en ligne, et beaucoup durent. Ce n’est qu’une nouvelle façon de se rencontrer. »',
      'Document 2 : « Sur les applications, on choisit un partenaire comme on choisit un produit, en faisant défiler des photos. Les profils sont souvent embellis, voire mensongers, et les arnaques se multiplient. À force d’avoir trop de choix, on ne s’engage plus. Rien ne remplace une rencontre spontanée, entre amis, au travail ou dans une association, où l’on découvre vraiment la personnalité de l’autre. »',
    ],
    minWords: 120,
    maxWords: 180,
    minutes: 30,
  },
  {
    id: 'ee3-achat-local',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Le site d’information de votre région ouvre un débat : faut-il privilégier les produits locaux, même s’ils coûtent plus cher ? Présentez les deux opinions ci-dessous, puis donnez la vôtre avec des arguments.',
    documents: [
      'Document 1 : « Acheter local, c’est soutenir les agriculteurs et les commerces de sa région, et donc les emplois de ses voisins. Les produits parcourent moins de kilomètres, ce qui réduit la pollution liée au transport. Ils sont aussi plus frais : une fraise de l’île d’Orléans cueillie la veille n’a rien à voir avec une fraise importée qui a voyagé une semaine en camion. »',
      'Document 2 : « Avec la hausse du coût de la vie, beaucoup de familles ne peuvent pas payer leurs légumes deux fois plus cher au marché. En hiver, au Canada, les produits locaux sont rares, et ceux qui poussent en serre chauffée ne sont pas toujours plus écologiques. Enfin, acheter des produits importés, comme le cacao ou le café, fait aussi vivre des millions de petits producteurs en Afrique et en Amérique latine. »',
    ],
    minWords: 120,
    maxWords: 180,
    minutes: 30,
  },
  {
    id: 'ee3-frais-scolarite',
    task: 3,
    title: 'Tâche 3 : un texte argumenté',
    prompt: 'Un journal étudiant ouvre un débat : les études universitaires devraient-elles être gratuites ? Présentez les deux opinions ci-dessous, puis donnez la vôtre avec des arguments.',
    documents: [
      'Document 1 : « L’éducation est un droit, pas un produit. Lorsque les études coûtent des milliers de dollars par an, beaucoup de jeunes de familles modestes renoncent à l’université ou commencent leur vie professionnelle lourdement endettés. Plusieurs pays européens offrent la gratuité et s’en portent très bien. Une société qui investit dans le savoir de ses jeunes en profite ensuite pendant des décennies. »',
      'Document 2 : « Rien n’est vraiment gratuit : si les étudiants ne paient plus, ce sont tous les contribuables qui financent les universités, y compris ceux qui n’y ont jamais mis les pieds. Les frais de scolarité responsabilisent les étudiants, qui choisissent leur programme avec plus de sérieux. Mieux vaut maintenir des frais raisonnables et développer les bourses pour les plus démunis. »',
    ],
    minWords: 120,
    maxWords: 180,
    minutes: 30,
  },
];

export const moreWritingCorriges: Record<string, Corrige> = {
  // Expression écrite, tâche 1
  'ee1-coworking': {
    text: 'Salut Nadia,\n\nTu te souviens que je n’arrivais plus à travailler chez moi ? J’ai trouvé la solution : depuis un mois, je loue un bureau dans un espace de coworking, rue Wellington, à cinq minutes de mon appartement. C’est un ancien entrepôt rénové, très lumineux, avec une cuisine commune et des salles de réunion qu’on peut réserver.\n\nCe qui me plaît le plus, c’est l’ambiance : on travaille au calme, mais on discute aussi avec d’autres travailleurs autonomes à la pause café. J’y ai même trouvé deux nouveaux clients !\n\nLa première journée d’essai est gratuite. Veux-tu venir avec moi mardi prochain ? On pourrait dîner ensemble ensuite.\n\nBises,\nClara',
    note: 'Les trois points de la consigne sont traités dans l’ordre : description du lieu, ce qui plaît (avec un exemple concret), puis une invitation précise. Le tutoiement et les formules familières conviennent à une amie.',
  },
  'ee1-bruit-dessus': {
    text: 'Bonjour Monsieur Tremblay,\n\nJe suis votre voisine du deuxième étage, appartement 204. Je me permets de vous écrire, car depuis quelques semaines, j’entends souvent de la musique et des bruits de meubles après 23 h.\n\nJe travaille à l’hôpital et je commence à 6 h du matin : ces nuits trop courtes me fatiguent beaucoup. Je suis sûre que vous ne vous en rendez pas compte, car le bruit traverse facilement les planchers de notre vieil immeuble.\n\nSerait-il possible de baisser le volume après 22 h en semaine ? Des patins sous les chaises aideraient aussi. Si vous le souhaitez, je peux passer vous voir pour en parler.\n\nMerci de votre compréhension.\n\nCordialement,\nFatou Diallo',
    note: 'Le vouvoiement et le conditionnel de politesse (« Serait-il possible… ») rendent la plainte ferme mais courtoise. La gêne est expliquée par un fait précis, et deux solutions concrètes sont proposées.',
  },
  'ee1-friperie': {
    text: 'Salut Junior,\n\nTu cherchais un manteau d’hiver pas trop cher ? J’ai une bonne adresse pour toi ! Une friperie vient d’ouvrir rue Ontario, juste à côté de la boulangerie. Le magasin est grand et bien rangé : les vêtements sont classés par taille et par couleur, et tout est propre et en bon état.\n\nSamedi, j’y ai acheté une parka presque neuve pour 40 $ et deux chemises à 5 $ chacune. En plus, une partie des profits va à un organisme qui aide les familles du quartier.\n\nEst-ce que tu es libre dimanche après-midi ? On pourrait y passer vers 14 h, puis prendre un café.\n\nÀ plus,\nSerge',
    note: 'Le message part d’un besoin de l’ami pour introduire la description, donne des achats chiffrés et termine par une proposition précise (jour, heure). Le registre familier est cohérent du début à la fin.',
  },
  'ee1-permis': {
    text: 'Bonjour Mélissa,\n\nJ’ai enfin décidé de passer mon permis de conduire ! À Yaoundé, je prenais toujours le taxi, mais ici, avec les enfants et les longues distances, la voiture devient indispensable.\n\nComme tu l’as obtenu l’année dernière, j’aimerais te poser quelques questions. Quelle auto-école as-tu choisie, et combien t’ont coûté les cours ? Est-ce que l’examen théorique est difficile ? J’ai entendu dire que la conduite sur la neige faisait partie de la formation : est-ce vrai ?\n\nSi tu as un moment cette semaine, je t’invite à prendre un café à la cafétéria pour en parler. Tes conseils me seraient très utiles !\n\nMerci d’avance,\nArnaud',
    note: 'Le projet est justifié en une phrase, puis les questions varient les formes (inversion, « est-ce que », discours indirect). Le tutoiement reste poli, comme entre collègues proches.',
  },
  'ee1-carnaval': {
    text: 'Salut Ibrahim,\n\nJe rentre d’une fin de semaine extraordinaire à Québec, pendant le Carnaval d’hiver ! La vieille ville ressemble à un décor de film : des rues en pente, des maisons en pierre et le château Frontenac qui domine le fleuve.\n\nIl faisait −20 °C, mais l’ambiance était si chaleureuse qu’on oubliait le froid. J’ai visité le palais de glace, assisté au défilé de nuit et goûté la tire d’érable sur la neige. Tu imagines, du sirop qui durcit sur la neige ?\n\nL’année prochaine, viens avec moi ! Je t’hébergerai et je te prêterai un bon manteau. Il faudra seulement réserver ton billet d’avion assez tôt.\n\nJe t’embrasse,\nPaul',
    note: 'Le récit au passé (imparfait et passé composé), la description visuelle de la ville et l’invitation au futur couvrent toute la consigne. L’explication de la tire d’érable tient compte d’un lecteur qui ne connaît pas le Canada.',
  },
  'ee1-adoption': {
    text: 'Coucou Sandrine,\n\nJ’ai une grande nouvelle : samedi, j’ai adopté un chien au refuge de Longueuil ! Il s’appelle Biscuit, il a deux ans et c’est un croisé beagle, tout marron avec les oreilles blanches. Il est très affectueux, mais encore un peu craintif : il sursaute au moindre bruit.\n\nComme tu as Max depuis des années, j’aurais besoin de tes conseils. Quelles croquettes me recommandes-tu ? Connais-tu un bon vétérinaire dans le coin ? Et surtout, comment l’habituer à rester seul quand je pars travailler ?\n\nViens donc le rencontrer dimanche : on pourrait promener nos chiens ensemble au parc !\n\nBisous,\nMariam',
    note: 'L’annonce, la description physique et le caractère de l’animal, puis trois questions précises répondent à la consigne. La proposition finale ajoute une touche chaleureuse adaptée à une amie.',
  },

  // Expression écrite, tâche 2
  'ee2-velo': {
    text: 'Au printemps dernier, ma voiture est tombée en panne et la réparation coûtait trop cher. Un collègue m’a alors conseillé d’essayer le vélo pour aller au bureau, à huit kilomètres de chez moi. J’ai acheté un vélo d’occasion et un bon casque, et je me suis lancé.\n\nLes débuts ont été difficiles. La première semaine, j’arrivais au travail en sueur, et je n’étais pas rassuré au milieu des voitures. Heureusement, j’ai découvert une piste cyclable le long du canal : le trajet est un peu plus long, mais beaucoup plus agréable.\n\nSix mois plus tard, je ne regrette rien. J’économise près de 300 $ par mois, j’ai perdu quatre kilos et j’arrive au bureau de bonne humeur. Je recommande l’expérience à tous, à condition de bien s’équiper et de choisir un itinéraire sûr.',
    note: 'Les trois parties de la consigne forment trois paragraphes : le début, les difficultés et les changements. Les résultats chiffrés et le conseil final rendent le témoignage convaincant.',
  },
  'ee2-hiver': {
    text: 'Je suis arrivée de Douala à Winnipeg un mois de novembre, avec une simple veste en cuir. Je n’oublierai jamais ma première sortie : il faisait −30 °C, mes cils gelaient et je ne sentais plus mes doigts au bout de cinq minutes.\n\nLe plus dur n’a pourtant pas été le froid, mais l’obscurité. En décembre, il fait nuit vers 16 h 30, et je me sentais souvent fatiguée et un peu triste. Une voisine m’a conseillé de sortir chaque jour à la lumière et de m’inscrire à une activité. J’ai donc commencé le patin à glace au parc du quartier !\n\nMes conseils ? Achetez de vrais vêtements d’hiver dès votre arrivée : manteau, bottes, tuque et mitaines. Et surtout, ne restez pas enfermés : l’hiver canadien devient magnifique quand on apprend à en profiter.',
    note: 'Le récit s’ouvre sur une anecdote frappante, identifie une difficulté inattendue (l’obscurité) et se termine par des conseils à l’impératif adressés aux lecteurs du forum.',
  },
  'ee2-jardin': {
    text: 'Il y a un an, j’ai obtenu une petite parcelle dans le jardin communautaire de mon quartier, derrière l’école Saint-Jean. Je n’avais jamais jardiné en ville : au Cameroun, c’était ma grand-mère qui s’occupait du potager familial.\n\nLes premiers mois ont été une leçon d’humilité. Les écureuils ont attaqué mes tomates et j’ai trop arrosé mes semis. Heureusement, les autres jardiniers m’ont tout de suite aidée : Gilles m’a appris à faire du compost, et Mme Nguyen m’a donné des graines de coriandre.\n\nAujourd’hui, ce jardin est bien plus qu’un potager. J’y récolte des légumes frais tout l’été, mais surtout, j’y ai noué de vraies amitiés. Pour une nouvelle arrivante, c’est une façon simple de rencontrer ses voisins. Je conseille à tous ceux qui le peuvent de s’inscrire sur la liste d’attente !',
    note: 'Le récit va des débuts maladroits à un bilan positif, avec des personnages et des détails concrets. La dernière partie répond clairement à « ce qu’elle vous a apporté » et s’adresse aux lecteurs du journal.',
  },
  'ee2-atelier-cuisine': {
    text: 'Samedi dernier, j’ai participé à l’atelier « Cuisines du monde » du centre communautaire. Nous étions une douzaine de participants, de six nationalités différentes, réunis autour de Rose, une cuisinière d’origine camerounaise.\n\nAu programme : le ndolé, plat traditionnel à base de feuilles amères, d’arachides et de crevettes, accompagné de plantains frits. Rose nous a d’abord présenté les ingrédients, puis nous avons travaillé en petits groupes. Mon équipe s’est occupée des arachides ; une autre a préparé les plantains. À la fin, nous avons partagé le repas tous ensemble.\n\nJ’ai beaucoup apprécié cette matinée : les explications étaient claires et l’ambiance très conviviale. Seul regret, l’atelier n’a duré que trois heures, ce qui est un peu court pour un plat aussi long à préparer. Je recommande toutefois vivement les prochaines séances, consacrées aux cuisines libanaise et haïtienne.',
    note: 'Le compte rendu suit le déroulement de l’atelier avec des connecteurs de temps (d’abord, puis, à la fin), puis donne un avis nuancé : un point positif, un regret et une recommandation.',
  },
  'ee2-entretien': {
    text: 'Trois mois après mon arrivée à Montréal, j’ai été convoqué à mon premier entretien d’embauche, pour un poste de technicien comptable. J’étais à la fois heureux et très stressé.\n\nPour me préparer, j’ai participé à un atelier d’un organisme d’aide aux immigrants. On m’y a expliqué que les recruteurs canadiens posent souvent des questions comportementales, du type : « Racontez-moi une situation où vous avez résolu un conflit. » J’ai donc préparé plusieurs exemples tirés de mon expérience à Yaoundé.\n\nLe jour J, l’entretien a duré quarante-cinq minutes. L’ambiance était plus détendue que je ne l’imaginais : la recruteuse m’a même appelé par mon prénom ! Je n’ai pas obtenu le poste, mais j’ai beaucoup appris. Mon conseil : entraînez-vous à voix haute et préparez des exemples concrets, c’est ce qui fait la différence.',
    note: 'Le témoignage suit la consigne (préparation, déroulement, leçon) et reste utile malgré l’échec, ce qui le rend crédible. Le « ne » explétif (« que je ne l’imaginais ») et la citation montrent un bon niveau.',
  },
  'ee2-camping': {
    text: 'Le mois dernier, je suis partie camper deux nuits au parc national de la Mauricie avec des collègues. C’était la première fois que je dormais sous une tente !\n\nLe samedi, nous avons fait une randonnée de douze kilomètres jusqu’à une chute magnifique. Le paysage était superbe : des lacs à perte de vue et des forêts déjà rouges et orangées. Le soir, autour du feu, nous avons fait griller des guimauves en racontant des histoires.\n\nTout n’a pas été parfait. La première nuit, la température est descendue à 3 °C et mon sac de couchage était trop léger : j’ai très mal dormi. Le lendemain matin, les moustiques nous ont aussi dévorés.\n\nMalgré tout, je garde un souvenir merveilleux de ce séjour. Je le recommande à tous, mais pensez à vérifier la météo et à emporter un équipement adapté !',
    note: 'Chaque élément de la consigne a son paragraphe : le lieu, les activités, les points négatifs et la recommandation. L’alternance imparfait / passé composé et le vocabulaire descriptif rendent le récit vivant.',
  },

  // Expression écrite, tâche 3
  'ee3-quatre-jours': {
    text: 'La semaine de quatre jours : progrès ou privilège ?\n\nLa semaine de quatre jours fait débat. Selon le premier document, elle réduit le stress et les absences sans nuire à la productivité, et elle aide les entreprises à attirer les jeunes. Le second document estime au contraire qu’elle allonge les journées, qu’elle est inapplicable dans de nombreux secteurs et trop coûteuse pour les petites entreprises.\n\nPour ma part, je suis favorable à cette réforme, mais pas sous n’importe quelle forme. D’abord, un jour libre de plus améliore réellement la qualité de vie : mon frère, qui travaille dans un cabinet d’assurances à Québec, profite de son vendredi pour suivre une formation en ligne. Ensuite, des employés reposés font moins d’erreurs. Je reconnais cependant que ce modèle ne convient pas à tous : une infirmière ne peut pas simplement fermer son service le vendredi.\n\nIl faudrait donc laisser chaque secteur l’adapter, par exemple avec des horaires en rotation, plutôt que de l’imposer partout.',
    note: 'Titre, synthèse neutre des deux documents (environ 55 mots), puis une opinion nuancée : deux arguments, dont un illustré par un exemple, une concession qui reprend le second document et une proposition concrète.',
  },
  'ee3-telephone-enfants': {
    text: 'Faut-il interdire le téléphone intelligent avant quinze ans ? Le premier document est favorable à cette interdiction : l’usage précoce des réseaux sociaux favoriserait l’anxiété, le harcèlement et les troubles du sommeil, et une règle claire aiderait les parents. Le second s’y oppose, car le téléphone rassure les familles et maintient le lien avec les proches éloignés ; selon lui, mieux vaut éduquer qu’interdire.\n\nÀ mon avis, une interdiction totale serait difficile à appliquer, mais il faut retarder l’accès aux réseaux sociaux. Ma fille de onze ans a un téléphone simple, qui lui permet seulement d’appeler et d’envoyer des messages : je peux la joindre quand elle prend l’autobus, et elle appelle sa grand-mère à Bafoussam chaque dimanche. En revanche, je refuse qu’elle ait un compte sur les réseaux sociaux avant quinze ans, car j’ai vu certaines de ses camarades souffrir de moqueries en ligne. L’école devrait aussi interdire les téléphones en classe. Ainsi, on protégerait les enfants sans les priver des avantages du téléphone.',
    note: 'La synthèse reformule les deux documents sans les recopier (conditionnel pour rapporter un avis). L’opinion distingue le téléphone des réseaux sociaux, ce qui permet une position nuancée appuyée sur un exemple familial.',
  },
  'ee3-pourboire': {
    text: 'Le pourboire : politesse ou obligation ?\n\nLe pourboire divise. Pour l’auteur du premier document, il constitue une part essentielle du revenu des serveurs, récompense un bon service et fait partie des règles de politesse au Canada. Le second document dénonce au contraire sa généralisation, qui met les clients mal à l’aise, et estime que c’est aux employeurs de bien payer leur personnel.\n\nÀ mon avis, il faut maintenir le pourboire au restaurant, mais limiter ses excès. À mon arrivée de Dakar, je ne connaissais pas cette habitude, et un serveur m’a gentiment expliqué qu’il vivait en grande partie de ces sommes : depuis, je laisse toujours 15 %. En revanche, je trouve gênant qu’on me propose 18 % pour un simple café servi au comptoir. Le pourboire devrait rester un remerciement pour un vrai service, et non une taxe déguisée.\n\nIdéalement, les salaires augmenteraient progressivement, et le pourboire redeviendrait un geste libre plutôt qu’une obligation.',
    note: 'Le titre pose l’alternative du débat. L’opinion prend une position médiane, appuyée sur une expérience de nouvel arrivant et sur un contre-exemple, puis se conclut par une proposition au conditionnel.',
  },
  'ee3-rencontres': {
    text: 'Les applications de rencontre sont-elles une bonne façon de trouver l’amour ? D’après le premier document, elles élargissent les possibilités de rencontre, surtout pour les personnes très occupées, timides ou récemment installées. Le second document critique au contraire une logique de consommation, des profils trompeurs et une difficulté croissante à s’engager.\n\nJe pense que ces applications sont un outil utile, à condition de les utiliser avec prudence. Quand je suis arrivé à Ottawa, je ne connaissais personne en dehors de mon travail ; c’est grâce à une application que j’ai rencontré ma compagne, avec qui je vis depuis trois ans. Toutefois, je comprends les critiques du second document : une amie a failli être victime d’une arnaque, un homme lui ayant demandé de l’argent après quelques semaines d’échanges. Il est donc essentiel de rencontrer rapidement la personne dans un lieu public et de ne jamais envoyer d’argent.\n\nEn somme, l’application ne fait que provoquer la rencontre : c’est ensuite à chacun de construire la relation.',
    note: 'Les deux points de vue sont résumés avec des connecteurs (d’après, au contraire). L’avis s’appuie sur un exemple positif et un exemple négatif, puis tire un conseil pratique avant une conclusion bien frappée.',
  },
  'ee3-achat-local': {
    text: 'Acheter local : un choix responsable, mais pour qui ?\n\nFaut-il privilégier les produits locaux ? Le premier document y voit un moyen de soutenir l’économie régionale, de limiter la pollution due au transport et de manger plus frais. Le second rappelle au contraire leur prix élevé pour les familles modestes, leur rareté en hiver et l’importance des importations pour les petits producteurs des pays du Sud.\n\nSelon moi, il faut acheter local dès que c’est possible, sans en faire une règle absolue. L’été, je fais mes courses au marché Jean-Talon : les légumes y sont délicieux et, en parlant avec les maraîchers, je sais d’où vient ce que je mange. En revanche, en janvier, je n’hésite pas à acheter des oranges ou des bananes importées, bien moins chères. Par ailleurs, ma famille cultive le cacao près d’Ebolowa : je sais combien les exportations comptent pour ces villages.\n\nL’important est donc de consommer de façon réfléchie : local quand on le peut, équitable quand on importe.',
    note: 'La synthèse reprend les trois arguments de chaque document en une phrase chacun. L’opinion, illustrée par des exemples canadien et camerounais, aboutit à une formule de conclusion équilibrée.',
  },
  'ee3-frais-scolarite': {
    text: 'Faut-il rendre les études universitaires gratuites ? Selon le premier document, l’éducation est un droit : des frais élevés découragent les jeunes de milieux modestes ou les endettent, alors que la gratuité profite à toute la société. Le second document répond que la gratuité serait payée par l’ensemble des contribuables, et que des frais raisonnables, accompagnés de bourses, responsabilisent les étudiants.\n\nPour ma part, je suis plutôt favorable à la gratuité, ou du moins à des frais très bas. Au Cameroun, j’ai vu des camarades brillants abandonner leurs études parce que leur famille ne pouvait plus payer. Au Québec, où les frais sont parmi les plus bas du pays, mon fils a pu faire son baccalauréat sans s’endetter, en travaillant seulement l’été. Je reconnais toutefois qu’un système de bourses généreuses serait peut-être plus juste pour les finances publiques.\n\nFinalement, l’essentiel est qu’aucun jeune ne renonce à l’université pour des raisons financières.',
    note: 'La première partie oppose clairement les deux positions ; la seconde défend un avis appuyé sur deux exemples contrastés (Cameroun, Québec), avec une concession qui montre la capacité à nuancer.',
  },
};
