// Additional original practice subjects for the TCF Canada speaking test (not official subjects),
// with their model answers. Merged with `speakingTasks` and `corriges` by the pages that use them.
import type { SpeakingTask } from './expression';
import type { Corrige } from './corriges';

const t2Tips = (situation: string, details: string): string[] => [
  'Pendant les 2 minutes de préparation, notez les questions à poser.',
  situation,
  details,
];

export const moreSpeakingTasks: SpeakingTask[] = [
  // Tâche 1 : entretien dirigé
  {
    id: 'eo1-famille',
    task: 1,
    title: 'Tâche 1 : entretien dirigé',
    prompt: 'Parlez de votre famille : qui la compose, où vivent ses membres, ce que vous faites ensemble et la place qu’elle tient dans votre vie. Dites aussi comment vous comptez garder le lien avec elle si vous vous installez au Canada.',
    tips: ['Présentez chaque personne avec un détail concret : métier, caractère, habitude.', 'Terminez au futur : appels, visites, projets communs.'],
    seconds: 120,
    mode: 'monologue',
  },
  {
    id: 'eo1-souvenir-voyage',
    task: 1,
    title: 'Tâche 1 : entretien dirigé',
    prompt: 'Parlez d’un voyage qui vous a marqué : où vous êtes allé, avec qui, ce que vous avez fait et pourquoi vous vous en souvenez. Dites aussi quelle région du Canada vous aimeriez découvrir.',
    tips: ['Racontez au passé composé et décrivez à l’imparfait.', 'Expliquez ce que ce voyage vous a appris ou fait ressentir.'],
    seconds: 120,
    mode: 'monologue',
  },
  {
    id: 'eo1-numerique',
    task: 1,
    title: 'Tâche 1 : entretien dirigé',
    prompt: 'Parlez de la place du téléphone et d’Internet dans votre quotidien : à quels moments vous les utilisez, pour quoi faire, ce qu’ils vous apportent et ce qui vous dérange. Dites aussi si vous essayez de limiter votre temps d’écran.',
    tips: ['Donnez des exemples précis tirés de votre journée.', 'Montrez un avis nuancé : avantages et inconvénients.'],
    seconds: 120,
    mode: 'monologue',
  },
  {
    id: 'eo1-fetes',
    task: 1,
    title: 'Tâche 1 : entretien dirigé',
    prompt: 'Parlez des fêtes que vous célébrez : la fête la plus importante pour vous, comment elle se déroule, ce que l’on mange, qui est invité. Dites aussi comment vous imaginez la célébrer au Canada, et quelle fête canadienne vous aimeriez découvrir.',
    tips: ['Décrivez la journée dans l’ordre : les préparatifs, le repas, la soirée.', 'Utilisez le conditionnel pour imaginer la fête au Canada.'],
    seconds: 120,
    mode: 'monologue',
  },
  {
    id: 'eo1-entraide',
    task: 1,
    title: 'Tâche 1 : entretien dirigé',
    prompt: 'Parlez de votre engagement auprès des autres : une association, un groupe religieux, une tontine, l’aide à des voisins ou à la famille. Expliquez ce que vous faites, depuis quand, et ce que cela vous apporte. Dites aussi si vous aimeriez faire du bénévolat au Canada.',
    tips: ['Expliquez concrètement votre rôle : tâches, fréquence, personnes aidées.', 'Dites ce que vous en retirez personnellement.'],
    seconds: 120,
    mode: 'monologue',
  },

  // Tâche 2 : exercice en interaction
  {
    id: 'eo2-garderie',
    task: 2,
    title: 'Tâche 2 : obtenir des informations',
    prompt: 'Vous venez de vous installer à Gatineau avec votre fille de trois ans et vous cherchez une garderie. Vous appelez un centre de la petite enfance (CPE) : posez des questions sur les places disponibles, les horaires, le tarif, les repas, les activités et l’inscription.',
    tips: t2Tips(
      'Présentez votre situation : âge de l’enfant, date à laquelle vous reprenez le travail, langue parlée à la maison.',
      'Interrogez aussi la vie quotidienne (sieste, allergies, adaptation) et réagissez aux réponses.',
    ),
    seconds: 210,
    mode: 'interaction',
    prepSeconds: 120,
    partner: {
      role: 'Mme Gagnon, la directrice adjointe du CPE Les Petits Pins, qui répond au téléphone',
      opening: 'CPE Les Petits Pins, bonjour ! Nathalie Gagnon à l’appareil.',
      facts:
        'CPE situé rue Notre-Dame, dans le secteur Gatineau, près d’un parc ; 60 places réparties en 6 groupes, enfants de 18 mois à 5 ans. ' +
        'Pour les 3 ans : groupe de 8 enfants pour une éducatrice. Une place se libère le 1er février dans le groupe des 3-4 ans ; sinon, liste d’attente d’environ 6 mois. ' +
        'Inscription obligatoire au guichet unique en ligne « La Place 0-5 » (gratuit), puis rencontre au CPE avec le certificat de naissance de l’enfant, son carnet de vaccination et une preuve d’adresse. ' +
        'Ouvert du lundi au vendredi de 7 h à 18 h ; fermé les jours fériés et deux semaines à Noël. Tarif réduit : 9,35 $ par jour, payable par prélèvement toutes les deux semaines ; 10 $ de frais par tranche de 15 minutes de retard après 18 h. ' +
        'Inclus : deux collations et un dîner chaud préparé sur place par une cuisinière ; menus sans arachides ni noix ; régimes particuliers (allergies, sans porc) acceptés avec un billet médical ou sur demande écrite. ' +
        'Sieste de 13 h à 15 h ; apporter un drap, une couverture, des vêtements de rechange et des couches si besoin. Sortie au parc tous les jours si la température dépasse −20 °C ; habit de neige, bottes et mitaines obligatoires l’hiver. ' +
        'Activités : éveil musical le mardi, bricolage, lecture, initiation à l’anglais le jeudi. Toutes les éducatrices parlent français. ' +
        'Période d’adaptation conseillée : une semaine, avec des journées plus courtes. Visite possible le mercredi à 9 h 30 sur rendez-vous.',
    },
  },
  {
    id: 'eo2-location-auto',
    task: 2,
    title: 'Tâche 2 : obtenir des informations',
    prompt: 'Vous voulez louer une voiture pour une semaine afin de visiter la Gaspésie avec deux amis. Vous parlez avec l’employé d’une agence de location à Québec : posez des questions sur les modèles, les prix, l’assurance, le kilométrage, le permis de conduire et les conditions de retour.',
    tips: t2Tips(
      'Précisez votre situation : dates, nombre de passagers, bagages, permis étranger.',
      'Comparez les options (catégorie, assurance, conducteur supplémentaire) et faites-vous confirmer le prix total.',
    ),
    seconds: 210,
    mode: 'interaction',
    prepSeconds: 120,
    partner: {
      role: 'l’employé du comptoir de l’agence Location Boréale, à Québec',
      opening: 'Bonjour, bienvenue chez Location Boréale ! Qu’est-ce que je peux faire pour vous ?',
      facts:
        'Agence boulevard Laurier, à Québec, ouverte de 7 h à 21 h tous les jours ; comptoir aussi à l’aéroport Jean-Lesage (même tarif, plus 15 % de frais d’aéroport). ' +
        'Trois catégories : compacte (Toyota Corolla ou équivalent) 52 $ par jour ou 310 $ la semaine ; VUS intermédiaire (Toyota RAV4 ou équivalent) 78 $ par jour ou 470 $ la semaine ; fourgonnette 7 places 95 $ par jour. Pour 3 personnes et des bagages en Gaspésie, l’employé conseille le VUS. ' +
        'Kilométrage illimité au Québec à partir de 3 jours de location. Taxes en plus (environ 15 %). ' +
        'Assurance responsabilité civile incluse. Protection contre les dommages (exonération) en option : 24 $ par jour, franchise réduite à 500 $ ; sans cette option, franchise de 2 500 $. Certaines cartes de crédit couvrent les dommages : vérifier auprès de la banque. ' +
        'Conducteur : 21 ans minimum ; supplément de 25 $ par jour avant 25 ans. Conducteur supplémentaire : 12 $ par jour, il doit être présent avec son permis. ' +
        'Permis étranger accepté pour un séjour touristique s’il est en français ou en anglais ; sinon, permis international obligatoire. Carte de crédit au nom du conducteur obligatoire, avec un dépôt de 500 $ bloqué et libéré au retour. Pas de carte de débit. ' +
        'Le véhicule est remis le plein fait et doit être rendu le plein fait ; sinon, essence facturée 2,40 $ le litre. Retard de plus d’une heure : une journée supplémentaire facturée. ' +
        'Pneus d’hiver inclus du 1er décembre au 15 mars. Siège pour enfant : 10 $ par jour. Annulation gratuite jusqu’à 48 heures avant la prise du véhicule.',
    },
  },
  {
    id: 'eo2-demenagement',
    task: 2,
    title: 'Tâche 2 : obtenir des informations',
    prompt: 'Vous déménagez de Montréal à Trois-Rivières le 1er juillet et vous appelez une entreprise de déménagement pour obtenir une soumission. Posez des questions sur les disponibilités, le prix, ce qui est compris dans le service, l’assurance et les conditions de réservation.',
    tips: t2Tips(
      'Décrivez votre déménagement : taille du logement, étages, gros meubles, objets fragiles.',
      'Demandez ce qui est inclus ou non (boîtes, emballage, démontage) et faites-vous préciser le prix total.',
    ),
    seconds: 210,
    mode: 'interaction',
    prepSeconds: 120,
    partner: {
      role: 'Marc, le responsable des soumissions chez Déménagement Express Mauricie',
      opening: 'Déménagement Express Mauricie, bonjour ! Marc à l’appareil, comment puis-je vous aider ?',
      facts:
        'Le 1er juillet est presque complet : il reste un seul créneau le matin à 7 h ; sinon, les 29 et 30 juin sont encore libres, et 10 % moins chers. ' +
        'Pour un trajet Montréal–Trois-Rivières (environ 140 km), forfait selon la taille : 3 ½ à partir de 1 150 $, 4 ½ à partir de 1 450 $, 5 ½ à partir de 1 800 $ ; camion de 26 pieds et trois déménageurs inclus, ainsi que l’essence et le kilométrage. Taxes en plus. ' +
        'Supplément de 75 $ par étage sans ascenseur au-delà du 2e étage ; supplément de 150 $ pour un piano ou un objet de plus de 150 kg. ' +
        'Inclus : couvertures de protection, film plastique pour les matelas et les sofas, démontage et remontage des lits. Non inclus : l’emballage des boîtes, qui est offert en option à 45 $ de l’heure par déménageur. ' +
        'Boîtes neuves vendues 3,50 $ l’unité, ou trousse de 30 boîtes avec ruban adhésif pour 95 $, livrée gratuitement une semaine avant. ' +
        'Assurance de base incluse : 0,60 $ par livre par article, selon la loi ; assurance valeur de remplacement en option, 2 % de la valeur déclarée. ' +
        'Réservation avec un dépôt de 250 $ par carte de crédit, déductible du prix ; solde payable le jour du déménagement, avant le déchargement. Dépôt remboursable si l’annulation se fait plus de 14 jours à l’avance. ' +
        'Soumission gratuite et sans engagement ; visite virtuelle par vidéo possible pour un prix ferme, sinon le prix est une estimation. Entreprise titulaire d’un permis et membre de l’association des déménageurs du Québec.',
    },
  },
  {
    id: 'eo2-ski',
    task: 2,
    title: 'Tâche 2 : obtenir des informations',
    prompt: 'Vous n’avez jamais fait de ski et vous voulez apprendre cet hiver avec votre conjoint. Vous appelez le club de ski de la station du mont Sainte-Anne : posez des questions sur les cours pour débutants, les horaires, les tarifs, la location d’équipement et le transport.',
    tips: t2Tips(
      'Présentez-vous : débutants complets, disponibilités, budget.',
      'Pensez aux détails pratiques : vêtements, froid, transport, annulation en cas de mauvais temps.',
    ),
    seconds: 210,
    mode: 'interaction',
    prepSeconds: 120,
    partner: {
      role: 'Sophie, la responsable des inscriptions de l’école de ski de la station',
      opening: 'École de ski du mont Sainte-Anne, bonjour ! Sophie à l’appareil.',
      facts:
        'Programme « Premières glisses » pour adultes débutants : 6 cours de 2 heures, en groupe de 6 personnes au maximum, avec un moniteur certifié. ' +
        'Deux horaires : le samedi de 9 h 30 à 11 h 30, ou le mercredi soir de 18 h 30 à 20 h 30 sur pistes éclairées. Début des sessions : le samedi 9 janvier et le mercredi 13 janvier. ' +
        'Prix : 349 $ par personne pour les 6 cours, billet de remontée pour le secteur débutant compris pendant les cours ; 10 % de rabais pour un couple qui s’inscrit ensemble. Taxes incluses. ' +
        'Location d’équipement (skis, bottes, bâtons, casque) : forfait saison de 6 cours à 120 $, ou 45 $ la journée ; casque obligatoire pour les cours. Mesures prises à la boutique de location 30 minutes avant le premier cours. ' +
        'Vêtements non fournis : manteau et pantalon imperméables, sous-vêtements chauds, mitaines, lunettes de ski ; pas de jeans. ' +
        'Billet de remontée hors cours : 89 $ la journée, 59 $ en après-midi à partir de 12 h 30. ' +
        'Navette depuis Québec (arrêt place D’Youville) le samedi à 7 h 45, retour à 16 h ; 20 $ aller-retour, réservation la veille avant 17 h. La station est à 40 minutes en voiture de Québec. ' +
        'Si la température descend sous −25 °C ou en cas de tempête, le cours est reporté à la fin de la session, pas remboursé. Remboursement complet jusqu’à 7 jours avant le premier cours, puis aucun remboursement. ' +
        'Inscription en ligne ou par téléphone, paiement par carte de crédit. Formulaire de décharge à signer au premier cours.',
    },
  },
  {
    id: 'eo2-benevolat',
    task: 2,
    title: 'Tâche 2 : obtenir des informations',
    prompt: 'Vous voulez faire du bénévolat dans une banque alimentaire de Moncton pour aider les autres et pratiquer votre français. Vous appelez la coordonnatrice des bénévoles : posez des questions sur les tâches, les horaires, l’engagement demandé, la formation et les conditions pour devenir bénévole.',
    tips: t2Tips(
      'Présentez-vous : vos disponibilités, vos compétences, votre motivation.',
      'Demandez des précisions sur les conditions (âge, vérification, durée minimale) et réagissez aux réponses.',
    ),
    seconds: 210,
    mode: 'interaction',
    prepSeconds: 120,
    partner: {
      role: 'Mme Arsenault, la coordonnatrice des bénévoles de la banque alimentaire Partage Moncton',
      opening: 'Partage Moncton, bonjour ! Josée Arsenault, coordonnatrice des bénévoles. Je vous écoute.',
      facts:
        'Organisme situé rue Saint-George, au centre-ville de Moncton, à deux minutes d’un arrêt d’autobus Codiac Transpo. Environ 1 200 familles servies chaque mois ; 150 bénévoles actifs. L’organisme fonctionne en français et en anglais. ' +
        'Tâches : tri des dons et contrôle des dates de péremption à l’entrepôt ; préparation des paniers ; accueil des familles et inscription (bilingues de préférence) ; cuisine communautaire le jeudi ; livraison à domicile aux aînés (avec sa propre voiture, 0,45 $ du kilomètre remboursé). ' +
        'Horaires des quarts : du lundi au vendredi de 9 h à 12 h ou de 13 h à 16 h ; le mardi soir de 17 h à 20 h ; un samedi par mois pour les grandes collectes en épicerie. ' +
        'Engagement minimum : un quart de 3 heures par semaine pendant 3 mois ; plus souple pour les collectes. ' +
        'Conditions : 16 ans minimum ; vérification du casier judiciaire obligatoire seulement pour l’accueil et la livraison (gratuite, faite par l’organisme, délai de 2 à 3 semaines). ' +
        'Formation obligatoire de 2 heures le premier lundi du mois à 18 h : hygiène alimentaire, sécurité, confidentialité. Chaussures fermées obligatoires à l’entrepôt ; gants et tablier fournis. ' +
        'Lettre de référence et attestation d’heures de bénévolat fournies après 50 heures, utile pour un CV ou des études. Dîner offert aux bénévoles du matin le vendredi. ' +
        'Inscription : formulaire en ligne, puis rencontre de 20 minutes avec la coordonnatrice. Prochaine formation : lundi 7 décembre.',
    },
  },

  // Tâche 3 : expression d’un point de vue
  {
    id: 'eo3-regions',
    task: 3,
    title: 'Tâche 3 : exprimer un point de vue',
    prompt: '« Les nouveaux arrivants devraient s’installer en région plutôt que dans les grandes villes. » Qu’en pensez-vous ? Donnez votre avis et justifiez-le avec des exemples.',
    tips: ['Pensez aux deux côtés : besoins des régions, attentes des immigrants.', 'Illustrez avec des exemples concrets : emploi, logement, communauté, services.'],
    seconds: 270,
    mode: 'monologue',
  },
  {
    id: 'eo3-acheter-local',
    task: 3,
    title: 'Tâche 3 : exprimer un point de vue',
    prompt: '« Il faut acheter des produits locaux, même s’ils coûtent plus cher. » Êtes-vous d’accord ? Donnez votre avis et justifiez-le avec des exemples.',
    tips: ['Annoncez votre position, puis développez deux arguments : économie, environnement, qualité.', 'Tenez compte du budget des familles et des produits qu’on ne peut pas trouver localement.'],
    seconds: 270,
    mode: 'monologue',
  },
  {
    id: 'eo3-ia-ecole',
    task: 3,
    title: 'Tâche 3 : exprimer un point de vue',
    prompt: '« Les élèves devraient avoir le droit d’utiliser l’intelligence artificielle pour faire leurs devoirs. » Qu’en pensez-vous ? Donnez votre avis et justifiez-le avec des exemples.',
    tips: ['Distinguez les usages : expliquer, corriger, ou faire le travail à la place de l’élève.', 'Pensez au rôle des enseignants et des parents.'],
    seconds: 270,
    mode: 'monologue',
  },
  {
    id: 'eo3-semaine-quatre-jours',
    task: 3,
    title: 'Tâche 3 : exprimer un point de vue',
    prompt: '« La semaine de travail de quatre jours devrait devenir la norme. » Êtes-vous d’accord ? Donnez votre avis et justifiez-le avec des exemples.',
    tips: ['Envisagez le point de vue des salariés et celui des employeurs.', 'Pensez aux métiers où ce changement est difficile : santé, commerce, transport.'],
    seconds: 270,
    mode: 'monologue',
  },
  {
    id: 'eo3-traditions',
    task: 3,
    title: 'Tâche 3 : exprimer un point de vue',
    prompt: '« Quand on s’installe dans un nouveau pays, on doit adopter ses coutumes plutôt que garder les siennes. » Qu’en pensez-vous ? Donnez votre avis et justifiez-le avec des exemples.',
    tips: ['Distinguez ce qui relève des lois et valeurs communes, et ce qui relève de la culture personnelle.', 'Appuyez-vous sur votre expérience ou celle de proches installés à l’étranger.'],
    seconds: 270,
    mode: 'monologue',
  },
];

