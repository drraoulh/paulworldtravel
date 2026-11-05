import type { Metadata } from 'next';
import { Atkinson_Hyperlegible_Next, Literata } from 'next/font/google';
import './globals.css';
import CookieConsent from '@/components/legal/CookieConsent';
import SiteFrame from '@/components/academy/SiteFrame';
import { publishedModules } from '@/lib/training-content';

// Literata: a typeface designed for long reading (titles and lessons).
// Atkinson Hyperlegible Next: designed for legibility (interface, answers, numbers).
const literata = Literata({ variable: '--font-literata', subsets: ['latin'], axes: ['opsz'] });
const atkinson = Atkinson_Hyperlegible_Next({ variable: '--font-atkinson', subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Préparation au TCF Canada | Paul World Travel Formation',
    template: '%s | Paul World Travel Formation',
  },
  description:
    'Préparez le TCF Canada en ligne ou en présentiel à Douala et à Yaoundé : cours, tests blancs chronométrés, corrections par des formateurs et suivi jusqu’au NCLC visé.',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const modules = await publishedModules();
  return (
    <html lang="fr">
      <body className={`${literata.variable} ${atkinson.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteFrame lessons={modules.flatMap((m) => m.lessons.map((l) => ({ title: l.title, module: m.name, href: `/epreuve/${m.slug}/methodologie/${l.slug}/` })))}>{children}</SiteFrame>
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
