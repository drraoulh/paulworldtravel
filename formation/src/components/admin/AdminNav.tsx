import Link from 'next/link';
const labels: Record<string, string> = { '/admin/inscriptions/': 'Inscriptions', '/admin/corrections/': 'Corrections', '/admin/generer/': 'Banque d’exercices', '/admin/combinaisons/': 'Sujets des candidats' };
export default function AdminNav({ current }: { current: string }) {
  return <nav aria-label="Fil d’Ariane administration" className="mb-4 flex gap-2 text-xs text-blue-100"><Link href="/admin/" className="hover:underline">Administration</Link><span aria-hidden="true">/</span><span>{labels[current] ?? 'Vue d’ensemble'}</span></nav>;
}
