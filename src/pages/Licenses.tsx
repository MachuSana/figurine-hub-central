
import MainNav from "../components/MainNav";
import { Tag, Star, ArrowRight } from "lucide-react";

const Licenses = () => {
  const licenses = [
    {
      id: 1,
      name: "Jump",
      company: "Shueisha",
      description: "Le plus grand magazine de manga au monde",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      seriesCount: 45,
      figureCount: 1200,
      rating: 4.9,
      popularSeries: ["One Piece", "Dragon Ball", "Naruto"],
    },
    {
      id: 2,
      name: "Marvel",
      company: "Disney",
      description: "L'univers des super-héros légendaires",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      seriesCount: 30,
      figureCount: 800,
      rating: 4.8,
      popularSeries: ["Avengers", "Spider-Man", "X-Men"],
    },
    {
      id: 3,
      name: "DC Comics",
      company: "Warner Bros",
      description: "Les plus grands super-héros de tous les temps",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      seriesCount: 25,
      figureCount: 600,
      rating: 4.7,
      popularSeries: ["Batman", "Superman", "Justice League"],
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Licences</h1>

        <div className="grid grid-cols-1 gap-8">
          {licenses.map((license) => (
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
                  </div>
                </div>
                
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center gap-4 mb-3">
                    <h2 className="text-2xl font-bold">{license.name}</h2>
                    <div className="text-sm text-gray-500">{license.company}</div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{license.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Séries</div>
                      <div className="font-medium">{license.seriesCount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Figurines</div>
                      <div className="font-medium">{license.figureCount}+</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-2">Séries Populaires</div>
                    <div className="flex flex-wrap gap-2">
                      {license.popularSeries.map((series, index) => (
                        <span
                          key={index}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {series}
                        </span>
                      ))}
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

export default Licenses;
