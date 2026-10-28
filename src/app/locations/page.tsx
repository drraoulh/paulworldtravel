'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { ButtonLink, Container, EMAIL, PageHero, SectionTitle } from '@/components/site';
import { offices, hours } from '@/components/offices';

// Leaflet needs `window`, so the map is only rendered in the browser.
const LocationsMap = dynamic(() => import('@/components/LocationsMap'), { ssr: false });

const copy = {
  fr: {
    title: 'Nos bureaux à Douala et à Foshan',
    intro: 'Notre siège au Cameroun coordonne vos envois et vos démarches ; notre bureau en Chine suit vos achats auprès des fournisseurs.',
    officeText: {
      douala: 'Notre bureau principal, à Douala, capitale économique du Cameroun. C’est ici que nous réceptionnons vos envois vers le Canada et que nous suivons le dédouanement de vos marchandises venues de Chine.',
      foshan: 'Au cœur du Guangdong, l’une des premières régions manufacturières de Chine. Notre équipe y rencontre les fournisseurs, contrôle les produits et regroupe vos commandes avant l’expédition.',
    },
    phone: 'Téléphone',
    email: 'Email',
    map: 'Ouvrir dans Google Maps',
    hoursTitle: 'Horaires d’ouverture',
    reachTitle: 'Où nous expédions',
    reach: [
      ['Cameroun', 'Douala et Yaoundé, puis livraison dans tout le pays'],
      ['Chine', 'Foshan, Guangzhou et toute la province du Guangdong'],
      ['Canada', 'Montréal, Toronto et livraison partout au Canada'],
    ],
    mapTitle: 'Nos deux bureaux sur la carte',
    cta: 'Demander un devis',
  },
  en: {
    title: 'Our offices in Douala and Foshan',
    intro: 'Our head office in Cameroon coordinates your shipments and paperwork; our office in China follows your purchases with suppliers.',
    officeText: {
      douala: 'Our main office, in Douala, Cameroon’s economic capital. This is where we receive your shipments to Canada and follow the customs clearance of your goods from China.',
      foshan: 'In the heart of Guangdong, one of China’s leading manufacturing regions. Our team meets suppliers, inspects products and consolidates your orders before shipment.',
    },
    phone: 'Phone',
    email: 'Email',
    map: 'Open in Google Maps',
    hoursTitle: 'Opening hours',
    reachTitle: 'Where we ship',
    reach: [
      ['Cameroon', 'Douala and Yaoundé, then delivery across the country'],
      ['China', 'Foshan, Guangzhou and the whole of Guangdong province'],
      ['Canada', 'Montreal, Toronto and delivery anywhere in Canada'],
    ],
    mapTitle: 'Our two offices on the map',
    cta: 'Get a quote',
  },
};

export default function Locations() {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <>
      <PageHero title={c.title} intro={c.intro} image="/images/photos/chine-skyline.jpg" />

      {offices.map((o, i) => (
        <section key={o.id} className={`py-16 sm:py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-paper'}`}>
          <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className={`relative h-72 overflow-hidden rounded-lg lg:h-96 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <Image src={o.image} alt={o.imageAlt[language]} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <p className="font-bold text-ocean">{o.role[language]}</p>
              <h2 className="display mt-2 text-4xl text-night sm:text-5xl">{o.city}</h2>
              <p className="mt-2 text-lg text-slate">{o.address[language]}</p>
              <p className="mt-5 text-lg text-slate">{c.officeText[o.id]}</p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-slate">{c.phone}</dt>
                  {o.phones.map((p) => (
                    <dd key={p.href}><a href={p.href} className="font-bold text-night hover:text-ocean">{p.label}</a></dd>
                  ))}
                </div>
                <div>
                  <dt className="text-sm text-slate">{c.email}</dt>
                  <dd><a href={`mailto:${EMAIL}`} className="font-bold text-night hover:text-ocean">{EMAIL}</a></dd>
                </div>
              </dl>
              <a href={o.map} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-bold text-ocean underline-offset-4 hover:underline">
                {c.map}
              </a>
            </div>
          </Container>
        </section>
      ))}

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

      <section className="bg-paper py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionTitle title={c.mapTitle} />
            <div className="rounded-lg bg-white p-6">
              <p className="heading text-night">{c.hoursTitle}</p>
              <ul className="mt-2 space-y-1 text-slate">
                {hours[language].map((h) => <li key={h}>{h}</li>)}
              </ul>
            </div>
          </div>
          <div className="relative z-0 h-96 overflow-hidden rounded-lg lg:col-span-8">
            <LocationsMap
              chinaLabel={language === 'fr' ? 'Bureau de Foshan' : 'Foshan office'}
              cameroonLabel={language === 'fr' ? 'Siège de Douala' : 'Douala head office'}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
