'use client';
export default function PrintLegalButton() {
  return <button type="button" onClick={() => window.print()} className="rounded-full border border-rule bg-white px-5 py-3 text-sm font-semibold text-night hover:border-ocean print:hidden">Imprimer ou enregistrer en PDF</button>;
}
