'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import SignInPrompt from '@/components/ai/SignInPrompt';
import { useAccess } from './useAccess';

/** The API enforces the same entitlement before calling an AI provider. */
export default function AiGate({ next, title = 'Connectez-vous pour accéder à l’IA', children }: { next: string; title?: string; children: ReactNode }) {
  const access = useAccess();
  if (access === null) return <p role="status" className="p-5 text-sm text-slate">Vérification de votre accès…</p>;
  if (!access.signedIn) return <SignInPrompt next={next} title={title} text="Les corrections et le tuteur IA sont réservés aux packs payants actifs. Connectez-vous au compte associé à votre pack." />;
  if (access.aiAllowed) return <>{children}</>;
  return (
    <div className="rounded-2xl border border-rule bg-white p-6">
      <h2 className="heading text-xl text-night">Un pack actif est nécessaire pour l’IA</h2>
      <p className="mt-3 text-slate">Votre compte gratuit ne comprend pas d’accès à l’IA. Chaque pack payant inclut un quota de corrections et de questions au tuteur sur les dernières 24 heures.</p>
      <Link href="/packs/" className="mt-5 inline-flex rounded-full bg-container px-6 py-3 font-bold text-night hover:bg-container-hover">Choisir un pack</Link>
    </div>
  );
}
