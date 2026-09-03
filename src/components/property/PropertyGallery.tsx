import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import type { PropertyImage } from '@/types';
import { cn } from '@/utils/cn';

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-navy-100 rounded-xl flex items-center justify-center">
        <p className="text-navy-400 font-body">No images available</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main Image */}
        <div className="relative group rounded-xl overflow-hidden bg-navy-100">
          <div className="aspect-[16/9]">
            <img
              src={images[currentIndex]?.url}
              alt={`${title} - Image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Nav Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-navy-800" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-navy-800" />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            aria-label="View fullscreen"
          >
            <Expand className="w-4 h-4 text-navy-800" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/50 text-white text-sm font-body">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all',
                  index === currentIndex ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
                )}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Gallery */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[var(--z-modal)] bg-black flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center z-10"
            aria-label="Close fullscreen"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img
            src={images[currentIndex]?.url}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-body">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
