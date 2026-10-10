'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from './ui';

const links = [
  { href: '/', key: 'nav.home' },
  { href: '/services/', key: 'nav.services' },
  { href: '/locations/', key: 'nav.locations' },
  { href: '/testimonials/', key: 'nav.testimonials' },
  { href: '/faq/', key: 'nav.faq' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href.replace(/\/$/, '')));

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <Image src="/brand/symbole-nav.png" alt="Paul World Travel" width={160} height={131} priority className="h-12 w-auto" />
          <span className="text-base font-semibold tracking-tight">Paul World Travel</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${isActive(l.href) ? 'text-foreground' : 'text-muted hover:text-foreground'}`}
            >
              {t(l.key)}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="text-sm text-muted transition-colors hover:text-foreground"
            aria-label="Changer de langue / Change language"
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          <Link
            href="/contact/"
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            {t('nav.contact_us')}
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="-mr-2 p-2 md:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </Container>

      {isMenuOpen && (
        <div className="border-t border-line bg-white md:hidden">
          <Container className="flex flex-col py-4">
            {[...links, { href: '/contact/', key: 'nav.contact' }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsMenuOpen(false)}
                className={`border-b border-line py-4 text-lg last:border-0 ${isActive(l.href) ? 'text-accent' : 'text-foreground'}`}
              >
                {t(l.key)}
              </Link>
            ))}
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="mt-4 self-start rounded-full border border-line px-4 py-2 text-sm"
            >
              {language === 'fr' ? 'English' : 'Français'}
            </button>
          </Container>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
