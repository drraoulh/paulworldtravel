'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useAccess } from './useAccess';

/** Free content that needs a (free) account: signed-in visitors see it, others are asked to sign up. */
export default function AccountGate({ what, next, children }: { what: string; next: string; children: ReactNode }) {
  const access = useAccess();
  if (access === null) return <div className="h-64 animate-pulse rounded-2xl bg-white" aria-label="Chargement" />;
  if (access.signedIn) return <>{children}</>;
  return (
    <div className="rounded-2xl bg-white p-6 sm:p-10">
      <h2 className="heading text-2xl text-night">{what} est gratuite avec un compte</h2>
      <p className="mt-3 max-w-2xl text-slate">
        Créez votre compte gratuit en une minute pour faire cette série. Votre score, votre niveau NCLC et vos progrès sont enregistrés dans votre espace.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/inscription/?suite=${encodeURIComponent(next)}`} className="inline-flex items-center rounded-lg bg-ocean px-6 py-3.5 font-bold text-white shadow-[0_4px_14px_rgba(36,66,199,.35)] transition hover:-translate-y-0.5 hover:bg-night">Créer mon compte gratuit</Link>
        <Link href={`/connexion/?suite=${encodeURIComponent(next)}`} className="inline-flex items-center rounded-lg border-2 border-ocean bg-white px-6 py-3.5 font-bold text-ocean transition hover:bg-ocean hover:text-white">J’ai déjà un compte</Link>
      </div>
    </div>
  );
}
