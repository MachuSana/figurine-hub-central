
import MainNav from "../components/MainNav";
import { Tag, Star, ArrowRight } from "lucide-react";

const Licenses = () => {
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
      productLines: ["Nendoroid", "Figma", "échelle 1/7", "échelle 1/4", "ARTFX J"],
      popularCharacters: ["Rem", "Emilia", "Ram"],
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
      productLines: ["échelle 1/7", "échelle 1/4", "Altair"],
      popularCharacters: ["Enterprise", "Belfast", "Akagi"],
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
      productLines: ["Nendoroid", "Figma", "échelle 1/7", "ARTFX J"],
      popularCharacters: ["Bell Cranel", "Hestia", "Ais Wallenstein"],
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
      productLines: ["Nendoroid", "échelle 1/7", "Pop Up Parade"],
      popularCharacters: ["Paimon", "Keqing", "Ganyu"],
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

                  <div>
                    <div className="text-sm text-gray-500 mb-2">Gammes de figurines</div>
                    <div className="flex flex-wrap gap-2">
                      {license.productLines.map((line, index) => (
                        <span
                          key={index}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {line}
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
