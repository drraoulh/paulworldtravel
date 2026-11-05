export default function Quota({ remaining, plan, unit }: { remaining: number | null; plan: string | null; unit: string }) {
  if (remaining === null) return null;
  const text = plan === 'trial'
    ? 'L’IA nécessite un pack payant actif.'
    : `Il vous reste ${Math.max(0, remaining)} ${unit} sur les dernières 24 heures.`;
  return <p className="text-sm text-slate">{text}</p>;
}
