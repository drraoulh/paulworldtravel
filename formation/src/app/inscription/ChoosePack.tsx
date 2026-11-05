'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatPrice, packDuration, packs, type Zone } from '@/content/offers';
import { requestPack } from './actions';
import PayByCard from '@/components/packs/PayByCard';

/** For a signed-in candidate: pick a pack and send the request in one step. */
export default function ChoosePack({ initialPack, zone }: { initialPack: string; zone: Zone }) {
  const [pack, setPack] = useState(packs.some((p) => p.id === initialPack) ? initialPack : 'gold');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const send = async () => {
    setState('sending');
    const res = await requestPack(pack);
    setState(res.ok ? 'done' : 'error');
    setMessage(res.error ?? '');
  };

  if (state === 'done') {
    return (
      <div className="rounded-lg bg-white p-6 sm:p-10" role="status">
        <h2 className="heading text-2xl text-night">Demande envoyée</h2>
        <p className="mt-4 font-semibold text-night">Pack {packs.find((p) => p.id === pack)!.name} · {formatPrice(packs.find((p) => p.id === pack)!, zone)}</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate"><li>Demande de pack reçue.</li><li>Paiement avec votre conseiller, sous 24 h ouvrées pour la prise de contact.</li><li>Activation après réception du paiement.</li></ol>
        <p className="mt-4 text-lg">{message || 'Un conseiller vous contacte sous 24 h ouvrées pour le paiement. Votre accès est activé dès réception.'}</p>
        <Link href="/espace/" className="mt-6 inline-flex rounded-full bg-night px-6 py-3 font-bold text-white hover:bg-ocean">Aller à mon espace</Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 sm:p-10">
      <h2 className="heading text-2xl text-night">Vous êtes connecté : choisissez votre pack</h2>
      <p className="mt-2 text-slate">Pas besoin de remplir le formulaire à nouveau. Payez par carte tout de suite, ou envoyez votre demande : un conseiller vous contacte pour le paiement par Mobile Money ou au bureau.</p>
      <fieldset className="mt-6 grid gap-3 sm:grid-cols-2">
        <legend className="sr-only">Pack</legend>
        {packs.map((p) => (
          <label key={p.id} className={`cursor-pointer rounded-xl border-2 p-4 ${pack === p.id ? 'border-ocean bg-blue-50' : 'border-rule hover:border-ocean/50'}`}>
            <input type="radio" name="pack" className="sr-only" checked={pack === p.id} onChange={() => setPack(p.id)} />
            <span className="heading block text-lg text-night">{p.name}</span>
            <span className="block text-slate">{formatPrice(p, zone)}, {packDuration(p)}</span>
          </label>
        ))}
      </fieldset>
      {state === 'error' && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-maple">{message || 'La demande a échoué. Réessayez.'}</p>}
      <PayByCard pack={pack} zone={zone} className="mt-6" />
      <button onClick={send} disabled={state === 'sending'} className="mt-6 rounded-full bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover disabled:opacity-50">
        {state === 'sending' ? 'Envoi…' : 'Payer avec un conseiller (Mobile Money, bureau)'}
      </button>
    </div>
  );
}
