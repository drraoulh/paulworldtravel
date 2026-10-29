import type { Metadata } from 'next';
import { Container, PageHeader } from '@/components/ui';
import SignInPrompt from '@/components/ai/SignInPrompt';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/config';
import ReportForm from './ReportForm';

export const metadata: Metadata = { title: 'Partager mes sujets du TCF Canada' };
export const dynamic = 'force-dynamic';

export default async function PartagerPage() {
  let signedIn = false;
  if (supabaseConfigured) {
    const supabase = await createClient();
    signedIn = Boolean((await supabase.auth.getUser()).data.user);
  }
  return (
    <>
      <PageHeader
        title="Partagez vos sujets d’expression écrite"
        intro="Vous venez de passer le TCF Canada ? Racontez-nous les trois tâches que vous avez eues. Notre équipe les reformule, ajoute un corrigé et les publie par mois de session pour les prochains candidats."
      />
      <section className="bg-paper py-12 sm:py-16">
        <Container className="max-w-3xl">
          {signedIn ? <ReportForm /> : <SignInPrompt next="/partager-mes-sujets/" title="Connectez-vous pour partager vos sujets" text="Un compte gratuit nous permet d’éviter les envois en double et de vous remercier." />}
          <p className="mt-6 text-sm text-slate">
            Votre nom n’est jamais publié. Les sujets sont réécrits avant publication : seuls le type de tâche et le thème sont conservés.
          </p>
        </Container>
      </section>
    </>
  );
}
