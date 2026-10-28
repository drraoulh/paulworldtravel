import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/ui';
import type { EpreuveConfig, Section } from '@/lib/epreuves';

/** Header and section tabs shared by every page of an épreuve. */
export default function EpreuveShell({ epreuve, active, title, intro, children }: {
  epreuve: EpreuveConfig;
  active: Section;
  title?: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  const m = epreuve.module;
  return (
    <>
      <header className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/montreal.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/95 to-night/70" />
        <Container className="pt-12 sm:pt-16">
          <p className="text-sm font-semibold text-container">{active === 'presentation' ? 'TCF Canada' : m.name}</p>
          <h1 className="display mt-2 max-w-3xl text-4xl sm:text-5xl">{title ?? m.name}</h1>
          {intro && <p className="mt-4 max-w-2xl text-lg text-blue-100">{intro}</p>}
          <nav aria-label={`Sections : ${m.name}`} className="-mx-4 mt-10 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <ul className="flex min-w-max gap-1">
              {epreuve.sections.map((s) => (
                <li key={s.key}>
                  <Link
                    href={s.href}
                    aria-current={s.key === active ? 'page' : undefined}
                    className={`block rounded-t-xl px-4 py-3 text-sm font-semibold transition-colors ${s.key === active ? 'bg-paper text-night' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </header>
      <section className="bg-paper py-10 sm:py-14">{children}</section>
    </>
  );
}
