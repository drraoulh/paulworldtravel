'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { areas, services, type Service } from '@/content/services';
import { faqs } from '@/content/faqs';
import { ButtonLink, CheckItem, Container, EMAIL_INFO, WHATSAPP_CM } from './site';

const labels = {
  fr: {
    services: 'Services',
    quote: 'Demander un devis',
    whatsapp: 'Écrire sur WhatsApp',
    offer: 'Ce que nous proposons',
    steps: 'Comment ça se passe',
    faq: 'Questions fréquentes',
    allFaq: 'Toutes les questions',
    related: 'Nos autres services',
    ctaTitle: 'Parlons de votre projet',
    ctaText: 'Décrivez votre besoin : nous vous répondons sous 24 h ouvrées, par email ou sur WhatsApp.',
  },
  en: {
    services: 'Services',
    quote: 'Get a quote',
    whatsapp: 'Message us on WhatsApp',
    offer: 'What we offer',
    steps: 'How it works',
    faq: 'Frequent questions',
    allFaq: 'All questions',
    related: 'Our other services',
    ctaTitle: 'Let’s talk about your project',
    ctaText: 'Tell us what you need: we reply within one business day, by email or on WhatsApp.',
  },
};

export default function ServiceDetail({ service }: { service: Service }) {
  const { language } = useLanguage();
  const s = service[language];
  const l = labels[language];
  const quoteHref = `/contact/?service=${encodeURIComponent(s.contactOption)}`;
  const questions = faqs.filter((f) => f.category === service.faqCategory);
  const others = services.filter((o) => o.slug !== service.slug);

  return (
    <>
      {/* Hero: the service's photo beside its headline */}
      <header className="bg-night text-white">
        <Container className="grid grid-cols-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <nav aria-label="Fil d'Ariane" className="text-sm text-blue-200">
              <Link href="/services/" className="hover:text-white">{l.services}</Link>
              <span aria-hidden="true"> / </span>
              <span>{areas[service.area][language].name}</span>
            </nav>
            <h1 className="display mt-4 text-4xl sm:text-5xl xl:text-6xl">{s.title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-blue-100">{s.intro}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.highlights.map((h) => (
                <li key={h} className="rounded-md border border-white/25 px-3 py-1.5 text-sm font-medium">{h}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={quoteHref}>{l.quote}</ButtonLink>
              <ButtonLink href={WHATSAPP_CM} variant="outline">{l.whatsapp}</ButtonLink>
            </div>
          </div>
          <div className="relative h-72 overflow-hidden rounded-lg sm:h-96 lg:col-span-5 lg:h-[30rem]">
            <Image src={service.image} alt="" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </header>

      {/* What we offer */}
      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <h2 className="heading mb-8 text-3xl text-night sm:text-4xl">{l.offer}</h2>
          <div className={`grid grid-cols-1 gap-6 ${s.groups.length >= 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'}`}>
            {s.groups.map((group) => (
              <div key={group.title} className="rounded-lg border-t-4 border-ocean bg-white p-6 sm:p-8">
                <h3 className="heading text-xl text-night">{group.title}</h3>
                <ul className="mt-5 space-y-4">
                  {group.items.map((item) => (
                    <CheckItem key={item.title}>
                      <span className="font-semibold text-night">{item.title}</span>
                      {item.desc && <span className="block text-slate">{item.desc}</span>}
                    </CheckItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {s.notice && (
            <div className="mt-6 rounded-lg border-l-4 border-container bg-white p-6 sm:p-8">
              <h3 className="heading text-lg text-night">{s.notice.title}</h3>
              <p className="mt-2 max-w-4xl text-slate">{s.notice.text}</p>
            </div>
          )}

          {s.stats && (
            <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-night p-6 text-white sm:p-8 md:grid-cols-4">
              {s.stats.map((st) => (
                <div key={st.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-blue-100">{st.label}</dt>
                  <dd className="display text-4xl text-container">{st.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Container>
      </section>

      {/* Steps */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="heading mb-8 text-3xl text-night sm:text-4xl">{l.steps}</h2>
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {s.steps.map(([title, text], i) => (
              <li key={title} className="border-t-4 border-ocean pt-5">
                <span className="display text-4xl text-sky">{i + 1}</span>
                <p className="heading mt-3 text-lg text-night">{title}</p>
                <p className="mt-2 text-slate">{text}</p>
              </li>
            ))}
          </ol>
          <ButtonLink href={quoteHref} className="mt-10">{l.quote}</ButtonLink>
        </Container>
      </section>

      {/* Questions about this service */}
      {questions.length > 0 && (
        <section className="bg-paper py-16 sm:py-20">
          <Container className="max-w-4xl">
            <h2 className="heading mb-8 text-3xl text-night sm:text-4xl">{l.faq}</h2>
            <div className="divide-y divide-rule overflow-hidden rounded-lg bg-white">
              {questions.map((item) => (
                <details key={item.q.fr} className="group p-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <span className="heading text-lg text-night">{item.q[language]}</span>
                    <span aria-hidden="true" className="display text-2xl leading-none text-ocean transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-slate">{item.a[language]}</p>
                </details>
              ))}
            </div>
            <Link href="/faq/" className="mt-6 inline-block font-bold text-ocean underline-offset-4 hover:underline">{l.allFaq}</Link>
          </Container>
        </section>
      )}

      {/* Other services */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="heading mb-8 text-3xl text-night">{l.related}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}/`} className="group flex items-center gap-4 rounded-lg border border-rule p-3 hover:border-ocean">
                <span className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                  <Image src={o.image} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="font-bold text-night group-hover:text-ocean">{o[language].name}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-night py-16 text-white sm:py-20">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display text-3xl sm:text-4xl">{l.ctaTitle}</h2>
            <p className="mt-4 text-lg text-blue-100">{l.ctaText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={quoteHref}>{l.quote}</ButtonLink>
            <ButtonLink href={`mailto:${EMAIL_INFO}`} variant="outline">{EMAIL_INFO}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
