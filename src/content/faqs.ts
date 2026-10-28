// Frequently asked questions, in French and English, tagged by service.

export type Category = 'canada' | 'cargo' | 'currency' | 'visa' | 'consulting' | 'business' | 'it' | 'customs';

export interface FAQItem {
  category: Category;
  q: { fr: string; en: string };
  a: { fr: string; en: string };
}

export const faqs: FAQItem[] = [
  {
    category: 'canada',
    q: { fr: 'Puis-je envoyer des colis du Cameroun vers le Canada ?', en: 'Can I ship parcels from Cameroon to Canada?' },
    a: {
      fr: 'Oui. Nous expédions colis, effets personnels et marchandises de Douala et Yaoundé vers Montréal, Toronto et le reste du Canada, par fret maritime (groupage en conteneur) ou par fret aérien. Déposez votre envoi à notre bureau de Douala ou demandez une collecte.',
      en: 'Yes. We ship parcels, personal effects and goods from Douala and Yaoundé to Montreal, Toronto and the rest of Canada, by sea freight (container consolidation) or air freight. Drop your shipment at our Douala office or ask for a pickup.',
    },
  },
  {
    category: 'canada',
    q: { fr: "Comment est calculé le prix d'un envoi vers le Canada ?", en: 'How is the price of a shipment to Canada calculated?' },
    a: {
      fr: "En fret aérien, le prix dépend du poids : nous retenons le plus élevé entre le poids réel et le poids volumétrique. En fret maritime, il dépend du volume en mètres cubes. Envoyez-nous le contenu, le poids ou les dimensions et la ville d'arrivée : nous vous répondons avec un devis et la date du prochain départ.",
      en: 'For air freight, the price depends on weight: we use the higher of actual and volumetric weight. For sea freight, it depends on volume in cubic metres. Send us the contents, weight or dimensions and the arrival city: we reply with a quote and the next departure date.',
    },
  },
  {
    category: 'canada',
    q: { fr: 'Quels produits ne peut-on pas envoyer au Canada ?', en: 'What can’t be shipped to Canada?' },
    a: {
      fr: "Le Canada contrôle strictement l'entrée des aliments, plantes, semences, viandes, produits laitiers et produits d'origine animale : certains sont interdits, d'autres nécessitent un permis. Les armes, contrefaçons et médicaments sans ordonnance sont refusés. Avant chaque envoi, nous vérifions avec vous ce que vous souhaitez expédier.",
      en: 'Canada strictly controls food, plants, seeds, meat, dairy and animal products: some are prohibited, others need a permit. Weapons, counterfeit goods and unprescribed medicines are refused. Before each shipment, we check with you what you want to send.',
    },
  },
  {
    category: 'canada',
    q: { fr: 'Quels documents faut-il pour expédier vers le Canada ?', en: 'What documents do I need to ship to Canada?' },
    a: {
      fr: "Une pièce d'identité de l'expéditeur, les coordonnées complètes du destinataire au Canada et la liste détaillée du contenu avec la valeur de chaque article. Pour des marchandises destinées à la vente, une facture commerciale est nécessaire. Nous préparons la liste de colisage et la déclaration avec vous.",
      en: "The sender's ID, the recipient's full contact details in Canada and a detailed list of contents with the value of each item. Goods for sale also need a commercial invoice. We prepare the packing list and declaration with you.",
    },
  },
  {
    category: 'cargo',
    q: {
      fr: 'Quels sont les délais moyens pour un transport aérien entre la Chine et l’Afrique ?',
      en: 'What are the average lead times for air freight between China and Africa?',
    },
    a: {
      fr: 'Les délais moyens varient généralement entre 5 et 10 jours ouvrables, selon la destination et les procédures douanières. Des options express de 3 à 5 jours existent pour les envois urgents.',
      en: 'Lead times usually range from 5 to 10 business days, depending on the destination and customs procedures. Express options of 3 to 5 days are available for urgent shipments.',
    },
  },
  {
    category: 'cargo',
    q: {
      fr: 'Comment sont calculés les frais de transport pour les marchandises volumineuses ?',
      en: 'How are shipping costs calculated for bulky goods?',
    },
    a: {
      fr: 'Nous facturons selon le poids volumétrique ou le poids réel, le plus élevé des deux. Formule standard : Longueur × Largeur × Hauteur (cm) / 6000 = poids volumétrique en kg. Contactez-nous pour un devis personnalisé.',
      en: 'We charge by volumetric weight or actual weight, whichever is higher. Standard formula: Length × Width × Height (cm) / 6000 = volumetric weight in kg. Contact us for a tailored quote.',
    },
  },
  {
    category: 'currency',
    q: {
      fr: 'Quels sont vos taux de change pour le Yuan vers le FCFA ?',
      en: 'What are your Yuan to FCFA exchange rates?',
    },
    a: {
      fr: 'Nos taux sont mis à jour quotidiennement selon les marchés internationaux, avec des frais de service minimaux. Pour connaître le taux du jour, contactez-nous directement ou consultez notre application mobile qui affiche les taux en temps réel.',
      en: 'Our rates are updated daily based on international markets, with minimal service fees. For today’s rate, contact us directly or check our mobile app, which shows rates in real time.',
    },
  },
  {
    category: 'currency',
    q: {
      fr: 'Existe-t-il des limites pour les montants de change ?',
      en: 'Are there limits on exchange amounts?',
    },
    a: {
      fr: 'Pas de limite pour les petits montants. Au-delà de 5 000 USD (ou équivalent), des justificatifs peuvent être demandés conformément aux réglementations financières internationales. Des conditions spéciales s’appliquent aux très grandes transactions.',
      en: 'There is no limit for small amounts. Above USD 5,000 (or equivalent), supporting documents may be requested in line with international financial regulations. Special conditions apply to very large transactions.',
    },
  },
  {
    category: 'visa',
    q: {
      fr: 'Quels documents faut-il pour un visa étudiant au Canada ?',
      en: 'Which documents are needed for a Canadian student visa?',
    },
    a: {
      fr: 'Passeport valide, lettre d’acceptation d’un établissement canadien, preuve de moyens financiers, formulaires complétés, photos d’identité, certificat médical dans certains cas, et preuve de votre intention de quitter le Canada à la fin des études. Notre équipe vous guide à chaque étape.',
      en: 'A valid passport, an acceptance letter from a Canadian institution, proof of funds, completed application forms, ID photos, a medical certificate in some cases, and proof of your intent to leave Canada after your studies. Our team guides you through every step.',
    },
  },
  {
    category: 'visa',
    q: {
      fr: 'Combien de temps prend une demande de visa ?',
      en: 'How long does a visa application take?',
    },
    a: {
      fr: 'Cela dépend du type de visa et du pays. Comptez en général 2 à 8 semaines pour un visa étudiant ou touristique ; les visas d’affaires sont parfois plus rapides. Nous recommandons de commencer au moins 3 mois avant le départ.',
      en: 'It depends on the visa type and country. Allow 2 to 8 weeks for a student or tourist visa; business visas are sometimes faster. We recommend starting at least 3 months before departure.',
    },
  },
  {
    category: 'consulting',
    q: {
      fr: 'Comment m’aidez-vous à trouver des fournisseurs fiables en Chine ?',
      en: 'How do you help me find reliable suppliers in China?',
    },
    a: {
      fr: 'Notre équipe à Foshan dispose d’un vaste réseau de fournisseurs vérifiés. Nous évaluons leur capacité de production, leur qualité et leur fiabilité, organisons des visites d’usines, négocions les prix en votre nom et gérons la communication en chinois.',
      en: 'Our Foshan team has a broad network of vetted suppliers. We assess their production capacity, quality and reliability, arrange factory visits, negotiate prices on your behalf and handle communication in Chinese.',
    },
  },
  {
    category: 'business',
    q: {
      fr: 'Quelles sont les étapes pour créer une SARL au Cameroun ?',
      en: 'What are the steps to set up an LLC (SARL) in Cameroon?',
    },
    a: {
      fr: 'Rédaction des statuts, ouverture d’un compte bancaire et dépôt du capital, enregistrement au greffe du tribunal de commerce, obtention du numéro d’identification fiscale, publication d’un avis de constitution dans un journal d’annonces légales et inscription au registre du commerce. Nous vous accompagnons pour une création rapide et conforme.',
      en: 'Drafting the articles of association, opening a bank account and depositing the share capital, registering with the commercial court registry, obtaining a tax ID, publishing a notice of incorporation in a legal gazette, and registering with the trade register. We support you for a fast, compliant setup.',
    },
  },
  {
    category: 'it',
    q: {
      fr: 'Proposez-vous le développement de sites web ou d’applications ?',
      en: 'Do you offer website or app development?',
    },
    a: {
      fr: 'Oui : sites web professionnels, applications mobiles et logiciels de gestion, personnalisés selon vos besoins. Nous assurons aussi l’hébergement, la maintenance et le support technique.',
      en: 'Yes: professional websites, mobile apps and business management software, tailored to your needs. We also provide hosting, maintenance and technical support.',
    },
  },
  {
    category: 'customs',
    q: {
      fr: 'Comment se déroule le dédouanement des marchandises importées ?',
      en: 'How does customs clearance for imported goods work?',
    },
    a: {
      fr: 'Préparation et dépôt de la déclaration en douane, vérification des documents (facture commerciale, liste de colisage, certificat d’origine…), inspection éventuelle, paiement des droits et taxes, puis mainlevée. Nos experts gèrent chaque étape en limitant délais et coûts.',
      en: 'Preparing and filing the customs declaration, checking documents (commercial invoice, packing list, certificate of origin…), possible inspection, payment of duties and taxes, then release of goods. Our experts handle every step while keeping delays and costs down.',
    },
  },
];

