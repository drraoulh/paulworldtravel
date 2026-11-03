import Link from 'next/link';
import { requireAdmin } from '@/lib/staff';
import { AdminHeading, AdminBody } from '@/components/admin/ui';
import ImportForm from './ImportForm';

// Creating accounts one by one can take a while for a long list.
export const maxDuration = 300;

export default async function ImportLearners() {
  await requireAdmin('/admin/apprenants/importer/');
  return (
    <>
      <AdminHeading eyebrow="Apprenants" title="Importer une liste" description="Créez d’un coup les comptes d’une classe : collez les lignes depuis Excel ou choisissez un fichier CSV (200 lignes au plus)." action={<Link href="/admin/apprenants/" className="text-sm font-bold text-ocean">← Tous les apprenants</Link>} />
      <AdminBody><ImportForm /></AdminBody>
    </>
  );
}
