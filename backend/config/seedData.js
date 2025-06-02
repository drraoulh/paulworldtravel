const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const PriceRate = require('../models/PriceRate');
const connectDB = require('./db');

// Services initiaux pour remplir la base de données
const servicesData = [
  {
    name: 'Cargo Aérien Chine-Afrique',
    description: 'Service de transport aérien rapide et fiable entre la Chine et divers pays d\'Afrique.',
    category: 'cargo',
    featured: true
  },
  {
    name: 'Cargo Maritime Chine-Canada',
    description: 'Transport maritime économique pour les marchandises volumineuses entre la Chine et le Canada.',
    category: 'cargo',
    featured: true
  },
  {
    name: 'Change Yuan-FCFA',
    description: 'Services de change de devises à des taux compétitifs pour les transactions entre la Chine et l\'Afrique.',
    category: 'currency',
    featured: true
  },
  {
    name: 'Conseils pour Achats en Chine',
    description: 'Assistance professionnelle pour trouver les meilleurs fournisseurs et produits en Chine.',
    category: 'consulting',
    featured: true
  },
  {
    name: 'Visa Étudiant',
    description: 'Assistance complète pour les demandes de visa étudiant pour l\'Europe, les USA et le Canada.',
    category: 'visa',
    featured: false
  },
  {
    name: 'Création de SARL',
    description: 'Services de création de société à responsabilité limitée au Cameroun avec suivi juridique.',
    category: 'business',
    featured: false
  },
  {
    name: 'Installation SAGE Comptable',
    description: 'Installation et paramétrage de logiciels SAGE Comptable pour les entreprises.',
    category: 'it',
    featured: false
  },
  {
    name: 'Licence d\'Importation',
    description: 'Obtention de licences d\'importation et gestion des formalités douanières.',
    category: 'customs',
    featured: false
  }
];

// Témoignages initiaux
const testimonialsData = [
  {
    name: 'Jean Durand',
    role: 'Directeur Commercial',
    company: 'Import Export SARL',
    content: 'Nous travaillons avec Paul World Travel depuis plus de 3 ans pour nos importations de Chine. Leur service est impeccable et les délais sont toujours respectés. Je recommande vivement leurs services à toute entreprise cherchant un partenaire fiable.',
    rating: 5,
    featured: true,
    language: 'fr'
  },
  {
    name: 'Marie Kouassi',
    role: 'Entrepreneure',
    company: 'Boutique Mode Afrique',
    content: 'Grâce à Paul World Travel, j\'ai pu établir des contacts solides avec des fournisseurs chinois pour ma boutique de mode. Leur connaissance du marché chinois est un atout inestimable pour les entrepreneurs africains.',
    rating: 5,
    featured: true,
    language: 'fr'
  },
  {
    name: 'Robert Chen',
    role: 'Étudiant',
    company: '',
    content: 'Le service d\'assistance pour l\'obtention de mon visa étudiant a été excellent. Toutes les démarches ont été facilitées et j\'ai pu commencer mes études au Canada sans aucun souci administratif.',
    rating: 5,
    featured: true,
    language: 'fr'
  },
  {
    name: 'Sophie Mbarga',
    role: 'Chef d\'entreprise',
    company: 'Mbarga Foods',
    content: 'Paul World Travel m\'a accompagnée dans la création de mon entreprise d\'import-export. Leur expertise en matière de réglementation douanière et de logistique a été déterminante dans le succès de mon projet.',
    rating: 4,
    featured: false,
    language: 'fr'
  }
];

