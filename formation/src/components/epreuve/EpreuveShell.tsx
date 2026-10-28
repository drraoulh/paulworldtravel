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
      <header className="border-b border-rule bg-white">
        <Container className="pt-10 sm:pt-14">
          {active !== 'presentation' && (
            <Link href={`/epreuve/${epreuve.slug}/`} className="text-sm font-bold text-ocean hover:underline">{m.name}</Link>
          )}
          <h1 className="display mt-2 max-w-3xl text-[2.3rem] text-night sm:text-[3.1rem]">{title ?? m.name}</h1>
          {intro && <p className="mt-4 max-w-2xl text-lg text-slate">{intro}</p>}
          <nav aria-label={`Sections : ${m.name}`} className="-mx-4 mt-9 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <ul className="flex min-w-max gap-7">
              {epreuve.sections.map((s) => (
                <li key={s.key}>
                  <Link
                    href={s.href}
                    aria-current={s.key === active ? 'page' : undefined}
                    className={`block border-b-[3px] pb-3 text-[0.95rem] transition-colors ${s.key === active ? 'border-container font-bold text-night' : 'border-transparent text-slate hover:text-night'}`}
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
