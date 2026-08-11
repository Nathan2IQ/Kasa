"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { useAuth } from "@/lib/api/auth";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isUpdating, setIsUpdating] = useState(false);

  const propertyIsFavorite = isFavorite(property.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Rediriger vers login si non connecté
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setIsUpdating(true);
    try {
      await toggleFavorite(property.id);
    } catch (error) {
      console.error("Erreur lors de la modification des favoris:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-102"
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-200">
        <Image
          src={property.cover}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform group-hover:scale-110"
          unoptimized
        />

        {/* Bouton Favoris */}
        <button
          onClick={handleFavoriteClick}
          disabled={isUpdating}
          className="absolute right-2 top-2 rounded-xl bg-white/90 p-2 shadow-md transition-all hover:bg-white hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={
            propertyIsFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
          }
          title={
            !isAuthenticated
              ? "Connectez-vous pour ajouter aux favoris"
              : propertyIsFavorite
                ? "Retirer des favoris"
                : "Ajouter aux favoris"
          }
        >
          <FontAwesomeIcon
            icon={propertyIsFavorite ? faHeartSolid : faHeartRegular}
            className="h-6 w-6 transition-colors"
            style={{ color: propertyIsFavorite ? "#FF6060" : "#333" }}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 text-xl font-medium line-clamp-1">
          {property.title}
        </h3>

        <p className="mb-3 pb-6 text-sm text-gray-600 flex items-center gap-1">
          {property.location}
        </p>

        <p className="mb-3 text-lg">
          {property.price_per_night} €{" "}
          <span className="text-sm font-normal text-gray-600">/ nuit</span>
        </p>

        {/* Tags */}
        {property.tags && property.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {property.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
