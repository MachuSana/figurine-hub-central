
import { useState } from "react";
import { ImageIcon, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

type FigurineGalleryProps = {
  name: string;
  images: string[];
}

export const FigurineGallery = ({ name, images }: FigurineGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <ImageIcon size={20} />
        Galerie
      </h2>
      
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
        {/* Navigation buttons */}
        <button 
          onClick={previousImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 transition-colors"
          aria-label="Image précédente"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 transition-colors"
          aria-label="Image suivante"
        >
          <ChevronRight size={24} />
        </button>

        {/* Zoom button */}
        <button 
          onClick={toggleZoom}
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 transition-colors"
          aria-label="Zoomer/Dézoomer"
        >
          {isZoomed ? <ZoomOut size={24} /> : <ZoomIn size={24} />}
        </button>

        {/* Main image */}
        <div 
          className={`w-full h-full transition-transform duration-300 ${
            isZoomed ? 'cursor-zoom-out scale-150' : 'cursor-zoom-in'
          }`}
        >
          <img
            src={images[currentImageIndex]}
            alt={`${name} - vue ${currentImageIndex + 1}`}
            className="w-full h-full object-contain bg-gray-100"
            onClick={toggleZoom}
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 hover:border-primary transition-colors ${
              index === currentImageIndex ? 'border-primary' : 'border-transparent'
            }`}
          >
            <img
              src={image}
              alt={`${name} miniature ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
