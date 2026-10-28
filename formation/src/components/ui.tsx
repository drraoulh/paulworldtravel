import Link from 'next/link';
import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type ButtonProps = { href: string; children: ReactNode; variant?: 'primary' | 'outline' | 'dark'; className?: string };

export function ButtonLink({ href, children, variant = 'primary', className = '' }: ButtonProps) {
  const styles = {
    primary: 'bg-container text-night hover:bg-container-hover',
    outline: 'border-2 border-white/70 text-white hover:bg-white hover:text-night',
    dark: 'bg-night text-white hover:bg-ocean',
  }[variant];
  const cls = `inline-flex items-center justify-center rounded-md px-6 py-3 font-bold transition-colors ${styles} ${className}`;
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <Link href={href} className={cls}>{children}</Link>;
}

export function PageHeader({ title, intro, children }: { title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className="bg-night text-white">
      <Container className="py-14 sm:py-20">
        <h1 className="display max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-blue-100">{intro}</p>}
        {children}
      </Container>
    </header>
  );
}

export function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <svg className="mt-1 h-4 w-4 flex-shrink-0 text-ocean" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
      </svg>
      <span>{children}</span>
    </li>
  );
}
