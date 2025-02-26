
import MainNav from "../components/MainNav";
import { Tag, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Series = () => {
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
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Gammes de Figurines</h1>

        <div className="grid grid-cols-1 gap-8">
          {productLines.map((line) => (
            <div
              key={line.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full relative">
                    <img
                      src={line.image}
                      alt={line.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      {line.rating}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center gap-4 mb-3">
                    <h2 className="text-2xl font-bold">{line.name}</h2>
                    <div className="text-sm text-gray-500">{line.company}</div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{line.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Figurines disponibles</div>
                      <div className="font-medium">{line.figureCount}+</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Taille moyenne</div>
                      <div className="font-medium">{line.scale}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Gamme de prix</div>
                      <div className="font-medium">{line.price}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-2">Caractéristiques</div>
                      <div className="flex flex-wrap gap-2">
                        {line.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-2">Figurines populaires</div>
                      <div className="flex flex-wrap gap-2">
                        {line.popularFigures.map((figure, index) => (
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
                      to={`/series/${line.name.toLowerCase()}`} 
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

export default Series;
