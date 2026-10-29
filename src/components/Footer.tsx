'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { services } from '@/content/services';
import { offices, officeLabel, phones, type Phone } from './offices';
import { Container, EMAIL, EMAIL_INFO, WHATSAPP_CM } from './site';

// The header carries navigation; the footer carries the details people come back
// for: every service, the offices, the phone numbers and the emails.

const copy = {
  fr: {
    slogan: "Let's travel and build a better world together",
    about: 'Transport de marchandises, achats en Chine, change, visas et accompagnement des entreprises entre le Cameroun, la Chine et le Canada.',
    whatsapp: 'Écrire sur WhatsApp',
    services: 'Services',
    offices: 'Nos bureaux',
    reach: 'Nous joindre',
    links: [
      ['/about/', 'Qui sommes-nous'],
      ['/faq/', 'Questions fréquentes'],
      ['/contact/', 'Contact et devis'],
    ],
    rights: 'Tous droits réservés.',
  },
  en: {
    slogan: "Let's travel and build a better world together",
    about: 'Freight, purchasing in China, currency exchange, visas and business support between Cameroon, China and Canada.',
    whatsapp: 'Message us on WhatsApp',
    services: 'Services',
    offices: 'Our offices',
    reach: 'Reach us',
    links: [
      ['/about/', 'About us'],
      ['/faq/', 'Frequent questions'],
      ['/contact/', 'Contact and quotes'],
    ],
    rights: 'All rights reserved.',
  },
};

const directory: [{ fr: string; en: string }, Phone][] = [
  [{ fr: 'Cameroun', en: 'Cameroon' }, phones.cameroonWhatsapp],
  [{ fr: 'Cameroun', en: 'Cameroon' }, phones.cameroon],
  [{ fr: 'Chine', en: 'China' }, phones.china],
  [{ fr: 'Canada', en: 'Canada' }, phones.canada],
];

const Footer = () => {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <footer className="bg-night-deep text-blue-100">
      <Container className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
              <Image src="/brand/symbole-nav.png" alt="" width={160} height={131} className="h-10 w-auto" />
            </span>
            <span className="heading text-xl text-white">Paul World Travel</span>
          </div>
          <p className="mt-5 max-w-sm">{c.about}</p>
          <p className="mt-4 italic text-blue-200">{c.slogan}</p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="heading mb-4 text-white">{c.services}</h2>
          <ul className="space-y-2.5">
            {services.map((svc) => (
              <li key={svc.slug}>
                <Link href={`/services/${svc.slug}/`} className="hover:text-white">{svc[language].name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="heading mb-4 text-white">{c.offices}</h2>
          <ul className="space-y-2.5">
            {offices.map((o) => (
              <li key={o.id}>
                <Link href="/locations/" className="hover:text-white">{officeLabel(o, language)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="heading mb-4 text-white">{c.reach}</h2>
          <ul className="space-y-2.5">
            {directory.map(([country, phone]) => (
              <li key={phone.href}>
                <a href={phone.href} className="hover:text-white">
                  <span className="text-blue-200">{country[language]} </span>
                  <span className="whitespace-nowrap font-semibold text-white">{phone.label}</span>
                </a>
              </li>
            ))}
            <li><a href={`mailto:${EMAIL_INFO}`} className="break-all hover:text-white">{EMAIL_INFO}</a></li>
            <li><a href={`mailto:${EMAIL}`} className="break-all hover:text-white">{EMAIL}</a></li>
          </ul>
          <a
            href={WHATSAPP_CM}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-md border-2 border-white/60 px-4 py-2 font-bold text-white transition-colors hover:bg-white hover:text-night"
          >
            {c.whatsapp}
          </a>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-sm text-blue-200 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Paul World Travel. {c.rights}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {c.links.map(([href, label]) => (
              <li key={href}><Link href={href} className="hover:text-white">{label}</Link></li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
