'use client';

import Link from 'next/link';
import { useAccess } from './useAccess';

const LABEL = {
  writing: ['correction écrite', 'corrections écrites'],
  speaking: ['correction orale', 'corrections orales'],
  tutor: ['question au tuteur', 'questions au tuteur'],
} as const;
const count = (n: number, f: keyof typeof LABEL) => `${n} ${LABEL[f][n > 1 ? 1 : 0]}`;

/** Remaining AI tries for one feature: free trial (lifetime) or pack (per day). */
export default function TrialBanner({ feature }: { feature: keyof typeof LABEL }) {
  const access = useAccess();
  if (!access?.signedIn || !access.remaining || access.plan === 'staff') return null;
  const left = access.remaining[feature];
  const trial = access.plan === 'trial';

  if (trial && left === 0) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border-2 border-container bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink"><strong className="text-night">Votre essai gratuit est terminé.</strong> Choisissez un pack pour continuer avec des corrections chaque jour.</p>
        <Link href="/packs/" className="shrink-0 rounded-full bg-container px-5 py-3 text-center font-bold text-night hover:bg-container-hover">Voir les packs</Link>
      </div>
    );
  }
  return (
    <p className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-night">
      {trial
        ? <>Essai gratuit : il vous reste <strong>{count(left, feature)}</strong>. <Link href="/packs/" className="font-semibold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Passer à un pack</Link></>
        : <>Aujourd’hui, il vous reste <strong>{count(left, feature)}</strong> avec votre pack.</>}
    </p>
  );
}
