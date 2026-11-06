import { requireAdmin } from '@/lib/staff';
import { AdminBody, AdminHeading, DataError } from '@/components/admin/ui';
import { audienceName, audiences, type Audience } from '@/lib/admin/audience';
import MessageForm from './MessageForm';

const errors: Record<string, string> = {
  champs: 'Écrivez un objet et un message, et choisissez les destinataires.',
  confirmation: 'Cochez la case de confirmation avant d’envoyer à tous les destinataires.',
  vide: 'Aucun apprenant ne correspond à ces destinataires.',
  envoi: 'L’email de test n’a pas pu partir. Réessayez dans quelques minutes.',
};

export default async function Messages({ searchParams }: { searchParams: Promise<{ envoye?: string; echecs?: string; test?: string; erreur?: string }> }) {
  await requireAdmin('/admin/messages/');
  const state = await searchParams;
  let counts: Record<string, { label: string; n: number }> | null = null;
  try {
    const a = await audiences();
    counts = Object.fromEntries((Object.keys(audienceName) as Audience[]).map((id) => [id, { label: audienceName[id], n: a[id].length }]));
  } catch (e) {
    console.error('Audiences failed', e);
  }
  const sent = Number(state.envoye ?? NaN);
  const failed = Number(state.echecs ?? 0);
  return (
    <>
      <AdminHeading title="Emails groupés" description="Écrivez aux apprenants depuis l’adresse de la formation : l’envoi part tout de suite, sans ouvrir votre messagerie." />
      <AdminBody>
        {state.erreur && <DataError>{errors[state.erreur] ?? 'L’envoi a échoué.'}</DataError>}
        {state.test === 'ok' && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">Test envoyé à votre adresse. Vérifiez-le, puis cochez la confirmation pour l’envoyer à tous.</p>}
        {Number.isFinite(sent) && (
          <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
            Email envoyé à {sent} apprenant{sent > 1 ? 's' : ''}.{failed > 0 && ` ${failed} envoi${failed > 1 ? 's ont' : ' a'} échoué (adresse refusée ou erreur temporaire).`}
          </p>
        )}
        {counts ? <section className="rounded-xl border border-rule bg-white p-6"><MessageForm counts={counts} /></section> : <DataError />}
      </AdminBody>
    </>
  );
}