// Données initiales pour les tarifs
const priceRatesData = [
  {
    serviceCategory: 'cargo',
    name: 'Fret aérien standard',
    description: 'Tarif standard pour l\'expédition de marchandises par voie aérienne.',
    basePrice: 15,
    unit: 'kg',
    currency: 'USD',
    additionalFactors: [
      {
        name: 'express',
        description: 'Livraison accélérée (2-3 jours)',
        multiplier: 1.5,
        fixedAmount: 0
      },
      {
        name: 'fragile',
        description: 'Marchandises fragiles nécessitant une manipulation spéciale',
        multiplier: 1.25,
        fixedAmount: 10
      },
      {
        name: 'assurance',
        description: 'Assurance complète de la marchandise',
        multiplier: 1.1,
        fixedAmount: 5
      }
    ]
  },
  {
    serviceCategory: 'cargo',
    name: 'Fret maritime conteneur 20 pieds',
    description: 'Tarif pour un conteneur standard de 20 pieds par voie maritime.',
    basePrice: 1200,
    unit: 'conteneur',
    currency: 'USD',
    additionalFactors: [
      {
        name: 'refrigere',
        description: 'Conteneur réfrigéré',
        multiplier: 1.4,
        fixedAmount: 0
      },
      {
        name: 'securise',
        description: 'Système de sécurité et de suivi renforcé',
        multiplier: 1.15,
        fixedAmount: 75
      }
    ]
  },
  {
    serviceCategory: 'currency',
    name: 'Change Yuan-FCFA',
    description: 'Taux de change pour la conversion Yuan vers FCFA.',
    basePrice: 85,
    unit: 'Yuan',
    currency: 'XAF',
    additionalFactors: [
      {
        name: 'volume',
        description: 'Volume important (>5000 Yuan)',
        multiplier: 0.98,
        fixedAmount: 0
      }
    ]
  },
  {
    serviceCategory: 'currency',
    name: 'Change USD-FCFA',
    description: 'Taux de change pour la conversion Dollar vers FCFA.',
    basePrice: 600,
    unit: 'USD',
    currency: 'XAF',
    additionalFactors: [
      {
        name: 'volume',
        description: 'Volume important (>1000 USD)',
        multiplier: 0.985,
        fixedAmount: 0
      }
    ]
  },
  {
    serviceCategory: 'consulting',
    name: 'Conseil achat standard',
    description: 'Service de conseil pour les achats en Chine.',
    basePrice: 300,
    unit: 'jour',
    currency: 'USD',
    additionalFactors: [
      {
        name: 'specialise',
        description: 'Expertise dans un domaine spécifique',
        multiplier: 1.2,
        fixedAmount: 0
      },
      {
        name: 'traduction',
        description: 'Service de traduction inclus',
        multiplier: 1,
        fixedAmount: 50
      }
    ]
  },
  {
    serviceCategory: 'visa',
    name: 'Assistance visa standard',
    description: 'Assistance pour les demandes de visa standard.',
    basePrice: 250,
    unit: 'demande',
    currency: 'USD',
    additionalFactors: [
      {
        name: 'urgent',
        description: 'Traitement accéléré de la demande',
        multiplier: 1.5,
        fixedAmount: 0
      },
      {
        name: 'complexe',
        description: 'Cas complexe nécessitant un suivi spécial',
        multiplier: 1.3,
        fixedAmount: 100
      }
    ]
  }
];

// Fonction pour initialiser la base de données
const seedDatabase = async () => {
  try {
    // Connexion à la base de données
    await connectDB();
    
    // Supprimer les services existants
    await Service.deleteMany({});
    console.log('Services supprimés');
    
    // Ajouter les nouveaux services
    await Service.insertMany(servicesData);
    console.log('Services ajoutés avec succès');
    
    // Supprimer les témoignages existants
    await Testimonial.deleteMany({});
    console.log('Témoignages supprimés');
    
    // Ajouter les nouveaux témoignages
    await Testimonial.insertMany(testimonialsData);
    console.log('Témoignages ajoutés avec succès');
    
    // Supprimer les tarifs existants
    await PriceRate.deleteMany({});
    console.log('Tarifs supprimés');
    
    // Ajouter les nouveaux tarifs
    await PriceRate.insertMany(priceRatesData);
    console.log('Tarifs ajoutés avec succès');
    
    process.exit();
  } catch (error) {
    console.error(`Erreur: ${error.message}`);
    process.exit(1);
  }
};

// Exécuter la fonction
seedDatabase();
