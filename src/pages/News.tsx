import { useState } from "react";
import MainNav from "@/components/MainNav";
import { NewsCard } from "@/components/NewsCard";
import { NewsFilters } from "@/components/NewsFilters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ReleaseCalendarPreview from "@/components/ReleaseCalendarPreview";
import { AdvertisementBanner } from "@/components/home/AdvertisementBanner";

// Données fictives pour les actualités
const newsData = [
  {
    id: 1,
    title: "Nouvelle collection Dragon Ball Z annoncée pour 2024",
    summary: "Good Smile Company dévoile sa nouvelle gamme de figurines Dragon Ball Z avec des finitions améliorées",
    content: "Good Smile Company a révélé lors du Tokyo Toy Show sa nouvelle collection de figurines Dragon Ball Z prévue pour le premier trimestre 2024. Cette nouvelle gamme proposera des finitions haute qualité et une attention particulière aux détails des personnages. Les premiers modèles incluront Goku Ultra Instinct, Vegeta Blue et Broly en version exclusive.",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1600",
    date: "2023-11-15",
    category: "Annonce",
    source: "Tokyo Toy Show",
    author: "FigureNews"
  },
  {
    id: 2,
    title: "Retard de production pour les figurines One Piece",
    summary: "MegaHouse annonce un retard de 3 mois pour sa série Portrait of Pirates",
    content: "En raison de problèmes dans la chaîne d'approvisionnement, MegaHouse a annoncé un retard de trois mois pour sa célèbre série Portrait of Pirates (P.O.P) de One Piece. Les figurines de Luffy Gear 5, Zoro et Sanji initialement prévues pour décembre 2023 seront désormais disponibles en mars 2024. Des compensations seront offertes aux clients ayant déjà précommandé ces articles.",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600",
    date: "2023-11-02",
    category: "Production",
    source: "MegaHouse Official",
    author: "FigureNews"
  },
  {
    id: 3,
    title: "Exposition de figurines à Paris en janvier 2024",
    summary: "Le plus grand salon de figurines d'Europe se tiendra à Paris",
    content: "Le Paris Figure Expo, considéré comme le plus grand salon européen dédié aux figurines et aux collectibles, se tiendra du 15 au 17 janvier 2024 au Parc des Expositions de la Porte de Versailles. Plus de 200 exposants du monde entier présenteront leurs dernières créations et des pièces exclusives. Des artistes renommés dans le domaine des figurines seront présents pour des sessions de dédicaces et des masterclass sur la peinture et la sculpture.",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1600",
    date: "2023-10-25",
    category: "Événement",
    source: "Paris Figure Expo",
    author: "FigureNews"
  },
  {
    id: 4,
    title: "Hausse des prix chez Bandai pour les figurines S.H.Figuarts",
    summary: "Une augmentation de 10% est annoncée pour début 2024",
    content: "Bandai a annoncé une hausse des prix de 10% sur sa gamme premium S.H.Figuarts à partir de janvier 2024. Cette augmentation est justifiée par la hausse du coût des matières premières et des frais de transport. Les précommandes effectuées avant le 31 décembre 2023 ne seront pas affectées par cette augmentation. La marque promet néanmoins une amélioration de la qualité des produits et l'introduction de nouvelles technologies d'articulation.",
    coverImage: "/placeholder.svg",
    date: "2023-10-14",
    category: "Industrie",
    source: "Bandai Collectibles",
    author: "FigureNews"
  },
  {
    id: 5,
    title: "Kotobukiya célèbre son 70e anniversaire avec des rééditions exceptionnelles",
    summary: "Des figurines emblématiques seront rééditées en version collector",
    content: "Pour célébrer son 70e anniversaire, le fabricant japonais Kotobukiya a annoncé la réédition de ses figurines les plus emblématiques en versions collector. Parmi les pièces concernées figurent des modèles de Star Wars, Marvel et diverses licences d'anime. Ces éditions spéciales comporteront des finitions améliorées, des bases exclusives et des certificats d'authenticité numérotés. Les précommandes ouvriront le mois prochain avec des quantités limitées.",
    coverImage: "/placeholder.svg",
    date: "2023-10-05",
    category: "Anniversaire",
    source: "Kotobukiya",
    author: "FigureNews"
  },
  {
    id: 6,
    title: "Sorties de figurines - Mars 2025",
    summary: "Découvrez toutes les figurines prévues pour le mois de mars 2025",
    content: "Le mois de mars 2025 s'annonce riche en sorties de figurines avec des pièces très attendues comme la Rem en tenue d'hiver de Good Smile Company et le Goku Ultra Instinct de Bandai. Consultez notre planning détaillé pour ne manquer aucune sortie !",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600",
    date: "2023-12-15",
    category: "Planning des sorties",
    source: "FigureNews",
    author: "FigureNews",
    scheduleMonth: "mars-2025"
  },
  {
    id: 7,
    title: "Sorties de figurines - Avril 2025",
    summary: "Aperçu des figurines à paraître en avril 2025",
    content: "Découvrez en avant-première les figurines prévues pour le mois d'avril 2025, dont la magnifique Saber en kimono d'Aniplex et l'impressionnant Midoriya en costume de héros de Kotobukiya.",
    coverImage: "/placeholder.svg",
    date: "2023-12-10",
    category: "Planning des sorties",
    source: "FigureNews",
    author: "FigureNews",
    scheduleMonth: "avril-2025"
  }
];

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Extraire toutes les catégories uniques pour les filtres
  const categories = Array.from(new Set(newsData.map(item => item.category)));
  
  // Filtrer les actualités en fonction de la recherche et de la catégorie
  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         news.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? news.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });
  
  // Séparer les actualités régulières des plannings de sortie
  const isReleaseSchedule = (news: typeof newsData[0]) => news.category === "Planning des sorties";
  const regularNews = filteredNews.filter(news => !isReleaseSchedule(news));
  const scheduleNews = filteredNews.filter(news => isReleaseSchedule(news));

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Actualités des Figurines</h1>
        
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Rechercher des actualités..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <NewsFilters 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>
        
        {searchQuery && (
          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-sm text-gray-500">
              {filteredNews.length === 0 
                ? `Aucun résultat pour "${searchQuery}"` 
                : `${filteredNews.length} résultat(s) pour "${searchQuery}"`}
            </p>
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          {/* Bannière publicitaire en haut */}
          <AdvertisementBanner 
            variant="fullwidth" 
            className="mb-8" 
          />
          
          {/* Planning des sorties en haut si aucun filtre n'est appliqué ou si le filtre est sur "Planning des sorties" */}
          {(!selectedCategory || selectedCategory === "Planning des sorties") && !searchQuery && (
            <div className="mb-8">
              <ReleaseCalendarPreview />
            </div>
          )}
          
          {/* Liste des actualités */}
          <div className="space-y-6">
            {/* Actualités de type plannings */}
            {scheduleNews.length > 0 && (
              <>
                {scheduleNews.map(news => (
                  <NewsCard 
                    key={news.id} 
                    news={news}
                    isSchedule={true}
                    scheduleLink={`/release-schedule/${news.scheduleMonth}`}
                  />
                ))}
              </>
            )}
            
            {/* Bannière publicitaire au milieu */}
            {regularNews.length > 0 && regularNews.length > 2 && (
              <AdvertisementBanner 
                variant="inline" 
                className="my-8"
              />
            )}
            
            {/* Actualités régulières */}
            {regularNews.length > 0 ? (
              regularNews.map(news => (
                <NewsCard key={news.id} news={news} />
              ))
            ) : (
              !scheduleNews.length && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Aucun article trouvé</p>
                </div>
              )
            )}
          </div>
          
          {/* Bannière publicitaire en bas */}
          <AdvertisementBanner 
            variant="sidebar" 
            className="mt-8"
            dismissible={false}
          />
        </div>
      </main>
    </div>
  );
};

export default News;
