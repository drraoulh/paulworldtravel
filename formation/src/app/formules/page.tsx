import type { Metadata } from 'next';
import { ButtonLink, Check, Container, PageHeader } from '@/components/ui';
import { contact, formules } from '@/content/offers';

export const metadata: Metadata = {
  title: 'Formules de préparation au TCF Canada',
  description: 'Préparation au TCF Canada en ligne, en présentiel à Douala ou en formule hybride.',
};

export default function Formules() {
  return (
    <>
      <PageHeader
        title="Trois façons de vous préparer"
        intro="Le programme est le même partout : méthode par épreuve, entraînement corrigé et tests blancs. Choisissez seulement où et comment vous suivez les cours."
      />

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {formules.map((f) => (
              <div key={f.id} className={`flex flex-col rounded-lg bg-white p-6 sm:p-8 ${f.id === 'hybride' ? 'ring-2 ring-ocean' : ''}`}>
                <h2 className="heading text-2xl text-night">{f.name}</h2>
                <p className="mt-1 text-slate">{f.where}</p>
                <p className="mt-4">{f.summary}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {f.includes.map((item) => <Check key={item}>{item}</Check>)}
                </ul>
                <div className="mt-8 border-t border-rule pt-5">
                  <p className="heading text-xl text-night">{f.price ?? 'Tarif sur demande'}</p>
                  <p className="mt-1 text-sm text-slate">{f.schedule ?? 'Prochaines sessions communiquées à l’inscription'}</p>
                </div>
                <ButtonLink href={`/inscription/?formule=${f.id}`} variant="dark" className="mt-6">Choisir cette formule</ButtonLink>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="heading text-3xl text-night">Paiement</h2>
            <p className="mt-4 text-lg text-slate">
              Le paiement se fait à notre agence de Douala ou à distance. Après votre inscription, un conseiller vous contacte avec le tarif, le calendrier et les moyens de paiement. Votre accès est activé dès réception.
            </p>
          </div>
          <div>
            <h2 className="heading text-3xl text-night">Une question ?</h2>
            <p className="mt-4 text-lg text-slate">Nous vous aidons à choisir la formule adaptée à votre niveau et à la date de votre examen.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={contact.whatsapp}>Écrire sur WhatsApp</ButtonLink>
              <ButtonLink href={contact.phoneHref} variant="dark">{contact.phone}</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
