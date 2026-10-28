'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import RouteSelector from '@/components/RouteSelector';
import { ButtonLink, CheckItem, Container, SectionTitle, WHATSAPP_CM } from '@/components/site';
import { offices, hours } from '@/components/offices';

const copy = {
  fr: {
    heroLines: ['Vos marchandises,', 'de Foshan à Douala,', 'de Douala à Montréal.'],
    heroText:
      "Cargo maritime et aérien, achats en Chine, change de devises et visas. Une équipe à Douala et une équipe à Foshan s'occupent de votre envoi du départ à la livraison.",
    facts: [
      ['Douala', 'Notre siège, au cœur du premier port du Cameroun'],
      ['Foshan', 'Notre bureau en Chine, près des usines du Guangdong'],
      ['Montréal et Toronto', 'Destinations de notre fret depuis le Cameroun'],
    ],
    servicesTitle: 'Ce que nous faisons pour vous',
    servicesIntro: 'Chaque service peut être pris seul ou combiné : nous achetons, contrôlons, expédions et dédouanons pour vous.',
    services: [
      { id: 'cargo', title: 'Cargo Chine → Afrique', text: 'Conteneur complet, groupage ou fret aérien, avec dédouanement et livraison à Douala et Yaoundé.', image: 'cargo-maritime', big: true },
      { id: 'canada', title: 'Fret Cameroun → Canada', text: 'Colis, effets personnels et marchandises vers Montréal, Toronto et tout le Canada.', image: 'canada-montreal', big: true },
      { id: 'consulting', title: 'Achats en Chine', text: 'Recherche de fournisseurs, négociation et contrôle qualité à Foshan.', image: 'achats-entrepot' },
      { id: 'currency', title: 'Change de devises', text: 'Yuan, FCFA, Dollar et Euro pour payer vos fournisseurs.', image: 'change-devises' },
      { id: 'visa', title: 'Visas et immigration', text: 'Visa étudiant, affaires, résidence permanente.', image: 'visa-voyage' },
      { id: 'customs', title: 'Douane et transit', text: "Déclarations et licences d'importation au port de Douala.", image: 'douane-transit' },
      { id: 'business', title: "Création d'entreprise", text: 'Formalités, comptabilité et fiscalité au Cameroun.', image: 'creation-entreprise' , wide: true },
      { id: 'it', title: 'Solutions informatiques', text: 'Logiciels SAGE, sites web et formation.', image: 'solutions-it' , wide: true },
    ],
    allServices: 'Voir tous les services',
    stepsTitle: 'Comment se passe un envoi',
    steps: [
      ['Vous nous décrivez votre envoi', 'Contenu, poids ou volume, ville de départ et d’arrivée. Par le formulaire, par email ou sur WhatsApp.'],
      ['Nous vous envoyons un devis', 'Avec le mode de transport conseillé, le prix et la date du prochain départ.'],
      ['Nous prenons en charge vos marchandises', 'Réception, emballage, étiquetage et documents d’exportation.'],
      ['Vous recevez votre envoi', 'Après le dédouanement, livraison ou retrait. Nous vous informons à chaque étape.'],
    ],
    officesTitle: 'Deux bureaux, une seule équipe',
    officesIntro: 'Vous pouvez nous rendre visite ou nous appeler dans les deux pays.',
    hoursTitle: 'Horaires',
    map: 'Voir sur la carte',
    ctaTitle: 'Vous avez un envoi à préparer ?',
    ctaText: 'Décrivez-le en quelques lignes : nous vous répondons avec un devis sous 24 h ouvrées.',
    ctaQuote: 'Demander un devis',
    ctaWhatsapp: 'Écrire sur WhatsApp',
  },
  en: {
    heroLines: ['Your goods,', 'from Foshan to Douala,', 'from Douala to Montreal.'],
    heroText:
      'Sea and air cargo, purchasing in China, currency exchange and visas. One team in Douala and one in Foshan handle your shipment from departure to delivery.',
    facts: [
      ['Douala', 'Our head office, in Cameroon’s main port city'],
      ['Foshan', 'Our office in China, close to Guangdong’s factories'],
      ['Montreal and Toronto', 'Where our freight from Cameroon arrives'],
    ],
    servicesTitle: 'What we do for you',
    servicesIntro: 'Use one service or combine them: we buy, inspect, ship and clear customs for you.',
    services: [
      { id: 'cargo', title: 'Cargo China → Africa', text: 'Full container, consolidation or air freight, with customs clearance and delivery to Douala and Yaoundé.', image: 'cargo-maritime', big: true },
      { id: 'canada', title: 'Freight Cameroon → Canada', text: 'Parcels, personal effects and goods to Montreal, Toronto and all of Canada.', image: 'canada-montreal', big: true },
      { id: 'consulting', title: 'Purchasing in China', text: 'Supplier search, negotiation and quality control in Foshan.', image: 'achats-entrepot' },
      { id: 'currency', title: 'Currency exchange', text: 'Yuan, FCFA, Dollar and Euro to pay your suppliers.', image: 'change-devises' },
      { id: 'visa', title: 'Visas and immigration', text: 'Student and business visas, permanent residence.', image: 'visa-voyage' },
      { id: 'customs', title: 'Customs and transit', text: 'Declarations and import licences at the port of Douala.', image: 'douane-transit' },
      { id: 'business', title: 'Business creation', text: 'Registration, accounting and tax in Cameroon.', image: 'creation-entreprise' , wide: true },
      { id: 'it', title: 'IT solutions', text: 'SAGE software, websites and training.', image: 'solutions-it' , wide: true },
    ],
    allServices: 'See all services',
    stepsTitle: 'How a shipment works',
    steps: [
      ['You describe your shipment', 'Contents, weight or volume, departure and arrival cities. Through the form, by email or on WhatsApp.'],
      ['We send you a quote', 'With the recommended transport mode, the price and the next departure date.'],
      ['We take charge of your goods', 'Receiving, packing, labelling and export paperwork.'],
      ['You receive your shipment', 'After customs clearance, delivery or pickup. We keep you informed at each stage.'],
    ],
    officesTitle: 'Two offices, one team',
    officesIntro: 'Visit or call us in either country.',
    hoursTitle: 'Opening hours',
    map: 'View on the map',
    ctaTitle: 'Have a shipment to prepare?',
    ctaText: 'Describe it in a few lines: we reply with a quote within one business day.',
    ctaQuote: 'Get a quote',
    ctaWhatsapp: 'Message us on WhatsApp',
  },
};

