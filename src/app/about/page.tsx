'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { ButtonLink, Container, PageHero, SectionTitle } from '@/components/site';

const copy = {
  fr: {
    title: 'Une passerelle entre le Cameroun, la Chine et le Canada',
    intro:
      'Paul World Travel accompagne particuliers et entreprises dans leurs échanges internationaux : transport, achats, change, visas, création d’entreprise et informatique.',
    storyTitle: 'Notre histoire',
    story: [
      'Paul World Travel a été fondée avec pour mission de faciliter les échanges commerciaux et culturels entre l’Afrique, la Chine et l’Amérique du Nord. Notre siège social est situé à Douala, au Cameroun, avec une présence à Foshan, en Chine.',
      'Au fil des années, nous avons construit un réseau de partenaires et de clients qui nous permet d’offrir des solutions sur mesure pour le fret aérien et maritime, l’échange de devises et l’assistance aux achats en Chine. Nous expédions désormais aussi du Cameroun vers le Canada.',
      'Notre équipe multiculturelle s’appuie sur une connaissance du terrain dans chaque pays et sur une vision globale des affaires internationales.',
    ],
    imageAlt: 'Porte-conteneurs à quai',
    valuesTitle: 'Ce qui nous guide',
    values: [
      { title: 'Notre mission', desc: 'Faciliter les échanges commerciaux et culturels entre les continents, avec des services logistiques et de conseil fiables et efficaces.' },
      { title: 'Nos valeurs', desc: 'Intégrité, transparence et engagement envers la satisfaction de nos clients.' },
      { title: 'Notre vision', desc: 'Devenir le partenaire de référence des entreprises qui commercent entre l’Afrique, la Chine et l’Amérique du Nord.' },
    ],
    ctaTitle: 'Parlons de votre projet',
    ctaText: 'Une question, un devis ou un accompagnement : notre équipe vous répond rapidement.',
    ctaPrimary: 'Nous contacter',
    ctaSecondary: 'Voir nos services',
  },
  en: {
    title: 'A bridge between Cameroon, China and Canada',
    intro:
      'Paul World Travel helps individuals and businesses trade internationally: shipping, purchasing, currency exchange, visas, business creation and IT.',
    storyTitle: 'Our story',
    story: [
      'Paul World Travel was founded to facilitate trade and cultural exchange between Africa, China and North America. Our head office is in Douala, Cameroon, with a presence in Foshan, China.',
      'Over the years we have built a network of partners and clients that lets us offer tailored solutions for air and sea freight, currency exchange and purchasing assistance in China. We now also ship from Cameroon to Canada.',
      'Our multicultural team combines on-the-ground knowledge in each country with a global view of international business.',
    ],
    imageAlt: 'Container ship at the quay',
    valuesTitle: 'What guides us',
    values: [
      { title: 'Our mission', desc: 'To facilitate trade and cultural exchange between continents with reliable, efficient logistics and consulting services.' },
      { title: 'Our values', desc: 'Integrity, transparency and a commitment to our clients’ satisfaction.' },
      { title: 'Our vision', desc: 'To become the go-to partner for businesses trading between Africa, China and North America.' },
    ],
    ctaTitle: 'Let’s talk about your project',
    ctaText: 'A question, a quote or support: our team gets back to you quickly.',
    ctaPrimary: 'Contact us',
    ctaSecondary: 'See our services',
  },
};

export default function About() {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <>
      <PageHero title={c.title} intro={c.intro} image="/images/photos/douala-port.jpg" />

      <section className="bg-white py-16 sm:py-24">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle title={c.storyTitle} />
            <div className="space-y-4 text-lg text-slate">
              {c.story.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-lg lg:h-[28rem]">
            <Image src="/images/photos/cargo-maritime.jpg" alt={c.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <SectionTitle title={c.valuesTitle} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {c.values.map((v) => (
              <div key={v.title} className="rounded-lg border-t-4 border-ocean bg-white p-6">
                <h3 className="heading text-xl text-night">{v.title}</h3>
                <p className="mt-3 text-slate">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-night py-16 text-white sm:py-20">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display text-3xl sm:text-4xl">{c.ctaTitle}</h2>
            <p className="mt-4 text-lg text-blue-100">{c.ctaText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact/">{c.ctaPrimary}</ButtonLink>
            <ButtonLink href="/services/" variant="outline">{c.ctaSecondary}</ButtonLink>
          </div>
        </Container>
      </section>
      <p className="bg-night px-4 pb-6 text-center text-xs text-blue-300">
        {language === 'fr' ? 'Photos : Unsplash. Port autonome de Douala : Mboupda Talla Roger,' : 'Photos: Unsplash. Port of Douala: Mboupda Talla Roger,'}{' '}
        <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">CC BY-SA 3.0</a>
      </p>
    </>
  );
}
