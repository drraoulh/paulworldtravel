'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon, { type IconName } from './Icon';

const TABS: { href: string; label: string; icon: IconName }[] = [
  { href: '/epreuve/expression-ecrite/', label: 'E. Écrite', icon: 'pen' },
  { href: '/epreuve/expression-orale/', label: 'E. Orale', icon: 'mic' },
  { href: '/epreuve/comprehension-ecrite/', label: 'C. Écrite', icon: 'book' },
  { href: '/epreuve/comprehension-orale/', label: 'C. Orale', icon: 'headphones' },
  { href: '/espace/', label: 'Compte', icon: 'user' },
];

/** Tab bar fixed at the bottom of the screen on phones and tablets: one tab per test, plus the account. */
export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Épreuves" className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden print:hidden">
      <ul className="mx-auto grid max-w-xl grid-cols-5">
        {TABS.map((t) => {
          const active = pathname.startsWith(t.href.replace(/\/$/, ''));
          return (
            <li key={t.href}>
              <Link href={t.href} aria-current={active ? 'page' : undefined} className={`flex flex-col items-center gap-1 px-1 py-2 text-xs font-semibold ${active ? 'text-ocean' : 'text-slate hover:text-night'}`}>
                <span className={`flex h-8 w-12 items-center justify-center rounded-xl ${active ? 'bg-blue-50' : ''}`}><Icon name={t.icon} className="h-6 w-6" /></span>
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
