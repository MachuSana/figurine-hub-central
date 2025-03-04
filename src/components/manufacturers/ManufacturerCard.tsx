
import { Star, Package, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type ManufacturerCardProps = {
  manufacturer: {
    id: number;
    name: string;
    description: string;
    image: string;
    founded: string;
    location: string;
    rating: number;
    productsCount: number;
    specialties: string[];
    website: string;
  };
};

export const ManufacturerCard = ({ manufacturer }: ManufacturerCardProps) => {
  const navigate = useNavigate();
  
  return (
    <div
      className="bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-all duration-300 overflow-hidden animate-fade-in"
    >
      <div className="md:flex">
        <div className="md:w-1/4">
          <div className="h-40 md:h-full relative">
            <img
              src={manufacturer.image}
              alt={manufacturer.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-current" />
              {manufacturer.rating}
            </div>
          </div>
        </div>
        
        <div className="p-4 md:w-3/4">
          <h2 className="text-xl font-bold mb-1">{manufacturer.name}</h2>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{manufacturer.description}</p>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div>
              <div className="text-xs text-gray-500">Fondé en</div>
              <div className="font-medium text-sm">{manufacturer.founded}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Localisation</div>
              <div className="flex items-center gap-1">
                <MapPin size={12} className="text-gray-400" />
                <span className="font-medium text-sm">{manufacturer.location}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Produits</div>
              <div className="font-medium text-sm">{manufacturer.productsCount}+</div>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <div className="text-xs text-gray-500">Spécialités</div>
            <div className="flex flex-wrap gap-1">
              {manufacturer.specialties.map((specialty, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-muted text-xs px-2 py-0 hover:bg-muted/80 transition-colors"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-3 text-right">
            <Button
              onClick={() => navigate(`/manufacturers/${manufacturer.id}`)}
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 hover:bg-primary/5 text-xs px-2 py-1"
            >
              En savoir plus
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
