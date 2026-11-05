'use client';

import Link from 'next/link';
import { Suspense, useEffect, useRef } from 'react';
import LoginForm from '@/app/connexion/LoginForm';

/*
 * Sign-in popup for a visitor who reaches content that needs an account. It opens
 * by itself once per page; "Plus tard" closes it and the page shows the same
 * choice inline, with a button to open the popup again.
 */
export default function SignInDialog({ next, title, text, open, onClose }: {
  next: string;
  title: string;
  text: string;
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="signin-dialog-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="academy-dialog w-[min(94vw,460px)] rounded-2xl border-0 bg-white p-0 shadow-2xl backdrop:bg-night/50"
    >
      <div className="bg-ocean px-6 py-5 text-white">
        <h2 id="signin-dialog-title" className="text-lg font-bold">{title}</h2>
        <p className="mt-1 text-sm text-blue-100">{text}</p>
      </div>
      <div className="p-6">
        <Suspense><LoginForm next={next} inDialog /></Suspense>
        <div className="mt-6 border-t border-rule pt-5 text-center">
          <p className="text-sm text-slate">Pas encore de compte ?</p>
          <Link href={`/inscription/?suite=${encodeURIComponent(next)}`} className="mt-2 inline-flex w-full items-center justify-center rounded-lg border-2 border-ocean px-5 py-3 font-bold text-ocean transition hover:bg-ocean hover:text-white">
            Créer mon compte gratuit
          </Link>
          <button type="button" onClick={onClose} className="mt-3 text-sm font-semibold text-slate underline decoration-slate/30 underline-offset-4 hover:text-night">Plus tard</button>
        </div>
      </div>
    </dialog>
  );
}
