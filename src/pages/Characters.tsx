
import { useState, useEffect } from "react";
import MainNav from "../components/MainNav";
import { UserRound, Star, ArrowRight, Search, X, Filter, ChevronsUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Characters = () => {
  const allCharacters = [
    {
      id: 1,
      name: "Monkey D. Luffy",
      series: "One Piece",
      description: "Le capitaine des pirates au chapeau de paille",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      figureCount: 150,
      popularity: 4.9,
      traits: ["Élastique", "Optimiste", "Déterminé"],
      affiliations: ["Pirates du Chapeau de Paille", "Famille Monkey"]
    },
    {
      id: 2,
      name: "Son Goku",
      series: "Dragon Ball",
      description: "Le plus puissant des Saiyans",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      figureCount: 200,
      popularity: 4.8,
      traits: ["Fort", "Naïf", "Héroïque"],
      affiliations: ["Guerriers Z", "Famille Son"]
    },
    {
      id: 3,
      name: "Naruto Uzumaki",
      series: "Naruto",
      description: "Le ninja le plus imprévisible",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      figureCount: 120,
      popularity: 4.7,
      traits: ["Persévérant", "Loyal", "Énergique"],
      affiliations: ["Village de Konoha", "Team 7"]
    },
    {
      id: 4,
      name: "Ichigo Kurosaki",
      series: "Bleach",
      description: "Le Shinigami remplaçant",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      figureCount: 80,
      popularity: 4.5,
      traits: ["Déterminé", "Protecteur", "Courageux"],
      affiliations: ["Shinigami", "Lycée Karakura"]
    },
    {
      id: 5,
      name: "Eren Yeager",
      series: "Attack on Titan",
      description: "Le protagoniste cherchant la liberté",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      figureCount: 90,
      popularity: 4.6,
      traits: ["Déterminé", "Vengeur", "Stratège"],
      affiliations: ["Bataillon d'exploration", "Titans"]
    },
    {
      id: 6,
      name: "Saitama",
      series: "One Punch Man",
      description: "Le héros le plus fort de tous",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      figureCount: 60,
      popularity: 4.8,
      traits: ["Fort", "Indifférent", "Simple"],
      affiliations: ["Association des Héros", "Classe S"]
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [characters, setCharacters] = useState(allCharacters);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    series: [] as string[],
    popularity: null as number | null,
    traits: [] as string[]
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const charactersPerPage = 3;

  // Unique series from all characters
  const seriesList = [...new Set(allCharacters.map(char => char.series))];
  
  // Get all unique traits from all characters
  const allTraits = [...new Set(allCharacters.flatMap(char => char.traits))];

  // Apply filters and search
  useEffect(() => {
    let filtered = [...allCharacters];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(character => 
        character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.series.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply series filter
    if (activeFilters.series.length > 0) {
      filtered = filtered.filter(character => 
        activeFilters.series.includes(character.series)
      );
    }
    
    // Apply popularity filter
    if (activeFilters.popularity) {
      filtered = filtered.filter(character => 
        character.popularity >= activeFilters.popularity
      );
    }
    
    // Apply trait filter
    if (activeFilters.traits.length > 0) {
      filtered = filtered.filter(character => 
        character.traits.some(trait => activeFilters.traits.includes(trait))
      );
    }
    
    setCharacters(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, activeFilters]);

  // Get current characters for pagination
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);
  const totalPages = Math.ceil(characters.length / charactersPerPage);

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      series: [],
      popularity: null,
      traits: []
    });
    setSearchQuery("");
  };

  // Toggle a series filter
  const toggleSeriesFilter = (series: string) => {
    setActiveFilters(prev => {
      if (prev.series.includes(series)) {
        return {
          ...prev,
          series: prev.series.filter(s => s !== series)
        };
      } else {
        return {
          ...prev,
          series: [...prev.series, series]
        };
      }
    });
  };

  // Toggle a trait filter
  const toggleTraitFilter = (trait: string) => {
    setActiveFilters(prev => {
      if (prev.traits.includes(trait)) {
        return {
          ...prev,
          traits: prev.traits.filter(t => t !== trait)
        };
      } else {
        return {
          ...prev,
          traits: [...prev.traits, trait]
        };
      }
    });
  };

  // Set popularity filter
  const setPopularityFilter = (rating: number | null) => {
    setActiveFilters(prev => ({
      ...prev,
      popularity: rating
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold">Personnages</h1>
          
          <div className="flex items-center mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Rechercher un personnage"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={16} />
                </Button>
              )}
            </div>
            
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="ml-2 gap-1">
                  <Filter size={18} />
                  <span className="hidden md:inline">Filtres</span>
                  {(activeFilters.series.length > 0 || activeFilters.popularity || activeFilters.traits.length > 0) && (
                    <Badge variant="secondary" className="ml-1 text-xs h-5 px-1.5">
                      {activeFilters.series.length + (activeFilters.popularity ? 1 : 0) + activeFilters.traits.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 md:w-80 p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Filtres</h3>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Réinitialiser
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Séries</h4>
                    <div className="space-y-2">
                      {seriesList.map(series => (
                        <div key={series} className="flex items-center">
                          <Checkbox
                            id={`series-${series}`}
                            checked={activeFilters.series.includes(series)}
                            onCheckedChange={() => toggleSeriesFilter(series)}
                          />
                          <label
                            htmlFor={`series-${series}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {series}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Popularité minimum</h4>
                    <div className="space-y-2">
                      {[4, 4.5, 4.8].map(rating => (
                        <div key={rating} className="flex items-center">
                          <Checkbox
                            id={`rating-${rating}`}
                            checked={activeFilters.popularity === rating}
                            onCheckedChange={(checked) => 
                              setPopularityFilter(checked ? rating : null)
                            }
                          />
                          <label
                            htmlFor={`rating-${rating}`}
                            className="ml-2 text-sm cursor-pointer flex items-center"
                          >
                            {rating}+ <Star size={14} className="ml-1 text-yellow-400 fill-current" />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Traits</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {allTraits.map(trait => (
                        <div key={trait} className="flex items-center">
                          <Checkbox
                            id={`trait-${trait}`}
                            checked={activeFilters.traits.includes(trait)}
                            onCheckedChange={() => toggleTraitFilter(trait)}
                          />
                          <label
                            htmlFor={`trait-${trait}`}
                            className="ml-2 text-sm cursor-pointer truncate"
                          >
                            {trait}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {activeFilters.series.length > 0 || activeFilters.popularity || activeFilters.traits.length > 0 ? (
          <div className="mb-4 flex flex-wrap gap-2 animate-fade-in">
            {activeFilters.series.map(series => (
              <Badge 
                key={`filter-${series}`} 
                variant="secondary"
                className="pl-2 flex items-center gap-1"
              >
                {series}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0 ml-1 hover:bg-muted"
                  onClick={() => toggleSeriesFilter(series)}
                >
                  <X size={12} />
                </Button>
              </Badge>
            ))}
            
            {activeFilters.popularity && (
              <Badge 
                variant="secondary"
                className="pl-2 flex items-center gap-1"
              >
                {activeFilters.popularity}+ <Star size={12} className="text-yellow-400 fill-current" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0 ml-1 hover:bg-muted"
                  onClick={() => setPopularityFilter(null)}
                >
                  <X size={12} />
                </Button>
              </Badge>
            )}
            
            {activeFilters.traits.map(trait => (
              <Badge 
                key={`filter-${trait}`} 
                variant="secondary"
                className="pl-2 flex items-center gap-1"
              >
                {trait}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0 ml-1 hover:bg-muted"
                  onClick={() => toggleTraitFilter(trait)}
                >
                  <X size={12} />
                </Button>
              </Badge>
            ))}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 px-2"
              onClick={clearFilters}
            >
              Effacer tous les filtres
            </Button>
          </div>
        ) : null}

        {characters.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <UserRound size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-medium mb-2">Aucun personnage trouvé</h2>
            <p className="text-gray-500 mb-4">
              Aucun personnage ne correspond à votre recherche ou aux filtres appliqués.
            </p>
            <Button onClick={clearFilters}>
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {currentCharacters.map((character, index) => (
              <div
                key={character.id}
                className={cn(
                  "bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden",
                  "transform transition-all duration-300 hover:-translate-y-1",
                  {
                    "animate-fade-in [animation-delay:100ms]": index === 0,
                    "animate-fade-in [animation-delay:200ms]": index === 1,
                    "animate-fade-in [animation-delay:300ms]": index === 2,
                  }
                )}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="h-64 md:h-full relative">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        {character.popularity}
                      </div>
                      <div className="absolute bottom-2 left-2 bg-primary/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-white">
                        {character.series}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center gap-4 mb-3">
                      <h2 className="text-2xl font-bold">{character.name}</h2>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{character.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-sm text-gray-500">Figurines disponibles</div>
                      <div className="font-medium">{character.figureCount}+</div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Traits de caractère</div>
                        <div className="flex flex-wrap gap-2">
                          {character.traits.map((trait, index) => (
                            <span
                              key={index}
                              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500 mb-2">Affiliations</div>
                        <div className="flex flex-wrap gap-2">
                          {character.affiliations.map((affiliation, index) => (
                            <span
                              key={index}
                              className="bg-muted text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {affiliation}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Link 
                        to={`/characters/${character.id}`}
                        className="flex items-center gap-2 text-primary hover:text-white hover:bg-primary px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        Voir les détails
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Précédent
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-9"
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Suivant
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Characters;
