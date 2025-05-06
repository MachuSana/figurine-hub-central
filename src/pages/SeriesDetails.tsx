
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainNav from "../components/MainNav";
import { SeriesHeader } from "@/components/series/SeriesHeader";
import { SeriesQuickStats } from "@/components/series/SeriesQuickStats";
import { SeriesSpecifications } from "@/components/series/SeriesSpecifications";
import { FigurinesList } from "@/components/FigurinesList";
import { SeriesFeatures } from "@/components/series/SeriesFeatures";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FigurineNews } from "@/components/FigurineNews";
import { AdvertisementBanner } from "@/components/home/AdvertisementBanner";

const SeriesDetails = () => {
  const { name } = useParams();
  const [activeTab, setActiveTab] = useState("specifications");

  // Exemple de données pour la série (à remplacer par des données réelles)
  const seriesData = {
    name: name || "Nom Inconnu",
    description: "Une série d'anime populaire avec de nombreux personnages iconiques",
    coverImage: "https://images.unsplash.com/photo-1490750967868-88aa4486c946",
    releaseYear: 2015,
    episodes: 150,
    status: "En cours",
    genres: ["Action", "Aventure", "Fantasy"],
    studios: ["Studio A", "Studio B"],
    rating: 4.8,
    votes: 1250,
    figurineCount: 45
  };

  // Données d'exemple pour les figurines
  const figurines = [
    {
      id: 1,
      name: "Character A - Action Pose",
      image: "https://images.unsplash.com/photo-1503437313881-503a91226402",
      price: "129.99", // Changed from number to string to match Figurine type
      manufacturer: "Good Smile Company",
      releaseDate: "2023-06",
      rating: 4.9,
      scale: "1/8",
      // Adding required properties to match the Figurine type
      series: name || "Série Inconnu",
      images: ["https://images.unsplash.com/photo-1503437313881-503a91226402"]
    },
    {
      id: 2,
      name: "Character B - Battle Stance",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
      price: "149.99", // Changed from number to string to match Figurine type
      manufacturer: "Max Factory",
      releaseDate: "2023-08",
      rating: 4.7,
      scale: "1/7",
      // Adding required properties to match the Figurine type
      series: name || "Série Inconnu",
      images: ["https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"]
    },
    {
      id: 3,
      name: "Character C - Special Edition",
      image: "https://images.unsplash.com/photo-1507149833265-60c372daea22",
      price: "199.99", // Changed from number to string to match Figurine type
      manufacturer: "Kotobukiya",
      releaseDate: "2023-10",
      rating: 4.8,
      scale: "1/6",
      // Adding required properties to match the Figurine type
      series: name || "Série Inconnu",
      images: ["https://images.unsplash.com/photo-1507149833265-60c372daea22"]
    }
  ];

  // Données d'exemple pour les actualités
  const news = [
    {
      title: "Nouvelle saison annoncée pour l'anime",
      date: "2023-12-01",
      url: "/news/1"
    },
    {
      title: "Collaboration spéciale avec un jeu vidéo populaire",
      date: "2023-11-15",
      url: "/news/2"
    },
    {
      title: "Un film d'animation prévu pour 2024",
      date: "2023-10-20",
      url: "/news/3"
    }
  ];

  // Données pour les spécifications de la série
  const specifications = {
    material: "PVC et ABS",
    packaging: "Boîte avec fenêtre",
    articulations: "Articulées",
    base: "Incluse",
    instructions: "Manuel multilingue"
  };

  // Liste des caractéristiques
  const features = [
    "Figurines à l'échelle",
    "Détails précis",
    "Accessoires interchangeables",
    "Bases personnalisées",
    "Éditions limitées",
    "Collaborations exclusives"
  ];

  // Fixed header data props
  const headerData = {
    name: seriesData.name,
    manufacturer: "Diverses marques",
    image: seriesData.coverImage,
    price: "Varie selon la figurine"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <SeriesHeader 
          name={headerData.name}
          manufacturer={headerData.manufacturer}
          image={headerData.image}
          price={headerData.price}
        />
        
        {/* Bannière publicitaire en haut */}
        <AdvertisementBanner variant="fullwidth" className="my-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="specifications">Spécifications</TabsTrigger>
                <TabsTrigger value="figurines">Figurines</TabsTrigger>
                <TabsTrigger value="features">Caractéristiques</TabsTrigger>
              </TabsList>
              <TabsContent value="specifications" className="mt-6">
                <SeriesSpecifications specifications={specifications} />
              </TabsContent>
              <TabsContent value="figurines" className="mt-6">
                <FigurinesList figurines={figurines} />
              </TabsContent>
              <TabsContent value="features" className="mt-6">
                <SeriesFeatures features={features} />
              </TabsContent>
            </Tabs>
            
            {/* Bannière publicitaire au milieu */}
            <AdvertisementBanner variant="inline" className="my-8" />
          </div>
          
          <div className="space-y-6">
            <SeriesQuickStats 
              startYear={seriesData.releaseYear.toString()} 
              totalReleases={seriesData.figurineCount} 
              scale="1/7"
            />
            
            <FigurineNews news={news} />
            
            {/* Bannière publicitaire latérale */}
            <AdvertisementBanner variant="sidebar" className="mt-6" dismissible={false} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeriesDetails;
