
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
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] h-full flex flex-col">
      <Link to={`/figurines/${figurine.id}`} className="block flex-grow">
        <div className="aspect-square relative overflow-hidden group">
          <img
            src={figurine.images[0]}
            alt={figurine.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2">
            <FavoriteButton figurineId={figurine.id} />
          </div>
          
          {/* Badges pour nouveau ou populaire */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {figurine.isNew && (
              <Badge className="bg-blue-500">Nouveau</Badge>
            )}
            {figurine.isPopular && (
              <Badge className="bg-amber-500">Populaire</Badge>
            )}
          </div>
          
          {/* Rating si disponible */}
          {figurine.rating && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-current" />
              {figurine.rating.toFixed(1)}
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <Tag size={16} className="text-primary" />
            <span className="text-xs text-gray-600">{figurine.series}</span>
          </div>
          
          <h3 className="font-semibold mb-1 line-clamp-2 text-gray-800 hover:text-primary transition-colors">{figurine.name}</h3>
          <p className="text-sm text-gray-600 mb-auto">{figurine.manufacturer}</p>
          
          <div className="mt-3 flex items-end justify-between">
            <p className="text-lg font-bold text-primary">{figurine.price}¥</p>
            
            {formattedDate && (
              <div className="flex items-center text-xs text-gray-500">
                <Calendar size={12} className="mr-1" />
                {formattedDate}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
