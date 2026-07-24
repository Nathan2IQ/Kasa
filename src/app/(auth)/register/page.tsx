"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/api/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validation basique
      if (!email || !password || !firstName || !lastName) {
        setError("Veuillez remplir tous les champs");
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Le mot de passe doit contenir au moins 6 caractères");
        setIsLoading(false);
        return;
      }

      if (!acceptedTerms) {
        setError("Vous devez accepter les conditions générales d'utilisation");
        setIsLoading(false);
        return;
      }

      // Inscription
      await register({
        email,
        password,
        firstName,
        lastName,
      });

      // Redirection vers la page d'accueil
      router.push("/");
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue lors de l'inscription");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-1/3 min-w-75 max-w-200">
        <div className="bg-white rounded-lg shadow-lg p-20">
          <h1 className="text-3xl font-bold text-center text-[#99331A] mb-4">
            Rejoignez la communauté Kasa
          </h1>
          <p className="text-center mx-auto mb-10">
            Créez votre compte et commencez à voyager autrement : réservez des
            logements uniques, découvrez de nouvelles destinations et partagez
            vos propres lieux avec d&apos;autres voyageurs.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6060] focus:border-transparent outline-none transition-all"
                  placeholder="Prénom"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6060] focus:border-transparent outline-none transition-all"
                  placeholder="Nom"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6060] focus:border-transparent outline-none transition-all"
                placeholder="votre@email.com"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6060] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                disabled={isLoading}
                required
                minLength={6}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6060] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                disabled={isLoading}
                required
                minLength={6}
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="acceptedTerms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-[#FF6060] border-gray-300 rounded focus:ring-2 focus:ring-[#FF6060] cursor-pointer"
                disabled={isLoading}
                required
              />
              <label
                htmlFor="acceptedTerms"
                className="ml-3 text-sm text-gray-700 cursor-pointer"
              >
                J&apos;accepte les{" "}
                <Link
                  href="/cgu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#99331A] hover:text-[#FF4040] underline font-medium transition-colors"
                >
                  Conditions Générales d&apos;Utilisation
                </Link>{" "}
                et la{" "}
                <Link
                  href="/politique-confidentialite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#99331A] hover:text-[#FF4040] underline font-medium transition-colors"
                >
                  Politique de Confidentialité
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#99331A] text-white py-3 rounded-lg font-semibold hover:bg-[#FF4040] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Déjà un compte ?{" "}
              <Link
                href="/login"
                className="text-[#99331A] hover:text-[#FF4040] font-medium transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
