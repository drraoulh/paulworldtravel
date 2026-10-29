'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { ButtonLink, Container, EMAIL, EMAIL_INFO, MapLinks, PageHero, SectionTitle } from '@/components/site';
import { offices, hours } from '@/components/offices';

// Leaflet needs `window`, so the map is only rendered in the browser.
const LocationsMap = dynamic(() => import('@/components/LocationsMap'), { ssr: false });

const copy = {
  fr: {
    title: 'Nos bureaux au Cameroun, en Chine et au Canada',
    intro: 'Notre siège de Douala coordonne vos envois et vos démarches, avec Yaoundé ; notre bureau de Guangzhou suit vos achats auprès des fournisseurs, et notre équipe au Canada accueille vos envois à l’arrivée.',
    phone: 'Téléphone',
    mapTitle: 'Nos bureaux sur la carte',
    hoursTitle: 'Horaires d’ouverture',
    emailTitle: 'Écrire à toute l’équipe',
    reachTitle: 'Où nous expédions',
    reach: [
      ['Cameroun', 'Douala et Yaoundé, puis livraison dans tout le pays'],
      ['Chine', 'Guangzhou, Foshan et toute la province du Guangdong'],
      ['Canada', 'Toronto, Montréal et livraison partout au Canada'],
    ],
    cta: 'Demander un devis',
  },
  en: {
    title: 'Our offices in Cameroon, China and Canada',
    intro: 'Our Douala head office coordinates your shipments and paperwork, together with Yaoundé; our Guangzhou office follows your purchases with suppliers, and our team in Canada receives your shipments on arrival.',
    phone: 'Phone',
    mapTitle: 'Our offices on the map',
    hoursTitle: 'Opening hours',
    emailTitle: 'Write to the whole team',
    reachTitle: 'Where we ship',
    reach: [
      ['Cameroon', 'Douala and Yaoundé, then delivery across the country'],
      ['China', 'Guangzhou, Foshan and the whole of Guangdong province'],
      ['Canada', 'Toronto, Montreal and delivery anywhere in Canada'],
    ],
    cta: 'Get a quote',
  },
};

export default function Locations() {
  const { language } = useLanguage();
  const c = copy[language];
  const points = offices.flatMap((o) => o.points.map((p) => ({ city: p.city, role: o.role[language], position: p.position })));

  return (
    <>
      <PageHero title={c.title} intro={c.intro} image="/images/photos/port-conteneurs.jpg" />

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {offices.map((o) => (
            <article key={o.id} className="flex flex-col overflow-hidden rounded-lg border border-rule">
              <div className="relative h-56 sm:h-64">
                <Image src={o.image} alt={o.imageAlt[language]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="font-bold text-ocean">{o.role[language]}</p>
                <h2 className="display mt-1 text-3xl text-night sm:text-4xl">{o.name[language]}</h2>
                <p className="mt-2 text-lg text-night">{o.address[language]}</p>
                <p className="mt-4 text-slate">{o.description[language]}</p>
                <div className="mt-5">
                  <p className="text-sm text-slate">{c.phone}</p>
                  <ul>
                    {o.phones.map((p) => (
                      <li key={p.href}><a href={p.href} className="font-bold text-night hover:text-ocean">{p.label}</a></li>
                    ))}
                  </ul>
                </div>
                <MapLinks office={o} lang={language} className="mt-auto pt-6" />
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <SectionTitle title={c.mapTitle} />
            <div className="rounded-lg bg-white p-6">
              <p className="heading text-night">{c.hoursTitle}</p>
              <ul className="mt-2 space-y-1 text-slate">
                {hours[language].map((h) => <li key={h}>{h}</li>)}
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6">
              <p className="heading text-night">{c.emailTitle}</p>
              <ul className="mt-2 space-y-1">
                <li><a href={`mailto:${EMAIL_INFO}`} className="break-all font-semibold text-night hover:text-ocean">{EMAIL_INFO}</a></li>
                <li><a href={`mailto:${EMAIL}`} className="break-all font-semibold text-night hover:text-ocean">{EMAIL}</a></li>
              </ul>
            </div>
          </div>
          <div className="relative z-0 h-96 overflow-hidden rounded-lg lg:col-span-8 lg:h-auto lg:min-h-[28rem]">
            <LocationsMap points={points} />
          </div>
        </Container>
      </section>

      <section className="bg-night py-16 text-white sm:py-20">
        <Container>
          <SectionTitle title={c.reachTitle} light />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {c.reach.map(([country, text]) => (
              <div key={country} className="border-t-4 border-container pt-5">
                <p className="display text-3xl">{country}</p>
                <p className="mt-2 text-blue-100">{text}</p>
              </div>
            ))}
          </div>
          <ButtonLink href="/contact/" className="mt-10">{c.cta}</ButtonLink>
        </Container>
      </section>
    </>
  );
}
