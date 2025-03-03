
import MainNav from "../components/MainNav";
import { Tag, Star, ArrowRight, Search, Filter, SlidersHorizontal, Copyright, BookOpen, Trophy, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";

const Licenses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<"name" | "rating" | "figureCount">("rating");
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  const licenses = [
    {
      id: 1,
      name: "Re:Zero",
      company: "White Fox",
      type: "Anime/Light Novel",
      description: "Une histoire de fantasy où Subaru Natsuki se retrouve transporté dans un autre monde",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      seriesCount: 1,
      figureCount: 150,
      rating: 4.9,
      seasons: ["Saison 1", "Saison 2 Partie 1", "Saison 2 Partie 2"],
      popularCharacters: ["Rem", "Emilia", "Ram"],
      bestSellers: ["Rem - Maid Ver. 1/7", "Emilia - Crystal Dress 1/7", "Ram & Rem - Birthday 1/7"]
    },
    {
      id: 2,
      name: "Azur Lane",
      company: "Yostar",
      type: "Jeu Vidéo/Anime",
      description: "Un jeu de tir naval mettant en scène des navires anthropomorphisés en jeunes filles",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      seriesCount: 2,
      figureCount: 200,
      rating: 4.8,
      seasons: ["Anime Saison 1", "Slow Ahead!"],
      popularCharacters: ["Enterprise", "Belfast", "Akagi"],
      bestSellers: ["Enterprise - Party Dress", "Belfast - Wedding Ver.", "Akagi - Race Queen"]
    },
    {
      id: 3,
      name: "DanMachi",
      company: "J.C.Staff",
      type: "Anime/Light Novel",
      description: "Les aventures de Bell Cranel dans un monde fantasy inspiré des RPG",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      seriesCount: 1,
      figureCount: 75,
      rating: 4.7,
      seasons: ["Saison 1", "Saison 2", "Saison 3", "Saison 4"],
      popularCharacters: ["Bell Cranel", "Hestia", "Ais Wallenstein"],
      bestSellers: ["Hestia - 1/4 Ver.", "Bell Cranel - DanMachi III", "Ais - Wind Ver."]
    },
    {
      id: 4,
      name: "Genshin Impact",
      company: "miHoYo",
      type: "Jeu Vidéo",
      description: "Un RPG en monde ouvert au style anime",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      seriesCount: 1,
      figureCount: 100,
      rating: 4.9,
      seasons: ["Mondstadt", "Liyue", "Inazuma", "Sumeru"],
      popularCharacters: ["Paimon", "Keqing", "Ganyu"],
      bestSellers: ["Ganyu - Plenilune Gaze", "Keqing - Piercing Thunderbolt", "Mona - Astral Reflection"]
    },
    {
      id: 5,
      name: "Fate/Grand Order",
      company: "Type-Moon",
      type: "Jeu Vidéo/Anime",
      description: "Un jeu mobile RPG basé sur la franchise Fate",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      seriesCount: 3,
      figureCount: 250,
      rating: 4.9,
      seasons: ["First Order", "Babylonia", "Camelot", "Solomon"],
      popularCharacters: ["Saber Artoria", "Jeanne d'Arc", "Mash Kyrielight"],
      bestSellers: ["Saber Alter - Dress Ver.", "Jeanne d'Arc - Racing Ver.", "Scathach - Formal Dress"]
    },
    {
      id: 6,
      name: "Demon Slayer",
      company: "ufotable",
      type: "Anime/Manga",
      description: "L'histoire de Tanjiro, un jeune garçon devenu chasseur de démons après le massacre de sa famille",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      seriesCount: 2,
      figureCount: 120,
      rating: 4.8,
      seasons: ["Saison 1", "Film Mugen Train", "Saison 2", "Saison 3"],
      popularCharacters: ["Tanjiro", "Nezuko", "Zenitsu", "Inosuke"],
      bestSellers: ["Nezuko - Running Ver.", "Tanjiro - Hinokami Kagura", "Rengoku - Flame Hashira"]
    }
  ];

  // On initial render, set isInitialRender to false after a short delay to allow animations
  useEffect(() => {
    if (isInitialRender) {
      const timer = setTimeout(() => setIsInitialRender(false), 100);
      return () => clearTimeout(timer);
    }
  }, [isInitialRender]);

  // Filter licenses based on search query and selected type
  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = license.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         license.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === null || license.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Sort licenses based on selected sort option
  const sortedAndFilteredLicenses = [...filteredLicenses].sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      case "figureCount":
        return b.figureCount - a.figureCount;
      default:
        return 0;
    }
  });

  // Get unique license types for filter
  const licenseTypes = Array.from(new Set(licenses.map(license => license.type)));

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-2">
              <Copyright className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Licences</h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Rechercher une licence..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <SlidersHorizontal size={16} />
                    <span>Trier et Filtrer</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Trier par</h4>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={sortOption === "rating" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortOption("rating")}
                          className="text-xs h-8"
                        >
                          Note
                        </Button>
                        <Button
                          variant={sortOption === "name" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortOption("name")}
                          className="text-xs h-8"
                        >
                          Nom (A-Z)
                        </Button>
                        <Button
                          variant={sortOption === "figureCount" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortOption("figureCount")}
                          className="text-xs h-8"
                        >
                          Nombre de Figurines
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Filtrer par type</h4>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={selectedType === null ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedType(null)}
                          className="text-xs h-8"
                        >
                          Tous
                        </Button>
                        
                        {licenseTypes.map((type) => (
                          <Button
                            key={type}
                            variant={selectedType === type ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedType(type)}
                            className="text-xs h-8"
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <BookOpen size={16} className="text-primary/70" />
                <span>{licenses.length} licences au total</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy size={16} className="text-yellow-500" />
                <span>Top licences: Fate/Grand Order, Genshin Impact, Re:Zero</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5">
                <Users size={16} className="text-blue-500" />
                <span>Plus de 1000 figurines disponibles</span>
              </div>
            </div>
          </div>
        </div>

        {filteredLicenses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center animate-fadeIn">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Aucune licence trouvée</h2>
            <p className="text-gray-600 mb-4">Essayez d'ajuster vos critères de recherche ou de réinitialiser les filtres.</p>
            <Button onClick={() => {setSearchQuery(""); setSelectedType(null);}}>
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {sortedAndFilteredLicenses.map((license, index) => (
              <div
                key={license.id}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                  isInitialRender ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 75}ms`,
                  transitionProperty: 'all'
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-48">
                    <img
                      src={license.image}
                      alt={license.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span>{license.rating}</span>
                    </div>
                    <div className="absolute top-2 left-2 bg-primary/90 text-white backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                      {license.type}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
                      <h2 className="text-xl font-bold truncate">{license.name}</h2>
                      <div className="text-sm opacity-90">{license.company}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-grow">
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm h-10">{license.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Figurines</div>
                        <div className="font-semibold text-lg">{license.figureCount}+</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Séries</div>
                        <div className="font-semibold text-lg">{license.seriesCount}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1.5">Personnages populaires</div>
                        <div className="flex flex-wrap gap-1.5">
                          {license.popularCharacters.map((character, index) => (
                            <span key={index} className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                              {character}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 mb-1.5">Meilleures ventes</div>
                        <div className="flex flex-wrap gap-1.5">
                          {license.bestSellers.slice(0, 2).map((figure, index) => (
                            <span key={index} className="bg-muted text-gray-700 px-2 py-0.5 rounded-full text-xs truncate max-w-full">
                              {figure}
                            </span>
                          ))}
                          {license.bestSellers.length > 2 && (
                            <span className="bg-muted text-gray-700 px-2 py-0.5 rounded-full text-xs">
                              +{license.bestSellers.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 mt-auto">
                    <Link 
                      to={`/licenses/${license.id}`}
                      className="flex items-center justify-center gap-2 text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors duration-200 w-full text-center"
                    >
                      Voir les détails
                      <ArrowRight size={16} />
                    </Link>
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

export default Licenses;
