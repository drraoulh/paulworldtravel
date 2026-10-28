import type { ReactNode } from 'react';

/*
 * The level scale: CEFR levels A1 to C2 on a ruler, with the NCLC levels placed
 * where the official TCF Canada table puts them. Used as the site's signature.
 */
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export type CefrLevel = (typeof LEVELS)[number];

/** Position of each NCLC level along the ruler, in % (official TCF Canada correspondence). */
export const NCLC_POSITION: Record<number, number> = { 4: 25, 5: 38.9, 6: 44.4, 7: 55.6, 8: 61.1, 9: 75, 10: 91.7 };

export default function LevelScale({ target, label, current }: {
  /** NCLC level to point at, with the travelling marker. */
  target?: number;
  label?: ReactNode;
  /** Highlights one CEFR segment instead (e.g. the level of a question). */
  current?: CefrLevel;
}) {
  const pos = target ? NCLC_POSITION[target] : undefined;
  return (
    <figure className="relative select-none" aria-label={target ? `Échelle des niveaux : objectif NCLC ${target}` : 'Échelle des niveaux A1 à C2'}>
      {/* CEFR levels */}
      <div className="grid grid-cols-6" aria-hidden="true">
        {LEVELS.map((l) => (
          <span key={l} className={`heading pb-2 text-center text-xl sm:text-3xl ${current === l ? 'text-night' : current ? 'text-slate/45' : 'text-night'}`}>
            <span className={current === l ? 'marked px-1' : ''}>{l}</span>
          </span>
        ))}
      </div>

      {/* Ruler */}
      <div className="relative h-7" aria-hidden="true">
        {pos !== undefined && (
          <span className="scale-marker absolute inset-y-[-0.35rem] w-3 -translate-x-1/2 rounded-sm bg-container" style={{ left: `${pos}%` }} />
        )}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-night" />
        {Array.from({ length: 31 }, (_, i) => {
          const major = i % 5 === 0;
          return (
            <span key={i} className={`absolute top-0 w-px bg-night ${major ? 'h-5' : 'h-2.5 opacity-50'}`} style={{ left: `${(i / 30) * 100}%` }} />
          );
        })}
      </div>

      {/* NCLC levels */}
      <div className="relative mt-1 h-6 text-sm text-slate" aria-hidden="true">
        <span className="absolute left-0 top-0 hidden sm:block">NCLC</span>
        {Object.entries(NCLC_POSITION).map(([n, p]) => (
          <span key={n} className={`absolute top-0 -translate-x-1/2 tabular-nums ${Number(n) === target ? 'font-bold text-night' : ''}`} style={{ left: `${p}%` }}>
            {n === '10' ? '10+' : n}
          </span>
        ))}
      </div>

      {label && pos !== undefined && (
        <figcaption className="scale-marker relative mt-3 w-fit max-w-[16rem] -translate-x-1/2 text-center text-sm text-ink sm:max-w-xs" style={{ left: `${pos}%` }}>
          {label}
        </figcaption>
      )}
    </figure>
  );
}
