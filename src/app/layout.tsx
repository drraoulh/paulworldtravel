import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { offices, phones } from "@/components/offices";
import { EMAIL_INFO } from "@/components/site";
import { Analytics } from '@vercel/analytics/next';

// One family, two voices: wide and heavy for headings, normal width for reading.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "Paul World Travel | Cargo Chine – Cameroun – Canada",
  description:
    "Cargo maritime et aérien entre la Chine, le Cameroun et le Canada, achats en Chine, change de devises, visas et accompagnement des entreprises. Siège à Douala, bureaux à Yaoundé, Guangzhou, Toronto et Montréal.",
  keywords:
    "Paul World Travel, PW3T, cargo, fret Cameroun Canada, Chine, Douala, Yaoundé, Guangzhou, Toronto, Montréal, change, visa, business",
};

const tel = (href: string) => href.replace("tel:", "");

// Structured data for search engines, built from the same office list as the pages.
const organization = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Paul World Travel",
  url: "https://www.paulworldtravel.com",
  logo: "https://www.paulworldtravel.com/brand/logo.png",
  email: EMAIL_INFO,
  telephone: tel(phones.cameroonWhatsapp.href),
  address: {
    "@type": "PostalAddress",
    streetAddress: offices[0].address.fr,
    addressLocality: offices[0].name.fr,
    addressCountry: "CM",
  },
  department: offices.slice(1).map((o) => ({
    "@type": "TravelAgency",
    name: `Paul World Travel ${o.name.fr}`,
    telephone: tel(o.phones[0].href),
    address: { "@type": "PostalAddress", streetAddress: o.address.fr, addressCountry: o.country.fr },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${archivo.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main id="contenu" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
