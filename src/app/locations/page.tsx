'use client';

import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import { Button, PageHeader, Section, SectionHeading } from '@/components/ui';
import { useLanguage } from '@/contexts/LanguageContext';

const EMAIL = 'paulworld2016@yahoo.com';

const copy = {
  fr: {
    eyebrow: 'Implantations',
    country: { cameroon: 'Cameroun', china: 'Chine' },
    role: { cameroon: 'Siège social', china: 'Bureau achats et logistique' },
    phone: 'Téléphone',
    email: 'E-mail',
    openMap: 'Ouvrir dans Google Maps',
    presenceTitle: 'Une présence pensée pour vos échanges',
    ctaTitle: 'Besoin de nous rendre visite ?',
    ctaText: 'Contactez-nous avant votre passage pour convenir d’un rendez-vous.',
    cta: 'Nous contacter',
  },
  en: {
    eyebrow: 'Locations',
    country: { cameroon: 'Cameroon', china: 'China' },
    role: { cameroon: 'Headquarters', china: 'Sourcing and logistics office' },
    phone: 'Phone',
    email: 'Email',
    openMap: 'Open in Google Maps',
    presenceTitle: 'A presence built around your trade',
    ctaTitle: 'Planning a visit?',
    ctaText: 'Get in touch before you come by so we can set up an appointment.',
    cta: 'Contact us',
  },
};

export default function Locations() {
  const { t, language } = useLanguage();
  const c = copy[language];

  const offices = [
    {
      id: 'cameroon',
      country: c.country.cameroon,
      role: c.role.cameroon,
      city: t('home.cameroon.douala_lendi'),
      address: t('locations.cameroon_address'),
      description: t('locations.cameroon_description'),
      phone: '+237 6 94 24 46 66',
      phoneHref: 'tel:+237694244666',
      image: '/cameroon-office.jpg',
      imageAlt: t('locations.cameroon_office_alt'),
      mapQuery: 'Lendi, Douala, Cameroun',
    },
    {
      id: 'china',
      country: c.country.china,
      role: c.role.china,
      city: t('home.china.foshan'),
      address: t('locations.china_address'),
      description: t('locations.china_description'),
      phone: '+86 190 6845 1378',
      phoneHref: 'tel:+8619068451378',
      image: '/china-office.jpg',
      imageAlt: t('locations.china_office_alt'),
      mapQuery: 'Foshan, Guangdong, China',
    },
  ];

  const hours = [t('contact.monday_friday'), t('contact.saturday'), t('contact.sunday')];

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={t('locations.title')} intro={t('locations.subtitle')} />

      <Section>
        <div className="space-y-20 sm:space-y-28">
          {offices.map((o) => (
            <article key={o.id} className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={o.image}
                    alt={o.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="rounded-2xl object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                  {o.country} · {o.role}
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{o.city}</h2>
                <p className="mt-4 leading-relaxed text-muted">{o.description}</p>

                <dl className="mt-8 border-t border-line">
                  <div className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-3 sm:gap-6">
                    <dt className="text-sm text-muted">{t('locations.address')}</dt>
                    <dd className="text-foreground sm:col-span-2">{o.address}</dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-3 sm:gap-6">
                    <dt className="text-sm text-muted">{c.phone}</dt>
                    <dd className="sm:col-span-2">
                      <a href={o.phoneHref} className="text-foreground hover:text-accent">
                        {o.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-3 sm:gap-6">
                    <dt className="text-sm text-muted">{c.email}</dt>
                    <dd className="sm:col-span-2">
                      <a href={`mailto:${EMAIL}`} className="break-all text-foreground hover:text-accent">
                        {EMAIL}
                      </a>
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-3 sm:gap-6">
                    <dt className="text-sm text-muted">{t('locations.hours')}</dt>
                    <dd className="space-y-1 text-foreground sm:col-span-2">
                      {hours.map((h) => (
                        <p key={h}>{h}</p>
                      ))}
                    </dd>
                  </div>
                </dl>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline"
                >
                  {c.openMap}
                  <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow={t('locations.global_presence')}
          title={c.presenceTitle}
          intro={t('locations.global_description')}
        />
        <div className="flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">{c.ctaTitle}</h3>
            <p className="mt-2 leading-relaxed text-muted">{c.ctaText}</p>
          </div>
          <Button href="/contact/">{c.cta}</Button>
        </div>
      </Section>
    </>
  );
}
