import MainNav from "../components/MainNav";
import { useState, useEffect } from "react";
import { Star, Tag, Box, Calendar, Ruler, Grid, List as ListIcon, SlidersHorizontal, X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FigurineCard } from "@/components/FigurineCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type SortOption = "date" | "scale" | "name" | "series";

const Figurines = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [selectedScales, setSelectedScales] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const figures = [
    {
      id: 1,
      name: "Monkey D. Luffy - Gear 5",
      series: "One Piece",
      images: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e"],
      manufacturer: "Bandai",
      releaseDate: "2024-06",
      price: "25,800",
      description: "Figurine représentant Luffy dans sa forme Gear 5, capturant toute la puissance et l'aspect comique de cette transformation.",
      height: "32cm",
      material: "PVC & ABS",
      scale: "1/7",
      weight: "800g",
      sculpteur: "Takashi Yamamoto",
      reference: "BAS55789",
      edition: "Standard",
      packaging: "Window box with blister",
      articleDate: "2023-12-15",
      rating: 4.8,
      isNew: true,
      isPopular: true
    },
    {
      id: 2,
      name: "Eren Yeager - Version Titan",
      series: "L'Attaque des Titans",
      images: ["https://images.unsplash.com/photo-1501286353178-1ec881214838"],
      manufacturer: "Good Smile Company",
      releaseDate: "2023-12",
      price: "42,500",
      description: "Une représentation détaillée d'Eren dans sa forme de Titan, montrant toute la rage et la détermination du personnage.",
      height: "45cm",
      material: "PVC & ABS",
      scale: "1/4",
      weight: "2kg",
      sculpteur: "Shinji Kosaka",
      reference: "GSC94422",
      edition: "Deluxe",
      packaging: "Collector box with acrylic stand",
      articleDate: "2023-08-20",
      rating: 4.9,
      isPopular: true
    },
    {
      id: 3,
      name: "Saitama - Edition Limitée",
      series: "One Punch Man",
      images: ["https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"],
      manufacturer: "Kotobukiya",
      releaseDate: "2024-01",
      price: "18,950",
      description: "Edition limitée de Saitama dans sa pose iconique, avec effets spéciaux et base personnalisée.",
      height: "25cm",
      material: "PVC & ABS",
      scale: "1/7",
      weight: "600g",
      sculpteur: "Keita Misonou",
      reference: "KOT77123",
      edition: "Limited",
      packaging: "Collector box with numbering",
      articleDate: "2023-11-05",
      rating: 4.5
    },
    {
      id: 4,
      name: "Gojo Satoru",
      series: "Jujutsu Kaisen",
      images: ["https://images.unsplash.com/photo-1605810230434-7631ac76ec81"],
      manufacturer: "Bandai",
      releaseDate: "2024-07",
      price: "22,800",
      description: "Gojo Satoru dans une pose dynamique, avec ses yeux révélés et des effets de son pouvoir Domain Expansion.",
      height: "24cm",
      material: "PVC & ABS",
      scale: "1/7",
      weight: "550g",
      sculpteur: "Yuki Ishiyama",
      reference: "BAS66321",
      edition: "Standard",
      packaging: "Window box",
      articleDate: "2024-01-10",
      rating: 4.7,
      isNew: true
    }
  ];

  const sortedFigures = [...figures].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.articleDate).getTime() - new Date(a.articleDate).getTime();
      case "scale":
        return a.scale.localeCompare(b.scale);
      case "name":
        return a.name.localeCompare(b.name);
      case "series":
        return a.series.localeCompare(b.series);
      default:
        return 0;
    }
  });

  const filteredFigures = sortedFigures.filter(figure => {
    const scale = selectedScales.length === 0 || 
      selectedScales.includes(figure.scale);

    const manufacturer = selectedManufacturers.length === 0 || 
      selectedManufacturers.includes(figure.manufacturer);

    const series = selectedSeries.length === 0 ||
      selectedSeries.includes(figure.series);
      
    const search = searchQuery.trim() === "" || 
      figure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      figure.series.toLowerCase().includes(searchQuery.toLowerCase());

    return scale && manufacturer && series && search;
  });

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  const clearAllFilters = () => {
    setSelectedScales([]);
    setSelectedManufacturers([]);
    setSelectedSeries([]);
    setSearchQuery("");
  };

  const getActiveFiltersCount = () => {
    return selectedScales.length + selectedManufacturers.length + selectedSeries.length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8 relative">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-1 animate-fade-in">
            <h1 className="text-3xl font-bold">Base de données Figurines</h1>
            <p className="text-gray-500">Documentation et archivage des figurines</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="lg:flex hidden">
              <Button
                variant="outline"
                size="sm"
                className={`rounded-l-md rounded-r-none ${viewMode === 'grid' ? 'bg-muted' : 'bg-white'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`rounded-r-md rounded-l-none ${viewMode === 'list' ? 'bg-muted' : 'bg-white'}`}
                onClick={() => setViewMode('list')}
              >
                <ListIcon size={18} />
              </Button>
            </div>
            
            <select 
              className="px-3 py-1 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="date">Date d'ajout</option>
              <option value="scale">Échelle</option>
              <option value="name">Nom</option>
              <option value="series">Série</option>
            </select>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="lg:hidden flex items-center gap-1"
              onClick={toggleMobileFilters}
            >
              <SlidersHorizontal size={16} />
              Filtres
              {getActiveFiltersCount() > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        <div className="mb-6 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Rechercher par nom ou série..."
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filtres</h3>
                <Button variant="ghost" size="sm" onClick={toggleMobileFilters}>
                  <X size={24} />
                </Button>
              </div>
              
              {getActiveFiltersCount() > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mb-4 text-xs text-gray-600"
                  onClick={clearAllFilters}
                >
                  Effacer les filtres ({getActiveFiltersCount()})
                </Button>
              )}
              
              <div className="space-y-5">
                <div>
                  <h3 className="font-medium mb-2 text-sm">Échelle</h3>
                  <div className="space-y-2">
                    {["1/4", "1/7"].map((scale) => (
                      <label key={scale} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="rounded text-primary"
                          checked={selectedScales.includes(scale)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedScales([...selectedScales, scale]);
                            } else {
                              setSelectedScales(selectedScales.filter(s => s !== scale));
                            }
                          }}
                        />
                        <span className="ml-2 text-sm">{scale}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2 text-sm">Fabricants</h3>
                  <div className="space-y-2">
                    {["Good Smile Company", "Kotobukiya", "Bandai"].map((manufacturer) => (
                      <label key={manufacturer} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="rounded text-primary"
                          checked={selectedManufacturers.includes(manufacturer)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedManufacturers([...selectedManufacturers, manufacturer]);
                            } else {
                              setSelectedManufacturers(selectedManufacturers.filter(m => m !== manufacturer));
                            }
                          }}
                        />
                        <span className="ml-2 text-sm">{manufacturer}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2 text-sm">Séries</h3>
                  <div className="space-y-2">
                    {["One Piece", "L'Attaque des Titans", "One Punch Man", "Jujutsu Kaisen"].map((series) => (
                      <label key={series} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="rounded text-primary"
                          checked={selectedSeries.includes(series)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSeries([...selectedSeries, series]);
                            } else {
                              setSelectedSeries(selectedSeries.filter(s => s !== series));
                            }
                          }}
                        />
                        <span className="ml-2 text-sm">{series}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full" onClick={toggleMobileFilters}>
                  Appliquer les filtres
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="hidden lg:block lg:col-span-3">
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filtres</h2>
                  {getActiveFiltersCount() > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-gray-600"
                      onClick={clearAllFilters}
                    >
                      Effacer ({getActiveFiltersCount()})
                    </Button>
                  )}
                </div>
                
                <div className="space-y-5">
                  <div>
                    <h3 className="font-medium mb-2 text-sm">Échelle</h3>
                    <div className="space-y-2">
                      {["1/4", "1/7"].map((scale) => (
                        <label key={scale} className="flex items-center">
                          <input 
                            type="checkbox"
                            className="rounded text-primary"
                            checked={selectedScales.includes(scale)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedScales([...selectedScales, scale]);
                              } else {
                                setSelectedScales(selectedScales.filter(s => s !== scale));
                              }
                            }}
                          />
                          <span className="ml-2 text-sm">{scale}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2 text-sm">Fabricants</h3>
                    <div className="space-y-2">
                      {["Good Smile Company", "Kotobukiya", "Bandai"].map((manufacturer) => (
                        <label key={manufacturer} className="flex items-center">
                          <input 
                            type="checkbox"
                            className="rounded text-primary"
                            checked={selectedManufacturers.includes(manufacturer)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedManufacturers([...selectedManufacturers, manufacturer]);
                              } else {
                                setSelectedManufacturers(selectedManufacturers.filter(m => m !== manufacturer));
                              }
                            }}
                          />
                          <span className="ml-2 text-sm">{manufacturer}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2 text-sm">Séries</h3>
                    <div className="space-y-2">
                      {["One Piece", "L'Attaque des Titans", "One Punch Man", "Jujutsu Kaisen"].map((series) => (
                        <label key={series} className="flex items-center">
                          <input 
                            type="checkbox"
                            className="rounded text-primary"
                            checked={selectedSeries.includes(series)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSeries([...selectedSeries, series]);
                              } else {
                                setSelectedSeries(selectedSeries.filter(s => s !== series));
                              }
                            }}
                          />
                          <span className="ml-2 text-sm">{series}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-9">
            <div className="mb-4 flex flex-wrap gap-2 animate-fade-in">
              {getActiveFiltersCount() > 0 && (
                <>
                  {selectedScales.map(scale => (
                    <Badge key={scale} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                      <Ruler size={12} />
                      {scale}
                      <button 
                        className="ml-1 hover:text-primary" 
                        onClick={() => setSelectedScales(selectedScales.filter(s => s !== scale))}
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                  
                  {selectedManufacturers.map(manufacturer => (
                    <Badge key={manufacturer} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                      <Box size={12} />
                      {manufacturer}
                      <button 
                        className="ml-1 hover:text-primary" 
                        onClick={() => setSelectedManufacturers(selectedManufacturers.filter(m => m !== manufacturer))}
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                  
                  {selectedSeries.map(series => (
                    <Badge key={series} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                      <Tag size={12} />
                      {series}
                      <button 
                        className="ml-1 hover:text-primary" 
                        onClick={() => setSelectedSeries(selectedSeries.filter(s => s !== series))}
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                </>
              )}
              
              {searchQuery && (
                <Badge variant="secondary" className="px-2 py-1 flex items-center gap-1 bg-primary/10">
                  <Search size={12} />
                  "{searchQuery}"
                  <button 
                    className="ml-1 hover:text-primary" 
                    onClick={() => setSearchQuery("")}
                  >
                    <X size={14} />
                  </button>
                </Badge>
              )}
            </div>
            
            <div className="mb-4 text-sm text-gray-500">
              {filteredFigures.length} figurine{filteredFigures.length > 1 ? 's' : ''} trouvée{filteredFigures.length > 1 ? 's' : ''}
            </div>
            
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFigures.map((figure) => (
                  <div key={figure.id} className="animate-fade-up" style={{animationDelay: `${(figure.id % 10) * 0.05}s`}}>
                    <FigurineCard
                      figurine={{
                        id: figure.id,
                        name: figure.name,
                        manufacturer: figure.manufacturer,
                        series: figure.series,
                        price: figure.price,
                        images: figure.images,
                        releaseDate: figure.releaseDate,
                        rating: figure.rating,
                        isNew: figure.isNew,
                        isPopular: figure.isPopular,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredFigures.map((figure) => (
                  <Card 
                    key={figure.id} 
                    className="overflow-hidden hover:border-primary transition-colors animate-fade-up cursor-pointer"
                    style={{animationDelay: `${(figure.id % 10) * 0.05}s`}}
                    onClick={() => navigate(`/figurines/${figure.id}`)}
                  >
                    <div className="flex items-center p-4">
                      <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={figure.images[0]}
                          alt={figure.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <Tag size={16} className="text-primary" />
                          <span className="text-sm text-gray-600">{figure.series}</span>
                          {figure.isNew && <Badge className="bg-blue-500 text-xs">Nouveau</Badge>}
                          {figure.isPopular && <Badge className="bg-amber-500 text-xs">Populaire</Badge>}
                        </div>
                        <h3 className="font-bold text-lg">{figure.name}</h3>
                        <div className="mt-1 flex flex-wrap gap-y-2 gap-x-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Box size={14} className="text-gray-400" />
                            <span>{figure.manufacturer}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Ruler size={14} className="text-gray-400" />
                            <span>{figure.scale}</span>
                          </div>
                          {figure.rating && (
                            <div className="flex items-center gap-1 text-sm">
                              <Star size={14} className="text-yellow-500 fill-current" />
                              <span>{figure.rating.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="font-bold text-lg text-primary">{figure.price}¥</div>
                        <div className="text-sm text-gray-500 flex items-center justify-end mt-2">
                          <Calendar size={14} />
                          <span className="ml-1">
                            {new Date(figure.releaseDate).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "short"
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {filteredFigures.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm animate-fade-in">
                <Box className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune figurine trouvée</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Aucune figurine ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou votre recherche.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button onClick={clearAllFilters}>Réinitialiser les filtres</Button>
                  {searchQuery && (
                    <Button variant="outline" onClick={() => setSearchQuery("")}>Effacer la recherche</Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Figurines;
