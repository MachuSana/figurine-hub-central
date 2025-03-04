
import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

type ManufacturerFiltersProps = {
  specialties: string[];
  onFilterChange: (filters: {
    search: string;
    specialty: string | null;
  }) => void;
};

export const ManufacturerFilters = ({ specialties, onFilterChange }: ManufacturerFiltersProps) => {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    onFilterChange({ search: newSearch, specialty });
  };

  const handleSpecialtyChange = (newSpecialty: string | null) => {
    setSpecialty(newSpecialty);
    onFilterChange({ search, specialty: newSpecialty });
  };

  const clearFilters = () => {
    setSearch("");
    setSpecialty(null);
    onFilterChange({ search: "", specialty: null });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Rechercher un fabricant..."
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4"
            />
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="md:w-auto"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtres
          {specialty && (
            <Badge className="ml-2 bg-primary text-white">1</Badge>
          )}
        </Button>
      </div>
      
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Filtres</h3>
            {specialty && (
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
          
          <div>
            <h4 className="text-sm text-gray-500 mb-2">Spécialités</h4>
            <div className="flex flex-wrap gap-2">
              {specialties.map((item) => (
                <Badge
                  key={item}
                  variant={specialty === item ? "default" : "outline"}
                  className={`cursor-pointer ${
                    specialty === item 
                      ? "bg-primary" 
                      : "hover:bg-primary/10 hover:text-primary"
                  }`}
                  onClick={() => handleSpecialtyChange(specialty === item ? null : item)}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {specialty && (
        <div className="mt-4 pt-3 border-t border-gray-200 animate-fade-in">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Filtres actifs:</span>
            
            <Badge 
              variant="secondary"
              className="flex items-center gap-1 bg-gray-100"
            >
              {specialty}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => handleSpecialtyChange(null)} 
              />
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};
