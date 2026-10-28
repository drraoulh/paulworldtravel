import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// One family, two voices: wide and heavy for headings, normal width for reading.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "Paul World Travel | Cargo Chine – Cameroun – Canada",
  description:
    "Cargo maritime et aérien entre la Chine, le Cameroun et le Canada, achats en Chine, change de devises, visas et accompagnement des entreprises. Siège à Douala, bureau à Foshan.",
  keywords: "Paul World Travel, PW3T, cargo, fret Cameroun Canada, Chine, Douala, Foshan, change, visa, business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${archivo.variable} antialiased`}>
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
