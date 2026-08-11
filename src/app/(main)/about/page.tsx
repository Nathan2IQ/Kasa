import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos de Kasa",
  description:
    "Découvrez l'histoire de Kasa, plateforme de location d'appartements et maisons entre particuliers. Voyagez autrement, séjournez chez l'habitant.",
  openGraph: {
    title: "À propos de Kasa",
    description: "Découvrez l'histoire de Kasa",
    images: ["/heroAbout.png"],
  },
};

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center min-h-screen mt-4 md:mt-10 px-4 md:px-8">
      <section className="max-w-7xl w-full p-4 md:p-8">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 text-[#99331A]">
            À propos
          </h1>
          <p className="text-base md:text-lg mb-6 mt-4">
            Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où
            se sentir bien.
          </p>
        </div>
        <div className="text-center w-full md:w-2/3 mx-auto mb-6 md:mb-10">
          <p className="text-base md:text-lg my-4 md:my-6">
            Depuis notre création, nous mettons en relation des voyageurs en
            quête d’authenticité avec des hôtes passionnés qui aiment partager
            leur région et leurs bonnes adresses.
          </p>
        </div>
        <Image
          src="/heroAbout.png"
          alt="Image à propos"
          width={1300}
          height={600}
          className="rounded-lg shadow-md my-4 md:my-6 w-full h-auto"
          priority
        />
      </section>
      <section className="max-w-7xl w-full p-4 md:p-8 flex flex-col lg:flex-row justify-around gap-6 lg:gap-0">
        <div className="w-full lg:w-1/2 my-6 md:my-20 lg:mr-10 flex flex-col items-start justify-center">
          <h2 className="text-xl md:text-3xl font-bold mb-4 text-left text-[#99331A]">
            Notre mission est simple :
          </h2>
          <ol className="list-decimal list-inside text-base md:text-lg my-4">
            <li className="mb-3 md:mb-5">
              Offrir une plateforme fiable et simple d&apos;utilisation
            </li>
            <li className="mb-3 md:mb-5">
              Proposer des hébergements variés et de qualité
            </li>
            <li className="mb-3 md:mb-5">
              Favoriser des échanges humains et chaleureux entre hôtes et
              voyageurs
            </li>
          </ol>
          <p className="text-base md:text-xl font-semibold mb-6 text-[#99331A]">
            Que vous cherchiez un appartement cosy en centre-ville, une maison
            en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour
            que chaque séjour devienne un souvenir inoubliable.
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <Image
            src="/imgAbout.png"
            alt="Image à propos"
            width={1300}
            height={600}
            className="rounded-lg shadow-md my-4 md:my-6 w-full h-auto"
          />
        </div>
      </section>
    </main>
  );
}
