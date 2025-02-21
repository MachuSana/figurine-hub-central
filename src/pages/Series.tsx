
import MainNav from "../components/MainNav";
import { ArrowRight, Star, Tag } from "lucide-react";

const Series = () => {
  const series = [
    {
      id: 1,
      name: "One Piece",
      description: "La plus grande série de pirates au monde",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      figureCount: 250,
      startYear: 1999,
      publisher: "Shueisha",
      rating: 4.9,
      categories: ["Shonen", "Action", "Aventure"],
      popularCharacters: ["Luffy", "Zoro", "Nami"],
    },
    {
      id: 2,
      name: "Dragon Ball",
      description: "L'épopée légendaire de Son Goku",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      figureCount: 300,
      startYear: 1984,
      publisher: "Shueisha",
      rating: 4.8,
      categories: ["Shonen", "Action", "Arts Martiaux"],
      popularCharacters: ["Goku", "Vegeta", "Gohan"],
    },
    {
      id: 3,
      name: "Naruto",
      description: "L'histoire d'un jeune ninja en quête de reconnaissance",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      figureCount: 200,
      startYear: 1999,
      publisher: "Shueisha",
      rating: 4.7,
      categories: ["Shonen", "Action", "Ninja"],
      popularCharacters: ["Naruto", "Sasuke", "Sakura"],
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Séries</h1>

        <div className="grid grid-cols-1 gap-8">
          {series.map((serie) => (
            <div
              key={serie.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3 lg:w-1/4">
                  <div className="h-64 md:h-full relative">
                    <img
                      src={serie.image}
                      alt={serie.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      {serie.rating}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:w-2/3 lg:w-3/4">
                  <div className="flex items-center gap-4 mb-3">
                    <h2 className="text-2xl font-bold">{serie.name}</h2>
                    <div className="text-sm text-gray-500">
                      Depuis {serie.startYear}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{serie.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Figurines</div>
                      <div className="font-medium">{serie.figureCount}+</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Éditeur</div>
                      <div className="font-medium">{serie.publisher}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Catégories</div>
                      <div className="flex flex-wrap gap-2">
                        {serie.categories.map((category, index) => (
                          <span
                            key={index}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-2">Personnages Populaires</div>
                      <div className="flex flex-wrap gap-2">
                        {serie.popularCharacters.map((character, index) => (
                          <span
                            key={index}
                            className="bg-muted text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {character}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="flex items-center gap-2 text-primary hover:text-white hover:bg-primary px-4 py-2 rounded-lg transition-colors duration-200">
                      Voir les figurines
                      <ArrowRight size={16} />
                    </button>
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

export default Series;
