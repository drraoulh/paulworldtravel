'use client';

import { useState } from 'react';
import { ButtonLink, Check } from '@/components/ui';
import { formatPrice, packIncludes, packs, zones, type Zone } from '@/content/offers';

/** The four packs, with a switch for the visitor's price zone. */
export default function PackGrid({ initialZone }: { initialZone: Zone }) {
  const [zone, setZone] = useState<Zone>(initialZone);

  const choose = (z: Zone) => {
    setZone(z);
    const url = new URL(window.location.href);
    url.searchParams.set('zone', z);
    window.history.replaceState(null, '', url);
  };

  return (
    <>
      <fieldset className="mb-8">
        <legend className="font-semibold text-night">Prix affichés pour</legend>
        <div className="mt-3 inline-flex flex-wrap gap-2 rounded-full bg-white p-1.5">
          {zones.map((z) => (
            <button key={z.id} type="button" onClick={() => choose(z.id)} aria-pressed={zone === z.id}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${zone === z.id ? 'bg-night text-white' : 'text-slate hover:text-night'}`}>
              {z.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {packs.map((p) => (
          <article key={p.id} className={`relative flex flex-col rounded-2xl bg-white p-6 ${p.featured ? 'ring-2 ring-ocean' : 'border border-rule'}`}>
            {p.featured && <span className="absolute -top-3 left-6 rounded-full bg-ocean px-3 py-1 text-xs font-bold text-white">Le plus choisi</span>}
            <h2 className="heading text-2xl text-night">{p.name}</h2>
            <p className="mt-1 text-slate">{p.tagline}</p>
            <p className="mt-6"><span className="display whitespace-nowrap text-[2rem] text-night">{formatPrice(p, zone)}</span></p>
            <p className="text-sm text-slate">pour {p.months} mois d’accès</p>
            <ul className="mt-6 flex-1 space-y-3 text-[0.95rem]">
              {packIncludes(p, zone).map((item) => <Check key={item}>{item}</Check>)}
            </ul>
            <ButtonLink href={`/inscription/?formule=${p.id}&zone=${zone}`} variant={p.featured ? 'primary' : 'dark'} className="mt-8 w-full">
              Choisir {p.name}
            </ButtonLink>
          </article>
        ))}
      </div>
    </>
  );
}
