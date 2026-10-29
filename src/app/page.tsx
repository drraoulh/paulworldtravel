'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { services } from '@/content/services';
import { faqs } from '@/content/faqs';
import { serviceIcons } from '@/components/serviceIcons';
import { ButtonLink, Container, MapLinks, SectionTitle, WHATSAPP_CM } from '@/components/site';
import { offices } from '@/components/offices';

const copy = {
  fr: {
    heroLines: ['Expédier, acheter,', 'changer, voyager.'],
    heroText:
      'Paul World Travel accompagne particuliers et entreprises entre le Cameroun, la Chine et le Canada : vos marchandises, vos achats, vos paiements, vos visas et votre entreprise, avec une seule équipe.',
    heroQuote: 'Demander un devis',
    heroWhatsapp: 'Écrire sur WhatsApp',
    heroNote: 'Réponse sous 24 h ouvrées, en français ou en anglais.',
    pickerTitle: 'Que souhaitez-vous faire ?',
    pickerAll: 'Voir tous les services',
    facts: [
      ['8 services', 'Du transport aux démarches administratives'],
      ['4 bureaux', 'Douala, Yaoundé, Guangzhou, Toronto et Montréal'],
      ['3 pays', 'Cameroun, Chine et Canada'],
    ],
    howTitle: 'Comment nous travaillons',
    how: [
      ['Vous nous expliquez votre projet', 'Par le formulaire, par email ou sur WhatsApp, en français ou en anglais.'],
      ['Nous vous conseillons', 'Nous vous proposons la solution adaptée et un devis clair.'],
      ['Nous nous occupons de tout', 'Achats, documents, transport, dossiers : un conseiller suit votre demande.'],
      ['Vous êtes informé à chaque étape', 'Jusqu’à la livraison, la décision ou le lancement de votre activité.'],
    ],
    officesTitle: 'Quatre bureaux, une seule équipe',
    officesIntro: 'Au Cameroun, en Chine et au Canada : passez nous voir ou appelez le bureau le plus proche.',
    officesAll: 'Adresses, horaires et carte',
    faqTitle: 'Questions fréquentes',
    faqAll: 'Toutes les questions',
  },
  en: {
    heroLines: ['Ship, buy,', 'exchange, travel.'],
    heroText:
      'Paul World Travel helps individuals and businesses between Cameroon, China and Canada: your goods, purchases, payments, visas and company, with one team.',
    heroQuote: 'Get a quote',
    heroWhatsapp: 'Message us on WhatsApp',
    heroNote: 'We reply within one business day, in French or English.',
    pickerTitle: 'What would you like to do?',
    pickerAll: 'See all services',
    facts: [
      ['8 services', 'From shipping to paperwork'],
      ['4 offices', 'Douala, Yaoundé, Guangzhou, Toronto and Montreal'],
      ['3 countries', 'Cameroon, China and Canada'],
    ],
    howTitle: 'How we work',
    how: [
      ['You tell us about your project', 'Through the form, by email or on WhatsApp, in French or English.'],
      ['We advise you', 'We suggest the right solution and a clear quote.'],
      ['We handle everything', 'Purchases, paperwork, transport, applications: one advisor follows your request.'],
      ['You are kept informed', 'Until delivery, the decision or the launch of your business.'],
    ],
    officesTitle: 'Four offices, one team',
    officesIntro: 'In Cameroon, China and Canada: visit us or call the office nearest to you.',
    officesAll: 'Addresses, opening hours and map',
    faqTitle: 'Frequent questions',
    faqAll: 'All questions',
  },
};

// A spread of questions across services for the home page.
const homeQuestions = ['canada', 'cargo', 'currency', 'visa']
  .map((cat) => faqs.find((f) => f.category === cat))
  .filter((f): f is (typeof faqs)[number] => Boolean(f));

