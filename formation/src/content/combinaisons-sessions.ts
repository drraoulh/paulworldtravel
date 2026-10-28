import type { Combinaison, CombiTask } from '@/lib/combinaisons';

/*
 * Combinations of recent sessions, written by the team from the themes that
 * candidates reported after their exam (August to October 2026). Wording,
 * documents and model answers are our own; only the themes come from reports.
 */

const T3 = (title: string) =>
  `${title} Vous écrivez un texte pour le site d’un journal. Dans une première partie (40 à 60 mots), présentez les deux points de vue des documents. Dans une seconde partie (80 à 120 mots), donnez votre opinion en l’argumentant.`;

function c(year: number, month: number, n: number, theme: string, tasks: [CombiTask, CombiTask, CombiTask]): Combinaison {
  const id = `${year}-${String(month).padStart(2, '0')}-${n}`;
  return { id, theme, created_at: `${year}-${String(month).padStart(2, '0')}-01T00:00:00Z`, content: { kind: 'combinaison', year, month, source: 'candidats', tasks } };
}

export const sessionCombinaisons: Combinaison[] = [
  /* ───────────── Octobre 2026 ───────────── */
  c(2026, 10, 1, 'Cuisinier amateur ou professionnel ?', [
    {
      prompt: 'Vous vous mariez dans un domaine à la campagne. Votre ami Hugo, invité, ne connaît pas l’endroit. Écrivez-lui un message pour lui présenter le domaine (situation, cadre, accès, hébergement).',
      corrige: `Salut Hugo,

Je suis très content que tu viennes à mon mariage ! Il aura lieu au Domaine des Érables, une grande maison en pierre entourée d’un parc et d’un lac, à quarante minutes de la ville.

Pour y aller, prends l’autoroute 50 vers l’ouest, puis la sortie 12 : le domaine est indiqué. Il y a un parking gratuit devant l’entrée. Si tu n’as pas de voiture, une navette partira de la gare centrale à 14 h.

Le domaine propose aussi des chambres pour les invités ; je t’en ai réservé une pour la nuit, comme ça tu pourras faire la fête sans souci.

À très vite,
Samuel`,
    },
    {
      prompt: 'Sur un forum consacré aux langues, vous racontez comment vous avez appris une langue étrangère : comment vous avez commencé, les difficultés rencontrées et ce que cette expérience vous a apporté.',
      corrige: `J’ai commencé l’anglais sérieusement il y a trois ans, quand j’ai obtenu un poste dans une entreprise qui travaille avec le Nigeria. Au début, je comprenais les textes, mais j’étais incapable de suivre une réunion : tout le monde parlait trop vite et je n’osais pas intervenir.

J’ai donc changé de méthode. Chaque matin, j’écoutais un podcast pendant le trajet, et deux soirs par semaine, je participais à un club de conversation. Le plus difficile a été d’accepter de faire des erreurs devant les autres.

Après un an, j’ai présenté mon premier projet en anglais, et ce jour-là j’ai été très fier. Aujourd’hui, cette langue m’a ouvert des portes professionnelles, mais elle m’a surtout donné confiance en moi. Mon conseil : parlez dès le premier jour, même mal.`,
    },
    {
      prompt: T3('Cuisinier amateur ou cuisinier professionnel ?'),
      documents: [
        'Document 1 : Un vrai chef ne s’improvise pas. Les écoles de cuisine apprennent l’hygiène, la gestion d’une équipe, la régularité des plats servis à cent clients chaque soir. Un amateur peut réussir une recette chez lui, mais un restaurant demande des années de formation et d’expérience.',
        'Document 2 : Grâce aux vidéos en ligne, des milliers de passionnés apprennent seuls et certains ouvrent aujourd’hui leur propre restaurant. Leur créativité et leur proximité avec le public séduisent les clients. Le diplôme ne fait pas le talent : la passion et le travail suffisent souvent.',
      ],
      corrige: `Faut-il un diplôme pour devenir cuisinier ? Pour le premier document, la formation est indispensable : elle apprend l’hygiène, la gestion et la régularité qu’exige un restaurant. Le second affirme au contraire que de nombreux autodidactes, formés grâce à Internet, réussissent par leur passion et leur créativité.

À mon avis, les deux parcours peuvent mener au succès, mais pas au même métier. Cuisiner pour sa famille ou partager des recettes en ligne ne demande que de la curiosité. En revanche, diriger une cuisine professionnelle est un autre travail : il faut respecter des normes sanitaires strictes, servir des dizaines de plats identiques et encadrer une équipe. Ces compétences s’apprennent rarement seul. Je pense donc qu’un amateur talentueux a intérêt à suivre au moins une courte formation avant d’ouvrir un restaurant. La passion donne l’envie de commencer, la formation permet de durer.`,
    },
  ]),
  c(2026, 10, 2, 'Vivre chez ses parents', [
    {
      prompt: 'Vous partez en vacances et vous prêtez votre appartement à un ami. Écrivez-lui un message pour lui décrire le logement et lui expliquer comment y entrer et s’y repérer (immeuble, pièces, commerces proches).',
      corrige: `Salut Kevin,

Comme convenu, tu peux t’installer chez moi du 3 au 17 novembre. L’immeuble se trouve au 24, rue Lafleur ; l’appartement est au 4e étage, porte de droite, et l’ascenseur fonctionne bien.

Les clés seront chez ma voisine du 1er, Mme Ngo, qui te les donnera à partir de 18 h. Il y a une chambre, un salon avec canapé-lit, une petite cuisine équipée et une salle de bain. Le code du wifi est collé sur le frigo.

Tu trouveras une épicerie au coin de la rue et l’arrêt de bus juste en face. Juste une chose : arrose les plantes du balcon deux fois par semaine.

Bon séjour !
Yannick`,
    },
    {
      prompt: 'Sur un forum, des internautes partagent leur expérience de la colocation. Racontez la vôtre (avec qui, où, comment se passait la vie commune) et dites si vous la recommandez.',
      corrige: `Pendant mes deux années de master à Yaoundé, j’ai partagé un appartement avec deux étudiants que je ne connaissais pas. Au début, c’était surtout une question d’argent : seul, je n’aurais jamais pu payer un loyer dans ce quartier.

Très vite, nous avons organisé la vie commune. Nous faisions les courses ensemble le samedi et un tableau sur le frigo indiquait qui devait nettoyer la cuisine. Bien sûr, il y a eu des tensions, par exemple quand l’un de nous invitait des amis tard le soir pendant les examens. Nous en parlions franchement et nous trouvions toujours une solution.

Aujourd’hui, je recommande vraiment cette expérience. Elle m’a appris à faire des compromis et à m’organiser, et mes deux colocataires sont devenus des amis proches. Il faut simplement fixer des règles claires dès le départ.`,
    },
    {
      prompt: T3('Vivre chez ses parents après 20 ans : pour ou contre ?'),
      documents: [
        'Document 1 : Rester chez ses parents permet d’économiser pendant ses études ou ses premières années de travail. Les loyers sont chers et ce choix évite de s’endetter. On profite aussi du soutien de sa famille au moment où l’on construit son avenir.',
        'Document 2 : Partir de chez ses parents, c’est apprendre à gérer un budget, à cuisiner, à prendre ses propres décisions. Les jeunes qui restent trop longtemps à la maison retardent leur autonomie et vivent souvent sous les règles de leurs parents.',
      ],
      corrige: `Faut-il quitter ses parents dès l’âge adulte ? Selon le premier document, rester chez eux permet d’économiser et de profiter d’un soutien familial pendant les études. Le second estime au contraire que partir est nécessaire pour devenir autonome et prendre ses propres décisions.

Pour ma part, je pense qu’il n’y a pas d’âge idéal et que tout dépend du projet. Un étudiant qui vit chez ses parents pour mettre de l’argent de côté fait un choix responsable, surtout quand les loyers représentent la moitié d’un petit salaire. Ce qui compte, c’est de participer à la vie de la maison : payer une partie des courses, faire sa part des tâches ménagères. En revanche, rester sans objectif précis peut empêcher de grandir. L’autonomie ne dépend donc pas seulement de l’adresse : on peut être indépendant chez ses parents et dépendant dans son propre appartement.`,
    },
  ]),
  c(2026, 10, 3, 'Les jeux vidéo', [
    {
      prompt: 'Vous avez participé à une compétition sportive avec votre club. Écrivez un message à vos amis pour leur raconter cette journée (type de compétition, résultat, ambiance, ce que vous avez ressenti).',
      corrige: `Salut tout le monde,

Je dois vous raconter mon week-end ! Samedi, j’ai participé au tournoi régional de basket avec mon club. Huit équipes étaient inscrites et nous avons joué quatre matchs dans la journée.

Nous avons gagné les trois premiers, puis nous avons perdu la finale de seulement deux points. J’étais déçu sur le moment, mais la deuxième place reste un très bon résultat pour une équipe aussi jeune que la nôtre.

L’ambiance était incroyable : nos familles criaient dans les tribunes et l’entraîneur nous a félicités après chaque match. Je suis rentré épuisé mais très heureux.

Le prochain tournoi a lieu en décembre, venez nous encourager !
Arnaud`,
    },
    {
      prompt: 'Vous avez assisté à un festival de cinéma. Sur votre blog, vous racontez votre visite et vous présentez le film que vous avez préféré en expliquant votre choix.',
      corrige: `Le week-end dernier, je suis allée au festival du film africain de ma ville. En deux jours, j’ai vu cinq films dans trois salles différentes, et j’ai même assisté à un débat avec une réalisatrice.

Mon film préféré est un long métrage sénégalais qui raconte l’histoire d’une jeune femme qui revient dans son village après dix ans passés en Europe. Elle doit choisir entre sa nouvelle vie et sa famille. Ce qui m’a touchée, c’est la simplicité : peu de dialogues, mais des images magnifiques et des acteurs très naturels.

À la fin de la séance, personne ne s’est levé tout de suite ; la salle était silencieuse. Je recommande ce film à tous ceux qui ont déjà quitté leur pays : on s’y reconnaît forcément. J’ai hâte de retourner au festival l’an prochain.`,
    },
    {
      prompt: T3('Les jeux vidéo : bons ou mauvais pour les jeunes ?'),
      documents: [
        'Document 1 : Des chercheurs observent que certains jeux développent la mémoire, la rapidité de réaction et la capacité à résoudre des problèmes. Les jeux en équipe apprennent aussi à coopérer. Pratiqués avec mesure, ils sont un loisir comme un autre.',
        'Document 2 : De nombreux parents s’inquiètent : leurs enfants passent des heures devant l’écran, dorment moins et sortent moins. Certains jeux violents banalisent l’agressivité et les achats intégrés poussent les adolescents à dépenser sans s’en rendre compte.',
      ],
      corrige: `Les jeux vidéo sont-ils dangereux pour les jeunes ? Le premier document souligne leurs bienfaits : ils stimulent la mémoire, la réflexion et la coopération. Le second met en avant les risques : temps d’écran excessif, manque de sommeil, violence de certains jeux et dépenses incontrôlées.

À mon sens, le problème n’est pas le jeu lui-même, mais la manière de jouer. Un adolescent qui joue une heure par jour à un jeu de stratégie avec ses amis développe de vraies compétences. En revanche, s’il joue jusqu’à minuit tous les soirs, ses études et sa santé en souffriront. C’est pourquoi le rôle des parents est essentiel : ils doivent fixer des horaires, vérifier l’âge conseillé et bloquer les achats en ligne. Plutôt que d’interdire les jeux vidéo, il vaut mieux apprendre aux jeunes à les utiliser avec modération.`,
    },
  ]),
  c(2026, 10, 4, 'Les maisons de retraite', [
    {
      prompt: 'Vous organisez une sortie culturelle (musée, exposition ou théâtre) avec vos amis. Écrivez-leur un message pour la proposer et donner tous les détails pratiques (lieu, date, horaire, prix).',
      corrige: `Bonjour à tous,

Je vous propose une sortie au théâtre le samedi 24 octobre : la troupe du centre culturel joue une comédie qui a reçu d’excellentes critiques.

Le spectacle commence à 19 h 30 et dure environ deux heures. Les places coûtent 15 dollars, mais nous pouvons avoir un tarif de groupe à 11 dollars si nous sommes au moins six.

Je vous propose de nous retrouver à 19 h devant l’entrée principale, rue Saint-Joseph. Après la pièce, nous pourrions aller manger une pizza dans le restaurant juste à côté.

Répondez-moi avant mercredi pour que je réserve les billets.

Bises,
Clarisse`,
    },
    {
      prompt: 'Un site consacré à la famille recueille des témoignages : « Vivre avec une personne âgée, comment ça se passe ? ». Racontez votre expérience et dites ce qu’elle vous a apporté.',
      corrige: `Il y a trois ans, ma grand-mère est venue vivre chez nous après une chute. À 82 ans, elle ne pouvait plus rester seule dans son village, et mes parents ont décidé de l’accueillir plutôt que de chercher une maison de retraite.

Les premiers mois n’ont pas été simples. Il a fallu réorganiser la maison : j’ai laissé ma chambre, au rez-de-chaussée, et nous avons appris à adapter nos horaires à ses rendez-vous médicaux. Parfois, elle se sentait inutile, et cela la rendait triste.

Petit à petit, nous avons trouvé un équilibre. Elle m’a appris à cuisiner les plats de son enfance et elle me racontait chaque soir des histoires de notre famille que je ne connaissais pas. Cette expérience m’a rendu plus patient. Je conseille cette solution, à condition que toute la famille partage les efforts.`,
    },
    {
      prompt: T3('Les maisons de retraite : une bonne solution ?'),
      documents: [
        'Document 1 : Dans ma culture, on ne place pas ses parents en maison de retraite. Les personnes âgées vivent avec leurs enfants et leurs petits-enfants ; elles transmettent leur expérience et restent entourées jusqu’au bout.',
        'Document 2 : Les maisons de retraite offrent des soins médicaux permanents, des repas adaptés et des activités. Beaucoup de personnes âgées y retrouvent une vie sociale qu’elles avaient perdue en restant seules chez elles, pendant que leurs enfants travaillent toute la journée.',
      ],
      corrige: `Comment accompagner nos aînés ? Pour l’auteur du premier document, la place des personnes âgées est dans la famille, où elles transmettent leur expérience et restent entourées. Le second document présente la maison de retraite comme une solution sûre, qui garantit des soins et rompt l’isolement.

Je crois que la meilleure solution dépend de l’état de santé de la personne. Tant qu’un parent âgé reste autonome, vivre avec sa famille est une richesse pour tout le monde, en particulier pour les petits-enfants. Mais lorsqu’il a besoin de soins jour et nuit, la famille n’a souvent ni le temps ni les compétences pour s’en occuper correctement. Dans ce cas, une bonne maison de retraite n’est pas un abandon, à condition que les enfants viennent souvent. Ce qui compte vraiment, ce n’est pas le lieu, mais la présence et l’affection qu’on continue d’apporter.`,
    },
  ]),
  c(2026, 10, 5, 'Les transports en commun gratuits', [
    {
      prompt: 'Vous avez vu cette annonce : « Je cherche un vélo en bon état et pas trop cher. Écrivez-moi : marc.dion@courriel.ca ». Vous avez un vélo à vendre. Écrivez un courriel pour le décrire, proposer un prix et un rendez-vous pour l’essayer.',
      corrige: `Objet : Votre annonce pour un vélo

Bonjour,

J’ai lu votre annonce et je pense que mon vélo pourrait vous intéresser. C’est un vélo de ville bleu, acheté il y a deux ans, avec sept vitesses, un porte-bagages et des lumières avant et arrière.

Il est en très bon état : je l’ai fait réviser le mois dernier et les pneus sont neufs. Je le vends parce que je déménage dans une ville où je n’en aurai plus besoin.

Je vous le propose à 180 dollars. Vous pouvez venir l’essayer samedi matin entre 9 h et 12 h, au 15, avenue des Pins.

Cordialement,
Paul Essomba`,
    },
    {
      prompt: 'Pendant les vacances d’été, vous avez occupé un emploi temporaire. Écrivez un message à vos amis pour raconter cette expérience (le travail, les collègues, ce que vous avez appris) et dire si vous la referiez.',
      corrige: `Salut les amis,

Je viens de terminer mon emploi d’été et je voulais vous raconter comment ça s’est passé. Pendant deux mois, j’ai travaillé comme animateur dans un camp de jour pour des enfants de 6 à 10 ans.

Les premiers jours ont été épuisants : il fallait préparer les activités, surveiller les plus petits et gérer les disputes. Heureusement, mes collègues étaient très sympathiques et l’équipe m’a vite aidé à trouver ma place.

J’ai appris à parler devant un groupe, à rester calme et à être organisé, ce qui me servira dans mes études d’enseignant. Le dernier jour, les enfants m’ont offert une carte avec leurs dessins, et j’étais très ému.

Oui, je le referais sans hésiter l’été prochain !

À bientôt,
Thomas`,
    },
    {
      prompt: T3('La gratuité des transports en commun : pour ou contre ?'),
      documents: [
        'Document 1 : Rendre les bus et le métro gratuits, c’est moins de voitures en ville, moins de bouchons et moins de pollution. C’est aussi une mesure juste pour les familles modestes, pour qui le transport représente une grosse dépense chaque mois.',
        'Document 2 : Rien n’est vraiment gratuit : ce sont les impôts de tous qui paieraient. La ville aurait moins d’argent pour moderniser le réseau, et les bus, déjà pleins aux heures de pointe, deviendraient encore plus inconfortables.',
      ],
      corrige: `Les transports en commun doivent-ils être gratuits ? Pour le premier document, cette mesure réduirait la circulation et la pollution tout en aidant les familles modestes. Le second rappelle que la gratuité serait payée par les impôts et risquerait de priver le réseau des moyens de s’améliorer.

Personnellement, je suis favorable à une gratuité partielle. Supprimer complètement le prix du billet coûterait très cher, et un réseau saturé ne donnerait pas envie aux automobilistes de laisser leur voiture. En revanche, la gratuité pour les étudiants, les personnes âgées et les chômeurs serait une mesure juste et réaliste. Elle aiderait ceux qui en ont le plus besoin sans affaiblir le budget des transports. Par ailleurs, l’argent économisé ailleurs pourrait financer davantage de bus et de lignes. Selon moi, un service fréquent et fiable attire plus de voyageurs qu’un service gratuit mais saturé.`,
    },
  ]),
  c(2026, 10, 6, 'Les villes qui grandissent', [
    {
      prompt: 'Le journal de votre quartier présente les nouveaux habitants. Vous venez de vous installer : écrivez un message pour vous présenter et décrire les endroits du quartier que vous préférez déjà.',
      corrige: `Bonjour à tous,

Je m’appelle Mireille, j’ai 29 ans et je suis arrivée de Douala en juillet avec mon mari et notre fils. Je suis infirmière à l’hôpital du quartier.

En trois mois, j’ai déjà mes endroits préférés. Le matin, j’aime marcher dans le parc Lafontaine, surtout depuis que les arbres ont changé de couleur. Le samedi, je fais mes courses au marché de la rue Beaubien, où les commerçants sont très accueillants. Enfin, la bibliothèque municipale est devenue le lieu préféré de mon fils, qui adore les heures du conte.

Merci à tous pour votre accueil chaleureux. Si vous me croisez, n’hésitez pas à me dire bonjour !

Mireille`,
    },
    {
      prompt: 'Vous avez étudié six mois dans une université à l’étranger. Écrivez un message à vos amis pour raconter cette expérience et expliquer ce que vous avez le plus apprécié.',
      corrige: `Salut à tous,

Me voilà de retour après six mois d’échange à l’Université Laval, au Québec ! Je voulais vous raconter cette aventure.

À mon arrivée en janvier, il faisait moins vingt degrés et je n’avais jamais vu autant de neige. Les premières semaines, j’étais un peu perdu : les cours étaient très différents, avec beaucoup de travaux en équipe et moins de cours magistraux.

Ce que j’ai préféré, c’est justement ce travail en groupe. J’ai collaboré avec des étudiants de dix pays, et j’ai appris à présenter mes idées avec plus d’assurance. Le week-end, nous partions découvrir la région ensemble.

Cette expérience m’a beaucoup fait grandir. Si vous avez l’occasion de partir, foncez ! Je vous raconte le reste autour d’un repas samedi.

Brice`,
    },
    {
      prompt: T3('Des villes de plus en plus grandes : une chance ou un danger pour l’environnement ?'),
      documents: [
        'Document 1 : Les grandes villes attirent les entreprises, créent des emplois et offrent plus de services : hôpitaux, universités, transports. Bien organisée, une ville dense consomme même moins d’énergie par habitant qu’un territoire dispersé.',
        'Document 2 : Quand une ville grandit trop vite, les forêts et les terres agricoles disparaissent sous le béton. La circulation explose, l’air devient irrespirable et les déchets ne sont plus correctement traités.',
      ],
      corrige: `La croissance des villes est-elle un progrès ? Le premier document met en avant ses avantages : emplois, services et, si elle est bien organisée, une consommation d’énergie réduite. Le second dénonce ses effets sur la nature : disparition des espaces verts, pollution et gestion difficile des déchets.

Selon moi, le problème n’est pas la taille de la ville, mais la vitesse et l’absence de planification. Dans beaucoup de pays, des quartiers entiers se construisent sans routes, sans transports et sans ramassage des ordures. Le résultat est une ville polluée et invivable. À l’inverse, une ville qui investit dans les transports en commun, protège ses parcs et construit en hauteur peut accueillir plus d’habitants sans détruire son environnement. Les autorités doivent donc prévoir l’avenir plutôt que réagir après coup. Une ville qui grandit peut rester agréable, à condition d’être pensée pour ses habitants.`,
    },
  ]),

  /* ───────────── Septembre 2026 ───────────── */
  c(2026, 9, 1, 'Les écrans à l’école', [
    {
      prompt: 'Vous louez votre appartement et une personne intéressée vous a écrit. Répondez-lui par courriel en présentant le logement (pièces, loyer, quartier, date de disponibilité).',
      corrige: `Objet : Appartement à louer, rue Laurier

Bonjour Madame Tremblay,

Merci pour votre message. L’appartement est un 4 ½ au deuxième étage d’un petit immeuble calme : il comprend deux chambres, un salon lumineux, une cuisine fermée et une salle de bain refaite l’an dernier.

Le loyer est de 1 350 dollars par mois, chauffage et eau chaude compris. Un espace de rangement au sous-sol est inclus.

Le quartier est très pratique : une école primaire, une épicerie et un arrêt d’autobus se trouvent à moins de cinq minutes à pied.

Le logement sera libre le 1er novembre. Je peux vous le faire visiter jeudi ou vendredi en fin de journée.

Cordialement,
Ernest Mbarga`,
    },
    {
      prompt: 'Vous venez de commencer vos études dans une université canadienne. Écrivez un message à un ami pour raconter votre première semaine et donner votre avis sur l’université et les cours.',
      corrige: `Salut Jordan,

Ma première semaine à l’université est terminée et j’ai beaucoup de choses à te raconter ! Lundi, il y avait une journée d’accueil : on nous a fait visiter le campus, qui est immense, avec sa propre bibliothèque sur cinq étages et même une piscine.

Les cours ont commencé mardi. Ce qui m’a surpris, c’est que les professeurs demandent beaucoup de participation : on doit poser des questions et donner son avis en classe. Le rythme est rapide, j’ai déjà trois lectures à préparer pour lundi.

Pour l’instant, je suis vraiment satisfait. Les professeurs sont disponibles et les étudiants de ma classe sont très ouverts. Mon seul regret, c’est le prix de la cafétéria !

Je t’appelle ce week-end pour te raconter le reste.

Christian`,
    },
    {
      prompt: T3('Tablettes et ordinateurs en classe : pour ou contre ?'),
      documents: [
        'Document 1 — Joël, enseignant : Mes élèves vivront dans un monde numérique ; l’école doit les y préparer. Avec une tablette, ils font des recherches, regardent des vidéos explicatives et avancent à leur rythme. Ils sont aussi plus motivés.',
        'Document 2 — Sarah, mère d’élève : Mon fils passe déjà trop de temps sur les écrans à la maison. En classe, il a besoin d’écrire à la main, d’échanger avec ses camarades et d’écouter son professeur, pas de se cacher derrière un appareil.',
      ],
      corrige: `Les écrans ont-ils leur place à l’école ? Pour Joël, enseignant, les tablettes préparent les élèves au monde numérique, les motivent et leur permettent d’apprendre à leur rythme. Sarah, mère d’élève, pense au contraire que les enfants passent déjà trop de temps devant les écrans et ont besoin d’écrire et d’échanger.

À mon avis, il faut trouver un juste milieu. Il serait absurde de priver les élèves d’outils qu’ils utiliseront toute leur vie : savoir chercher une information fiable ou rédiger un document sur ordinateur est indispensable aujourd’hui. Cependant, l’écran ne doit pas remplacer le professeur ni l’écriture manuelle, qui aide à mémoriser. Je propose donc d’utiliser les tablettes pour des activités précises, quelques heures par semaine, et de garder le reste du temps pour les échanges en classe. Ce n’est pas l’outil qui fait l’éducation, mais la façon dont on l’utilise.`,
    },
  ]),
  c(2026, 9, 2, 'La restauration rapide', [
    {
      prompt: 'Un festival de musique a lieu dans votre ville. Écrivez un message à un ami pour l’inviter à y aller avec vous en précisant le lieu, les dates, les artistes et les informations pratiques.',
      corrige: `Salut Ariane,

Tu es libre le week-end du 19 septembre ? Le festival Couleurs du monde revient au parc de la Rivière, et cette année la programmation est géniale : il y aura Charlotte Dipanda le samedi soir et un groupe de jazz congolais le dimanche.

Les concerts commencent à 15 h et se terminent vers 23 h. Le billet coûte 35 dollars par jour ou 60 dollars pour les deux jours. Sur place, il y a des stands de cuisine du monde.

Je propose qu’on y aille en bus, car il n’y a presque pas de stationnement. Je peux passer te chercher à 14 h.

Dis-moi vite, les billets partent rapidement !

Bises,
Nadine`,
    },
    {
      prompt: 'Sur votre blog, vous racontez votre dernière sortie au restaurant : l’endroit, les plats, le service. Dites ce qui vous a le plus plu et si vous le recommandez.',
      corrige: `Samedi dernier, pour l’anniversaire de ma sœur, nous avons découvert Chez Mama Ngono, un petit restaurant camerounais qui vient d’ouvrir dans le centre-ville. De l’extérieur, il ne paie pas de mine, mais la salle est chaleureuse, avec des tissus colorés aux murs et de la musique douce.

En entrée, nous avons partagé des beignets haricots ; ensuite, j’ai choisi un ndolé aux crevettes accompagné de plantain mûr. C’était délicieux, exactement comme chez ma grand-mère. Ma sœur a préféré le poulet DG, très généreux.

Ce qui m’a le plus plu, c’est l’accueil : la patronne est venue à notre table pour nous expliquer chaque plat et nous a offert le dessert pour l’anniversaire. Le seul point faible, c’est l’attente un peu longue. Je recommande ce restaurant à tous ceux qui ont la nostalgie du pays.`,
    },
    {
      prompt: T3('La restauration rapide : un danger pour la santé ?'),
      documents: [
        'Document 1 : La restauration rapide a changé. Aujourd’hui, on trouve des salades, des sandwichs complets et des jus frais à prix raisonnable. Pour les travailleurs pressés, c’est une solution pratique et contrôlée sur le plan de l’hygiène.',
        'Document 2 : Selon les médecins, manger régulièrement dans les chaînes de fast-food augmente les risques d’obésité et de maladies du cœur. Ces repas sont trop gras, trop salés et trop sucrés, et les portions sont de plus en plus grandes.',
      ],
      corrige: `La restauration rapide est-elle mauvaise pour la santé ? Le premier document affirme qu’elle a évolué et propose désormais des repas équilibrés, pratiques et sûrs. Le second, s’appuyant sur l’avis des médecins, rappelle que ces repas trop gras et trop salés favorisent l’obésité et les maladies cardiaques.

Je pense que les deux documents ont raison en partie. Manger un sandwich rapide entre deux rendez-vous n’a rien de dangereux, surtout si l’on choisit une salade ou un plat complet. Le vrai risque, c’est l’habitude : un adolescent qui mange des frites et des boissons sucrées plusieurs fois par semaine prend de mauvaises habitudes alimentaires. Il est aussi difficile de résister aux menus géants et aux promotions. Selon moi, il faut surtout informer les consommateurs, par exemple en affichant clairement les calories. La restauration rapide peut rester un plaisir occasionnel, mais elle ne doit pas remplacer les repas faits maison.`,
    },
  ]),
  c(2026, 9, 3, 'Voyager seul ou accompagné', [
    {
      prompt: 'Vous partez en vacances avec des amis et vous avez trouvé un hôtel. Écrivez-leur un message pour le décrire (situation, prix, services) et leur proposer de réserver.',
      corrige: `Salut la bande,

J’ai trouvé l’hôtel idéal pour nos vacances à Kribi ! Il s’appelle Le Palmier et il se trouve directement sur la plage, à dix minutes à pied du centre.

Une chambre pour deux personnes coûte 35 000 francs CFA la nuit, petit-déjeuner compris. L’hôtel a une piscine, un restaurant de poissons grillés et le wifi gratuit. Ils proposent aussi une excursion aux chutes de la Lobé.

Les avis des clients sont très bons, surtout pour la propreté et l’accueil. Comme c’est la haute saison, je pense qu’il faut réserver avant vendredi. Si vous êtes d’accord, je m’en occupe ce soir pour les trois chambres.

Répondez-moi vite !
Larissa`,
    },
    {
      prompt: 'Vous avez fait un voyage organisé par une agence et vous avez été déçu(e). Écrivez un courriel à l’agence pour raconter ce qui s’est passé et demander un dédommagement.',
      corrige: `Objet : Réclamation, séjour du 2 au 9 août

Madame, Monsieur,

Je vous écris au sujet du séjour à Marrakech que j’ai réservé dans votre agence pour un montant de 1 800 dollars.

Plusieurs problèmes ont gâché ce voyage. D’abord, personne ne nous attendait à l’aéroport, alors que le transfert était inclus : nous avons dû payer un taxi. Ensuite, l’hôtel n’était pas celui de la brochure, mais un établissement trois étoiles situé à quarante minutes du centre. Enfin, l’excursion dans le désert a été annulée sans explication.

Vos conseillers sur place n’ont proposé aucune solution, ce qui m’a beaucoup déçu.

Je vous demande donc le remboursement du taxi et de l’excursion, ainsi qu’un dédommagement pour la différence d’hôtel. Je joins les factures et les photos.

Dans l’attente de votre réponse, veuillez agréer mes salutations distinguées.

Rodrigue Fotso`,
    },
    {
      prompt: T3('Voyager seul ou en groupe ?'),
      documents: [
        'Document 1 : Partir seul, c’est la liberté totale : on choisit son itinéraire, on change de programme quand on veut et on rencontre plus facilement les habitants. Beaucoup de voyageurs disent avoir appris à mieux se connaître.',
        'Document 2 : Le voyage en solo a ses limites : la solitude le soir, les frais d’hôtel qu’on ne partage pas, et l’insécurité dans certains pays. Et puis, un beau paysage est plus beau quand on peut le partager avec quelqu’un.',
      ],
      corrige: `Vaut-il mieux voyager seul ou accompagné ? Le premier document présente le voyage en solo comme une liberté : on décide de tout, on fait plus de rencontres et on se découvre soi-même. Le second rappelle ses inconvénients : solitude, coût plus élevé et insécurité, sans compter le plaisir de partager.

Personnellement, j’ai essayé les deux et je pense que le choix dépend du but du voyage. Pour découvrir une culture et sortir de sa zone de confort, partir seul est une expérience unique : on parle davantage avec les habitants et on gagne en autonomie. En revanche, pour des vacances de détente, je préfère voyager avec des amis ou ma famille, car les souvenirs communs ont plus de valeur. Il faut aussi tenir compte de la destination : dans un pays mal connu, être en groupe rassure. L’idéal serait peut-être de commencer par un voyage accompagné avant de tenter l’aventure en solo.`,
    },
  ]),
  c(2026, 9, 4, 'Un animal de compagnie pour les enfants', [
    {
      prompt: 'Une amie a accepté de garder votre maison pendant vos vacances. Écrivez-lui un message pour lui expliquer ce qu’elle doit faire (animaux, plantes, courrier, sécurité).',
      corrige: `Coucou Estelle,

Merci encore d’avoir accepté de garder la maison du 12 au 26 septembre ! Voici les choses à savoir.

Le chat, Bijou, mange deux fois par jour, à 8 h et à 18 h ; ses croquettes sont dans le placard sous l’évier. Change son eau chaque matin, s’il te plaît. Les plantes du salon doivent être arrosées tous les trois jours, mais pas le cactus !

Le facteur passe vers midi : tu peux poser le courrier sur mon bureau. Le soir, vérifie que la porte de la cour est bien fermée à clé.

En cas de problème, mon voisin Bernard, au numéro 14, a un double des clés.

Merci mille fois !
Viviane`,
    },
    {
      prompt: 'Vous êtes parti(e) travailler à l’étranger. Écrivez un message à vos amis pour raconter vos débuts dans ce nouvel emploi et expliquer ce que vous appréciez le plus.',
      corrige: `Salut tout le monde,

Cela fait maintenant deux mois que je suis arrivé à Moncton pour mon nouveau poste de technicien informatique dans une compagnie d’assurances. Je vous donne enfin des nouvelles !

Les débuts n’ont pas été faciles. Il a fallu trouver un logement, ouvrir un compte bancaire et m’habituer à l’accent acadien, que je ne comprenais pas toujours. Au bureau, les méthodes sont aussi différentes : les réunions sont courtes et chacun est très autonome.

Ce que j’apprécie le plus, c’est l’ambiance de travail. Mes collègues m’ont tout de suite invité à leurs activités, et mon responsable prend le temps de m’expliquer chaque projet. On respecte aussi beaucoup la vie privée : à 17 h, tout le monde rentre chez soi.

Vous me manquez, mais je ne regrette pas mon choix. Venez me rendre visite !

Junior`,
    },
    {
      prompt: T3('Faut-il offrir un animal de compagnie à un enfant ?'),
      documents: [
        'Document 1 : Selon de nombreux psychologues, un animal aide l’enfant à se sentir moins seul, surtout s’il n’a ni frère ni sœur. En s’occupant de lui, il apprend la responsabilité et le respect des autres êtres vivants.',
        'Document 2 : Avant de céder à la demande d’un enfant, les parents doivent réfléchir : un chien vit quinze ans, coûte cher et demande des sorties quotidiennes. Souvent, l’enfant se lasse au bout de quelques mois et ce sont les parents qui s’en occupent.',
      ],
      corrige: `Un animal de compagnie est-il une bonne idée pour un enfant ? Le premier document rappelle qu’un animal rompt la solitude de l’enfant et lui apprend la responsabilité. Le second met en garde les parents : un animal vit longtemps, coûte cher, et l’enfant s’en désintéresse souvent rapidement.

Je suis plutôt favorable à cette idée, à condition que la décision soit prise par toute la famille. Grandir avec un animal est une vraie chance : l’enfant apprend à prendre soin d’un autre, à respecter des horaires et à être patient. Cependant, les parents doivent savoir qu’ils resteront les vrais responsables. Il vaut mieux commencer par un animal facile, comme un poisson ou un lapin, avant de prendre un chien. On peut aussi confier à l’enfant des tâches précises, adaptées à son âge. Un animal ne doit jamais être un cadeau du moment, mais un engagement réfléchi.`,
    },
  ]),
  c(2026, 9, 5, 'L’art dans la rue', [
    {
      prompt: 'La bibliothèque de votre ville organise une rencontre avec un écrivain. Écrivez un message à un ami pour l’inviter à cet événement et lui donner les détails.',
      corrige: `Salut Marius,

Tu te souviens du roman que je t’ai prêté cet été ? Son auteur, Hemley Boum, vient présenter son nouveau livre à la bibliothèque centrale le jeudi 24 septembre à 18 h 30 !

Elle parlera de son travail d’écriture pendant une heure, puis le public pourra lui poser des questions. Il y aura ensuite une séance de dédicaces, alors apporte ton exemplaire.

L’entrée est gratuite, mais il faut réserver sur le site de la bibliothèque, car la salle n’a que quatre-vingts places. Je peux nous inscrire tous les deux ce soir.

On pourrait se retrouver à 18 h au café en face pour y aller ensemble.

Réponds-moi vite !
Gaëlle`,
    },
    {
      prompt: 'Vous avez participé à « La semaine du goût », un événement autour de la cuisine et des produits locaux. Racontez cette expérience sur votre blog et dites ce que vous en avez pensé.',
      corrige: `La semaine dernière, ma ville organisait « La semaine du goût » et j’ai participé à plusieurs activités. L’objectif était de faire découvrir les produits de la région et de sensibiliser le public à une alimentation plus saine.

Le mardi, j’ai suivi un atelier de cuisine avec un chef qui nous a appris à préparer un repas complet uniquement avec des légumes de saison. Le jeudi, j’ai visité une ferme biologique où l’on fabrique du fromage. Enfin, samedi, un grand marché réunissait une trentaine de producteurs sur la place centrale, avec des dégustations gratuites.

J’ai adoré cet événement, parce qu’il m’a fait découvrir des aliments que je n’achetais jamais. Depuis, je fais mes courses au marché le samedi. Mon seul regret : les ateliers étaient complets très vite. J’espère qu’il y en aura davantage l’an prochain.`,
    },
    {
      prompt: T3('Les graffitis et l’art de rue : embellissement ou dégradation ?'),
      documents: [
        'Document 1 : Une grande fresque sur un mur gris, un musicien sur une place : l’art de rue rend la ville vivante et le rend accessible à tous, même à ceux qui ne vont jamais au musée. Certains quartiers attirent désormais des touristes grâce à leurs peintures murales.',
        'Document 2 : Tous les graffitis ne sont pas des œuvres d’art. Les tags sur les façades et les bus coûtent des millions en nettoyage chaque année. Pour beaucoup d’habitants, c’est une pollution visuelle qui donne une impression d’abandon.',
      ],
      corrige: `L’art de rue embellit-il nos villes ? Selon le premier document, les fresques et les spectacles de rue rendent la ville plus vivante, rendent l’art accessible à tous et attirent même les touristes. Le second rappelle que les tags abîment les bâtiments, coûtent cher en nettoyage et donnent une image d’abandon.

À mon avis, il faut distinguer l’art autorisé du vandalisme. Une fresque réalisée avec l’accord de la mairie peut transformer un quartier triste et donner de la fierté à ses habitants ; c’est le cas dans plusieurs villes que j’ai visitées. À l’inverse, un tag sur la façade d’une maison privée n’est qu’une dégradation. La meilleure solution serait donc de mettre à la disposition des artistes des murs réservés et d’organiser des festivals. Ainsi, les jeunes talents pourraient s’exprimer librement, sans abîmer les biens des autres. L’art de rue a sa place en ville, à condition d’être respectueux.`,
    },
  ]),
  c(2026, 9, 6, 'Les devoirs à la maison', [
    {
      prompt: 'Vous avez passé un week-end à la campagne. Écrivez un message à un ami pour lui raconter ce que vous avez fait et ce que vous avez aimé.',
      corrige: `Salut Fabrice,

Je rentre d’un week-end à la campagne chez mon oncle, près de Bafoussam, et j’avais envie de te le raconter. Nous sommes arrivés samedi matin et il faisait un temps magnifique.

Le matin, j’ai aidé mon oncle dans sa plantation de café : je n’imaginais pas que la récolte demandait autant de travail ! L’après-midi, nous nous sommes baignés dans la rivière avec mes cousins. Le soir, ma tante a préparé un délicieux taro sauce jaune et nous avons discuté autour du feu jusqu’à minuit.

Ce que j’ai le plus aimé, c’est le calme : pas de klaxons, pas d’écrans, seulement le bruit des oiseaux.

La prochaine fois, viens avec moi !
Serge`,
    },
    {
      prompt: 'Écrivez un article de blog sur le plus beau souvenir de voyage de votre vie : où, quand, avec qui, ce qui s’est passé et pourquoi il reste si important pour vous.',
      corrige: `Mon plus beau souvenir de voyage remonte à décembre 2022, quand je suis allée à Zanzibar avec ma meilleure amie pour fêter la fin de nos études.

Nous avions économisé pendant un an pour ce voyage. Pendant dix jours, nous avons découvert les ruelles de Stone Town, ses marchés aux épices et ses portes en bois sculpté. Mais le moment inoubliable a eu lieu le dernier soir : un pêcheur nous a emmenées en bateau voir le coucher du soleil, puis nous avons dîné sur la plage avec sa famille, qui nous a accueillies comme ses propres filles.

Ce souvenir est important pour moi parce qu’il symbolise une étape de ma vie : la fin des études et le début de l’âge adulte. Il m’a aussi appris que les plus beaux moments d’un voyage sont souvent les rencontres imprévues, et non les monuments célèbres.`,
    },
    {
      prompt: T3('Les devoirs à la maison : utiles ou inutiles ?'),
      documents: [
        'Document 1 : Les devoirs permettent aux élèves de revoir ce qu’ils ont appris et de prendre l’habitude de travailler seuls. Ils permettent aussi aux parents de suivre la scolarité de leurs enfants.',
        'Document 2 : Après sept heures de cours, les enfants sont fatigués. Les devoirs créent des tensions à la maison et accentuent les inégalités : tous les élèves n’ont pas des parents disponibles ou capables de les aider.',
      ],
      corrige: `Faut-il garder les devoirs à la maison ? D’après le premier document, ils aident les élèves à réviser, développent l’autonomie et permettent aux parents de suivre la scolarité. Le second souligne la fatigue des enfants, les conflits familiaux et les inégalités entre élèves aidés ou non.

Je pense que les devoirs sont utiles, mais qu’il faut changer leur forme. Relire une leçon ou apprendre quelques mots de vocabulaire prend peu de temps et aide vraiment à mémoriser. En revanche, donner de longs exercices à faire seul est injuste : l’enfant dont les parents travaillent tard ou ne parlent pas la langue de l’école est désavantagé. Une bonne solution consiste à organiser des périodes d’étude à l’école, avec un enseignant disponible pour répondre aux questions. Ainsi, tous les élèves travailleraient dans les mêmes conditions et les soirées en famille seraient plus sereines.`,
    },
  ]),

  /* ───────────── Août 2026 ───────────── */
  c(2026, 8, 1, 'La publicité et les enfants', [
    {
      prompt: 'Vous fêtez votre anniversaire. Écrivez un message à vos amis pour les inviter et leur expliquer comment va se dérouler la fête.',
      corrige: `Salut tout le monde,

Le 22 août, j’aurai 30 ans et je veux fêter ça avec vous ! Je vous invite chez moi, au 8, rue des Manguiers, à partir de 19 h.

Au programme : un apéritif dans le jardin, puis un grand buffet préparé par ma mère avec ses fameux beignets et du poisson braisé. Vers 22 h, un ami DJ mettra de la musique et nous danserons jusqu’au bout de la nuit.

Pas besoin d’apporter de cadeau, votre présence suffit ! Si vous voulez, vous pouvez prendre une boisson.

Merci de me confirmer votre présence avant le 15 août pour que je prévoie assez de nourriture.

À bientôt,
Cédric`,
    },
    {
      prompt: 'Une troupe de théâtre est venue jouer dans votre ville et vous avez assisté à son spectacle. Écrivez un article de blog pour raconter cette soirée et donner votre avis.',
      corrige: `Vendredi soir, je suis allé voir la troupe Les Voix du fleuve, qui fait une tournée dans plusieurs villes cet été. Le spectacle avait lieu en plein air, dans la cour du centre culturel, et plus de deux cents personnes étaient présentes.

La pièce racontait l’histoire d’une famille qui se dispute l’héritage d’un vieux commerçant. Les acteurs passaient sans cesse du rire à l’émotion, et ils faisaient participer le public : à un moment, l’un d’eux m’a même demandé de donner mon avis sur la dispute !

J’ai beaucoup aimé l’énergie des comédiens et les costumes très colorés. Le seul point négatif était le son : au fond de la cour, on entendait mal certains dialogues.

Malgré ce détail, je recommande vivement ce spectacle. La troupe sera encore là jusqu’au 30 août, ne la manquez pas.`,
    },
    {
      prompt: T3('Faut-il interdire la publicité destinée aux enfants ?'),
      documents: [
        'Document 1 : Une étude montre qu’un enfant voit plusieurs milliers de publicités par an, à la télévision et sur Internet. Ces messages créent des envies permanentes, poussent à consommer des produits trop sucrés et provoquent des conflits avec les parents.',
        'Document 2 : La publicité finance les dessins animés et les programmes pour la jeunesse. Elle informe aussi les familles sur les nouveaux produits. Plutôt que de l’interdire, il faudrait apprendre aux enfants à la comprendre et à s’en méfier.',
      ],
      corrige: `La publicité pour les enfants doit-elle disparaître ? Le premier document dénonce son influence : les enfants sont exposés à des milliers de messages qui les poussent à consommer et créent des conflits familiaux. Le second défend son utilité : elle finance les programmes jeunesse et informe les familles.

Pour ma part, je suis favorable à une interdiction partielle. Un enfant de six ans ne sait pas faire la différence entre un dessin animé et une publicité : il est donc facile à manipuler. C’est particulièrement grave pour les produits alimentaires trop sucrés, qui favorisent l’obésité. Il serait donc logique d’interdire la publicité pendant les émissions destinées aux plus jeunes. En revanche, pour les adolescents, l’éducation me semble plus efficace : à l’école, on pourrait leur apprendre à analyser les messages publicitaires. Protéger les plus petits et former les plus grands, voilà une solution équilibrée.`,
    },
  ]),
  c(2026, 8, 2, 'Les distributeurs dans les écoles', [
    {
      prompt: 'Vous voulez passer une journée avec un ami que vous n’avez pas vu depuis longtemps. Écrivez-lui un message pour l’inviter et lui décrire le programme (rendez-vous, activités, repas).',
      corrige: `Salut Hervé,

Ça fait des mois qu’on ne s’est pas vus ! Je te propose de passer la journée ensemble samedi prochain, le 15 août.

On pourrait se retrouver à 10 h devant la gare. D’abord, je t’emmène au nouveau marché artisanal, où on trouve de magnifiques objets en bois. Ensuite, on déjeunera au bord du lac, dans le petit restaurant de poissons dont je t’ai parlé.

L’après-midi, si tu es d’accord, on louera des vélos pour faire le tour du lac ; il y a une piste de huit kilomètres très agréable. Pour finir, on pourrait voir un film au cinéma du centre.

Dis-moi si ça te convient !
Ludovic`,
    },
    {
      prompt: 'La direction d’une école de musique cherche une salle pour organiser une fête de 100 personnes. Vous avez trouvé un lieu : écrivez un courriel pour le présenter (adresse, capacité, tarifs, services).',
      corrige: `Objet : Proposition de salle pour la fête de l’école

Madame la Directrice,

Suite à votre demande, j’ai visité plusieurs salles et je pense avoir trouvé le lieu idéal pour notre fête de fin d’année : la salle des Fêtes du Parc, au 45, boulevard du Lac.

Elle peut accueillir jusqu’à 150 personnes et comprend une scène équipée d’un système de son, ce qui permettrait à nos élèves de jouer pendant la soirée. Une cuisine professionnelle et un grand parking sont également disponibles.

La location coûte 900 dollars pour la soirée, ménage compris. Le gérant propose aussi un service de traiteur à 25 dollars par personne, mais nous pouvons choisir notre propre traiteur.

La salle est libre le samedi 19 décembre. Je peux organiser une visite avec vous la semaine prochaine si vous le souhaitez.

Cordialement,
Jacqueline Ewane`,
    },
    {
      prompt: T3('Des distributeurs de boissons et de snacks dans les lycées : pour ou contre ?'),
      documents: [
        'Document 1 — Élise, élève : Les distributeurs sont pratiques. Entre deux cours ou après le sport, on a besoin de boire ou de manger quelque chose, et la cafétéria est souvent fermée. Ce n’est pas à l’école de décider à notre place.',
        'Document 2 — Dr Kamga, médecin scolaire : Les distributeurs proposent surtout des sodas et des barres chocolatées. Les adolescents grignotent toute la journée et mangent moins bien à table. L’école doit protéger la santé des élèves.',
      ],
      corrige: `Les lycées doivent-ils installer des distributeurs ? Pour Élise, élève, ils sont pratiques quand la cafétéria est fermée, et les jeunes doivent pouvoir choisir. Le Dr Kamga, médecin scolaire, s’y oppose : ces machines vendent surtout des produits sucrés qui encouragent le grignotage et nuisent à la santé.

Je pense que les distributeurs peuvent rester, mais pas avec n’importe quel contenu. Les élèves passent parfois dix heures au lycée ; il est normal qu’ils puissent acheter de l’eau ou une collation. Le problème vient des produits proposés. Pourquoi ne pas remplacer les sodas par de l’eau, des jus sans sucre ajouté, des fruits secs ou des compotes ? Plusieurs pays l’ont déjà fait avec succès. De plus, l’école pourrait profiter de ce débat pour sensibiliser les jeunes à l’alimentation. Ainsi, on conserverait le côté pratique sans négliger la santé des élèves.`,
    },
  ]),
  c(2026, 8, 3, 'Des centres-villes sans voitures', [
    {
      prompt: 'Une amie étrangère veut visiter votre pays. Écrivez-lui un message pour lui proposer un itinéraire (villes, sites, monuments) en expliquant l’intérêt de chaque étape.',
      corrige: `Chère Julie,

Je suis ravie que tu viennes au Cameroun ! Voici l’itinéraire que je te propose pour tes deux semaines.

Commence par Douala, la capitale économique, pour son ambiance animée et le marché des artisans. Ensuite, prends la route de Kribi : ses plages de sable fin et les chutes de la Lobé, qui tombent directement dans la mer, sont uniques au monde.

Remonte ensuite vers Yaoundé pour visiter le Musée national et le mont Fébé, d’où la vue sur la ville est magnifique. Enfin, termine par l’Ouest : à Foumban, le palais du sultan te fera découvrir l’histoire du royaume bamoun.

Je pourrai t’accompagner pendant la première semaine.

Bisous,
Rosine`,
    },
    {
      prompt: 'Vous avez participé à la fête des voisins de votre quartier. Racontez cette soirée sur votre blog et expliquez pourquoi vous l’avez appréciée.',
      corrige: `Samedi dernier, notre rue organisait sa première fête des voisins. L’idée venait de Mme Atangana, la doyenne du quartier, qui avait glissé une invitation dans toutes les boîtes aux lettres.

Vers 17 h, nous avons installé des tables au milieu de la rue, fermée à la circulation pour l’occasion. Chacun avait apporté un plat : des brochettes, des salades, des gâteaux… Les enfants jouaient au football pendant que les parents faisaient connaissance. Le soir, un voisin guitariste a joué quelques chansons et tout le monde a fini par danser.

J’ai adoré cette soirée, parce que j’habite ici depuis quatre ans et je ne connaissais presque personne. Maintenant, je sais à qui demander de l’aide en cas de besoin, et nous avons même créé un groupe de discussion pour la rue. Je pense que ce genre d’événement devrait exister dans tous les quartiers.`,
    },
    {
      prompt: T3('Faut-il interdire les voitures dans le centre des villes ?'),
      documents: [
        'Document 1 : Plusieurs grandes villes ont fermé leur centre aux voitures. Résultat : moins de bruit et de pollution, des rues rendues aux piétons et aux cyclistes, et des commerces qui attirent plus de promeneurs.',
        'Document 2 : Interdire la voiture sans proposer d’autres solutions pénalise ceux qui habitent loin, les personnes âgées et les livreurs. Dans beaucoup de villes, les transports en commun ne sont pas assez nombreux pour remplacer la voiture.',
      ],
      corrige: `Faut-il fermer les centres-villes aux voitures ? Le premier document cite des villes où cette mesure a réduit le bruit et la pollution, tout en profitant aux piétons et aux commerces. Le second avertit qu’une interdiction sans alternative pénalise les habitants éloignés, les personnes âgées et les livreurs.

Je suis favorable à cette mesure, mais elle doit être progressive. Les avantages pour la santé et la qualité de vie sont évidents : respirer un air plus propre et marcher en sécurité profite à tout le monde. Cependant, une ville ne peut pas interdire la voiture du jour au lendemain. Elle doit d’abord développer les bus, les pistes cyclables et des parkings à l’entrée de la ville. Il faut aussi prévoir des exceptions pour les personnes handicapées, les urgences et les livraisons à certaines heures. Si ces conditions sont réunies, un centre-ville sans voitures devient un espace plus agréable pour tous.`,
    },
  ]),
  c(2026, 8, 4, 'Vivre à la campagne', [
    {
      prompt: 'Un collègue quitte votre entreprise. Écrivez un message aux autres collègues pour leur proposer d’organiser un cadeau et un moment d’au revoir (idée de cadeau, participation, date).',
      corrige: `Objet : Départ de Martin

Bonjour à tous,

Comme vous le savez, Martin nous quitte le 28 août après huit ans dans notre service. Je vous propose de lui organiser un petit au revoir.

Pour le cadeau, j’ai pensé à un appareil photo, puisqu’il part faire le tour de l’Afrique de l’Ouest ! Il coûte environ 300 dollars ; si nous sommes vingt, cela représente 15 dollars par personne. Vous pouvez me donner votre participation avant le 20 août.

Ensuite, nous pourrions nous retrouver le jeudi 27 août à 16 h dans la salle de réunion pour un pot de départ. Je m’occupe des boissons et du gâteau.

Surtout, ne dites rien à Martin !

Merci,
Sandrine`,
    },
    {
      prompt: 'Vous êtes allé(e) à un festival (musique, cinéma, gastronomie…) qui vous a déçu(e). Écrivez un article de blog pour raconter votre journée et expliquer ce qui ne vous a pas plu.',
      corrige: `J’attendais ce festival de musique depuis des mois : l’affiche annonçait une dizaine d’artistes connus et une organisation « digne des grands festivals ». J’ai payé mon billet 80 dollars, et je l’ai regretté.

En arrivant à 14 h, nous avons attendu plus d’une heure pour entrer, car il n’y avait que deux portes ouvertes. À l’intérieur, il manquait d’eau potable et les rares stands de nourriture vendaient un sandwich à 15 dollars. Pire encore : deux des artistes principaux ont annulé leur concert, sans que les organisateurs ne donnent d’explication.

Le seul bon moment a été le concert d’un jeune groupe local plein d’énergie.

Je suis vraiment déçu, surtout pour ce prix. J’ai écrit aux organisateurs pour demander un remboursement partiel. L’an prochain, je réfléchirai à deux fois avant d’acheter mon billet.`,
    },
    {
      prompt: T3('Vivre en ville ou à la campagne ?'),
      documents: [
        'Document 1 : En ville, tout est à portée de main : le travail, les écoles, les hôpitaux, les cinémas et les restaurants. On ne s’ennuie jamais et on gagne beaucoup de temps.',
        'Document 2 : Il y a deux ans, j’ai quitté la ville pour un village. Je respire un air pur, mes enfants jouent dehors en sécurité et mon loyer a baissé de moitié. Grâce au télétravail, je garde mon emploi.',
      ],
      corrige: `Vaut-il mieux vivre en ville ou à la campagne ? Selon le premier document, la ville offre tous les services et loisirs à proximité, ce qui fait gagner du temps. Le second témoigne au contraire des avantages de la campagne : air pur, sécurité pour les enfants et logement moins cher, rendus possibles par le télétravail.

À mon avis, le choix dépend surtout de l’étape de la vie. Pour un étudiant ou un jeune travailleur, la ville est presque indispensable : c’est là que se trouvent les universités, les emplois et les occasions de rencontres. Mais pour une famille avec des enfants, la campagne offre une qualité de vie que la ville peut difficilement égaler. Toutefois, elle exige souvent une voiture et éloigne des hôpitaux. Le télétravail change aujourd’hui la donne : il permet de profiter du calme sans renoncer à sa carrière. Personnellement, je rêve d’une petite ville, qui réunirait les avantages des deux.`,
    },
  ]),
  c(2026, 8, 5, 'La lecture chez les enfants', [
    {
      prompt: 'Un festival de cinéma a lieu dans votre ville. Écrivez un message à un ami pour lui proposer d’y aller ensemble et lui donner toutes les informations utiles.',
      corrige: `Salut Steve,

Le festival international du film de notre ville commence le 20 août et dure une semaine ! Ça te dirait d’y aller avec moi ?

Cette année, plus de quarante films de quinze pays sont au programme. Je pensais qu’on pourrait voir la comédie ivoirienne présentée le samedi 22 août à 20 h au cinéma Le Capitole : la réalisatrice sera présente pour répondre aux questions après la projection.

La place coûte 12 dollars, mais il existe un pass à 40 dollars pour cinq films. Il faut réserver en ligne, car les séances du week-end se remplissent vite.

On pourrait manger un morceau avant la séance. Dis-moi si tu es partant !

À plus,
Willy`,
    },
    {
      prompt: 'Sur un forum, des internautes débattent des formations en ligne. Racontez votre propre expérience (cours de langue, formation professionnelle…) et dites ce que vous avez apprécié ou non.',
      corrige: `L’an dernier, j’ai suivi une formation en ligne de six mois en comptabilité, parce que je voulais changer de poste sans quitter mon emploi. Les cours étaient sous forme de vidéos, et chaque semaine, un formateur organisait une séance en direct pour répondre à nos questions.

Ce que j’ai le plus apprécié, c’est la liberté : je pouvais étudier le soir, après le travail, ou le dimanche matin. Je pouvais aussi revoir une vidéo autant de fois que nécessaire, ce qui est impossible dans une vraie salle de classe.

En revanche, il m’a fallu beaucoup de discipline. Plusieurs fois, j’ai pris du retard et j’ai failli abandonner. Le contact avec les autres étudiants m’a aussi manqué.

Finalement, j’ai obtenu mon certificat et un nouveau poste. Je recommande ce type de formation, mais seulement aux personnes très motivées et organisées.`,
    },
    {
      prompt: T3('Les enfants lisent-ils encore ?'),
      documents: [
        'Document 1 : Tablettes, jeux vidéo, réseaux sociaux : les enfants passent de plus en plus de temps devant les écrans et ouvrent de moins en moins de livres. Leur vocabulaire et leur capacité de concentration en souffrent.',
        'Document 2 : Les enfants lisent toujours, mais différemment : bandes dessinées, mangas, articles en ligne ou livres numériques. Le plus important est de leur donner le goût de lire, quel que soit le support, et cela commence par l’exemple des parents.',
      ],
      corrige: `La lecture disparaît-elle chez les enfants ? Le premier document l’affirme : les écrans remplacent les livres, ce qui appauvrit le vocabulaire et la concentration. Le second est plus optimiste : les enfants lisent encore, mais sur d’autres supports, et l’essentiel est de leur transmettre le goût de lire.

Je partage plutôt l’avis du second document. Lire une bande dessinée ou un article sur une tablette reste de la lecture, et c’est souvent une première étape vers des livres plus longs. Cependant, je reconnais que les écrans offrent mille distractions qui rendent la lecture moins attirante. C’est pourquoi le rôle des adultes est décisif. Un enfant qui voit ses parents lire, à qui l’on raconte une histoire le soir et que l’on emmène à la bibliothèque prendra l’habitude de lire. L’école peut aussi organiser des moments de lecture libre. Le livre n’est pas en danger si l’on donne aux enfants l’envie de l’ouvrir.`,
    },
  ]),
  c(2026, 8, 6, 'Les produits faits maison', [
    {
      prompt: 'Vous venez de déménager. Écrivez un message à un ami pour lui décrire votre nouveau logement et votre quartier, et l’inviter à venir vous voir.',
      corrige: `Salut Olivier,

Ça y est, nous avons enfin déménagé ! Notre nouvel appartement se trouve à Bastos, au troisième étage d’un immeuble récent.

Il est beaucoup plus grand que l’ancien : nous avons trois chambres, ce qui permet aux enfants d’avoir chacun la leur, un grand salon et une cuisine moderne. Mon endroit préféré, c’est le balcon, d’où l’on voit toute la ville le soir.

Le quartier est calme et bien desservi. Il y a une boulangerie au rez-de-chaussée, une pharmacie juste à côté et l’école des enfants est à cinq minutes à pied.

Nous organisons une petite fête pour inaugurer l’appartement le samedi 29 août. Tu viens ?

Amitiés,
Gilles`,
    },
    {
      prompt: 'Vous avez été invité(e) à une fête de famille (mariage, baptême, anniversaire…). Écrivez un message à vos amis pour raconter cette fête et ce que vous avez le plus aimé.',
      corrige: `Salut les amis,

Je vous écris encore fatiguée, mais très heureuse : ce week-end, nous avons célébré les cinquante ans de mariage de mes grands-parents à Ebolowa !

Plus de cent personnes étaient présentes. Certains cousins étaient venus de France et du Gabon, et je ne les avais pas vus depuis dix ans. La journée a commencé par une messe, puis nous avons fait un grand repas dans la cour de la maison familiale, sous une immense tente.

Le moment le plus émouvant, c’est quand mon grand-père a pris le micro pour raconter leur rencontre en 1976. Toute la famille avait les larmes aux yeux. Ensuite, nous avons dansé jusqu’à trois heures du matin sur la musique de leur jeunesse.

Ce que j’ai le plus aimé, c’est de voir toute la famille réunie. Je vous montrerai les photos bientôt !

Bisous,
Pauline`,
    },
    {
      prompt: T3('Fabriquer soi-même ses produits : une bonne idée ?'),
      documents: [
        'Document 1 : Savon, crème, produit ménager : fabriquer ses produits à la maison permet de savoir exactement ce qu’ils contiennent, de faire des économies et de réduire les emballages en plastique.',
        'Document 2 : Le « fait maison » n’est pas sans risque. Une erreur de dosage peut provoquer des allergies ou des brûlures, et certains mélanges de produits ménagers sont même dangereux. Les produits vendus en magasin, eux, sont contrôlés.',
      ],
      corrige: `Faut-il fabriquer ses produits soi-même ? Le premier document présente cette pratique comme avantageuse : on contrôle les ingrédients, on économise et on limite les déchets plastiques. Le second en souligne les dangers : une erreur de dosage peut provoquer des allergies, alors que les produits du commerce sont contrôlés.

À mon avis, le fait maison est une excellente idée, mais il demande de la prudence. Fabriquer un produit ménager avec du vinaigre et du citron est simple, économique et sans danger ; ma mère le fait depuis des années. En revanche, préparer une crème pour le visage ou un médicament sans connaissances précises peut être risqué. Il faut donc suivre des recettes fiables, venant de sources sérieuses, et ne jamais mélanger des produits au hasard. Par ailleurs, des ateliers pourraient être organisés pour apprendre les bons gestes. Bien informé, chacun peut consommer de façon plus saine et plus écologique.`,
    },
  ]),
];

export const getSessionCombinaison = (id: string) => sessionCombinaisons.find((x) => x.id === id) ?? null;
