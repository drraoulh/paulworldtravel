'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { areas, servicesByArea, type Area } from '@/content/services';
import { serviceIcons } from './serviceIcons';
import { Container, FORMATION_URL } from './site';

const labels = {
  fr: { home: 'Accueil', formation: 'Formation', services: 'Services', allServices: 'Voir tous les services', locations: 'Nos bureaux', about: 'Qui sommes-nous', faq: 'Questions', quote: 'Demander un devis', menu: 'Menu', other: 'English' },
  en: { home: 'Home', formation: 'Training', services: 'Services', allServices: 'See all services', locations: 'Our offices', about: 'About us', faq: 'Questions', quote: 'Get a quote', menu: 'Menu', other: 'Français' },
};

const order: Area[] = ['transport', 'trade', 'paperwork', 'digital'];

const Navbar = () => {
  const [open, setOpen] = useState(false); // mobile menu
  const [servicesOpen, setServicesOpen] = useState(false); // desktop services panel
  const panelRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname() ?? '/';
  const l = labels[language];

  // Close menus on navigation, Escape or a click outside the services panel.
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setServicesOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  const links = [
    { href: FORMATION_URL, label: l.formation },
    { href: '/locations/', label: l.locations },
    { href: '/about/', label: l.about },
    { href: '/faq/', label: l.faq },
  ];
  const active = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, '')));
  const linkCls = (href: string) => `text-sm font-medium transition-colors ${active(href) ? 'text-container' : 'text-blue-100 hover:text-white'}`;

  return (
    <nav className="sticky top-0 z-50 bg-night text-white">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
            <Image src="/brand/symbole-nav.png" alt="" width={160} height={131} priority className="h-8 w-auto" />
          </span>
          <span className="heading text-lg sm:text-xl">Paul World Travel</span>
        </Link>

        <div className="hidden items-center gap-4 xl:gap-7 lg:flex">
          <Link href="/" className={linkCls('/')}>{l.home}</Link>
          <div ref={panelRef} className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-expanded={servicesOpen}
              aria-controls="services-panel"
              className={`flex items-center gap-1 ${linkCls('/services/')}`}
            >
              {l.services}
              <svg className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.2 7.2a1 1 0 011.4 0L10 10.6l3.4-3.4a1 1 0 111.4 1.4l-4.1 4.1a1 1 0 01-1.4 0L5.2 8.6a1 1 0 010-1.4z" clipRule="evenodd" />
              </svg>
            </button>
            {servicesOpen && (
              <div id="services-panel" className="absolute left-1/2 top-full mt-5 w-[52rem] -translate-x-1/2 rounded-xl bg-white p-6 text-ink shadow-2xl shadow-night-deep/30">
                <div className="grid grid-cols-4 gap-6">
                  {order.map((area) => (
                    <div key={area}>
                      <p className="mb-3 text-sm font-bold text-ocean">{areas[area][language].name}</p>
                      <ul className="space-y-1">
                        {servicesByArea(area).map((s) => {
                          const Icon = serviceIcons[s.slug];
                          return (
                            <li key={s.slug}>
                              <Link href={`/services/${s.slug}/`} className="-mx-2 flex items-start gap-2 rounded-md p-2 hover:bg-paper">
                                <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-ocean" />
                                <span className="text-sm font-semibold text-night">{s[language].name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link href="/services/" className="mt-5 inline-block border-t border-rule pt-4 text-sm font-bold text-ocean hover:underline">
                  {l.allServices}
                </Link>
              </div>
            )}
          </div>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkCls(link.href)}>{link.label}</Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')} className="text-sm font-medium text-blue-100 hover:text-white" aria-label={l.other}>
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
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-night-deep lg:hidden">
          <Container className="py-3">
            <Link href="/" className="block border-b border-white/10 py-4 text-lg font-medium">{l.home}</Link>
            <p className="pt-4 text-sm font-bold text-container">{l.services}</p>
            <ul className="grid grid-cols-1 gap-1 border-b border-white/10 py-2 sm:grid-cols-2">
              {order.flatMap((area) => servicesByArea(area)).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="block py-2 text-blue-100">{s[language].name}</Link>
                </li>
              ))}
            </ul>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="block border-b border-white/10 py-4 text-lg font-medium">{link.label}</Link>
            ))}
            <div className="flex items-center justify-between gap-4 py-4">
              <button onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')} className="text-blue-100">{l.other}</button>
              <Link href="/contact/" className="rounded-md bg-container px-5 py-3 font-bold text-night">{l.quote}</Link>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
