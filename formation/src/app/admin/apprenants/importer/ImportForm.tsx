'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import { fieldClass, adminButton } from '@/components/admin/ui';
import { importLearners, type ImportState } from '../actions';

const label = { cree: 'Créé', existe: 'Existe déjà', invalide: 'Email invalide', erreur: 'Échec' } as const;
const tone = { cree: 'text-green-700', existe: 'text-slate', invalide: 'text-maple', erreur: 'text-maple' } as const;
const example = 'Prénom;Nom;Email;Téléphone;Ville;Pack\nAminata;Ngono;aminata@exemple.com;+237 690000000;Douala;silver';

export default function ImportForm() {
  const [state, action, busy] = useActionState<ImportState, FormData>(importLearners, { results: [] });
  const created = state.results.filter((r) => r.status === 'cree').length;
  return (
    <div className="space-y-6">
      <form action={action} className="grid max-w-4xl gap-6 rounded-xl border border-rule bg-white p-6">
        <div className="text-sm text-slate">
          <p>Colonnes reconnues, dans cet ordre si la liste n’a pas de titres : <strong>Prénom, Nom, Email, Téléphone, Ville, Pack</strong>. Seul l’email est obligatoire. Le pack s’écrit essentiel, silver, gold ou platinum.</p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-paper p-3 text-xs">{example}</pre>
          <p className="mt-2">Depuis Excel : sélectionnez les cellules, copiez, puis collez ci-dessous. Ou bien Fichier, Enregistrer sous, CSV.</p>
        </div>
        <label className="text-xs font-semibold">Coller la liste
          <textarea name="text" rows={8} className={`mt-1 font-mono ${fieldClass}`} placeholder={example} />
        </label>
        <label className="text-xs font-semibold">Ou choisir un fichier CSV
          <input type="file" name="file" accept=".csv,.txt,text/csv" className="mt-1 block text-sm" />
        </label>
        <fieldset className="space-y-2 text-sm">
          <label className="flex items-start gap-2"><input type="checkbox" name="send_email" defaultChecked className="mt-1" />Envoyer à chacun l’email de bienvenue pour choisir son mot de passe</label>
          <label className="flex items-start gap-2"><input type="checkbox" name="activate" className="mt-1" />Les packs indiqués sont payés : les activer tout de suite (sinon ils restent en attente)</label>
          <label className="flex items-center gap-2 text-xs font-semibold">Durée des packs activés
            <select name="days" defaultValue="30" className="rounded-lg border border-rule px-2 py-1.5"><option value="30">30 jours</option><option value="60">60 jours</option><option value="90">90 jours</option><option value="180">180 jours</option></select>
          </label>
        </fieldset>
        <div><button disabled={busy} className={adminButton}>{busy ? 'Création des comptes…' : 'Importer'}</button></div>
      </form>

      {state.error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-maple">{state.error}</p>}
      {state.results.length > 0 && (
        <section className="max-w-4xl rounded-xl border border-rule bg-white p-6" aria-live="polite">
          <h2 className="font-bold">{created} compte{created > 1 ? 's' : ''} créé{created > 1 ? 's' : ''} sur {state.results.length} ligne{state.results.length > 1 ? 's' : ''}</h2>
          {state.tooMany && <p className="mt-2 text-sm text-maple">La liste dépassait 200 lignes : seules les 200 premières ont été traitées. Importez la suite séparément.</p>}
          <table className="mt-4 w-full text-left text-sm">
            <thead className="text-xs text-slate"><tr><th className="py-2">Ligne</th><th>Apprenant</th><th>Résultat</th></tr></thead>
            <tbody className="divide-y divide-rule">
              {state.results.map((r) => (
                <tr key={r.line}>
                  <td className="py-2 text-slate">{r.line}</td>
                  <td>{r.id ? <Link href={`/admin/apprenants/${r.id}/`} className="font-semibold text-ocean hover:underline">{r.name || r.email}</Link> : r.name || r.email || '(vide)'}<span className="block text-xs text-slate">{r.email}</span></td>
                  <td className={`font-semibold ${tone[r.status]}`}>{label[r.status]}{r.detail && <span className="block text-xs font-normal text-slate">{r.detail}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
