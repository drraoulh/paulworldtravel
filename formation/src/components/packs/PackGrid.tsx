import Link from 'next/link';
import { Check } from '@/components/ui';
import { formatPrice, packDuration, packIncludes, packs, type Pack, type PackId, type Zone } from '@/content/offers';

/*
 * The packs, priced for the visitor's zone (chosen by the server, never by the visitor).
 * Each pack has its own colour so the offers stand apart from the rest of the site:
 * the coloured header, the large price and the button sit together at the top of the card.
 */

export const tier: Record<PackId, { band: string; text: string; ring: string; button: string }> = {
  express: { band: 'bg-[#ffd84a]', text: 'text-night', ring: 'ring-[#e0b300]', button: 'bg-night text-white hover:bg-ocean' },
  essentiel: { band: 'bg-ocean', text: 'text-white', ring: 'ring-ocean', button: 'bg-ocean text-white hover:bg-night' },
  silver: { band: 'bg-gradient-to-br from-[#e3e8ef] to-[#9aa6b6]', text: 'text-night', ring: 'ring-[#8a96a8]', button: 'bg-[#4a5568] text-white hover:bg-night' },
  gold: { band: 'bg-gradient-to-br from-[#f7dc7a] to-[#c9971f]', text: 'text-night', ring: 'ring-[#c9971f]', button: 'bg-[#a87b0f] text-white hover:bg-night' },
  platinum: { band: 'bg-gradient-to-br from-night to-[#2442c7]', text: 'text-white', ring: 'ring-night', button: 'bg-night text-white hover:bg-ocean' },
};

const KEY_ITEMS = 4;

function Cta({ pack, className = '' }: { pack: Pack; className?: string }) {
  return (
    <Link
      href={`/inscription/?formule=${pack.id}`}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-bold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${tier[pack.id].button} ${className}`}
    >
      Choisir {pack.name}
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10h12m-5-5 5 5-5 5" /></svg>
    </Link>
  );
}

function Items({ pack, zone }: { pack: Pack; zone: Zone }) {
  const all = packIncludes(pack, zone);
  const rest = all.slice(KEY_ITEMS);
  return (
    <>
      <ul className="space-y-2.5 text-[0.95rem]">{all.slice(0, KEY_ITEMS).map((item) => <Check key={item}>{item}</Check>)}</ul>
      {rest.length > 0 && (
        <details className="group mt-3">
          <summary className="cursor-pointer list-none text-sm font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">
            <span className="group-open:hidden">Voir tout le détail ({rest.length} de plus)</span>
            <span className="hidden group-open:inline">Masquer le détail</span>
          </summary>
          <ul className="mt-3 space-y-2.5 text-[0.95rem]">{rest.map((item) => <Check key={item}>{item}</Check>)}</ul>
        </details>
      )}
    </>
  );
}

export default function PackGrid({ zone }: { zone: Zone }) {
  const starter = packs.filter((p) => p.starter);
  const main = packs.filter((p) => !p.starter);
  return (
    <>
      {starter.map((p) => (
        <article key={p.id} className="mb-6 overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(20,33,61,.10)] ring-2 ring-[#e0b300]">
          <div className="grid md:grid-cols-[1fr_1.3fr]">
            <div className={`${tier[p.id].band} ${tier[p.id].text} p-6`}>
              <span className="rounded-full bg-night px-3 py-1 text-xs font-bold text-[#ffd84a]">Pour commencer</span>
              <h2 className="heading mt-3 text-2xl">{p.name} <span className="text-base font-semibold">· {packDuration(p)}</span></h2>
              <p className="mt-1 font-semibold opacity-80">{p.tagline}</p>
              <p className="display mt-4 whitespace-nowrap text-[2.4rem] leading-none">{formatPrice(p, zone)}</p>
              <Cta pack={p} className="mt-5 sm:w-auto" />
            </div>
            <div className="p-6"><Items pack={p} zone={zone} /></div>
          </div>
        </article>
      ))}

      <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-4">
        {main.map((p) => (
          <article
            key={p.id}
            className={`relative overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(20,33,61,.10)] ${p.featured ? `ring-4 ${tier[p.id].ring} xl:-mt-3` : 'ring-1 ring-rule'}`}
          >
            <div className={`${tier[p.id].band} ${tier[p.id].text} px-6 pb-5 pt-6`}>
              {p.featured && <span className="mb-3 inline-block rounded-full bg-night px-3 py-1 text-xs font-bold text-[#ffd84a]">Recommandé</span>}
              <h2 className="heading text-2xl">{p.name}</h2>
              <p className="mt-1 text-sm font-semibold opacity-85">{p.tagline}</p>
            </div>
            <div className="p-6">
              <p className="display whitespace-nowrap text-[2.1rem] leading-none text-night">{formatPrice(p, zone)}</p>
              <p className="mt-1 text-sm text-slate">pour {packDuration(p)} d’accès</p>
              <Cta pack={p} className="mt-5" />
              <div className="mt-6 border-t border-rule pt-5"><Items pack={p} zone={zone} /></div>
            </div>
          </article>
        ))}
      </div>

      <Comparison zone={zone} />
    </>
  );
}

const yes = <span className="font-bold text-ocean" aria-label="inclus">✓</span>;
const no = <span className="text-slate/60" aria-label="non inclus">—</span>;
const withTrainer = (id: PackId) => id === 'gold' || id === 'platinum';

function Comparison({ zone }: { zone: Zone }) {
  const rows: [string, (p: Pack) => React.ReactNode][] = [
    ['Durée d’accès', (p) => packDuration(p)],
    ['Prix', (p) => <span className="whitespace-nowrap font-bold text-night">{formatPrice(p, zone)}</span>],
    ['Séries, leçons et examens blancs', () => yes],
    ['Corrections IA écrites par jour', (p) => p.ai.writing],
    ['Corrections IA orales par jour', (p) => p.ai.speaking],
    ['Questions au tuteur IA par jour', (p) => p.ai.tutor],
    ['Productions notées par un formateur', (p) => ({ express: no, essentiel: no, silver: '2', gold: '8', platinum: '8' } as Record<PackId, React.ReactNode>)[p.id]],
    ['Cours en direct avec un formateur', (p) => (withTrainer(p.id) ? yes : no)],
    ['Coaching individuel et oral face à un examinateur', (p) => (p.id === 'platinum' ? yes : no)],
  ];
  return (
    <section className="mt-12" aria-labelledby="comparatif">
      <h2 id="comparatif" className="heading text-2xl text-night">Comparer les packs</h2>
      <div className="mt-5 overflow-x-auto rounded-2xl bg-white shadow-[0_10px_30px_rgba(20,33,61,.08)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr>
              <th className="p-4" />
              {packs.map((p) => <th key={p.id} className={`p-4 text-center text-base font-bold ${tier[p.id].band} ${tier[p.id].text}`}>{p.name}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {rows.map(([label, cell]) => (
              <tr key={label}>
                <th scope="row" className="p-4 font-semibold text-night">{label}</th>
                {packs.map((p) => <td key={p.id} className="p-4 text-center text-slate">{cell(p)}</td>)}
              </tr>
            ))}
            <tr>
              <td className="p-4" />
              {packs.map((p) => (
                <td key={p.id} className="p-3 text-center">
                  <Link href={`/inscription/?formule=${p.id}`} className="font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean">Choisir</Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
