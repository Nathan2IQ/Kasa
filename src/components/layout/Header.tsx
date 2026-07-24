"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/lib/api/auth";

export function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-white rounded-lg shadow-md px-4 py-2 mx-auto mt-5 w-6xl flex items-center justify-center">
      <nav
        className="max-w-6xl mx-auto w-full"
        aria-label="Navigation principale"
      >
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
            <Link href="/" aria-label="Retour à l'accueil">
              <Image
                src="/logoKasa.png"
                alt="Logo de Kasa"
                width={150}
                height={150}
              />
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="text-lg group">
                <Link
                  href="/properties/new"
                  className="relative inline-block text-[#99331A] transition-colors duration-300 hover:text-[#FF6060] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FF6060] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                  aria-label="Ajouter un nouveau logement"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Ajouter un logement
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Link
                  href="/favorites"
                  className="text-lg text-[#99331A] transition-all duration-300 hover:text-[#FF6060] hover:scale-125 inline-block"
                  aria-label="Voir mes favoris"
                  title="Mes favoris"
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="transition-transform duration-300 hover:rotate-12"
                  />
                </Link>

                <p className="text-lg text-[#99331A]" aria-hidden="true">
                  |
                </p>

                <Link
                  href="/messages"
                  className="text-lg text-[#99331A] transition-all duration-300 hover:text-[#FF6060] hover:scale-125 inline-block"
                  aria-label="Voir mes messages"
                  title="Mes messages"
                >
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="transition-transform duration-300 hover:rotate-12"
                  />
                </Link>
              </li>
            </>
          ) : (
            <li className="text-lg">
              <Link
                href="/login"
                className="relative inline-block transition-colors duration-300 hover:text-[#FF6060] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FF6060] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
              >
                Connexion / Inscription
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
