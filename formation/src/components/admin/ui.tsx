import type { ReactNode } from 'react';
export function AdminHeading({ eyebrow = 'Administration', title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule bg-white px-5 py-7 sm:px-8"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-emerald-700">{eyebrow}</p><h1 className="mt-2 text-2xl font-extrabold text-night sm:text-3xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm text-slate">{description}</p>}</div>{action}</div>;
}
export function AdminBody({ children }: { children: ReactNode }) { return <div className="space-y-6 px-4 py-6 sm:px-8">{children}</div>; }
export function DataError({ children = 'Les données ne sont pas disponibles. Réessayez dans quelques instants.' }: { children?: ReactNode }) { return <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-maple">{children}</p>; }
export const fieldClass = 'w-full rounded-lg border border-rule bg-white px-3 py-2.5 text-sm text-night';
export const adminButton = 'inline-flex items-center justify-center rounded-lg bg-night px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-700 disabled:opacity-50';
export const adminLink = 'text-sm font-bold text-ocean hover:underline';
