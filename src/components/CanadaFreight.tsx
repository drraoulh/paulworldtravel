'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { ButtonLink, CheckItem, WHATSAPP_CM } from './site';

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

export default function CanadaFreight() {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="inline-block rounded-md bg-container px-3 py-1 text-sm font-bold text-night">{c.badge}</p>
          <h2 className="display mt-4 text-4xl text-night sm:text-5xl">{c.title}</h2>
          <p className="heading mt-3 text-lg text-ocean">{c.route}</p>
          <p className="mt-5 text-lg text-slate">{c.intro}</p>
          <div className="relative mt-8 h-72 overflow-hidden rounded-lg">
            <Image src="/images/photos/canada-toronto.jpg" alt={c.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {([
              [c.seaTitle, c.sea],
              [c.airTitle, c.air],
            ] as [string, string[]][]).map(([title, items]) => (
              <div key={title} className="rounded-lg border-t-4 border-ocean bg-white p-6">
                <h3 className="heading text-xl text-night">{title}</h3>
                <ul className="mt-4 space-y-3 text-slate">
                  {items.map((item) => <CheckItem key={item}>{item}</CheckItem>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-white p-6">
            <h3 className="heading text-xl text-night">{c.stepsTitle}</h3>
            <ol className="mt-5 space-y-4">
              {c.steps.map(([title, text], i) => (
                <li key={title} className="flex gap-4">
                  <span className="display flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-night text-base text-white">{i + 1}</span>
                  <div>
                    <p className="font-bold text-night">{title}</p>
                    <p className="text-slate">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6">
              <h3 className="heading text-lg text-night">{c.docsTitle}</h3>
              <ul className="mt-4 space-y-3 text-slate">
                {c.docs.map((item) => <CheckItem key={item}>{item}</CheckItem>)}
              </ul>
            </div>
            <div className="rounded-lg border-l-4 border-container bg-amber-50 p-6">
              <h3 className="heading text-lg text-night">{c.rulesTitle}</h3>
              <p className="mt-3 text-slate">{c.rules}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate">{c.note}</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/contact/?service=${encodeURIComponent(language === 'fr' ? 'Fret Cameroun → Canada' : 'Freight Cameroon → Canada')}`}>{c.cta}</ButtonLink>
              <a href={WHATSAPP_CM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md border-2 border-night px-6 py-3 font-bold text-night transition-colors hover:bg-night hover:text-white">
                {c.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
