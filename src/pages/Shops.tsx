
import { useState } from "react";
import { Link } from "react-router-dom";
import MainNav from "../components/MainNav";
import ShopFilters from "../components/ShopFilters";
import { Button } from "@/components/ui/button";
import { Store, Star, ArrowRight, Package, Truck, Globe, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ShopType = "En ligne" | "Boutique physique" | "Hybride";

interface Shop {
  id: number;
  name: string;
  type: string;
  description: string;
  image: string;
  logo?: string;
  rating: number;
  reviewCount?: number;
  productsCount: number;
  shipping: string[];
  features: string[];
  location: string;
}

const Shops = () => {
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    search: "",
    type: "all",
    location: "all",
    features: [] as string[],
  });

  const shops: Shop[] = [
    {
      id: 1,
      name: "FigurineZ",
      type: "En ligne",
      description: "Le plus grand choix de figurines en France",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300",
      rating: 4.9,
      reviewCount: 1240,
      productsCount: 5000,
      location: "France",
      shipping: ["France", "Europe"],
      features: ["Paiement sécurisé", "Livraison express", "Service client 24/7"]
    },
    {
      id: 2,
      name: "Manga Store",
      type: "Hybride",
      description: "Votre boutique spécialisée depuis 2005",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300",
      rating: 4.8,
      reviewCount: 890,
      productsCount: 3000,
      location: "France",
      shipping: ["France"],
      features: ["Click & Collect", "Précommandes", "Programme fidélité"]
    },
    {
      id: 3,
      name: "Anime Collector",
      type: "En ligne",
      description: "L'expert des éditions limitées",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300",
      rating: 4.7,
      reviewCount: 650,
      productsCount: 2000,
      location: "International",
      shipping: ["International"],
      features: ["Garantie authenticité", "Emballage premium", "Éditions exclusives"]
    },
    {
      id: 4,
      name: "Japan Figure Shop",
      type: "En ligne",
      description: "Importation directe du Japon",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300",
      rating: 4.5,
      reviewCount: 420,
      productsCount: 1500,
      location: "International",
      shipping: ["International", "Europe", "France"],
      features: ["Produits japonais authentiques", "Éditions exclusives", "Emballage premium"]
    },
    {
      id: 5,
      name: "Geek Corner",
      type: "Boutique physique",
      description: "La boutique des passionnés au cœur de Paris",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300",
      rating: 4.6,
      reviewCount: 320,
      productsCount: 1200,
      location: "France",
      shipping: ["France"],
      features: ["Service client personnalisé", "Réservation en ligne", "Événements exclusifs"]
    }
  ];

  // Initialiser les boutiques filtrées au chargement de la page
  useState(() => {
    setFilteredShops(shops);
  });

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    
    const filtered = shops.filter(shop => {
      // Filtrer par recherche
      const matchesSearch = filters.search === "" || 
        shop.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        shop.description.toLowerCase().includes(filters.search.toLowerCase());
      
      // Filtrer par type
      const matchesType = filters.type === "all" || shop.type === filters.type;
      
      // Filtrer par localisation
      const matchesLocation = filters.location === "all" || 
        shop.location === filters.location ||
        shop.shipping.includes(filters.location);
      
      // Filtrer par caractéristiques
      const matchesFeatures = filters.features.length === 0 || 
        filters.features.every(feature => shop.features.includes(feature));
      
      return matchesSearch && matchesType && matchesLocation && matchesFeatures;
    });
    
    setFilteredShops(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Boutiques</h1>
        </div>

        <ShopFilters onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 gap-8">
          {filteredShops.length > 0 ? (
            filteredShops.map((shop) => (
              <div
                key={shop.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="h-64 md:h-full relative">
                      <img
                        src={shop.image}
                        alt={shop.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        {shop.rating}
                        {shop.reviewCount && (
                          <span className="text-xs text-gray-500 ml-1">({shop.reviewCount})</span>
                        )}
                      </div>
                      {shop.logo && (
                        <div className="absolute bottom-2 left-2 w-16 h-16 bg-white rounded-lg p-2 shadow-sm">
                          <img
                            src={shop.logo}
                            alt={`Logo ${shop.name}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center gap-4 mb-3">
                      <h2 className="text-2xl font-bold">{shop.name}</h2>
                      <Badge variant="outline" className="bg-muted/70">{shop.type}</Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{shop.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Package className="text-primary" size={18} />
                        <div>
                          <div className="text-sm text-gray-500">Produits</div>
                          <div className="font-medium">{shop.productsCount}+</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="text-primary" size={18} />
                        <div>
                          <div className="text-sm text-gray-500">Livraison</div>
                          <div className="font-medium">{shop.shipping.join(", ")}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="text-primary" size={18} />
                        <div>
                          <div className="text-sm text-gray-500">Localisation</div>
                          <div className="font-medium">{shop.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="text-primary" size={18} />
                        <div>
                          <div className="text-sm text-gray-500">Type</div>
                          <div className="font-medium">{shop.type}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-2">Services</div>
                      <div className="flex flex-wrap gap-2">
                        {shop.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Link to={`/shops/${shop.id}`}>
                        <Button className="flex items-center gap-2">
                          Voir la boutique
                          <ArrowRight size={16} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Aucune boutique trouvée</h3>
              <p className="text-gray-500">
                Aucune boutique ne correspond à vos critères de recherche.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => handleFilterChange({
                  search: "",
                  type: "all",
                  location: "all",
                  features: [],
                })}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>

        {/* Section avantages */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Nos Garanties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Store className="w-12 h-12 text-primary mx-auto mb-3" />
              <div className="font-bold text-gray-800 mb-1">Boutiques Vérifiées</div>
              <div className="text-gray-600">Tous nos partenaires sont sélectionnés avec soin</div>
            </div>
            <div>
              <Package className="w-12 h-12 text-primary mx-auto mb-3" />
              <div className="font-bold text-gray-800 mb-1">Produits Authentiques</div>
              <div className="text-gray-600">Garantie 100% officiel</div>
            </div>
            <div>
              <Truck className="w-12 h-12 text-primary mx-auto mb-3" />
              <div className="font-bold text-gray-800 mb-1">Livraison Sécurisée</div>
              <div className="text-gray-600">Emballage renforcé et suivi détaillé</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shops;
