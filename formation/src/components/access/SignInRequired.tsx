'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import SignInDialog from './SignInDialog';

// Only one popup opens by itself per page, even with several gates on it.
let autoOpenedFor = '';

/** Shown to a visitor (not signed in): the sign-in popup, and the same choice inline. */
export default function SignInRequired({ next, title, text }: { next: string; title: string; text: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (autoOpenedFor === window.location.pathname) return;
    autoOpenedFor = window.location.pathname;
    setOpen(true);
  }, []);

  return (
    <div className="rounded-2xl bg-white p-6 sm:p-10">
      <h2 className="heading text-2xl text-night">{title}</h2>
      <p className="mt-3 max-w-2xl text-slate">{text}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center rounded-lg bg-ocean px-6 py-3.5 font-bold text-white shadow-[0_4px_14px_rgba(36,66,199,.35)] transition hover:-translate-y-0.5 hover:bg-night">Me connecter</button>
        <Link href={`/inscription/?suite=${encodeURIComponent(next)}`} className="inline-flex items-center rounded-lg border-2 border-ocean bg-white px-6 py-3.5 font-bold text-ocean transition hover:bg-ocean hover:text-white">Créer mon compte gratuit</Link>
      </div>
      <SignInDialog next={next} title={title} text={text} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
