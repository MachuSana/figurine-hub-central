
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative mb-10 rounded-xl overflow-hidden bg-gradient-to-r from-violet-500 to-purple-700 shadow-lg animate-fade-in">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 p-8 md:p-12 flex flex-col items-start text-white max-w-3xl">
        <Badge 
          className="mb-4 bg-primary/90 hover:bg-primary text-white text-sm animate-fade-in" 
          style={{animationDelay: "200ms"}}
        >
          Bienvenue sur FigureNews
        </Badge>
        <h1 
          className="text-4xl md:text-5xl font-bold mb-4 leading-tight animate-fade-in" 
          style={{animationDelay: "300ms"}}
        >
          Découvrez l'univers fascinant des figurines
        </h1>
        <p 
          className="text-lg mb-8 text-white/90 max-w-2xl animate-fade-in" 
          style={{animationDelay: "400ms"}}
        >
          Toute l'actualité, les sorties et les précommandes des plus grandes marques de figurines.
        </p>
        <div 
          className="flex flex-wrap gap-4 animate-fade-in" 
          style={{animationDelay: "500ms"}}
        >
          <Button asChild size="lg" className="font-semibold hover:scale-105 transition-transform">
            <Link to="/figurines">Explorer les figurines</Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white/20 hover:bg-white/30 border-white text-white font-semibold"
          >
            <Link to="/news">Voir les actualités</Link>
          </Button>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 w-1/3 h-full hidden md:block">
        <div className="h-full w-full bg-gradient-to-l from-transparent to-violet-500/90"></div>
      </div>
    </section>
  );
};
