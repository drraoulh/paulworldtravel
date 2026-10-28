'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './ui';

const links = [
  { href: '/tcf-canada/', label: 'Le TCF Canada' },
  { href: '/parcours/', label: 'Parcours' },
  { href: '/formules/', label: 'Formules' },
  { href: '/entrainement/', label: 'S’entraîner' },
  { href: '/test-de-niveau/', label: 'Test de niveau' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  useEffect(() => setOpen(false), [pathname]);
  const linkCls = (href: string) =>
    `text-sm font-medium transition-colors ${pathname.startsWith(href) ? 'text-container' : 'text-blue-100 hover:text-white'}`;

  return (
    <nav className="sticky top-0 z-50 bg-night text-white">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
            <Image src="/brand/symbole-nav.png" alt="" width={160} height={131} priority className="h-8 w-auto" />
          </span>
          <span className="leading-tight">
            <span className="heading block text-base sm:text-lg">Paul World Travel</span>
            <span className="block text-sm text-container">Formation</span>
          </span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkCls(l.href)}>{l.label}</Link>
          ))}
          <Link href="/espace/" className={linkCls('/espace/')}>Mon espace</Link>
          <Link href="/inscription/" className="rounded-md bg-container px-5 py-2.5 text-sm font-bold text-night transition-colors hover:bg-container-hover">
            S’inscrire
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="-mr-2 p-2 md:hidden" aria-expanded={open} aria-label="Menu">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            {open ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/10 bg-night-deep md:hidden">
          <Container className="py-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="block border-b border-white/10 py-4 text-lg font-medium">{l.label}</Link>
            ))}
            <Link href="/espace/" className="block border-b border-white/10 py-4 text-lg font-medium">Mon espace</Link>
            <Link href="/inscription/" className="mt-4 mb-2 block rounded-md bg-container px-5 py-3 text-center font-bold text-night">S’inscrire</Link>
          </Container>
        </div>
      )}
    </nav>
  );
}
