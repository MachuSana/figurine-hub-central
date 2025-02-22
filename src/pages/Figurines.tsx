
import MainNav from "../components/MainNav";
import { useState } from "react";
import { Star, Tag, ArrowRight, ArrowDown, ArrowUp } from "lucide-react";

type SortOption = "price-asc" | "price-desc" | "rating" | "newest";

const Figurines = () => {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const figures = [
    {
      id: 1,
      name: "Monkey D. Luffy - Gear 5",
      series: "One Piece",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      manufacturer: "Bandai",
      rating: 4.8,
      availability: "Pré-commande",
      releaseDate: "2024-06",
      description: "Figurine représentant Luffy dans sa forme Gear 5, capturant toute la puissance et l'aspect comique de cette transformation.",
      height: "32cm",
      material: "PVC & ABS",
      scale: "1/7",
    },
    {
      id: 2,
      name: "Eren Yeager - Version Titan",
      series: "L'Attaque des Titans",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
      manufacturer: "Good Smile Company",
      rating: 4.9,
      availability: "En stock",
      releaseDate: "2023-12",
      description: "Une représentation détaillée d'Eren dans sa forme de Titan, montrant toute la rage et la détermination du personnage.",
      height: "45cm",
      material: "PVC & ABS",
      scale: "1/4",
    },
    {
      id: 3,
      name: "Saitama - Edition Limitée",
      series: "One Punch Man",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      manufacturer: "Kotobukiya",
      rating: 4.7,
      availability: "En stock",
      releaseDate: "2024-01",
      description: "Edition limitée de Saitama dans sa pose iconique, avec effets spéciaux et base personnalisée.",
      height: "25cm",
      material: "PVC & ABS",
      scale: "1/7",
    },
    {
      id: 4,
      name: "Gojo Satoru",
      series: "Jujutsu Kaisen",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      manufacturer: "Bandai",
      rating: 5.0,
      availability: "Pré-commande",
      releaseDate: "2024-07",
      description: "Gojo Satoru dans une pose dynamique, avec ses yeux révélés et des effets de son pouvoir Domain Expansion.",
      height: "24cm",
      material: "PVC & ABS",
      scale: "1/7",
    }
  ];

  // Fonction de tri des figurines
  const sortedFigures = [...figures].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      default:
        return 0;
    }
  });

  // Fonction de filtrage des figurines
  const filteredFigures = sortedFigures.filter(figure => {
    const priceRange = selectedPriceRanges.length === 0 || (
      (selectedPriceRanges.includes("0-50") && figure.price <= 50) ||
      (selectedPriceRanges.includes("50-100") && figure.price > 50 && figure.price <= 100) ||
      (selectedPriceRanges.includes("100-200") && figure.price > 100 && figure.price <= 200) ||
      (selectedPriceRanges.includes("200+") && figure.price > 200)
    );

    const manufacturer = selectedManufacturers.length === 0 || 
      selectedManufacturers.includes(figure.manufacturer);

    const availability = selectedAvailability.length === 0 ||
      selectedAvailability.includes(figure.availability);

    return priceRange && manufacturer && availability;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Figurines</h1>
          <div className="flex gap-4">
            <select 
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="newest">Plus récent</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Meilleures notes</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtres sur le côté en version desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Filtres</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Prix</h3>
                  <div className="space-y-2">
                    {["0-50", "50-100", "100-200", "200+"].map((range) => (
                      <label key={range} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="rounded text-primary"
                          checked={selectedPriceRanges.includes(range)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPriceRanges([...selectedPriceRanges, range]);
                            } else {
                              setSelectedPriceRanges(selectedPriceRanges.filter(r => r !== range));
                            }
                          }}
                        />
                        <span className="ml-2">
                          {range === "200+" ? "Plus de 200€" : `${range.replace("-", "€ - ")}€`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Fabricants</h3>
                  <div className="space-y-2">
                    {["Good Smile Company", "Kotobukiya", "Bandai"].map((manufacturer) => (
                      <label key={manufacturer} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="rounded text-primary"
                          checked={selectedManufacturers.includes(manufacturer)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedManufacturers([...selectedManufacturers, manufacturer]);
                            } else {
                              setSelectedManufacturers(selectedManufacturers.filter(m => m !== manufacturer));
                            }
                          }}
                        />
                        <span className="ml-2">{manufacturer}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Disponibilité</h3>
                  <div className="space-y-2">
                    {["En stock", "Pré-commande"].map((status) => (
                      <label key={status} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="rounded text-primary"
                          checked={selectedAvailability.includes(status)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAvailability([...selectedAvailability, status]);
                            } else {
                              setSelectedAvailability(selectedAvailability.filter(s => s !== status));
                            }
                          }}
                        />
                        <span className="ml-2">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grille de figurines */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredFigures.map((figure) => (
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
                  <div className="flex items-center gap-2 mb-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{figure.rating}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {figure.scale} · {figure.manufacturer}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{figure.price} €</span>
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

