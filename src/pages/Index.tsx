
import MainNav from "../components/MainNav";
import { Calendar, Eye, MessageSquare, ArrowRight, Star, TrendingUp, Tag, Mail, Bookmark, ChevronRight, ChevronLeft, Heart, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { NewsCard } from "@/components/NewsCard";
import { Card, CardContent } from "@/components/ui/card";
import { EventLink } from "@/components/EventLink";
import ReleaseCalendarPreview from "@/components/ReleaseCalendarPreview";

const fetchLatestNews = async () => {
  return [
    {
      id: 1,
      title: "Nouvelle Figurine Demon Slayer annoncée",
      summary: "Good Smile Company dévoile une nouvelle figurine de Tanjiro Kamado dans une pose dynamique.",
      content:
        "Good Smile Company dévoile une nouvelle figurine de Tanjiro Kamado dans une pose dynamique qui capture parfaitement l'essence du personnage. Cette figurine incroyablement détaillée rejoindra bientôt la collection Demon Slayer et promet d'être un incontournable pour les fans.",
      coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      date: "2024-04-10",
      category: "Nouveautés",
      source: "Figure News",
      author: "Jean Martin",
    },
    {
      id: 2,
      title: "One Piece : La collection Grandista s'agrandit",
      summary: "Découvrez les nouvelles figurines de la collection Grandista avec Luffy et Zoro.",
      content:
        "Découvrez les nouvelles figurines de la collection Grandista avec Luffy et Zoro dans des poses emblématiques qui raviront tous les fans. Chaque figurine est méticuleusement sculptée pour capturer la personnalité unique de ces personnages iconiques.",
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      date: "2024-04-09",
      category: "Collections",
      source: "MangaCollect",
      author: "Sophie Dubois",
    },
    {
      id: 3,
      title: "Précommandes : Les dates à ne pas manquer",
      summary: "Toutes les précommandes importantes du mois à ne pas manquer pour les collectionneurs.",
      content:
        "Voici les dates de précommandes importantes pour le mois à venir. Plusieurs figurines très attendues seront disponibles, notamment la nouvelle série de My Hero Academia et les exclusivités du Tokyo Game Show.",
      coverImage: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64",
      date: "2024-04-08",
      category: "Précommandes",
      source: "FigureAlert",
      author: "Luc Bernard",
    },
  ];
};

const promotionalBanners = [
  {
    id: 1,
    title: "Nouvelles Collections",
    description: "Découvrez les dernières figurines des séries populaires",
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64",
    bgColor: "bg-violet-50"
  },
  {
    id: 2,
    title: "Précommandes",
    description: "Ne manquez pas les figurines les plus attendues",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    bgColor: "bg-blue-50"
  }
];

const brands = [
  {
    id: 1,
    name: "Good Smile Company",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    id: 2,
    name: "Bandai Spirits",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    id: 3,
    name: "Kotobukiya",
    logo: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64"
  }
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  
  const { data: latestNews, isLoading } = useQuery({
    queryKey: ['latestNews'],
    queryFn: fetchLatestNews,
  });

  const featuredFigurines = [
    {
      id: 1,
      name: "Eren Yeager - Final Season",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      price: "189,99 €",
      brand: "Good Smile Company",
      badges: ["Nouveau", "Exclusif"],
      rating: 4.9,
    },
    {
      id: 2,
      name: "Goku Ultra Instinct",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      price: "139,99 €",
      brand: "Bandai Spirits",
      badges: ["Précommande", "Limité"],
      rating: 4.8,
    },
    {
      id: 3,
      name: "Nezuko Kamado - Blood Demon Art",
      image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64",
      price: "169,99 €",
      brand: "Aniplex",
      badges: ["Édition spéciale"],
      rating: 5.0,
    },
  ];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === featuredFigurines.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredFigurines.length]);
  
  // Animation effect when changing slides
  useEffect(() => {
    if (slidesRef.current) {
      slidesRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredFigurines.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredFigurines.length - 1 ? 0 : prev + 1));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailRef.current?.value) {
      setIsSubscribed(true);
      toast.success("Merci pour votre inscription à la newsletter!");
    } else {
      toast.error("Veuillez entrer une adresse email valide");
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Recherche lancée pour "${searchQuery}"`);
      // Dans une application réelle, on redirigerait vers la page de recherche
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section amélioré */}
        <section className="relative mb-10 rounded-xl overflow-hidden bg-gradient-to-r from-violet-500 to-purple-700 shadow-lg animate-fade-in">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 p-8 md:p-12 flex flex-col items-start text-white max-w-3xl">
            <Badge className="mb-4 bg-primary/90 hover:bg-primary text-white text-sm animate-fade-in" style={{animationDelay: "200ms"}}>Bienvenue sur FigureNews</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight animate-fade-in" style={{animationDelay: "300ms"}}>Découvrez l'univers fascinant des figurines</h1>
            <p className="text-lg mb-8 text-white/90 max-w-2xl animate-fade-in" style={{animationDelay: "400ms"}}>
              Toute l'actualité, les sorties et les précommandes des plus grandes marques de figurines.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: "500ms"}}>
              <Button asChild size="lg" className="font-semibold hover:scale-105 transition-transform">
                <Link to="/figurines">Explorer les figurines</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/20 hover:bg-white/30 border-white text-white font-semibold">
                <Link to="/news">Voir les actualités</Link>
              </Button>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-1/3 h-full hidden md:block">
            <div className="h-full w-full bg-gradient-to-l from-transparent to-violet-500/90"></div>
          </div>
        </section>
        
        {/* Recherche rapide */}
        <section className="mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Search className="mr-2 text-primary" size={20} />
              Recherche rapide
            </h2>
            <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Nom de figurine, série, personnage..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="flex items-center gap-2">
                <Search size={16} />
                Rechercher
              </Button>
            </form>
          </div>
        </section>
        
        {/* Structure à deux colonnes: Événements + Calendrier */}
        <div className="grid md:grid-cols-5 gap-6 mb-10">
          <div className="md:col-span-3">
            <EventLink limit={2} />
          </div>
          <div className="md:col-span-2">
            <ReleaseCalendarPreview />
          </div>
        </div>

        {/* Section Figurines à la Une améliorée */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Star className="mr-2 text-primary" size={22} />
              Figurines à la Une
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevSlide} className="rounded-full h-8 w-8">
                <ChevronLeft size={16} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextSlide} className="rounded-full h-8 w-8">
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
          
          <Card className="overflow-hidden border-none shadow-md relative">
            <div 
              ref={slidesRef}
              className="flex transition-all duration-500 ease-in-out"
            >
              {featuredFigurines.map((figurine) => (
                <div key={figurine.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-5 h-full">
                    <div className="md:col-span-2 relative h-48 md:h-80">
                      <img 
                        src={figurine.image} 
                        alt={figurine.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {figurine.badges.map((badge, index) => (
                          <Badge key={index} className="bg-primary/90 text-xs">{badge}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-3 p-6 flex flex-col justify-center">
                      <div className="text-xs text-primary font-medium mb-1">{figurine.brand}</div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3">{figurine.name}</h3>
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={`${i < Math.floor(figurine.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{figurine.rating}/5</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 mb-5">{figurine.price}</p>
                      <div className="flex flex-wrap gap-3">
                        <Button asChild>
                          <Link to={`/figurines/${figurine.id}`}>Voir détails</Link>
                        </Button>
                        <Button variant="outline" className="gap-1">
                          <Heart size={16} /> Favoris
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {featuredFigurines.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? "bg-primary" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </Card>
        </section>

        {/* Bannières promotionnelles */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {promotionalBanners.map((banner, index) => (
            <div
              key={banner.id}
              className={`${banner.bgColor} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group animate-fade-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center p-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                  <p className="text-gray-600 mb-4">{banner.description}</p>
                  <button className="bg-white text-primary px-6 py-2 rounded-full inline-flex items-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    Découvrir <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
                <div className="w-32 h-32 relative overflow-hidden rounded-lg">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dernières Actualités */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <Bookmark className="mr-2 text-primary" size={24} />
              Dernières Actualités
            </h2>
            <Button variant="outline" asChild>
              <Link to="/news" className="inline-flex items-center">
                Toutes les actualités <ChevronRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-lg h-48 w-full max-w-4xl"></div>
                  ))}
                </div>
              </div>
            ) : (
              latestNews?.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))
            )}
          </div>
        </section>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl shadow-sm p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Restez informé des dernières sorties</h2>
            <p className="text-gray-600 mb-6">
              Inscrivez-vous à notre newsletter pour ne manquer aucune nouveauté et promotion exclusive.
            </p>
            {isSubscribed ? (
              <div className="bg-green-50 text-green-700 rounded-lg p-4 animate-fade-in">
                <p className="font-medium">Merci pour votre inscription!</p>
                <p className="text-sm">Vous recevrez bientôt nos actualités.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <Button type="submit" className="flex items-center gap-2">
                  <Mail size={16} />
                  S'inscrire
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { value: "10,000+", label: "Figurines", icon: Tag },
            { value: "50+", label: "Marques", icon: Star },
            { value: "25,000+", label: "Clients Satisfaits", icon: Heart },
            { value: "1,000+", label: "Avis Clients", icon: MessageSquare }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Marques Partenaires */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Nos Marques Partenaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="group cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors duration-300 animate-fade-up"
              >
                <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-center font-medium text-gray-700 group-hover:text-primary transition-colors duration-200">
                  {brand.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer simple */}
      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; 2024 FigureNews - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
