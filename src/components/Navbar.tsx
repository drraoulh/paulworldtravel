'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Container } from './site';

const labels = {
  fr: { home: 'Accueil', services: 'Services', canada: 'Fret Canada', locations: 'Nos bureaux', faq: 'Questions', quote: 'Demander un devis', menu: 'Menu', other: 'English' },
  en: { home: 'Home', services: 'Services', canada: 'Canada freight', locations: 'Our offices', faq: 'Questions', quote: 'Get a quote', menu: 'Menu', other: 'Français' },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname() ?? '/';
  const l = labels[language];

  const links = [
    { href: '/', label: l.home },
    { href: '/services/', label: l.services },
    { href: '/services/#canada', label: l.canada },
    { href: '/locations/', label: l.locations },
    { href: '/faq/', label: l.faq },
  ];
  const isActive = (href: string) => (href === '/' ? pathname === '/' : !href.includes('#') && pathname.startsWith(href.replace(/\/$/, '')));

  return (
    <nav className="sticky top-0 z-50 bg-night text-white">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
            <Image src="/brand/symbole-nav.png" alt="" width={160} height={131} priority className="h-8 w-auto" />
          </span>
          <span className="heading text-lg sm:text-xl">Paul World Travel</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${isActive(link.href) ? 'text-container' : 'text-blue-100 hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="text-sm font-medium text-blue-100 hover:text-white"
            aria-label={l.other}
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          <Link href="/contact/" className="rounded-md bg-container px-5 py-2.5 text-sm font-bold text-night transition-colors hover:bg-container-hover">
            {l.quote}
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="-mr-2 p-2 lg:hidden" aria-expanded={open} aria-label={l.menu}>
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/10 bg-night-deep lg:hidden">
          <Container className="flex flex-col py-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 text-lg font-medium">
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between gap-4 py-4">
              <button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')} className="text-blue-100">
                {l.other}
              </button>
              <Link href="/contact/" onClick={() => setOpen(false)} className="rounded-md bg-container px-5 py-3 font-bold text-night">
                {l.quote}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
