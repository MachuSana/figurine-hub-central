
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainNav from "../components/MainNav";
import { FigurineShops } from "../components/FigurineShops";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, MapPin, Clock, Phone, Mail, Globe, ChevronRight, ShoppingBag, Filter, Search } from "lucide-react";

const ShopDetails = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Dans un cas réel, on récupérerait ces données depuis une API
  const shopData = {
    id: parseInt(id || "1"),
    name: "FigurineZ",
    logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300",
    coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200",
    description: "Le plus grand choix de figurines en France avec plus de 5000 produits disponibles. Livraison rapide et garantie de qualité sur toutes nos figurines.",
    type: "En ligne",
    rating: 4.9,
    reviewCount: 1240,
    address: "12 Rue du Commerce, 75015 Paris, France",
    phone: "+33 1 23 45 67 89",
    email: "contact@figurinez.fr",
    website: "https://figurinez.fr",
    openingHours: [
      { day: "Lundi", hours: "10h00 - 19h00" },
      { day: "Mardi", hours: "10h00 - 19h00" },
      { day: "Mercredi", hours: "10h00 - 19h00" },
      { day: "Jeudi", hours: "10h00 - 19h00" },
      { day: "Vendredi", hours: "10h00 - 19h00" },
      { day: "Samedi", hours: "10h00 - 20h00" },
      { day: "Dimanche", hours: "Fermé" }
    ],
    productsCount: 5000,
    categories: ["Anime", "Jeux Vidéo", "Comics", "Pop Culture"],
    shipping: ["France", "Europe"],
    features: ["Paiement sécurisé", "Livraison express", "Service client 24/7"],
    popularFigurines: [
      {
        name: "Monkey D. Luffy - Gear 5",
        price: "189,99 €",
        stock: true,
        url: "/figurines/1",
        logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100"
      },
      {
        name: "Naruto Uzumaki - Mode Sage",
        price: "149,99 €",
        stock: true,
        url: "/figurines/2",
        logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100"
      },
      {
        name: "Goku Ultra Instinct",
        price: "199,99 €",
        stock: false,
        url: "/figurines/3",
        logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100"
      },
      {
        name: "Eren Yeager - Titan",
        price: "259,99 €",
        stock: true,
        url: "/figurines/4",
        logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100"
      }
    ],
    newArrivals: [
      {
        name: "Chainsaw Man - Pochita",
        price: "129,99 €",
        stock: true,
        url: "/figurines/5",
        logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100"
      },
      {
        name: "Jujutsu Kaisen - Gojo Satoru",
        price: "179,99 €",
        stock: true,
        url: "/figurines/6",
        logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100"
      }
    ]
  };

  // Filtrer les produits selon le terme de recherche
  const filterFigurines = (figurines) => {
    return figurines.filter(fig => 
      fig.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const popularFigurines = filterFigurines(shopData.popularFigurines);
  const newArrivals = filterFigurines(shopData.newArrivals);

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        {/* Entête avec image de couverture */}
        <div className="relative rounded-xl overflow-hidden mb-8 h-64 md:h-80">
          <img 
            src={shopData.coverImage} 
            alt={`Boutique ${shopData.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-white p-2">
                <img 
                  src={shopData.logo} 
                  alt={`Logo ${shopData.name}`}
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{shopData.name}</h1>
                <div className="flex items-center gap-2 text-white mt-1">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{shopData.rating}</span>
                  </div>
                  <span className="text-gray-300">({shopData.reviewCount} avis)</span>
                  <Badge variant="secondary" className="ml-2">{shopData.type}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infos principales et onglets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Infos de contact */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">À propos</h2>
                <p className="text-gray-600">{shopData.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <span className="text-gray-600">{shopData.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-gray-600">{shopData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-gray-600">{shopData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <a href={shopData.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      {shopData.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Horaires d'ouverture</h3>
                <div className="space-y-2">
                  {shopData.openingHours.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Catégories</h3>
                <div className="flex flex-wrap gap-2">
                  {shopData.categories.map((category, index) => (
                    <Badge key={index} variant="outline" className="bg-muted">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Livraison</h3>
                <div className="flex flex-wrap gap-2">
                  {shopData.shipping.map((region, index) => (
                    <Badge key={index} variant="outline" className="bg-muted/50">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {shopData.features.map((feature, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-primary/10 text-primary border-primary/30"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button className="w-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Visiter la boutique en ligne
              </Button>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="md:col-span-2">
            <Tabs defaultValue="popular" className="w-full">
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                  <TabsList className="h-10">
                    <TabsTrigger value="popular">Populaires</TabsTrigger>
                    <TabsTrigger value="new">Nouveautés</TabsTrigger>
                    <TabsTrigger value="all">Tous les produits</TabsTrigger>
                  </TabsList>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher une figurine..."
                      className="pl-10 pr-4"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                  <Button 
                    variant={activeFilter === "all" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setActiveFilter("all")}
                  >
                    Tous
                  </Button>
                  {shopData.categories.map((category, index) => (
                    <Button
                      key={index}
                      variant={activeFilter === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <TabsContent value="popular" className="mt-0">
                <FigurineShops shops={popularFigurines} />
              </TabsContent>
              
              <TabsContent value="new" className="mt-0">
                <FigurineShops shops={newArrivals} />
              </TabsContent>
              
              <TabsContent value="all" className="mt-0">
                <FigurineShops shops={[...popularFigurines, ...newArrivals]} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopDetails;
