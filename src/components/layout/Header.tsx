"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMessage,
  faPlus,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/lib/api/auth";
import { useState } from "react";

/**
 * Composant Header - En-tête principal de l'application
 *
 * Affiche la navigation principale avec un menu responsive.
 * Le contenu varie selon l'état d'authentification :
 * - **Non connecté** : Liens Accueil et À propos
 * - **Utilisateur connecté** : + Icônes Favoris et Messages
 * - **Propriétaire/Admin** : + Bouton "Ajouter un logement"
 *
 * @component
 * @example
 * // Utilisation de base
 * <Header />
 *
 * @example
 * // Avec AuthProvider pour gérer l'authentification
 * <AuthProvider>
 *   <Header />
 * </AuthProvider>
 *
 * @returns {JSX.Element} Header avec navigation responsive
 *
 * @see {@link Footer} Pour le pied de page
 * @see {@link useAuth} Hook d'authentification utilisé
 */
export function Header() {
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white rounded-lg shadow-md px-4 py-2 mx-auto mt-5 w-full max-w-7xl">
      <nav className="w-full relative" aria-label="Navigation principale">
        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center justify-center gap-6 space-x-4">
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
              {/* Afficher le lien "Ajouter un logement" seulement pour les propriétaires et admins */}
              {(user?.role === "owner" || user?.role === "admin") && (
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
              )}
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

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Retour à l'accueil">
            <Image
              src="/logoKasa.png"
              alt="Logo de Kasa"
              width={120}
              height={120}
            />
          </Link>

          {/* Burger Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-2xl text-[#99331A] hover:text-[#FF6060] transition-colors p-2"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg py-4 z-50">
            <ul className="flex flex-col space-y-4 px-6">
              <li>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="block text-lg hover:text-[#FF6060] transition-colors py-2"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={closeMenu}
                  className="block text-lg hover:text-[#FF6060] transition-colors py-2"
                >
                  À propos
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  {(user?.role === "owner" || user?.role === "admin") && (
                    <li>
                      <Link
                        href="/properties/new"
                        onClick={closeMenu}
                        className="block text-lg text-[#99331A] hover:text-[#FF6060] transition-colors py-2"
                      >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Ajouter un logement
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      href="/favorites"
                      onClick={closeMenu}
                      className="block text-lg text-[#99331A] hover:text-[#FF6060] transition-colors py-2"
                    >
                      <FontAwesomeIcon icon={faHeart} className="mr-2" />
                      Mes favoris
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/messages"
                      onClick={closeMenu}
                      className="block text-lg text-[#99331A] hover:text-[#FF6060] transition-colors py-2"
                    >
                      <FontAwesomeIcon icon={faMessage} className="mr-2" />
                      Mes messages
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block text-lg hover:text-[#FF6060] transition-colors py-2"
                  >
                    Connexion / Inscription
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
