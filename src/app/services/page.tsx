'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { areas, servicesByArea, type Area } from '@/content/services';
import { ButtonLink, Container, PageHero } from '@/components/site';

const copy = {
  fr: {
    title: 'Tous nos services',
    intro: 'Transport, commerce avec la Chine, démarches administratives et numérique : choisissez un service pour tout savoir sur son fonctionnement.',
    more: 'Voir le service',
    ctaTitle: 'Vous ne savez pas quel service choisir ?',
    ctaText: 'Décrivez votre projet, nous vous orientons.',
    cta: 'Nous écrire',
  },
  en: {
    title: 'All our services',
    intro: 'Transport, trading with China, paperwork and digital: pick a service to see how it works.',
    more: 'See the service',
    ctaTitle: 'Not sure which service you need?',
    ctaText: 'Describe your project and we will point you in the right direction.',
    cta: 'Write to us',
  },
};

const order: Area[] = ['transport', 'trade', 'paperwork', 'digital'];

export default function ServicesIndex() {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <>
      <PageHero title={c.title} intro={c.intro} image="/images/photos/port-conteneurs.jpg" />

      {order.map((area, i) => (
        <section key={area} className={`py-16 sm:py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-paper'}`}>
          <Container>
            <div className="mb-8 max-w-2xl">
              <h2 className="heading text-3xl text-night sm:text-4xl">{areas[area][language].name}</h2>
              <p className="mt-3 text-lg text-slate">{areas[area][language].text}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {servicesByArea(area).map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}/`} className="group overflow-hidden rounded-lg border border-rule bg-white hover:border-ocean">
                  <div className="relative h-48">
                    <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="heading text-xl text-night">{s[language].name}</h3>
                    <p className="mt-2 text-slate">{s[language].summary}</p>
                    <span className="mt-4 inline-block font-bold text-ocean group-hover:underline">{c.more}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="bg-night py-16 text-white sm:py-20">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="display text-3xl sm:text-4xl">{c.ctaTitle}</h2>
            <p className="mt-3 text-lg text-blue-100">{c.ctaText}</p>
          </div>
          <ButtonLink href="/contact/">{c.cta}</ButtonLink>
        </Container>
      </section>
    </>
  );
}
