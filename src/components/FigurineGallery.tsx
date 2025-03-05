
import { useState, useRef, useEffect } from "react";
import { ImageIcon, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type FigurineGalleryProps = {
  name: string;
  images: string[];
}

export const FigurineGallery = ({ name, images }: FigurineGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const { toast } = useToast();
  const galleryRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      galleryRef.current?.requestFullscreen().catch(err => {
        toast({
          title: "Erreur",
          description: "Impossible d'activer le mode plein écran",
          variant: "destructive",
        });
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') previousImage();
      else if (e.key === 'Escape' && isFullscreen) document.exitFullscreen();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', () => {
      setIsFullscreen(!!document.fullscreenElement);
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', () => {});
    };
  }, [isFullscreen]);

  // Touch gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left
        nextImage();
      } else {
        // Swipe right
        previousImage();
      }
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm p-6 transition-all ${isFullscreen ? 'fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center rounded-none' : ''}`}
      ref={galleryRef}
    >
      {isFullscreen && (
        <button 
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 transition-colors"
          aria-label="Fermer le plein écran"
        >
          <X size={24} />
        </button>
      )}
      
      <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isFullscreen ? 'text-white' : ''}`}>
        <ImageIcon size={20} />
        Galerie
      </h2>
      
      <div 
        className={`relative ${isFullscreen ? 'w-full max-w-4xl h-[70vh]' : 'aspect-[4/3]'} rounded-lg overflow-hidden mb-4`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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

        {/* Fullscreen button (if not already in fullscreen) */}
        {!isFullscreen && (
          <button 
            onClick={toggleFullscreen}
            className="absolute top-2 left-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 transition-colors"
            aria-label="Plein écran"
          >
            <Maximize2 size={24} />
          </button>
        )}

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
        
        {/* Image counter */}
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-sm px-2 py-1 rounded-full">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails - Hide in fullscreen mode */}
      {!isFullscreen && (
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
      )}
    </div>
  );
};
