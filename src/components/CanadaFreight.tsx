'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

// Freight service Cameroon → Canada, styled like the other blocks of the services page.

const copy = {
  fr: {
    title: 'Fret Cameroun → Canada',
    badge: 'Nouveau service',
    route: 'Douala · Yaoundé → Montréal · Toronto · tout le Canada',
    intro:
      "Envoyez vos colis, effets personnels et marchandises du Cameroun vers le Canada. Nous collectons ou réceptionnons vos envois à Douala et Yaoundé, préparons les documents d'exportation et suivons votre envoi jusqu'à sa remise au Canada.",
    seaTitle: 'Fret maritime (groupage)',
    sea: [
      'Idéal pour les envois lourds ou volumineux : cartons, fûts, effets personnels, déménagements',
      'Groupage en conteneur au départ du Port autonome de Douala',
      'Tarif calculé au volume (m³), dégressif selon la quantité',
      'Arrivée dans un port canadien puis acheminement vers votre ville',
    ],
    airTitle: 'Fret aérien',
    air: [
      'Pour les colis urgents, documents et petites marchandises',
      'Départ de Douala ou Yaoundé, arrivée à Montréal ou Toronto',
      'Tarif calculé au kilo (poids réel ou volumétrique)',
      'Le délai le plus court pour vos envois prioritaires',
    ],
    stepsTitle: 'Comment se passe un envoi',
    steps: [
      ['Demande de devis', 'Indiquez le contenu, le poids ou les dimensions et la ville d’arrivée. Nous vous répondons avec un prix et le prochain départ.'],
      ['Dépôt ou collecte', 'Vous déposez votre envoi à notre bureau de Douala ou nous organisons la collecte.'],
      ['Emballage et documents', 'Nous vérifions, pesons et étiquetons vos colis, puis préparons la liste de colisage et la déclaration.'],
      ['Transport et suivi', 'Votre envoi part par mer ou par air. Nous vous tenons informé à chaque étape.'],
      ['Dédouanement et remise', 'Après le passage en douane canadienne, votre envoi est remis au destinataire ou disponible au retrait.'],
    ],
    docsTitle: 'Documents à préparer',
    docs: [
      "Pièce d'identité de l'expéditeur et coordonnées complètes du destinataire au Canada",
      'Liste détaillée du contenu avec la valeur de chaque article',
      'Facture commerciale pour les marchandises destinées à la vente',
      'Certificats ou permis pour les produits réglementés, lorsque requis',
    ],
    rulesTitle: 'Produits réglementés ou interdits',
    rules:
      "Le Canada contrôle strictement l'entrée des aliments, plantes, semences, viandes, produits laitiers et produits d'origine animale. Certains sont interdits, d'autres nécessitent un permis. Les armes, contrefaçons et médicaments sans ordonnance sont refusés. Avant chaque envoi, nous vérifions avec vous ce qui peut être expédié.",
    note: 'Délais et tarifs selon le mode de transport et la date de départ : communiqués avec votre devis.',
    cta: 'Demander un devis Cameroun → Canada',
    whatsapp: 'Écrire sur WhatsApp',
    imageAlt: 'Centre-ville de Toronto, Canada',
  },
  en: {
    title: 'Freight Cameroon → Canada',
    badge: 'New service',
    route: 'Douala · Yaoundé → Montreal · Toronto · all of Canada',
    intro:
      'Ship parcels, personal effects and goods from Cameroon to Canada. We collect or receive your shipments in Douala and Yaoundé, prepare the export paperwork and track your shipment until it is delivered in Canada.',
    seaTitle: 'Sea freight (consolidation)',
    sea: [
      'Best for heavy or bulky shipments: boxes, barrels, personal effects, relocations',
      'Container consolidation from the Port of Douala',
      'Priced by volume (m³), with lower rates for larger shipments',
      'Arrival at a Canadian port, then forwarding to your city',
    ],
    airTitle: 'Air freight',
    air: [
      'For urgent parcels, documents and small goods',
      'From Douala or Yaoundé to Montreal or Toronto',
      'Priced per kilo (actual or volumetric weight)',
      'The fastest option for priority shipments',
    ],
    stepsTitle: 'How a shipment works',
    steps: [
      ['Quote request', 'Tell us the contents, weight or dimensions and the arrival city. We reply with a price and the next departure.'],
      ['Drop-off or pickup', 'Drop your shipment at our Douala office or we arrange a pickup.'],
      ['Packing and paperwork', 'We check, weigh and label your parcels, then prepare the packing list and declaration.'],
      ['Transport and tracking', 'Your shipment leaves by sea or air. We keep you informed at each stage.'],
      ['Customs and delivery', 'Once cleared by Canadian customs, your shipment is delivered or ready for pickup.'],
    ],
    docsTitle: 'Documents to prepare',
    docs: [
      "Sender's ID and full contact details of the recipient in Canada",
      'Detailed list of contents with the value of each item',
      'Commercial invoice for goods intended for sale',
      'Certificates or permits for regulated products, when required',
    ],
    rulesTitle: 'Regulated or prohibited items',
    rules:
      'Canada strictly controls food, plants, seeds, meat, dairy and animal products. Some are prohibited, others need a permit. Weapons, counterfeit goods and unprescribed medicines are refused. Before each shipment, we check with you what can be sent.',
    note: 'Transit times and prices depend on the transport mode and departure date: they come with your quote.',
    cta: 'Get a Cameroon → Canada quote',
    whatsapp: 'Message us on WhatsApp',
    imageAlt: 'Downtown Toronto, Canada',
  },
};

const Check = () => (
  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function CanadaFreight() {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <>
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{c.title}</h2>
        <span className="ml-3 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">{c.badge}</span>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="lg:flex">
          <div className="lg:w-1/3 relative">
            <div className="h-60 lg:h-full relative">
              <Image src="/images/photos/canada-toronto.jpg" alt={c.imageAlt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl font-bold">{c.title}</h3>
              <p>{c.route}</p>
            </div>
          </div>

          <div className="lg:w-2/3 p-8">
            <p className="text-gray-700 mb-8 leading-relaxed">{c.intro}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                [c.seaTitle, c.sea],
                [c.airTitle, c.air],
              ].map(([title, items]) => (
                <div key={title as string} className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">{title as string}</h3>
                  <ul className="space-y-3">
                    {(items as string[]).map((item) => (
                      <li key={item} className="flex items-start">
                        <Check />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 p-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-900">{c.stepsTitle}</h3>
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {c.steps.map(([title, text], i) => (
              <li key={title}>
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white">{i + 1}</div>
                <p className="font-semibold text-gray-900 mb-1">{title}</p>
                <p className="text-sm text-gray-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 p-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-800">{c.docsTitle}</h3>
            <ul className="space-y-3">
              {c.docs.map((item) => (
                <li key={item} className="flex items-start">
                  <Check />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-6">
            <h3 className="text-lg font-semibold mb-3 text-amber-800">{c.rulesTitle}</h3>
            <p className="text-gray-700">{c.rules}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">{c.note}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact/"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition-colors"
            >
              {c.cta}
            </Link>
            <a
              href="https://wa.me/237694244666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-green-600 text-green-700 hover:bg-green-50 font-medium py-2 px-5 rounded-lg transition-colors"
            >
              {c.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
