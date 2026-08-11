import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPropertyById } from "@/lib/api/properties.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import PropertyGallery from "@/components/PropertyGallery";
import EditPropertyButton from "@/components/properties/EditPropertyButton";
import type { Metadata } from "next";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Métadonnées dynamiques pour chaque propriété
export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    return {
      title: "Propriété introuvable",
    };
  }

  return {
    title: property.title,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: [
        {
          url: property.cover || property.pictures?.[0] || "",
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: property.description,
      images: [property.cover || property.pictures?.[0] || ""],
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  // Schema.org JSON-LD pour la propriété
  const propertySchema = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    name: property.title,
    description: property.description,
    image: property.pictures || [],
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: "FR",
    },
    ...(property.rating_avg && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: property.rating_avg,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(property.host && {
      provider: {
        "@type": "Person",
        name: property.host.name,
        image: property.host.picture,
      },
    }),
    amenityFeature: property.equipments?.map((equipment) => ({
      "@type": "LocationFeatureSpecification",
      name: equipment,
    })),
  };

  return (
    <section className="min-h-screen mt-4 md:mt-15">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
      />
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
        {/* Back Link and Edit Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl p-3 bg-gray-100 hover:text-[#FF6060] transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2 h-4 w-4" />
            Retour aux annonces
          </Link>

          <EditPropertyButton propertyId={id} hostId={property.host?.id} />
        </div>

        {/* Main Grid: Images and Host Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Image Gallery - Large image left + 4 images grid right */}
          <div className="lg:col-span-2 order-1">
            <PropertyGallery
              images={property.pictures || []}
              title={property.title}
              coverImage={property.cover}
            />
          </div>

          {/* Host Card */}
          <div className="lg:col-span-1 order-2">
            {property.host && (
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm h-fit">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Votre hôte
                </h3>
                <div className="flex items-center mb-4">
                  {property.host.picture && (
                    <div className="relative rounded-lg mr-3 h-20 w-25 overflow-hidden">
                      <Image
                        src={property.host.picture}
                        alt={property.host.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p>{property.host.name}</p>
                    </div>
                    {property.rating_avg !== undefined && (
                      <div className="flex rounded-xl p-2 bg-gray-100 items-center">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="mr-1 h-4 w-4 text-[#FF6060]"
                        />
                        <span className="text-sm font-semibold text-gray-900">
                          {property.rating_avg.toFixed(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button className="w-full mb-3 rounded-lg bg-[#B34A3C] px-4 py-3 font-medium text-white transition-colors hover:bg-[#9a3f32]">
                  Contacter l&apos;hôte
                </button>
                <button className="w-full rounded-lg bg-[#B34A3C] px-4 py-3 font-medium text-white transition-colors hover:bg-[#9a3f32]">
                  Envoyer un message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white rounded-lg w-full lg:w-2/3 p-4 md:p-8 shadow-sm">
          {/* Title and Location */}
          <div className="mb-4 md:mb-6">
            <h1 className="mb-2 text-xl md:text-3xl font-bold text-gray-900">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faLocationDot} className="mr-2 h-4 w-4" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 md:mb-8">
            <p className="text-sm md:text-base leading-relaxed text-gray-700">
              {property.description}
            </p>
          </div>

          {/* Equipments */}
          {property.equipments && property.equipments.length > 0 && (
            <div className="mb-4 md:mb-6 w-full lg:w-1/2">
              <h2 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-gray-900">
                Équipements
              </h2>
              <div className="flex flex-wrap gap-2">
                {property.equipments.map((equipment, index) => (
                  <span
                    key={index}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700"
                  >
                    {equipment}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Category */}
          {property.tags && property.tags.length > 0 && (
            <div className="mb-4 md:mb-6 w-full lg:w-1/2">
              <h2 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-gray-900">
                Catégorie
              </h2>
              <div className="flex flex-wrap gap-2">
                {property.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
