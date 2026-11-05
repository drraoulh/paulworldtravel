'use client';
import Link from 'next/link';
export default function TermsAcceptance({ checked, onChange, paid = false }: { checked: boolean; onChange: (checked: boolean) => void; paid?: boolean }) {
  return <div className="mt-6 space-y-2 text-sm">
    <label className="flex items-start gap-3"><input type="checkbox" name="termsAccepted" checked={checked} onChange={(e) => onChange(e.target.checked)} required className="mt-1 h-5 w-5 shrink-0" /><span>J’accepte les <Link href="/conditions-utilisation/" target="_blank" rel="noopener" className="font-semibold text-ocean underline">conditions d’utilisation</Link>{paid && <> et les <Link href="/conditions-vente/" target="_blank" rel="noopener" className="font-semibold text-ocean underline">conditions de vente</Link></>}.</span></label>
    <p className="text-slate">Consultez la <Link href="/confidentialite/" target="_blank" rel="noopener" className="font-semibold text-ocean underline">politique de confidentialité</Link> pour connaître l’usage de vos données. Les statistiques facultatives se gèrent séparément dans les préférences de cookies.</p>
  </div>;
}
