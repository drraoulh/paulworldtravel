export default function Quota({ remaining, plan, unit }: { remaining: number | null; plan: string | null; unit: string }) {
  if (remaining === null) return null;
  const text = plan === 'trial'
    ? `Essai gratuit : ${Math.max(0, remaining)} ${unit} restante${remaining > 1 ? 's' : ''}.`
    : `Il vous reste ${Math.max(0, remaining)} ${unit} aujourd’hui.`;
  return <p className="text-sm text-slate">{text}</p>;
}
