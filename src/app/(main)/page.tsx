import { getProperties } from "@/lib/api";
import PropertyList from "@/components/properties/PropertyList";
import Image from "next/image";
import type { Property } from "@/types/property";

export default async function Home() {
  let properties: Property[] = [];
  let error: string | null = null;

  try {
    properties = await getProperties();
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "Erreur lors du chargement des logements";
    console.error("Error fetching properties:", e);
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center my-10">
          <h1 className="mb-2 text-4xl font-bold text-[#99331A]">
            Chez vous, partout et ailleurs
          </h1>
          <p className="text-lg mb-10">
            Avec Kasa, vivez des séjours uniques dans des hébergements
            chaleureux, sélectionnés avec soin par nos hôtes.
          </p>
          <Image
            src="/hero.png"
            alt="Hero Image"
            width={1300}
            height={600}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
            <p className="font-semibold">⚠️ {error}</p>
            <p className="text-sm mt-1">
              Assurez-vous que le backend est démarré sur le port 3000.
            </p>
          </div>
        )}

        {/* Properties List */}
        <PropertyList properties={properties} />

        {/* Comment ça marche ? */}

        <section className="mt-16 text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
          <p className="text-lg mb-6">
            Que vous partiez pour un week-end improvisé, des vacances en famille
            ou un voyage professionnel, Kasa vous aide à trouver un lieu qui
            vous ressemble.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className=" p-6 rounded-lg flex flex-col items-baseline justify-center h-60 bg-[#842C16] text-white">
              <h3 className="text-xl  font-semibold mb-2">Recherchez</h3>
              <p className="text-left">
                Entrez votre destination, vos dates et laissez Kasa faire le
                reste
              </p>
            </div>
            <div className="p-6 rounded-lg flex flex-col items-baseline justify-center bg-[#842C16] text-white">
              <h3 className="text-xl font-semibold mb-2">Réservez</h3>
              <p className="text-left">
                Profitez d&apos;une plateforme sécurisée et de profils
                d&apos;hôtes vérifiés.
              </p>
            </div>
            <div className="p-6 rounded-lg flex flex-col items-baseline justify-center bg-[#842C16] text-white">
              <h3 className="text-xl font-semibold mb-2">
                Vivez l&apos;expérience
              </h3>
              <p className="text-left">
                Installez-vous, profitez de votre séjour, et sentez-vous chez
                vous, partout.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
