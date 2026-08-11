import type { Metadata } from "next";
import "./globals.css";
import "@/lib/fontawesome";
import { AuthProvider } from "@/lib/api/auth";
import { FavoritesProvider } from "@/lib/context/FavoritesContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://kasa.fr"), // À remplacer par votre domaine
  title: {
    default: "Kasa - Location d'appartements et maisons entre particuliers",
    template: "%s | Kasa",
  },
  description:
    "Trouvez votre logement idéal parmi des milliers d'appartements et maisons en location. Séjours uniques, hôtes vérifiés, réservation sécurisée.",
  keywords: [
    "location",
    "appartement",
    "maison",
    "vacances",
    "hébergement",
    "airbnb",
    "séjour",
  ],
  authors: [{ name: "Kasa" }],
  creator: "Kasa",
  publisher: "Kasa",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://kasa.fr",
    siteName: "Kasa",
    title: "Kasa - Location d'appartements et maisons entre particuliers",
    description:
      "Trouvez votre logement idéal avec Kasa. Des milliers d'hébergements chaleureux.",
    images: [
      {
        url: "/hero.png",
        width: 1300,
        height: 600,
        alt: "Kasa - Location de logements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kasa - Location d'appartements et maisons",
    description: "Trouvez votre logement idéal avec Kasa",
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`h-full antialiased`}>
      <head>
        <link rel="preconnect" href="http://localhost:3000" />
        <link rel="dns-prefetch" href="http://localhost:3000" />
      </head>
      <body className="min-h-full flex px-5 flex-col">
        <AuthProvider>
          <FavoritesProvider>
            <Header />
            {children}
            <Footer />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
