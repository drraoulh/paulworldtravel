// Offices, phone numbers and contact links of Paul World Travel.
// The only place these are written: the footer, pages, emails and the tutor reuse them.

export interface Phone {
  label: string;
  href: string;
  whatsapp?: boolean;
}

export interface Office {
  id: 'douala' | 'yaounde' | 'guangzhou' | 'canada';
  /** City, or the country itself when we are in several cities. */
  name: string;
  country?: string;
  detail: string;
  phones: Phone[];
}

const cameroonPhones: Phone[] = [
  { label: '+237 6 94 24 46 66', href: 'tel:+237694244666', whatsapp: true },
  { label: '+237 6 96 96 46 76', href: 'tel:+237696964676' },
];

export const offices: Office[] = [
  { id: 'douala', name: 'Douala', country: 'Cameroun', detail: 'Bonabo, entrée garage', phones: cameroonPhones },
  { id: 'yaounde', name: 'Yaoundé', country: 'Cameroun', detail: 'Non loin du Lycée bilingue d’Essos', phones: cameroonPhones },
  { id: 'guangzhou', name: 'Guangzhou', country: 'Chine', detail: 'Guangzhou, province du Guangdong', phones: [{ label: '+86 190 6845 1378', href: 'tel:+8619068451378' }] },
  { id: 'canada', name: 'Canada', detail: 'Toronto et Montréal', phones: [{ label: '+1 416 830 3459', href: 'tel:+14168303459' }] },
];

export const officeTitle = (o: Office) => (o.country ? `${o.name}, ${o.country}` : o.name);

/** Where the classes in person take place. */
export const inPersonPlaces = 'dans nos bureaux de Douala et de Yaoundé';

export const contact = {
  whatsapp: 'https://wa.me/237694244666',
  phone: cameroonPhones[0].label,
  phoneHref: cameroonPhones[0].href,
  phone2: cameroonPhones[1].label,
  phone2Href: cameroonPhones[1].href,
  email: 'infos@paulworldtravel.com',
  mainSite: 'https://paulworldtravel.com',
};

/** One line for the bottom of emails (plain text, no HTML). */
export const emailSignature =
  `Paul World Travel Formation, Douala (Bonabo) et Yaoundé (Essos). WhatsApp ${contact.phone}, téléphone ${contact.phone2}`;
