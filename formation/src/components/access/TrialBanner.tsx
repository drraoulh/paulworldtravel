'use client';

import { useAccess } from './useAccess';

const LABEL = {
  writing: ['correction écrite', 'corrections écrites'],
  speaking: ['correction orale', 'corrections orales'],
  tutor: ['question au tuteur', 'questions au tuteur'],
} as const;

export default function TrialBanner({ feature }: { feature: keyof typeof LABEL }) {
  const access = useAccess();
  if (!access?.signedIn || !access.aiAllowed || !access.remaining || access.plan === 'staff') return null;
  const left = access.remaining[feature];
  return (
    <p className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-night">
      Il vous reste <strong>{left} {LABEL[feature][left > 1 ? 1 : 0]}</strong> avec votre pack sur les dernières 24 heures. Les utilisations se libèrent progressivement après 24 heures.
    </p>
  );
}
