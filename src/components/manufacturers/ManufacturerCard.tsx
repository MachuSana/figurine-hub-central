
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
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer animate-fade-in"
    >
      <div className="md:flex">
        <div className="md:w-1/3">
          <div className="h-full relative aspect-square md:aspect-auto">
            <img
              src={manufacturer.image}
              alt={manufacturer.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              {manufacturer.rating}
            </div>
          </div>
        </div>
        
        <div className="p-6 md:w-2/3">
          <h2 className="text-2xl font-bold mb-2">{manufacturer.name}</h2>
          <p className="text-gray-600 mb-4">{manufacturer.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Fondé en</div>
              <div className="font-medium">{manufacturer.founded}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Localisation</div>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-gray-400" />
                <span className="font-medium">{manufacturer.location}</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Produits</div>
              <div className="font-medium">{manufacturer.productsCount}+</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-gray-500">Spécialités</div>
            <div className="flex flex-wrap gap-2">
              {manufacturer.specialties.map((specialty, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-primary/10 text-primary px-3 py-1 hover:bg-primary/20 transition-colors"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={() => navigate(`/manufacturers/${manufacturer.id}`)}
              className="flex items-center gap-2"
            >
              En savoir plus
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
