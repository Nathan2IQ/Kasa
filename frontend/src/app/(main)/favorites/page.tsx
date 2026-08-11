"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useFavorites } from "@/lib/context/FavoritesContext";
import PropertyList from "@/components/properties/PropertyList";

export default function FavoritesPage() {
  const { favorites, isLoading } = useFavorites();
  return (
    <ProtectedRoute>
      <main className="flex-1 px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center my-8 w-full">
            <h1 className="text-4xl font-bold text-[#99331A] mb-4">
              Vos favoris
            </h1>
            <p className="text-center w-1/2 mx-auto">
              Retrouvez ici tous les logements que vous avez aimés.
            </p>
            <p className="text-center w-1/2 mx-auto  mb-6">
              Prêts à réserver ? Un simple clic et votre prochain séjour est en
              route.
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6060]"></div>
                <p className="mt-4 text-gray-600">
                  Chargement de vos favoris...
                </p>
              </div>
            </div>
          ) : favorites.length > 0 ? (
            <>
              <PropertyList properties={favorites} />
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 mb-6 text-lg">
                Vous n&apos;avez pas encore ajouté de logements à vos favoris.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Parcourez nos logements et cliquez sur le cœur pour ajouter vos
                préférés ici.
              </p>
              <Link
                href="/"
                className="inline-block bg-[#99331A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF4040] transition-colors duration-300"
              >
                Découvrir les logements
              </Link>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
