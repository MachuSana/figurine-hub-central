
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative mb-12 rounded-2xl overflow-hidden gradient-primary shadow-2xl animate-fade-up">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 p-8 md:p-16 flex flex-col items-start text-white max-w-4xl">
        <Badge 
          className="mb-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-sm font-medium border border-white/30 animate-scale-in shadow-lg" 
          style={{animationDelay: "200ms"}}
        >
          ✨ Bienvenue sur FigureNews
        </Badge>
        <h1 
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-up text-balance" 
          style={{animationDelay: "300ms"}}
        >
          Découvrez l'univers fascinant des figurines
        </h1>
        <p 
          className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl animate-fade-up font-light leading-relaxed" 
          style={{animationDelay: "400ms"}}
        >
          Toute l'actualité, les sorties et les précommandes des plus grandes marques de figurines. Rejoignez une communauté passionnée.
        </p>
        <div 
          className="flex flex-wrap gap-4 animate-fade-up" 
          style={{animationDelay: "500ms"}}
        >
          <Button 
            asChild 
            size="lg" 
            className="font-semibold hover-lift bg-white text-primary hover:bg-white/90 shadow-xl"
          >
            <Link to="/figurines">Explorer les figurines</Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/40 text-white font-semibold hover-lift shadow-lg"
          >
            <Link to="/news">Voir les actualités</Link>
          </Button>
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute right-0 bottom-0 w-1/2 h-full hidden md:block opacity-30">
        <div className="h-full w-full bg-gradient-to-l from-white/10 via-transparent to-transparent"></div>
      </div>
      
      {/* Animated floating elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-float hidden lg:block"></div>
      <div className="absolute bottom-10 right-32 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-float hidden lg:block" style={{animationDelay: "1s"}}></div>
    </section>
  );
};
