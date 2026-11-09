import type { Combinaison } from '@/lib/combinaisons';

/*
 * Novembre 2026 : situations et thèmes rapportés par les candidats.
 * Consignes et documents réécrits par l’équipe ; aucun texte d’un autre site n’est repris.
 */
const T3 = (title: string) => `${title} Vous écrivez un texte pour le site d’un journal. Dans une première partie (40 à 60 mots), présentez les deux points de vue des documents. Dans une seconde partie (80 à 120 mots), donnez votre opinion en l’argumentant.`;

export const novemberCombinaisons: Combinaison[] = [
  { id: '2026-11-1', theme: 'Les jeux vidéo : pour ou contre ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Le journal municipal « Bienvenue » prépare un numéro sur les habitants de la ville. Vous vous êtes installé(e) ici récemment : écrivez un message pour vous présenter, puis décrire vos lieux préférés dans la ville.', corrige: `Bonjour à tous,

Je m’appelle Armelle, j’ai 31 ans et je suis arrivée de Douala en août avec mon mari et notre fils. Je travaille comme comptable dans une entreprise du centre-ville.

En trois mois, j’ai déjà mes habitudes. Le samedi matin, je vais au marché de la place Royale : les producteurs sont accueillants et les légumes délicieux. J’aime aussi beaucoup la bibliothèque du parc, calme et lumineuse, où mon fils emprunte des bandes dessinées. Enfin, le dimanche, nous nous promenons le long de la rivière, surtout maintenant que les arbres changent de couleur.

Merci pour votre accueil chaleureux !
Armelle` },
    { prompt: 'Vous venez d’assister au concert de votre artiste préféré(e). Sur votre blog, racontez cette soirée et donnez envie à vos amis et à vos lecteurs d’aller à son prochain concert.' },
    { prompt: T3('Les jeux vidéo : pour ou contre ?'), documents: ['Document 1 : Les enfants et les adolescents qui jouent souvent aux jeux vidéo, surtout aux jeux violents, deviennent plus agressifs selon plusieurs études menées sur des jeunes de 9 à 18 ans. Pour certains chercheurs, même des parents très attentifs ne peuvent pas empêcher cet effet.', 'Document 2 : On parle surtout des dangers des jeux vidéo, mais ils ont aussi des effets positifs. Ils entraînent la concentration, la créativité et la capacité à analyser une situation, car le joueur doit sans cesse trouver des solutions pour avancer.'] },
  ] } },
  { id: '2026-11-2', theme: 'La sieste au travail', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Écrivez un message à vos amis pour leur proposer de passer un week-end sportif avec vous (lieu, activités, hébergement, ce qu’il faut apporter).', corrige: `Salut la bande !

Ça vous dit, un week-end sportif les 22 et 23 novembre ? J’ai trouvé un chalet au bord du lac Beauport, à trente minutes de la ville. Il peut accueillir six personnes et coûte 60 $ chacun pour les deux nuits.

Samedi matin, je propose une randonnée de dix kilomètres sur le sentier des Falaises, puis une séance de yoga l’après-midi. Dimanche, si le lac n’est pas gelé, on peut louer des kayaks ; sinon, il y a une piscine au centre sportif du village.

Apportez de bonnes chaussures, des vêtements chauds et un maillot de bain. Je m’occupe des courses pour les repas.

Répondez-moi avant vendredi pour que je réserve !
Fabrice` },
    { prompt: 'Sur un forum, écrivez un article pour raconter pourquoi vous avez décidé de changer vos habitudes alimentaires et ce que ce changement vous a apporté.' },
    { prompt: T3('La sieste au travail.'), documents: ['Document 1 : Une courte sieste au travail rend les salariés plus efficaces. Vingt minutes de repos suffisent pour retrouver de l’énergie, faire moins d’erreurs et réduire le stress. Les entreprises qui l’autorisent constatent aussi moins d’absences.', 'Document 2 : L’idée est séduisante, mais difficile à appliquer. Beaucoup d’entreprises n’ont ni la place ni le budget pour aménager des salles de repos, et dans certains métiers, comme le commerce ou l’accueil, il est impossible de s’arrêter au milieu de la journée.'] },
  ] } },
  { id: '2026-11-3', theme: 'L’égalité entre les femmes et les hommes au travail', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Votre amie Jeanne veut visiter votre pays. Écrivez-lui un message pour lui proposer un itinéraire : villes, sites touristiques et monuments, en expliquant l’intérêt de chaque étape.', corrige: `Chère Jeanne,

Quelle bonne nouvelle, ton voyage au Cameroun ! Voici mon itinéraire idéal pour deux semaines.

Commence par Douala : visite le marché des Fleurs et la cathédrale Saints-Pierre-et-Paul, pour sentir l’énergie de la capitale économique. Ensuite, descends à Kribi : ses plages et les chutes de la Lobé, qui tombent directement dans la mer, sont uniques. Puis monte à Yaoundé, où le musée national t’expliquera l’histoire du pays. Termine par l’Ouest : à Foumban, le palais du sultan et les artisans du bronze sont magnifiques.

Prévois des vêtements légers et un imperméable. Et surtout, goûte au ndolè !

Je t’embrasse,
Carine` },
    { prompt: 'Vous avez participé à une émission de télévision. Racontez cette expérience : dans quel cadre vous y êtes allé(e), votre rôle dans l’émission et ce que vous en avez retenu.' },
    { prompt: T3('L’égalité entre les femmes et les hommes au travail.'), documents: ['Document 1 : Au Québec, l’égalité entre les femmes et les hommes progresse. Les femmes accèdent aujourd’hui à des métiers autrefois réservés aux hommes, y compris aux postes de direction, et rien ne justifie qu’un emploi soit fermé à l’un ou l’autre sexe.', 'Document 2 : Malgré les lois sur la parité, certains métiers restent occupés presque uniquement par des femmes, comme sage-femme, et d’autres par des hommes. Pour certains, ce n’est pas un problème : chacun devrait pouvoir choisir le métier qui lui correspond, sans quotas imposés.'] },
  ] } },
  { id: '2026-11-4', theme: 'La lecture chez les enfants', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Votre ami(e) veut commencer à faire du sport. Écrivez-lui un message pour lui recommander une salle de sport de votre quartier (situation, tarifs, activités proposées).', corrige: `Salut Patrick,

Tu veux te remettre au sport ? Je te conseille la salle Énergie Plus, rue Saint-Joseph, à cinq minutes à pied de chez toi, juste à côté de la pharmacie.

L’abonnement coûte 35 $ par mois, sans contrat de longue durée, et la première semaine est gratuite pour essayer. La salle est ouverte de 6 h à 22 h en semaine et de 8 h à 18 h le week-end. Il y a des appareils de musculation récents, des vélos et des tapis de course, mais aussi des cours collectifs de zumba et de boxe le soir.

Les entraîneurs sont très gentils et proposent un programme personnalisé aux débutants. Si tu veux, on peut y aller ensemble mardi prochain !

À bientôt,
Olivier` },
    { prompt: 'Racontez un événement qui vous a marqué (anniversaire, mariage, fête…) et décrivez ce qui vous a le plus touché(e) ce jour-là.' },
    { prompt: T3('La lecture chez les enfants.'), documents: ['Document 1 : Avec les écrans, les jeux vidéo et la musique en ligne, les enfants lisent de moins en moins. Contrairement aux adultes, qui ont grandi avec les livres, beaucoup ne prennent plus le temps d’ouvrir un roman, ce qui inquiète les enseignants.', 'Document 2 : Le goût de la lecture se transmet en famille. Un enfant qui lit régulièrement enrichit son vocabulaire, apprend à se concentrer et développe son imagination. C’est aux parents de donner l’exemple et de proposer des livres adaptés à son âge.'] },
  ] } },
  { id: '2026-11-5', theme: 'La place du travail dans la vie', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous voulez partir en week-end avec vos amis le mois prochain. Écrivez-leur un message pour présenter votre projet (lieu, transport, activités).' },
    { prompt: 'Un site de voyage demande à ses lecteurs : « Tout quitter pour voyager pendant un an : bonne ou mauvaise idée ? » Répondez en donnant des exemples tirés de votre vie.' },
    { prompt: T3('La place du travail dans la vie.'), documents: ['Document 1 : Le travail occupe une place énorme dans nos vies. Il devrait apporter de la satisfaction, mais il est souvent source de fatigue et de stress. Travailler moins permettrait d’avoir plus de temps pour sa famille et ses passions, et donc d’être plus heureux.', 'Document 2 : Certaines personnes arrêtent de travailler pour changer de vie, mais le travail reste essentiel. Il donne une place dans la société : la première question qu’on pose à quelqu’un est souvent « Que fais-tu dans la vie ? ». Sans emploi, on peut perdre une partie de son identité.'] },
  ] } },
  { id: '2026-11-6', theme: 'Voyager seul ou accompagné ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Écrivez à votre ami(e) pour l’inviter à un festival de musique dans votre ville. Donnez-lui les informations utiles : lieu, dates, artistes invités, billets et transport.' },
    { prompt: 'Sur votre blog, racontez votre dernière sortie au restaurant (le lieu, les plats, le service) et dites ce qui vous a le plus plu.' },
    { prompt: T3('Voyager seul ou accompagné ?'), documents: ['Document 1 : Voyager seul offre une liberté totale : on choisit son itinéraire et son rythme sans dépendre des envies d’un groupe. On fait aussi plus facilement des rencontres et on découvre mieux la culture locale.', 'Document 2 : Le voyage en solitaire a aussi ses inconvénients. On peut se sentir seul, et en cas de problème, de maladie ou de vol, personne n’est là pour aider. Partager ses découvertes avec un proche rend aussi le voyage plus agréable.'] },
  ] } },
  { id: '2026-11-7', theme: 'Les caméras de surveillance à l’école', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous fêtez votre anniversaire au restaurant. Écrivez un courriel à vos amis pour les inviter et leur donner toutes les informations (lieu, date, menu, prix) ; demandez-leur de vous répondre.' },
    { prompt: 'Vous avez quitté la ville pour vous installer à la campagne. Sur votre blog, expliquez les raisons de ce choix et présentez les avantages de votre nouvelle vie.' },
    { prompt: T3('Les caméras de surveillance à l’école.'), documents: ['Document 1 : Enseignante dans une école de Montréal, je constate que les caméras de surveillance découragent la violence. Les élèves, les parents et les enseignants les acceptent, car ils se sentent plus en sécurité.', 'Document 2 : Je suis contre les caméras dans les écoles. Là où elles sont installées, les résultats ne sont pas convaincants : les élèves violents savent les éviter. Elles coûtent cher et donnent aux enfants l’impression d’être surveillés en permanence.'] },
  ] } },
  { id: '2026-11-8', theme: 'Vivre chez ses parents : pour ou contre ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous partez en voyage et un(e) ami(e) va habiter chez vous pendant vos vacances. Écrivez-lui un message pour décrire votre appartement et lui expliquer comment y accéder (immeuble, logement, clés).' },
    { prompt: 'Sur votre blog, racontez le souvenir de voyage que vous avez le plus aimé et expliquez pourquoi il vous a marqué(e).' },
    { prompt: T3('Vivre chez ses parents : pour ou contre ?'), documents: ['Document 1 : Rester chez ses parents pendant ses études permet d’économiser le loyer, de profiter de repas faits maison et d’une vie confortable. C’est une façon intelligente de préparer son avenir quand l’argent manque.', 'Document 2 : Vivre chez ses parents, c’est manquer de liberté. Les jeunes restent dépendants, leurs parents décident encore pour eux. Habiter seul apprend à devenir autonome et responsable.'] },
  ] } },
  { id: '2026-11-9', theme: 'Les salaires des sportifs professionnels', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous organisez un anniversaire surprise pour votre ami Karim. Écrivez un message à vos amis pour les inviter et expliquer l’organisation (date, lieu, cadeau, rôle de chacun).' },
    { prompt: 'Vous avez participé à un concours artistique (peinture, photo, chant, danse…). Sur votre blog, racontez comment il s’est déroulé, ce que vous avez ressenti et ce que cette expérience vous a apporté.' },
    { prompt: T3('Les salaires des sportifs professionnels.'), documents: ['Document 1 : Les salaires des sportifs professionnels sont justifiés. Leur carrière est courte, elle s’arrête souvent avant 35 ans et peut prendre fin à cause d’une blessure. Pour arriver au sommet, ils ont sacrifié leur jeunesse à l’entraînement.', 'Document 2 : Il est choquant qu’un footballeur gagne en un mois ce qu’une infirmière ou un enseignant gagne en une vie, alors que ces métiers sont essentiels. Ces salaires donnent aussi aux jeunes l’idée que la célébrité vaut plus que les études.'] },
  ] } },
  { id: '2026-11-10', theme: 'Les objets connectés', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous allez déménager et des amis ont accepté de vous aider. Écrivez-leur un message pour expliquer le déroulement de la journée (adresses, horaires, trajet, tâches de chacun).' },
    { prompt: 'Un concours permet de gagner un séjour pour deux dans la ville de votre choix. Écrivez un article sur le thème « La vie de mon artiste préféré(e) » : expliquez votre choix et racontez son parcours.' },
    { prompt: T3('Les objets connectés.'), documents: ['Document 1 : Les objets connectés simplifient la vie : on peut régler le chauffage ou fermer la porte à distance avec son téléphone, et une montre connectée suit notre santé au quotidien. Ils font gagner du temps et du confort.', 'Document 2 : Il existerait des dizaines de milliards d’objets connectés dans le monde : alarmes, téléviseurs, caméras, détecteurs de fumée. Mais un pirate informatique peut en prendre le contrôle et accéder à notre vie privée. La sécurité de ces objets reste très insuffisante.'] },
  ] } },
  { id: '2026-11-11', theme: 'Interdire les voitures dans les centres-villes', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Un site Internet met en relation des personnes qui veulent pratiquer le français avec des partenaires de conversation. Écrivez un courriel pour vous présenter et expliquer pourquoi vous voulez pratiquer le français.' },
    { prompt: 'Vous avez participé à une fête de famille. Écrivez à vos amis pour leur raconter cette fête et dites ce que vous avez le plus apprécié.' },
    { prompt: T3('Interdire les voitures dans les centres-villes.'), documents: ['Document 1 : Face à une pollution inquiétante, plusieurs grandes villes ont interdit les voitures dans leur centre. À Oslo, par exemple, les rues libérées ont été rendues aux piétons et aux cyclistes : l’air est plus sain et le centre plus agréable.', 'Document 2 : Beaucoup de villes interdisent les voitures sans préparer d’alternatives. Moins de voitures, c’est moins de pollution, mais sans transports en commun efficaces ni stationnements à l’entrée de la ville, les habitants et les commerçants sont pénalisés.'] },
  ] } },
  { id: '2026-11-12', theme: 'Reprendre ses études à l’âge adulte', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous allez bientôt déménager et vous voulez organiser une fête avec vos amis avant votre départ. Écrivez-leur un message d’invitation (date, lieu, activités prévues).' },
    { prompt: 'Vous avez récemment séjourné dans une autre ville ou une autre région. Sur votre blog, racontez les moments qui vous ont marqué(e) et ce que ce séjour vous a apporté.' },
    { prompt: T3('Reprendre ses études à l’âge adulte.'), documents: ['Document 1 : « Après vingt ans dans le commerce, j’ai repris mes études à 42 ans. J’ai appris un nouveau métier et j’ai retrouvé confiance en moi. Mon expérience professionnelle m’aide même à mieux comprendre les cours. »', 'Document 2 : « Reprendre des études à l’âge adulte est très difficile. Entre le travail, les enfants et les factures, il reste peu de temps pour étudier. Et réduire ses heures de travail pour suivre des cours n’est pas possible pour tout le monde. »'] },
  ] } },
  { id: '2026-11-13', theme: 'La lutte contre le réchauffement climatique', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous allez passer vos vacances en France. Écrivez un courriel à un hôtel pour réserver : dates d’arrivée et de départ, nombre de personnes, type de chambre et services souhaités.' },
    { prompt: 'Vous avez assisté récemment à un spectacle. Sur votre blog, présentez ce spectacle, racontez comment il s’est déroulé et dites ce qui vous a particulièrement plu.' },
    { prompt: T3('La lutte contre le réchauffement climatique.'), documents: ['Document 1 : « Pour lutter contre le réchauffement climatique, chacun doit changer ses habitudes : prendre moins la voiture, voyager moins en avion, acheter moins d’objets neufs. Ces gestes, multipliés par des millions de personnes, font une vraie différence. »', 'Document 2 : « On demande beaucoup aux citoyens, mais leurs choix dépendent des solutions qu’on leur offre. Comment laisser sa voiture s’il n’y a pas d’autobus près de chez soi ? Ce sont d’abord les gouvernements et les grandes entreprises qui doivent agir. »'] },
  ] } },
  { id: '2026-11-14', theme: 'Les vols à bas prix', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Écrivez un courriel à vos amis pour les inviter à l’anniversaire surprise de votre meilleur(e) ami(e) (lieu, date, heure, organisation).' },
    { prompt: 'Vous avez participé à une brocante (vente et achat d’objets d’occasion) dans votre ville. Sur votre blog, racontez cette journée et expliquez pourquoi vous l’avez aimée.' },
    { prompt: T3('Les vols à bas prix.'), documents: ['Document 1 : Je voyage souvent avec des compagnies aériennes à bas prix. Leurs billets sont beaucoup moins chers que ceux des compagnies classiques, parfois moins chers que le train. Grâce à elles, je peux partir plus souvent.', 'Document 2 : J’ai décidé de ne plus voler avec les compagnies à bas prix. Les sièges sont inconfortables, les frais cachés s’accumulent, les conditions de travail du personnel sont mauvaises, et ces billets bon marché encouragent des voyages qui polluent.'] },
  ] } },
  { id: '2026-11-15', theme: 'Petits commerces ou supermarchés ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous voulez changer la décoration de votre appartement (meubles, peinture, objets). Écrivez à un(e) ami(e) pour lui décrire votre projet et lui demander son aide.' },
    { prompt: '« École de musique : cours gratuits, concerts et jeux, vendredi dès 9 heures. » Vous avez participé à cette journée. Écrivez à vos amis pour la raconter et donner votre avis.' },
    { prompt: T3('Petits commerces ou supermarchés ?'), documents: ['Document 1 : Le supermarché est très pratique : on y trouve tout au même endroit, on se gare facilement et on fait ses courses de la semaine en une seule fois. Les prix y sont aussi souvent plus bas.', 'Document 2 : Notre association lance le défi « Un mois sans supermarché » pour aider les petits commerces à survivre. Le boucher, la boulangère ou le marchand de légumes offrent des produits de qualité, des conseils et font vivre le quartier.'] },
  ] } },
  { id: '2026-11-16', theme: 'Vivre à la campagne : pour ou contre ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous voulez faire découvrir à vos amis un lieu touristique que vous aimez. Écrivez-leur un message pour présenter ce lieu, dire pourquoi vous l’aimez et proposer une date, une heure et un hébergement.' },
    { prompt: 'Vous êtes allé(e) à un festival (musique, cinéma, gastronomie…) et vous avez été déçu(e). Sur votre blog, expliquez ce qui ne vous a pas plu.' },
    { prompt: T3('Vivre à la campagne : pour ou contre ?'), documents: ['Document 1 : Vivre en ville donne accès à de nombreux loisirs : cinéma, théâtre, restaurants, magasins. Tout est proche, on n’a pas besoin de faire des kilomètres en voiture pour sortir ou travailler.', 'Document 2 : Je me suis installé à la campagne pour le calme et la nature. Au lieu d’aller au bar, je reçois mes amis sur ma terrasse ; au lieu du restaurant, je cuisine les légumes de mon jardin. Je vis moins vite, mais beaucoup mieux.'] },
  ] } },
  { id: '2026-11-17', theme: 'Les caméras de surveillance en ville', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous allez déménager à Nice, en France. Écrivez un message à une agence immobilière pour décrire le logement que vous cherchez (superficie, budget, nombre de pièces, quartier).' },
    { prompt: 'Vous avez commencé des cours dans une école de langues. Écrivez à vos amis pour raconter votre première semaine et donner vos impressions sur l’école et les cours.' },
    { prompt: T3('Les caméras de surveillance en ville.'), documents: ['Document 1 : Les caméras de surveillance se multiplient dans les villes, et la population les approuve : selon un sondage, trois personnes sur quatre souhaitent qu’il y en ait davantage, car elles donnent un sentiment de sécurité.', 'Document 2 : Plusieurs études montrent que la vidéosurveillance coûte cher pour des résultats faibles. Les caméras sont faciles à repérer, donc les voleurs les évitent, et elles ne remplacent pas la présence de policiers dans les rues.'] },
  ] } },
  { id: '2026-11-18', theme: 'La chasse : pour ou contre ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Écrivez à votre ami(e) pour l’inviter à passer ses vacances dans votre ville et décrivez les lieux à visiter.' },
    { prompt: 'Un concours offre un séjour de deux semaines dans votre ville préférée. Le thème est « Mon artiste préféré(e) ». Écrivez un article de blog sur cet(te) artiste.' },
    { prompt: T3('La chasse : pour ou contre ?'), documents: ['Document 1 : « Je ne comprends pas qu’on puisse prendre du plaisir à tuer des animaux. On ne peut pas dire qu’on aime la nature et participer en même temps à sa destruction. » (Laura, 29 ans)', 'Document 2 : « Les gens chassent pour des raisons variées : se nourrir, réguler certaines espèces trop nombreuses, protéger les cultures, pratiquer un loisir en plein air. Bien encadrée, la chasse participe à l’équilibre de la faune. » (Un journaliste spécialisé)'] },
  ] } },
  { id: '2026-11-19', theme: 'La photo sur le CV', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Votre ami Alex vous écrit : « Alors, comment est ta nouvelle université ? Les étudiants sont sympas ? Et les profs ? » Répondez-lui en décrivant votre université (professeurs, étudiants, activités).' },
    { prompt: 'Vous avez arrêté d’utiliser votre réseau social préféré. Écrivez à vos amis pour raconter cette expérience et expliquer pourquoi vous avez pris cette décision.' },
    { prompt: T3('La photo sur le CV.'), documents: ['Document 1 : Il faudrait interdire la photo sur les CV. Selon des spécialistes de l’emploi, elle favorise les discriminations liées à l’apparence, à l’âge ou à l’origine. Un recruteur doit juger les compétences, pas le visage.', 'Document 2 : La photo divise les employeurs. Pour certains, elle permet de se faire une idée de la personne avant l’entretien et de se souvenir d’un candidat quand on reçoit des centaines de CV. Elle peut aussi montrer le soin que le candidat porte à sa présentation.'] },
  ] } },
  { id: '2026-11-20', theme: 'Les produits faits maison', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Un(e) ami(e) vous écrit : « On m’a dit que tu allais dans une super salle de sport. Tu peux m’en parler ? » Répondez-lui en décrivant la salle (ambiance, équipements, prix).' },
    { prompt: 'Sur un forum consacré aux formations en ligne, racontez votre propre expérience (cours de langue, formation professionnelle…) : ce que vous avez apprécié et ce que vous avez moins aimé.' },
    { prompt: T3('Les produits faits maison.'), documents: ['Document 1 : Fabriquer soi-même ses produits (savon, lessive, crème) permet de choisir chaque ingrédient, ce qui est meilleur pour la santé. On réduit aussi les déchets plastiques en réutilisant ses contenants, et on fait des économies.', 'Document 2 : Le fait maison a ses limites. Une erreur de recette peut rendre un produit inefficace ou irritant pour la peau. Il faut aussi beaucoup de temps pour trouver les ingrédients, et un produit mal conservé peut se contaminer.'] },
  ] } },
  { id: '2026-11-21', theme: 'La livraison de repas au bureau', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Votre ami(e) veut découvrir la région où vous habitez. Écrivez-lui un message pour lui recommander quelques endroits à visiter.' },
    { prompt: 'Vous avez suivi un cours de sport dans une salle de votre ville. Sur votre blog, racontez cette expérience et donnez votre avis sur cette salle.' },
    { prompt: T3('La livraison de repas au bureau.'), documents: ['Document 1 : Se faire livrer son repas au bureau fait gagner du temps : on reste sur place pendant la pause et on peut finir sa journée plus tôt. Chacun choisit aussi ce qu’il veut manger, ce qui évite les compromis.', 'Document 2 : Ce service a des limites. Quand les commandes sont nombreuses, les livreurs prennent du retard. Surtout, manger devant son ordinateur empêche de faire une vraie pause, de bouger et de parler avec ses collègues.'] },
  ] } },
  { id: '2026-11-22', theme: 'L’uniforme à l’école', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous voulez proposer à un(e) ami(e) de faire du sport avec vous. Écrivez-lui un message pour décrire votre projet (activité, lieu, équipement, horaires).' },
    { prompt: 'Vous avez étudié six mois dans une université à l’étranger. Écrivez à vos amis pour raconter cette expérience et expliquer ce que vous avez aimé.' },
    { prompt: T3('L’uniforme à l’école.'), documents: ['Document 1 : Les enfants veulent suivre la mode et réclament sans cesse de nouveaux vêtements. L’uniforme règle ce problème : les parents économisent, et les élèves, habillés de la même façon, ne se jugent plus sur leurs marques.', 'Document 2 : Au Québec, de plus en plus d’écoles publiques imposent l’uniforme. Mais beaucoup d’adolescents le vivent mal : ils ont l’impression de perdre leur personnalité, car le vêtement est pour eux une façon de s’exprimer.'] },
  ] } },
  { id: '2026-11-23', theme: 'Les zoos : pour ou contre ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous avez déménagé dans une nouvelle ville il y a un mois. Écrivez à votre ami Léo pour lui donner de vos nouvelles : votre appartement, le quartier, la ville et les activités que vous avez découvertes.' },
    { prompt: 'Vous avez assisté à une fête traditionnelle, dans votre pays ou ailleurs. Sur votre blog, décrivez cette fête et expliquez pourquoi vous l’avez appréciée.' },
    { prompt: T3('Les zoos : pour ou contre ?'), documents: ['Document 1 : Les zoos sont utiles, notamment pour les espèces menacées. Les animaux y sont soignés, et les programmes de reproduction menés dans les zoos ont permis de sauver plusieurs espèces de la disparition.', 'Document 2 : Un animal sauvage n’a rien à faire dans un zoo, qui n’est pas son milieu naturel. Le zoo est une prison : on y voit par exemple des ours polaires vivre dans des enclos à 15 degrés, loin de la banquise.'] },
  ] } },
  { id: '2026-11-24', theme: 'Vivre en colocation', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Votre ami Mehdi vient d’arriver dans votre ville et vous demande comment se déplacer. Écrivez-lui un message pour présenter les transports (types de transport, abonnements, tarifs).' },
    { prompt: 'Sur votre blog, parlez d’une personne que vous admirez, célèbre ou non : présentez ce qu’elle a fait de remarquable et expliquez pourquoi vous l’admirez.' },
    { prompt: T3('Vivre en colocation.'), documents: ['Document 1 : La colocation a de nombreux avantages. On partage le loyer et les factures, ce qui fait de vraies économies, et on rencontre de nouvelles personnes : c’est idéal pour ne pas se sentir seul dans une nouvelle ville.', 'Document 2 : La vie à plusieurs peut aussi être difficile. Les caractères et les rythmes de vie différents créent des tensions, et le partage des tâches ménagères est souvent une source de conflits.'] },
  ] } },
  { id: '2026-11-25', theme: 'Manger moins de viande ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Votre ami Paul vous écrit : « Tu suis des cours dans un centre de langues ? Comment est cette école ? » Répondez-lui en décrivant l’école (salles, matériel, professeurs, ambiance).' },
    { prompt: 'Vous avez participé à un pique-nique avec vos collègues. Écrivez un article pour le journal de l’entreprise pour raconter cette journée (lieu, repas, météo, ambiance).' },
    { prompt: T3('Manger moins de viande.'), documents: ['Document 1 : « Pendant longtemps, j’ai mangé de la viande tous les jours. J’ai fini par me demander si c’était nécessaire, et j’en mange maintenant seulement de temps en temps. Je me sens mieux et je découvre d’autres plats. » (Quentin, 45 ans)', 'Document 2 : « Je ne pourrais pas me passer de viande. J’aime la cuisine de mes amis végétariens quand je mange chez eux, mais chez moi, un repas sans viande me semble incomplet. Chacun devrait pouvoir manger ce qu’il veut. » (Vanessa, 24 ans)'] },
  ] } },
  { id: '2026-11-26', theme: 'Les vêtements de marque', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Votre ami Lucas vous demande des nouvelles des nouveaux locaux de votre entreprise. Répondez-lui en les décrivant (lieu, pièces, équipements).' },
    { prompt: 'Vous avez participé à l’événement « Une semaine sans voiture » dans votre ville. Racontez son déroulement (dates, lieux, activités proposées) et donnez votre avis sur cette initiative.' },
    { prompt: T3('Les vêtements de marque.'), documents: ['Document 1 : Pour les enfants et les adolescents, les vêtements de marque comptent beaucoup. Ils leur permettent de s’exprimer et d’appartenir à un groupe, à un âge où l’on cherche sa place parmi les autres.', 'Document 2 : Les enfants grandissent vite et abîment leurs vêtements en jouant : un vêtement est porté quelques mois seulement. Acheter des marques coûte donc très cher aux familles pour un intérêt bien faible.'] },
  ] } },
  { id: '2026-11-27', theme: 'La colocation entre adultes', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Un nouveau restaurant vient d’ouvrir près de chez vous. Écrivez à un(e) ami(e) pour lui proposer d’y aller avec vous et décrivez le restaurant (cuisine, prix, décoration).' },
    { prompt: 'Vous avez visité une ville que vous ne connaissiez pas. Sur un site de voyage, racontez cette visite et expliquez ce qui vous a plu et ce qui vous a déplu.' },
    { prompt: T3('La colocation entre adultes.'), documents: ['Document 1 : Vivre en colocation demande de respecter des règles : on ne peut pas écouter sa musique fort, inviter des amis quand on veut ou laisser traîner sa vaisselle. Pour un adulte habitué à son indépendance, ces contraintes pèsent vite.', 'Document 2 : Choisir la colocation à l’âge adulte permet de vivre dans un logement plus grand pour moins cher. Certes, on n’a qu’une chambre à soi et l’on partage la cuisine et le salon, mais on gagne en confort et en compagnie.'] },
  ] } },
  { id: '2026-11-28', theme: 'Trouver un emploi : diplôme ou expérience ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous allez déménager et vous avez trouvé un appartement. Écrivez à un(e) ami(e) pour le lui présenter (nombre de pièces, situation, prix).' },
    { prompt: 'Un festival de musique gratuit a eu lieu dans votre ville et vous y êtes allé(e) avec un(e) ami(e). Sur votre blog, racontez cette soirée.' },
    { prompt: T3('Trouver un emploi : diplôme ou expérience ?'), documents: ['Document 1 : Beaucoup de jeunes diplômés de l’université sont au chômage. Les employeurs leur reprochent leur manque d’expérience, ce qui pose la question de la valeur réelle des diplômes sur le marché du travail.', 'Document 2 : On cite souvent des chefs d’entreprise célèbres qui ont réussi sans diplôme. Mais ces exemples sont rares : pour la plupart des métiers, une solide formation reste le meilleur moyen de trouver un emploi stable.'] },
  ] } },
  { id: '2026-11-29', theme: 'Cultiver en ville : pour ou contre ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous voulez louer un appartement pour vos vacances, du 15 au 22 juillet. Écrivez au propriétaire pour vous présenter, préciser les dates et le nombre de personnes, demander le prix, les équipements, la situation et si le logement est libre.' },
    { prompt: 'Sur un blog consacré au travail, présentez le métier que vous aimez : en quoi il consiste, pourquoi il vous plaît, les qualités qu’il demande et vos conseils pour l’exercer.' },
    { prompt: T3('Cultiver en ville : pour ou contre ?'), documents: ['Document 1 : « Depuis trois ans, je cultive des tomates et des herbes dans un jardin communautaire de mon quartier. Ces jardins rapprochent les voisins, rendent la ville plus verte et offrent des légumes frais à petit prix. » (Nadia, 34 ans)', 'Document 2 : « Je comprends l’enthousiasme pour les jardins urbains, mais la ville n’est pas faite pour produire de la nourriture. Les sols sont souvent pollués, l’air aussi, et ces petites parcelles ne nourriront jamais une ville. » (Marc, agriculteur)'] },
  ] } },
  { id: '2026-11-30', theme: 'Un animal de compagnie pour les enfants ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Un(e) ami(e) veut suivre des cours de langue dans votre école. Écrivez-lui pour l’aider à choisir (lieu, tarifs, types de cours, horaires).' },
    { prompt: 'Vous êtes bénévole dans une association qui aide les personnes âgées. Sur votre blog, racontez votre expérience et encouragez vos lecteurs à vous rejoindre.' },
    { prompt: T3('Un animal de compagnie pour les enfants.'), documents: ['Document 1 : Selon de nombreux psychologues, un animal est très bénéfique pour un enfant. Pour un enfant unique, c’est un compagnon contre la solitude, et s’en occuper lui apprend à être responsable.', 'Document 2 : Beaucoup d’enfants réclament un chien ou un chat, mais il faut réfléchir avant d’en acheter un. Un animal vit longtemps, coûte cher, et ce sont souvent les parents qui s’en occupent quand l’enfant s’en lasse.'] },
  ] } },
  { id: '2026-11-31', theme: 'La télévision dans l’éducation des enfants', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Écrivez une annonce pour le journal de votre université : vous cherchez un(e) partenaire pour faire du sport (activité, niveau, horaires, contact).' },
    { prompt: 'Sur votre blog, racontez votre arrivée dans un pays étranger et vos premières impressions.' },
    { prompt: T3('La télévision dans l’éducation des enfants.'), documents: ['Document 1 : La télévision est un outil d’éducation puissant. Documentaires, émissions scientifiques ou dessins animés éducatifs permettent aux enfants de découvrir le monde, d’apprendre des mots et de s’ouvrir à d’autres cultures.', 'Document 2 : La télévision a aussi des effets négatifs. Certaines émissions transmettent des stéréotypes et de mauvaises valeurs, et le temps passé devant l’écran remplace la lecture, le jeu et les échanges en famille.'] },
  ] } },
  { id: '2026-11-32', theme: 'La location de courte durée entre particuliers', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous voulez aller au concert de votre artiste préféré(e). Écrivez un courriel à votre ami(e) pour lui proposer de vous accompagner (date, lieu, prix, durée).' },
    { prompt: 'Les enseignants de l’école de votre quartier veulent présenter des métiers aux élèves. Écrivez-leur pour présenter votre profession (activités, collègues) et expliquer pourquoi elle vous plaît.' },
    { prompt: T3('La location de courte durée entre particuliers.'), documents: ['Document 1 : De plus en plus de particuliers louent leur logement ou une chambre aux voyageurs. Ils gagnent un revenu supplémentaire et font des rencontres, tandis que les visiteurs se logent moins cher qu’à l’hôtel.', 'Document 2 : « L’an dernier, j’ai loué mon appartement à des touristes pour une semaine. Ils sont arrivés en retard, ont laissé l’appartement sale et ont abîmé des meubles. Je ne recommencerai plus ! »'] },
  ] } },
  { id: '2026-11-33', theme: 'Le logement intergénérationnel', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous voulez visiter Paris. Écrivez à votre ami(e) qui y habite pour lui présenter votre projet : dates, logement sur place et moyens de transport prévus.' },
    { prompt: 'Vous avez assisté en direct à une émission de télévision qui vous intéresse. Sur un forum, décrivez l’émission, l’ambiance sur le plateau et ce que vous avez ressenti.' },
    { prompt: T3('Le logement intergénérationnel.'), documents: ['Document 1 : « J’habite chez une dame âgée depuis un an. Je paie un très petit loyer pour une chambre en centre-ville et, en échange, je l’accompagne à ses activités et je l’aide pour les courses. Nous sommes devenues amies. »', 'Document 2 : « Je vis dans un logement intergénérationnel depuis trois mois. Le loyer est bas, c’est vrai, mais je n’ai presque plus de liberté : je dois rentrer tôt, éviter le bruit et rendre des services tous les jours. »'] },
  ] } },
  { id: '2026-11-34', theme: 'La restauration rapide', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Un festival de cinéma a lieu dans votre ville. Écrivez à votre ami(e) pour lui proposer de venir avec vous (films, dates, horaires, tarifs).' },
    { prompt: 'Vous avez accueilli un(e) étudiant(e) étranger(e) chez vous pendant une semaine. Sur votre blog, racontez cette semaine et expliquez pourquoi vous l’avez appréciée.' },
    { prompt: T3('La restauration rapide.'), documents: ['Document 1 : Les restaurants rapides proposent aujourd’hui des salades, des légumes et des menus équilibrés, et ils respectent des règles d’hygiène strictes. C’est au client de composer un repas raisonnable.', 'Document 2 : Selon les spécialistes, manger souvent dans les restaurants rapides est dangereux pour la santé. On y mange presque toujours des frites, des hamburgers et des boissons sucrées, trop gras et trop salés.'] },
  ] } },
  { id: '2026-11-35', theme: 'Livre papier ou livre numérique ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Votre ami Bernard va s’installer dans votre quartier et cherche un bon marché pour faire ses courses. Répondez-lui en décrivant un marché que vous aimez (lieu, horaires, produits).' },
    { prompt: 'Vous faites partie d’une association de quartier qui propose des activités aux enfants (aide aux devoirs, sorties, jeux). Sur son site, racontez votre expérience et expliquez pourquoi ces associations sont utiles.' },
    { prompt: T3('Livre papier ou livre numérique ?'), documents: ['Document 1 : Beaucoup de lecteurs ont remplacé leur bibliothèque par des livres numériques. C’est moins cher, cela ne prend pas de place, et une liseuse permet d’emporter des centaines de livres en voyage.', 'Document 2 : Le livre numérique ne remplacera pas le livre papier. Un livre, c’est un objet qu’on aime toucher, qu’on prête à un ami ou qu’on offre avec un petit mot. Et lire sur papier fatigue moins les yeux.'] },
  ] } },
  { id: '2026-11-36', theme: 'École privée ou école publique ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Une chaîne de télévision prépare un reportage sur le sport amateur et demande : « Et vous, quel sportif êtes-vous ? » Envoyez votre témoignage.' },
    { prompt: 'Vous avez passé des vacances dans une belle région de votre pays. Écrivez à vos amis pour raconter ce séjour et expliquer pourquoi vous l’avez beaucoup aimé.' },
    { prompt: T3('École privée ou école publique ?'), documents: ['Document 1 : De plus en plus de familles inscrivent leurs enfants dans des écoles privées. Ce succès s’explique moins par les résultats scolaires que par la réputation de ces écoles : discipline, encadrement et sécurité.', 'Document 2 : Les écoles privées accueillent peu d’élèves de familles modestes, car elles sont payantes. Ce système sépare les enfants selon les revenus de leurs parents et affaiblit l’école publique, qui devrait être la même pour tous.'] },
  ] } },
  { id: '2026-11-37', theme: 'Aider les personnes pauvres', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous avez trouvé un nouveau travail. Écrivez à votre amie francophone pour lui annoncer la nouvelle et décrire votre poste, vos collègues et votre lieu de travail.' },
    { prompt: 'Sur un forum, une étudiante de 19 ans veut partir étudier à l’étranger et demande des témoignages. Vous avez passé un an à l’étranger : racontez-lui votre séjour et vos activités.' },
    { prompt: T3('Aider les personnes pauvres.'), documents: ['Document 1 : « Depuis des années, je donne un peu de mon temps et de mon argent aux personnes sans abri, surtout en hiver. Pour moi, aider directement, en apportant un repas ou une couverture, est le geste le plus utile. » (Marie, 58 ans)', 'Document 2 : « Pour aider vraiment les plus pauvres, il faut s’engager dans une association. Je suis bénévole dans mon quartier : ensemble, nous offrons des repas, mais aussi un accompagnement pour trouver un logement ou un emploi. » (Paul, 63 ans)'] },
  ] } },
  { id: '2026-11-38', theme: 'L’amitié entre collègues', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Votre ami Matthias vous écrit : « J’ai obtenu mon visa pour le Canada, j’arrive le 3 mars. Peux-tu m’aider à trouver un hôtel pour la première semaine ? » Vous avez trouvé un hôtel : décrivez-le-lui et donnez-lui les informations utiles.' },
    { prompt: 'Vous êtes allé(e) voir un spectacle (film, pièce de théâtre, concert) avec des amis et vous l’avez aimé. Sur votre blog, racontez la soirée et expliquez ce qui vous a plu.' },
    { prompt: T3('L’amitié entre collègues.'), documents: ['Document 1 : Avoir des amis au travail rend l’ambiance plus agréable et l’équipe plus soudée. On s’entraide davantage, on communique mieux, et l’on vient travailler avec plus de plaisir.', 'Document 2 : Il faut garder une limite entre amitié et travail. Une amitié trop proche peut créer des tensions quand il faut prendre une décision difficile, et elle peut provoquer des jalousies chez les autres collègues.'] },
  ] } },
  { id: '2026-11-39', theme: 'Cuisinier amateur ou cuisinier professionnel ?', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Votre ami Cédric est invité à votre mariage dans un château qu’il ne connaît pas. Écrivez-lui pour lui décrire le lieu et lui expliquer comment s’y rendre (situation, accès, transports).' },
    { prompt: 'Sur un forum, racontez votre expérience de l’apprentissage d’une langue étrangère.' },
    { prompt: T3('Cuisinier amateur ou cuisinier professionnel ?'), documents: ['Document 1 : Les cuisiniers amateurs réussissent certaines recettes, mais il leur manque les techniques et l’expérience d’un professionnel. Pour devenir un vrai cuisinier, une formation et des années de pratique sont indispensables.', 'Document 2 : Grâce à Internet et aux réseaux sociaux, des passionnés ont appris seuls et sont devenus célèbres. Une cuisinière amatrice a même ouvert son restaurant et publié plusieurs livres de recettes : le talent ne dépend pas toujours d’un diplôme.'] },
  ] } },
  { id: '2026-11-40', theme: 'Organiser de grands événements sportifs', created_at: '2026-11-01T00:00:00Z', content: { kind: 'combinaison', year: 2026, month: 11, source: 'candidats', tasks: [
    { prompt: 'Vous avez déménagé récemment dans une nouvelle ville. Écrivez à votre ami(e) pour l’inviter à venir passer ses vacances chez vous.' },
    { prompt: '« Que pensez-vous d’une télévision dans la chambre ? » Donnez votre avis dans un article de blog, en vous appuyant sur votre expérience.' },
    { prompt: T3('Organiser de grands événements sportifs.'), documents: ['Document 1 : L’État devrait accueillir de grandes compétitions comme les Jeux olympiques, la Coupe du monde ou la Coupe d’Afrique des nations. Elles font connaître le pays dans le monde entier, attirent des touristes et rendent les habitants fiers.', 'Document 2 : Ces grands événements coûtent des milliards. Plutôt que de construire des stades parfois inutilisés ensuite, l’argent public devrait aller en priorité à la santé, à l’éducation et aux routes.'] },
  ] } },
];
