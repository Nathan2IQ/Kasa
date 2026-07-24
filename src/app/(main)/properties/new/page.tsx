"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function NewPropertyPage() {
  return (
    <ProtectedRoute>
      <main className="flex-1 px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Ajouter un logement
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 mb-6">
              Remplissez le formulaire ci-dessous pour publier votre logement.
            </p>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Titre du logement
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6060] focus:border-transparent outline-none transition-all"
                  placeholder="Appartement moderne en centre-ville"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6060] focus:border-transparent outline-none transition-all"
                  placeholder="Décrivez votre logement..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6060] text-white py-3 rounded-lg font-semibold hover:bg-[#FF4040] transition-colors duration-300"
              >
                Publier le logement
              </button>
            </form>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
