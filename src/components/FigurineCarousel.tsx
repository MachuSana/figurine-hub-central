
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";

type FigurineCarouselProps = {
  name: string;
  images: string[];
  className?: string;
}

export const FigurineCarousel = ({ name, images, className }: FigurineCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const { toast } = useToast();
  const galleryRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleSelect = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      galleryRef.current?.requestFullscreen().catch(() => {
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
      if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'Escape' && isFullscreen) {
        document.exitFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', () => {
      setIsFullscreen(!!document.fullscreenElement);
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', () => {});
    };
  }, [isFullscreen, images.length]);

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
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      } else {
        // Swipe right
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
  };

  return (
    <div 
      ref={galleryRef}
      className={cn(
        "bg-white rounded-xl shadow-sm p-6 transition-all",
        isFullscreen ? "fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center rounded-none" : "",
        className
      )}
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
      
      <h2 className={cn(
        "text-xl font-semibold mb-4 flex items-center gap-2",
        isFullscreen ? "text-white" : ""
      )}>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        Galerie
      </h2>
      
      <div 
        className={cn(
          "relative overflow-hidden mb-4 rounded-lg",
          isFullscreen ? "w-full max-w-4xl h-[70vh]" : "aspect-[4/3]"
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={carouselRef}
      >
        <div className={cn(
          "w-full h-full flex transition-transform duration-300",
          isZoomed ? "cursor-zoom-out scale-150" : "cursor-zoom-in"
        )}>
          <img
            src={images[currentImageIndex]}
            alt={`${name} - vue ${currentImageIndex + 1}`}
            className="w-full h-full object-contain bg-gray-100"
            onClick={toggleZoom}
          />
        </div>

        {/* Controls */}
        <button 
          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 transition-colors"
          aria-label="Image précédente"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
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
          {isZoomed ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg> : <ZoomIn size={24} />}
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
        
        {/* Image counter */}
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-sm px-2 py-1 rounded-full">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails - Hide in fullscreen mode */}
      {!isFullscreen && (
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors",
                index === currentImageIndex ? "border-primary" : "border-transparent hover:border-primary/50"
              )}
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
