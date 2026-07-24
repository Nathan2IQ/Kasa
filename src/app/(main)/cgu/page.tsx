import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation - Kasa",
  description:
    "Conditions générales d'utilisation de la plateforme Kasa - Location d'appartements et de maisons",
};

export default function CGUPage() {
  return (
    <main className="flex-1 px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/register"
            className="text-[#99331A] hover:text-[#FF4040] transition-colors inline-flex items-center"
          >
            ← Retour à l&apos;inscription
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Conditions Générales d&apos;Utilisation
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Dernière mise à jour : 24 juillet 2026
          </p>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                1. Objet
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Les présentes Conditions Générales d&apos;Utilisation (ci-après
                « CGU ») ont pour objet de définir les modalités et conditions
                d&apos;utilisation de la plateforme Kasa, ainsi que les droits
                et obligations des utilisateurs dans ce cadre.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                2. Acceptation des CGU
              </h2>
              <p className="text-gray-700 leading-relaxed">
                L&apos;utilisation de la plateforme Kasa implique
                l&apos;acceptation pleine et entière des présentes CGU. En
                créant un compte, vous reconnaissez avoir lu, compris et accepté
                sans réserve l&apos;ensemble des dispositions des présentes CGU.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                3. Inscription et compte utilisateur
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Pour accéder aux services de Kasa, vous devez créer un compte en
                fournissant des informations exactes et à jour. Vous êtes
                responsable de :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>La confidentialité de vos identifiants de connexion</li>
                <li>Toutes les activités effectuées depuis votre compte</li>
                <li>
                  Informer immédiatement Kasa en cas d&apos;utilisation non
                  autorisée
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                4. Description des services
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Kasa est une plateforme de mise en relation entre propriétaires
                de logements et locataires. La plateforme permet de consulter
                des annonces, de réserver des logements et de publier ses
                propres annonces de location.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                5. Obligations des utilisateurs
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                En utilisant Kasa, vous vous engagez à :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Respecter les lois et réglementations en vigueur</li>
                <li>Fournir des informations exactes et véridiques</li>
                <li>
                  Ne pas publier de contenu illégal, offensant ou trompeur
                </li>
                <li>Respecter les autres utilisateurs de la plateforme</li>
                <li>Ne pas tenter de contourner les mesures de sécurité</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                6. Propriété intellectuelle
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Tous les éléments de la plateforme Kasa (logos, textes, images,
                design) sont protégés par le droit d&apos;auteur et
                appartiennent à Kasa ou à ses partenaires. Toute reproduction ou
                utilisation non autorisée est strictement interdite.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                7. Responsabilité
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Kasa agit en tant qu&apos;intermédiaire et ne peut être tenu
                responsable des litiges entre utilisateurs. La plateforme
                s&apos;efforce de maintenir un service accessible et sécurisé,
                mais ne garantit pas l&apos;absence d&apos;interruptions ou
                d&apos;erreurs.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                8. Résiliation
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Vous pouvez supprimer votre compte à tout moment. Kasa se
                réserve le droit de suspendre ou supprimer un compte en cas de
                violation des présentes CGU, sans préavis ni indemnité.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                9. Modification des CGU
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Kasa se réserve le droit de modifier les présentes CGU à tout
                moment. Les utilisateurs seront informés des modifications par
                email ou via la plateforme. L&apos;utilisation continue du
                service après modification vaut acceptation des nouvelles CGU.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                10. Loi applicable et juridiction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Les présentes CGU sont régies par le droit français. En cas de
                litige, et à défaut de résolution amiable, les tribunaux
                français seront seuls compétents.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Contact
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Pour toute question concernant ces CGU, vous pouvez nous
                contacter à l&apos;adresse : contact@kasa.fr
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
