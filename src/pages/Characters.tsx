
import { useState } from "react";
import { Link } from "react-router-dom";
import MainNav from "../components/MainNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { AdvertisementBanner } from "@/components/home/AdvertisementBanner";

const Characters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  // Données d'exemple pour les personnages
  const characters = [
    {
      id: 1,
      name: "Luffy",
      image: "https://images.unsplash.com/photo-1601125867707-94463864e182",
      series: "One Piece",
      role: "Protagoniste",
      popularity: 98,
      figurineCount: 42
    },
    {
      id: 2,
      name: "Naruto",
      image: "https://images.unsplash.com/photo-1534970989-976b161fcf67",
      series: "Naruto",
      role: "Protagoniste",
      popularity: 95,
      figurineCount: 38
    },
    {
      id: 3,
      name: "Goku",
      image: "https://images.unsplash.com/photo-1513384312027-9fa69a360337",
      series: "Dragon Ball",
      role: "Protagoniste",
      popularity: 97,
      figurineCount: 45
    },
    {
      id: 4,
      name: "Zoro",
      image: "https://images.unsplash.com/photo-1541562232579-512a21360020",
      series: "One Piece",
      role: "Deutéragoniste",
      popularity: 92,
      figurineCount: 28
    },
    {
      id: 5,
      name: "Vegeta",
      image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4",
      series: "Dragon Ball",
      role: "Deutéragoniste",
      popularity: 94,
      figurineCount: 30
    },
    {
      id: 6,
      name: "Sasuke",
      image: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e",
      series: "Naruto",
      role: "Deutéragoniste",
      popularity: 90,
      figurineCount: 25
    },
    {
      id: 7,
      name: "Saitama",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
      series: "One Punch Man",
      role: "Protagoniste",
      popularity: 89,
      figurineCount: 18
    },
    {
      id: 8,
      name: "Mikasa",
      image: "https://images.unsplash.com/photo-1562572159-4efc207f5aff",
      series: "Attack on Titan",
      role: "Deutéragoniste",
      popularity: 88,
      figurineCount: 20
    }
  ];

  // Extraction des séries uniques pour le filtre
  const allSeries = Array.from(new Set(characters.map(character => character.series)));

  // Filtrer les personnages en fonction de la recherche et de la série sélectionnée
  const filteredCharacters = characters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeries = selectedSeries ? character.series === selectedSeries : true;
    return matchesSearch && matchesSeries;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Personnages</h1>
        
        {/* Bannière publicitaire en haut */}
        <AdvertisementBanner variant="fullwidth" className="mb-8" />
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Rechercher des personnages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="w-full md:w-64">
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedSeries || ""}
              onChange={(e) => setSelectedSeries(e.target.value === "" ? null : e.target.value)}
            >
              <option value="">Toutes les séries</option>
              {allSeries.map((series) => (
                <option key={series} value={series}>
                  {series}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <Link
              to={`/characters/${character.id}`}
              key={character.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{character.name}</h3>
                <div className="text-sm text-gray-600 mb-2">{character.series}</div>
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                    {character.figurineCount} figurines
                  </span>
                  <span className="text-gray-500">{character.role}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Bannière publicitaire au milieu */}
        <AdvertisementBanner variant="inline" className="my-10" />
        
        {filteredCharacters.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">Aucun personnage ne correspond à votre recherche.</p>
            <Button onClick={() => {
              setSearchQuery("");
              setSelectedSeries(null);
            }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
        
        {/* Bannière publicitaire en bas */}
        <AdvertisementBanner variant="sidebar" className="mt-10 mx-auto" dismissible={false} />
      </main>
    </div>
  );
};

export default Characters;
