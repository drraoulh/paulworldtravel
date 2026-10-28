'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container, EMAIL, WHATSAPP_CM } from './site';

const copy = {
  fr: {
    slogan: "Let's travel and build a better world together",
    about: 'Transport de marchandises, achats en Chine, change, visas et accompagnement des entreprises entre le Cameroun, la Chine et le Canada.',
    services: 'Services',
    servicesLinks: [
      ['/services/#cargo', 'Cargo Chine → Afrique'],
      ['/services/#canada', 'Fret Cameroun → Canada'],
      ['/services/#consulting', 'Achats en Chine'],
      ['/services/#currency', 'Change de devises'],
      ['/services/#visa', 'Visas et immigration'],
      ['/services/#customs', 'Douane et transit'],
    ],
    company: 'Paul World Travel',
    companyLinks: [
      ['/about/', 'Qui sommes-nous'],
      ['/locations/', 'Nos bureaux'],
      ['/faq/', 'Questions fréquentes'],
      ['/contact/', 'Contact et devis'],
    ],
    contact: 'Nous joindre',
    hq: 'Siège : Douala, Lendi',
    china: 'Bureau : Foshan, Guangdong',
    rights: 'Tous droits réservés.',
    credits: 'Photos : Unsplash. Port autonome de Douala : Mboupda Talla Roger,',
    lang: 'English',
  },
  en: {
    slogan: "Let's travel and build a better world together",
    about: 'Freight, purchasing in China, currency exchange, visas and business support between Cameroon, China and Canada.',
    services: 'Services',
    servicesLinks: [
      ['/services/#cargo', 'Cargo China → Africa'],
      ['/services/#canada', 'Freight Cameroon → Canada'],
      ['/services/#consulting', 'Purchasing in China'],
      ['/services/#currency', 'Currency exchange'],
      ['/services/#visa', 'Visas and immigration'],
      ['/services/#customs', 'Customs and transit'],
    ],
    company: 'Paul World Travel',
    companyLinks: [
      ['/about/', 'About us'],
      ['/locations/', 'Our offices'],
      ['/faq/', 'Frequent questions'],
      ['/contact/', 'Contact and quotes'],
    ],
    contact: 'Reach us',
    hq: 'Head office: Douala, Lendi',
    china: 'Office: Foshan, Guangdong',
    rights: 'All rights reserved.',
    credits: 'Photos: Unsplash. Port of Douala: Mboupda Talla Roger,',
    lang: 'Français',
  },
};

const Footer = () => {
  const { language, setLanguage } = useLanguage();
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
            {c.servicesLinks.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="heading mb-4 text-white">{c.company}</h2>
          <ul className="space-y-2.5">
            {c.companyLinks.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="heading mb-4 text-white">{c.contact}</h2>
          <ul className="space-y-2.5">
            <li>{c.hq}</li>
            <li>{c.china}</li>
            <li><a href="tel:+237694244666" className="hover:text-white">+237 6 94 24 46 66</a></li>
            <li><a href="tel:+8619068451378" className="hover:text-white">+86 190 6845 1378</a></li>
            <li><a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a></li>
            <li><a href={WHATSAPP_CM} target="_blank" rel="noopener noreferrer" className="font-semibold text-container hover:text-container-hover">WhatsApp</a></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-blue-200 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>© {new Date().getFullYear()} Paul World Travel. {c.rights}</p>
            <p className="mt-1 text-xs text-blue-300">
              {c.credits}{' '}
              <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">CC BY-SA 3.0</a>
            </p>
          </div>
          <button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')} className="self-start rounded-md border border-white/30 px-4 py-2 hover:bg-white/10 sm:self-auto">
            {c.lang}
          </button>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
