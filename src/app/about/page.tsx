'use client';

import Image from 'next/image';
import { Button, Eyebrow, PageHeader, Section, SectionHeading } from '@/components/ui';
import { useLanguage } from '@/contexts/LanguageContext';

const copy = {
  fr: {
    eyebrow: 'À propos',
    title: 'Votre partenaire pour les affaires internationales',
    intro:
      'Paul World Travel relie l’Afrique, la Chine et l’Amérique du Nord : logistique, change, conseil, visas, création d’entreprise et solutions IT, sous un même toit.',
    storyEyebrow: 'Notre histoire',
    storyTitle: 'Une passerelle entre trois continents',
    story: [
      'Paul World Travel a été fondée avec pour mission de faciliter les échanges commerciaux et culturels entre l’Afrique, la Chine et l’Amérique du Nord. Notre siège social est situé à Douala, au Cameroun, avec une présence stratégique à Foshan, en Chine.',
      'Au fil des années, nous avons construit un réseau solide de partenaires et de clients, nous permettant d’offrir des solutions sur mesure pour le fret aérien et maritime, l’échange de devises et l’assistance aux achats en Chine.',
      'Notre équipe multiculturelle est dédiée à fournir des services de qualité, en s’appuyant sur une expertise locale et une vision globale des affaires internationales.',
    ],
    imageAlt: 'L’équipe de Paul World Travel',
    facts: [
      { value: '2', label: 'Bureaux : Douala et Foshan' },
      { value: '3', label: 'Continents connectés' },
      { value: '6', label: 'Domaines d’expertise' },
    ],
    valuesEyebrow: 'Ce qui nous guide',
    valuesTitle: 'Mission, valeurs et vision',
    values: [
      {
        title: 'Notre mission',
        desc: 'Faciliter les échanges commerciaux et culturels entre les continents, en offrant des services logistiques et de consulting fiables et efficaces.',
      },
      {
        title: 'Nos valeurs',
        desc: 'Intégrité, transparence et engagement envers la satisfaction de nos clients.',
      },
      {
        title: 'Notre vision',
        desc: 'Devenir le partenaire de référence pour les entreprises cherchant à s’implanter ou à commercer entre l’Afrique, la Chine et l’Amérique du Nord.',
      },
    ],
    ctaTitle: 'Parlons de votre projet',
    ctaText: 'Une question, un devis ou un accompagnement ? Notre équipe vous répond rapidement.',
    ctaPrimary: 'Nous contacter',
    ctaSecondary: 'Voir nos services',
  },
  en: {
    eyebrow: 'About',
    title: 'Your partner for international business',
    intro:
      'Paul World Travel connects Africa, China and North America: logistics, currency exchange, consulting, visas, business creation and IT solutions, all under one roof.',
    storyEyebrow: 'Our story',
    storyTitle: 'A bridge between three continents',
    story: [
      'Paul World Travel was founded to facilitate trade and cultural exchange between Africa, China and North America. Our headquarters are in Douala, Cameroon, with a strategic presence in Foshan, China.',
      'Over the years we have built a strong network of partners and clients, allowing us to offer tailored solutions for air and sea freight, currency exchange and purchasing assistance in China.',
      'Our multicultural team is dedicated to delivering quality service, combining local expertise with a global view of international business.',
    ],
    imageAlt: 'The Paul World Travel team',
    facts: [
      { value: '2', label: 'Offices: Douala and Foshan' },
      { value: '3', label: 'Continents connected' },
      { value: '6', label: 'Areas of expertise' },
    ],
    valuesEyebrow: 'What guides us',
    valuesTitle: 'Mission, values and vision',
    values: [
      {
        title: 'Our mission',
        desc: 'To facilitate trade and cultural exchange between continents by providing reliable, efficient logistics and consulting services.',
      },
      {
        title: 'Our values',
        desc: 'Integrity, transparency and a commitment to our clients’ satisfaction.',
      },
      {
        title: 'Our vision',
        desc: 'To become the partner of choice for businesses looking to set up or trade between Africa, China and North America.',
      },
    ],
    ctaTitle: 'Let’s talk about your project',
    ctaText: 'A question, a quote or ongoing support? Our team will get back to you quickly.',
    ctaPrimary: 'Contact us',
    ctaSecondary: 'See our services',
  },
};

export default function About() {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      {/* Story */}
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>{c.storyEyebrow}</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{c.storyTitle}</h2>
            <div className="mt-8 space-y-5 leading-relaxed text-muted">
              {c.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[28rem]">
            <Image
              src="/images/about.svg"
              alt={c.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="rounded-2xl object-cover"
            />
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-1 border-t border-line sm:grid-cols-3">
          {c.facts.map((f) => (
            <div key={f.label} className="border-b border-line py-8 sm:border-b-0 sm:pr-8">
              <dt className="text-sm text-muted">{f.label}</dt>
              <dd className="mt-2 text-4xl font-semibold tracking-tight text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Mission, values, vision */}
      <Section muted>
        <SectionHeading eyebrow={c.valuesEyebrow} title={c.valuesTitle} />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {c.values.map((v, i) => (
            <div key={v.title} className="border-t border-line pt-6">
              <p className="text-sm font-medium text-accent">0{i + 1}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{c.ctaTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{c.ctaText}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact/">{c.ctaPrimary}</Button>
            <Button href="/services/" variant="secondary">
              {c.ctaSecondary}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
