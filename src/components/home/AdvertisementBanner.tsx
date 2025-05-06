
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Advertisement = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  backgroundColor?: string;
};

interface AdvertisementBannerProps {
  className?: string;
  variant?: "fullwidth" | "sidebar" | "inline";
  dismissible?: boolean;
}

export const AdvertisementBanner = ({
  className,
  variant = "fullwidth",
  dismissible = true,
}: AdvertisementBannerProps) => {
  const [dismissed, setDismissed] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Exemple de publicités
  const advertisements: Advertisement[] = [
    {
      id: "ad1",
      title: "Précommandes Exclusives",
      description: "Économisez jusqu'à 15% sur les précommandes des figurines One Piece",
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      link: "/promotions",
      backgroundColor: "bg-blue-50",
    },
    {
      id: "ad2",
      title: "Nouvelle Collection",
      description: "Découvrez les figurines Dragon Ball en édition limitée",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      link: "/nouveautes",
      backgroundColor: "bg-amber-50",
    },
    {
      id: "ad3",
      title: "Salon de Figurines",
      description: "Rejoignez-nous au salon international de figurines ce weekend",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      link: "/evenements",
      backgroundColor: "bg-purple-50",
    },
  ];

  // Rotation des annonces toutes les 15 secondes
  useEffect(() => {
    if (!advertisements.length) return;
    
    const timer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % advertisements.length);
    }, 15000);
    
    return () => clearInterval(timer);
  }, [advertisements.length]);

  if (dismissed || advertisements.length === 0) return null;

  const currentAd = advertisements[currentAdIndex];

  const variantStyles = {
    fullwidth: "w-full rounded-xl overflow-hidden shadow-sm",
    sidebar: "w-full lg:w-64 rounded-lg overflow-hidden shadow-sm",
    inline: "w-full max-w-3xl rounded-lg overflow-hidden shadow-sm",
  };

  return (
    <div 
      className={cn(
        "relative mb-12 animate-fade-in border border-gray-100",
        variantStyles[variant],
        currentAd.backgroundColor || "bg-gray-50",
        className
      )}
    >
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full text-gray-600 hover:text-gray-900 transition-colors z-10"
          aria-label="Fermer la publicité"
        >
          <X size={16} />
        </button>
      )}
      <a 
        href={currentAd.link} 
        className="block"
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 overflow-hidden">
            <img 
              src={currentAd.imageUrl} 
              alt={currentAd.title}
              className="w-full h-40 md:h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <div className="text-xs uppercase tracking-wider text-primary mb-1 font-medium">Sponsorisé</div>
            <h3 className="font-bold text-lg md:text-xl mb-2">{currentAd.title}</h3>
            <p className="text-gray-600 text-sm md:text-base">{currentAd.description}</p>
            <div className="mt-4 inline-flex items-center text-primary font-medium text-sm hover:underline">
              En savoir plus
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </div>
        </div>
      </a>

      {/* Indicateurs de publicités multiples */}
      {advertisements.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {advertisements.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors",
                index === currentAdIndex ? "bg-primary" : "bg-gray-300"
              )}
              onClick={() => setCurrentAdIndex(index)}
              aria-label={`Voir publicité ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
