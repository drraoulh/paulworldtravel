import type { Combinaison, CombiTask } from '@/lib/combinaisons';

/*
 * More combinations of recent sessions, written by the team from the themes
 * that candidates reported after their exam (May to July 2026). Wording,
 * documents and model answers are our own; only the themes come from reports.
 */

const T3 = (title: string) =>
  `${title} Vous écrivez un texte pour le site d’un journal. Dans une première partie (40 à 60 mots), présentez les deux points de vue des documents. Dans une seconde partie (80 à 120 mots), donnez votre opinion en l’argumentant.`;

function c(year: number, month: number, n: number, theme: string, tasks: [CombiTask, CombiTask, CombiTask]): Combinaison {
  const id = `${year}-${String(month).padStart(2, '0')}-${n}`;
  return { id, theme, created_at: `${year}-${String(month).padStart(2, '0')}-01T00:00:00Z`, content: { kind: 'combinaison', year, month, source: 'candidats', tasks } };
}

export const moreSessionCombinaisons: Combinaison[] = [
  /* ───────────── Juillet 2026 ───────────── */
  c(2026, 7, 1, 'École privée ou école publique', [
    {
      prompt: 'Vous habitez dans un grand appartement et vous cherchez un(e) colocataire. Rédigez une annonce pour décrire le logement, le loyer et la personne que vous aimeriez accueillir.',
      corrige: `Colocataire recherché(e) – quartier Rosemont

Bonjour,

Je partage un grand 5 ½ lumineux avec mon chat et je cherche un ou une colocataire à partir du 1er juillet.

Votre chambre, de 14 mètres carrés, donne sur une cour arborée. La cuisine, le salon et la salle de bain sont partagés, et l’appartement dispose d’un balcon et d’une laveuse. Le métro est à cinq minutes à pied.

Le loyer est de 750 dollars par mois, électricité et internet compris.

J’ai 31 ans, je suis infirmière et je travaille parfois de nuit. Je cherche donc une personne calme, non-fumeuse et ordonnée, qui aime les animaux.

Contact : 514 555-0182`,
    },
    {
      prompt: 'Sur un forum, Julie, 19 ans, s’apprête à partir étudier à l’étranger et demande des témoignages. Vous avez étudié un an hors de votre pays : répondez-lui en racontant ce séjour et en expliquant si vous avez aimé cette expérience, et pourquoi.',
      corrige: `Bonjour Julie,

Il y a deux ans, j’ai passé une année à Lyon pour mon master en commerce. Les premières semaines ont été difficiles : je ne connaissais personne, il pleuvait souvent et les démarches administratives semblaient interminables. J’avais parfois envie de rentrer.

Puis, grâce à l’association des étudiants internationaux, je me suis fait des amis venus du monde entier. Nous révisions ensemble et, le week-end, nous visitions la région en train. À l’université, j’ai découvert une autre façon de travailler, plus autonome, qui m’a beaucoup servi ensuite.

Oui, j’ai adoré cette expérience. Elle m’a appris à me débrouiller seule et à m’adapter à n’importe quelle situation. Mon conseil : n’attends pas que les autres viennent vers toi, inscris-toi aux activités dès ton arrivée.

Bon courage !
Aïcha`,
    },
    {
      prompt: T3('École privée ou école publique : laquelle choisir ?'),
      documents: [
        'Document 1 : Dans les écoles privées, les classes sont moins chargées et les enseignants peuvent suivre chaque élève de près. Les parents qui en ont les moyens y trouvent un encadrement plus strict, des activités variées et souvent de meilleurs résultats aux examens.',
        'Document 2 : L’école publique est gratuite et ouverte à tous : elle réunit des enfants de tous les milieux et leur apprend à vivre ensemble. Ses enseignants sont formés et diplômés, et beaucoup de grands scientifiques et dirigeants y ont fait toute leur scolarité.',
      ],
      corrige: `Faut-il préférer l’école privée à l’école publique ? Selon le premier document, le privé offre des classes réduites, un suivi personnalisé et un encadrement plus strict, ce qui favorise la réussite. Le second défend l’école publique, gratuite, ouverte à tous et confiée à des enseignants qualifiés.

À mon avis, l’école publique doit rester le choix de référence. Elle permet à un enfant de famille modeste de recevoir la même instruction qu’un enfant de famille aisée, et elle apprend très tôt à côtoyer des personnes différentes. Bien sûr, je comprends les parents qui choisissent le privé quand l’école du quartier manque de moyens ou que les classes comptent quarante élèves. Mais la solution n’est pas de fuir le public : c’est d’y investir davantage, en recrutant des enseignants et en réduisant le nombre d’élèves par classe. Une société juste a besoin d’une école de qualité accessible à tous.`,
    },
  ]),
  c(2026, 7, 2, 'L’égalité entre les femmes et les hommes au travail', [
    {
      prompt: 'Votre ami Mehdi vient de s’installer dans votre ville et ne sait pas comment se déplacer. Écrivez-lui un message pour lui présenter les transports (types de transport, abonnements, tarifs, conseils).',
      corrige: `Salut Mehdi,

Bienvenue en ville ! Pour te déplacer, le plus simple est le réseau de bus et de métro. Le métro passe toutes les cinq minutes de 5 h 30 à 1 h du matin, et les bus desservent tous les quartiers.

Je te conseille l’abonnement mensuel à 97 dollars : il donne accès à tous les transports sans limite. Tu peux l’acheter dans n’importe quelle station avec une carte rechargeable. Si tu as moins de 25 ans et que tu étudies, tu as droit à un tarif réduit.

Pour les beaux jours, il y a aussi des vélos en libre-service un peu partout.

À bientôt,
Karim`,
    },
    {
      prompt: 'Sur votre blog, vous présentez une personne, célèbre ou non, que vous admirez : vous racontez ce qu’elle a accompli et vous expliquez pourquoi elle est un modèle pour vous.',
      corrige: `La personne que j’admire le plus n’est pas célèbre : c’est ma tante Odile, qui a ouvert la première bibliothèque de son village il y a quinze ans.

À l’époque, les enfants n’avaient presque aucun livre en dehors de l’école. Odile, institutrice à la retraite, a transformé une pièce de sa maison en salle de lecture. Elle a écrit à des associations, collecté des dons et convaincu la mairie de financer des étagères. Aujourd’hui, la bibliothèque compte plus de trois mille livres et accueille chaque samedi une quarantaine d’enfants.

Ce qui m’inspire chez elle, c’est sa patience. Elle a essuyé de nombreux refus, mais elle n’a jamais abandonné. Grâce à elle, j’ai compris qu’on n’a pas besoin d’être riche ou puissant pour changer la vie des autres. Il suffit de commencer, même modestement.`,
    },
    {
      prompt: T3('L’égalité entre les femmes et les hommes au travail : où en sommes-nous ?'),
      documents: [
        'Document 1 : Les femmes sont aujourd’hui aussi diplômées que les hommes et occupent des postes autrefois réservés à ces derniers. Les lois interdisent les discriminations à l’embauche et imposent l’égalité des salaires. L’égalité est donc presque atteinte.',
        'Document 2 : À poste égal, les femmes gagnent encore moins que leurs collègues masculins dans de nombreux pays. Elles sont rares à la tête des grandes entreprises, et ce sont souvent elles qui réduisent leur temps de travail après la naissance d’un enfant.',
      ],
      corrige: `L’égalité professionnelle entre les femmes et les hommes est-elle une réalité ? Le premier document l’affirme : les femmes sont aussi diplômées que les hommes, accèdent à tous les métiers et sont protégées par la loi. Le second montre au contraire que les écarts de salaire persistent et que les femmes restent peu nombreuses aux postes de direction.

Je pense que de grands progrès ont été réalisés, mais que le travail n’est pas terminé. Les lois existent, c’est vrai, mais elles ne sont pas toujours appliquées. Dans mon entourage, plusieurs amies ont vu leur carrière ralentir après leur congé de maternité, alors que celle de leur conjoint continuait normalement. Pour changer les choses, les entreprises devraient publier leurs écarts de salaire et proposer un vrai congé parental aux pères. L’éducation joue aussi un rôle : il faut encourager les filles à choisir les sciences et les garçons à partager les tâches familiales. L’égalité se construit à la maison autant qu’au bureau.`,
    },
  ]),
  c(2026, 7, 3, 'La chasse', [
    {
      prompt: 'Vous cherchez quelqu’un avec qui faire du sport. Écrivez une petite annonce pour le journal de votre université afin de trouver un(e) partenaire (sport choisi, niveau, horaires, lieu).',
      corrige: `Cherche partenaire de course à pied !

Bonjour à tous,

Je m’appelle Julien, je suis étudiant en deuxième année de génie civil et je cherche quelqu’un pour courir avec moi deux ou trois fois par semaine.

J’ai un niveau intermédiaire : je cours environ huit kilomètres en cinquante minutes, mais je voudrais progresser pour participer au semi-marathon de la ville en octobre. Je propose de nous retrouver le mardi et le jeudi à 7 h devant le pavillon des sports, puis de suivre le sentier le long de la rivière.

Peu importe votre niveau, l’essentiel est d’être motivé et ponctuel !

Écrivez-moi : julien.r@etu-campus.ca`,
    },
    {
      prompt: 'Vous venez de vous installer dans un pays étranger. Sur votre blog, racontez vos premiers jours et partagez vos premières impressions.',
      corrige: `Voilà maintenant trois semaines que je suis arrivé à Halifax avec ma femme et nos deux enfants, et je voulais partager ici mes premières impressions.

Dès l’aéroport, j’ai été frappé par la gentillesse des gens : un agent nous a aidés à porter nos valises jusqu’au taxi, alors que nous ne lui avions rien demandé. Les premiers jours ont été bien remplis. Nous avons ouvert un compte bancaire, demandé nos cartes d’assurance maladie et inscrit les enfants à l’école du quartier.

Ce qui m’a le plus surpris, c’est le calme des rues et le respect des règles : les voitures s’arrêtent toujours pour laisser passer les piétons. En revanche, je dois encore m’habituer aux magasins qui ferment tôt et au vent glacé de l’océan.

Pour l’instant, le bilan est très positif. Je vous raconterai la suite bientôt !`,
    },
    {
      prompt: T3('La chasse : une pratique à défendre ou à abandonner ?'),
      documents: [
        'Document 1 : La chasse fait partie des traditions de nombreuses régions. Elle permet aussi de réguler certaines espèces, comme les cerfs ou les sangliers, qui se multiplient et détruisent les cultures. Bien encadrée, elle participe à l’équilibre de la nature.',
        'Document 2 : Tuer un animal pour le plaisir n’a plus de sens aujourd’hui. Chaque année, des accidents de chasse font des victimes parmi les promeneurs, et des espèces protégées sont encore abattues illégalement. La nature peut se réguler sans fusil.',
      ],
      corrige: `Faut-il encore autoriser la chasse ? Pour le premier document, c’est une tradition utile, qui limite la population de certains animaux responsables de dégâts dans les champs. Le second la juge dépassée : elle cause des accidents, menace des espèces protégées et repose sur le plaisir de tuer.

Pour ma part, je distingue deux sortes de chasse. Dans certaines régions, notamment chez les peuples autochtones, la chasse reste un moyen de se nourrir et un héritage culturel qu’il faut respecter. De même, lorsque les sangliers ravagent les récoltes et que leurs prédateurs naturels ont disparu, une régulation encadrée me semble nécessaire. En revanche, la chasse de loisir, pratiquée pour le trophée, me paraît difficile à justifier. Les autorités devraient donc imposer des règles plus strictes : permis exigeant, zones interdites près des sentiers et contrôles fréquents. La chasse peut exister, mais seulement si elle sert l’équilibre de la nature et non le simple divertissement.`,
    },
  ]),
  c(2026, 7, 4, 'Les repas livrés au bureau', [
    {
      prompt: 'Votre ami(e) souhaite découvrir la région où vous vivez. Écrivez-lui un message pour lui recommander quelques lieux à visiter et lui expliquer pourquoi ils valent le détour.',
      corrige: `Salut Inès,

Je suis ravi que tu viennes enfin dans les Laurentides ! Voici quelques endroits à ne pas manquer.

D’abord, le parc national du Mont-Tremblant : tu pourras y faire de la randonnée et admirer la vue depuis le sommet. Ensuite, je te conseille le village de Saint-Sauveur, avec ses petites boutiques et ses cafés, idéal pour un après-midi tranquille. Enfin, si tu aimes l’eau, le lac des Sables est parfait pour faire du kayak au coucher du soleil.

Pour les repas, je t’emmènerai dans une cabane à sucre : c’est une expérience typique du Québec.

À très vite,
Antoine`,
    },
    {
      prompt: 'Vous avez participé à une journée de formation organisée par votre entreprise. Sur le forum interne, racontez cette journée à vos collègues et dites ce que vous avez apprécié.',
      corrige: `Bonjour à tous,

Jeudi dernier, j’ai participé à la journée de formation sur la gestion du temps organisée par les ressources humaines, et je voulais partager ce que j’en ai retenu.

La matinée a commencé par un atelier très concret : chacun devait noter les tâches d’une semaine habituelle, puis les classer selon leur urgence et leur importance. J’ai réalisé que je passais beaucoup trop de temps à répondre aux courriels. L’après-midi, la formatrice nous a présenté des outils simples, comme le blocage de plages horaires dans l’agenda.

Ce que j’ai le plus apprécié, ce sont les échanges entre les services : j’ai discuté avec des collègues que je croise sans jamais leur parler. Depuis lundi, j’applique déjà deux conseils et je me sens plus efficace.

Je recommande vivement la prochaine session !

Sylvie`,
    },
    {
      prompt: T3('Se faire livrer ses repas au bureau : pratique ou problématique ?'),
      documents: [
        'Document 1 : Avec les applications de livraison, les salariés reçoivent leur déjeuner en quelques minutes, sans quitter leur poste. Le choix est immense et chacun mange ce qu’il veut. Pour ceux qui ont des journées chargées, c’est un vrai gain de temps.',
        'Document 2 : Manger devant son ordinateur empêche de faire une vraie pause et isole les collègues. Ces repas coûtent cher, sont souvent gras et produisent une montagne d’emballages jetables. Sans compter les livreurs, mal payés et pressés par le temps.',
      ],
      corrige: `La livraison de repas au bureau est-elle une bonne habitude ? Le premier document y voit une solution rapide et variée qui fait gagner du temps aux salariés très occupés. Le second dénonce ses inconvénients : absence de vraie pause, isolement, coût élevé, repas peu équilibrés, déchets et conditions de travail difficiles pour les livreurs.

À mon avis, ce service peut dépanner, mais il ne devrait pas devenir quotidien. Lorsqu’une réunion importante approche, se faire livrer un repas est bien pratique. Toutefois, la pause du midi a une fonction essentielle : elle permet de se reposer, de marcher un peu et de discuter avec ses collègues. Manger seul devant un écran, jour après jour, augmente le stress et la fatigue. De plus, à vingt dollars le repas, le budget devient vite important. Je préfère apporter un plat préparé la veille et le partager avec mon équipe dans la cuisine. Les entreprises pourraient d’ailleurs encourager cette pratique en aménageant des espaces de repas agréables.`,
    },
  ]),
  c(2026, 7, 5, 'Les caméras de surveillance', [
    {
      prompt: 'Votre mission professionnelle à l’étranger se termine et vous voulez fêter votre départ. Écrivez un courriel à vos collègues pour les inviter au restaurant (lieu, date, heure, organisation).',
      corrige: `Objet : Mon repas de départ

Chers collègues,

Ma mission à Bruxelles se termine le 31 juillet, et je ne veux pas partir sans vous remercier pour ces six mois passés ensemble.

Je vous invite donc à dîner le jeudi 30 juillet à 19 h au restaurant Le Petit Sablon, à cinq minutes du bureau. J’ai réservé une grande table dans la salle du fond, plus calme. Le repas et les boissons sont pour moi, vous n’avez rien à prévoir !

Pour que je puisse confirmer la réservation, merci de me répondre avant lundi.

Au plaisir de partager ce dernier moment avec vous,

Ousmane`,
    },
    {
      prompt: 'Vous avez participé avec d’autres bénévoles au nettoyage d’un lieu public (plage, parc, forêt…). Racontez cette expérience à vos amis et expliquez pourquoi ce type d’action est important.',
      corrige: `Salut tout le monde,

Samedi dernier, j’ai participé à la journée de nettoyage des berges du fleuve organisée par la mairie. Nous étions une soixantaine de bénévoles : des familles, des étudiants et même quelques retraités.

À 9 h, on nous a distribué des gants, des pinces et des sacs de couleur pour trier les déchets. En quatre heures, nous avons ramassé plus de deux cents kilos d’ordures : des bouteilles en plastique, des canettes, des mégots et même un vieux pneu ! J’étais choqué de voir autant de saletés dans un endroit où je me promène chaque semaine.

À midi, nous avons partagé un pique-nique offert par les commerçants du quartier, dans une ambiance très chaleureuse.

Je pense que ces actions sont essentielles : elles protègent la nature et nous font prendre conscience de nos habitudes. La prochaine fois, venez avec moi !

Lucas`,
    },
    {
      prompt: T3('Des caméras de surveillance partout : pour ou contre ?'),
      documents: [
        'Document 1 : Depuis l’installation de caméras dans les rues commerçantes, les vols et les agressions ont nettement diminué dans plusieurs villes. Les images aident aussi la police à retrouver rapidement les auteurs d’un délit. Les citoyens honnêtes n’ont rien à craindre.',
        'Document 2 : Être filmé en permanence, c’est perdre une partie de sa liberté. Les images peuvent être mal utilisées, piratées ou conservées trop longtemps. De plus, les caméras déplacent souvent la délinquance vers d’autres quartiers au lieu de la faire disparaître.',
      ],
      corrige: `Faut-il multiplier les caméras de surveillance ? Le premier document souligne leur efficacité : elles feraient baisser les vols et les agressions et faciliteraient le travail de la police. Le second met en garde contre une atteinte à la vie privée, un risque d’abus et une délinquance simplement déplacée ailleurs.

Je suis favorable aux caméras, mais seulement dans certains lieux et avec des règles claires. Dans une gare, un parking souterrain ou un stade, elles rassurent les usagers et peuvent aider à élucider un crime. En revanche, filmer chaque rue d’un quartier résidentiel me paraît excessif : chacun a le droit de se promener sans être observé. Il faudrait donc que la loi précise où installer ces appareils, qui peut consulter les images et combien de temps elles sont conservées. Par ailleurs, une caméra ne remplace pas la présence humaine : des agents dans la rue préviennent mieux les problèmes. La sécurité est importante, mais elle ne doit pas sacrifier la liberté.`,
    },
  ]),
  c(2026, 7, 6, 'Producteurs locaux ou supermarché', [
    {
      prompt: 'Demain, vous passez la journée avec un ami dans un parc de loisirs, et il vous demande ce que vous allez faire. Répondez-lui en décrivant le programme de la journée.',
      corrige: `Salut Alexis,

Moi aussi, j’ai hâte d’être à demain ! Voici ce que je te propose.

On se retrouve à 9 h 30 à l’entrée du parc, pour éviter la foule. On commencera par les grandes montagnes russes, tant que la file d’attente est courte. Ensuite, on pourra faire la descente en bouée sur la rivière : prévois des vêtements de rechange, on va être trempés !

À midi, on mangera au restaurant mexicain près du lac. L’après-midi, il y a un spectacle d’acrobates à 15 h, puis on finira par la grande roue pour admirer la vue.

À demain,
Maxime`,
    },
    {
      prompt: 'Vous avez visité le salon du livre de votre ville. Écrivez un message à vos amis pour raconter votre visite (stands, conférences, rencontres avec des auteurs).',
      corrige: `Salut les amis,

Dimanche, je suis enfin allée au salon du livre, et je dois vous raconter cette journée ! Je suis arrivée à l’ouverture, à 10 h, et il y avait déjà beaucoup de monde dans les allées.

J’ai d’abord fait le tour des stands des éditeurs : romans, bandes dessinées, livres de cuisine… J’ai eu du mal à résister ! Ensuite, j’ai assisté à une conférence passionnante sur la littérature haïtienne. Le meilleur moment a été la rencontre avec une romancière que j’adore : j’ai fait la queue quarante minutes pour qu’elle dédicace mon exemplaire, et elle a pris le temps de discuter avec moi de son prochain livre.

Je suis repartie avec cinq nouveaux livres et plein d’idées de lecture. L’an prochain, on y va ensemble ?

Bises,
Nathalie`,
    },
    {
      prompt: T3('Faire ses courses chez les producteurs locaux ou au supermarché ?'),
      documents: [
        'Document 1 : Acheter directement aux producteurs, c’est manger des fruits et des légumes frais, cueillis à maturité. L’argent va aux agriculteurs de la région, et les produits parcourent moins de kilomètres, ce qui réduit la pollution.',
        'Document 2 : Le supermarché reste la solution la plus pratique : on y trouve tout au même endroit, à toute heure et souvent moins cher. Pour une famille qui travaille, faire le tour des marchés et des fermes n’est tout simplement pas possible.',
      ],
      corrige: `Où faire ses courses alimentaires ? Le premier document défend les producteurs locaux : leurs produits sont plus frais, ils font vivre l’économie de la région et polluent moins. Le second rappelle que le supermarché est plus pratique, ouvert plus longtemps et souvent moins cher, ce qui compte pour les familles occupées.

Personnellement, je pense que l’on peut combiner les deux. Pour les produits frais, comme les fruits, les légumes, les œufs ou le fromage, je préfère le marché du samedi matin : le goût est incomparable et je connais les agriculteurs qui les produisent. En revanche, pour les produits d’entretien, le riz ou les conserves, le supermarché reste plus simple et plus économique. Il faut aussi reconnaître que tout le monde n’a pas le temps ni le budget pour acheter uniquement local. Les villes pourraient aider en organisant des marchés en fin de journée ou des paniers livrés près des lieux de travail. Consommer local doit devenir facile, pas un luxe.`,
    },
  ]),

  /* ───────────── Juin 2026 ───────────── */
  c(2026, 6, 1, 'Les vols à bas prix', [
    {
      prompt: 'Vous organisez une fête d’anniversaire surprise pour votre meilleur(e) ami(e). Écrivez un message à vos amis communs pour les inviter et leur donner tous les détails (lieu, date, heure, consignes).',
      corrige: `Salut tout le monde,

Le 20 juin, notre chère Amandine aura 30 ans, et j’organise une fête surprise pour l’occasion ! Elle ne se doute de rien, alors surtout, pas un mot.

La fête aura lieu le samedi 20 juin au restaurant La Terrasse, au 12, rue Sainte-Catherine. Merci d’arriver à 19 h 30 au plus tard : son copain l’amènera vers 20 h en lui faisant croire à un simple dîner en tête-à-tête.

J’ai ouvert une cagnotte pour lui offrir un baptême de parapente ; chacun peut participer selon ses moyens.

Confirmez-moi votre présence avant mercredi !

À samedi,
Léa`,
    },
    {
      prompt: 'Vous avez tenu un stand dans un vide-grenier (marché d’occasion) de votre ville. Sur votre blog, racontez cette journée et expliquez pourquoi elle vous a plu.',
      corrige: `Dimanche dernier, j’ai tenu mon premier stand au vide-grenier de mon quartier. Depuis mon déménagement, des cartons pleins d’objets inutiles encombraient mon garage : c’était l’occasion idéale de faire de la place.

Je me suis levé à 6 h pour installer ma table : vêtements, livres, vaisselle et même un vieux vélo d’enfant. Dès 8 h, les premiers acheteurs sont arrivés. J’ai appris à négocier avec le sourire ; une enseignante a acheté presque tous mes livres pour sa classe. En fin de journée, j’avais gagné 230 dollars et vidé presque tous mes cartons.

Ce qui m’a le plus plu, c’est l’ambiance. Les voisins discutaient d’un stand à l’autre, les enfants échangeaient leurs jouets et tout le monde semblait de bonne humeur. En plus, donner une seconde vie aux objets est un geste pour la planète. Je recommencerai l’an prochain !`,
    },
    {
      prompt: T3('Les vols à bas prix : une chance ou un problème ?'),
      documents: [
        'Document 1 : Grâce aux compagnies aériennes à bas prix, des millions de personnes peuvent voyager pour quelques dizaines de dollars. Rendre visite à sa famille à l’étranger ou découvrir un autre pays n’est plus réservé aux plus riches.',
        'Document 2 : Derrière les billets bon marché se cachent des frais pour tout : bagage, choix du siège, boisson. Les avions partent d’aéroports éloignés, les retards sont fréquents, et ces vols toujours plus nombreux aggravent la pollution.',
      ],
      corrige: `Les vols à bas prix sont-ils une bonne chose ? Le premier document les présente comme une démocratisation du voyage : chacun peut désormais prendre l’avion pour voir sa famille ou découvrir le monde. Le second dénonce leurs défauts : frais cachés, aéroports éloignés, retards et impact important sur l’environnement.

À mon avis, ces compagnies ont rendu un grand service, mais il faut les utiliser intelligemment. Pour un étudiant qui veut rentrer voir ses parents, payer cent dollars au lieu de cinq cents change tout. Cependant, le prix affiché est rarement le prix final : avec une valise et un siège réservé, la différence avec une compagnie classique devient parfois très faible. Il faut donc comparer avant d’acheter. Quant à l’environnement, le problème est réel : prendre l’avion pour un week-end à trois cents kilomètres n’a pas de sens quand un train existe. Selon moi, le vol à bas prix est utile pour les longues distances, pas pour remplacer tous les autres moyens de transport.`,
    },
  ]),
  c(2026, 6, 2, 'La colocation entre adultes', [
    {
      prompt: 'Vous allez vous installer dans une autre ville. Écrivez un courriel à une agence immobilière pour décrire le logement que vous recherchez (quartier, surface, nombre de pièces, budget, date d’arrivée).',
      corrige: `Objet : Recherche d’un appartement à Sherbrooke

Madame, Monsieur,

Je vais m’installer à Sherbrooke au mois d’août pour occuper un nouveau poste à l’hôpital universitaire, et je cherche un appartement à louer.

Je souhaiterais un 4 ½ d’environ 70 mètres carrés, avec deux chambres, car ma fille vivra avec moi. Idéalement, le logement serait situé près d’une école primaire et d’une ligne d’autobus. Un stationnement serait un plus.

Mon budget maximal est de 1 400 dollars par mois, chauffage compris. Je pourrais emménager à partir du 1er août.

Je vous remercie de me faire parvenir vos propositions.

Cordialement,
Mariam Diallo`,
    },
    {
      prompt: 'Vous avez arrêté d’utiliser votre réseau social préféré pendant un mois. Écrivez un message à vos amis pour raconter cette expérience et expliquer ce qu’elle a changé dans votre vie.',
      corrige: `Salut à tous,

Vous l’avez peut-être remarqué : je n’ai rien publié sur Instagram depuis un mois. Ce n’est pas un hasard ! Je passais plus de trois heures par jour sur cette application et je me sentais toujours fatigué. J’ai donc décidé de la supprimer de mon téléphone.

Les premiers jours ont été étranges. Je prenais mon portable par réflexe dans le bus ou en faisant la queue, sans savoir quoi en faire. Puis, petit à petit, j’ai retrouvé d’anciennes habitudes : j’ai terminé deux romans, je me suis remis à la guitare et je me couche une heure plus tôt.

Le plus surprenant, c’est que je ne me suis pas senti isolé. Au contraire, j’appelle davantage mes amis au lieu de regarder leurs photos.

Je pense que je vais continuer encore un peu. Et vous, vous seriez capables d’essayer ?

Hugo`,
    },
    {
      prompt: T3('Vivre en colocation quand on est adulte : une bonne idée ?'),
      documents: [
        'Document 1 : La colocation n’est plus réservée aux étudiants. Pour un adulte qui travaille, elle permet de payer moins cher un logement plus grand et mieux situé, de partager les factures et de ne pas rentrer chaque soir dans un appartement vide.',
        'Document 2 : Partager son logement avec d’autres adultes, c’est accepter leurs horaires, leurs invités et leurs habitudes. Le bruit, le ménage ou le partage des dépenses deviennent vite des sources de conflit, et l’on n’est jamais vraiment chez soi.',
      ],
      corrige: `La colocation convient-elle aux adultes ? Selon le premier document, elle permet de louer un logement plus grand et mieux situé à moindre coût, tout en évitant la solitude. Le second insiste sur les difficultés : il faut supporter les habitudes des autres, et les questions de bruit, de ménage ou d’argent provoquent souvent des disputes.

Je pense que la colocation peut être une excellente solution, à condition de bien choisir ses colocataires. Dans les grandes villes, où les loyers ne cessent d’augmenter, partager un appartement permet à de nombreux travailleurs de vivre près de leur emploi. C’est aussi une façon de créer des liens quand on arrive dans un nouveau pays, comme ce fut mon cas. Cependant, la bonne entente ne se décrète pas. Il est indispensable de fixer les règles dès le départ : répartition des tâches, invités, heures de silence et partage des factures. Chacun doit aussi disposer de sa propre chambre pour préserver son intimité. Avec de la communication et du respect, vivre ensemble devient un avantage plutôt qu’une contrainte.`,
    },
  ]),
  c(2026, 6, 3, 'La photo sur le CV', [
    {
      prompt: 'Votre ami(e) voudrait suivre des cours de français dans l’école de langues où vous étudiez. Écrivez-lui un message pour lui donner les informations utiles (adresse, types de cours, horaires, tarifs).',
      corrige: `Salut Daniel,

Bonne idée de vouloir apprendre le français ! Mon école, le Centre Langues Plus, se trouve au 230, rue Saint-Denis, juste à côté du métro.

L’école propose deux formules. Les cours intensifs ont lieu du lundi au vendredi, de 9 h à 12 h, et coûtent 450 dollars par mois. Les cours du soir, deux fois par semaine de 18 h à 20 h, coûtent 220 dollars par mois. Les groupes comptent au maximum douze élèves.

Avant de commencer, tu passeras un petit test gratuit pour connaître ton niveau. Les professeurs sont excellents et très patients.

Tiens-moi au courant !

Sofia`,
    },
    {
      prompt: 'Vous avez accueilli chez vous un(e) étudiant(e) étranger(ère) pendant une semaine. Sur votre blog, racontez cette semaine et dites ce que cette expérience vous a apporté.',
      corrige: `Le mois dernier, notre famille a accueilli Kenji, un lycéen japonais de dix-sept ans venu participer à un échange avec l’école de mon fils. Pendant une semaine, il a partagé notre quotidien.

Le premier soir, Kenji était très timide et parlait peu. Pour le mettre à l’aise, nous avons préparé ensemble un repas typique de chez nous, puis il nous a appris à utiliser des baguettes. Les jours suivants, nous lui avons fait visiter le vieux port, le marché et le musée d’histoire. Le samedi, il a cuisiné pour nous des onigiris, de petites boules de riz : un vrai succès !

Cette expérience nous a beaucoup apporté. Mes enfants ont découvert une autre culture et ont fait de gros progrès en anglais. Quant à moi, j’ai compris combien un simple geste d’accueil peut créer des liens. Nous sommes toujours en contact avec lui.`,
    },
    {
      prompt: T3('Faut-il mettre une photo sur son CV ?'),
      documents: [
        'Document 1 : Une photo n’apporte aucune information sur les compétences d’un candidat. Au contraire, elle peut entraîner des discriminations liées à l’âge, à l’origine ou à l’apparence. C’est pourquoi plusieurs pays la déconseillent fortement sur le CV.',
        'Document 2 : Pour certains recruteurs, la photo permet de se souvenir plus facilement d’un candidat parmi des dizaines de dossiers. Dans les métiers d’accueil ou de vente, elle donne aussi une première idée du professionnalisme de la personne.',
      ],
      corrige: `La photo a-t-elle sa place sur un CV ? Le premier document estime qu’elle est inutile et dangereuse, car elle peut favoriser des discriminations liées à l’âge, à l’origine ou à l’apparence. Le second affirme qu’elle aide les recruteurs à retenir un candidat et qu’elle est utile dans les métiers en contact avec le public.

Pour ma part, je suis plutôt contre la photo sur le CV. Un employeur doit d’abord juger les diplômes, l’expérience et les compétences, et non un visage. Or, même sans le vouloir, un recruteur peut être influencé par l’apparence d’une personne. C’est d’ailleurs pour cette raison qu’au Canada, on conseille de ne pas en mettre. Je comprends cependant que, pour un poste d’accueil, l’image compte davantage. Dans ce cas, le recruteur pourra se faire une idée lors de l’entretien. À mon avis, le CV doit donner à chacun la même chance d’être convoqué, et l’absence de photo y contribue.`,
    },
  ]),
  c(2026, 6, 4, 'Aider les personnes en difficulté', [
    {
      prompt: 'Votre ami Thomas vous écrit qu’il connaît mal les traditions de votre pays. Répondez-lui en lui présentant une grande fête qui y est célébrée (date, déroulement, plats, coutumes).',
      corrige: `Salut Thomas,

Merci pour ta question ! Chez moi, au Sénégal, la fête la plus importante est la Tabaski. Sa date change chaque année, car elle suit le calendrier lunaire.

Ce jour-là, les familles se lèvent tôt, mettent leurs plus beaux habits et vont à la grande prière du matin. Ensuite, chaque famille sacrifie un mouton, puis on prépare des grillades avec une sauce aux oignons pour le déjeuner. On partage toujours une partie de la viande avec les voisins et les personnes dans le besoin.

L’après-midi, on rend visite à ses proches pour leur demander pardon et leur souhaiter une bonne fête.

Tu pourrais venir la vivre avec nous !

Amadou`,
    },
    {
      prompt: 'Vous êtes bénévole dans une association qui aide les personnes âgées isolées. Écrivez un article pour le blog de l’association afin de raconter votre expérience et de convaincre d’autres personnes de vous rejoindre.',
      corrige: `Il y a un an, j’ai rejoint l’association Les Liens d’Argent, qui rend visite aux personnes âgées vivant seules. Au départ, je voulais simplement me rendre utile quelques heures par semaine.

Chaque mercredi après-midi, je vais voir Mme Roy, une ancienne couturière de 87 ans. La première fois, elle m’a à peine parlé. Aujourd’hui, elle m’attend avec du thé et des biscuits, et elle me raconte sa jeunesse à Québec. Parfois, nous faisons une courte promenade ou quelques courses au marché. Elle m’a confié que ma visite était le moment le plus important de sa semaine.

Cette expérience m’a beaucoup appris sur la patience et la valeur du temps partagé. Nous manquons de bénévoles : si vous disposez de deux heures par semaine, rejoignez-nous ! Vous verrez que vous recevrez autant que vous donnerez.`,
    },
    {
      prompt: T3('Comment aider les personnes en difficulté ?'),
      documents: [
        'Document 1 : Donner quelques pièces à une personne sans abri ou faire un don à une banque alimentaire, c’est un geste simple et immédiat. Il permet de payer un repas chaud ou une nuit à l’abri. Tout le monde peut le faire, même avec un petit budget.',
        'Document 2 : L’argent donné de temps en temps soulage notre conscience, mais il ne change pas la situation des plus pauvres. Ce qui les aide vraiment, c’est un accompagnement durable : trouver un logement, une formation, un emploi. Mieux vaut donner de son temps à une association.',
      ],
      corrige: `Quelle est la meilleure façon d’aider les personnes en difficulté ? Le premier document défend le don d’argent, un geste simple et immédiat qui permet d’offrir un repas ou un abri. Le second juge cette aide insuffisante et préfère un engagement durable dans une association, pour aider les plus pauvres à retrouver un logement et un emploi.

À mon avis, ces deux formes de solidarité sont complémentaires. Une personne qui a faim ce soir a besoin d’une aide immédiate, et un don à une banque alimentaire répond à cette urgence. Mais si l’on se contente de donner quelques pièces, on ne s’attaque pas aux causes de la pauvreté. Les associations qui accompagnent les sans-abri dans leurs démarches, les aident à rédiger un CV ou à se soigner obtiennent des résultats plus durables. Tout le monde n’a pas le temps de faire du bénévolat, c’est vrai ; dans ce cas, donner régulièrement à ces associations reste une aide précieuse. L’important est de ne pas rester indifférent.`,
    },
  ]),
  c(2026, 6, 5, 'La télévision et l’éducation des enfants', [
    {
      prompt: 'Pour l’anniversaire d’un(e) ami(e), vous lui offrez un voyage. Écrivez-lui un message pour lui annoncer la surprise et lui expliquer ce que vous avez prévu (destination, dates, préparatifs).',
      corrige: `Joyeux anniversaire, Clara !

Cette année, j’ai voulu te faire un cadeau un peu spécial : je t’emmène trois jours à Québec, du 26 au 28 juin !

J’ai tout organisé. Nous partirons le vendredi matin en train depuis la gare centrale ; le trajet dure environ trois heures. J’ai réservé deux nuits dans une petite auberge du Vieux-Québec, avec vue sur le fleuve. Au programme : une promenade sur la terrasse Dufferin, le tour de l’île d’Orléans à vélo et un souper dans le restaurant dont tu regardes les photos depuis des mois.

Tu n’as qu’à prendre ton vendredi et préparer une petite valise !

Bisous,
Élodie`,
    },
    {
      prompt: 'Vous avez commencé une nouvelle activité sportive. Sur votre blog, racontez vos débuts et expliquez pourquoi cette activité pourrait plaire à tout le monde.',
      corrige: `Depuis trois mois, je pratique l’escalade en salle, et je ne pensais pas un jour écrire ces mots : je suis devenu accro !

Tout a commencé quand un collègue m’a invité à une séance d’essai. J’avais le vertige et je n’avais pas fait de sport depuis des années. Le premier soir, je n’ai pas réussi à monter à plus de trois mètres, et j’ai eu mal aux bras pendant deux jours. Mais l’ambiance m’a plu : les autres grimpeurs m’encourageaient et me donnaient des conseils.

Aujourd’hui, je grimpe deux fois par semaine et j’ai atteint le sommet de mon premier mur difficile. Je suis plus fort, mais surtout plus patient et plus concentré.

Je pense que l’escalade convient à tout le monde : chacun progresse à son rythme, il n’y a pas de compétition, et c’est un exercice autant pour le corps que pour l’esprit.`,
    },
    {
      prompt: T3('La télévision : une aide ou un obstacle à l’éducation des enfants ?'),
      documents: [
        'Document 1 : Documentaires, émissions scientifiques, dessins animés éducatifs : la télévision fait découvrir aux enfants le monde, les animaux, l’histoire ou d’autres langues. Regardée avec un adulte, elle peut devenir un vrai point de départ pour discuter et apprendre.',
        'Document 2 : Les enfants qui passent des heures devant la télévision bougent moins, parlent moins avec leur famille et ont plus de mal à se concentrer en classe. Beaucoup de programmes, remplis de publicité et de violence, ne sont pas adaptés à leur âge.',
      ],
      corrige: `La télévision aide-t-elle les enfants à apprendre ? Le premier document lui reconnaît une vraie valeur éducative : grâce aux documentaires et aux émissions adaptées, les enfants découvrent le monde, surtout s’ils regardent avec un adulte. Le second insiste sur ses effets négatifs : manque d’activité, moins de dialogue en famille, difficultés de concentration et programmes inadaptés.

Selon moi, la télévision n’est ni bonne ni mauvaise en soi : tout dépend de ce que l’on regarde et pendant combien de temps. Quand j’étais enfant, une émission scientifique du samedi matin m’a donné le goût de la biologie. En revanche, laisser un enfant seul devant l’écran tous les soirs, sans contrôle, l’empêche de jouer, de lire et de parler. Les parents ont donc une grande responsabilité : choisir des programmes adaptés à l’âge, limiter le temps d’écran et, autant que possible, regarder avec leurs enfants pour en discuter ensuite. Bien utilisée, la télévision peut compléter l’éducation, mais jamais remplacer les échanges avec les adultes.`,
    },
  ]),
  c(2026, 6, 6, 'Les animaux de compagnie au bureau', [
    {
      prompt: 'Vous organisez une fête et vous avez besoin d’aide. Écrivez un message à vos amis pour les inviter et leur demander un coup de main pour la préparation (lieu, date, thème, tâches).',
      corrige: `Coucou tout le monde,

Pour fêter l’arrivée de l’été, j’organise une grande soirée sur le thème des années 80 le samedi 27 juin, à partir de 19 h, dans le jardin de mes parents, au 5, chemin des Lilas.

J’ai besoin de vous pour que la fête soit réussie ! Nadia, tu pourrais t’occuper de la musique ? Paul et Hamid, j’aurais besoin de vous vers 15 h pour installer les tables et les guirlandes. Pour les autres, si chacun apporte un plat ou un dessert, ce serait parfait.

N’oubliez pas vos tenues fluo et vos coiffures improbables !

Dites-moi vite ce que vous pouvez faire.

Je vous embrasse,
Chloé`,
    },
    {
      prompt: 'Pendant vos vacances, vous avez séjourné dans une très belle région de votre pays. Écrivez un message à vos amis pour raconter ce séjour et expliquer pourquoi il vous a beaucoup plu.',
      corrige: `Salut les amis,

Je viens de rentrer de dix jours en Gaspésie, et je voulais absolument vous raconter ce voyage ! Avec ma sœur, nous avons loué une petite voiture et suivi la route qui longe la mer.

Chaque jour nous réservait une surprise. À Percé, nous avons pris le bateau jusqu’à l’île Bonaventure, où vivent des milliers de fous de Bassan : le bruit et l’odeur étaient incroyables ! Dans le parc national Forillon, nous avons vu des phoques et même une baleine depuis le sentier. Le soir, nous mangions du homard frais dans de petits restaurants de pêcheurs.

Ce qui m’a le plus plu, c’est la nature sauvage et la gentillesse des habitants, qui prenaient toujours le temps de nous conseiller. Je me suis vraiment reposée, loin du bruit de la ville.

Je vous montre les photos bientôt !

Gabrielle`,
    },
    {
      prompt: T3('Les animaux de compagnie au bureau : pour ou contre ?'),
      documents: [
        'Document 1 : Dans certaines entreprises, les employés peuvent venir travailler avec leur chien. Selon plusieurs enquêtes, la présence d’un animal réduit le stress, favorise les échanges entre collègues et évite aux propriétaires de laisser leur compagnon seul toute la journée.',
        'Document 2 : Un bureau n’est pas un parc. Les aboiements dérangent ceux qui ont besoin de se concentrer, certains salariés sont allergiques ou ont peur des chiens, et l’hygiène des locaux en souffre. Le travail doit rester un lieu professionnel.',
      ],
      corrige: `Faut-il accepter les animaux sur le lieu de travail ? Le premier document met en avant leurs bienfaits : moins de stress, plus de convivialité et des animaux qui ne restent plus seuls à la maison. Le second s’y oppose, car le bruit, les allergies, la peur de certains employés et les problèmes d’hygiène nuisent au travail.

À mon avis, cette pratique peut fonctionner, mais pas partout ni sans règles. Dans une petite entreprise où tous les employés sont d’accord, la présence d’un chien calme peut vraiment améliorer l’ambiance ; je l’ai constaté dans une agence où j’ai fait un stage. En revanche, dans un hôpital, un restaurant ou un grand bureau ouvert, ce serait inapproprié. Si une entreprise veut tenter l’expérience, elle doit consulter tous ses salariés, réserver certains espaces aux animaux et exiger qu’ils soient propres, vaccinés et bien éduqués. Le bien-être des animaux ne doit jamais passer avant celui des personnes qui travaillent.`,
    },
  ]),

  /* ───────────── Mai 2026 ───────────── */
  c(2026, 5, 1, 'Les repas sans viande à la cantine', [
    {
      prompt: 'Vous voulez fêter la fin de l’année universitaire avec vos amis. Écrivez-leur un message pour les inviter et leur donner les informations pratiques (date, lieu, programme).',
      corrige: `Salut à tous,

Ça y est, nos examens se terminent le 29 mai ! Pour fêter la fin de cette année difficile, je vous invite à une soirée chez moi le samedi 30 mai, à partir de 18 h.

Au programme : un barbecue sur la terrasse, un tournoi de jeux de société et, bien sûr, de la musique jusqu’à minuit. Je m’occupe de la viande et des boissons ; si vous voulez, apportez une salade ou un dessert.

J’habite au 18, avenue du Parc, appartement 6. Le bus 55 s’arrête juste devant l’immeuble.

Répondez-moi avant jeudi pour que je prévoie assez de nourriture.

À samedi,
Yasmine`,
    },
    {
      prompt: 'Vous avez fait un circuit au Canada organisé par une agence de voyages. Rédigez un commentaire sur le site de l’agence pour raconter votre voyage et donner votre avis.',
      corrige: `Je reviens d’un circuit de deux semaines au Canada organisé par votre agence, et je tenais à partager mon expérience avec les futurs voyageurs.

Nous avons commencé par Toronto et les chutes du Niagara, impressionnantes malgré la foule. Ensuite, nous avons rejoint Montréal et Québec en autocar, puis nous avons terminé par trois jours au bord du fjord du Saguenay, où nous avons observé des baleines. Le guide, Philippe, était passionnant et toujours disponible.

Les hôtels étaient confortables et bien situés, sauf celui de Toronto, assez bruyant. Mon seul regret concerne le rythme : nous changions de ville presque tous les deux jours et il restait peu de temps libre pour flâner.

Dans l’ensemble, je suis très satisfaite et je recommande ce circuit, surtout pour une première découverte du pays. Je lui donne quatre étoiles sur cinq.

Fatima K.`,
    },
    {
      prompt: T3('Des repas sans viande à la cantine scolaire : pour ou contre ?'),
      documents: [
        'Document 1 : Proposer un ou deux repas végétariens par semaine à la cantine permet de faire découvrir aux élèves les légumineuses et les céréales. C’est bon pour la santé, moins cher pour les écoles et beaucoup moins polluant que la viande.',
        'Document 2 : Pour beaucoup de familles modestes, le repas de la cantine est le seul moment où l’enfant mange de la viande. La supprimer risque de priver les élèves de protéines importantes et de remplir les poubelles, car de nombreux enfants refusent ces plats.',
      ],
      corrige: `Faut-il servir des repas sans viande à la cantine ? Le premier document y est favorable : les menus végétariens font découvrir de nouveaux aliments, sont bons pour la santé, coûtent moins cher et protègent l’environnement. Le second craint qu’ils privent certains enfants de protéines et augmentent le gaspillage, car beaucoup refusent de les manger.

Je suis favorable à cette mesure, à condition qu’elle reste raisonnable. Un ou deux repas végétariens par semaine ne mettent pas la santé des enfants en danger, surtout s’ils sont préparés par des diététiciens avec des lentilles, des pois chiches ou des œufs. En revanche, supprimer complètement la viande serait une erreur, car cela pénaliserait les familles qui n’en consomment pas à la maison. Le véritable défi est le goût : un plat de légumes fade finira à la poubelle. Les cuisiniers devraient donc être formés à préparer des recettes savoureuses, et les élèves pourraient participer au choix des menus. Bien expliqués, ces repas apprendront aux jeunes à manger de façon plus variée.`,
    },
  ]),
  c(2026, 5, 2, 'La sévérité des parents', [
    {
      prompt: 'Vous organisez un week-end en famille le mois prochain. Écrivez un message à vos proches pour leur présenter votre projet (lieu, transport, activités, coût).',
      corrige: `Bonjour la famille,

J’ai une idée pour le long week-end de juin : et si on partait tous ensemble au bord du fleuve, à Tadoussac ?

J’ai trouvé un grand chalet pour douze personnes, à deux pas de la plage, du vendredi 19 au dimanche 21 juin. Pour le transport, je propose qu’on y aille avec deux voitures : papa et moi pouvons conduire. Le trajet dure environ trois heures et demie.

Sur place, on pourrait faire une croisière pour observer les baleines, une randonnée sur les dunes et, le soir, un grand repas au barbecue. Le chalet coûte 900 dollars, soit 150 dollars par couple.

Qu’en pensez-vous ?

Bisous,
Nadège`,
    },
    {
      prompt: 'Le site d’un magazine de voyage pose cette question à ses lecteurs : « Tout quitter pendant un an pour voyager : bonne ou mauvaise idée ? » Répondez en vous appuyant sur votre expérience personnelle.',
      corrige: `À vingt-six ans, j’ai démissionné de mon poste de comptable pour partir un an en Amérique du Sud, sac au dos. Mes parents pensaient que je faisais une énorme erreur.

Pendant douze mois, j’ai traversé six pays. J’ai travaillé dans une auberge de jeunesse au Pérou, appris l’espagnol en Colombie et marché quatre jours pour atteindre le Machu Picchu. Bien sûr, tout n’a pas été facile : j’ai été malade en Bolivie, et mon budget m’a parfois obligé à dormir dans des bus de nuit.

À mon retour, j’ai mis quatre mois à retrouver un emploi, mais mon expérience a intéressé les recruteurs : je parlais une nouvelle langue et je savais m’adapter à tout.

Pour moi, c’est donc une excellente idée, à condition de bien la préparer : économiser avant de partir et garder un projet pour le retour.

Thomas`,
    },
    {
      prompt: T3('Faut-il être sévère avec ses enfants ?'),
      documents: [
        'Document 1 : Les enfants ont besoin de limites claires. Des horaires fixes, des règles à respecter et des punitions quand elles ne le sont pas leur apprennent la discipline et le respect. Trop de liberté fabrique des adolescents capricieux.',
        'Document 2 : Une éducation trop stricte crée la peur plutôt que la confiance. Un enfant puni sans cesse apprend surtout à mentir et à cacher ses erreurs. Écouter, expliquer et encourager donne de bien meilleurs résultats.',
      ],
      corrige: `Les parents doivent-ils être sévères ? Pour le premier document, des règles claires et des sanctions sont nécessaires pour apprendre la discipline et le respect aux enfants. Le second estime au contraire qu’une éducation trop stricte crée la peur et pousse les enfants à mentir, alors que le dialogue et l’encouragement réussissent mieux.

À mon avis, la bonne attitude se situe entre les deux : les parents doivent être fermes sans être autoritaires. Un enfant a besoin de repères, par exemple une heure de coucher, des devoirs à faire ou un temps d’écran limité. Sans ces règles, il se sent souvent perdu. Mais elles doivent être expliquées : un enfant qui comprend pourquoi il ne doit pas faire quelque chose les respecte plus facilement. Les punitions devraient rester rares et proportionnées, jamais humiliantes. Mes parents étaient exigeants, mais ils m’écoutaient toujours, et je leur en suis reconnaissant aujourd’hui. L’autorité la plus efficace repose sur la confiance, pas sur la peur.`,
    },
  ]),
  c(2026, 5, 3, 'Les étudiants et les emplois d’été', [
    {
      prompt: 'Vous avez vu une annonce pour la location d’un appartement. Écrivez un courriel au propriétaire pour lui demander des informations sur le logement et le quartier.',
      corrige: `Objet : Appartement de la rue Fleury

Monsieur,

J’ai vu votre annonce pour un appartement de trois pièces rue Fleury, et il m’intéresse beaucoup.

Pourriez-vous me donner quelques précisions ? J’aimerais savoir si le chauffage et l’électricité sont compris dans le loyer de 1 200 dollars, et si l’appartement dispose d’une laveuse et d’une sécheuse. Est-il possible d’avoir un animal ? J’ai un petit chat très calme.

Concernant le quartier, y a-t-il une épicerie et une station de métro à proximité ?

Enfin, je serais disponible pour une visite dès cette semaine, en fin de journée.

Merci d’avance pour votre réponse.

Cordialement,
Cyril Ngoumou`,
    },
    {
      prompt: 'Vous avez assisté à un concert avec des amis et vous l’avez beaucoup aimé. Sur votre blog, racontez cette soirée et expliquez pourquoi elle vous a plu.',
      corrige: `Vendredi soir, je suis allée avec trois amies au concert de l’orchestre symphonique de ma ville, qui jouait des musiques de films en plein air, sur l’esplanade du port. Je n’avais jamais assisté à un concert de musique classique et j’avais un peu peur de m’ennuyer.

Nous sommes arrivées à 19 h avec nos couvertures et un pique-nique. À la tombée de la nuit, l’orchestre a commencé par la musique de Star Wars, et le public a applaudi dès les premières notes. Pendant deux heures, des images des films étaient projetées sur un écran géant derrière les musiciens.

Ce qui m’a le plus touchée, c’est l’émotion collective : des enfants aux grands-parents, tout le monde fredonnait ou fermait les yeux. Le concert était gratuit, ce qui permettait à chacun d’en profiter.

J’ai découvert que la musique classique pouvait être accessible et joyeuse. J’irai au prochain concert !`,
    },
    {
      prompt: T3('Travailler pendant les vacances quand on est étudiant : une bonne idée ?'),
      documents: [
        'Document 1 : Un emploi d’été permet aux étudiants de financer leurs études et de gagner en autonomie. C’est aussi une première expérience professionnelle qui apprend la ponctualité, le travail en équipe et la valeur de l’argent.',
        'Document 2 : Après une année d’études intense, les jeunes ont besoin de se reposer, de voyager ou de se consacrer à leurs passions. Les emplois saisonniers sont souvent pénibles et mal payés, et ils n’ont généralement aucun lien avec la formation suivie.',
      ],
      corrige: `Les étudiants doivent-ils travailler pendant les vacances ? Le premier document y voit de nombreux avantages : financer ses études, devenir autonome et acquérir une première expérience professionnelle. Le second rappelle que les jeunes ont besoin de repos après l’année universitaire et que les emplois saisonniers sont souvent durs, mal payés et sans rapport avec leurs études.

Personnellement, je pense qu’un emploi d’été est une expérience très formatrice, à condition de ne pas occuper toutes les vacances. J’ai travaillé deux étés comme serveur dans un restaurant : c’était fatigant, mais j’ai appris à gérer le stress, à parler avec des clients de tous horizons et à respecter un horaire. Ces qualités m’ont aidé lors de mes premiers entretiens d’embauche. Cependant, travailler tout l’été sans pause peut conduire à l’épuisement et nuire à l’année suivante. L’idéal est donc de travailler six ou huit semaines, puis de garder du temps pour se reposer. Et si l’on trouve un emploi lié à ses études, c’est encore mieux.`,
    },
  ]),
  c(2026, 5, 4, 'La place du travail dans la vie', [
    {
      prompt: 'Un site consacré au sport amateur recueille des témoignages. Écrivez un court message pour expliquer quelle place le sport occupe dans votre vie.',
      corrige: `Bonjour,

Je m’appelle Rachid, j’ai 34 ans, et le sport occupe une place essentielle dans ma vie depuis l’enfance.

Je joue au soccer dans une équipe amateur de mon quartier : nous nous entraînons le mardi soir et nous avons un match presque tous les dimanches. En semaine, je vais aussi au travail à vélo, ce qui représente vingt kilomètres par jour.

Pour moi, le sport n’est pas seulement une question de santé. Il m’aide à évacuer le stress du travail, et il m’a permis de me faire de nombreux amis quand je suis arrivé au Canada. Je ne pourrais plus m’en passer !

Rachid`,
    },
    {
      prompt: 'Vous venez de commencer un nouvel emploi. Écrivez un courriel à vos proches pour leur raconter votre première semaine (entreprise, poste, missions, impressions).',
      corrige: `Objet : Ma première semaine chez Énergik

Bonjour à tous,

Ça y est, ma première semaine dans mon nouveau travail est terminée, et je voulais vous donner des nouvelles !

Comme vous le savez, je suis maintenant chargée de projet chez Énergik, une petite entreprise qui installe des panneaux solaires. Lundi, la directrice m’a fait visiter les locaux et m’a présenté l’équipe, une quinzaine de personnes très accueillantes. Dès mardi, j’ai accompagné un technicien chez un client pour comprendre le déroulement d’une installation.

Ma mission principale est de planifier les chantiers et de suivre les commandes de matériel. Le rythme est rapide et j’ai encore beaucoup à apprendre, mais mes collègues répondent toujours à mes questions avec patience.

Pour l’instant, je suis très contente de mon choix : j’ai enfin un travail qui a du sens pour moi.

Je vous embrasse,
Aminata`,
    },
    {
      prompt: T3('Le travail : une source d’épanouissement ou une contrainte ?'),
      documents: [
        'Document 1 : Le travail ne sert pas seulement à gagner sa vie. Il donne un rôle dans la société, permet de rencontrer des gens, d’apprendre et de se sentir utile. Beaucoup de retraités disent d’ailleurs que leur activité professionnelle leur manque.',
        'Document 2 : Pour de nombreux salariés, le travail est surtout synonyme de stress, de fatigue et de longs trajets. Il prend une telle place qu’il reste peu de temps pour la famille, les amis et les loisirs, qui sont pourtant l’essentiel de la vie.',
      ],
      corrige: `Le travail rend-il heureux ? Selon le premier document, il apporte bien plus qu’un salaire : une place dans la société, des relations, des connaissances et le sentiment d’être utile. Le second le présente plutôt comme une source de stress et de fatigue qui empiète sur la vie familiale et les loisirs.

Je pense que le travail peut être une grande source d’épanouissement, mais seulement s’il reste à sa place. Quand on exerce un métier qui a du sens, on se lève le matin avec l’envie d’apprendre et de progresser. C’est mon cas depuis que je suis enseignante : voir mes élèves réussir me rend fière. Néanmoins, même un métier passionnant devient pénible si l’on travaille soixante heures par semaine. L’équilibre entre vie professionnelle et vie personnelle est donc essentiel. Les entreprises ont un rôle à jouer en proposant des horaires flexibles ou du télétravail, et chacun doit apprendre à fixer ses limites. Le travail devrait enrichir la vie, pas la remplacer.`,
    },
  ]),
  c(2026, 5, 5, 'Les zoos', [
    {
      prompt: 'Vous fêtez votre anniversaire au restaurant. Écrivez un courriel à vos amis pour les inviter et leur donner toutes les informations utiles (lieu, date, menu, prix), en leur demandant de vous répondre.',
      corrige: `Objet : Mon anniversaire au restaurant !

Bonjour à tous,

Le 16 mai, je fête mes 35 ans et j’aimerais vous réunir autour d’un bon repas. Je vous invite au restaurant libanais Le Cèdre, au 410, boulevard Saint-Laurent, le samedi 16 mai à 19 h 30.

J’ai choisi un menu à partager : des mezzés variés en entrée, un assortiment de grillades avec du riz et des légumes, puis des pâtisseries orientales. Le prix est de 45 dollars par personne, boissons non comprises. Ne vous inquiétez pas pour le gâteau, je m’en occupe !

Le restaurant a besoin du nombre exact de convives, alors merci de me répondre avant le 10 mai.

J’ai hâte de vous voir,
Karima`,
    },
    {
      prompt: 'Vous avez participé à une fête traditionnelle, dans votre pays ou à l’étranger. Racontez-la sur votre blog et expliquez pourquoi elle vous a plu.',
      corrige: `En février dernier, j’ai enfin réalisé un rêve : participer au Carnaval de Québec, l’une des plus grandes fêtes d’hiver au monde. J’avais un peu peur du froid, mais je n’ai pas été déçu.

Dès mon arrivée, j’ai été impressionné par le palais de glace construit devant le Parlement. Pendant trois jours, j’ai assisté au défilé de nuit, avec ses chars illuminés et ses musiciens, et j’ai même dévalé une immense glissade de neige. Le moment le plus étonnant a été la course de canots sur le fleuve gelé : les équipes ramaient puis marchaient sur les blocs de glace !

Cette fête m’a plu parce qu’elle transforme l’hiver, souvent long et triste, en un moment de joie partagée. Partout, des inconnus se saluaient et dansaient malgré les moins vingt degrés. Je conseille cette expérience à tous ceux qui arrivent au Canada.`,
    },
    {
      prompt: T3('Les zoos : protéger les animaux ou les enfermer ?'),
      documents: [
        'Document 1 : Les zoos modernes participent à la sauvegarde d’espèces menacées grâce à des programmes de reproduction. Les animaux y sont nourris et soignés par des vétérinaires, et les visiteurs, surtout les enfants, apprennent à respecter la nature.',
        'Document 2 : Un lion ou un éléphant n’est pas fait pour vivre dans un enclos de quelques centaines de mètres carrés. Beaucoup d’animaux de zoo souffrent d’ennui et de stress. Pour protéger les espèces, il vaudrait mieux préserver leur milieu naturel.',
      ],
      corrige: `Les zoos ont-ils encore leur raison d’être ? Le premier document les défend : ils aident à sauver des espèces menacées, soignent les animaux et sensibilisent le public, en particulier les enfants. Le second les critique : les grands animaux souffrent d’être enfermés dans des espaces trop petits, et la vraie protection passe par la préservation de leur habitat.

À mon avis, les zoos peuvent être utiles, mais ils doivent profondément évoluer. Il est vrai que certaines espèces auraient disparu sans les programmes de reproduction menés dans des parcs zoologiques. Cependant, voir un ours tourner en rond dans une cage en béton n’apprend rien de positif aux enfants. Je pense donc qu’il faudrait garder uniquement les établissements qui offrent de grands espaces proches du milieu naturel et qui participent réellement à la protection des espèces. Les animaux qui supportent mal la captivité, comme les éléphants, devraient être placés dans des réserves. Enfin, une partie du prix des billets pourrait financer la protection des forêts et des océans.`,
    },
  ]),
  c(2026, 5, 6, 'La semaine de quatre jours', [
    {
      prompt: 'Vous venez d’arriver à destination, mais votre valise n’est pas arrivée. Écrivez un courriel à la compagnie aérienne pour décrire votre valise et son contenu, et pour expliquer comment vous joindre.',
      corrige: `Objet : Valise perdue, vol du 12 mai Montréal-Paris

Madame, Monsieur,

Je suis arrivée hier à Paris par le vol de 7 h 15 en provenance de Montréal, mais ma valise n’est jamais apparue sur le tapis à bagages.

Il s’agit d’une grande valise rigide rouge, à quatre roulettes, avec un ruban jaune attaché à la poignée. Elle contient surtout des vêtements, une trousse de toilette et des documents professionnels dont j’ai absolument besoin pour une conférence vendredi.

J’ai rempli une déclaration de perte à l’aéroport, sous le numéro 45872.

Vous pouvez me joindre au 06 12 34 56 78 ou faire livrer la valise à mon hôtel, au 18, rue de Sèvres.

Cordialement,
Audrey Mbida`,
    },
    {
      prompt: 'Un concours propose de gagner un séjour dans la ville de votre choix. Le thème est « Mon artiste préféré ». Écrivez un article de blog pour présenter cet artiste et expliquer pourquoi vous l’admirez.',
      corrige: `Mon artiste préféré est le chanteur Youssou N’Dour. Je l’écoute depuis mon enfance, car mon père passait ses disques chaque dimanche matin pendant que nous préparions le déjeuner.

J’admire d’abord sa voix, puissante et reconnaissable dès la première note. Il chante en wolof, en français et en anglais, et il a fait connaître le mbalax, la musique de mon pays, dans le monde entier. Je me souviens encore du jour où je l’ai vu en concert à Dakar, au milieu d’une foule immense : l’émotion était incroyable.

Mais ce que j’admire le plus, c’est son engagement. Il est resté attaché au Sénégal, y a créé des entreprises et des emplois, et il a soutenu des campagnes de santé, notamment contre le paludisme.

Pour moi, il est la preuve qu’un artiste peut rester fidèle à ses racines tout en touchant le cœur du monde entier.`,
    },
    {
      prompt: T3('La semaine de quatre jours : une bonne idée ?'),
      documents: [
        'Document 1 : Plusieurs entreprises qui ont essayé la semaine de quatre jours constatent que leurs employés sont moins fatigués, moins souvent malades et tout aussi productifs. Avec un jour libre de plus, chacun profite davantage de sa famille et de ses loisirs.',
        'Document 2 : Concentrer le travail sur quatre jours signifie des journées plus longues et plus stressantes. Dans les hôpitaux, les commerces ou les écoles, il est difficile d’organiser un tel système sans embaucher, ce qui coûte cher aux employeurs.',
      ],
      corrige: `Faut-il passer à la semaine de quatre jours ? Le premier document cite des entreprises où cette organisation a rendu les employés moins fatigués et tout aussi productifs, tout en leur laissant plus de temps libre. Le second souligne ses limites : des journées plus longues et plus stressantes, et des difficultés d’application dans certains secteurs.

Je suis plutôt favorable à cette idée, mais je ne crois pas qu’elle puisse convenir à tout le monde. Dans les bureaux, beaucoup d’heures sont perdues en réunions inutiles ; travailler sur quatre jours oblige à mieux s’organiser, et un vrai week-end de trois jours permet de récupérer. Un ami ingénieur l’a essayée et ne voudrait plus revenir en arrière. En revanche, pour une infirmière ou un enseignant, la question est plus compliquée, car les patients et les élèves ont besoin d’une présence chaque jour. La solution pourrait être de laisser chaque secteur choisir, en consultant les salariés. Plutôt qu’une règle unique, il faudrait offrir plus de souplesse.`,
    },
  ]),
];
