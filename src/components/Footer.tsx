'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from './ui';

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-lg font-semibold tracking-tight">Paul World Travel</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{t('footer.slogan')}</p>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted">{t('footer.quick_links')}</p>
          <ul className="space-y-3 text-sm">
            <li><Link href="/services/" className="hover:text-accent">{t('nav.services')}</Link></li>
            <li><Link href="/locations/" className="hover:text-accent">{t('nav.locations')}</Link></li>
            <li><Link href="/testimonials/" className="hover:text-accent">{t('nav.testimonials')}</Link></li>
            <li><Link href="/faq/" className="hover:text-accent">{t('nav.faq')}</Link></li>
            <li><Link href="/contact/" className="hover:text-accent">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted">{t('footer.contact_us')}</p>
          <ul className="space-y-3 text-sm">
            <li><a href="mailto:paulworld2016@yahoo.com" className="hover:text-accent">paulworld2016@yahoo.com</a></li>
            <li><a href="tel:+237694244666" className="hover:text-accent">+237 6 94 24 46 66</a></li>
            <li className="text-muted">Yaoundé, Cameroun</li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {currentYear} Paul World Travel. {t('footer.all_rights_reserved')}</p>
        <div className="flex items-center gap-1 rounded-full border border-line bg-white p-1">
          {(['fr', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`rounded-full px-3 py-1 uppercase transition-colors ${language === lang ? 'bg-foreground text-white' : 'hover:text-foreground'}`}
            >
              {lang}
            </button>
          ))}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
