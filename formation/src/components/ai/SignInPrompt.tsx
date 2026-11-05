'use client';

import SignInRequired from '@/components/access/SignInRequired';

/** For a visitor: the sign-in popup, and the same choice inline. */
export default function SignInPrompt({ next, title = 'Connectez-vous pour être corrigé', text }: { next: string; title?: string; text?: string }) {
  return (
    <SignInRequired
      next={next}
      title={title}
      text={text ?? 'Connectez-vous avec le compte de votre pack pour faire corriger votre production. Les corrections et le tuteur IA sont inclus dans les packs.'}
    />
  );
}
