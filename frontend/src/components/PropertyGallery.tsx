"use client";

import { useState } from "react";
import Image from "next/image";
import ImageCarousel from "./ImageCarousel";

/**
 * Props du composant PropertyGallery
 * @typedef {Object} PropertyGalleryProps
 * @property {string[]} images - Tableau d'URLs des images de la propriété
 * @property {string} title - Titre du bien immobilier
 * @property {string} coverImage - Image de couverture principale
 */
interface PropertyGalleryProps {
  images: string[];
  title: string;
  coverImage: string;
}

/**
 * Composant PropertyGallery - Galerie de miniatures cliquables
 *
 * Affiche une grille de miniatures d'images qui, au clic, ouvre un carrousel plein écran.
 * - Affiche jusqu'à 4 miniatures visibles
 * - Indique le nombre d'images restantes (+X) s'il y en a plus de 4
 * - Ouvre le carrousel en plein écran au clic
 *
 * **Comportement** :
 * - 1-4 images : Affiche toutes les miniatures
 * - 5+ images : Affiche 3 miniatures + badge "+X autres"
 * - Clic sur une miniature : Ouvre le carrousel à cette image
 *
 * @component
 * @param {PropertyGalleryProps} props - Props du composant
 * @example
 * // Galerie basique
 * <PropertyGallery
 *   images={[
 *     "/uploads/image1.jpg",
 *     "/uploads/image2.jpg",
 *     "/uploads/image3.jpg"
 *   ]}
 *   title="Appartement Moderne"
 *   coverImage="/uploads/cover.jpg"
 * />
 *
 * @example
 * // Avec beaucoup d'images (affiche +X)
 * <PropertyGallery
 *   images={arrayOf10Images}
 *   title="Villa"
 *   coverImage={coverUrl}
 * />
 *
 * @returns {JSX.Element|null} Galerie de miniatures ou null si pas d'images
 *
 * @see {@link ImageCarousel} Carrousel ouvert au clic
 * @see {@link PropertyCard} Carte qui utilise souvent ce composant
 */
export default function PropertyGallery({
  images,
  title,
  coverImage,
}: PropertyGalleryProps) {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const allImages = images && images.length > 0 ? images : [coverImage];

  const openCarousel = (index: number) => {
    setSelectedImageIndex(index);
    setIsCarouselOpen(true);
  };

  return (
    <>
      <div className="flex gap-3 h-100">
        {/* Large Image Left */}
        <button
          onClick={() => openCarousel(0)}
          className="flex-1 relative overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          aria-label={`Voir l'image 1 en grand`}
        >
          <Image
            src={allImages[0]}
            alt={title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </button>

        {/* 4 Images Grid Right */}
        {allImages.length > 1 && (
          <div className="w-1/2 grid grid-cols-2 gap-3">
            {allImages.slice(1, 5).map((picture, index) => (
              <button
                key={index}
                onClick={() => openCarousel(index + 1)}
                className="relative overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                aria-label={`Voir l'image ${index + 2} en grand`}
              >
                <Image
                  src={picture}
                  alt={`${title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Show "+X" on last image if there are more images */}
                {index === 3 && allImages.length > 5 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <span className="text-3xl font-bold text-white">
                      +{allImages.length - 5}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Carousel Modal */}
      {isCarouselOpen && (
        <ImageCarousel
          images={allImages}
          title={title}
          initialIndex={selectedImageIndex}
          onClose={() => setIsCarouselOpen(false)}
        />
      )}
    </>
  );
}
