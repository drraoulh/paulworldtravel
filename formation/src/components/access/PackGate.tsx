'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { freeSeriesRange } from '@/content/offers';
import { hasPack, useAccess } from './useAccess';

/**
 * Shows its children to candidates with an active pack (and staff); others see what
 * the free account includes and how to unlock the content.
 */
export default function PackGate({ what, next, children }: { what: string; next: string; children: ReactNode }) {
  const access = useAccess();
  if (access === null) return <div className="h-64 animate-pulse rounded-2xl bg-white" aria-label="Chargement" />;
  if (hasPack(access)) return <>{children}</>;

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-10">
      <p className="flex h-12 w-12 items-center justify-center rounded-full bg-paper text-night" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
      </p>
      <h2 className="heading mt-5 text-2xl text-night">{what} fait partie des packs</h2>
      <p className="mt-3 max-w-2xl text-slate">
        Votre compte gratuit comprend le test de niveau, les leçons de méthode, {freeSeriesRange} de chaque compréhension, les sujets corrigés
        sans accès à l’IA.
        Un pack débloque toutes les séries, les examens blancs et les corrections chaque jour.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/packs/" className="rounded-full bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover">Voir les packs</Link>
        {!access.signedIn && (
          <Link href="/inscription/" className="rounded-full bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean">Créer un compte gratuit</Link>
        )}
        {!access.signedIn && (
          <Link href={`/connexion/?suite=${encodeURIComponent(next)}`} className="rounded-full border border-rule px-6 py-3.5 font-semibold text-night hover:border-night">
            J’ai déjà un pack : me connecter
          </Link>
        )}
      </div>
    </div>
  );
}
