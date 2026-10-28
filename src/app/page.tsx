'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { areas, services, servicesByArea, type Area } from '@/content/services';
import { faqs } from '@/content/faqs';
import { serviceIcons } from '@/components/serviceIcons';
import { ButtonLink, Container, EMAIL_INFO, SectionTitle, WHATSAPP_CM, FORMATION_URL } from '@/components/site';
import { offices, hours } from '@/components/offices';

const copy = {
  fr: {
    heroLines: ['Expédier, acheter,', 'changer, voyager.'],
    heroText:
      'Paul World Travel accompagne particuliers et entreprises entre le Cameroun, la Chine et le Canada : vos marchandises, vos achats, vos paiements, vos visas et votre entreprise, avec une seule équipe.',
    heroCta: 'Voir tous les services',
    heroContact: 'Nous contacter',
    pickerTitle: 'Que souhaitez-vous faire ?',
    facts: [
      ['8 services', 'Du transport aux démarches administratives'],
      ['2 bureaux', 'Douala au Cameroun, Foshan en Chine'],
      ['3 pays', 'Cameroun, Chine et Canada'],
    ],
    areasTitle: 'Tout ce que nous faisons pour vous',
    areasIntro: 'Prenez un seul service ou combinez-les : achat en Chine, paiement en Yuan, transport et dédouanement, nous suivons tout le parcours.',
    more: 'Voir le service',
    howTitle: 'Comment nous travaillons',
    how: [
      ['Vous nous expliquez votre projet', 'Par le formulaire, par email ou sur WhatsApp, en français ou en anglais.'],
      ['Nous vous conseillons', 'Nous vous proposons la solution adaptée et un devis clair.'],
      ['Nous nous occupons de tout', 'Achats, documents, transport, dossiers : un conseiller suit votre demande.'],
      ['Vous êtes informé à chaque étape', 'Jusqu’à la livraison, la décision ou le lancement de votre activité.'],
    ],
    officesTitle: 'Deux bureaux, une seule équipe',
    officesIntro: 'Rendez-nous visite ou appelez-nous dans les deux pays.',
    map: 'Voir sur la carte',
    hoursTitle: 'Horaires',
    faqTitle: 'Questions fréquentes',
    faqAll: 'Toutes les questions',
    ctaTitle: 'Un projet entre le Cameroun, la Chine et le Canada ?',
    ctaText: 'Décrivez votre besoin en quelques lignes : nous vous répondons sous 24 h ouvrées.',
    ctaQuote: 'Demander un devis',
    ctaWhatsapp: 'Écrire sur WhatsApp',
  },
  en: {
    heroLines: ['Ship, buy,', 'exchange, travel.'],
    heroText:
      'Paul World Travel helps individuals and businesses between Cameroon, China and Canada: your goods, purchases, payments, visas and company, with one team.',
    heroCta: 'See all services',
    heroContact: 'Contact us',
    pickerTitle: 'What would you like to do?',
    facts: [
      ['8 services', 'From shipping to paperwork'],
      ['2 offices', 'Douala in Cameroon, Foshan in China'],
      ['3 countries', 'Cameroon, China and Canada'],
    ],
    areasTitle: 'Everything we do for you',
    areasIntro: 'Use one service or combine them: buying in China, paying in Yuan, shipping and customs, we follow the whole journey.',
    more: 'See the service',
    howTitle: 'How we work',
    how: [
      ['You tell us about your project', 'Through the form, by email or on WhatsApp, in French or English.'],
      ['We advise you', 'We suggest the right solution and a clear quote.'],
      ['We handle everything', 'Purchases, paperwork, transport, applications: one advisor follows your request.'],
      ['You are kept informed', 'Until delivery, the decision or the launch of your business.'],
    ],
    officesTitle: 'Two offices, one team',
    officesIntro: 'Visit or call us in either country.',
    map: 'View on the map',
    hoursTitle: 'Opening hours',
    faqTitle: 'Frequent questions',
    faqAll: 'All questions',
    ctaTitle: 'A project between Cameroon, China and Canada?',
    ctaText: 'Describe what you need in a few lines: we reply within one business day.',
    ctaQuote: 'Get a quote',
    ctaWhatsapp: 'Message us on WhatsApp',
  },
};

