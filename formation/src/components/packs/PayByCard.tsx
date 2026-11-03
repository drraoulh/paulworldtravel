'use client';

import { useEffect, useState } from 'react';
import type { Zone } from '@/content/offers';

/**
 * Opens the Stripe payment page for a pack. Hidden while card payment is not set
 * up. `enabled` can come from the server; otherwise the button asks the API.
 */
export default function PayByCard({ pack, zone, enabled, label = 'Payer par carte maintenant', className = '' }: { pack: string; zone: Zone; enabled?: boolean; label?: string; className?: string }) {
  const [available, setAvailable] = useState(enabled ?? false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (enabled !== undefined) return;
    fetch('/api/paiement/stripe/').then((r) => r.json()).then((d) => setAvailable(Boolean(d.enabled))).catch(() => setAvailable(false));
  }, [enabled]);

  if (!available) return null;

  const pay = async () => {
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/paiement/stripe/', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ pack, zone }) });
      const data = await res.json();
      if (res.ok && data.url) return window.location.assign(data.url);
      setError(data.error ?? 'Le paiement n’a pas pu démarrer. Réessayez.');
    } catch {
      setError('Le paiement n’a pas pu démarrer. Vérifiez votre connexion et réessayez.');
    }
    setBusy(false);
  };

  return (
    <div className={className}>
      <button type="button" onClick={pay} disabled={busy} className="rounded-full bg-night px-6 py-3.5 font-bold text-white hover:bg-ocean disabled:opacity-50">
        {busy ? 'Ouverture du paiement…' : label}
      </button>
      <p className="mt-2 text-sm text-slate">Visa, Mastercard ou Apple Pay, sur la page sécurisée de Stripe. Votre accès s’ouvre dès le paiement accepté.</p>
      {error && <p role="alert" className="mt-2 text-sm text-maple">{error}</p>}
    </div>
  );
}
