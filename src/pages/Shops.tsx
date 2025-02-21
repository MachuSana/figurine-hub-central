
import MainNav from "../components/MainNav";
import { Store, Star, ArrowRight, Package, Truck } from "lucide-react";

const Shops = () => {
  const shops = [
    {
      id: 1,
      name: "FigurineZ",
      type: "En ligne",
      description: "Le plus grand choix de figurines en France",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      rating: 4.9,
      productsCount: 5000,
      shipping: ["France", "Europe"],
      features: ["Paiement sécurisé", "Livraison express", "Service client 24/7"]
    },
    {
      id: 2,
      name: "Manga Store",
      type: "Boutique physique & en ligne",
      description: "Votre boutique spécialisée depuis 2005",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      rating: 4.8,
      productsCount: 3000,
      shipping: ["France"],
      features: ["Click & Collect", "Précommandes", "Programme fidélité"]
    },
    {
      id: 3,
      name: "Anime Collector",
      type: "En ligne",
      description: "L'expert des éditions limitées",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      rating: 4.7,
      productsCount: 2000,
      shipping: ["International"],
      features: ["Garantie authenticité", "Emballage premium", "Éditions exclusives"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Boutiques</h1>

        <div className="grid grid-cols-1 gap-8">
          {shops.map((shop) => (
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
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:w-2/3">
                  <div className="flex items-center gap-4 mb-3">
                    <h2 className="text-2xl font-bold">{shop.name}</h2>
                    <div className="text-sm text-gray-500">{shop.type}</div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{shop.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Produits</div>
                      <div className="font-medium">{shop.productsCount}+</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Livraison</div>
                      <div className="font-medium">{shop.shipping.join(", ")}</div>
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
                    <button className="flex items-center gap-2 text-primary hover:text-white hover:bg-primary px-4 py-2 rounded-lg transition-colors duration-200">
                      Visiter la boutique
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
