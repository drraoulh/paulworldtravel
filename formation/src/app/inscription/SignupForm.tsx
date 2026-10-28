'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { contact, formules, objectifs } from '@/content/offers';

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
  website: '', // honeypot
};

type Status = 'idle' | 'sending' | 'success' | 'not_configured' | 'error';

const inputCls = 'mt-1.5 w-full rounded-md border border-rule bg-white px-4 py-3 text-ink focus:border-ocean focus:outline-none';

export default function SignupForm() {
  const params = useSearchParams();
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>('idle');

  // Prefill from the formules page (?formule=) and the level test (?niveau=).
  useEffect(() => {
    const formule = params.get('formule');
    const niveau = params.get('niveau');
    setForm((f) => ({
      ...f,
      formule: formules.some((x) => x.id === formule) ? formule! : f.formule,
      level: niveau && levels.includes(niveau) ? niveau : f.level,
    }));
  }, [params]);

  const set = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/inscription/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm(empty);
      } else {
        setStatus(res.status === 503 ? 'not_configured' : 'error');
      }
    } catch {
      setStatus('error');
    }
  };

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
          <span className="font-semibold text-night">Formule</span>
          <select name="formule" value={form.formule} onChange={set} required className={inputCls}>
            <option value="" disabled>Choisir</option>
            {formules.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
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

      <button type="submit" disabled={status === 'sending'} className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-container px-6 py-3.5 font-bold text-night hover:bg-container-hover disabled:opacity-60 sm:w-auto">
        {status === 'sending' ? 'Envoi en cours…' : 'Envoyer mon inscription'}
      </button>
    </form>
  );
}