export default function Home() {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <>
      {/* Hero: the company as a whole, every service one click away */}
      <section className="relative isolate overflow-hidden bg-night text-white">
        <div aria-hidden="true" className="absolute -right-40 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-ocean/40 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-52 left-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-sky/20 blur-3xl" />
        <Container className="grid grid-cols-1 items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <h1 className="display hero-title text-[2.5rem] sm:text-6xl xl:text-[4.25rem]">
              {c.heroLines.map((line) => <span key={line} className="block">{line}</span>)}
            </h1>
            <p className="mt-8 max-w-xl text-lg text-blue-100 sm:text-xl">{c.heroText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact/">{c.heroQuote}</ButtonLink>
              <ButtonLink href={WHATSAPP_CM} variant="outline">{c.heroWhatsapp}</ButtonLink>
            </div>
            <p className="mt-4 text-sm text-blue-200">{c.heroNote}</p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-white p-4 text-ink shadow-2xl shadow-night-deep/40 sm:p-6">
              <h2 className="heading px-1 text-lg text-night">{c.pickerTitle}</h2>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {services.map((s) => {
                  const Icon = serviceIcons[s.slug];
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}/`}
                        className="group flex h-full items-center gap-3 rounded-lg border border-rule p-3 transition-colors hover:border-ocean hover:bg-paper"
                      >
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-night text-white transition-colors group-hover:bg-container group-hover:text-night">
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-bold text-night">{s[language].action}</span>
                          <span className="block text-sm text-slate">{s[language].name}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link href="/services/" className="mt-4 inline-block px-1 font-bold text-ocean underline-offset-4 hover:underline">
                {c.pickerAll}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Key facts */}
      <section className="border-b border-rule bg-white">
        <Container className="grid grid-cols-1 divide-y divide-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {c.facts.map(([value, text]) => (
            <div key={value} className="py-6 sm:px-6 sm:first:pl-0">
              <p className="display text-2xl text-night">{value}</p>
              <p className="mt-1 text-slate">{text}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* How we work */}
      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <SectionTitle title={c.howTitle} />
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.how.map(([title, text], i) => (
              <li key={title} className="border-t-4 border-ocean pt-5">
                <span className="display text-4xl text-sky">{i + 1}</span>
                <p className="heading mt-3 text-lg text-night">{title}</p>
                <p className="mt-2 text-slate">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Offices */}
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionTitle title={c.officesTitle} intro={c.officesIntro} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((o) => (
              <article key={o.id} className="flex flex-col overflow-hidden rounded-lg border border-rule bg-white">
                <div className="relative h-40">
                  <Image src={o.image} alt={o.imageAlt[language]} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm font-bold text-ocean">{o.role[language]}</p>
                  <h3 className="display mt-1 text-2xl text-night">{o.name[language]}</h3>
                  <p className="mt-2 text-slate">{o.address[language]}</p>
                  <ul className="mt-3 space-y-1">
                    {o.phones.map((p) => (
                      <li key={p.href}><a href={p.href} className="font-semibold text-night hover:text-ocean">{p.label}</a></li>
                    ))}
                  </ul>
                  <MapLinks office={o} lang={language} className="mt-auto pt-4" />
                </div>
              </article>
            ))}
          </div>
          <Link href="/locations/" className="mt-8 inline-block font-bold text-ocean underline-offset-4 hover:underline">{c.officesAll}</Link>
        </Container>
      </section>

      {/* A few questions */}
      <section className="bg-paper py-16 sm:py-24">
        <Container className="max-w-4xl">
          <SectionTitle title={c.faqTitle} />
          <div className="divide-y divide-rule overflow-hidden rounded-lg border border-rule bg-white">
            {homeQuestions.map((item) => (
              <details key={item.q.fr} className="group p-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <span className="heading text-lg text-night">{item.q[language]}</span>
                  <span aria-hidden="true" className="display text-2xl leading-none text-ocean transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-slate">{item.a[language]}</p>
              </details>
            ))}
          </div>
          <Link href="/faq/" className="mt-6 inline-block font-bold text-ocean underline-offset-4 hover:underline">{c.faqAll}</Link>
        </Container>
      </section>
    </>
  );
}
