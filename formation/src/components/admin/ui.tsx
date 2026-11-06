import type { ReactNode } from 'react';
export function AdminHeading({ eyebrow = 'Administration', title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule bg-white px-5 py-7 sm:px-8"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-emerald-700">{eyebrow}</p><h1 className="mt-2 text-2xl font-extrabold text-night sm:text-3xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm text-slate">{description}</p>}</div>{action}</div>;
}
export function AdminBody({ children }: { children: ReactNode }) { return <div className="space-y-6 px-4 py-6 sm:px-8">{children}</div>; }
export function DataError({ children = 'Les données ne sont pas disponibles. Réessayez dans quelques instants.' }: { children?: ReactNode }) { return <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-maple">{children}</p>; }
export const fieldClass = 'w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-night';
/*
 * Buttons of the admin area, one look per role so a click target is never mistaken
 * for text: main action (filled blue), other actions (blue outline), confirmations
 * (green), destructive actions (red), and links (underlined).
 */
const base = 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean disabled:pointer-events-none disabled:opacity-50';
export const adminButton = `${base} bg-ocean text-white shadow-[0_4px_14px_rgba(36,66,199,.30)] hover:bg-night`;
export const adminSecondary = `${base} border-2 border-ocean bg-white text-ocean hover:bg-ocean hover:text-white`;
export const adminSuccess = `${base} bg-green-700 text-white shadow-[0_4px_14px_rgba(21,128,61,.25)] hover:bg-green-800`;
export const adminDanger = `${base} border-2 border-red-600 bg-white text-red-700 hover:bg-red-600 hover:text-white`;
export const adminDangerSolid = `${base} bg-red-600 text-white hover:bg-red-700`;
export const adminSmall = '!px-3 !py-1.5 !text-xs';
export const adminLink = 'font-bold text-ocean underline decoration-ocean/30 decoration-2 underline-offset-4 hover:decoration-ocean';
