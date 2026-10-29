'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCourse } from './useCourse';

const NAME_KEY = 'pwt-attestation-name';

export default function Certificate({ ids, modules }: { ids: string[]; modules: string[] }) {
  const { isDone, ready } = useCourse();
  const [name, setName] = useState('');
  useEffect(() => { try { setName(localStorage.getItem(NAME_KEY) ?? ''); } catch { /* optional */ } }, []);
  const save = (v: string) => { setName(v); try { localStorage.setItem(NAME_KEY, v); } catch { /* optional */ } };
  const left = ids.filter((id) => !isDone(id)).length;
  const date = new Date().toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' });

  if (!ready) return null;

  if (left > 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center">
        <h1 className="heading text-2xl text-night">Attestation pas encore disponible</h1>
        <p className="mt-3 text-slate">Il vous reste {left} élément{left > 1 ? 's' : ''} à terminer dans le parcours. L’attestation se débloque à 100 %.</p>
        <Link href="/parcours/" className="mt-6 inline-block rounded-full bg-night px-6 py-3 font-bold text-white hover:bg-ocean">Reprendre le parcours</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end print:hidden">
        <label className="flex-1">
          <span className="text-sm font-semibold text-night">Nom à afficher sur l’attestation</span>
          <input value={name} onChange={(e) => save(e.target.value)} placeholder="Prénom Nom" className="mt-1 w-full rounded-xl border border-rule bg-white p-3 text-ink focus:border-ocean focus:outline-none" />
        </label>
        <button onClick={() => window.print()} disabled={!name.trim()} className="rounded-full bg-container px-6 py-3 font-bold text-night hover:bg-container-hover disabled:opacity-50">Imprimer ou enregistrer en PDF</button>
      </div>

      <article className="relative overflow-hidden rounded-2xl border-[10px] border-night bg-white p-8 text-center sm:p-14 print:rounded-none">
        <Image src="/brand/symbole-nav.png" alt="Paul World Travel" width={160} height={131} className="mx-auto h-16 w-auto" />
        <p className="mt-6 text-sm font-semibold text-ocean">Paul World Travel, formation TCF Canada</p>
        <h1 className="display mt-3 text-4xl text-night sm:text-5xl">Attestation de parcours</h1>
        <p className="mt-8 text-slate">Nous attestons que</p>
        <p className="display marked mt-2 inline-block text-3xl text-night sm:text-4xl">{name.trim() || 'Votre nom'}</p>
        <p className="mx-auto mt-6 max-w-xl text-ink">
          a suivi l’intégralité du parcours de préparation au TCF Canada : {modules.join(', ')}.
        </p>
        <p className="mt-8 text-sm text-slate">Délivrée le {date}</p>
        <p className="mx-auto mt-8 max-w-lg border-t border-rule pt-4 text-xs text-slate">
          Attestation de suivi de formation délivrée par Paul World Travel. Elle ne remplace pas les résultats officiels du TCF Canada, délivrés par France Éducation international.
        </p>
      </article>
    </div>
  );
}
