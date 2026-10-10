'use client';

import { useState } from 'react';
import { FiAlertCircle, FiCheck, FiStar } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

/** Same endpoint as the contact form; falls back to a prefilled email when unset. */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? '';
const CONTACT_EMAIL = 'paulworld2016@yahoo.com';

const copy = {
  fr: {
    title: 'Partagez votre expérience',
    intro: 'Vous avez travaillé avec nous ? Votre avis aide d’autres clients à nous faire confiance.',
    name: 'Nom complet',
    role: 'Profession / Titre',
    company: 'Entreprise (optionnel)',
    content: 'Votre témoignage',
    rating: 'Votre évaluation',
    star: 'étoile(s)',
    submit: 'Envoyer mon témoignage',
    sending: 'Envoi en cours...',
    success: 'Merci pour votre témoignage ! Il sera publié après validation par notre équipe.',
    mailto: 'Votre messagerie va s’ouvrir avec votre témoignage prérempli. Il vous suffit de l’envoyer.',
    error: 'Une erreur est survenue lors de l’envoi de votre témoignage. Veuillez réessayer plus tard.',
    missing: 'Veuillez remplir tous les champs obligatoires.',
    subject: 'Nouveau témoignage client',
  },
  en: {
    title: 'Share your experience',
    intro: 'Have you worked with us? Your feedback helps other clients trust us.',
    name: 'Full name',
    role: 'Profession / Title',
    company: 'Company (optional)',
    content: 'Your testimonial',
    rating: 'Your rating',
    star: 'star(s)',
    submit: 'Send my testimonial',
    sending: 'Sending...',
    success: 'Thank you for your testimonial! It will be published once reviewed by our team.',
    mailto: 'Your email app will open with your testimonial prefilled. Just hit send.',
    error: 'An error occurred while sending your testimonial. Please try again later.',
    missing: 'Please fill in all required fields.',
    subject: 'New client testimonial',
  },
};

type Status = 'idle' | 'sending' | 'success' | 'mailto' | 'error' | 'missing';

const empty = { name: '', role: '', company: '', content: '', rating: 5 };

const inputClass =
  'block w-full border-0 border-b border-line bg-transparent px-0 py-3 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-0';
const labelClass = 'block text-sm font-medium text-foreground';

export default function TestimonialForm() {
  const { language } = useLanguage();
  const c = copy[language];
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.content) {
      setStatus('missing');
      return;
    }

    if (!FORM_ENDPOINT) {
      const body = `${form.content}\n\n${c.rating}: ${form.rating}/5\n— ${form.name}, ${form.role}${form.company ? `, ${form.company}` : ''}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(c.subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _subject: c.subject, type: 'testimonial', language }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
      setForm(empty);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setStatus('error');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{c.title}</h2>
      <p className="mt-3 leading-relaxed text-muted">{c.intro}</p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <label htmlFor="t-name" className={labelClass}>
              {c.name} <span className="text-accent">*</span>
            </label>
            <input id="t-name" name="name" type="text" autoComplete="name" required value={form.name} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label htmlFor="t-role" className={labelClass}>
              {c.role} <span className="text-accent">*</span>
            </label>
            <input id="t-role" name="role" type="text" required value={form.role} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="t-company" className={labelClass}>
            {c.company}
          </label>
          <input id="t-company" name="company" type="text" autoComplete="organization" value={form.company} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label htmlFor="t-content" className={labelClass}>
            {c.content} <span className="text-accent">*</span>
          </label>
          <textarea id="t-content" name="content" rows={4} required value={form.content} onChange={handleChange} className={`${inputClass} resize-y`} />
        </div>

        <fieldset>
          <legend className={labelClass}>{c.rating}</legend>
          <div className="mt-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, rating: star }))}
                aria-label={`${star} ${c.star}`}
                aria-pressed={star <= form.rating}
                className="p-1 text-accent transition-opacity hover:opacity-80"
              >
                <FiStar className={`h-5 w-5 ${star <= form.rating ? 'fill-current' : 'text-line'}`} />
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? c.sending : c.submit}
        </button>

        <div aria-live="polite">
          {(status === 'success' || status === 'mailto') && (
            <p className="flex items-start gap-3 rounded-xl border border-line bg-accent-soft p-4 text-sm text-foreground">
              <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {status === 'success' ? c.success : c.mailto}
            </p>
          )}
          {(status === 'error' || status === 'missing') && (
            <p role="alert" className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-sm text-foreground">
              <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {status === 'error' ? c.error : c.missing}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
