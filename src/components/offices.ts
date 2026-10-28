// The two offices, shared by the home, locations and contact pages.

export type Office = {
  id: 'douala' | 'foshan';
  city: string;
  role: { fr: string; en: string };
  address: { fr: string; en: string };
  phones: { label: string; href: string }[];
  image: string;
  imageAlt: { fr: string; en: string };
  map: string;
};

export const offices: Office[] = [
  {
    id: 'douala',
    city: 'Douala',
    role: { fr: 'Siège au Cameroun', en: 'Head office in Cameroon' },
    address: { fr: 'Lendi, entrée Commissaire, Douala', en: 'Lendi, Entrée Commissaire, Douala' },
    phones: [
      { label: '+237 6 94 24 46 66', href: 'tel:+237694244666' },
      { label: '+237 6 96 96 46 76', href: 'tel:+237696964676' },
    ],
    image: '/images/photos/douala-port.jpg',
    imageAlt: { fr: 'Port autonome de Douala', en: 'Port of Douala' },
    map: 'https://www.google.com/maps/search/?api=1&query=Lendi%2C%20Douala%2C%20Cameroun',
  },
  {
    id: 'foshan',
    city: 'Foshan',
    role: { fr: 'Bureau en Chine', en: 'Office in China' },
    address: { fr: 'Foshan, province du Guangdong', en: 'Foshan, Guangdong province' },
    phones: [{ label: '+86 190 6845 1378', href: 'tel:+8619068451378' }],
    image: '/images/photos/chine-skyline.jpg',
    imageAlt: { fr: 'Ville chinoise de nuit', en: 'Chinese city at night' },
    map: 'https://www.google.com/maps/search/?api=1&query=Foshan%2C%20Guangdong%2C%20China',
  },
];

export const hours = {
  fr: ['Lundi au vendredi : 8 h – 17 h', 'Samedi : 9 h – 13 h', 'Dimanche : fermé'],
  en: ['Monday to Friday: 8 am – 5 pm', 'Saturday: 9 am – 1 pm', 'Sunday: closed'],
};
