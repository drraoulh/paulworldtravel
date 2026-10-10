'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader, Section } from '@/components/ui';
import { useLanguage } from '@/contexts/LanguageContext';

type Category = 'cargo' | 'currency' | 'visa' | 'consulting' | 'business' | 'it' | 'customs';

interface FAQItem {
  category: Category;
  q: { fr: string; en: string };
  a: { fr: string; en: string };
}

const faqs: FAQItem[] = [
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

const copy = {
  fr: {
    eyebrow: 'Questions fréquentes',
    title: 'Les réponses à vos questions',
    intro: 'Cargo, change, visas, conseil, création d’entreprise et IT : l’essentiel en quelques lignes.',
    categories: {
      all: 'Toutes',
      cargo: 'Cargo',
      currency: 'Change',
      visa: 'Visas',
      consulting: 'Conseil et achats',
      business: 'Entreprise',
      it: 'IT',
      customs: 'Douane',
    },
    empty: 'Aucune question dans cette catégorie.',
    moreTitle: 'Vous avez d’autres questions ?',
    moreText: 'Notre équipe vous répond directement.',
    contact: 'Nous contacter',
  },
  en: {
    eyebrow: 'FAQ',
    title: 'Answers to your questions',
    intro: 'Cargo, currency exchange, visas, consulting, business creation and IT: the essentials in a few lines.',
    categories: {
      all: 'All',
      cargo: 'Cargo',
      currency: 'Exchange',
      visa: 'Visas',
      consulting: 'Consulting & sourcing',
      business: 'Business',
      it: 'IT',
      customs: 'Customs',
    },
    empty: 'No questions in this category.',
    moreTitle: 'Still have questions?',
    moreText: 'Our team will answer you directly.',
    contact: 'Contact us',
  },
};

const categoryOrder: Array<'all' | Category> = ['all', 'cargo', 'currency', 'visa', 'consulting', 'business', 'it', 'customs'];

export default function FAQ() {
  const { language } = useLanguage();
  const c = copy[language];
  const [active, setActive] = useState<'all' | Category>('all');

  const visible = active === 'all' ? faqs : faqs.filter((f) => f.category === active);

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="-mx-5 mb-10 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <div className="flex gap-2 sm:flex-wrap">
              {categoryOrder.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  aria-pressed={active === id}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                    active === id
                      ? 'border-accent bg-accent-soft text-accent'
                      : 'border-line text-muted hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {c.categories[id]}
                </button>
              ))}
            </div>
          </div>

          {visible.length > 0 ? (
            <div className="border-t border-line">
              {visible.map((f) => (
                <details key={f.q.fr} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <span className="text-lg font-medium text-foreground">{f.q[language]}</span>
                    <span aria-hidden="true" className="relative mt-1.5 h-4 w-4 shrink-0 text-accent">
                      <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="-mt-2 pb-6 pr-10 leading-relaxed text-muted">{f.a[language]}</p>
                </details>
              ))}
            </div>
          ) : (
            <p className="py-10 text-muted">{c.empty}</p>
          )}

          <p className="mt-12 text-muted">
            {c.moreTitle} {c.moreText}{' '}
            <Link href="/contact/" className="font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline">
              {c.contact} &rarr;
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
