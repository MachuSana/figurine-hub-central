
import { useState, useEffect } from "react";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type FigurineFeatured = {
  id: number;
  name: string;
  image: string;
  price: string;
  brand: string;
  badges: string[];
  rating: number;
};

export const FeaturedFigurines = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <section className="mb-16 animate-fade-up">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-3">
            <Star className="text-primary" size={28} />
            Figurines à la Une
          </h2>
          <p className="text-gray-600 mt-2">Découvrez nos meilleures sélections</p>
        </div>
      </div>
      
      <Carousel
        className="relative group"
        setApi={(api) => {
          api?.on("select", () => {
            setCurrentSlide(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent>
          {featuredFigurines.map((figurine) => (
            <CarouselItem key={figurine.id}>
              <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
                <div className="grid md:grid-cols-5 h-full">
                  <div className="md:col-span-2 relative h-64 md:h-96 overflow-hidden group/image">
                    <img 
                      src={figurine.image} 
                      alt={figurine.name} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover/image:scale-110 group-hover/image:rotate-1"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                    
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                      {figurine.badges.map((badge, index) => (
                        <Badge 
                          key={index} 
                          className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold px-3 py-1 shadow-lg animate-scale-in border-0"
                          style={{animationDelay: `${index * 100}ms`}}
                        >
                          ✨ {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                    <div className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                      <div className="h-1 w-8 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                      {figurine.brand}
                    </div>
                    <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-gray-900 leading-tight">
                      {figurine.name}
                    </h3>
                    <div className="flex items-center mb-6 gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={18} 
                            className={`${i < Math.floor(figurine.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 ml-1">{figurine.rating}/5</span>
                    </div>
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8">
                      {figurine.price}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover-lift shadow-lg font-semibold">
                        <Link to={`/figurines/${figurine.id}`}>
                          Voir les détails
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" className="gap-2 hover-lift border-2 font-semibold">
                        <Heart size={18} />
                        Favoris
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover-lift border-2" />
        <CarouselNext className="right-4 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover-lift border-2" />
        
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {featuredFigurines.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-primary w-8" : "bg-white/60 w-2 hover:bg-white/80"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};
