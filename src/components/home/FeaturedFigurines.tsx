
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
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <Star className="mr-2 text-primary" size={22} />
          Figurines à la Une
        </h2>
      </div>
      
      <Carousel
        className="relative"
        setApi={(api) => {
          api?.on("select", () => {
            setCurrentSlide(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent>
          {featuredFigurines.map((figurine) => (
            <CarouselItem key={figurine.id}>
              <Card className="overflow-hidden border-none shadow-md">
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
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 bg-white/50 hover:bg-white/80" />
        <CarouselNext className="right-0 bg-white/50 hover:bg-white/80" />
        
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
      </Carousel>
    </section>
  );
};
