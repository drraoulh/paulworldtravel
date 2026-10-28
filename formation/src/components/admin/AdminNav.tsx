import Link from 'next/link';

const items = [
  ['/admin/', 'Inscriptions'],
  ['/admin/corrections/', 'Corrections'],
  ['/admin/generer/', 'Générer des exercices'],
] as const;

export default function AdminNav({ current }: { current: string }) {
  return (
    <nav aria-label="Administration" className="mb-6 flex flex-wrap gap-4 text-sm font-semibold">
      {items.map(([href, label]) => (
        <Link key={href} href={href} className={current === href ? 'text-container' : 'text-blue-200 hover:text-white'}>{label}</Link>
      ))}
    </nav>
  );
}
