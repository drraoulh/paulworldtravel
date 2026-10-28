import Link from 'next/link';
import { contact } from '@/content/offers';
import { Container } from './ui';

export default function Footer() {
  return (
    <footer className="bg-night-deep text-blue-100">
      <Container className="grid grid-cols-1 gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="heading text-lg text-white">Paul World Travel Formation</p>
          <p className="mt-3 max-w-xs">Préparation au TCF Canada, en ligne et en présentiel à Douala. Anglais, allemand et italien bientôt.</p>
          <a href={contact.mainSite} className="mt-4 inline-block font-semibold text-container hover:text-container-hover">
            Découvrir Paul World Travel
          </a>
        </div>
        <div>
          <p className="heading mb-4 text-white">Formation</p>
          <ul className="space-y-2.5">
            <li><Link href="/tcf-canada/" className="hover:text-white">Le TCF Canada</Link></li>
            <li><Link href="/parcours/" className="hover:text-white">Parcours de formation</Link></li>
            <li><Link href="/examen-blanc/" className="hover:text-white">Examen blanc</Link></li>
            <li><Link href="/formules/" className="hover:text-white">Formules</Link></li>
            <li><Link href="/test-de-niveau/" className="hover:text-white">Test de niveau gratuit</Link></li>
            <li><Link href="/inscription/" className="hover:text-white">Inscription</Link></li>
          </ul>
        </div>
        <div>
          <p className="heading mb-4 text-white">Nous joindre</p>
          <ul className="space-y-2.5">
            <li>{contact.address}</li>
            <li><a href={contact.phoneHref} className="hover:text-white">{contact.phone}</a></li>
            <li><a href={`mailto:${contact.email}`} className="hover:text-white">{contact.email}</a></li>
            <li><a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-container hover:text-container-hover">WhatsApp</a></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-6 text-sm text-blue-200">© {new Date().getFullYear()} Paul World Travel. Tous droits réservés.</Container>
      </div>
    </footer>
  );
}
