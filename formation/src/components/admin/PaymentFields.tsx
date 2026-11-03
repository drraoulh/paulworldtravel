import { currencies, paymentMethods } from '@/lib/admin/accounts';
import { fieldClass } from './ui';

/** Amount, currency, method and reference of a payment received outside the site. */
export default function PaymentFields({ required = false }: { required?: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="text-xs font-semibold">Montant reçu{required ? '' : ' (facultatif)'}
        <input name="amount" inputMode="decimal" required={required} placeholder="15000" className={`mt-1 ${fieldClass}`} />
      </label>
      <label className="text-xs font-semibold">Devise
        <select name="currency" className={`mt-1 ${fieldClass}`}>{currencies.map((c) => <option key={c}>{c}</option>)}</select>
      </label>
      <label className="text-xs font-semibold">Moyen de paiement
        <select name="method" className={`mt-1 ${fieldClass}`}>{paymentMethods.filter(([v]) => v !== 'stripe').map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
      </label>
      <label className="text-xs font-semibold">Référence (facultatif)
        <input name="reference" maxLength={120} placeholder="ID de transaction, n° de reçu" className={`mt-1 ${fieldClass}`} />
      </label>
    </div>
  );
}
