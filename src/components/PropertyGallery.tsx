"use client";

import { useState } from "react";
import Image from "next/image";
import ImageCarousel from "./ImageCarousel";

interface PropertyGalleryProps {
  images: string[];
  title: string;
  coverImage: string;
}

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
