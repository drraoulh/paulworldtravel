'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui';
import { getSupabase } from '@/lib/supabase/client';

export default function NouveauMotDePasse() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) return;
    if (password.length < 8) return setError('Le mot de passe doit contenir au moins 8 caractères.');
    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (err) return setError('Le lien a expiré. Demandez un nouveau lien depuis la page de connexion.');
    router.replace('/espace/');
    router.refresh();
  };

  return (
    <section className="bg-paper py-12 sm:py-20">
      <Container className="max-w-lg">
        <form onSubmit={submit} className="rounded-lg bg-white p-6 sm:p-10">
          <h1 className="heading text-2xl text-night">Choisir un nouveau mot de passe</h1>
          <label className="mt-6 block">
            <span className="font-semibold text-night">Nouveau mot de passe</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" className="mt-1.5 w-full rounded-md border border-rule px-4 py-3 focus:border-ocean focus:outline-none" />
          </label>
          {error && <p className="mt-6 rounded-md bg-red-50 p-4 text-maple" role="alert">{error}</p>}
          <button type="submit" disabled={busy} className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover disabled:opacity-60">
            Enregistrer
          </button>
        </form>
      </Container>
    </section>
  );
}
