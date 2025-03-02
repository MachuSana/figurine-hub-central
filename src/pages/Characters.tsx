import { useState } from "react";
import MainNav from "../components/MainNav";
import { UserRound, Star, ArrowRight, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Characters = () => {
  const characters = [
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
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Personnages</h1>

        <div className="flex items-center mb-4">
          <Input
            placeholder="Rechercher un personnage"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3"
          />
          <Button
            variant="outline"
            className="ml-2"
            onClick={() => setSearchQuery("")}
          >
            <X size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {characters
            .filter((character) =>
              character.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((character) => (
              <div
                key={character.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
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
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center gap-4 mb-3">
                      <h2 className="text-2xl font-bold">{character.name}</h2>
                      <div className="text-sm text-gray-500">{character.series}</div>
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
      </main>
    </div>
  );
};

export default Characters;
