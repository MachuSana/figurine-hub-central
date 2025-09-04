
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Filter, 
  SortAsc, 
  SortDesc, 
  Tag, 
  Banknote, 
  Calendar,
  Search
} from "lucide-react";
import { Checkbox } from "./ui/checkbox";

type FigurineFiltersProps = {
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: SortOption) => void;
  manufacturers: string[];
  series: string[];
  minPrice: number;
  maxPrice: number;
}

export type FilterState = {
  manufacturers: string[];
  series: string[];
  priceRange: [number, number];
  inStock: boolean;
  preorders: boolean;
}

export type SortOption = {
  field: 'price' | 'releaseDate' | 'name';
  direction: 'asc' | 'desc';
}

export const FigurineFilters = ({ 
  onFilterChange, 
  onSortChange,
  manufacturers,
  series,
  minPrice,
  maxPrice 
}: FigurineFiltersProps) => {
  const [manufacturerSearch, setManufacturerSearch] = useState("");
  const [seriesSearch, setSeriesSearch] = useState("");
  
  const filteredManufacturers = manufacturers.filter(manufacturer =>
    manufacturer.toLowerCase().includes(manufacturerSearch.toLowerCase())
  );
  
  const filteredSeries = series.filter(serie =>
    serie.toLowerCase().includes(seriesSearch.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b">
        <Filter size={20} />
        <h2 className="text-xl font-semibold">Filtres & Tri</h2>
      </div>

      {/* Tri */}
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
          <SortAsc size={16} />
          Trier par
        </h3>
        <Select onValueChange={(value) => {
          const [field, direction] = value.split('-');
          onSortChange({ 
            field: field as SortOption['field'], 
            direction: direction as SortOption['direction'] 
          });
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir un tri..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Prix croissant</SelectItem>
            <SelectItem value="price-desc">Prix décroissant</SelectItem>
            <SelectItem value="releaseDate-asc">Date de sortie (ancien)</SelectItem>
            <SelectItem value="releaseDate-desc">Date de sortie (récent)</SelectItem>
            <SelectItem value="name-asc">Nom (A-Z)</SelectItem>
            <SelectItem value="name-desc">Nom (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {/* Fabricants */}
        <AccordionItem value="manufacturers">
          <AccordionTrigger className="text-sm font-medium">
            <span className="flex items-center gap-2">
              <Tag size={16} />
              Fabricants
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Rechercher un fabricant..."
                  value={manufacturerSearch}
                  onChange={(e) => setManufacturerSearch(e.target.value)}
                  className="pl-8 h-8"
                />
              </div>
              <ScrollArea className="h-32">
                <div className="space-y-2 pr-2">
                  {filteredManufacturers.length > 0 ? (
                    filteredManufacturers.map((manufacturer) => (
                      <div key={manufacturer} className="flex items-center space-x-2">
                        <Checkbox 
                          id={manufacturer}
                          onCheckedChange={(checked) => {
                            // Implémenter la logique de filtre
                          }}
                        />
                        <label 
                          htmlFor={manufacturer}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {manufacturer}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 text-center py-2">
                      Aucun fabricant trouvé
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Séries */}
        <AccordionItem value="series">
          <AccordionTrigger className="text-sm font-medium">
            <span className="flex items-center gap-2">
              <Tag size={16} />
              Séries
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Rechercher une série..."
                  value={seriesSearch}
                  onChange={(e) => setSeriesSearch(e.target.value)}
                  className="pl-8 h-8"
                />
              </div>
              <ScrollArea className="h-32">
                <div className="space-y-2 pr-2">
                  {filteredSeries.length > 0 ? (
                    filteredSeries.map((serie) => (
                      <div key={serie} className="flex items-center space-x-2">
                        <Checkbox 
                          id={serie}
                          onCheckedChange={(checked) => {
                            // Implémenter la logique de filtre
                          }}
                        />
                        <label 
                          htmlFor={serie}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {serie}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 text-center py-2">
                      Aucune série trouvée
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Prix */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            <span className="flex items-center gap-2">
              <Banknote size={16} />
              Fourchette de prix
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-2">
              <Slider 
                min={minPrice}
                max={maxPrice}
                step={1000}
                defaultValue={[minPrice, maxPrice]}
                onValueChange={(value) => {
                  // Implémenter la logique de filtre
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-600">{minPrice}¥</span>
                <span className="text-sm text-gray-600">{maxPrice}¥</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Disponibilité */}
        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm font-medium">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              Disponibilité
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="inStock"
                  onCheckedChange={(checked) => {
                    // Implémenter la logique de filtre
                  }}
                />
                <label 
                  htmlFor="inStock"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  En stock
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="preorder"
                  onCheckedChange={(checked) => {
                    // Implémenter la logique de filtre
                  }}
                />
                <label 
                  htmlFor="preorder"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Précommande
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
