'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { contact } from '@/content/contact';
import { formatFcfa, packs, objectifs } from '@/content/offers';
import { getSupabase } from '@/lib/supabase/client';

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'Je ne sais pas'];

const empty = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  formule: '',
  level: '',
  goal: '',
  examDate: '',
  message: '',
  password: '',
  password2: '',
  website: '', // honeypot
};

type Status = 'idle' | 'sending' | 'success' | 'account_created' | 'exists' | 'not_configured' | 'error';

const inputCls = 'mt-1.5 w-full rounded-md border border-rule bg-white px-4 py-3 text-ink focus:border-ocean focus:outline-none';

export default function SignupForm() {
  const params = useSearchParams();
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState('');
  const supabase = getSupabase();

  // Prefill from the packs page (?formule=) and the level test (?niveau=).
  useEffect(() => {
    const formule = params.get('formule');
    const niveau = params.get('niveau');
    setForm((f) => ({
      ...f,
      formule: packs.some((x) => x.id === formule) ? formule! : f.formule,
      level: niveau && levels.includes(niveau) ? niveau : f.level,
    }));
  }, [params]);

  const set = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (supabase && form.password.length < 8) return setFormError('Le mot de passe doit contenir au moins 8 caractères.');
    if (supabase && form.password !== form.password2) return setFormError('Les deux mots de passe ne correspondent pas.');
    setStatus('sending');

    // 1. Create the candidate account. The database turns the metadata into a profile and a pending enrollment.
    let accountCreated = false;
    if (supabase && !form.website) {
      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm/?suite=/espace/`,
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
            phone: form.phone,
            city: form.city,
            formule: form.formule,
            level: form.level,
            goal: form.goal,
            exam_date: form.examDate,
            message: form.message,
          },
        },
      });
      if (error) {
        setStatus('idle');
        return setFormError(
          /registered|already/i.test(error.message)
            ? 'Un compte existe déjà avec cet email. Connectez-vous pour suivre votre inscription.'
            : 'La création du compte a échoué. Vérifiez votre email et réessayez.'
        );
      }
      // Supabase hides existing accounts: an empty identity list means the email is already used.
      if (data.user && data.user.identities?.length === 0) return setStatus('exists');
      accountCreated = true;
    }

    // 2. Tell the team by email (the password never leaves the browser).
    const { password, password2, ...details } = form;
    void password;
    void password2;
    try {
      const res = await fetch('/api/inscription/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(details),
      });
      if (res.ok || accountCreated) {
        setStatus(accountCreated ? 'account_created' : 'success');
        setForm(empty);
      } else {
        setStatus(res.status === 503 ? 'not_configured' : 'error');
      }
    } catch {
      setStatus(accountCreated ? 'account_created' : 'error');
    }
  };

  if (status === 'account_created') {
    return (
      <div className="rounded-lg bg-white p-6 sm:p-10" role="status">
        <h2 className="heading text-2xl text-night">Vérifiez votre boîte mail</h2>
        <p className="mt-4 text-lg">
          Votre compte est créé. Cliquez sur le lien que nous venons de vous envoyer pour confirmer votre adresse, puis connectez-vous à votre espace.
        </p>
        <p className="mt-4 text-slate">
          Un conseiller vous contacte sous 24 h ouvrées avec le tarif, le calendrier et les moyens de paiement. Votre accès est activé dès le paiement reçu.
        </p>
      </div>
    );
  }

  if (status === 'exists') {
    return (
      <div className="rounded-lg bg-white p-6 sm:p-10" role="status">
        <h2 className="heading text-2xl text-night">Vous avez déjà un compte</h2>
        <p className="mt-4 text-lg">Un compte existe déjà avec cet email. Connectez-vous pour suivre votre inscription.</p>
        <a href="/connexion/" className="mt-6 inline-flex rounded-md bg-night px-6 py-3 font-bold text-white hover:bg-ocean">Me connecter</a>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg bg-white p-6 sm:p-10" role="status">
        <h2 className="heading text-2xl text-night">Inscription envoyée</h2>
        <p className="mt-4 text-lg">
          Merci. Un conseiller vous contacte sous 24 h ouvrées, par email ou sur WhatsApp, avec le tarif, le calendrier et les moyens de paiement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-lg bg-white p-6 sm:p-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-semibold text-night">Prénom</span>
          <input name="firstName" value={form.firstName} onChange={set} required autoComplete="given-name" className={inputCls} />
        </label>
        <label className="block">
          <span className="font-semibold text-night">Nom</span>
          <input name="lastName" value={form.lastName} onChange={set} required autoComplete="family-name" className={inputCls} />
        </label>
        <label className="block">
          <span className="font-semibold text-night">Email</span>
          <input type="email" name="email" value={form.email} onChange={set} required autoComplete="email" className={inputCls} />
        </label>
        <label className="block">
          <span className="font-semibold text-night">Téléphone ou WhatsApp</span>
          <input type="tel" name="phone" value={form.phone} onChange={set} required autoComplete="tel" placeholder="+237 6 …" className={inputCls} />
        </label>
        <label className="block">
          <span className="font-semibold text-night">Ville et pays</span>
          <input name="city" value={form.city} onChange={set} placeholder="Douala, Cameroun" className={inputCls} />
        </label>
        <label className="block">
          <span className="font-semibold text-night">Pack</span>
          <select name="formule" value={form.formule} onChange={set} required className={inputCls}>
            <option value="" disabled>Choisir</option>
            {packs.map((f) => <option key={f.id} value={f.id}>{f.name}, {formatFcfa(f.price)}, {f.months} mois</option>)}
          </select>
        </label>
        <label className="block">
          <span className="font-semibold text-night">Niveau actuel</span>
          <select name="level" value={form.level} onChange={set} className={inputCls}>
            <option value="">Choisir</option>
            {levels.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="font-semibold text-night">NCLC visé</span>
          <select name="goal" value={form.goal} onChange={set} className={inputCls}>
            <option value="">Choisir</option>
            {objectifs.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="font-semibold text-night">Date d’examen prévue</span>
          <input name="examDate" value={form.examDate} onChange={set} placeholder="Par exemple : mars 2027, ou pas encore fixée" className={inputCls} />
        </label>
        {supabase && (
          <>
            <label className="block">
              <span className="font-semibold text-night">Mot de passe</span>
              <span className="text-slate"> (8 caractères minimum)</span>
              <input type="password" name="password" value={form.password} onChange={set} required minLength={8} autoComplete="new-password" className={inputCls} />
            </label>
            <label className="block">
              <span className="font-semibold text-night">Confirmer le mot de passe</span>
              <input type="password" name="password2" value={form.password2} onChange={set} required minLength={8} autoComplete="new-password" className={inputCls} />
            </label>
            <p className="text-sm text-slate sm:col-span-2">Ce mot de passe vous servira à vous connecter à votre espace candidat.</p>
          </>
        )}
        <label className="block sm:col-span-2">
          <span className="font-semibold text-night">Message</span>
          <span className="text-slate"> (facultatif)</span>
          <textarea name="message" value={form.message} onChange={set} rows={4} className={inputCls} />
        </label>
        <label className="hidden" aria-hidden="true">
          Site web
          <input name="website" value={form.website} onChange={set} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {formError && (
        <p className="mt-6 rounded-md bg-red-50 p-4 text-maple" role="alert">{formError}</p>
      )}
      {status === 'not_configured' && (
        <p className="mt-6 rounded-md bg-red-50 p-4 text-maple" role="alert">
          L’envoi en ligne n’est pas encore activé. Écrivez-nous sur <a href={contact.whatsapp} className="font-bold underline">WhatsApp</a> ou à {contact.email}.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-6 rounded-md bg-red-50 p-4 text-maple" role="alert">
          L’envoi a échoué. Vérifiez votre connexion et réessayez, ou écrivez-nous sur <a href={contact.whatsapp} className="font-bold underline">WhatsApp</a>.
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover disabled:opacity-60 sm:w-auto">
        {status === 'sending' ? 'Envoi en cours…' : 'Envoyer mon inscription'}
      </button>
    </form>
  );
}