export default function Home() {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/photos/port-conteneurs.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/85 to-night/30" />
        <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <h1 className="display hero-title text-[2.1rem] sm:text-5xl xl:text-[3.5rem]">
              {c.heroLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </h1>
            <p className="mt-8 max-w-xl text-lg text-blue-100 sm:text-xl">{c.heroText}</p>
          </div>
          <div className="flex lg:col-span-5 lg:justify-end">
            <RouteSelector />
          </div>
        </Container>
      </section>

      {/* Where we are */}
      <section className="border-b border-rule bg-white">
        <Container className="grid divide-y divide-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {c.facts.map(([place, text]) => (
            <div key={place} className="py-6 sm:px-6 sm:first:pl-0">
              <p className="heading text-xl text-night">{place}</p>
              <p className="mt-1 text-slate">{text}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Services */}
      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <SectionTitle title={c.servicesTitle} intro={c.servicesIntro} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.services.map((s) => (
              <Link
                key={s.id}
                href={`/services/#${s.id}`}
                className={`group relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-lg p-6 text-white ${
                  s.big ? 'sm:col-span-2 lg:min-h-96' : s.wide ? 'sm:col-span-2' : ''
                }`}
              >
                <Image
                  src={`/images/photos/${s.image}.jpg`}
                  alt=""
                  fill
                  sizes={s.big || s.wide ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
                  className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/60 to-transparent" />
                <h3 className={`heading ${s.big ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{s.title}</h3>
                <p className="mt-2 max-w-md text-blue-100">{s.text}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/services/" className="font-bold text-ocean underline-offset-4 hover:underline">
              {c.allServices}
            </Link>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionTitle title={c.stepsTitle} />
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {c.steps.map(([title, text], i) => (
              <li key={title} className="border-t-4 border-ocean pt-5">
                <span className="display text-4xl text-sky">{i + 1}</span>
                <p className="heading mt-3 text-lg text-night">{title}</p>
                <p className="mt-2 text-slate">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Offices */}
      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <SectionTitle title={c.officesTitle} intro={c.officesIntro} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {offices.map((o) => (
              <article key={o.id} className="overflow-hidden rounded-lg bg-white">
                <div className="relative h-56">
                  <Image src={o.image} alt={o.imageAlt[language]} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-bold text-ocean">{o.role[language]}</p>
                  <h3 className="display mt-1 text-3xl text-night">{o.city}</h3>
                  <p className="mt-3 text-slate">{o.address[language]}</p>
                  <ul className="mt-4 space-y-1">
                    {o.phones.map((p) => (
                      <li key={p.href}><a href={p.href} className="font-semibold text-night hover:text-ocean">{p.label}</a></li>
                    ))}
                  </ul>
                  <a href={o.map} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-bold text-ocean underline-offset-4 hover:underline">
                    {c.map}
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-lg bg-white p-6">
            <p className="heading text-night">{c.hoursTitle}</p>
            <ul className="mt-2 grid gap-1 text-slate sm:grid-cols-3">
              {hours[language].map((h) => <li key={h}>{h}</li>)}
            </ul>
          </div>
        </Container>
      </section>

      {/* Closing call to action */}
      <section className="bg-night py-16 text-white sm:py-20">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display text-3xl sm:text-5xl">{c.ctaTitle}</h2>
            <p className="mt-4 text-lg text-blue-100">{c.ctaText}</p>
            <ul className="mt-6 space-y-2 text-blue-100">
              <CheckItem light>paulworld2016@yahoo.com</CheckItem>
              <CheckItem light>+237 6 94 24 46 66</CheckItem>
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact/">{c.ctaQuote}</ButtonLink>
            <ButtonLink href={WHATSAPP_CM} variant="outline">{c.ctaWhatsapp}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
