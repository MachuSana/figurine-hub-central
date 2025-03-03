import { useState, useEffect } from "react";
import MainNav from "../components/MainNav";
import { Tag, Star, ArrowRight, Filter, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Series = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredProductLines, setFilteredProductLines] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const productLines = [
    {
      id: 1,
      name: "Nendoroid",
      company: "Good Smile Company",
      description: "Figurines super deformed avec des pièces interchangeables",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      figureCount: 1500,
      scale: "~10cm",
      rating: 4.9,
      price: "40€ - 70€",
      features: ["Pièces interchangeables", "Expressions faciales multiples", "Accessoires", "Super deformed"],
      popularFigures: ["Rem (Re:Zero)", "Miku (Vocaloid)", "Marnie (Pokémon)"],
      category: "Articulées"
    },
    {
      id: 2,
      name: "Figma",
      company: "Max Factory",
      description: "Figurines articulées hautement détaillées",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      figureCount: 1000,
      scale: "~15cm",
      rating: 4.8,
      price: "60€ - 90€",
      features: ["Articulations multiples", "Accessoires interchangeables", "Support inclus", "Hautement posable"],
      popularFigures: ["Link (Zelda)", "Saber (Fate)", "Joker (Persona 5)"],
      category: "Articulées"
    },
    {
      id: 3,
      name: "échelle 1/7",
      company: "Diverses",
      description: "Figurines statiques de taille moyenne avec un excellent rapport qualité-prix",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      figureCount: 2000,
      scale: "~23-25cm",
      rating: 4.7,
      price: "120€ - 200€",
      features: ["Haut niveau de détail", "Base décorative", "Pose fixe", "Bonne taille d'affichage"],
      popularFigures: ["Asuna (SAO)", "Megumin (KonoSuba)", "Enterprise (Azur Lane)"],
      category: "Statiques"
    },
    {
      id: 4,
      name: "échelle 1/4",
      company: "Diverses",
      description: "Grandes figurines statiques de collection premium",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      figureCount: 500,
      scale: "~40-45cm",
      rating: 4.9,
      price: "250€ - 500€",
      features: ["Très grande taille", "Détails exceptionnels", "Éditions limitées", "Qualité premium"],
      popularFigures: ["Rem & Ram (Re:Zero)", "Mythra (Xenoblade)", "Mai (Bunny Ver.)"],
      category: "Statiques"
    },
    {
      id: 5,
      name: "ARTFX J",
      company: "Kotobukiya",
      description: "Figurines statiques de haute qualité spécialisées dans les personnages d'anime",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      figureCount: 300,
      scale: "1/8",
      rating: 4.8,
      price: "130€ - 220€",
      features: ["Design original", "Qualité supérieure", "Base thématique", "Focus anime"],
      popularFigures: ["Roy Mustang (FMA)", "Levi (SNK)", "Nami (One Piece)"],
      category: "Statiques"
    }
  ];

  const filterCategories = [
    { 
      name: "Type", 
      options: ["Articulées", "Statiques"] 
    },
    { 
      name: "Taille", 
      options: ["Petite (<15cm)", "Moyenne (15-30cm)", "Grande (>30cm)"] 
    },
    { 
      name: "Prix", 
      options: ["Économique (<100€)", "Milieu de gamme (100-200€)", "Premium (>200€)"] 
    }
  ];

  useEffect(() => {
    filterProductLines();
  }, [searchTerm, activeFilters]);

  const filterProductLines = () => {
    let filtered = [...productLines];

    if (searchTerm) {
      filtered = filtered.filter(
        line => 
          line.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          line.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          line.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilters.length > 0) {
      filtered = filtered.filter(line => {
        return activeFilters.includes(line.category) ||
               (activeFilters.includes("Petite (<15cm)") && parseInt(line.scale) < 15) ||
               (activeFilters.includes("Moyenne (15-30cm)") && parseInt(line.scale) >= 15 && parseInt(line.scale) <= 30) ||
               (activeFilters.includes("Grande (>30cm)") && parseInt(line.scale) > 30) ||
               (activeFilters.includes("Économique (<100€)") && parseInt(line.price) < 100) ||
               (activeFilters.includes("Milieu de gamme (100-200€)") && parseInt(line.price) >= 100 && parseInt(line.price) <= 200) ||
               (activeFilters.includes("Premium (>200€)") && parseInt(line.price) > 200);
      });
    }

    setFilteredProductLines(filtered);
  };

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchTerm("");
    setShowSearch(false);
  };

  useEffect(() => {
    setFilteredProductLines(productLines);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8 transition-all duration-500">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold">Gammes de Figurines</h1>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            {showSearch ? (
              <div className="relative w-full md:w-64 animate-fade-in">
                <Input
                  type="text"
                  placeholder="Rechercher une gamme..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-8"
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setSearchTerm("");
                    setShowSearch(false);
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setShowSearch(true)}
              >
                <Search size={16} />
                <span className="ml-1">Rechercher</span>
              </Button>
            )}
            
            <div className="relative group">
              <Button 
                variant={activeFilters.length > 0 ? "default" : "outline"} 
                size="sm" 
                className="flex items-center gap-1"
              >
                <Filter size={16} />
                <span className="ml-1">Filtres</span>
                {activeFilters.length > 0 && (
                  <Badge className="ml-1 bg-white text-primary">{activeFilters.length}</Badge>
                )}
              </Button>
              
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10 hidden group-hover:block animate-fade-in">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Filtres</h3>
                  {activeFilters.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-sm h-7 px-2"
                      onClick={clearFilters}
                    >
                      Réinitialiser
                    </Button>
                  )}
                </div>
                
                {filterCategories.map((category, idx) => (
                  <div key={idx} className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">{category.name}</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.options.map((option, optIdx) => (
                        <Badge
                          key={optIdx}
                          variant={activeFilters.includes(option) ? "default" : "outline"}
                          className="cursor-pointer transition-all"
                          onClick={() => toggleFilter(option)}
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                    {idx < filterCategories.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 animate-fade-in">
            {activeFilters.map((filter, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="p-1.5 pl-3 flex items-center gap-1"
              >
                {filter}
                <button 
                  className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                  onClick={() => toggleFilter(filter)}
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm h-7 px-2"
              onClick={clearFilters}
            >
              Tout effacer
            </Button>
          </div>
        )}

        {filteredProductLines.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center animate-fade-in">
            <h2 className="text-xl font-semibold mb-2">Aucune gamme trouvée</h2>
            <p className="text-gray-600 mb-4">Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.</p>
            <Button onClick={clearFilters}>Réinitialiser les filtres</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredProductLines.map((line, index) => (
              <div
                key={line.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden transform hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="md:flex">
                  <div className="md:w-1/4 lg:w-1/5">
                    <div className="h-48 md:h-full relative overflow-hidden">
                      <img
                        src={line.image}
                        alt={line.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        {line.rating}
                      </div>
                      <Badge className="absolute top-2 left-2 bg-primary/90">{line.category}</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-5 md:w-3/4 lg:w-4/5">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-gray-800">{line.name}</h2>
                      <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">{line.company}</div>
                    </div>
                    
                    <p className="text-gray-600 mb-3 text-sm">{line.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500">Figurines</div>
                        <div className="font-medium text-primary-800">{line.figureCount}+</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500">Taille</div>
                        <div className="font-medium text-primary-800">{line.scale}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-xs text-gray-500">Prix</div>
                        <div className="font-medium text-primary-800">{line.price}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Caractéristiques</div>
                        <div className="flex flex-wrap gap-1">
                          {line.features.map((feature, index) => (
                            <span
                              key={index}
                              className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 mb-1">Figurines populaires</div>
                        <div className="flex flex-wrap gap-1">
                          {line.popularFigures.map((figure, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                            >
                              {figure}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Link 
                        to={`/series/${line.name.toLowerCase()}`} 
                        className="flex items-center gap-1 text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-200 group"
                      >
                        Voir les détails
                        <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Series;
