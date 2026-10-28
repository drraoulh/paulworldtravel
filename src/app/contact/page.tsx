'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { sendForm, SendFormResult } from '@/services/sendForm';
import { Container, EMAIL, EMAIL_INFO, PageHero, WHATSAPP_CM, WHATSAPP_CN } from '@/components/site';
import { contactOptions } from '@/content/services';
import { offices, hours } from '@/components/offices';

const copy = {
  fr: {
    title: 'Demandez un devis ou posez votre question',
    intro: 'Décrivez votre besoin : nous vous répondons sous 24 h ouvrées, par email ou sur WhatsApp.',
    formTitle: 'Votre demande',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    phone: 'Téléphone ou WhatsApp (facultatif)',
    service: 'Service concerné',
    chooseService: 'Choisissez un service',
    message: 'Message',
    messageHint:
      "Pour un envoi : type de marchandise, poids ou volume, ville de départ et d'arrivée, date souhaitée.",
    send: 'Envoyer ma demande',
    sending: 'Envoi en cours…',
    success: 'Votre demande a été envoyée. Nous vous répondons sous 24 h ouvrées.',
    invalid: 'Vérifiez votre nom, votre adresse email et votre message, puis envoyez à nouveau.',
    failedA: "La demande n'a pas pu être envoyée. Écrivez-nous à ",
    failedB: ' ou sur ',
    quickTitle: 'Une réponse rapide',
    whatsappCm: 'WhatsApp Cameroun',
    whatsappCn: 'WhatsApp Chine',
    hoursTitle: 'Horaires',
  },
  en: {
    title: 'Get a quote or ask a question',
    intro: 'Tell us what you need: we reply within one business day, by email or on WhatsApp.',
    formTitle: 'Your request',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone or WhatsApp (optional)',
    service: 'Service',
    chooseService: 'Choose a service',
    message: 'Message',
    messageHint: 'For a shipment: type of goods, weight or volume, departure and arrival cities, preferred date.',
    send: 'Send my request',
    sending: 'Sending…',
    success: 'Your request has been sent. We reply within one business day.',
    invalid: 'Check your name, email address and message, then send again.',
    failedA: 'The request could not be sent. Email us at ',
    failedB: ' or message us on ',
    quickTitle: 'A quick answer',
    whatsappCm: 'WhatsApp Cameroon',
    whatsappCn: 'WhatsApp China',
    hoursTitle: 'Opening hours',
  },
};

const emptyForm = { firstName: '', lastName: '', email: '', phone: '', service: '', message: '', website: '' };

const field = 'w-full rounded-md border border-rule bg-white px-4 py-3 text-ink focus:border-ocean focus:outline-none focus:ring-2 focus:ring-ocean/30';

export default function Contact() {
  const { language } = useLanguage();
  const c = { ...copy[language], services: contactOptions(language) };
  const [form, setForm] = useState(emptyForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | SendFormResult>('idle');

  // A service picked elsewhere on the site (?service=...) is pre-selected.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('service');
    if (wanted && contactOptions(language).includes(wanted)) setForm((f) => ({ ...f, service: wanted }));
  }, [language]);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const result = await sendForm('contact', form);
    setStatus(result);
    if (result === 'success') setForm(emptyForm);
    setSending(false);
  };

  return (
    <>
      <PageHero title={c.title} intro={c.intro} image="/images/photos/partenariat.jpg" />

      <section className="bg-paper py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <form onSubmit={submit} className="rounded-lg bg-white p-6 sm:p-10 lg:col-span-7" noValidate={false}>
            <h2 className="heading text-2xl text-night">{c.formTitle}</h2>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Site web</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block font-semibold text-night">{c.firstName}</label>
                <input id="firstName" name="firstName" autoComplete="given-name" required value={form.firstName} onChange={update} className={field} />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1.5 block font-semibold text-night">{c.lastName}</label>
                <input id="lastName" name="lastName" autoComplete="family-name" required value={form.lastName} onChange={update} className={field} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block font-semibold text-night">{c.email}</label>
                <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update} className={field} />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block font-semibold text-night">{c.phone}</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+237 6 XX XX XX XX" value={form.phone} onChange={update} className={field} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="service" className="mb-1.5 block font-semibold text-night">{c.service}</label>
                <select id="service" name="service" required value={form.service} onChange={update} className={field}>
                  <option value="" disabled>{c.chooseService}</option>
                  {c.services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block font-semibold text-night">{c.message}</label>
                <p id="message-hint" className="mb-2 text-sm text-slate">{c.messageHint}</p>
                <textarea id="message" name="message" rows={6} required aria-describedby="message-hint" value={form.message} onChange={update} className={field} />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-6 w-full rounded-md bg-container px-6 py-4 font-bold text-night transition-colors hover:bg-container-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? c.sending : c.send}
            </button>

            <div aria-live="polite" className="mt-4">
              {status === 'success' && <p className="rounded-md bg-green-50 p-4 font-medium text-green-800">{c.success}</p>}
              {status === 'invalid' && <p className="rounded-md bg-red-50 p-4 font-medium text-red-800">{c.invalid}</p>}
              {(status === 'error' || status === 'not_configured') && (
                <p className="rounded-md bg-red-50 p-4 font-medium text-red-800">
                  {c.failedA}
                  <a href={`mailto:${EMAIL_INFO}`} className="underline">{EMAIL_INFO}</a>
                  {c.failedB}
                  <a href={WHATSAPP_CM} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a>.
                </p>
              )}
            </div>
          </form>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-lg bg-night p-6 text-white sm:p-8">
              <h2 className="heading text-xl">{c.quickTitle}</h2>
              <ul className="mt-4 space-y-3">
                <li><a href={WHATSAPP_CM} target="_blank" rel="noopener noreferrer" className="font-bold text-container hover:text-container-hover">{c.whatsappCm} : +237 6 94 24 46 66</a></li>
                <li><a href={WHATSAPP_CN} target="_blank" rel="noopener noreferrer" className="font-bold text-container hover:text-container-hover">{c.whatsappCn} : +86 190 6845 1378</a></li>
                <li><a href={`mailto:${EMAIL_INFO}`} className="text-blue-100 hover:text-white">{EMAIL_INFO}</a></li>
                <li><a href={`mailto:${EMAIL}`} className="text-blue-100 hover:text-white">{EMAIL}</a></li>
              </ul>
            </div>

            {offices.map((o) => (
              <div key={o.id} className="rounded-lg bg-white p-6 sm:p-8">
                <p className="text-sm font-bold text-ocean">{o.role[language]}</p>
                <p className="display mt-1 text-2xl text-night">{o.city}</p>
                <p className="mt-2 text-slate">{o.address[language]}</p>
                <ul className="mt-3 space-y-1">
                  {o.phones.map((p) => (
                    <li key={p.href}><a href={p.href} className="font-semibold text-night hover:text-ocean">{p.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="rounded-lg bg-white p-6 sm:p-8">
              <p className="heading text-night">{c.hoursTitle}</p>
              <ul className="mt-2 space-y-1 text-slate">
                {hours[language].map((h) => <li key={h}>{h}</li>)}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
