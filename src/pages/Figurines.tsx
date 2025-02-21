
import MainNav from "../components/MainNav";
import { Star, Tag, ArrowRight } from "lucide-react";

const Figurines = () => {
  const figures = [
    {
      id: 1,
      name: "Monkey D. Luffy - Gear 5",
      series: "One Piece",
      price: "129.99 €",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      manufacturer: "Bandai",
      rating: 4.8,
      availability: "Pré-commande",
    },
    {
      id: 2,
      name: "Eren Yeager - Version Titant",
      series: "L'Attaque des Titans",
      price: "199.99 €",
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
      manufacturer: "Good Smile Company",
      rating: 4.9,
      availability: "En stock",
    },
    {
      id: 3,
      name: "Saitama - Edition Limitée",
      series: "One Punch Man",
      price: "159.99 €",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      manufacturer: "Kotobukiya",
      rating: 4.7,
      availability: "En stock",
    },
    {
      id: 4,
      name: "Gojo Satoru",
      series: "Jujutsu Kaisen",
      price: "89.99 €",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      manufacturer: "Bandai",
      rating: 5.0,
      availability: "Pré-commande",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Figurines</h1>
          <div className="flex gap-4">
            <select className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="">Trier par</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Meilleures notes</option>
              <option value="newest">Nouveautés</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Filtres sur le côté en version desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Filtres</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Prix</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary" />
                      <span className="ml-2">Moins de 50€</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary" />
                      <span className="ml-2">50€ - 100€</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary" />
                      <span className="ml-2">100€ - 200€</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary" />
                      <span className="ml-2">Plus de 200€</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Fabricants</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary" />
                      <span className="ml-2">Good Smile Company</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary" />
                      <span className="ml-2">Kotobukiya</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary" />
                      <span className="ml-2">Bandai</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Disponibilité</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary" />
                      <span className="ml-2">En stock</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-primary" />
                      <span className="ml-2">Pré-commande</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grille de figurines */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {figures.map((figure) => (
              <div
                key={figure.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={figure.image}
                    alt={figure.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
                    {figure.availability}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={16} className="text-primary" />
                    <span className="text-sm text-gray-600">{figure.series}</span>
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                    {figure.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{figure.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{figure.price}</span>
                    <button className="text-primary hover:text-white hover:bg-primary rounded-full p-2 transition-colors duration-200">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Figurines;
