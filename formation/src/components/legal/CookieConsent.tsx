'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { OPEN_PREFERENCES, readConsent, saveConsent, type CookieConsent as Choice } from '@/lib/cookie-consent';

const ConsentAnalytics = dynamic(() => import('./ConsentAnalytics'), { ssr: false });
const action = 'rounded-full border-2 border-night px-5 py-3 text-sm font-bold text-night hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean';

export default function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);
  const [opened, setOpened] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [notice, setNotice] = useState('');
  const current = useRef<Choice | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const sync = () => { const saved = readConsent(); current.current = saved; setChoice(saved); };
    const open = () => { previousFocus.current = document.activeElement as HTMLElement; setStatistics(current.current?.analytics ?? false); setOpened(true); };
    sync();
    window.addEventListener(OPEN_PREFERENCES, open);
    window.addEventListener('focus', sync);
    return () => { window.removeEventListener(OPEN_PREFERENCES, open); window.removeEventListener('focus', sync); };
  }, []);
  useEffect(() => {
    if (opened) dialog.current?.showModal();
    else if (dialog.current?.open) dialog.current.close();
  }, [opened]);

  const close = () => { setOpened(false); previousFocus.current?.focus(); };
  const choose = (analytics: boolean) => {
    const saved = saveConsent(analytics);
    current.current = saved;
    setChoice(saved);
    setNotice(analytics ? 'Mesure d’audience autorisée. Vous pouvez modifier ce choix à tout moment.' : 'Mesure d’audience refusée. Votre formation reste accessible.');
    close();
  };
  const configure = () => { previousFocus.current = document.activeElement as HTMLElement; setStatistics(choice?.analytics ?? false); setOpened(true); };

  return <>
    {choice?.analytics && <ConsentAnalytics allowed={() => current.current?.analytics === true && readConsent()?.analytics === true} pathname={pathname} />}
    {choice === null && !opened && <section aria-label="Choix des cookies" className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-h-[85dvh] max-w-4xl overflow-y-auto rounded-2xl border border-rule bg-white p-5 shadow-2xl sm:p-6 print:hidden">
      <h2 className="heading text-xl text-night">Votre choix pour les cookies</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate">Les cookies nécessaires servent à la connexion et à la mémorisation de vos choix. Avec votre accord uniquement, Vercel Web Analytics mesure la fréquentation des pages publiques, sans cookie publicitaire. Refuser ne limite pas votre formation. <Link href="/cookies/" className="font-semibold text-ocean underline">En savoir plus</Link></p>
      <div className="mt-4 flex flex-wrap gap-3"><button type="button" className={action} onClick={() => choose(false)}>Tout refuser</button><button type="button" className={action} onClick={configure}>Personnaliser</button><button type="button" className={action} onClick={() => choose(true)}>Tout accepter</button></div>
    </section>}
    <dialog ref={dialog} aria-labelledby="cookie-preferences-title" onCancel={(e) => { e.preventDefault(); close(); }} onClose={() => setOpened(false)} className="m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-xl overflow-y-auto rounded-2xl border border-rule bg-white p-6 text-ink shadow-2xl backdrop:bg-night/50 sm:p-8">
      <div className="flex items-start justify-between gap-4"><h2 id="cookie-preferences-title" className="heading text-2xl text-night">Préférences de cookies</h2><button type="button" onClick={close} aria-label="Fermer les préférences" className="rounded-lg border border-rule px-3 py-2">Fermer</button></div>
      <p className="mt-3 text-sm text-slate">Votre choix est conservé 180 jours sur ce navigateur. Vous pouvez le changer depuis « Gérer mes cookies » en bas de page.</p>
      <fieldset className="mt-6 space-y-5"><legend className="sr-only">Catégories</legend>
        <label className="flex items-start gap-3"><input type="checkbox" checked disabled className="mt-1 h-5 w-5 shrink-0" /><span><strong className="block text-night">Nécessaires — toujours actifs</strong><span className="text-sm text-slate">Session de connexion, préférences de confidentialité et mémorisation du parcours demandé. Aucun usage publicitaire.</span></span></label>
        <label className="flex items-start gap-3"><input type="checkbox" checked={statistics} onChange={(e) => setStatistics(e.target.checked)} className="mt-1 h-5 w-5 shrink-0" /><span><strong className="block text-night">Mesure d’audience facultative</strong><span className="text-sm text-slate">Vercel Web Analytics : fréquentation des pages publiques. Les espaces de compte, les paiements, les échanges IA et les paramètres des adresses sont exclus.</span></span></label>
      </fieldset>
      <p className="mt-5 text-sm text-slate">Pas de publicité ciblée ni de pixels de réseaux sociaux. <Link href="/confidentialite/" className="font-semibold text-ocean underline" onClick={close}>Politique de confidentialité</Link></p>
      <div className="mt-6 flex flex-wrap gap-3"><button type="button" className={action} onClick={() => choose(false)}>Tout refuser</button><button type="button" className={action} onClick={() => choose(statistics)}>Enregistrer mes choix</button><button type="button" className={action} onClick={() => choose(true)}>Tout accepter</button></div>
    </dialog>
    <p role="status" className="sr-only">{notice}</p>
  </>;
}