export const moreSpeakingCorriges: Record<string, Corrige> = {
  // Expression orale, tâche 1
  'eo1-famille': {
    text: '« Ma famille, c’est un peu le centre de ma vie. Je suis l’aîné de cinq enfants. Mon père est retraité de la fonction publique, il a travaillé trente ans au ministère de l’Agriculture, et ma mère tient encore un petit commerce de pagnes au marché Mokolo, à Yaoundé. Mes deux sœurs sont infirmières, l’un de mes frères étudie le droit à Dschang et le plus jeune est encore au lycée.\nJe suis marié depuis six ans avec Estelle, et nous avons un garçon de quatre ans, Ryan, qui est très curieux : il pose des questions toute la journée !\nLe dimanche, toute la famille se retrouve chez mes parents. On mange ensemble, souvent du ndolé avec du plantain, on parle de tout, et les enfants jouent dans la cour. Chez nous, on prend les décisions importantes en famille, et on s’aide beaucoup : quand mon frère a eu besoin d’argent pour ses frais d’inscription, nous avons tous participé.\nSi nous nous installons au Canada, ce sera difficile de partir loin d’eux. Mais nous avons déjà prévu de faire un appel vidéo chaque dimanche, à l’heure du repas, pour garder cette habitude. J’aimerais aussi que mes parents viennent nous rendre visite, peut-être en été, pour qu’ils découvrent notre nouvelle vie et qu’ils voient grandir leur petit-fils. »',
    note: 'Chaque membre de la famille est présenté avec un détail précis, une anecdote illustre la solidarité familiale, et la fin au futur et au subjonctif répond à la dernière partie de la consigne.',
  },
  'eo1-souvenir-voyage': {
    text: '« Le voyage qui m’a le plus marquée, c’est celui que j’ai fait au Sénégal il y a trois ans, avec ma meilleure amie Laure. Nous voulions fêter nos trente ans, alors nous avons économisé pendant presque un an.\nNous avons passé dix jours là-bas. D’abord, nous sommes restées à Dakar : nous avons visité l’île de Gorée, et je me souviens qu’il y avait un silence très particulier dans la Maison des esclaves. C’était émouvant, j’en ai encore des frissons. Ensuite, nous sommes parties vers le Sine-Saloum, une région de mangroves et de petites îles. Nous dormions dans un campement au bord de l’eau, nous mangions du poisson grillé tous les soirs, et le matin, nous faisions des balades en pirogue.\nCe que je retiens surtout, c’est l’accueil des gens. Un soir, une famille nous a invitées à partager le thiéboudienne, alors qu’elle ne nous connaissait pas du tout. Ce voyage m’a appris à voyager plus simplement, sans tout planifier.\nAu Canada, j’aimerais beaucoup découvrir les Rocheuses, en Alberta. J’ai vu des photos du lac Louise, avec son eau turquoise, et je rêve de faire une randonnée là-bas. Je voudrais aussi voir des baleines à Tadoussac, parce qu’on dit que c’est un spectacle inoubliable. »',
    note: 'Le récit alterne passé composé (actions) et imparfait (description, habitudes), suit un ordre clair (d’abord, ensuite) et se termine par un projet exprimé au conditionnel.',
  },
  'eo1-numerique': {
    text: '« Je dois avouer que mon téléphone est presque toujours avec moi. Le matin, avant même de me lever, je regarde l’heure, la météo et mes messages. Ensuite, dans le bus pour aller au travail, j’écoute des balados en français : c’est une bonne façon de pratiquer la langue.\nAu travail, je suis technicien en informatique, donc je passe la journée devant un écran. Le soir, j’utilise surtout WhatsApp pour parler avec ma famille au Cameroun. Grâce à Internet, je vois mes neveux grandir, même à distance, et je peux aussi envoyer de l’argent à ma mère en quelques minutes, ce qui était impossible il y a quinze ans.\nCe qui me dérange, en revanche, c’est le temps que je perds sur les réseaux sociaux. Parfois, je veux regarder une vidéo de deux minutes et je me rends compte qu’une heure est passée ! J’ai aussi remarqué que je dormais moins bien quand je restais sur mon téléphone tard le soir.\nAlors, depuis quelques mois, j’essaie de changer mes habitudes. Je ne prends plus mon téléphone dans la chambre : je le laisse dans le salon à partir de vingt-deux heures. Le dimanche, j’essaie de passer la journée sans réseaux sociaux, et je fais plutôt du sport ou je lis. Ce n’est pas toujours facile, mais je me sens plus reposé. »',
    note: 'La journée type est décrite dans l’ordre, l’avis est nuancé (« en revanche ») et la dernière partie présente des solutions concrètes, ce qui donne au propos une progression claire.',
  },
  'eo1-fetes': {
    text: '« Pour moi, la fête la plus importante, c’est Noël. Dans ma famille, à Bamenda puis à Douala, c’est le moment où tout le monde se retrouve, même les cousins qui vivent loin.\nLes préparatifs commencent plusieurs jours avant : ma mère achète un poulet, parfois une chèvre, et toutes les femmes de la famille cuisinent ensemble. Le 24 au soir, nous allons à la messe de minuit, puis nous rentrons à la maison pour le grand repas. On mange du riz sauté, du poulet DG, des beignets haricots et beaucoup de gâteaux. Les enfants portent leurs nouveaux vêtements, qu’ils attendent toute l’année, et on danse jusqu’à tard dans la nuit. Le lendemain, on rend visite aux voisins et aux personnes âgées du quartier.\nAu Canada, je pense que ce sera différent : il fera froid, et nous serons loin de la grande famille. Mais j’aimerais garder l’essentiel. Je préparerais les mêmes plats et j’inviterais d’autres familles camerounaises, ou des voisins qui sont seuls pendant les fêtes. Ce serait une façon de recréer l’ambiance de chez nous.\nEnfin, j’aimerais beaucoup découvrir la fête nationale du Québec, la Saint-Jean-Baptiste, le 24 juin. On m’a dit qu’il y a des spectacles en plein air et des feux de joie dans tous les quartiers. Ça me semble une bonne occasion de rencontrer des gens. »',
    note: 'La fête est décrite chronologiquement, avec un vocabulaire précis (plats, traditions) ; le conditionnel sert à imaginer la fête au Canada et la fin ouvre sur la culture québécoise.',
  },
  'eo1-entraide': {
    text: '« Depuis cinq ans, je fais partie d’une association de femmes dans mon quartier, à Douala. Nous sommes une trentaine et nous nous réunissons le premier dimanche de chaque mois.\nL’association fonctionne d’abord comme une tontine : chaque membre verse quinze mille francs CFA par mois, et chaque mois, une personne reçoit la totalité de la somme. Grâce à ça, l’année dernière, j’ai pu acheter un congélateur pour mon petit commerce de jus. Mais nous ne faisons pas seulement de l’épargne. Quand une membre a un problème, une maladie ou un deuil par exemple, nous l’aidons, avec de l’argent ou simplement avec notre présence. Moi, je suis la secrétaire : je prends des notes pendant les réunions et je tiens le cahier des cotisations. Ça demande de la rigueur, parce qu’il faut que tout soit transparent.\nCe que cela m’apporte, c’est d’abord un réseau de personnes sur qui je peux compter. J’ai aussi appris à parler en public et à gérer des conflits, ce qui m’aide dans mon travail.\nAu Canada, j’aimerais vraiment continuer à m’engager. J’ai lu qu’il existe beaucoup d’organismes qui cherchent des bénévoles, par exemple pour accueillir les nouveaux arrivants ou aider les aînés. Je pense que ce serait une excellente façon de me faire des amis, de pratiquer mon français québécois et de rendre ce que la communauté m’a donné. »',
    note: 'Le fonctionnement de la tontine est expliqué clairement, le rôle personnel est précis et la conclusion relie l’engagement passé au projet de bénévolat au Canada.',
  },

  // Expression orale, tâche 2
  'eo2-garderie': {
    text: 'Questions modèles :\n• Bonjour Madame, je viens d’emménager à Gatineau et je cherche une place pour ma fille de trois ans. Est-ce que vous avez des places disponibles ?\n• À partir de quand une place pourrait-elle se libérer ?\n• Comment fait-on pour s’inscrire, et quels documents faut-il fournir ?\n• Quels sont vos horaires d’ouverture ? Je commence à travailler à 8 h.\n• Combien coûte une journée, et comment se fait le paiement ?\n• Que se passe-t-il si j’arrive en retard le soir ?\n• Les repas sont-ils compris ? Ma fille ne mange pas de porc : est-ce que c’est un problème ?\n• Combien d’enfants y a-t-il par éducatrice dans le groupe des trois ans ?\n• Quelles activités proposez-vous aux enfants pendant la journée ?\n• Qu’est-ce que je dois apporter pour la sieste ?\n• Les enfants sortent-ils dehors en hiver, même quand il fait très froid ?\n• Serait-il possible de visiter le CPE avant de prendre une décision ?\n• Merci beaucoup, Madame, pour toutes ces précisions. Je fais l’inscription en ligne ce soir et je vous rappelle pour la visite.',
    note: 'La candidate présente d’emblée sa situation, couvre tous les points de la consigne (place, horaires, tarif, repas, activités, inscription) et varie les formes : inversion, « est-ce que », combien, quand, conditionnel de politesse.',
  },
  'eo2-location-auto': {
    text: 'Questions modèles :\n• Bonjour, je voudrais louer une voiture pour une semaine, du 12 au 19 août, pour aller en Gaspésie avec deux amis. Quels modèles avez-vous ?\n• Lequel me conseillez-vous pour trois personnes avec des valises ?\n• Combien coûte la location à la semaine ? Les taxes sont-elles comprises ?\n• Le kilométrage est-il illimité ? Nous allons faire beaucoup de route.\n• Qu’est-ce que l’assurance de base couvre exactement ?\n• Est-ce que je dois prendre la protection contre les dommages, et à combien revient-elle par jour ?\n• J’ai un permis de conduire camerounais. Puis-je l’utiliser, ou faut-il un permis international ?\n• Mon ami pourrait-il conduire aussi ? Y a-t-il un supplément ?\n• Peut-on payer avec une carte de débit, ou faut-il obligatoirement une carte de crédit ?\n• Dans quel état dois-je rendre le véhicule, pour l’essence par exemple ?\n• Que se passe-t-il si je rapporte la voiture en retard ?\n• Parfait. Pouvez-vous me récapituler le prix total avec l’assurance et le deuxième conducteur ? Merci, je réserve tout de suite.',
    note: 'Le candidat précise ses dates et ses besoins, compare les options et vérifie les conditions qui pèsent sur le prix (assurance, permis, carburant, retard) ; la demande de récapitulatif conclut efficacement.',
  },
  'eo2-demenagement': {
    text: 'Questions modèles :\n• Bonjour Monsieur, je déménage de Montréal à Trois-Rivières et j’aimerais obtenir une soumission. Êtes-vous disponibles le 1er juillet ?\n• Si le 1er juillet est complet, quelles autres dates pourriez-vous me proposer ?\n• Il s’agit d’un 4 ½ au troisième étage sans ascenseur. Combien cela me coûterait-il ?\n• Le prix comprend-il l’essence et le kilométrage ?\n• Combien de déménageurs viendront, et quelle est la taille du camion ?\n• J’ai une laveuse, une sécheuse et un grand sofa : est-ce qu’il y a un supplément pour les gros meubles ?\n• Vous occupez-vous du démontage et du remontage des lits ?\n• Est-ce que vous fournissez les boîtes, et à quel prix ?\n• En cas de casse, quelle assurance est prévue ?\n• Le prix que vous me donnez est-il une estimation ou un prix ferme ?\n• Comment se passe la réservation : faut-il verser un dépôt ?\n• Très bien, je réfléchis entre le 30 juin et le 1er juillet et je vous rappelle demain matin pour confirmer. Merci beaucoup !',
    note: 'Les questions suivent la logique d’une soumission : date, prix, services inclus, assurance, réservation. Le candidat donne les informations utiles (étage, meubles) pour obtenir des réponses précises.',
  },
  'eo2-ski': {
    text: 'Questions modèles :\n• Bonjour Madame, mon conjoint et moi n’avons jamais fait de ski et nous aimerions apprendre cet hiver. Proposez-vous des cours pour les débutants complets ?\n• Comment se déroulent les cours : combien y a-t-il de personnes par groupe ?\n• À quels jours et à quelle heure ont lieu les cours ?\n• Quand commence la prochaine session ?\n• Combien coûte le programme, et le billet de remontée est-il compris ?\n• Existe-t-il un tarif réduit pour un couple ?\n• Nous n’avons pas d’équipement : est-il possible de le louer sur place, et à quel prix ?\n• Quels vêtements faut-il prévoir pour ne pas avoir froid ?\n• Nous n’avons pas de voiture. Y a-t-il une navette depuis Québec ?\n• Que se passe-t-il s’il fait trop froid ou s’il y a une tempête le jour du cours ?\n• Jusqu’à quand peut-on annuler et être remboursé ?\n• Merci beaucoup, Sophie ! Nous allons choisir entre le samedi et le mercredi, et je vous rappelle avant la fin de la semaine pour nous inscrire.',
    note: 'La situation (débutants, sans voiture) oriente les questions ; tous les points de la consigne sont couverts et les formes varient : inversion, mots interrogatifs (combien, quand, à quelle heure), « que se passe-t-il si… »',
  },
  'eo2-benevolat': {
    text: 'Questions modèles :\n• Bonjour Madame, je suis arrivé à Moncton il y a deux mois et j’aimerais devenir bénévole à la banque alimentaire. Pourriez-vous m’expliquer comment ça fonctionne ?\n• Quelles sont les différentes tâches que font les bénévoles ?\n• Je parle français et anglais : est-ce que je pourrais aider à l’accueil des familles ?\n• Quels sont les horaires des quarts de bénévolat ?\n• Combien d’heures par semaine faut-il donner au minimum, et pendant combien de temps ?\n• Y a-t-il des conditions pour devenir bénévole, comme un âge minimum ou une vérification ?\n• Combien de temps faut-il pour obtenir la vérification du casier judiciaire ?\n• Est-ce qu’on reçoit une formation avant de commencer ? Quand a lieu la prochaine ?\n• Faut-il apporter quelque chose, une tenue particulière par exemple ?\n• Est-il possible d’obtenir une attestation de bénévolat pour mon CV ?\n• Comment dois-je faire pour m’inscrire ?\n• Merci beaucoup, Madame Arsenault. Je remplis le formulaire aujourd’hui et je serai présent à la formation de lundi.',
    note: 'Le candidat se présente, met en avant une compétence utile (le bilinguisme) et obtient toutes les informations pratiques ; le conditionnel de politesse et la variété des tournures interrogatives sont bien maîtrisés.',
  },

  // Expression orale, tâche 3
  'eo3-regions': {
    text: '« Les nouveaux arrivants devraient-ils s’installer en région plutôt que dans les grandes villes ? Je pense que c’est souvent une très bonne idée, mais qu’on ne peut pas l’imposer.\nD’abord, les régions ont besoin de travailleurs. Au Québec, par exemple, beaucoup d’entreprises du Saguenay ou du Bas-Saint-Laurent n’arrivent pas à recruter : il manque des infirmières, des soudeurs, des camionneurs. Pour un immigrant, c’est une vraie chance de trouver un emploi dans son domaine, alors qu’à Montréal, la concurrence est beaucoup plus forte.\nEnsuite, la vie y est souvent plus facile au quotidien. Le logement coûte moins cher, il y a moins de circulation, et on s’intègre plus vite. Un ami camerounais s’est installé à Rimouski il y a trois ans. Il me dit qu’au bout de six mois, il connaissait déjà ses voisins, et qu’il parlait français tous les jours, alors qu’à Montréal, il aurait pu rester entre Camerounais et parler surtout anglais au travail.\nCela dit, il faut reconnaître les difficultés. En région, il y a moins de services : parfois pas de lieu de culte, pas d’épicerie africaine, et des transports en commun très limités. Pour une famille sans voiture, c’est compliqué. Certaines personnes souffrent aussi de solitude, surtout pendant le long hiver, quand elles sont les seules immigrantes du village. Et puis, chacun a le droit de choisir où il veut vivre.\nÀ mon avis, la solution, ce n’est pas d’obliger, mais d’encourager. Si les régions offrent un bon accueil, avec de l’aide pour trouver un logement, des cours de français et des activités pour rencontrer les habitants, beaucoup de nouveaux arrivants choisiront d’y rester.\nPour conclure, je dirais oui à l’installation en région, à condition qu’elle soit un choix et qu’elle soit bien accompagnée. »',
    note: 'Position nuancée annoncée dès le début, deux arguments illustrés (emploi, intégration), une objection sérieuse prise en compte, puis une proposition concrète et une conclusion qui reprend la position.',
  },
  'eo3-acheter-local': {
    text: '« Faut-il acheter local, même quand c’est plus cher ? Je suis plutôt d’accord avec cette idée, mais je pense qu’elle doit rester réaliste.\nPremièrement, acheter local, c’est soutenir l’économie de sa région. Quand j’achète mes légumes au marché Jean-Talon, l’argent va directement au producteur, qui peut faire vivre sa ferme et embaucher des gens. Au Cameroun, c’est la même chose : quand on achète le café de l’Ouest ou le cacao de chez nous plutôt que des produits importés, on aide les planteurs à vivre de leur travail.\nDeuxièmement, c’est meilleur pour l’environnement. Une fraise du Québec en juillet fait quelques dizaines de kilomètres, alors qu’une fraise importée en hiver traverse tout le continent en camion. Moins de transport, c’est moins de pollution. Et souvent, les produits sont plus frais et ont plus de goût, parce qu’ils sont cueillis à maturité.\nCependant, il faut être honnête : tout le monde n’a pas les moyens de payer plus cher. Pour une famille qui vient d’arriver, avec un seul salaire et un loyer élevé, chaque dollar compte. On ne peut pas lui reprocher d’aller au magasin le moins cher. De plus, certains produits ne poussent pas ici : le café, le riz, les bananes plantains. Dans ce cas, acheter local n’a pas de sens.\nC’est pourquoi je pense qu’il faut trouver un équilibre. On peut acheter local quand c’est la saison, parce que c’est à ce moment-là que les prix sont les plus bas. On peut aussi choisir quelques produits importants, comme les œufs, le lait ou la viande, et accepter de payer un peu plus pour ceux-là. Le gouvernement pourrait aussi aider les petits producteurs, pour que leurs prix baissent.\nEn conclusion, acheter local est un geste utile, mais ce doit être un choix possible pour tous, pas un luxe réservé à ceux qui en ont les moyens. »',
    note: 'Les arguments sont annoncés (premièrement, deuxièmement), illustrés par des exemples canadiens et camerounais, puis nuancés par la question du budget ; la conclusion propose un équilibre réaliste.',
  },
  'eo3-ia-ecole': {
    text: '« Les élèves devraient-ils pouvoir utiliser l’intelligence artificielle pour leurs devoirs ? À mon avis, oui, mais seulement dans certaines conditions, car tout dépend de la façon dont on l’utilise.\nD’un côté, l’intelligence artificielle peut être un excellent professeur particulier. Ma nièce, qui est en secondaire trois, avait de grandes difficultés en mathématiques. Elle demande maintenant à une application de lui réexpliquer les exercices étape par étape, autant de fois que nécessaire. Ses parents travaillent tard et ne peuvent pas toujours l’aider : pour elle, c’est une aide précieuse, qui coûte beaucoup moins cher qu’un tuteur. Ça peut donc réduire les inégalités entre les élèves.\nDe plus, ces outils font déjà partie du monde du travail. Si l’école les interdit, les jeunes les utiliseront quand même, mais en cachette et mal. Il vaut mieux leur apprendre à s’en servir intelligemment : vérifier les informations, reconnaître les erreurs, citer leurs sources.\nD’un autre côté, le danger est réel. Si l’élève demande à la machine d’écrire sa rédaction à sa place, il n’apprend rien. Il ne développe ni sa réflexion, ni son style, ni sa capacité à faire des efforts. Et l’enseignant ne peut plus savoir ce que l’élève sait vraiment faire.\nC’est pourquoi je pense qu’il faut fixer des règles claires. L’intelligence artificielle pourrait être autorisée pour comprendre une leçon ou corriger ses fautes, mais pas pour produire le travail à la place de l’élève. Les enseignants pourraient aussi donner plus de travaux en classe, à l’oral par exemple, pour vérifier les connaissances. Et les parents ont un rôle à jouer pour surveiller cet usage à la maison.\nEn résumé, interdire l’intelligence artificielle serait inutile, mais la laisser sans limites serait dangereux. Il faut apprendre aux élèves à l’utiliser comme un outil, et non comme une solution de facilité. »',
    note: 'Le raisonnement est structuré (d’un côté, de l’autre, c’est pourquoi), appuyé sur un exemple personnel, et aboutit à des propositions concrètes qui distinguent les bons et les mauvais usages.',
  },
  'eo3-semaine-quatre-jours': {
    text: '« La semaine de quatre jours devrait-elle devenir la norme ? Personnellement, je suis plutôt favorable à cette idée, même si je pense qu’elle ne peut pas s’appliquer partout de la même façon.\nPremièrement, travailler quatre jours améliore la qualité de vie. Avec un jour libre de plus, on peut s’occuper de ses enfants, faire ses rendez-vous médicaux, faire du sport ou simplement se reposer. Beaucoup de gens sont épuisés aujourd’hui, et les congés de maladie pour épuisement coûtent cher aux entreprises comme à la société.\nDeuxièmement, plusieurs expériences montrent que les employés ne sont pas moins productifs. Une amie travaille dans une entreprise de logiciels à Québec qui a adopté la semaine de quatre jours l’an dernier. Elle m’a expliqué que les réunions sont plus courtes et que chacun se concentre davantage. Résultat : le travail est fait, et l’entreprise attire plus facilement de nouveaux employés, ce qui est important en période de pénurie de main-d’œuvre.\nCependant, il y a des limites évidentes. Dans un hôpital, une épicerie ou un service d’autobus, on ne peut pas fermer un jour de plus : il faudrait embaucher davantage de personnel, et on manque déjà d’infirmières et de chauffeurs. De plus, si on fait quarante heures en quatre jours, les journées de dix heures peuvent devenir très fatigantes, surtout pour les parents.\nC’est pourquoi je pense que la semaine de quatre jours ne doit pas être imposée par une loi à tout le monde. Elle devrait plutôt être encouragée là où c’est possible, et adaptée selon les métiers : certaines entreprises pourraient réduire le nombre d’heures, d’autres proposer des horaires flexibles.\nEn conclusion, la semaine de quatre jours est une belle avancée pour l’équilibre entre le travail et la vie personnelle, à condition de l’organiser intelligemment et de ne pas oublier les métiers essentiels. »',
    note: 'L’opinion est clairement annoncée, soutenue par deux arguments (bien-être, productivité) dont un illustré par un exemple concret, puis nuancée par les contraintes de certains secteurs avant une conclusion équilibrée.',
  },
  'eo3-traditions': {
    text: '« Quand on s’installe dans un nouveau pays, doit-on abandonner ses coutumes pour adopter celles du pays d’accueil ? Je ne suis pas d’accord avec cette idée. Je pense qu’il faut respecter les règles du pays, mais qu’on peut garder sa culture.\nIl est vrai que certaines choses ne se discutent pas. Quand on vient vivre au Canada, on doit respecter les lois, l’égalité entre les femmes et les hommes, la liberté de chacun. On doit aussi faire l’effort d’apprendre la langue et de comprendre les habitudes locales : par exemple, ici, on arrive à l’heure à un rendez-vous, alors qu’au Cameroun, on est parfois plus souple avec l’horaire. S’adapter sur ces points, c’est une question de respect et c’est aussi nécessaire pour réussir sa vie professionnelle.\nMais adopter les règles communes ne veut pas dire tout oublier. La cuisine, la musique, la langue maternelle, les fêtes familiales font partie de notre identité. Mes cousins qui vivent à Montréal parlent bassa avec leurs enfants à la maison, et les enfants parlent aussi parfaitement français et anglais. Ils ne sont pas moins intégrés pour autant, au contraire : ils sont fiers de leurs origines et à l’aise dans la société québécoise.\nDe plus, le Canada lui-même s’est construit grâce à des vagues d’immigration successives. Les cultures des immigrants ont enrichi le pays : pensez aux restaurants, aux festivals, comme le festival international Nuits d’Afrique à Montréal. Si chacun abandonnait ses traditions, le pays serait beaucoup moins riche.\nEnfin, garder un lien avec sa culture aide à traverser les moments difficiles de l’immigration. Quand on se sent seul, retrouver des gens de son pays pour partager un repas, c’est un vrai soutien.\nPour conclure, je dirais qu’il faut s’intégrer sans se renier : adopter les valeurs et les règles du pays d’accueil, tout en transmettant ce que l’on a reçu. »',
    note: 'Le candidat refuse l’affirmation tout en reconnaissant ce qu’elle a de juste (lois, langue, ponctualité), puis développe trois arguments illustrés ; la formule finale « s’intégrer sans se renier » résume bien la position.',
  },
};
