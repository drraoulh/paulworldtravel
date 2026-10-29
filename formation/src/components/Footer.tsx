import Link from 'next/link';
import { contact, inPersonPlaces, officeTitle, offices } from '@/content/contact';
import { Container } from './ui';

// The header carries the main sections; the footer carries what helps around them:
// the useful extras, our offices and how to reach a counsellor.
const extras = [
  { href: '/tcf-canada/', label: 'Le TCF Canada en bref' },
  { href: '/test-de-niveau/', label: 'Test de niveau gratuit' },
  { href: '/entrainement/tuteur/', label: 'Tuteur de français' },
  { href: '/partager-mes-sujets/', label: 'Partager mes sujets d’examen' },
];

export default function Footer() {
  return (
    <footer className="bg-night-deep text-blue-100 print:hidden">
      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <p className="heading text-xl text-white">Une question avant de vous lancer{"\u00a0"}?</p>
          <p className="mt-3 max-w-sm">Un conseiller vous répond sur WhatsApp, par téléphone et par email.</p>
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-container px-5 py-3 font-bold text-night transition-colors hover:bg-container-hover">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5"><path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.2-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" /></svg>
            WhatsApp {contact.phone}
          </a>
          <ul className="mt-5 space-y-1.5">
            <li>Téléphone : <a href={contact.phone2Href} className="text-white hover:underline">{contact.phone2}</a></li>
            <li>Email : <a href={`mailto:${contact.email}`} className="text-white hover:underline">{contact.email}</a></li>
          </ul>
        </div>

        <div>
          <h2 className="heading text-xl text-white">Nos bureaux</h2>
          <ul className="mt-5 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {offices.map((o) => (
              <li key={o.id} className="border-t border-white/15 pt-4">
                <p className="font-bold text-white">{officeTitle(o)}</p>
                <p className="mt-0.5">{o.detail}</p>
                {o.id !== 'douala' && o.id !== 'yaounde' && (
                  <p className="mt-0.5">{o.phones.map((p) => <a key={p.href} href={p.href} className="text-white hover:underline">{p.label}</a>)}</p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-blue-200">Les cours en présentiel ont lieu {inPersonPlaces}.</p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-5 py-7 text-sm lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {extras.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-white hover:underline">{l.label}</Link></li>)}
            <li><a href={contact.mainSite} className="font-semibold text-container hover:text-container-hover">Paul World Travel, le site principal</a></li>
          </ul>
          <p className="text-blue-200">© {new Date().getFullYear()} Paul World Travel. Tous droits réservés.</p>
        </Container>
      </div>
    </footer>
  );
}
