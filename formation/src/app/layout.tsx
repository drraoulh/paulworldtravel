import type { Metadata } from 'next';
import { Atkinson_Hyperlegible_Next, Literata } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    'Préparez le TCF Canada en ligne ou en présentiel à Douala : cours, tests blancs chronométrés, corrections par des formateurs et suivi jusqu’au NCLC visé.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${literata.variable} ${atkinson.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
