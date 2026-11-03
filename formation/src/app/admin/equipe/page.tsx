import { requireStaff } from '@/lib/staff';
import { createAdminClient } from '@/lib/supabase/admin';
import { AdminHeading, AdminBody, DataError, fieldClass, adminButton } from '@/components/admin/ui';
import { roleName, type Role } from '@/lib/admin/accounts';
import { learnerName } from '@/lib/admin/learners';
import { formatDate } from '@/lib/labels';
import { addMember, changeRole } from './actions';

const messages: Record<string, string> = {
  cree: 'Le compte a été créé avec ce rôle. La personne a reçu un email pour choisir son mot de passe.',
  ajoute: 'Le rôle a été attribué. La personne voit l’administration à sa prochaine connexion.',
  role: 'Le rôle a été modifié.',
};
const errors: Record<string, string> = {
  email: 'Saisissez une adresse email valide et choisissez un rôle.',
  creation: 'Le compte n’a pas pu être créé.',
  role: 'Le rôle n’a pas pu être modifié.',
  soi: 'Vous ne pouvez pas modifier votre propre rôle. Demandez à un autre administrateur.',
};

export default async function Team({ searchParams }: { searchParams: Promise<{ succes?: string; erreur?: string }> }) {
  const { user, isAdmin } = await requireStaff('/admin/equipe/');
  const state = await searchParams;
  const admin = createAdminClient();
  const { data, error } = admin
    ? await admin.from('profiles').select('id,email,first_name,last_name,role,created_at').in('role', ['admin', 'trainer']).order('role').order('created_at')
    : { data: null, error: true };

  return (
    <>
      <AdminHeading title="L’équipe" description="Les administrateurs gèrent tout : apprenants, packs, paiements et équipe. Les formateurs consultent les apprenants et relisent les corrections, sans rien modifier d’autre." />
      <AdminBody>
        {state.succes && messages[state.succes] && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">{messages[state.succes]}</p>}
        {state.erreur && <DataError>{errors[state.erreur] ?? errors.role}</DataError>}
        {error ? <DataError /> : (
          <div className="overflow-x-auto rounded-xl border border-rule bg-white">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-rule bg-slate-50 text-xs text-slate"><tr><th className="px-5 py-3">Membre</th><th className="px-5 py-3">Rôle</th><th className="px-5 py-3">Depuis</th>{isAdmin && <th className="px-5 py-3">Modifier</th>}</tr></thead>
              <tbody className="divide-y divide-rule">
                {(data ?? []).map((m) => (
                  <tr key={m.id}>
                    <td className="px-5 py-3"><p className="font-semibold">{learnerName(m)}{m.id === user.id && <span className="ml-2 text-xs text-slate">(vous)</span>}</p><p className="text-xs text-slate">{m.email}</p></td>
                    <td className="px-5 py-3 font-semibold">{roleName[m.role as Role]}</td>
                    <td className="px-5 py-3 text-xs text-slate">{formatDate(m.created_at)}</td>
                    {isAdmin && (
                      <td className="px-5 py-3">
                        {m.id === user.id ? <span className="text-xs text-slate">Votre compte</span> : (
                          <form action={changeRole} className="flex items-center gap-2">
                            <input type="hidden" name="id" value={m.id} />
                            <select name="role" defaultValue={m.role} aria-label={`Rôle de ${m.email}`} className="rounded-lg border border-rule px-2 py-1.5 text-xs">
                              <option value="admin">Administrateur</option>
                              <option value="trainer">Formateur</option>
                              <option value="candidate">Retirer de l’équipe</option>
                            </select>
                            <button className="rounded-lg border border-rule px-3 py-1.5 text-xs font-bold hover:border-ocean">Appliquer</button>
                          </form>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isAdmin && (
          <form action={addMember} className="grid max-w-3xl gap-3 rounded-xl border border-rule bg-white p-6 sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-end">
            <h2 className="font-bold sm:col-span-4">Ajouter un membre</h2>
            <label className="text-xs font-semibold">Email<input name="email" type="email" required className={`mt-1 ${fieldClass}`} /></label>
            <label className="text-xs font-semibold">Prénom<input name="first_name" maxLength={100} className={`mt-1 ${fieldClass}`} /></label>
            <label className="text-xs font-semibold">Rôle<select name="role" className={`mt-1 ${fieldClass}`}><option value="trainer">Formateur</option><option value="admin">Administrateur</option></select></label>
            <button className={adminButton}>Ajouter</button>
            <p className="text-xs text-slate sm:col-span-4">Si un compte existe déjà avec cet email (par exemple un compte apprenant), il reçoit le rôle choisi. Sinon, le compte est créé et la personne reçoit un email pour choisir son mot de passe.</p>
          </form>
        )}
      </AdminBody>
    </>
  );
}
