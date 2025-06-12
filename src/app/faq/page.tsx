'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

// Interface pour le type de FAQ
interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQ() {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Données des FAQ
  const faqs: FAQItem[] = [
    // Services de cargo
    {
      question: 'Quels sont les délais moyens pour un transport aérien entre la Chine et l\'Afrique ?',
      answer: 'Les délais moyens pour un transport aérien entre la Chine et l\'Afrique varient généralement entre 5 et 10 jours ouvrables, en fonction de la destination précise et des procédures douanières. Nous offrons également des options express avec des délais de 3 à 5 jours pour les envois urgents.',
      category: 'cargo'
    },
    {
      question: 'Comment sont calculés les frais de transport pour les marchandises volumineuses ?',
      answer: 'Les frais de transport pour les marchandises volumineuses sont calculés en fonction du poids volumétrique (dimension) ou du poids réel, selon celui qui est le plus élevé. Nous utilisons la formule standard de l\'industrie : Longueur x Largeur x Hauteur (en cm) / 6000 = poids volumétrique en kg. Contactez-nous pour obtenir un devis personnalisé.',
      category: 'cargo'
    },
    // Change de devises
    {
      question: 'Quels sont vos taux de change pour le Yuan vers le FCFA ?',
      answer: 'Nos taux de change sont mis à jour quotidiennement en fonction des marchés internationaux. Nous nous efforçons de proposer les taux les plus compétitifs avec des frais de service minimaux. Pour connaître le taux actuel du Yuan vers le FCFA, veuillez nous contacter directement ou consulter notre application mobile qui affiche les taux en temps réel.',
      category: 'currency'
    },
    {
      question: 'Existe-t-il des limites pour les montants de change ?',
      answer: 'Pour les petits montants, il n\'y a généralement pas de limite. Pour les transactions importantes (supérieures à 5000 USD ou équivalent), nous pouvons vous demander de fournir des documents justificatifs conformément aux réglementations financières internationales. Des conditions spéciales peuvent s\'appliquer pour les très grandes transactions.',
      category: 'currency'
    },
    // Visas
    {
      question: 'Quels sont les documents nécessaires pour une demande de visa étudiant au Canada ?',
      answer: 'Pour une demande de visa étudiant au Canada, vous aurez besoin des documents suivants : passeport valide, lettre d\'acceptation d\'un établissement d\'enseignement canadien, preuve de moyens financiers, formulaires de demande complétés, photos d\'identité, certificat médical dans certains cas, et preuve de votre intention de quitter le Canada à la fin de vos études. Notre équipe vous guidera à travers chaque étape du processus.',
      category: 'visa'
    },
    {
      question: 'Combien de temps prend le processus de demande de visa ?',
      answer: 'Le délai de traitement varie en fonction du type de visa et du pays de destination. En général, il faut compter entre 2 et 8 semaines pour un visa étudiant ou touristique. Les visas d\'affaires peuvent être traités plus rapidement dans certains cas. Nous recommandons de commencer le processus au moins 3 mois avant votre date de départ prévue.',
      category: 'visa'
    },
    // Conseils et achats
    {
      question: 'Comment pouvez-vous m\'aider à trouver des fournisseurs fiables en Chine ?',
      answer: 'Notre équipe basée à Foshan dispose d\'un vaste réseau de fournisseurs vérifiés dans différents secteurs industriels. Nous effectuons une évaluation rigoureuse des fournisseurs, vérifions leur capacité de production, leur qualité et leur fiabilité. Nous pouvons organiser des visites d\'usines, négocier les prix en votre nom et gérer la communication en chinois. Notre objectif est de vous connecter avec des partenaires commerciaux fiables adaptés à vos besoins spécifiques.',
      category: 'consulting'
    },
    // Création d'entreprise
    {
      question: 'Quelles sont les étapes pour créer une SARL au Cameroun ?',
      answer: 'La création d\'une SARL au Cameroun implique plusieurs étapes : rédaction des statuts de l\'entreprise, ouverture d\'un compte bancaire et dépôt du capital social, enregistrement auprès du greffe du tribunal de commerce, obtention d\'un numéro d\'identification fiscale, publication d\'un avis de constitution dans un journal d\'annonces légales, et inscription au registre du commerce. Notre équipe peut vous accompagner tout au long de ce processus pour assurer une création rapide et conforme à la législation camerounaise.',
      category: 'business'
    },
    // Solutions IT
    {
      question: 'Proposez-vous des services de développement de sites web ou d\'applications ?',
      answer: 'Oui, nous proposons une gamme complète de services informatiques, y compris le développement de sites web professionnels, d\'applications mobiles et de logiciels de gestion d\'entreprise. Nos solutions sont personnalisées pour répondre aux besoins spécifiques de votre entreprise. Nous offrons également des services d\'hébergement, de maintenance et de support technique pour assurer le bon fonctionnement de vos outils numériques.',
      category: 'it'
    },
    // Douane
    {
      question: 'Comment se déroule le processus de dédouanement des marchandises importées ?',
      answer: 'Le processus de dédouanement comprend la préparation et la soumission de la déclaration en douane, la vérification des documents (facture commerciale, liste de colisage, certificat d\'origine, etc.), l\'inspection possible des marchandises, le paiement des droits et taxes d\'importation, et enfin la mainlevée des marchandises. Notre équipe d\'experts en douane s\'occupe de toutes ces étapes pour vous, en veillant à la conformité et en minimisant les délais et les coûts.',
      category: 'customs'
    }
  ];

  // Catégories de FAQ
  const categories = [
    { id: 'all', name: t('faq.category_all') },
    { id: 'cargo', name: t('faq.category_cargo') },
    { id: 'currency', name: t('faq.category_currency') },
    { id: 'visa', name: t('faq.category_visa') },
    { id: 'consulting', name: t('faq.category_consulting') },
    { id: 'business', name: t('faq.category_business') },
    { id: 'it', name: t('faq.category_it') },
    { id: 'customs', name: t('faq.category_customs') }
  ];

  // Filtrer les FAQs par catégorie
  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  // Basculer l'affichage de la réponse
  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">{t('faq.title')}</h1>
            <p className="text-xl">{t('faq.subtitle')}</p>
          </div>
        </section>
        
        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Catégories */}
            <div className="mb-12 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category.id
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Questions et réponses */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-5 focus:outline-none bg-white hover:bg-gray-50"
                    onClick={() => toggleAnswer(index)}
                  >
                    <span className="text-lg font-medium text-gray-900 text-left">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-blue-700 transform ${activeIndex === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {activeIndex === index && (
                    <div className="p-5 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredFaqs.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-600">{t('faq.no_questions')}</p>
                </div>
              )}
            </div>
            
            {/* Contact pour plus de questions */}
            <div className="mt-16 text-center bg-blue-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('faq.more_questions')}</h3>
              <p className="text-gray-600 mb-6">{t('faq.contact_description')}</p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
              >
                {t('nav.contact_us')}
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
