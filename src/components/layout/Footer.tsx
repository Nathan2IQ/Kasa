"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

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
    <footer className="bg-white px-10 py-4 mt-5 w-full flex items-center justify-between border-t border-gray-200">
      <div className="flex items-center gap-10">
        <Image
          src="/logoMobileKasa.png"
          alt="Logo de Kasa"
          width={50}
          height={50}
        />

        <div className="flex items-center gap-6">
          {isAuthenticated && user ? (
            <>
              <p className="text-sm text-gray-700">
                Connecté en tant que{" "}
                <span className="font-medium text-[#FF6060]">
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

      <p className="text-center text-sm text-gray-500">
        &copy; 2025 Kasa. Tous droits réservés.
      </p>
    </footer>
  );
}
