'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { areas, getService, servicesByArea, type Area } from '@/content/services';
import { serviceIcons } from './serviceIcons';
import { Container, WHATSAPP_CM } from './site';

const labels = {
  fr: {
    skip: 'Aller au contenu',
    home: 'Paul World Travel, accueil',
    main: 'Navigation principale',
    services: 'Services',
    allServices: 'Voir tous les services',
    allServicesText: 'Chaque service expliqué : ce que nous faisons, les étapes et les questions fréquentes.',
    locations: 'Nos bureaux',
    about: 'À propos',
    faq: 'FAQ',
    quote: 'Demander un devis',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    menu: 'Menu',
    language: 'Langue',
    whatsapp: 'Écrire sur WhatsApp',
  },
  en: {
    skip: 'Skip to content',
    home: 'Paul World Travel, home',
    main: 'Main navigation',
    services: 'Services',
    allServices: 'See all services',
    allServicesText: 'Every service explained: what we do, the steps and frequent questions.',
    locations: 'Our offices',
    about: 'About',
    faq: 'FAQ',
    quote: 'Get a quote',
    openMenu: 'Open the menu',
    closeMenu: 'Close the menu',
    menu: 'Menu',
    language: 'Language',
    whatsapp: 'Message us on WhatsApp',
  },
};

