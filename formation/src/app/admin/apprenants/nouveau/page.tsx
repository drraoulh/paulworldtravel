import Link from 'next/link';
import { requireAdmin } from '@/lib/staff';
import { AdminHeading, AdminBody, DataError, fieldClass, adminButton } from '@/components/admin/ui';
import PaymentFields from '@/components/admin/PaymentFields';
import { packs } from '@/content/offers';
import { ACCESS_DAYS } from '@/lib/admin/accounts';
import { createLearner } from '../actions';

const errors: Record<string, string> = {
  invalid: 'L’adresse email n’est pas valide.',
  failed: 'Le compte n’a pas pu être créé. Réessayez dans quelques instants.',
  existe: 'Un compte existe déjà avec cet email.',
};

export default async function NewLearner({ searchParams }: { searchParams: Promise<{ erreur?: string; id?: string }> }) {
  await requireAdmin('/admin/apprenants/nouveau/');
  const { erreur, id } = await searchParams;
  return (
    <>
      <AdminHeading eyebrow="Apprenants" title="Ajouter un apprenant" description="Pour un élève inscrit au bureau, par téléphone ou par WhatsApp. Il reçoit un email pour choisir son mot de passe." action={<Link href="/admin/apprenants/" className="text-sm font-bold text-ocean">← Tous les apprenants</Link>} />
      <AdminBody>
        {erreur && (
          <DataError>
            {errors[erreur] ?? errors.failed}{' '}
            {erreur === 'existe' && id && <Link href={`/admin/apprenants/${id}/`} className="font-bold underline">Ouvrir sa fiche</Link>}
            {erreur === 'existe' && !id && 'C’est peut-être un compte de l’équipe : voir la page Équipe.'}
          </DataError>
        )}
        <form action={createLearner} className="grid max-w-4xl gap-6 lg:grid-cols-2">
          <section className="space-y-4 rounded-xl border border-rule bg-white p-6">
            <h2 className="font-bold">Coordonnées</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-semibold">Prénom<input name="first_name" required maxLength={100} className={`mt-1 ${fieldClass}`} /></label>
              <label className="text-xs font-semibold">Nom<input name="last_name" maxLength={100} className={`mt-1 ${fieldClass}`} /></label>
            </div>
            <label className="block text-xs font-semibold">Email<input name="email" type="email" required maxLength={254} className={`mt-1 ${fieldClass}`} /></label>
            <label className="block text-xs font-semibold">Téléphone / WhatsApp<input name="phone" maxLength={40} placeholder="+237 6XX XX XX XX" className={`mt-1 ${fieldClass}`} /></label>
            <label className="block text-xs font-semibold">Ville et pays<input name="city" maxLength={120} placeholder="Douala, Cameroun" className={`mt-1 ${fieldClass}`} /></label>
            <label className="flex items-start gap-2 text-sm"><input type="checkbox" name="send_email" defaultChecked className="mt-1" />Envoyer l’email de bienvenue avec le lien pour choisir le mot de passe</label>
          </section>

          <section className="space-y-4 rounded-xl border border-rule bg-white p-6">
            <h2 className="font-bold">Pack</h2>
            <label className="block text-xs font-semibold">Pack choisi
              <select name="pack" defaultValue="" className={`mt-1 ${fieldClass}`}>
                <option value="">Aucun pour l’instant (compte gratuit)</option>
                {packs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </label>
            <fieldset className="space-y-2 text-sm">
              <legend className="text-xs font-semibold">Paiement</legend>
              <label className="flex items-start gap-2"><input type="radio" name="mode" value="pending" defaultChecked className="mt-1" />Pas encore payé : la demande reste en attente</label>
              <label className="flex items-start gap-2"><input type="radio" name="mode" value="active" className="mt-1" />Déjà payé : activer l’accès maintenant</label>
            </fieldset>
            <label className="block text-xs font-semibold">Durée de l’accès (si activé)
              <select name="days" defaultValue="30" className={`mt-1 ${fieldClass}`}>{ACCESS_DAYS.map((d) => <option key={d} value={d}>{d} jours</option>)}</select>
            </label>
            <PaymentFields />
            <p className="text-xs text-slate">Le paiement est enregistré seulement si l’accès est activé et qu’un montant est saisi.</p>
          </section>

          <div className="lg:col-span-2"><button className={adminButton}>Créer le compte</button></div>
        </form>
      </AdminBody>
    </>
  );
}
