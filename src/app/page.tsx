'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button, Container, Eyebrow, Section, SectionHeading } from '@/components/ui';

const copy = {
  fr: {
    eyebrow: 'Chine · Afrique · Amérique du Nord',
    title: 'Vos échanges entre la Chine, l’Afrique et l’Amérique du Nord, simplifiés.',
    intro:
      'Cargo, change de devises, achats en Chine, visas, création d’entreprise et solutions informatiques. Une seule équipe, de Douala à Foshan.',
    services: 'Nos services',
    heroAlt: 'Notre bureau à Douala, Cameroun',
    routesLabel: 'Nos routes',
    routes: [
      { place: 'Chine', detail: 'Bureau de Foshan, Guangdong — sourcing, achats, contrôle qualité' },
      { place: 'Afrique', detail: 'Siège à Douala, Cameroun — réception, dédouanement, suivi' },
      { place: 'Amérique du Nord', detail: 'Cargo et accompagnement pour vos projets outre-Atlantique' },
    ],
    servicesEyebrow: 'Services',
    servicesList: [
      { id: 'cargo', title: 'Cargo maritime et aérien', desc: 'Expédition de marchandises entre la Chine, l’Afrique et l’Amérique du Nord, par bateau ou par avion.' },
      { id: 'currency', title: 'Change de devises', desc: 'Conversion entre Yuan, FCFA et Dollars à des taux compétitifs.' },
      { id: 'purchasing', title: 'Achats et sourcing en Chine', desc: 'Recherche de fournisseurs, négociation des prix et contrôle qualité avant expédition.' },
      { id: 'business', title: 'Création d’entreprise', desc: 'Conseil et accompagnement pour créer et développer votre activité.' },
      { id: 'visa', title: 'Visas et immigration', desc: 'Assistance pour vos visas, démarches d’immigration et formalités administratives.' },
      { id: 'it', title: 'Solutions informatiques', desc: 'Sites web, outils et accompagnement numérique pour votre entreprise.' },
    ],
    processEyebrow: 'Notre méthode',
    processTitle: 'Un accompagnement clair, de la demande à la livraison.',
    steps: [
      { title: 'Échange', desc: 'Vous nous présentez votre besoin : produit, destination, délai ou démarche.' },
      { title: 'Proposition', desc: 'Nous vous adressons une solution chiffrée et transparente.' },
      { title: 'Exécution', desc: 'Nos équipes en Chine et au Cameroun gèrent achats, contrôle et expédition.' },
      { title: 'Suivi', desc: 'Vous êtes informé à chaque étape, jusqu’à la réception.' },
    ],
    officesEyebrow: 'Bureaux',
    officesTitle: 'Présents là où vos affaires se font.',
    hq: 'Siège',
    allLocations: 'Voir nos bureaux',
  },
  en: {
    eyebrow: 'China · Africa · North America',
    title: 'Trade between China, Africa and North America, made simple.',
    intro:
      'Cargo, currency exchange, purchasing in China, visas, business creation and IT solutions. One team, from Douala to Foshan.',
    services: 'Our services',
    heroAlt: 'Our office in Douala, Cameroon',
    routesLabel: 'Our routes',
    routes: [
      { place: 'China', detail: 'Foshan office, Guangdong — sourcing, purchasing, quality control' },
      { place: 'Africa', detail: 'Headquarters in Douala, Cameroon — reception, customs, follow-up' },
      { place: 'North America', detail: 'Cargo and support for your transatlantic projects' },
    ],
    servicesEyebrow: 'Services',
    servicesList: [
      { id: 'cargo', title: 'Sea and air cargo', desc: 'Shipping goods between China, Africa and North America, by sea or by air.' },
      { id: 'currency', title: 'Currency exchange', desc: 'Conversion between Yuan, FCFA and Dollars at competitive rates.' },
      { id: 'purchasing', title: 'Purchasing and sourcing in China', desc: 'Supplier search, price negotiation and quality control before shipment.' },
      { id: 'business', title: 'Business creation', desc: 'Advice and support to set up and grow your business.' },
      { id: 'visa', title: 'Visas and immigration', desc: 'Help with visas, immigration procedures and paperwork.' },
      { id: 'it', title: 'IT solutions', desc: 'Websites, tools and digital support for your company.' },
    ],
    processEyebrow: 'How we work',
    processTitle: 'Clear support, from request to delivery.',
    steps: [
      { title: 'Talk', desc: 'Tell us what you need: product, destination, timeline or procedure.' },
      { title: 'Proposal', desc: 'We send you a clear, transparent quote.' },
      { title: 'Execution', desc: 'Our teams in China and Cameroon handle purchasing, inspection and shipping.' },
      { title: 'Follow-up', desc: 'You are kept informed at every step, until delivery.' },
    ],
    officesEyebrow: 'Offices',
    officesTitle: 'Present where your business happens.',
    hq: 'Headquarters',
    allLocations: 'See our offices',
  },
};

