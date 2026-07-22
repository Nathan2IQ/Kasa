import type { Metadata } from "next";
import "./globals.css";
import "@/lib/fontawesome";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";

export const metadata: Metadata = {
  title: "Kasa",
  description: "Application de location d'appartements et de maisons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="bg-white rounded-lg shadow-md px-4 py-2 mx-auto mt-5 w-6xl flex items-center justify-center">
          <nav className="max-w-6xl mx-auto w-full">
            <ul className="flex items-center justify-center gap-6 space-x-4">
              <li className="text-lg group">
                <Link
                  href="/"
                  className="relative inline-block transition-colors duration-300 hover:text-[#FF6060] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FF6060] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Accueil
                </Link>
              </li>
              <li className="text-lg group">
                <Link
                  href="/about"
                  className="relative inline-block transition-colors duration-300 hover:text-[#FF6060] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FF6060] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image
                    src="/logoKasa.png"
                    alt="Logo de Kasa"
                    width={150}
                    height={150}
                  />
                </Link>
              </li>
              <li className="text-lg group">
                <Link
                  href="#"
                  className="relative inline-block text-[#99331A] transition-colors duration-300 hover:text-[#FF6060] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FF6060] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                >
                  + Ajouter un logement
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Link
                  href="/fav"
                  className="text-lg text-[#99331A] transition-all duration-300 hover:text-[#FF6060] hover:scale-125 inline-block"
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="transition-transform duration-300 hover:rotate-12"
                  />
                </Link>

                <p className="text-lg text-[#99331A]">|</p>

                <Link
                  href="/contact"
                  className="text-lg text-[#99331A] transition-all duration-300 hover:text-[#FF6060] hover:scale-125 inline-block"
                >
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="transition-transform duration-300 hover:rotate-12"
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        <footer className="bg-white px-10 py-2 mt-5 w-full flex items-center justify-between">
          <Image
            src="/logoMobileKasa.png"
            alt="Logo de Kasa"
            width={50}
            height={50}
          />
          <p className="text-center text-sm text-gray-500">
            &copy; 2025 Kasa. Tous droits réservés.
          </p>
        </footer>
      </body>
    </html>
  );
}
