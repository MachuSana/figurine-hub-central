
import MainNav from "../components/MainNav";
import { ArrowRight, Star, Package } from "lucide-react";

const Manufacturers = () => {
  const manufacturers = [
    {
      id: 1,
      name: "Good Smile Company",
      description: "Leader mondial des Nendoroids et figmas",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      founded: "2001",
      location: "Tokyo, Japon",
      rating: 4.8,
      productsCount: 1500,
      specialties: ["Nendoroid", "Figma", "Scale Figures"],
    },
    {
      id: 2,
      name: "Kotobukiya",
      description: "Spécialiste des figurines de haute qualité",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      founded: "1953",
      location: "Tokyo, Japon",
      rating: 4.7,
      productsCount: 1200,
      specialties: ["ARTFX", "Bishoujo", "Frame Arms"],
    },
    {
      id: 3,
      name: "Bandai",
      description: "Expert en figurines d'anime et de manga",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      founded: "1950",
      location: "Tokyo, Japon",
      rating: 4.9,
      productsCount: 2000,
      specialties: ["S.H.Figuarts", "Gunpla", "Dragon Ball"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Fabricants</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {manufacturers.map((manufacturer) => (
            <div
              key={manufacturer.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-full relative aspect-square md:aspect-auto">
                    <img
                      src={manufacturer.image}
                      alt={manufacturer.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      {manufacturer.rating}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:w-2/3">
                  <h2 className="text-2xl font-bold mb-2">{manufacturer.name}</h2>
                  <p className="text-gray-600 mb-4">{manufacturer.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Fondé en</div>
                      <div className="font-medium">{manufacturer.founded}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Localisation</div>
                      <div className="font-medium">{manufacturer.location}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Produits</div>
                      <div className="font-medium">{manufacturer.productsCount}+</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm text-gray-500">Spécialités</div>
                    <div className="flex flex-wrap gap-2">
                      {manufacturer.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="flex items-center gap-2 text-primary hover:text-white hover:bg-primary px-4 py-2 rounded-lg transition-colors duration-200">
                      Voir les produits
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Nos Partenaires en Chiffres</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Package className="w-12 h-12 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-800 mb-1">15+</div>
              <div className="text-gray-600">Fabricants Partenaires</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">50k+</div>
              <div className="text-gray-600">Produits Disponibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">25+</div>
              <div className="text-gray-600">Années d'Expérience</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Manufacturers;
