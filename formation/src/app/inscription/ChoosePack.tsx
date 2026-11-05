'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatPrice, packDuration, packs, type Zone } from '@/content/offers';
import { requestPack } from './actions';
import PayByCard from '@/components/packs/PayByCard';
import { tier } from '@/components/packs/PackGrid';

/** For a signed-in candidate: pick a pack, then pay by card or ask an advisor (Mobile Money, office). */
export default function ChoosePack({ initialPack, zone }: { initialPack: string; zone: Zone }) {
  const [pack, setPack] = useState(packs.some((p) => p.id === initialPack) ? initialPack : 'gold');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const chosen = packs.find((p) => p.id === pack)!;

  const send = async () => {
    setState('sending');
    const res = await requestPack(pack);
    setState(res.ok ? 'done' : 'error');
    setMessage(res.error ?? '');
  };

  if (state === 'done') {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(20,33,61,.08)] sm:p-10" role="status">
        <h2 className="heading text-2xl text-night">Demande envoyée</h2>
        <p className="mt-4 font-semibold text-night">Pack {chosen.name} · {formatPrice(chosen, zone)}</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate"><li>Demande de pack reçue.</li><li>Un conseiller vous contacte sous 24 h ouvrées pour le paiement.</li><li>Votre accès s’ouvre dès réception du paiement.</li></ol>
        {message && <p className="mt-4">{message}</p>}
        <Link href="/espace/" className="mt-6 inline-flex rounded-lg bg-ocean px-6 py-3.5 font-bold text-white hover:bg-night">Aller à mon espace</Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(20,33,61,.08)] sm:p-10">
      <h2 className="heading text-2xl text-night">Choisissez votre pack</h2>
      <p className="mt-2 text-slate">Vous êtes connecté : pas besoin de remplir le formulaire. Choisissez un pack, puis votre façon de payer.</p>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-bold text-night">1. Le pack</legend>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {packs.map((p) => {
            const on = pack === p.id;
            return (
              <label key={p.id} className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 bg-white transition hover:-translate-y-0.5 hover:shadow-md ${on ? 'border-ocean shadow-md' : 'border-rule'}`}>
                <input type="radio" name="pack" className="sr-only" checked={on} onChange={() => setPack(p.id)} />
                <span className={`flex items-center justify-between px-4 py-2.5 text-sm font-bold ${tier[p.id].band} ${tier[p.id].text}`}>
                  {p.name}
                  {p.featured && <span className="rounded-full bg-night px-2 py-0.5 text-[10px] text-[#ffd84a]">Recommandé</span>}
                </span>
                <span className="block px-4 py-3">
                  <span className="block text-xl font-extrabold text-night">{formatPrice(p, zone)}</span>
                  <span className="block text-sm text-slate">{packDuration(p)} d’accès</span>
                </span>
                <span aria-hidden="true" className={`absolute bottom-3 right-3 grid h-6 w-6 place-items-center rounded-full border-2 text-xs font-bold ${on ? 'border-ocean bg-ocean text-white' : 'border-rule text-transparent'}`}>✓</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8">
        <p className="mb-3 text-sm font-bold text-night">2. Le paiement de votre pack {chosen.name} · {formatPrice(chosen, zone)}</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border-2 border-rule p-5">
            <p className="font-bold text-night">Par carte, tout de suite</p>
            <p className="mt-1 text-sm text-slate">Accès ouvert dès le paiement accepté.</p>
            <PayByCard pack={pack} zone={zone} className="mt-4" fallback={<p className="mt-4 rounded-lg bg-paper p-3 text-sm text-slate">Le paiement par carte arrive bientôt.</p>} />
          </div>
          <div className="rounded-xl border-2 border-rule p-5">
            <p className="font-bold text-night">Mobile Money ou au bureau</p>
            <p className="mt-1 text-sm text-slate">Un conseiller vous contacte sous 24 h ouvrées (MTN, Orange, espèces).</p>
            <button onClick={send} disabled={state === 'sending'} className="mt-4 inline-flex w-full items-center justify-center rounded-lg border-2 border-ocean bg-white px-5 py-3.5 font-bold text-ocean transition hover:bg-ocean hover:text-white disabled:opacity-50">
              {state === 'sending' ? 'Envoi…' : 'Être contacté par un conseiller'}
            </button>
          </div>
        </div>
        {state === 'error' && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-maple">{message || 'La demande a échoué. Réessayez.'}</p>}
      </div>
    </div>
  );
}
