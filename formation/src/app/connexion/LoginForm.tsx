'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSupabase } from '@/lib/supabase/client';

const inputCls = 'mt-1.5 w-full rounded-md border border-rule bg-white px-4 py-3 text-ink focus:border-ocean focus:outline-none';

export default function LoginForm() {
  const supabase = getSupabase();
  const router = useRouter();
  const params = useSearchParams();
  const [mode, setMode] = useState<'login' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: 'error' | 'info'; text: string } | null>(
    params.get('confirme') ? { kind: 'info', text: 'Votre adresse est confirmée. Connectez-vous avec votre mot de passe.' } : null
  );

  if (!supabase) {
    return <p className="rounded-lg bg-white p-6 sm:p-10">L’espace candidat sera bientôt disponible.</p>;
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      setBusy(false);
      if (error) {
        return setMessage({
          kind: 'error',
          text: /confirm/i.test(error.message)
            ? 'Confirmez d’abord votre adresse avec le lien reçu par email.'
            : 'Email ou mot de passe incorrect.',
        });
      }
      const wanted = params.get('suite') ?? '/espace/';
      router.replace(wanted.startsWith('/') && !wanted.startsWith('//') ? wanted : '/espace/');
      router.refresh();
    } else {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/confirm/?suite=/auth/nouveau-mot-de-passe/`,
      });
      setBusy(false);
      setMessage(
        error
          ? { kind: 'error', text: 'L’envoi a échoué. Réessayez dans quelques minutes.' }
          : { kind: 'info', text: 'Si un compte existe avec cet email, vous allez recevoir un lien pour choisir un nouveau mot de passe.' }
      );
    }
  };

  return (
    <form onSubmit={submit} className="rounded-lg bg-white p-6 sm:p-10">
      <h2 className="heading text-2xl text-night">{mode === 'login' ? 'Connexion' : 'Mot de passe oublié'}</h2>
      <label className="mt-6 block">
        <span className="font-semibold text-night">Email</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className={inputCls} />
      </label>
      {mode === 'login' && (
        <label className="mt-5 block">
          <span className="font-semibold text-night">Mot de passe</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className={inputCls} />
        </label>
      )}
      {message && (
        <p className={`mt-6 rounded-md p-4 ${message.kind === 'error' ? 'bg-red-50 text-maple' : 'bg-blue-50 text-night'}`} role={message.kind === 'error' ? 'alert' : 'status'}>
          {message.text}
        </p>
      )}
      <button type="submit" disabled={busy} className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover disabled:opacity-60">
        {busy ? 'Un instant…' : mode === 'login' ? 'Me connecter' : 'Recevoir le lien'}
      </button>
      <button type="button" onClick={() => { setMode(mode === 'login' ? 'reset' : 'login'); setMessage(null); }} className="mt-5 text-sm font-semibold text-ocean hover:underline">
        {mode === 'login' ? 'Mot de passe oublié ?' : 'Retour à la connexion'}
      </button>
    </form>
  );
}
