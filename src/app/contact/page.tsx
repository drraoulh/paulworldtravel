'use client';

import { useState } from 'react';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader, Section } from '@/components/ui';
import ContactInfo from '@/components/ContactInfo';

/**
 * Form endpoint (e.g. a Formspree URL). When unset, the form falls back to
 * opening the visitor's email client with a prefilled message, so it keeps
 * working on the static export without any backend.
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? '';
const CONTACT_EMAIL = 'paulworld2016@yahoo.com';

const copy = {
  fr: {
    eyebrow: 'Contact',
    defaultSubject: 'Demande de contact',
    mailtoSent: 'Votre messagerie va s’ouvrir avec le message prérempli. Il vous suffit de l’envoyer.',
    intro: 'Remplissez le formulaire, nous vous répondons rapidement.',
  },
  en: {
    eyebrow: 'Contact',
    defaultSubject: 'Contact request',
    mailtoSent: 'Your email app will open with the message prefilled. Just hit send.',
    intro: 'Fill in the form and we will get back to you quickly.',
  },
};

type Status = 'idle' | 'sending' | 'success' | 'mailto' | 'error';

const inputClass =
  'block w-full border-0 border-b border-line bg-transparent px-0 py-3 text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-0';
const labelClass = 'block text-sm font-medium text-foreground';

export default function Contact() {
  const { t, language } = useLanguage();
  const c = copy[language];

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = form.subject || c.defaultSubject;
    const fullName = `${form.firstName} ${form.lastName}`.trim();

    if (!FORM_ENDPOINT) {
      const body = `${form.message}\n\n— ${fullName}\n${form.email}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email: form.email,
          _replyto: form.email,
          _subject: subject,
          subject,
          message: form.message,
          language,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
      setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  const subjects = [
    'contact.cargo_services',
    'contact.currency_exchange',
    'contact.consulting',
    'contact.visa',
    'contact.business',
    'contact.it',
    'contact.customs',
    'contact.other',
  ];

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={t('contact.title')} intro={t('contact.subtitle')} />

      <Section>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Form */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t('contact.send_message')}</h2>
            <p className="mt-2 leading-relaxed text-muted">{c.intro}</p>

            <form name="contact" onSubmit={handleSubmit} className="mt-10 space-y-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    {t('contact.first_name')}
                  </label>
                  <input id="firstName" name="firstName" type="text" autoComplete="given-name" required value={form.firstName} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    {t('contact.last_name')}
                  </label>
                  <input id="lastName" name="lastName" type="text" autoComplete="family-name" required value={form.lastName} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  {t('contact.email')}
                </label>
                <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label htmlFor="subject" className={labelClass}>
                  {t('contact.subject')}
                </label>
                <select id="subject" name="subject" value={form.subject} onChange={handleChange} className={`${inputClass} ${form.subject ? '' : 'text-muted'}`}>
                  <option value="">{t('contact.select_subject')}</option>
                  {subjects.map((key) => (
                    <option key={key} value={t(key)}>
                      {t(key)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  {t('contact.message')}
                </label>
                <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} className={`${inputClass} resize-y`} />
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? t('contact.sending') : t('contact.send_button')}
                </button>
              </div>

              <div aria-live="polite">
                {(status === 'success' || status === 'mailto') && (
                  <p className="flex items-start gap-3 rounded-xl border border-line bg-accent-soft p-4 text-sm text-foreground">
                    <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {status === 'success' ? t('contact.success') : c.mailtoSent}
                  </p>
                )}
                {status === 'error' && (
                  <p role="alert" className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-sm text-foreground">
                    <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      {t('contact.error')}{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline-offset-4 hover:underline">
                        {CONTACT_EMAIL}
                      </a>
                    </span>
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Details */}
          <aside className="lg:col-span-5 lg:border-l lg:border-line lg:pl-12">
            <ContactInfo />
          </aside>
        </div>
      </Section>
    </>
  );
}
