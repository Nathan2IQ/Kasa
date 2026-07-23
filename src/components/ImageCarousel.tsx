"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface ImageCarouselProps {
  images: string[];
  title: string;
  initialIndex?: number;
  onClose: () => void;
}

export default function ImageCarousel({
  images,
  title,
  initialIndex = 0,
  onClose,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={onClose}
      data-testid="carousel-overlay"
    >
      <div
        className="relative w-full h-full max-w-7xl max-h-screen p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white p-3 text-gray-900 transition-colors hover:bg-gray-200"
          aria-label="Fermer le carrousel"
          data-testid="carousel-close"
        >
          <FontAwesomeIcon icon={faXmark} className="h-6 w-6" />
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black bg-opacity-70 px-4 py-2 text-white">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Main Image */}
        <div className="relative h-full w-full">
          <Image
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-contain"
            priority
            data-testid="carousel-image"
          />
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-gray-900 transition-colors hover:bg-gray-200"
              aria-label="Image précédente"
              data-testid="carousel-previous"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="h-6 w-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-gray-900 transition-colors hover:bg-gray-200"
              aria-label="Image suivante"
              data-testid="carousel-next"
            >
              <FontAwesomeIcon icon={faChevronRight} className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Thumbnails/Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
                data-testid={`carousel-dot-${index}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
