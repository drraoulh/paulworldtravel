'use client';

import SignInRequired from './SignInRequired';
import type { ReactNode } from 'react';
import { useAccess } from './useAccess';

/** Free content that needs a (free) account: signed-in visitors see it, others are asked to sign up. */
export default function AccountGate({ what, next, children }: { what: string; next: string; children: ReactNode }) {
  const access = useAccess();
  if (access === null) return <div className="h-64 animate-pulse rounded-2xl bg-white" aria-label="Chargement" />;
  if (access.signedIn) return <>{children}</>;
  return (
    <SignInRequired
      next={next}
      title={`Connectez-vous pour faire ${what.charAt(0).toLowerCase()}${what.slice(1)}`}
      text={`${what} est gratuite avec un compte. Votre score, votre niveau NCLC et vos progrès sont enregistrés dans votre espace.`}
    />
  );
}