const order: Area[] = ['transport', 'trade', 'paperwork', 'digital'];
const lgCols: Record<number, string> = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3' };
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
        <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <h1 className="display hero-title text-[2.5rem] sm:text-6xl xl:text-[4.25rem]">
              {c.heroLines.map((line) => <span key={line} className="block">{line}</span>)}
            </h1>
            <p className="mt-8 max-w-xl text-lg text-blue-100 sm:text-xl">{c.heroText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services/">{c.heroCta}</ButtonLink>
              <ButtonLink href="/contact/" variant="outline">{c.heroContact}</ButtonLink>
            </div>
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
            </div>
          </div>
        </Container>
      </section>

      {/* Key facts */}
      <section className="bg-paper py-14 sm:py-20">
        <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            <Image src="/images/photos/canada-toronto.jpg" alt={language === 'fr' ? 'Vue de Toronto au Canada' : 'View of Toronto, Canada'} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-ocean">Paul World Travel Formation</p>
            <h2 className="heading mt-4 text-3xl text-night sm:text-4xl">{language === 'fr' ? 'Votre projet Canada commence par le français.' : 'Your Canada journey starts with French.'}</h2>
            <p className="mt-5 text-lg text-slate">{language === 'fr' ? 'Découvrez notre préparation au TCF Canada, en ligne ou en présentiel à Douala. Test de niveau gratuit, fiches méthode et exercices de compréhension écrite.' : 'Discover our TCF Canada preparation, online or in Douala. Free placement test, study guides and reading comprehension exercises.'}</p>
            <a href={FORMATION_URL} className="mt-7 inline-flex items-center gap-3 rounded-md bg-container px-6 py-3 font-bold text-night transition-colors hover:bg-container-hover">{language === 'fr' ? 'Accéder au site Formation' : 'Visit the Training website'}<span aria-hidden="true">→</span></a>
          </div>
        </Container>
      </section>

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

      {/* Services by area */}
      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <SectionTitle title={c.areasTitle} intro={c.areasIntro} />
          <div className="space-y-14">
            {order.map((area) => (
              <div key={area} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <h3 className="heading text-2xl text-night">{areas[area][language].name}</h3>
                  <p className="mt-2 text-slate">{areas[area][language].text}</p>
                </div>
                <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-9 ${lgCols[servicesByArea(area).length]}`}>
                  {servicesByArea(area).map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}/`}
                      className={`group relative isolate flex min-h-60 flex-col justify-end overflow-hidden rounded-lg p-5 text-white ${servicesByArea(area).length === 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                    >
                      <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/65 to-night/10" />
                      <h4 className="heading text-xl">{s[language].name}</h4>
                      <p className="mt-1 text-sm text-blue-100">{s[language].summary}</p>
                      <span className="mt-3 text-sm font-bold text-container">{c.more}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How we work */}
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionTitle title={c.howTitle} />
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-4">
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
      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <SectionTitle title={c.officesTitle} intro={c.officesIntro} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {offices.map((o) => (
              <article key={o.id} className="grid grid-cols-1 overflow-hidden rounded-lg bg-white sm:grid-cols-2">
                <div className="relative h-52 sm:h-full">
                  <Image src={o.image} alt={o.imageAlt[language]} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-sm font-bold text-ocean">{o.role[language]}</p>
                  <h3 className="display mt-1 text-3xl text-night">{o.city}</h3>
                  <p className="mt-3 text-slate">{o.address[language]}</p>
                  <ul className="mt-3 space-y-1">
                    {o.phones.map((p) => (
                      <li key={p.href}><a href={p.href} className="font-semibold text-night hover:text-ocean">{p.label}</a></li>
                    ))}
                  </ul>
                  <a href={o.map} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-bold text-ocean underline-offset-4 hover:underline">{c.map}</a>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-lg bg-white p-6">
            <p className="heading text-night">{c.hoursTitle}</p>
            <ul className="mt-2 grid grid-cols-1 gap-1 text-slate sm:grid-cols-3">
              {hours[language].map((h) => <li key={h}>{h}</li>)}
            </ul>
          </div>
        </Container>
      </section>

      {/* A few questions */}
      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-4xl">
          <SectionTitle title={c.faqTitle} />
          <div className="divide-y divide-rule overflow-hidden rounded-lg border border-rule">
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

      {/* Closing call to action */}
      <section className="bg-night py-16 text-white sm:py-20">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display text-3xl sm:text-5xl">{c.ctaTitle}</h2>
            <p className="mt-4 text-lg text-blue-100">{c.ctaText}</p>
            <ul className="mt-4 space-y-1 text-blue-100">
              <li><a href={`mailto:${EMAIL_INFO}`} className="hover:text-white">{EMAIL_INFO}</a></li>
              <li><a href="tel:+237694244666" className="hover:text-white">+237 6 94 24 46 66</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact/">{c.ctaQuote}</ButtonLink>
            <ButtonLink href={WHATSAPP_CM} variant="outline">{c.ctaWhatsapp}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
