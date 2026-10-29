// Every service of Paul World Travel, in French and English.
// Drives the navigation menu, the home page, /services and each /services/[slug] page.

export type Lang = 'fr' | 'en';
export type Area = 'transport' | 'trade' | 'paperwork' | 'digital';

type Item = { title: string; desc?: string };
type Group = { title: string; items: Item[] };

type ServiceText = {
  name: string; // short name used in menus and cards
  action: string; // what the visitor wants to do, used by the home picker
  title: string; // page headline
  summary: string; // one sentence for cards
  intro: string; // opening paragraph of the page
  highlights: string[]; // three key points under the headline
  groups: Group[];
  steps: [string, string][];
  notice?: { title: string; text: string };
  stats?: { value: string; label: string }[];
  contactOption: string; // value of the contact form's service list
};

export type Service = {
  slug: string;
  area: Area;
  faqCategory: string;
  image: string;
  fr: ServiceText;
  en: ServiceText;
};

export const areas: Record<Area, Record<Lang, { name: string; text: string }>> = {
  transport: {
    fr: { name: 'Transport et logistique', text: 'Vos marchandises et vos colis, par mer ou par air, jusqu’à destination.' },
    en: { name: 'Transport and logistics', text: 'Your goods and parcels, by sea or air, all the way to their destination.' },
  },
  trade: {
    fr: { name: 'Commerce avec la Chine', text: 'Acheter auprès des bons fournisseurs et les payer dans leur devise.' },
    en: { name: 'Trading with China', text: 'Buy from the right suppliers and pay them in their currency.' },
  },
  paperwork: {
    fr: { name: 'Démarches et entreprise', text: 'Visas, immigration et création de votre société, dossier par dossier.' },
    en: { name: 'Paperwork and business', text: 'Visas, immigration and setting up your company, one file at a time.' },
  },
  digital: {
    fr: { name: 'Numérique', text: 'Les outils informatiques qui font tourner votre activité.' },
    en: { name: 'Digital', text: 'The IT tools that keep your business running.' },
  },
};

