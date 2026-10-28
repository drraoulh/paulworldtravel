import Link from 'next/link';

export default function SignInPrompt({ next, title = 'Connectez-vous pour être corrigé', text }: { next: string; title?: string; text?: string }) {
  return (
    <div className="rounded-2xl border border-rule bg-white p-6 sm:p-8">
      <h2 className="heading text-xl text-night">{title}</h2>
      <p className="mt-3 max-w-2xl text-slate">
        {text ?? 'La correction par l’IA est réservée aux comptes candidats. L’inscription est gratuite et donne droit à un essai : deux corrections écrites, une correction orale et quinze questions au tuteur.'}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/inscription/" className="inline-flex items-center justify-center rounded-full bg-container px-6 py-3 font-bold text-night hover:bg-container-hover">Créer mon compte</Link>
        <Link href={`/connexion/?suite=${encodeURIComponent(next)}`} className="inline-flex items-center justify-center rounded-full border-2 border-night px-6 py-3 font-bold text-night hover:bg-night hover:text-white">J’ai déjà un compte</Link>
      </div>
    </div>
  );
}
