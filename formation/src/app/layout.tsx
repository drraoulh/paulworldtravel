import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const archivo = Archivo({ variable: '--font-archivo', subsets: ['latin'], axes: ['wdth'] });

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
      <body className={`${archivo.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
