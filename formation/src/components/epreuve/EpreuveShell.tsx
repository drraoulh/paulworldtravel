import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/ui';
import { EPREUVE_IMAGES, type EpreuveConfig, type Section } from '@/lib/epreuves';

/**
 * Title and section tabs shared by every page of an épreuve.
 * The site header lists the épreuves; these tabs list the sections of this one, so they never repeat each other.
 */
export default function EpreuveShell({ epreuve, active, title, intro, action, children }: {
  epreuve: EpreuveConfig;
  active: Section;
  title?: string;
  intro?: ReactNode;
  /** The one main action of the page, under the intro. */
  action?: ReactNode;
  children: ReactNode;
}) {
  const m = epreuve.module;
  const img = EPREUVE_IMAGES[m.id];
  const isHome = active === 'presentation';
  return (
    <>
      <header className="border-b border-rule bg-white">
        <Container className="pt-10 sm:pt-14">
          <div className={`grid gap-8 ${isHome ? 'lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-14' : 'lg:grid-cols-[1fr_16rem] lg:items-end'}`}>
          <div>
          {active !== 'presentation' && <p className="text-sm font-semibold text-slate">{m.name}</p>}
          <h1 className="display mt-1 max-w-3xl text-[2.3rem] text-night sm:text-[3.1rem]">{title ?? m.name}</h1>
          {intro && <p className="mt-4 max-w-2xl text-lg text-slate">{intro}</p>}
          {action && <div className="mt-7">{action}</div>}
          </div>
          <div className={`relative overflow-hidden rounded-2xl bg-paper ${isHome ? 'aspect-[16/10] lg:aspect-[5/4]' : 'hidden aspect-[4/3] lg:block'}`}>
            <Image src={img.src} alt={img.alt} fill priority sizes={isHome ? '(min-width: 1024px) 40vw, 100vw' : '16rem'} className="object-cover" />
          </div>
          </div>
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
