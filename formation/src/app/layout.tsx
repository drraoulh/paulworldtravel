import type { Metadata } from 'next';
import { Atkinson_Hyperlegible_Next, Literata } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';
import ProgressSync from '@/components/parcours/progressSync';
import Sidebar from '@/components/academy/Sidebar';
import FloatingTutor from '@/components/ai/FloatingTutor';
import { modules } from '@/content/parcours';

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${literata.variable} ${atkinson.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header lessons={modules.flatMap((m) => m.lessons.map((l) => ({ title: l.title, module: m.name, href: `/epreuve/${m.slug}/methodologie/${l.slug}/` })))} />
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col lg:pl-60 print:pl-0">
            <main id="main-content" className="min-w-0 flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingTutor />
        </div>
        <Analytics />
        <ProgressSync />
      </body>
    </html>
  );
}
