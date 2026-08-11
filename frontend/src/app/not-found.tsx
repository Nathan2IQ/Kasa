import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#99331A] mb-4">404</h1>
        <p className="text-2xl w-2/3 mx-auto mb-8">
          Il semble que la page que vous cherchez ait pris des vacances… ou
          n&apos;ait jamais existé.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#99331A] text-white px-6 py-3 rounded-lg"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
