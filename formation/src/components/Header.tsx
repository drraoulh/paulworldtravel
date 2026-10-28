'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './ui';

const links = [
  { href: '/epreuve/comprehension-orale/', label: 'Compréhension orale' },
  { href: '/epreuve/comprehension-ecrite/', label: 'Compréhension écrite' },
  { href: '/epreuve/expression-ecrite/', label: 'Expression écrite' },
  { href: '/epreuve/expression-orale/', label: 'Expression orale' },
  { href: '/examen-blanc/', label: 'Examen blanc' },
];

// Shown in the mobile menu, after the épreuves.
const more = [
  { href: '/entrainement/series/', label: 'Combinaisons mensuelles' },
  { href: '/actualites/', label: 'Dates & actualités' },
  { href: '/parcours/', label: 'Parcours de formation' },
  { href: '/tcf-canada/', label: 'Le TCF Canada' },
  { href: '/formules/', label: 'Formules' },
  { href: '/test-de-niveau/', label: 'Test de niveau' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  useEffect(() => setOpen(false), [pathname]);
  const active = (href: string) => pathname.startsWith(href);
  const linkCls = (href: string) =>
    `whitespace-nowrap text-[0.94rem] transition-colors ${active(href) ? 'marked font-bold text-night' : 'text-slate hover:text-night'}`;

  return (
    <nav className="sticky top-0 z-50 border-b border-rule bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/brand/symbole-nav.png" alt="" width={160} height={131} priority className="h-9 w-auto" />
          <span className="leading-tight">
            <span className="heading block whitespace-nowrap text-[1.05rem] text-night">Paul World Travel</span>
            <span className="block text-[0.8rem] text-slate">Formation TCF Canada</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/parcours/" className={linkCls('/parcours/')}>Parcours</Link>
          <Link href="/test-de-niveau/" className={linkCls('/test-de-niveau/')}>Test de niveau</Link>
          <Link href="/espace/" aria-current={active('/espace/') ? 'page' : undefined} className={linkCls('/espace/')}>Mon espace</Link>
          <Link href="/inscription/" className="whitespace-nowrap rounded-full bg-night px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-ocean">
            S’inscrire
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="-mr-2 p-2 text-night lg:hidden" aria-expanded={open} aria-label="Menu">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            {open ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </Container>

      {/* Second row on desktop: the épreuves, in the order of the exam day. */}
      <div className="hidden border-t border-rule lg:block">
        <Container className="flex h-11 items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={active(l.href) ? 'page' : undefined} className={linkCls(l.href)}>{l.label}</Link>
          ))}
        </Container>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-rule bg-white lg:hidden">
          <Container className="py-4">
            <p className="pb-2 text-sm text-slate">Les épreuves</p>
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="heading block border-b border-rule py-3.5 text-xl text-night">
                <span className={active(l.href) ? 'marked' : ''}>{l.label}</span>
              </Link>
            ))}
            <Link href="/espace/" className="heading block border-b border-rule py-3.5 text-xl text-night">Mon espace</Link>
            <div className="mt-4 grid grid-cols-2 gap-x-4">
              {more.map((l) => (
                <Link key={l.href} href={l.href} className="block py-2.5 text-slate">{l.label}</Link>
              ))}
            </div>
            <Link href="/inscription/" className="mt-5 mb-2 block rounded-full bg-night px-5 py-3.5 text-center font-bold text-white">S’inscrire</Link>
          </Container>
        </div>
      )}
    </nav>
  );
}
