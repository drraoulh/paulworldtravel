import Link from 'next/link';
import type { ReactNode } from 'react';

/*
 * Shared, flat UI primitives. Every page builds on these so the site
 * stays visually consistent: no shadows, hairline borders, generous space.
 */

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = '',
  muted = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${muted ? 'bg-surface' : ''} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-accent">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`mb-12 max-w-2xl sm:mb-16 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

/** Light page header used at the top of every inner page. */
export function PageHeader({ eyebrow, title, intro }: { eyebrow?: ReactNode; title: ReactNode; intro?: ReactNode }) {
  return (
    <header className="border-b border-line">
      <Container className="pb-16 pt-20 sm:pb-20 sm:pt-28">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
      </Container>
    </header>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'link';
  className?: string;
};

export function Button({ href, children, variant = 'primary', className = '' }: ButtonProps) {
  const base = 'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors';
  const styles = {
    primary: 'rounded-full bg-accent px-6 py-3 text-white hover:bg-accent-hover',
    secondary: 'rounded-full border border-line bg-white px-6 py-3 text-foreground hover:border-foreground',
    link: 'text-accent hover:text-accent-hover underline-offset-4 hover:underline',
  }[variant];
  const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  if (external) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

/** Flat bordered card. */
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-white p-8 ${className}`}>{children}</div>;
}
