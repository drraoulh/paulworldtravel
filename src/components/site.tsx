import Link from 'next/link';
import type { ReactNode } from 'react';

// Shared building blocks for every page.

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** Inner-page header: photo under a navy veil, big wide title. */
export function PageHero({
  title,
  intro,
  image,
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  image: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-night text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/90 to-night/40" />
      <Container className="py-16 sm:py-24">
        <h1 className="display max-w-4xl text-4xl sm:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">{intro}</p>}
        {children}
      </Container>
    </header>
  );
}

type ButtonProps = { href: string; children: ReactNode; variant?: 'primary' | 'outline' | 'light'; className?: string };

export function ButtonLink({ href, children, variant = 'primary', className = '' }: ButtonProps) {
  const styles = {
    primary: 'bg-container text-night hover:bg-container-hover',
    outline: 'border-2 border-white/70 text-white hover:bg-white hover:text-night',
    light: 'bg-white text-night hover:bg-paper',
  }[variant];
  const cls = `inline-flex items-center justify-center rounded-md px-6 py-3 font-bold transition-colors ${styles} ${className}`;
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function SectionTitle({ title, intro, light = false }: { title: ReactNode; intro?: ReactNode; light?: boolean }) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className={`heading text-3xl sm:text-4xl ${light ? 'text-white' : 'text-night'}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg ${light ? 'text-blue-100' : 'text-slate'}`}>{intro}</p>}
    </div>
  );
}

export function CheckItem({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <li className="flex gap-3">
      <svg className={`mt-1 h-4 w-4 flex-shrink-0 ${light ? 'text-container' : 'text-ocean'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export const WHATSAPP_CM = 'https://wa.me/237694244666';
export const WHATSAPP_CN = 'https://wa.me/8619068451378';
export const EMAIL = 'paulworld2016@yahoo.com';
export const EMAIL_INFO = 'infos@paulworldtravel.com';