const order: Area[] = ['transport', 'trade', 'paperwork', 'digital'];
const languageNames: Record<Language, string> = { fr: 'Français', en: 'English' };

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={`h-4 w-4 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 8l4.5 4.5L14.5 8" />
    </svg>
  );
}

function LanguageSwitch({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div role="group" aria-label={labels[language].language} className={`flex rounded-md border border-white/25 p-0.5 text-sm font-semibold ${className}`}>
      {(['fr', 'en'] as Language[]).map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={language === code}
          onClick={() => setLanguage(code)}
          className={`rounded px-2.5 py-1 transition-colors ${language === code ? 'bg-white text-night' : 'text-blue-100 hover:text-white'}`}
        >
          <span aria-hidden="true">{code.toUpperCase()}</span>
          <span className="sr-only">{languageNames[code]}</span>
        </button>
      ))}
    </div>
  );
}

const Navbar = () => {
  const { language } = useLanguage();
  const l = labels[language];
  const pathname = usePathname() ?? '/';

  const [servicesOpen, setServicesOpen] = useState(false); // desktop mega-menu
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile drawer
  const [drawerServices, setDrawerServices] = useState(false); // services list inside the drawer

  const servicesButton = useRef<HTMLButtonElement>(null);
  const servicesWrap = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);

  const closeDrawer = useCallback((returnFocus = true) => {
    setDrawerOpen(false);
    if (returnFocus) menuButton.current?.focus();
  }, []);

  // Every menu closes on navigation.
  useEffect(() => {
    setServicesOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Mega-menu: Escape returns to its button, a click or focus outside closes it.
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        servicesButton.current?.focus();
      }
    };
    const onOutside = (e: Event) => {
      if (servicesWrap.current && !servicesWrap.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('focusin', onOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('focusin', onOutside);
    };
  }, [servicesOpen]);

  // Drawer: lock the page, move focus inside, trap Tab, close on Escape.
  useEffect(() => {
    if (!drawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusables = () =>
      Array.from(drawer.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    drawer.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDrawer();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // The drawer is for small screens only: close it if the window grows.
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => desktop.matches && closeDrawer(false);
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [drawerOpen, closeDrawer]);

  const isActive = (href: string) => pathname.startsWith(href.replace(/\/$/, ''));
  const links = [
    { href: '/locations/', label: l.locations },
    { href: '/about/', label: l.about },
    { href: '/faq/', label: l.faq },
  ];

  // On a service page the quote button pre-selects that service in the form.
  const currentService = getService(pathname.match(/^\/services\/([^/]+)/)?.[1] ?? '');
  const quoteHref = currentService
    ? `/contact/?service=${encodeURIComponent(currentService[language].contactOption)}`
    : '/contact/';

  const desktopLink = (active: boolean) =>
    `relative flex items-center gap-1 rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full ${
      active ? 'text-white after:bg-container' : 'text-blue-100 hover:bg-white/5 hover:text-white after:bg-transparent'
    }`;

  return (
    <>
    <a
      href="#contenu"
      className="sr-only rounded-md bg-container px-4 py-2 font-bold text-night focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[70]"
    >
      {l.skip}
    </a>
    <header className="sticky top-0 z-50 bg-night text-white shadow-[0_1px_0_rgba(255,255,255,0.08)]">
      <Container className="flex h-[var(--header-h)] items-center gap-4">
        <Link href="/" aria-label={l.home} className="flex flex-shrink-0 items-center gap-3 rounded-md">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white lg:h-11 lg:w-11">
            <Image src="/brand/symbole-nav.png" alt="" width={160} height={131} priority className="h-7 w-auto lg:h-8" />
          </span>
          <span className="heading text-lg sm:text-xl">Paul World Travel</span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label={l.main} className="ml-4 hidden lg:block xl:ml-8">
          <ul className="flex items-center gap-1">
            <li>
              <div ref={servicesWrap}>
                <button
                  ref={servicesButton}
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  className={desktopLink(isActive('/services/') || servicesOpen)}
                >
                  {l.services}
                  <Chevron open={servicesOpen} />
                </button>
                {servicesOpen && (
                  <div id="services-menu" className="absolute inset-x-0 top-full border-t border-white/10 bg-white text-ink shadow-2xl shadow-night-deep/30">
                    <Container className="grid grid-cols-12 gap-8 py-8">
                      <div className="col-span-9 grid grid-cols-4 gap-6">
                        {order.map((area) => (
                          <div key={area}>
                            <p className="heading text-sm text-ocean">{areas[area][language].name}</p>
                            <ul className="mt-3 space-y-1">
                              {servicesByArea(area).map((s) => {
                                const Icon = serviceIcons[s.slug];
                                const current = pathname.startsWith(`/services/${s.slug}`);
                                return (
                                  <li key={s.slug}>
                                    <Link
                                      href={`/services/${s.slug}/`}
                                      aria-current={current ? 'page' : undefined}
                                      className={`-mx-2 flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-paper ${current ? 'bg-paper' : ''}`}
                                    >
                                      <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-night text-white">
                                        <Icon aria-hidden="true" className="h-4 w-4" />
                                      </span>
                                      <span>
                                        <span className="block text-sm font-bold text-night">{s[language].name}</span>
                                        <span className="block text-sm text-slate">{s[language].action}</span>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="col-span-3 rounded-lg bg-paper p-6">
                        <p className="heading text-lg text-night">{l.allServices}</p>
                        <p className="mt-2 text-sm text-slate">{l.allServicesText}</p>
                        <Link
                          href="/services/"
                          className="mt-4 inline-flex rounded-md border-2 border-night px-4 py-2 text-sm font-bold text-night transition-colors hover:bg-night hover:text-white"
                        >
                          {l.allServices}
                        </Link>
                      </div>
                    </Container>
                  </div>
                )}
              </div>
            </li>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} className={desktopLink(isActive(link.href))}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitch className="hidden sm:flex" />
          <Link
            href={quoteHref}
            className="hidden rounded-md bg-container px-5 py-2.5 text-sm font-bold text-night transition-colors hover:bg-container-hover sm:inline-flex"
          >
            {l.quote}
          </Link>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-menu"
            aria-label={l.openMenu}
            className="-mr-2 flex items-center gap-2 rounded-md p-2 text-sm font-semibold lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-night-deep/70" onClick={() => closeDrawer()} />
          <div
            ref={drawer}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={l.menu}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-night shadow-2xl"
          >
            <div className="flex h-[var(--header-h)] flex-shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
              <LanguageSwitch />
              <button type="button" data-autofocus onClick={() => closeDrawer()} aria-label={l.closeMenu} className="-mr-2 rounded-md p-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav aria-label={l.main} className="flex-1 overflow-y-auto px-4 py-2 sm:px-6">
              <button
                type="button"
                onClick={() => setDrawerServices((v) => !v)}
                aria-expanded={drawerServices}
                aria-controls="drawer-services"
                className="flex w-full items-center justify-between border-b border-white/10 py-4 text-left text-lg font-semibold"
              >
                {l.services}
                <Chevron open={drawerServices} />
              </button>
              {drawerServices && (
                <div id="drawer-services" className="border-b border-white/10 pb-4">
                  {order.map((area) => (
                    <div key={area} className="pt-4">
                      <p className="text-sm font-semibold text-container">{areas[area][language].name}</p>
                      <ul className="mt-1">
                        {servicesByArea(area).map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}/`}
                              aria-current={pathname.startsWith(`/services/${s.slug}`) ? 'page' : undefined}
                              className="block rounded-md py-2 text-blue-100 hover:text-white aria-[current=page]:font-semibold aria-[current=page]:text-white"
                            >
                              {s[language].name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link href="/services/" className="mt-3 inline-block rounded-md py-2 font-semibold text-white underline underline-offset-4">
                    {l.allServices}
                  </Link>
                </div>
              )}
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`block border-b border-white/10 py-4 text-lg font-semibold ${isActive(link.href) ? 'text-container' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex-shrink-0 space-y-3 border-t border-white/10 p-4 sm:p-6">
              <Link href={quoteHref} className="flex w-full justify-center rounded-md bg-container px-5 py-3 font-bold text-night hover:bg-container-hover">
                {l.quote}
              </Link>
              <a
                href={WHATSAPP_CM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full justify-center rounded-md border-2 border-white/60 px-5 py-2.5 font-bold text-white hover:bg-white hover:text-night"
              >
                {l.whatsapp}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  );
};

export default Navbar;
