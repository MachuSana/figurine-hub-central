
import { Link } from "react-router-dom";
import { Tag, Star, Calendar, Trophy } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { Badge } from "@/components/ui/badge";

type FigurineCardProps = {
  figurine: {
    id: number;
    name: string;
    manufacturer: string;
    series: string;
    price: string;
    images: string[];
    releaseDate?: string;
    rating?: number;
    isNew?: boolean;
    isPopular?: boolean;
  };
}

export const FigurineCard = ({ figurine }: FigurineCardProps) => {
  // Format date if available
  const formattedDate = figurine.releaseDate 
    ? new Date(figurine.releaseDate).toLocaleDateString("fr-FR", { year: "numeric", month: "short" })
    : null;
    
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden card-interactive h-full flex flex-col group/card border border-gray-100">
      <Link to={`/figurines/${figurine.id}`} className="block flex-grow">
        <div className="aspect-square relative overflow-hidden group">
          {/* Image avec effet de zoom */}
          <img
            src={figurine.images[0]}
            alt={figurine.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          
          {/* Overlay gradient au hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="absolute top-2 right-2 transform transition-transform duration-300 group-hover:scale-110">
            <FavoriteButton figurineId={figurine.id} />
          </div>
          
          {/* Badges pour nouveau ou populaire */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {figurine.isNew && (
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg animate-slide-in-left border-0">
                ✨ Nouveau
              </Badge>
            )}
            {figurine.isPopular && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg animate-slide-in-left border-0" style={{animationDelay: "100ms"}}>
                🔥 Populaire
              </Badge>
            )}
          </div>
          
          {/* Rating si disponible */}
          {figurine.rating && (
            <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-lg">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="font-semibold">{figurine.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-2 group-hover/card:translate-x-1 transition-transform duration-300">
            <Tag size={16} className="text-primary" />
            <span className="text-xs text-gray-600 font-medium">{figurine.series}</span>
          </div>
          
          <h3 className="font-semibold mb-2 line-clamp-2 text-gray-900 group-hover/card:text-primary transition-colors duration-300 leading-snug">
            {figurine.name}
          </h3>
          <p className="text-sm text-gray-600 mb-auto font-medium">{figurine.manufacturer}</p>
          
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between">
            <p className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {figurine.price}¥
            </p>
            
            {formattedDate && (
              <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                <Calendar size={12} className="mr-1" />
                <span className="font-medium">{formattedDate}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
