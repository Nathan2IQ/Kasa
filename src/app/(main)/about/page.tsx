import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center min-h-screen mt-10 p-4">
      <section className="max-w-7xl w-full p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-[#99331A]">À propos</h1>
          <p className="text-lg mb-6 mt-4">
            Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où
            se sentir bien.
          </p>
        </div>
        <div className="text-center w-0 md:w-2/3 mx-auto mb-10">
          <p className="text-lg my-6">
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
          className="rounded-lg shadow-md my-6"
        />
      </section>
      <section className="max-w-7xl w-full p-8 flex justify-around">
        <div className="w-full my-20 mr-10 flex flex-col items-start justify-center">
          <h2 className="text-3xl font-bold mb-4 text-left text-[#99331A]">
            Notre mission est simple :
          </h2>
          <ol className="list-decimal list-inside text-lg my-4">
            <li className="mb-5">
              Offrir une plateforme fiable et simple d&apos;utilisation
            </li>
            <li className="mb-5">
              Proposer des hébergements variés et de qualité
            </li>
            <li className="mb-5">
              Favoriser des échanges humains et chaleureux entre hôtes et
              voyageurs
            </li>
          </ol>
          <p className="text-xl font-semibold mb-6 text-[#99331A]">
            Que vous cherchiez un appartement cosy en centre-ville, une maison
            en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour
            que chaque séjour devienne un souvenir inoubliable.
          </p>
        </div>
        <div>
          <Image
            src="/imgAbout.png"
            alt="Image à propos"
            width={1300}
            height={600}
            className="rounded-lg shadow-md my-6"
          />
        </div>
      </section>
    </main>
  );
}
