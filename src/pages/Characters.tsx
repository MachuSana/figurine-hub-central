
import MainNav from "../components/MainNav";
import { UserRound, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

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
    },
    {
      id: 4,
      name: "Rem",
      series: "Re:Zero",
      description: "Une démone au service de la famille Roswaal",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
      figureCount: 95,
      popularity: 4.9,
      traits: ["Dévouée", "Déterminée", "Protectrice"],
      affiliations: ["Manoir Roswaal", "Démone"]
    },
    {
      id: 5,
      name: "Asuka Langley Soryu",
      series: "Neon Genesis Evangelion",
      description: "Pilote de l'EVA-02",
      image: "https://images.unsplash.com/photo-1547333590-47fae5f58d21",
      figureCount: 80,
      popularity: 4.7,
      traits: ["Orgueilleuse", "Compétitive", "Complexe"],
      affiliations: ["NERV", "Pilotes d'EVA"]
    },
    {
      id: 6,
      name: "Mikasa Ackerman",
      series: "Attack on Titan",
      description: "Une soldate d'élite du bataillon d'exploration",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      figureCount: 110,
      popularity: 4.8,
      traits: ["Forte", "Protectrice", "Loyale"],
      affiliations: ["Bataillon d'exploration", "104ème Brigade d'entraînement"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Personnages</h1>

        <div className="grid grid-cols-1 gap-8">
          {characters.map((character) => (
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
                    <Link to={`/characters/${character.id}`}>
                      <Button variant="ghost" className="flex items-center gap-2 text-primary hover:text-white hover:bg-primary">
                        Voir le personnage
                        <ArrowRight size={16} />
                      </Button>
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
