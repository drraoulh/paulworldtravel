import Link from 'next/link';
import { activePromo, promoEnd } from '@/content/offers';

/** Announces the current offer (src/content/offers.ts, PROMO); renders nothing without one. */
export default function PromoBanner({ link = true }: { link?: boolean }) {
  const promo = activePromo();
  if (!promo) return null;
  return (
    <aside aria-label="Offre en cours" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl bg-container px-5 py-3.5 text-center text-night">
      <span className="rounded-full bg-night px-3 py-1 text-xs font-medium text-white">{promo.name}</span>
      <p className="font-bold">−{promo.percent} % sur tous les packs <span className="font-semibold">jusqu’au {promoEnd(promo)}</span></p>
      {link && <Link href="/packs/" className="rounded-full bg-night px-4 py-1.5 text-sm font-bold text-white hover:bg-ocean">En profiter</Link>}
    </aside>
  );
}
