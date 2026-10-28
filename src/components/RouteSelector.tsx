'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

// Home hero: pick a route, see how we ship it, go straight to a quote for it.

type Route = {
  id: string;
  tab: string;
  from: string;
  to: string;
  modes: { name: string; text: string }[];
  includes: string;
  service: string; // value pre-selected in the contact form
};

const routes: Record<'fr' | 'en', Route[]> = {
  fr: [
    {
      id: 'cn-cm',
      tab: 'Chine → Cameroun',
      from: 'Foshan, Guangzhou',
      to: 'Douala, Yaoundé',
      modes: [
        { name: 'Maritime', text: 'Conteneur complet ou groupage, tarif au m³' },
        { name: 'Aérien', text: 'Colis et marchandises urgentes, tarif au kilo' },
      ],
      includes: 'Achat, contrôle qualité, dédouanement et livraison peuvent être inclus.',
      service: 'Fret Chine → Afrique (maritime / aérien)',
    },
    {
      id: 'cm-ca',
      tab: 'Cameroun → Canada',
      from: 'Douala, Yaoundé',
      to: 'Montréal, Toronto',
      modes: [
        { name: 'Maritime', text: 'Groupage pour cartons, fûts et effets personnels' },
        { name: 'Aérien', text: 'Colis urgents et documents, tarif au kilo' },
      ],
      includes: 'Nous vérifions ce que le Canada autorise et préparons les documents.',
      service: 'Fret Cameroun → Canada',
    },
    {
      id: 'sourcing',
      tab: 'Acheter en Chine',
      from: 'Fournisseurs chinois',
      to: 'Votre entrepôt',
      modes: [
        { name: 'Recherche', text: 'Fournisseurs vérifiés et négociation des prix' },
        { name: 'Contrôle', text: 'Inspection des produits avant expédition' },
      ],
      includes: 'Nous payons vos fournisseurs en Yuan et regroupons vos commandes à Foshan.',
      service: 'Achats et sourcing en Chine',
    },
  ],
  en: [
    {
      id: 'cn-cm',
      tab: 'China → Cameroon',
      from: 'Foshan, Guangzhou',
      to: 'Douala, Yaoundé',
      modes: [
        { name: 'Sea', text: 'Full container or consolidation, priced per m³' },
        { name: 'Air', text: 'Urgent parcels and goods, priced per kilo' },
      ],
      includes: 'Purchasing, quality control, customs clearance and delivery can be included.',
      service: 'Freight China → Africa (sea / air)',
    },
    {
      id: 'cm-ca',
      tab: 'Cameroon → Canada',
      from: 'Douala, Yaoundé',
      to: 'Montreal, Toronto',
      modes: [
        { name: 'Sea', text: 'Consolidation for boxes, barrels and personal effects' },
        { name: 'Air', text: 'Urgent parcels and documents, priced per kilo' },
      ],
      includes: 'We check what Canada allows and prepare the paperwork.',
      service: 'Freight Cameroon → Canada',
    },
    {
      id: 'sourcing',
      tab: 'Buy in China',
      from: 'Chinese suppliers',
      to: 'Your warehouse',
      modes: [
        { name: 'Sourcing', text: 'Vetted suppliers and price negotiation' },
        { name: 'Inspection', text: 'Product checks before shipment' },
      ],
      includes: 'We pay your suppliers in Yuan and consolidate your orders in Foshan.',
      service: 'Purchasing and sourcing in China',
    },
  ],
};

const labels = {
  fr: { aria: 'Choisissez un trajet', quote: 'Demander un devis pour ce trajet' },
  en: { aria: 'Choose a route', quote: 'Get a quote for this route' },
};

export default function RouteSelector() {
  const { language } = useLanguage();
  const list = routes[language];
  const [active, setActive] = useState(0);
  const route = list[active];
  const l = labels[language];

  return (
    <div className="w-full max-w-xl rounded-2xl bg-white p-2 text-ink shadow-2xl shadow-night-deep/40">
      <div role="tablist" aria-label={l.aria} className="grid grid-cols-3 gap-1 rounded-xl bg-paper p-1">
        {list.map((r, i) => (
          <button
            key={r.id}
            role="tab"
            id={`route-tab-${r.id}`}
            aria-selected={i === active}
            aria-controls="route-panel"
            onClick={() => setActive(i)}
            className={`rounded-lg px-2 py-2.5 text-xs font-bold transition-colors sm:text-sm ${
              i === active ? 'bg-night text-white' : 'text-slate hover:bg-white'
            }`}
          >
            {r.tab}
          </button>
        ))}
      </div>

      <div id="route-panel" role="tabpanel" aria-labelledby={`route-tab-${route.id}`} className="p-4 sm:p-6">
        {/* The route itself: two ends joined by a line that redraws when the route changes. */}
        <div className="flex items-center gap-3">
          <span className="heading max-w-[38%] text-base text-night sm:text-lg">{route.from}</span>
          <svg key={route.id} className="h-4 min-w-16 flex-1" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
            <circle cx="3" cy="5" r="3" fill="var(--ocean)" />
            <line x1="8" y1="5" x2="92" y2="5" stroke="var(--sky)" strokeWidth="2" strokeDasharray="5 4" className="route-line" />
            <circle cx="97" cy="5" r="3" fill="var(--container)" />
          </svg>
          <span className="heading max-w-[38%] text-right text-base text-night sm:text-lg">{route.to}</span>
        </div>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {route.modes.map((m) => (
            <div key={m.name} className="rounded-lg border border-rule p-3">
              <dt className="text-sm font-bold text-ocean">{m.name}</dt>
              <dd className="mt-1 text-sm text-slate">{m.text}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-slate">{route.includes}</p>

        <Link
          href={`/contact/?service=${encodeURIComponent(route.service)}`}
          className="mt-5 flex w-full items-center justify-center rounded-md bg-container px-5 py-3.5 font-bold text-night transition-colors hover:bg-container-hover"
        >
          {l.quote}
        </Link>
      </div>
      <style>{`
        .route-line { stroke-dashoffset: 90; animation: route-draw .7s ease-out forwards; }
        @keyframes route-draw { to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}
