import type { Article } from './types';

export const cameroun: Article = {
  slug: 'tcf-canada-cameroun-centres-prix-inscription',
  title: 'S’inscrire au TCF Canada au Cameroun : centres, prix et démarches',
  description: 'Où passer le TCF Canada au Cameroun (Institut français à Yaoundé et Douala, Alliance française de Garoua), combien il coûte, comment s’inscrire et comment éviter les arnaques.',
  category: 'S’inscrire',
  published: '2026-11-05',
  image: { src: '/images/etudiants.jpg', alt: 'Des étudiants qui révisent ensemble' },
  lead: 'Au Cameroun, le TCF Canada est organisé par des centres agréés par France Éducation international, principalement l’Institut français du Cameroun à Yaoundé et à Douala. Voici les démarches telles que les centres les présentent, vérifiées sur leurs pages officielles en novembre 2026.',
  blocks: [
    { type: 'h2', id: 'centres', text: 'Les centres qui organisent le TCF Canada' },
    { type: 'h3', text: 'Institut français du Cameroun (IFC), Yaoundé et Douala' },
    { type: 'p', text: 'L’IFC est centre d’examen agréé et organise régulièrement des sessions du TCF, du TEF, du DELF et du DALF dans ses deux sites : à **Yaoundé** (avenue du Président Ahmadou Ahidjo, d’après les annuaires) et à **Douala** (boulevard de la Liberté, à Akwa). Le service des certifications indique un numéro unique, le **+237 686 150 707**, joignable de 8 h à 15 h, d’après la [page Certifications et examens de l’IFC](https://www.ifcameroun.com/examens-et-tests-de-francais).' },
    { type: 'h3', text: 'Alliance française de Garoua et ses annexes' },
    { type: 'p', text: 'Dans le Nord, l’**Alliance française de Garoua** et ses annexes de **Ngaoundéré** et de **Maroua** organisent aussi le TCF. Sa [page TCF Canada](https://alliancefrancaisegaroua.org/tcf-canada) indique une fréquence d’environ cinq sessions de TCF par mois et une adresse unique pour les questions : info.examens@afgaroua.net.' },
    { type: 'h3', text: 'Les autres villes' },
    { type: 'p', text: 'Des sites de préparation citent d’autres établissements (à Dschang, Bamenda ou Buéa, par exemple). Nous n’avons pas pu confirmer sur une source officielle qu’ils proposent actuellement le TCF **Canada**. Consultez la [carte des centres de France Éducation international](https://www.france-education-international.fr/centres-d-examen/liste) et contactez le centre avant toute démarche.' },

    { type: 'h2', id: 'prix', text: 'Combien coûte le TCF Canada au Cameroun ?' },
    {
      type: 'table',
      caption: 'Tarifs publiés par les centres, relevés en novembre 2026',
      head: ['Centre', 'Tarif du TCF Canada', 'Où le vérifier'],
      rows: [
        ['Institut français du Cameroun (Yaoundé, Douala)', '210 000 FCFA (fixé à 320 €, payable en francs CFA)', 'Grille des frais sur la plateforme d’inscription TLScontact de l’IFC'],
        ['Alliance française de Garoua (et annexes)', '210 000 FCFA', '[Page TCF Canada de l’AF Garoua](https://alliancefrancaisegaroua.org/tcf-canada)'],
      ],
    },
    { type: 'p', text: 'Ce prix couvre les **quatre épreuves**, qui sont obligatoires. Les tarifs peuvent changer d’une année à l’autre : vérifiez toujours le montant affiché par le centre au moment de votre inscription. Si un intermédiaire vous annonce un prix très différent, méfiez-vous.' },

    { type: 'h2', id: 'inscription-ifc', text: 'S’inscrire à l’Institut français : la procédure en ligne' },
    { type: 'p', text: 'L’IFC précise que les inscriptions aux tests et examens se font **exclusivement en ligne**, sur sa plateforme TLScontact : **ifc-polelangue.tlscontact.com**. Il n’y a donc pas d’inscription au guichet.' },
    { type: 'ol', items: [
      'Créez votre compte sur la plateforme avec une adresse électronique que vous consultez souvent : c’est là que vous recevrez les confirmations.',
      'Choisissez bien le test **TCF Canada** (et non le TCF tout public ou le TCF Québec), puis la ville : Yaoundé ou Douala.',
      'Sélectionnez une date parmi les créneaux proposés. Les places partent vite : connectez-vous dès l’ouverture des sessions.',
      'Saisissez vos informations exactement comme sur la pièce d’identité que vous présenterez le jour de l’examen.',
      'Réglez les frais selon les instructions de la plateforme, dans le délai indiqué, sinon la réservation peut être annulée.',
      'Conservez la confirmation et surveillez votre messagerie pour la convocation.',
    ] },
    { type: 'callout', tone: 'warning', title: 'Attention aux faux intermédiaires', text: 'L’Institut français du Cameroun rappelle qu’aucune agence ni aucun intermédiaire ne peut garantir une place ou accélérer le processus. L’Alliance française de Garoua signale de son côté des tentatives d’escroquerie par WhatsApp. Ne payez jamais une « réservation » à un particulier.' },

    { type: 'h2', id: 'inscription-garoua', text: 'S’inscrire à l’Alliance française de Garoua' },
    { type: 'p', text: 'La procédure, décrite par l’AF Garoua, se fait en plusieurs étapes :' },
    { type: 'ol', items: [
      'Remplir le formulaire de pré-inscription en ligne. Les liens d’inscription pour Garoua, Maroua et Ngaoundéré sont publiés sur la page Facebook de l’Alliance française de Garoua.',
      'Recevoir une proposition d’inscription par courriel.',
      'Compléter le formulaire d’inscription en ligne.',
      'Payer les frais dans l’une des banques indiquées, après réception du courriel d’invitation à régler.',
      'Envoyer le reçu de paiement et le scan d’une pièce d’identité valide par courriel.',
      'Recevoir la confirmation d’inscription.',
    ] },
    { type: 'p', text: 'L’Alliance précise que l’inscription directe est gratuite, alors que les agences prennent des frais pour le même service.' },

    { type: 'h2', id: 'jour-j', text: 'Le jour de l’examen' },
    { type: 'ul', items: [
      'Présentez-vous à l’heure indiquée sur la convocation, avec **une pièce d’identité en cours de validité**. Sans elle, l’accès à l’examen est refusé.',
      'Les épreuves collectives (compréhensions et expression écrite) peuvent se dérouler sur papier ou sur ordinateur selon la session : demandez-le au centre pour vous entraîner dans les mêmes conditions.',
      'L’expression orale se passe en face à face, parfois à une autre heure de la journée.',
      'Prévoyez de l’eau et de quoi tenir près de trois heures d’épreuves, attente comprise.',
    ] },

    { type: 'h2', id: 'resultats', text: 'Résultats et délais à anticiper' },
    { type: 'p', text: 'France Éducation international indique que les résultats sont disponibles dans votre espace candidat et transmis au centre dans un délai de 15 jours ouvrés après réception du matériel de session. Demandez à votre centre comment l’attestation vous est remise (retrait sur place ou autre).' },
    { type: 'p', text: 'Pour un dossier Entrée express, vos résultats doivent avoir moins de deux ans à la création du profil et au dépôt de la demande. Et si vous voulez repasser le test, il faut attendre au moins **20 jours** entre deux passations du TCF Canada. Calculez votre calendrier à rebours depuis la date de dépôt visée.' },

    { type: 'h2', id: 'preparation', text: 'Se préparer depuis Douala ou Yaoundé' },
    { type: 'p', text: 'À 210 000 FCFA l’examen, mieux vaut ne pas y aller « pour voir ». Paul World Travel Formation propose une préparation en ligne et des cours en présentiel dans ses bureaux de Douala (Bonabo) et de Yaoundé (Essos). Commencez par le [test de niveau gratuit](/test-de-niveau/), puis consultez les [packs](/packs/) : les prix y sont affichés en FCFA.' },
  ],
  sources: [
    { label: 'Institut français du Cameroun : Certifications et examens', href: 'https://www.ifcameroun.com/examens-et-tests-de-francais' },
    { label: 'Alliance française de Garoua : TCF Canada', href: 'https://alliancefrancaisegaroua.org/tcf-canada' },
    { label: 'France Éducation international : TCF Canada', href: 'https://www.france-education-international.fr/test/tcf-canada' },
    { label: 'France Éducation international : carte des centres de passation', href: 'https://www.france-education-international.fr/centres-d-examen/liste' },
  ],
  related: ['tcf-canada-guide-complet-2026', 'preparation-tcf-canada-planning-30-jours', 'tcf-canada-ou-tef-canada'],
};
