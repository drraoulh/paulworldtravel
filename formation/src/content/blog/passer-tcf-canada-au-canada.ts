import type { Article } from './types';

export const auCanada: Article = {
  slug: 'passer-tcf-canada-au-canada',
  title: 'Passer le TCF Canada au Canada : centres et inscription',
  description: 'Où passer le TCF Canada à Montréal, Toronto, Ottawa, Vancouver ou Calgary, comment réserver une place, combien prévoir et quelles règles respecter avant de payer.',
  category: 'S’inscrire',
  published: '2026-11-05',
  image: { src: '/images/montreal.jpg', alt: 'Vue de Montréal' },
  lead: 'Vous êtes déjà au Canada, avec un permis d’études ou de travail, et vous devez prouver votre français pour la résidence permanente ou la citoyenneté ? Le TCF Canada se passe dans des centres agréés partout au pays. Voici comment trouver une place, sans mauvaise surprise.',
  blocks: [
    { type: 'h2', id: 'principe', text: 'Le principe : on réserve auprès du centre' },
    { type: 'p', text: 'France Éducation international conçoit et corrige le TCF Canada, mais ce sont les **centres de passation agréés** qui vendent les places. Chacun fixe ses dates, son tarif, ses règles d’annulation et le support des épreuves (papier ou ordinateur). Il n’existe ni calendrier national ni inscription centralisée.' },
    { type: 'p', text: 'Le TCF Canada **ne se passe pas à domicile** : même dans sa version sur ordinateur, il se déroule dans les locaux d’un centre, et l’expression orale a lieu en face à face avec un examinateur.' },

    { type: 'h2', id: 'ou', text: 'Où passer le TCF Canada ?' },
    { type: 'p', text: 'La liste officielle est la [carte des centres de France Éducation international](https://www.france-education-international.fr/centres-d-examen/liste) : choisissez « Canada » et le type de centre « TCF ». On y trouve plusieurs dizaines d’établissements, surtout au Québec et en Ontario. Quelques exemples parmi les centres listés en 2026 :' },
    {
      type: 'table',
      head: ['Ville', 'Exemples de centres agréés'],
      rows: [
        ['Montréal', 'Alliance française de Montréal, Université Concordia, UQÀM, Collège Stanislas, Collège ELC, Cégep Marie-Victorin, Centre Yves-Thériault'],
        ['Toronto et région', 'Alliance française de Toronto : campus de Spadina, North York, Mississauga et Oakville'],
        ['Ottawa', 'Alliance française d’Ottawa, FrancoLangues'],
        ['Vancouver', 'Alliance française Canada Pacific (Vancouver et New Westminster)'],
        ['Calgary', 'Alliance française de Calgary'],
      ],
    },
    { type: 'p', text: 'La liste évolue : un centre peut cesser d’organiser le test ou suspendre ses sessions. Vérifiez toujours sur la carte de FEI et sur le site du centre lui-même.' },

    { type: 'h2', id: 'prix', text: 'Combien ça coûte ?' },
    { type: 'p', text: 'Chaque centre fixe son prix. À titre d’exemple, l’Alliance française de Toronto affiche **390 $** pour le TCF Canada sur sa [page d’information](https://www.alliance-francaise.ca/fr/examens/tests/informations-a-propos-du-tcf-canada), et l’Alliance française de Vancouver affiche aussi **390 $** sur son calendrier de sessions. D’autres centres pratiquent des tarifs voisins, parfois un peu plus élevés : regardez le montant total, frais compris, avant de payer.' },

    { type: 'h2', id: 'reserver', text: 'Réserver sa place : la marche à suivre' },
    { type: 'ol', items: [
      '**Calculez votre date limite.** Partez de la date à laquelle vous voulez créer votre profil Entrée express ou déposer votre demande, retirez le délai de résultats et une marge pour un éventuel deuxième passage.',
      '**Repérez deux ou trois centres** accessibles, y compris dans une autre ville si votre région est saturée.',
      '**Surveillez l’ouverture des inscriptions.** Dans les grandes villes, les sessions affichent souvent complet très vite. L’Alliance française de Toronto précise qu’il n’existe pas de liste d’attente.',
      '**Créez votre compte et payez en ligne** si le centre le propose : à Toronto, l’inscription se fait uniquement en ligne, ni au comptoir ni par téléphone.',
      '**Vérifiez l’intitulé** : TCF Canada, et non TCF tout public ou TCF Québec.',
      '**Gardez la confirmation** et lisez les conditions d’annulation et de report.',
    ] },
    { type: 'callout', title: 'Règles fréquentes à connaître', text: 'À l’Alliance française de Toronto, par exemple : une seule inscription active à la fois dans l’ensemble de ses quatre centres, un intervalle minimum de 20 jours entre deux passages (règle fixée par FEI), des doublons annulés sans remboursement, et un transfert possible jusqu’à 15 jours avant l’examen sur ordinateur (30 jours sur papier) moyennant 100 $ de frais. Chaque centre a ses propres conditions : lisez-les avant de payer.' },

    { type: 'h2', id: 'ordinateur', text: 'Sur ordinateur : le piège du clavier' },
    { type: 'p', text: 'De nombreux centres canadiens font passer les épreuves collectives sur ordinateur. L’Alliance française de Vancouver signale par exemple que, sauf l’expression orale, tous les tests se déroulent sur ordinateur avec un **clavier QWERTY**, les accents étant accessibles par la plateforme de FEI.' },
    { type: 'p', text: 'Si vous avez l’habitude d’un clavier AZERTY, entraînez-vous à taper vos rédactions en QWERTY avant le jour J, et apprenez à insérer rapidement é, è, à, ç et ’. En expression écrite, une heure passe vite quand on cherche ses touches.' },
    { type: 'p', text: 'Si vous avez besoin d’aménagements particuliers (handicap, problème de santé), contactez le centre dès l’inscription : à Toronto, ils ne sont possibles que pour les sessions sur papier.' },

    { type: 'h2', id: 'delais', text: 'Délais et validité' },
    { type: 'ul', items: [
      'FEI annonce des résultats disponibles dans l’espace candidat **15 jours ouvrés** après réception du matériel de session.',
      'IRCC exige des résultats de **moins de deux ans** à la création du profil Entrée express et au dépôt de la demande de résidence permanente.',
      'Il faut attendre **20 jours** entre deux passations du TCF Canada.',
    ] },
    { type: 'p', text: 'Si vous visez un niveau précis pour une ronde d’invitations, ne réservez pas au dernier moment : avec des sessions complètes plusieurs semaines à l’avance, un échec peut retarder votre dossier de plusieurs mois.' },

    { type: 'h2', id: 'citoyennete', text: 'Pour la citoyenneté : ce qu’il faut vérifier' },
    { type: 'p', text: 'Si vous passez le test pour une demande de citoyenneté, l’exigence n’est pas la même que pour Entrée express : IRCC demande au moins le **NCLC 4 en expression orale et en compréhension de l’oral**. Le centre d’aide d’IRCC cite le TCF parmi les tests de tiers acceptés et précise qu’IRCC ne suit pas les dates ni les lieux des sessions : c’est à vous de contacter les centres.' },
    { type: 'p', text: 'Dans certains cas, IRCC accepte aussi des résultats déjà envoyés avec une demande de résidence permanente. Avant de payer un nouvel examen, vérifiez votre situation sur la [page du centre d’aide d’IRCC](https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=572) (en anglais).' },
    { type: 'h2', id: 'preparer', text: 'Se préparer en ligne depuis le Canada' },
    { type: 'p', text: 'Les séries d’entraînement, les simulateurs d’expression et les examens blancs de la plateforme fonctionnent partout. Les [packs](/packs/) sont affichés en dollars canadiens quand vous vous connectez depuis le Canada. Commencez par le [test de niveau gratuit](/test-de-niveau/) et notre [guide complet du TCF Canada](/blog/tcf-canada-guide-complet-2026/).' },
  ],
  sources: [
    { label: 'France Éducation international : TCF Canada', href: 'https://www.france-education-international.fr/test/tcf-canada' },
    { label: 'France Éducation international : carte des centres de passation', href: 'https://www.france-education-international.fr/centres-d-examen/liste' },
    { label: 'Alliance française de Toronto : informations sur le TCF Canada', href: 'https://www.alliance-francaise.ca/fr/examens/tests/informations-a-propos-du-tcf-canada' },
    { label: 'Alliance française de Vancouver : TCF Canada', href: 'https://www.alliancefrancaise.ca/fr/language/exams/tcf-canada' },
    { label: 'IRCC, centre d’aide : tests acceptés pour la citoyenneté (en anglais)', href: 'https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=572' },
    { label: 'IRCC : Entrée express, résultats d’examen linguistique', href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express/documents/examen-linguistique.html' },
  ],
  related: ['tcf-canada-guide-complet-2026', 'niveaux-nclc-bareme-tcf-canada', 'tcf-canada-ou-tef-canada'],
};
