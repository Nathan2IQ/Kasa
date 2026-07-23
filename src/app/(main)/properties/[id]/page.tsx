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

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  console.log("Property ID from params:", id);
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <section className="min-h-screen mt-15">
      <div className="container mx-auto px-4 py-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center rounded-xl p-3 bg-gray-100 hover:text-[#FF6060] mb-10 transition-colors"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="mr-2 h-4 w-4" />
          Retour aux annonces
        </Link>

        {/* Main Grid: Images and Host Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Image Gallery - Large image left + 4 images grid right */}
          <div className="lg:col-span-2">
            <div className="flex gap-3 h-100">
              {/* Large Image Left */}
              <div className="flex-1 relative overflow-hidden rounded-lg">
                <Image
                  src={
                    property.pictures && property.pictures.length > 0
                      ? property.pictures[0]
                      : property.cover
                  }
                  alt={property.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* 4 Images Grid Right */}
              {property.pictures && property.pictures.length > 1 && (
                <div className="w-1/2 grid grid-cols-2 gap-3">
                  {property.pictures.slice(1, 5).map((picture, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-lg"
                    >
                      <Image
                        src={picture}
                        alt={`${property.title} - Image ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Host Card */}
          <div className="lg:col-span-1">
            {property.host && (
              <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
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
        <div className="bg-white rounded-lg w-2/3 p-8 shadow-sm">
          {/* Title and Location */}
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faLocationDot} className="mr-2 h-4 w-4" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="leading-relaxed text-gray-700">
              {property.description}
            </p>
          </div>

          {/* Equipments */}
          {property.equipments && property.equipments.length > 0 && (
            <div className="mb-6 w-1/2">
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
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
            <div className="mb-6 w-1/2">
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
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