export default function Home() {
  const { t, language } = useLanguage();
  const c = copy[language];

  const offices = [
    {
      badge: c.hq,
      name: t('locations.cameroon_office'),
      image: '/cameroon-office.jpg',
      alt: t('locations.cameroon_office_alt'),
      address: t('locations.cameroon_address'),
      phones: [
        { label: '+237 6 94 24 46 66', href: 'tel:+237694244666' },
        { label: '+237 6 96 96 46 76', href: 'tel:+237696964676' },
      ],
    },
    {
      badge: t('home.china.foshan'),
      name: t('locations.china_office'),
      image: '/china-office.jpg',
      alt: t('locations.china_office_alt'),
      address: t('locations.china_address'),
      phones: [{ label: '+86 190 6845 1378', href: 'tel:+8619068451378' }],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <Container className="grid items-center gap-12 pb-16 pt-16 sm:pb-24 sm:pt-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">{c.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{c.intro}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact/">
                {t('home.contact_button')}
                <FiArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/services/" variant="secondary">
                {c.services}
              </Button>
            </div>
            <p className="mt-8 text-sm italic text-muted">{t('home.slogan')}</p>
          </div>
          <div className="lg:col-span-5">
            <Image
              src="/cameroun1.jpg"
              alt={c.heroAlt}
              width={600}
              height={720}
              priority
              className="aspect-[4/3] w-full rounded-2xl object-cover lg:aspect-[5/6]"
            />
          </div>
        </Container>
      </section>

      {/* Routes */}
      <section className="border-b border-line">
        <Container>
          <h2 className="sr-only">{c.routesLabel}</h2>
          <dl className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {c.routes.map((r) => (
              <div key={r.place} className="py-8 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <dt className="text-2xl font-semibold tracking-tight text-foreground">{r.place}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{r.detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Services */}
      <Section id="services">
        <SectionHeading eyebrow={c.servicesEyebrow} title={t('home.services.title')} intro={t('home.services.description')} />
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {c.servicesList.map((s, i) => (
            <li key={s.id} className="bg-white">
              <Link href={`/services/#${s.id}`} className="group flex h-full flex-col p-6 transition-colors hover:bg-surface sm:p-8">
                <span className="text-xs font-medium text-muted">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-2 flex-grow text-sm leading-relaxed text-muted">{s.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  {t('home.services.learn_more')}
                  <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href="/services/" variant="link">
            {t('home.services.view_all')}
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Section>

      {/* China expertise */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={t('home.china.foshan')} title={t('home.china.services_title')} intro={t('home.china.services_subtitle')} />
            <Image
              src="/china-market.jpg"
              alt={t('home.china.operations_center')}
              width={600}
              height={400}
              className="aspect-[3/2] w-full rounded-2xl object-cover"
            />
          </div>
          <div className="lg:col-span-7">
            <dl className="divide-y divide-line border-y border-line">
              {[
                ['home.china.services.sourcing', 'home.china.services.sourcing_desc'],
                ['home.china.services.currency', 'home.china.services.currency_desc'],
                ['home.china.services.quality', 'home.china.services.quality_desc'],
                ['home.china.services.admin', 'home.china.services.admin_desc'],
              ].map(([title, desc]) => (
                <div key={title} className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-8">
                  <dt className="font-semibold text-foreground">{t(title)}</dt>
                  <dd className="leading-relaxed text-muted sm:col-span-2">{t(desc)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <Button href="/services/#china" variant="link">
                {t('home.china.discover_all')}
                <FiArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section muted>
        <SectionHeading eyebrow={c.processEyebrow} title={c.processTitle} />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {c.steps.map((step, i) => (
            <li key={step.title} className="border-t border-line pt-6">
              <span className="text-sm font-medium text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Offices */}
      <Section>
        <SectionHeading eyebrow={c.officesEyebrow} title={c.officesTitle} intro={t('home.cameroon.office_description')} />
        <div className="grid gap-8 md:grid-cols-2">
          {offices.map((o) => (
            <article key={o.name} className="rounded-2xl border border-line p-4 sm:p-6">
              <Image src={o.image} alt={o.alt} width={640} height={400} className="aspect-[16/10] w-full rounded-xl object-cover" />
              <div className="px-2 pb-2 pt-6">
                <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">{o.badge}</span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{o.name}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  <li className="flex items-start gap-3">
                    <FiMapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden />
                    <span>{o.address}</span>
                  </li>
                  {o.phones.map((p) => (
                    <li key={p.href} className="flex items-start gap-3">
                      <FiPhone className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden />
                      <a href={p.href} className="hover:text-foreground">{p.label}</a>
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <FiMail className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden />
                    <a href="mailto:paulworld2016@yahoo.com" className="hover:text-foreground">paulworld2016@yahoo.com</a>
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/locations/" variant="secondary">
            {c.allLocations}
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Section>

      {/* Closing CTA */}
      <section className="border-t border-line bg-surface">
        <Container className="flex flex-col items-start justify-between gap-8 py-20 sm:py-24 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{t('home.cta.title')}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{t('home.cta.subtitle')}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact/">
              {t('nav.contact_us')}
              <FiArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="tel:+237694244666" variant="secondary">
              <FiPhone className="h-4 w-4" aria-hidden />
              +237 6 94 24 46 66
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
