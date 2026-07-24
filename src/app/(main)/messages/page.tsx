"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function MessagesPage() {
  return (
    <ProtectedRoute>
      <main className="flex-1 px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Messagerie</h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600">Votre messagerie apparaîtra ici.</p>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
