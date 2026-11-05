'use client';

import type { ReactNode } from 'react';
import { packName } from '@/content/offers';
import { formatDate } from '@/lib/labels';
import { useAudience, type Access, type Audience } from './useAccess';

/**
 * Picks what to say for the reader: `visitor` (not signed in), `free` (free account)
 * and `pack` (active pack or staff). Shows nothing while the access loads, so a
 * candidate with a pack never sees an offer for a free trial.
 */
export default function ForAudience({ visitor, free, pack }: {
  visitor?: ReactNode;
  free?: ReactNode;
  pack?: ReactNode;
}) {
  const { audience } = useAudience();
  if (!audience) return null;
  const by: Record<Audience, ReactNode> = { visitor, free, pack };
  return <>{by[audience] ?? null}</>;
}

/** « Pack Silver actif jusqu’au 4 janvier 2027 », or « Accès équipe ». */
export function PackStatus() {
  const { access } = useAudience();
  return access ? <>{packLine(access)}</> : null;
}

function packLine(a: Access) {
  if (a.plan === 'staff') return 'Accès équipe : tout est ouvert';
  const name = a.pack ? `Pack ${packName(a.pack)}` : 'Votre pack';
  return a.endsAt ? `${name} actif jusqu’au ${formatDate(a.endsAt)}` : `${name} actif`;
}
