
import MainNav from "../components/MainNav";
import { Tag, Star, ArrowRight, Search, Filter } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const Licenses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
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

  // Filter licenses based on search query and selected type
  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = license.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         license.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === null || license.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Get unique license types for filter
  const licenseTypes = Array.from(new Set(licenses.map(license => license.type)));

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Licences</h1>
          
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
            
            <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
              <Button
                variant={selectedType === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(null)}
                className="whitespace-nowrap"
              >
                Tous
              </Button>
              
              {licenseTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className="whitespace-nowrap"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {filteredLicenses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Aucune licence trouvée</h2>
            <p className="text-gray-600">Essayez d'ajuster vos critères de recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 animate-fade-in">
            {filteredLicenses.map((license) => (
              <div
                key={license.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="h-64 md:h-full relative">
                      <img
                        src={license.image}
                        alt={license.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        {license.rating}
                      </div>
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
                        {license.type}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center gap-4 mb-3">
                      <h2 className="text-2xl font-bold">{license.name}</h2>
                      <div className="text-sm text-gray-500">{license.company}</div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{license.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-500">Figurines disponibles</div>
                        <div className="font-medium">{license.figureCount}+</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Personnages populaires</div>
                        <div className="flex flex-wrap gap-1">
                          {license.popularCharacters.map((character, index) => (
                            <span key={index} className="text-sm font-medium">
                              {character}{index < license.popularCharacters.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Séries/Saisons</div>
                        <div className="flex flex-wrap gap-2">
                          {license.seasons.map((season, index) => (
                            <span
                              key={index}
                              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                            >
                              {season}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500 mb-2">Meilleures ventes</div>
                        <div className="flex flex-wrap gap-2">
                          {license.bestSellers.map((figure, index) => (
                            <span
                              key={index}
                              className="bg-muted text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {figure}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Link 
                        to={`/licenses/${license.id}`}
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
      </main>
    </div>
  );
};

export default Licenses;
