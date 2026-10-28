'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

// Home page blocks: the Canada freight highlight and an overview of every service.

const services = {
  fr: [
    { id: 'cargo', title: 'Cargo Chine → Afrique', text: 'Fret maritime en conteneur ou en groupage et fret aérien, avec dédouanement et livraison.', image: 'cargo-maritime' },
    { id: 'canada', title: 'Fret Cameroun → Canada', text: 'Colis, effets personnels et marchandises de Douala et Yaoundé vers Montréal, Toronto et tout le Canada.', image: 'canada-montreal' },
    { id: 'consulting', title: 'Achats en Chine', text: 'Recherche de fournisseurs, négociation, contrôle qualité et regroupement de vos commandes à Foshan.', image: 'achats-entrepot' },
    { id: 'currency', title: 'Change de devises', text: 'Conversion Yuan, FCFA, Dollar et Euro pour payer vos fournisseurs et vos frais à l’étranger.', image: 'change-devises' },
    { id: 'visa', title: 'Visas et immigration', text: 'Visa étudiant, visa affaires, résidence permanente : constitution et suivi de votre dossier.', image: 'visa-voyage' },
    { id: 'business', title: 'Création d’entreprise', text: 'Choix de la forme juridique, formalités, comptabilité et déclarations fiscales au Cameroun.', image: 'creation-entreprise' },
    { id: 'it', title: 'Solutions informatiques', text: 'Logiciels SAGE, sites web, boutiques en ligne et formation de vos équipes.', image: 'solutions-it' },
    { id: 'customs', title: 'Douane et transit', text: 'Déclarations, licences d’importation et transit de vos marchandises au port de Douala.', image: 'douane-transit' },
  ],
  en: [
    { id: 'cargo', title: 'Cargo China → Africa', text: 'Sea freight by full container or consolidation and air freight, with customs clearance and delivery.', image: 'cargo-maritime' },
    { id: 'canada', title: 'Freight Cameroon → Canada', text: 'Parcels, personal effects and goods from Douala and Yaoundé to Montreal, Toronto and all of Canada.', image: 'canada-montreal' },
    { id: 'consulting', title: 'Purchasing in China', text: 'Supplier search, negotiation, quality control and consolidation of your orders in Foshan.', image: 'achats-entrepot' },
    { id: 'currency', title: 'Currency exchange', text: 'Yuan, FCFA, Dollar and Euro conversion to pay your suppliers and expenses abroad.', image: 'change-devises' },
    { id: 'visa', title: 'Visas and immigration', text: 'Student visa, business visa, permanent residence: we prepare and follow up your application.', image: 'visa-voyage' },
    { id: 'business', title: 'Business creation', text: 'Choice of legal structure, registration, accounting and tax returns in Cameroon.', image: 'creation-entreprise' },
    { id: 'it', title: 'IT solutions', text: 'SAGE software, websites, online stores and training for your teams.', image: 'solutions-it' },
    { id: 'customs', title: 'Customs and transit', text: 'Declarations, import licences and transit of your goods through the port of Douala.', image: 'douane-transit' },
  ],
};

const copy = {
  fr: {
    servicesTitle: 'Nos services',
    servicesSubtitle: 'Du transport de vos marchandises à vos démarches administratives, une seule équipe entre le Cameroun, la Chine et l’Amérique du Nord.',
    more: 'En savoir plus',
    canadaBadge: 'Nouveau',
    canadaTitle: 'Envoyez vos colis du Cameroun vers le Canada',
    canadaText:
      'Fret maritime pour les envois volumineux et fret aérien pour les colis urgents. Nous préparons les documents, vérifions ce qui peut être expédié et suivons votre envoi jusqu’à sa remise au Canada.',
    canadaPoints: ['Dépôt ou collecte à Douala et Yaoundé', 'Tarif au kilo (aérien) ou au m³ (maritime)', 'Livraison à Montréal, Toronto et partout au Canada'],
    canadaCta: 'Voir le service et demander un devis',
  },
  en: {
    servicesTitle: 'Our services',
    servicesSubtitle: 'From shipping your goods to handling your paperwork: one team between Cameroon, China and North America.',
    more: 'Learn more',
    canadaBadge: 'New',
    canadaTitle: 'Ship your parcels from Cameroon to Canada',
    canadaText:
      'Sea freight for bulky shipments and air freight for urgent parcels. We prepare the paperwork, check what can be shipped and track your shipment until it is delivered in Canada.',
    canadaPoints: ['Drop-off or pickup in Douala and Yaoundé', 'Priced per kilo (air) or per m³ (sea)', 'Delivery to Montreal, Toronto and anywhere in Canada'],
    canadaCta: 'See the service and get a quote',
  },
};

export function CanadaHighlight() {
  const { language } = useLanguage();
  const c = copy[language];
  return (
    <section className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-xl lg:flex">
          <div className="relative h-56 lg:h-auto lg:w-2/5">
            <Image src="/images/photos/canada-montreal.jpg" alt="Montréal, Canada" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="p-6 sm:p-10 lg:w-3/5">
            <span className="inline-block rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-blue-900 mb-4">{c.canadaBadge}</span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{c.canadaTitle}</h2>
            <p className="text-blue-100 mb-5">{c.canadaText}</p>
            <ul className="space-y-2 mb-6">
              {c.canadaPoints.map((point) => (
                <li key={point} className="flex items-start">
                  <svg className="h-5 w-5 text-yellow-300 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link href="/services/#canada" className="inline-flex items-center bg-white text-blue-700 px-5 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-md">
              {c.canadaCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesOverview() {
  const { language } = useLanguage();
  const c = copy[language];
  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{c.servicesTitle}</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">{c.servicesSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services[language].map((s) => (
            <Link key={s.id} href={`/services/#${s.id}`} className="group bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-blue-600 flex flex-col">
              <div className="relative h-40">
                <Image src={`/images/photos/${s.image}.jpg`} alt={s.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">{s.text}</p>
                <span className="text-sm font-medium text-blue-600 group-hover:underline">{c.more}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