export const services: Service[] = [
  {
    slug: 'cargo-chine-afrique',
    area: 'transport',
    faqCategory: 'cargo',
    image: '/images/photos/cargo-maritime.jpg',
    fr: {
      name: 'Cargo Chine → Afrique',
      action: 'Expédier depuis la Chine',
      title: 'Cargo maritime et aérien de la Chine vers l’Afrique',
      summary: 'Conteneur complet, groupage ou fret aérien, avec dédouanement et livraison à Douala et Yaoundé.',
      intro:
        'Nous organisons le transport de vos marchandises depuis l’usine en Chine jusqu’à votre entrepôt ou votre point de vente au Cameroun. Notre bureau de Guangzhou réceptionne et contrôle les produits, notre équipe de Douala suit le dédouanement et la livraison.',
      highlights: ['Conteneur complet ou groupage', 'Fret aérien pour l’urgent', 'Livraison porte à porte'],
      groups: [
        {
          title: 'Fret maritime',
          items: [
            { title: 'Conteneur complet (FCL)', desc: 'Un conteneur 20 ou 40 pieds pour vos volumes importants.' },
            { title: 'Groupage (LCL)', desc: 'Vous ne payez que le volume occupé par vos marchandises, au m³.' },
            { title: 'Suivi et documentation', desc: 'Transport par voie maritime avec suivi et documentation complète.' },
          ],
        },
        {
          title: 'Fret aérien',
          items: [
            { title: 'Envois urgents ou de valeur', desc: 'Livraison rapide par avion, tarif au kilo.' },
            { title: 'Porte à porte', desc: 'Transport complet depuis l’usine jusqu’à votre entrepôt ou point de vente.' },
            { title: 'Coordination douanière', desc: 'Préparation des documents et suivi avec les services douaniers.' },
          ],
        },
        {
          title: 'Nos engagements',
          items: [
            { title: 'Tarifs compétitifs', desc: 'Prix optimisés grâce à nos partenariats avec les grandes compagnies.' },
            { title: 'Fiabilité', desc: 'Plus de 95 % de nos livraisons arrivent dans les délais prévus.' },
            { title: 'Conseiller dédié', desc: 'Un interlocuteur unique suit votre expédition du départ à l’arrivée.' },
          ],
        },
      ],
      steps: [
        ['Devis', 'Vous nous indiquez la marchandise, le volume et la ville de livraison.'],
        ['Réception à Guangzhou', 'Vos fournisseurs livrent notre bureau, nous contrôlons et emballons.'],
        ['Transport', 'Départ par bateau ou par avion, avec les documents d’exportation.'],
        ['Dédouanement et livraison', 'Passage en douane au Cameroun puis livraison à votre adresse.'],
      ],
      contactOption: 'Fret Chine → Afrique (maritime / aérien)',
    },
    en: {
      name: 'Cargo China → Africa',
      action: 'Ship from China',
      title: 'Sea and air cargo from China to Africa',
      summary: 'Full container, consolidation or air freight, with customs clearance and delivery to Douala and Yaoundé.',
      intro:
        'We organise the transport of your goods from the factory in China to your warehouse or shop in Cameroon. Our Guangzhou office receives and inspects the products; our Douala team handles customs clearance and delivery.',
      highlights: ['Full container or consolidation', 'Air freight for urgent goods', 'Door-to-door delivery'],
      groups: [
        {
          title: 'Sea freight',
          items: [
            { title: 'Full container (FCL)', desc: 'A 20 or 40-foot container for large volumes.' },
            { title: 'Consolidation (LCL)', desc: 'Pay only for the volume your goods take up, per m³.' },
            { title: 'Tracking and paperwork', desc: 'Sea transport with tracking and complete documentation.' },
          ],
        },
        {
          title: 'Air freight',
          items: [
            { title: 'Urgent or high-value shipments', desc: 'Fast delivery by air, priced per kilo.' },
            { title: 'Door to door', desc: 'Complete transport from the factory to your warehouse or shop.' },
            { title: 'Customs coordination', desc: 'Document preparation and follow-up with customs services.' },
          ],
        },
        {
          title: 'Our commitments',
          items: [
            { title: 'Competitive rates', desc: 'Optimised prices thanks to our partnerships with major carriers.' },
            { title: 'Reliability', desc: 'Over 95% of our deliveries arrive on schedule.' },
            { title: 'Dedicated advisor', desc: 'One contact follows your shipment from departure to arrival.' },
          ],
        },
      ],
      steps: [
        ['Quote', 'Tell us the goods, the volume and the delivery city.'],
        ['Receiving in Guangzhou', 'Your suppliers deliver to our office; we inspect and pack.'],
        ['Transport', 'Departure by sea or air, with the export paperwork.'],
        ['Customs and delivery', 'Customs clearance in Cameroon, then delivery to your address.'],
      ],
      contactOption: 'Freight China → Africa (sea / air)',
    },
  },
  {
    slug: 'fret-cameroun-canada',
    area: 'transport',
    faqCategory: 'canada',
    image: '/images/photos/canada-montreal.jpg',
    fr: {
      name: 'Fret Cameroun → Canada',
      action: 'Envoyer un colis au Canada',
      title: 'Envoyez vos colis et marchandises du Cameroun vers le Canada',
      summary: 'Colis, effets personnels et marchandises de Douala et Yaoundé vers Montréal, Toronto et tout le Canada.',
      intro:
        'Nous collectons ou réceptionnons vos envois à Douala et Yaoundé, préparons les documents d’exportation et suivons votre envoi jusqu’à sa remise au Canada, par mer ou par air.',
      highlights: ['Groupage maritime au m³', 'Fret aérien au kilo', 'Livraison partout au Canada'],
      groups: [
        {
          title: 'Fret maritime (groupage)',
          items: [
            { title: 'Envois lourds ou volumineux', desc: 'Cartons, fûts, effets personnels, déménagements.' },
            { title: 'Départ du Port autonome de Douala', desc: 'Groupage en conteneur avec d’autres envois.' },
            { title: 'Tarif au volume', desc: 'Calculé en m³, dégressif selon la quantité.' },
          ],
        },
        {
          title: 'Fret aérien',
          items: [
            { title: 'Colis urgents et documents', desc: 'Le délai le plus court pour vos envois prioritaires.' },
            { title: 'Douala ou Yaoundé → Montréal ou Toronto', desc: 'Puis acheminement vers votre ville.' },
            { title: 'Tarif au kilo', desc: 'Selon le poids réel ou volumétrique, le plus élevé des deux.' },
          ],
        },
        {
          title: 'Documents à préparer',
          items: [
            { title: 'Identité et destinataire', desc: 'Pièce d’identité de l’expéditeur et coordonnées complètes du destinataire au Canada.' },
            { title: 'Liste du contenu', desc: 'Chaque article avec sa valeur.' },
            { title: 'Facture commerciale', desc: 'Pour les marchandises destinées à la vente.' },
            { title: 'Certificats ou permis', desc: 'Pour les produits réglementés, lorsque requis.' },
          ],
        },
      ],
      steps: [
        ['Demande de devis', 'Contenu, poids ou dimensions et ville d’arrivée : nous répondons avec un prix et le prochain départ.'],
        ['Dépôt ou collecte', 'Vous déposez votre envoi à Douala ou nous organisons la collecte.'],
        ['Emballage et documents', 'Nous vérifions, pesons, étiquetons et préparons la déclaration.'],
        ['Transport et remise', 'Départ par mer ou par air, dédouanement au Canada, remise au destinataire.'],
      ],
      notice: {
        title: 'Produits réglementés ou interdits',
        text: 'Le Canada contrôle strictement l’entrée des aliments, plantes, semences, viandes, produits laitiers et produits d’origine animale. Certains sont interdits, d’autres nécessitent un permis. Les armes, contrefaçons et médicaments sans ordonnance sont refusés. Avant chaque envoi, nous vérifions avec vous ce qui peut être expédié.',
      },
      contactOption: 'Fret Cameroun → Canada',
    },
    en: {
      name: 'Freight Cameroon → Canada',
      action: 'Send a parcel to Canada',
      title: 'Ship your parcels and goods from Cameroon to Canada',
      summary: 'Parcels, personal effects and goods from Douala and Yaoundé to Montreal, Toronto and all of Canada.',
      intro:
        'We collect or receive your shipments in Douala and Yaoundé, prepare the export paperwork and track your shipment until it is delivered in Canada, by sea or by air.',
      highlights: ['Sea consolidation per m³', 'Air freight per kilo', 'Delivery anywhere in Canada'],
      groups: [
        {
          title: 'Sea freight (consolidation)',
          items: [
            { title: 'Heavy or bulky shipments', desc: 'Boxes, barrels, personal effects, relocations.' },
            { title: 'From the Port of Douala', desc: 'Container consolidation with other shipments.' },
            { title: 'Priced by volume', desc: 'Calculated in m³, with lower rates for larger shipments.' },
          ],
        },
        {
          title: 'Air freight',
          items: [
            { title: 'Urgent parcels and documents', desc: 'The fastest option for priority shipments.' },
            { title: 'Douala or Yaoundé → Montreal or Toronto', desc: 'Then forwarding to your city.' },
            { title: 'Priced per kilo', desc: 'By actual or volumetric weight, whichever is higher.' },
          ],
        },
        {
          title: 'Documents to prepare',
          items: [
            { title: 'ID and recipient', desc: 'Sender’s ID and full contact details of the recipient in Canada.' },
            { title: 'List of contents', desc: 'Every item with its value.' },
            { title: 'Commercial invoice', desc: 'For goods intended for sale.' },
            { title: 'Certificates or permits', desc: 'For regulated products, when required.' },
          ],
        },
      ],
      steps: [
        ['Quote request', 'Contents, weight or dimensions and arrival city: we reply with a price and the next departure.'],
        ['Drop-off or pickup', 'Drop your shipment in Douala or we arrange a pickup.'],
        ['Packing and paperwork', 'We check, weigh, label and prepare the declaration.'],
        ['Transport and delivery', 'Sea or air departure, Canadian customs clearance, delivery to the recipient.'],
      ],
      notice: {
        title: 'Regulated or prohibited items',
        text: 'Canada strictly controls food, plants, seeds, meat, dairy and animal products. Some are prohibited, others need a permit. Weapons, counterfeit goods and unprescribed medicines are refused. Before each shipment, we check with you what can be sent.',
      },
      contactOption: 'Freight Cameroon → Canada',
    },
  },
  {
    slug: 'douane-transit',
    area: 'transport',
    faqCategory: 'customs',
    image: '/images/photos/douane-transit.jpg',
    fr: {
      name: 'Douane et transit',
      action: 'Dédouaner mes marchandises',
      title: 'Dédouanement et transit de vos marchandises',
      summary: 'Déclarations, licences d’importation et transit de vos marchandises au port de Douala.',
      intro:
        'Nous simplifions vos opérations d’import-export et réduisons vos coûts, grâce à notre présence en Chine et au Cameroun et à nos partenaires en Amérique du Nord.',
      highlights: ['Dédouanement rapide', 'Conformité réglementaire', 'Coûts optimisés'],
      groups: [
        {
          title: 'Licences et formalités',
          items: [
            { title: 'Licences d’import et d’export', desc: 'Obtention des autorisations auprès des organismes compétents.' },
            { title: 'Formalités douanières', desc: 'Préparation des déclarations et vérification des documents.' },
            { title: 'Conseil réglementaire', desc: 'Exigences, restrictions et quotas applicables à vos produits.' },
            { title: 'Optimisation des coûts', desc: 'Réduction des frais de douane et taxes d’importation.' },
          ],
        },
        {
          title: 'Services complémentaires',
          items: [
            { title: 'Entreposage temporaire', desc: 'Stockage sécurisé en attente de dédouanement.' },
            { title: 'Transport local', desc: 'Livraison à destination finale après dédouanement.' },
            { title: 'Assurance transport', desc: 'Protection de vos marchandises à chaque étape.' },
            { title: 'Suivi administratif', desc: 'Documentation et compte rendu réguliers.' },
          ],
        },
      ],
      steps: [
        ['Analyse', 'Nous vérifions vos documents et la réglementation applicable.'],
        ['Déclaration', 'Nous préparons et déposons la déclaration en douane.'],
        ['Paiement des droits', 'Nous vous indiquons les droits et taxes à régler.'],
        ['Mainlevée et livraison', 'Vos marchandises sont libérées et livrées.'],
      ],
      contactOption: 'Dédouanement et transit',
    },
    en: {
      name: 'Customs and transit',
      action: 'Clear my goods through customs',
      title: 'Customs clearance and transit for your goods',
      summary: 'Declarations, import licences and transit of your goods through the port of Douala.',
      intro:
        'We simplify your import-export operations and reduce your costs, thanks to our presence in China and Cameroon and our partners in North America.',
      highlights: ['Fast clearance', 'Regulatory compliance', 'Lower costs'],
      groups: [
        {
          title: 'Licences and formalities',
          items: [
            { title: 'Import and export licences', desc: 'Obtaining permits from the relevant authorities.' },
            { title: 'Customs formalities', desc: 'Declaration preparation and document checks.' },
            { title: 'Regulatory advice', desc: 'Requirements, restrictions and quotas for your products.' },
            { title: 'Cost optimisation', desc: 'Lower customs fees and import taxes.' },
          ],
        },
        {
          title: 'Additional services',
          items: [
            { title: 'Temporary storage', desc: 'Secure storage pending customs clearance.' },
            { title: 'Local transport', desc: 'Final delivery after customs clearance.' },
            { title: 'Transport insurance', desc: 'Protection for your goods at every stage.' },
            { title: 'Administrative follow-up', desc: 'Documentation and regular reporting.' },
          ],
        },
      ],
      steps: [
        ['Review', 'We check your documents and the applicable rules.'],
        ['Declaration', 'We prepare and file the customs declaration.'],
        ['Duties', 'We tell you the duties and taxes to pay.'],
        ['Release and delivery', 'Your goods are released and delivered.'],
      ],
      contactOption: 'Customs clearance and transit',
    },
  },
  {
    slug: 'achats-chine',
    area: 'trade',
    faqCategory: 'consulting',
    image: '/images/photos/achats-entrepot.jpg',
    fr: {
      name: 'Achats en Chine',
      action: 'Acheter en Chine',
      title: 'Achetez en Chine auprès de fournisseurs vérifiés',
      summary: 'Recherche de fournisseurs, négociation, contrôle qualité et regroupement de vos commandes à Guangzhou.',
      intro:
        'Depuis notre bureau de Guangzhou, nous puisons dans notre réseau de fournisseurs du Guangdong pour trouver les usines adaptées à votre projet, négocions les prix et contrôlons vos produits avant leur expédition.',
      highlights: ['Fournisseurs vérifiés', 'Contrôle qualité sur place', 'Commandes regroupées'],
      groups: [
        {
          title: 'Achats et sourcing',
          items: [
            { title: 'Recherche de fournisseurs', desc: 'Usines et grossistes sélectionnés selon votre cahier des charges.' },
            { title: 'Négociation', desc: 'Prix, quantités minimales et délais de production.' },
            { title: 'Contrôle qualité', desc: 'Inspection des produits avant expédition.' },
            { title: 'Regroupement', desc: 'Plusieurs fournisseurs, un seul envoi depuis Guangzhou.' },
          ],
        },
        {
          title: 'Voyages d’affaires et accompagnement',
          items: [
            { title: 'Voyages d’affaires', desc: 'Organisation de vos visites d’usines et de salons en Chine.' },
            { title: 'Traduction', desc: 'Traduction de documents officiels et accompagnement en réunion.' },
            { title: 'Formation', desc: 'Programmes adaptés pour apprendre à importer de Chine.' },
          ],
        },
      ],
      steps: [
        ['Votre besoin', 'Produit, quantité, budget et délai.'],
        ['Sélection', 'Nous vous proposons des fournisseurs et des échantillons.'],
        ['Commande et paiement', 'Nous passons commande et payons le fournisseur en Yuan.'],
        ['Contrôle et expédition', 'Inspection à Guangzhou puis départ vers votre pays.'],
      ],
      contactOption: 'Achats et sourcing en Chine',
    },
    en: {
      name: 'Purchasing in China',
      action: 'Buy in China',
      title: 'Buy in China from vetted suppliers',
      summary: 'Supplier search, negotiation, quality control and consolidation of your orders in Guangzhou.',
      intro:
        'From our Guangzhou office, we draw on our supplier network across Guangdong to find the right factories for your project, negotiate prices and inspect your products before shipment.',
      highlights: ['Vetted suppliers', 'On-site quality control', 'Consolidated orders'],
      groups: [
        {
          title: 'Purchasing and sourcing',
          items: [
            { title: 'Supplier search', desc: 'Factories and wholesalers chosen to match your requirements.' },
            { title: 'Negotiation', desc: 'Prices, minimum quantities and production times.' },
            { title: 'Quality control', desc: 'Product inspection before shipment.' },
            { title: 'Consolidation', desc: 'Several suppliers, one shipment from Guangzhou.' },
          ],
        },
        {
          title: 'Business travel and support',
          items: [
            { title: 'Business trips', desc: 'Organising your factory visits and trade fairs in China.' },
            { title: 'Translation', desc: 'Translation of official documents and support in meetings.' },
            { title: 'Training', desc: 'Programmes to learn how to import from China.' },
          ],
        },
      ],
      steps: [
        ['Your need', 'Product, quantity, budget and timing.'],
        ['Selection', 'We suggest suppliers and samples.'],
        ['Order and payment', 'We place the order and pay the supplier in Yuan.'],
        ['Inspection and shipping', 'Checks in Guangzhou, then departure to your country.'],
      ],
      contactOption: 'Purchasing and sourcing in China',
    },
  },
  {
    slug: 'change-devises',
    area: 'trade',
    faqCategory: 'currency',
    image: '/images/photos/change-devises.jpg',
    fr: {
      name: 'Change de devises',
      action: 'Changer de l’argent',
      title: 'Change Yuan, FCFA, Dollar et Euro',
      summary: 'Conversion entre Yuan, FCFA, Dollar et Euro pour payer vos fournisseurs et vos frais à l’étranger.',
      intro:
        'Payez vos fournisseurs chinois en Yuan, envoyez des fonds pour vos études ou vos voyages : nous convertissons vos devises à des taux mis à jour chaque jour.',
      highlights: ['Yuan, FCFA, Dollar, Euro', 'Taux mis à jour chaque jour', 'Paiement des fournisseurs'],
      groups: [
        {
          title: 'Ce que nous faisons',
          items: [
            { title: 'Change de devises', desc: 'Yuan, FCFA, Dollar et Euro.' },
            { title: 'Paiement fournisseurs', desc: 'Règlement direct de vos fournisseurs en Chine.' },
            { title: 'Frais à l’étranger', desc: 'Études, voyages et dépenses de vos proches.' },
          ],
        },
        {
          title: 'Nos engagements',
          items: [
            { title: 'Tarifs compétitifs', desc: 'Des taux suivis chaque jour, avec des frais de service réduits.' },
            { title: 'Fiabilité', desc: 'Des partenaires de confiance et un suivi constant de vos opérations.' },
            { title: 'Suivi en temps réel', desc: 'Vous savez où en est votre opération.' },
            { title: 'Conseiller dédié', desc: 'Un interlocuteur unique pour vos opérations de change.' },
          ],
        },
      ],
      steps: [
        ['Votre demande', 'Montant, devise et destinataire.'],
        ['Taux du jour', 'Nous vous communiquons le taux et les frais.'],
        ['Versement', 'Vous versez les fonds à notre bureau.'],
        ['Transfert', 'Le montant converti est remis ou envoyé au destinataire.'],
      ],
      contactOption: 'Change de devises',
    },
    en: {
      name: 'Currency exchange',
      action: 'Exchange money',
      title: 'Yuan, FCFA, Dollar and Euro exchange',
      summary: 'Yuan, FCFA, Dollar and Euro conversion to pay your suppliers and expenses abroad.',
      intro:
        'Pay your Chinese suppliers in Yuan, send money for studies or travel: we convert your currencies at rates updated every day.',
      highlights: ['Yuan, FCFA, Dollar, Euro', 'Rates updated daily', 'Supplier payments'],
      groups: [
        {
          title: 'What we do',
          items: [
            { title: 'Currency exchange', desc: 'Yuan, FCFA, Dollar and Euro.' },
            { title: 'Supplier payments', desc: 'Direct payment of your suppliers in China.' },
            { title: 'Expenses abroad', desc: 'Studies, travel and your relatives’ expenses.' },
          ],
        },
        {
          title: 'Our commitments',
          items: [
            { title: 'Competitive rates', desc: 'Rates tracked daily, with low service fees.' },
            { title: 'Reliability', desc: 'Trusted partners and constant follow-up of your operations.' },
            { title: 'Real-time tracking', desc: 'You know where your operation stands.' },
            { title: 'Dedicated advisor', desc: 'One contact for your exchange operations.' },
          ],
        },
      ],
      steps: [
        ['Your request', 'Amount, currency and recipient.'],
        ['Today’s rate', 'We give you the rate and fees.'],
        ['Payment', 'You pay the funds at our office.'],
        ['Transfer', 'The converted amount is handed over or sent to the recipient.'],
      ],
      contactOption: 'Currency exchange',
    },
  },
  {
    slug: 'visas-immigration',
    area: 'paperwork',
    faqCategory: 'visa',
    image: '/images/photos/visa-voyage.jpg',
    fr: {
      name: 'Visas et immigration',
      action: 'Obtenir un visa',
      title: 'Visas, études à l’étranger et immigration',
      summary: 'Visa étudiant, visa affaires, résidence permanente : constitution et suivi de votre dossier.',
      intro:
        'Étudier au Canada, voyager pour affaires, s’installer à l’étranger : nous vous aidons à choisir la bonne procédure, à constituer un dossier complet et à le suivre jusqu’à la décision.',
      highlights: ['Visa étudiant', 'Résidence permanente', 'Visa affaires et travail'],
      groups: [
        {
          title: 'Visa étudiant',
          items: [
            { title: 'Orientation', desc: 'Choix du programme et de l’établissement.' },
            { title: 'Dossier', desc: 'Assistance pour l’obtention de votre visa étudiant.' },
            { title: 'Entretien', desc: 'Préparation à l’entretien.' },
            { title: 'Suivi', desc: 'Accompagnement jusqu’à votre arrivée.' },
          ],
        },
        {
          title: 'Résidence permanente',
          items: [
            { title: 'Éligibilité', desc: 'Évaluation de votre profil.' },
            { title: 'Préparation du dossier', desc: 'Documents, formulaires et justificatifs.' },
            { title: 'Suivi de la demande', desc: 'Jusqu’à la décision.' },
          ],
        },
        {
          title: 'Autres démarches',
          items: [
            { title: 'Visa d’affaires', desc: 'Accompagnement pour vos déplacements professionnels.' },
            { title: 'Visa de travail', desc: 'Accompagnement pour l’obtention de votre visa de travail.' },
            { title: 'Regroupement familial', desc: 'Accompagnement pour faire venir vos proches.' },
            { title: 'Statut de réfugié', desc: 'Accompagnement dans vos démarches.' },
          ],
        },
      ],
      steps: [
        ['Évaluation', 'Nous étudions votre profil et votre projet.'],
        ['Dossier', 'Nous listons les documents et vous aidons à les réunir.'],
        ['Dépôt', 'Nous vérifions et déposons la demande.'],
        ['Suivi', 'Nous suivons la demande et préparons l’entretien si besoin.'],
      ],
      stats: [
        { value: '98 %', label: 'de réussite pour les visas étudiants' },
        { value: '30+', label: 'dossiers d’immigration réussis' },
        { value: '5+', label: 'années d’expérience' },
        { value: '15+', label: 'pays de destination' },
      ],
      contactOption: 'Visa et immigration',
    },
    en: {
      name: 'Visas and immigration',
      action: 'Get a visa',
      title: 'Visas, studying abroad and immigration',
      summary: 'Student and business visas, permanent residence: we prepare and follow up your application.',
      intro:
        'Studying in Canada, travelling for business, settling abroad: we help you choose the right procedure, build a complete file and follow it up until the decision.',
      highlights: ['Student visa', 'Permanent residence', 'Business and work visas'],
      groups: [
        {
          title: 'Student visa',
          items: [
            { title: 'Guidance', desc: 'Choosing the programme and the school.' },
            { title: 'Application', desc: 'Support with your student visa application.' },
            { title: 'Interview', desc: 'Interview preparation.' },
            { title: 'Follow-up', desc: 'Support until you arrive.' },
          ],
        },
        {
          title: 'Permanent residence',
          items: [
            { title: 'Eligibility', desc: 'Assessment of your profile.' },
            { title: 'File preparation', desc: 'Documents, forms and supporting evidence.' },
            { title: 'Application follow-up', desc: 'Until the decision.' },
          ],
        },
        {
          title: 'Other procedures',
          items: [
            { title: 'Business visa', desc: 'Support for your business trips.' },
            { title: 'Work visa', desc: 'Support with your work visa application.' },
            { title: 'Family reunification', desc: 'Support to bring your relatives.' },
            { title: 'Refugee status', desc: 'Support with your application.' },
          ],
        },
      ],
      steps: [
        ['Assessment', 'We review your profile and plans.'],
        ['File', 'We list the documents and help you gather them.'],
        ['Submission', 'We check and submit the application.'],
        ['Follow-up', 'We follow the application and prepare the interview if needed.'],
      ],
      stats: [
        { value: '98%', label: 'student visa success rate' },
        { value: '30+', label: 'successful immigration files' },
        { value: '5+', label: 'years of experience' },
        { value: '15+', label: 'destination countries' },
      ],
      contactOption: 'Visa and immigration',
    },
  },
  {
    slug: 'creation-entreprise',
    area: 'paperwork',
    faqCategory: 'business',
    image: '/images/photos/creation-entreprise.jpg',
    fr: {
      name: 'Création d’entreprise',
      action: 'Créer mon entreprise',
      title: 'Création d’entreprise, comptabilité et fiscalité',
      summary: 'Choix de la forme juridique, formalités, comptabilité et déclarations fiscales au Cameroun.',
      intro:
        'Que vous créiez votre société au Cameroun, en Chine ou en Amérique du Nord, nous vous accompagnons de l’idée au lancement, puis dans la gestion comptable et fiscale.',
      highlights: ['Entreprise individuelle, SARL, SA', 'Business plan', 'Comptabilité et impôts'],
      groups: [
        {
          title: 'Création de sociétés',
          items: [
            { title: 'Entreprise individuelle', desc: 'Création rapide et simplifiée pour les entrepreneurs indépendants.' },
            { title: 'SARL / LLC', desc: 'Société à responsabilité limitée avec protection juridique.' },
            { title: 'SA / Corporation', desc: 'Société anonyme pour les projets d’envergure.' },
            { title: 'Business plan et DSF', desc: 'Plans d’affaires et montage de dossiers.' },
          ],
        },
        {
          title: 'Comptabilité et fiscalité',
          items: [
            { title: 'Suivi comptable', desc: 'Tenue régulière de la comptabilité.' },
            { title: 'Conseil fiscal', desc: 'Optimisation fiscale et conseil stratégique.' },
            { title: 'Déclarations fiscales', desc: 'Préparation et dépôt auprès des impôts.' },
            { title: 'Structure adaptée', desc: 'La forme juridique qui vous avantage le plus.' },
          ],
        },
      ],
      steps: [
        ['Projet', 'Activité, associés et capital.'],
        ['Forme juridique', 'Nous vous conseillons la structure adaptée.'],
        ['Formalités', 'Statuts, immatriculation et numéro fiscal.'],
        ['Gestion', 'Comptabilité et déclarations au fil de l’année.'],
      ],
      contactOption: "Création d'entreprise et comptabilité",
    },
    en: {
      name: 'Business creation',
      action: 'Start my company',
      title: 'Business creation, accounting and tax',
      summary: 'Choice of legal structure, registration, accounting and tax returns in Cameroon.',
      intro:
        'Whether you are starting a company in Cameroon, China or North America, we support you from idea to launch, then with accounting and tax.',
      highlights: ['Sole trader, LLC, corporation', 'Business plan', 'Accounting and tax'],
      groups: [
        {
          title: 'Company formation',
          items: [
            { title: 'Sole proprietorship', desc: 'Fast, simple setup for independent entrepreneurs.' },
            { title: 'SARL / LLC', desc: 'Limited liability company with legal protection.' },
            { title: 'SA / Corporation', desc: 'For large-scale projects.' },
            { title: 'Business plan and DSF', desc: 'Business plans and application files.' },
          ],
        },
        {
          title: 'Accounting and tax',
          items: [
            { title: 'Bookkeeping', desc: 'Regular accounting.' },
            { title: 'Tax advice', desc: 'Tax optimisation and strategic advice.' },
            { title: 'Tax returns', desc: 'Preparation and filing with the tax office.' },
            { title: 'The right structure', desc: 'The legal form that benefits you most.' },
          ],
        },
      ],
      steps: [
        ['Project', 'Activity, partners and capital.'],
        ['Legal structure', 'We recommend the right structure.'],
        ['Formalities', 'Articles, registration and tax number.'],
        ['Management', 'Accounting and returns throughout the year.'],
      ],
      contactOption: 'Business creation and accounting',
    },
  },
  {
    slug: 'solutions-informatiques',
    area: 'digital',
    faqCategory: 'it',
    image: '/images/photos/solutions-it.jpg',
    fr: {
      name: 'Solutions informatiques',
      action: 'Équiper mon entreprise',
      title: 'Logiciels de gestion et sites web pour votre entreprise',
      summary: 'Logiciels SAGE, sites web, boutiques en ligne et formation de vos équipes.',
      intro:
        'Des logiciels de gestion aux sites web performants, nous digitalisons vos processus et formons vos équipes pour qu’elles en tirent le meilleur.',
      highlights: ['Partenaire SAGE', 'Sites web et e-commerce', 'Formation et assistance'],
      groups: [
        {
          title: 'Logiciels de gestion (partenaire SAGE)',
          items: [
            { title: 'SAGE Comptabilité', desc: 'Installation, paramétrage et personnalisation.' },
            { title: 'SAGE Paie', desc: 'Automatisation de la paie et gestion RH.' },
            { title: 'SAGE Gestion commerciale', desc: 'Ventes, stocks et relation client.' },
            { title: 'Formation et assistance', desc: 'Formation des utilisateurs et support continu.' },
          ],
        },
        {
          title: 'Développement web',
          items: [
            { title: 'Sites vitrines', desc: 'Sites professionnels livrés rapidement, dès 48 h.' },
            { title: 'E-commerce', desc: 'Boutiques en ligne avec paiement sécurisé.' },
            { title: 'Applications sur mesure', desc: 'Applications web adaptées à vos processus.' },
            { title: 'Maintenance', desc: 'Mises à jour et support technique réactif.' },
          ],
        },
      ],
      steps: [
        ['Diagnostic', 'Nous analysons vos besoins et vos outils actuels.'],
        ['Proposition', 'Solution, planning et prix.'],
        ['Mise en place', 'Installation, développement et paramétrage.'],
        ['Formation et suivi', 'Vos équipes sont formées, nous restons disponibles.'],
      ],
      contactOption: 'Solutions informatiques',
    },
    en: {
      name: 'IT solutions',
      action: 'Equip my business',
      title: 'Management software and websites for your business',
      summary: 'SAGE software, websites, online stores and training for your teams.',
      intro:
        'From management software to fast websites, we digitise your processes and train your teams to get the most out of them.',
      highlights: ['SAGE partner', 'Websites and e-commerce', 'Training and support'],
      groups: [
        {
          title: 'Management software (SAGE partner)',
          items: [
            { title: 'SAGE Accounting', desc: 'Installation, configuration and customisation.' },
            { title: 'SAGE Payroll', desc: 'Payroll automation and HR management.' },
            { title: 'SAGE Sales Management', desc: 'Sales, inventory and customer relations.' },
            { title: 'Training and support', desc: 'User training and ongoing assistance.' },
          ],
        },
        {
          title: 'Web development',
          items: [
            { title: 'Showcase websites', desc: 'Professional sites delivered fast, from 48 hours.' },
            { title: 'E-commerce', desc: 'Online stores with secure payments.' },
            { title: 'Custom applications', desc: 'Web apps built around your processes.' },
            { title: 'Maintenance', desc: 'Updates and responsive technical support.' },
          ],
        },
      ],
      steps: [
        ['Assessment', 'We review your needs and current tools.'],
        ['Proposal', 'Solution, schedule and price.'],
        ['Set-up', 'Installation, development and configuration.'],
        ['Training and support', 'Your teams are trained; we stay available.'],
      ],
      contactOption: 'IT solutions',
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const servicesByArea = (area: Area) => services.filter((s) => s.area === area);
export const contactOptions = (lang: Lang) => [
  ...services.map((s) => s[lang].contactOption),
  lang === 'fr' ? 'Autre demande' : 'Other request',
];
