'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatPrice, packs, type Zone } from '@/content/offers';
import { requestPack } from './actions';

/** For a signed-in candidate: pick a pack and send the request in one step. */
export default function ChoosePack({ initialPack, zone }: { initialPack: string; zone: Zone }) {
  const [pack, setPack] = useState(packs.some((p) => p.id === initialPack) ? initialPack : 'gold');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const send = async () => {
    setState('sending');
    const res = await requestPack(pack, zone);
    setState(res.ok ? 'done' : 'error');
    setMessage(res.error ?? '');
  };

  if (state === 'done' || state === 'error') {
    return (
      <div className="rounded-lg bg-white p-6 sm:p-10" role="status">
        <h2 className="heading text-2xl text-night">Demande envoyée</h2>
        <p className="mt-4 text-lg">{message || 'Un conseiller vous contacte sous 24 h ouvrées pour le paiement. Votre accès est activé dès réception.'}</p>
        <Link href="/espace/" className="mt-6 inline-flex rounded-full bg-night px-6 py-3 font-bold text-white hover:bg-ocean">Aller à mon espace</Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 sm:p-10">
      <h2 className="heading text-2xl text-night">Vous êtes connecté : choisissez votre pack</h2>
      <p className="mt-2 text-slate">Pas besoin de remplir le formulaire à nouveau. Un conseiller vous contacte pour le paiement.</p>
      <fieldset className="mt-6 grid gap-3 sm:grid-cols-2">
        <legend className="sr-only">Pack</legend>
        {packs.map((p) => (
          <label key={p.id} className={`cursor-pointer rounded-xl border-2 p-4 ${pack === p.id ? 'border-ocean bg-blue-50' : 'border-rule hover:border-ocean/50'}`}>
            <input type="radio" name="pack" className="sr-only" checked={pack === p.id} onChange={() => setPack(p.id)} />
            <span className="heading block text-lg text-night">{p.name}</span>
            <span className="block text-slate">{formatPrice(p, zone)}, {p.months} mois</span>
          </label>
        ))}
      </fieldset>
      <button onClick={send} disabled={state === 'sending'} className="mt-6 rounded-full bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover disabled:opacity-50">
        {state === 'sending' ? 'Envoi…' : 'Envoyer ma demande'}
      </button>
    </div>
  );
}
