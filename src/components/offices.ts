// The four offices and the phone numbers: the single source for the header,
// footer, home, locations, contact and about pages.

type Text = { fr: string; en: string };

export type Phone = { label: string; href: string; whatsapp?: string };

export const phones = {
  cameroonWhatsapp: { label: '+237 6 94 24 46 66', href: 'tel:+237694244666', whatsapp: 'https://wa.me/237694244666' },
  cameroon: { label: '+237 6 96 96 46 76', href: 'tel:+237696964676' },
  china: { label: '+86 190 6845 1378', href: 'tel:+8619068451378', whatsapp: 'https://wa.me/8619068451378' },
  canada: { label: '+1 416 830 3459', href: 'tel:+14168303459' },
} satisfies Record<string, Phone>;

export type Office = {
  id: 'douala' | 'yaounde' | 'guangzhou' | 'canada';
  name: Text; // city, or cities
  country: Text;
  role: Text;
  address: Text;
  description: Text;
  phones: Phone[];
  image: string;
  imageAlt: Text;
  /** One Google Maps search link per city. */
  maps: { city: string; href: string }[];
  /** Marker positions for the map on the locations page. */
  points: { city: string; position: [number, number] }[];
};

const mapSearch = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const offices: Office[] = [
  {
    id: 'douala',
    name: { fr: 'Douala', en: 'Douala' },
    country: { fr: 'Cameroun', en: 'Cameroon' },
    role: { fr: 'Siège au Cameroun', en: 'Head office in Cameroon' },
    address: { fr: 'Bonabo, entrée garage', en: 'Bonabo, garage entrance' },
    description: {
      fr: 'Notre siège, dans la capitale économique du Cameroun. Nous y réceptionnons vos envois vers le Canada et suivons le dédouanement de vos marchandises venues de Chine.',
      en: 'Our head office, in Cameroon’s economic capital. This is where we receive your shipments to Canada and follow the customs clearance of your goods from China.',
    },
    phones: [phones.cameroonWhatsapp, phones.cameroon],
    image: '/images/photos/douala-port.jpg',
    imageAlt: { fr: 'Port autonome de Douala', en: 'Port of Douala' },
    maps: [{ city: 'Douala', href: mapSearch('Bonabo, Douala, Cameroun') }],
    points: [{ city: 'Douala', position: [4.0511, 9.7679] }],
  },
  {
    id: 'yaounde',
    name: { fr: 'Yaoundé', en: 'Yaoundé' },
    country: { fr: 'Cameroun', en: 'Cameroon' },
    role: { fr: 'Bureau au Cameroun', en: 'Office in Cameroon' },
    address: { fr: 'Non loin du Lycée bilingue d’Essos', en: 'Near the Lycée bilingue d’Essos' },
    description: {
      fr: 'Notre bureau de la capitale réceptionne vos envois vers le Canada et vous reçoit pour tous nos services, sans passer par Douala.',
      en: 'Our office in the capital receives your shipments to Canada and welcomes you for all our services, without a trip to Douala.',
    },
    phones: [phones.cameroonWhatsapp, phones.cameroon],
    image: '/images/photos/partenariat.jpg',
    imageAlt: { fr: 'Poignée de main avec un client', en: 'Handshake with a client' },
    maps: [{ city: 'Yaoundé', href: mapSearch('Lycée bilingue d’Essos, Yaoundé, Cameroun') }],
    points: [{ city: 'Yaoundé', position: [3.8723, 11.5385] }],
  },
  {
    id: 'guangzhou',
    name: { fr: 'Guangzhou', en: 'Guangzhou' },
    country: { fr: 'Chine', en: 'China' },
    role: { fr: 'Bureau en Chine', en: 'Office in China' },
    address: { fr: 'Guangzhou, province du Guangdong', en: 'Guangzhou, Guangdong province' },
    description: {
      fr: 'Au cœur du Guangdong, première région manufacturière de Chine. Notre équipe s’appuie sur son réseau de fournisseurs, contrôle les produits et regroupe vos commandes avant l’expédition.',
      en: 'In the heart of Guangdong, China’s leading manufacturing region. Our team draws on its supplier network, inspects products and consolidates your orders before shipment.',
    },
    phones: [phones.china],
    image: '/images/photos/chine-skyline.jpg',
    imageAlt: { fr: 'Ville chinoise de nuit', en: 'Chinese city at night' },
    maps: [{ city: 'Guangzhou', href: mapSearch('Guangzhou, Guangdong, China') }],
    points: [{ city: 'Guangzhou', position: [23.1291, 113.2644] }],
  },
  {
    id: 'canada',
    name: { fr: 'Toronto et Montréal', en: 'Toronto and Montreal' },
    country: { fr: 'Canada', en: 'Canada' },
    role: { fr: 'Bureau au Canada', en: 'Office in Canada' },
    address: { fr: 'Toronto (Ontario) et Montréal (Québec)', en: 'Toronto (Ontario) and Montreal (Quebec)' },
    description: {
      fr: 'Nous accueillons vos envois venus du Cameroun, organisons leur livraison partout au Canada et répondons à vos questions sur place.',
      en: 'We receive your shipments from Cameroon, arrange delivery anywhere in Canada and answer your questions locally.',
    },
    phones: [phones.canada],
    image: '/images/photos/canada-toronto.jpg',
    imageAlt: { fr: 'Toronto au coucher du soleil', en: 'Toronto at sunset' },
    maps: [
      { city: 'Toronto', href: mapSearch('Toronto, Ontario, Canada') },
      { city: 'Montréal', href: mapSearch('Montréal, Québec, Canada') },
    ],
    points: [
      { city: 'Toronto', position: [43.6532, -79.3832] },
      { city: 'Montréal', position: [45.5019, -73.5674] },
    ],
  },
];

export const officeLabel = (o: Office, lang: 'fr' | 'en') => `${o.name[lang]}, ${o.country[lang]}`;

export const hours = {
  fr: ['Lundi au vendredi : 8 h – 17 h', 'Samedi : 9 h – 13 h', 'Dimanche : fermé'],
  en: ['Monday to Friday: 8 am – 5 pm', 'Saturday: 9 am – 1 pm', 'Sunday: closed'],
};
