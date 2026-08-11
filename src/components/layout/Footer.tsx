"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

/**
 * Composant Footer - Pied de page de l'application
 *
 * Affiche les informations en bas de page :
 * - Logo Kasa
 * - Informations d'authentification (selon l'état)
 * - Copyright
 *
 * **États d'affichage** :
 * - **Non connecté** : Liens "Connexion" et "Inscription"
 * - **Connecté** : Affiche "Connecté en tant que [Nom]" et bouton "Déconnexion"
 *
 * @component
 * @example
 * // Utilisation de base
 * <Footer />
 *
 * @example
 * // Avec AuthProvider
 * <AuthProvider>
 *   <Footer />
 * </AuthProvider>
 *
 * @returns {JSX.Element} Footer avec liens d'authentification ou informations utilisateur
 *
 * @see {@link Header} Pour l'en-tête
 * @see {@link useAuth} Hook d'authentification utilisé
 */
export function Footer() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <footer className="bg-white px-4 sm:px-10 py-4 mt-5 w-full border-t border-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Section gauche : Logo et authentification */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
          <Image
            src="/logoMobileKasa.png"
            alt="Logo de Kasa"
            width={50}
            height={50}
          />

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            {isAuthenticated && user ? (
              <>
                <p className="text-sm text-gray-700 text-center sm:text-left">
                  Connecté en tant que{" "}
                  <span className="font-medium text-[#EB0000]">
                    {user.firstName} {user.lastName}
                  </span>
                </p>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-[#FF6060] transition-colors duration-300 underline"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-[#FF6060] transition-colors duration-300"
                >
                  Connexion
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/register"
                  className="text-sm text-gray-600 hover:text-[#FF6060] transition-colors duration-300"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-500">
          &copy; 2025 Kasa. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
