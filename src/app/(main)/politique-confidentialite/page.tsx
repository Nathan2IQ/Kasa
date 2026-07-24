import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de Confidentialité - Kasa",
  description:
    "Politique de confidentialité et protection des données personnelles de la plateforme Kasa",
};

export default function PolitiqueConfidentialitePage() {
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
            Politique de Confidentialité
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Dernière mise à jour : 24 juillet 2026
          </p>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Kasa s&apos;engage à protéger la confidentialité et la sécurité
                de vos données personnelles. Cette politique explique comment
                nous collectons, utilisons et protégeons vos informations
                conformément au Règlement Général sur la Protection des Données
                (RGPD).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                2. Données collectées
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Nous collectons les données suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Données d&apos;identification :</strong> nom, prénom,
                  email
                </li>
                <li>
                  <strong>Données de connexion :</strong> adresse IP, logs de
                  connexion
                </li>
                <li>
                  <strong>Données d&apos;utilisation :</strong> historique de
                  navigation, préférences
                </li>
                <li>
                  <strong>Données de paiement :</strong> informations bancaires
                  (traitées par notre prestataire sécurisé)
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                3. Finalités du traitement
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Vos données sont collectées pour :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Gérer votre compte utilisateur</li>
                <li>
                  Faciliter la mise en relation avec d&apos;autres utilisateurs
                </li>
                <li>Traiter vos réservations et paiements</li>
                <li>Améliorer nos services</li>
                <li>
                  Vous envoyer des communications (avec votre consentement)
                </li>
                <li>Assurer la sécurité de la plateforme</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                4. Base légale du traitement
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>Votre consentement explicite</li>
                <li>L&apos;exécution du contrat de services</li>
                <li>Le respect d&apos;obligations légales</li>
                <li>Notre intérêt légitime à améliorer nos services</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                5. Destinataires des données
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Vos données peuvent être transmises à :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>
                  Les autres utilisateurs de la plateforme (informations de
                  profil public)
                </li>
                <li>
                  Nos prestataires techniques (hébergement, paiement, analytics)
                </li>
                <li>
                  Les autorités compétentes en cas d&apos;obligation légale
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                6. Conservation des données
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Vos données sont conservées pendant :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>
                  La durée de votre compte actif + 3 ans après suppression
                </li>
                <li>10 ans pour les données comptables et fiscales</li>
                <li>1 an pour les logs de connexion</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                7. Vos droits
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Droit d&apos;accès :</strong> obtenir une copie de vos
                  données
                </li>
                <li>
                  <strong>Droit de rectification :</strong> corriger vos données
                  inexactes
                </li>
                <li>
                  <strong>Droit à l&apos;effacement :</strong> supprimer vos
                  données
                </li>
                <li>
                  <strong>Droit à la portabilité :</strong> récupérer vos
                  données dans un format structuré
                </li>
                <li>
                  <strong>Droit d&apos;opposition :</strong> vous opposer au
                  traitement
                </li>
                <li>
                  <strong>Droit de limitation :</strong> limiter le traitement
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Pour exercer ces droits, contactez-nous à : privacy@kasa.fr
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                8. Sécurité des données
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nous mettons en œuvre des mesures techniques et
                organisationnelles appropriées pour protéger vos données contre
                tout accès non autorisé, perte ou destruction. Cela inclut le
                chiffrement des données sensibles, l&apos;authentification
                sécurisée et des audits réguliers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                9. Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Notre site utilise des cookies pour améliorer votre expérience.
                Vous pouvez gérer vos préférences de cookies via les paramètres
                de votre navigateur. Certains cookies sont essentiels au
                fonctionnement du site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                10. Modifications de la politique
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Nous pouvons modifier cette politique de confidentialité. Vous
                serez informé des changements significatifs par email ou via la
                plateforme.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Contact & Délégué à la Protection des Données
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Pour toute question concernant vos données personnelles :
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Email : privacy@kasa.fr
                <br />
                Adresse : Kasa - Service Protection des Données, 75001 Paris
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Vous avez également le droit de déposer une réclamation auprès
                de la CNIL (Commission Nationale de l&apos;Informatique et des
                Libertés).
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
