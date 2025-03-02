
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, X } from "lucide-react";

type ShopFiltersProps = {
  onFilterChange: (filters: {
    search: string;
    type: string;
    location: string;
    features: string[];
  }) => void;
};

const ShopFilters = ({ onFilterChange }: ShopFiltersProps) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [location, setLocation] = useState("all");
  const [features, setFeatures] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const shopTypes = ["En ligne", "Physique", "Hybride"];
  const locations = ["France", "Europe", "International"];
  const availableFeatures = [
    "Paiement sécurisé", 
    "Livraison express", 
    "Service client 24/7",
    "Click & Collect", 
    "Précommandes", 
    "Programme fidélité",
    "Garantie authenticité", 
    "Emballage premium", 
    "Éditions exclusives"
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    applyFilters(e.target.value, type, location, features);
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    applyFilters(search, newType, location, features);
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    applyFilters(search, type, newLocation, features);
  };

  const toggleFeature = (feature: string) => {
    const updatedFeatures = features.includes(feature)
      ? features.filter(f => f !== feature)
      : [...features, feature];
    
    setFeatures(updatedFeatures);
    applyFilters(search, type, location, updatedFeatures);
  };

  const clearFilters = () => {
    setSearch("");
    setType("all");
    setLocation("all");
    setFeatures([]);
    applyFilters("", "all", "all", []);
  };

  const applyFilters = (
    searchValue: string,
    typeValue: string,
    locationValue: string,
    featuresValue: string[]
  ) => {
    onFilterChange({
      search: searchValue,
      type: typeValue,
      location: locationValue,
      features: featuresValue,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mb-6">
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher une boutique..."
              className="pl-10 pr-4"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          
          <Button 
            variant="outline" 
            className="md:w-auto"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtres
            {(type !== "all" || location !== "all" || features.length > 0) && (
              <Badge className="ml-2 bg-primary text-white">
                {(type !== "all" ? 1 : 0) + (location !== "all" ? 1 : 0) + features.length}
              </Badge>
            )}
          </Button>
        </div>
        
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Filtres</h3>
              {(type !== "all" || location !== "all" || features.length > 0) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-auto py-1 px-2 text-sm"
                >
                  <X className="mr-1 h-3 w-3" />
                  Réinitialiser
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm text-gray-500 mb-2">Type de boutique</h4>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={type === "all" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleTypeChange("all")}
                  >
                    Tous
                  </Button>
                  {shopTypes.map((shopType, index) => (
                    <Button
                      key={index}
                      variant={type === shopType ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTypeChange(shopType)}
                    >
                      {shopType}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-500 mb-2">Localisation</h4>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={location === "all" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleLocationChange("all")}
                  >
                    Toutes
                  </Button>
                  {locations.map((loc, index) => (
                    <Button
                      key={index}
                      variant={location === loc ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleLocationChange(loc)}
                    >
                      {loc}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-500 mb-2">Services</h4>
                <div className="flex flex-wrap gap-2">
                  {availableFeatures.map((feature, index) => (
                    <Badge
                      key={index}
                      variant={features.includes(feature) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        features.includes(feature) 
                          ? "bg-primary" 
                          : "hover:bg-primary/10 hover:text-primary"
                      }`}
                      onClick={() => toggleFeature(feature)}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {(type !== "all" || location !== "all" || features.length > 0) && (
        <div className="px-4 py-3 bg-muted border-t border-gray-200 rounded-b-xl">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Filtres actifs:</span>
            
            {type !== "all" && (
              <Badge 
                variant="secondary"
                className="flex items-center gap-1 bg-gray-100"
              >
                {type}
                <X 
                  className="ml-1 h-3 w-3 cursor-pointer" 
                  onClick={() => handleTypeChange("all")} 
                />
              </Badge>
            )}
            
            {location !== "all" && (
              <Badge 
                variant="secondary"
                className="flex items-center gap-1 bg-gray-100"
              >
                <MapPin className="h-3 w-3" />
                {location}
                <X 
                  className="ml-1 h-3 w-3 cursor-pointer" 
                  onClick={() => handleLocationChange("all")} 
                />
              </Badge>
            )}
            
            {features.map((feature, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="flex items-center gap-1 bg-gray-100"
              >
                {feature}
                <X 
                  className="ml-1 h-3 w-3 cursor-pointer" 
                  onClick={() => toggleFeature(feature)} 
                />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopFilters;
