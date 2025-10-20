
import { Bookmark, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { NewsCard } from "@/components/NewsCard";

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

export const NewsSection = () => {
  const { data: latestNews, isLoading } = useQuery({
    queryKey: ['latestNews'],
    queryFn: fetchLatestNews,
  });

  return (
    <section className="mb-16 animate-fade-up">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-3">
            <Bookmark className="text-primary" size={28} />
            Dernières Actualités
          </h2>
          <p className="text-gray-600 mt-2">Restez informé des nouveautés</p>
        </div>
        <Button variant="outline" asChild className="hover-lift border-2 font-semibold">
          <Link to="/news" className="inline-flex items-center gap-2">
            Toutes les actualités 
            <ChevronRight size={18} />
          </Link>
        </Button>
      </div>
      
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="space-y-6 w-full">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl h-64 w-full animate-pulse"></div>
              ))}
            </div>
          </div>
        ) : (
          latestNews?.map((news, index) => (
            <div 
              key={news.id} 
              className="animate-scale-in"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <NewsCard news={news} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};
