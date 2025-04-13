import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Download, ExternalLink } from "lucide-react";
import MainNav from "../components/MainNav";
import { FigurineHeader } from "../components/FigurineHeader";
import { FigurineCarousel } from "../components/FigurineCarousel";
import { FigurineSpecs } from "../components/FigurineSpecs";
import { FigurineShops } from "../components/FigurineShops";
import { FigurineNews } from "../components/FigurineNews";
import { FigurineRelated } from "../components/FigurineRelated";
import { FigurineComments } from "../components/FigurineComments";
import { FigurineDescription } from "../components/FigurineDescription";
import { FigurineQuickActions } from "../components/FigurineQuickActions";
import { SocialShare } from "../components/SocialShare";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";

const FigurineDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const figures = [
    {
      id: 1,
      name: "Monkey D. Luffy - Gear 5",
      character: "Monkey D. Luffy",
      series: "One Piece",
      line: "Portrait Of Pirates",
      images: [
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
      ],
      manufacturer: "Bandai",
      releaseDate: "2024-06",
      description: "Figurine représentant Luffy dans sa forme Gear 5, capturant toute la puissance et l'aspect comique de cette transformation. Cette édition spéciale inclut des accessoires exclusifs et des parties interchangeables permettant différentes poses.\n\nLe niveau de détail est exceptionnel, avec une attention particulière portée aux expressions faciales caractéristiques de cette transformation. La base est également travaillée avec des effets nuageux représentant les pouvoirs du fruit du démon.",
      height: "32cm",
      material: "PVC & ABS",
      scale: "1/7",
      weight: "800g",
      sculpteur: "Takashi Yamamoto",
      painter: "Hiroshi Tanaka",
      price: "24800",
      reference: "BAS55789",
      edition: "Standard",
      packaging: "Window box with blister",
      articleDate: "2023-12-15",
      shops: [
        { name: "FigurineZ", price: "24800¥", stock: true, url: "#" },
        { name: "HobbyLink Japan", price: "24500¥", stock: false, url: "#" },
        { name: "AmiAmi", price: "24900¥", stock: true, url: "#" }
      ],
      news: [
        {
          title: "Annonce de la figurine Luffy Gear 5",
          date: "2023-12-15",
          url: "#"
        },
        {
          title: "Ouverture des précommandes pour Luffy Gear 5",
          date: "2024-01-10",
          url: "#"
        }
      ],
      relatedFigures: [
        {
          id: 5,
          name: "Monkey D. Luffy - Gear 4",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
          manufacturer: "Bandai",
          price: "19800¥"
        },
        {
          id: 6,
          name: "Roronoa Zoro - Wano",
          image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
          manufacturer: "Bandai",
          price: "22800¥"
        },
        {
          id: 7,
          name: "Nico Robin - Wano",
          image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
          manufacturer: "Bandai",
          price: "21500¥"
        }
      ],
      comments: [
        {
          author: "OnePieceFan",
          date: "2024-02-15",
          content: "Le niveau de détail est incroyable ! J'adore particulièrement l'expression du visage qui capture parfaitement l'essence de Gear 5.",
          rating: 5
        },
        {
          author: "FigurinCollector",
          date: "2024-03-10",
          content: "Le rapport qualité-prix est excellent. Les finitions sont soignées et les accessoires bien pensés.",
          rating: 4
        }
      ]
    }
  ];

  const figure = figures.find(f => f.id === Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNav />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-80 bg-gray-200 rounded-xl"></div>
                <div className="h-40 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="space-y-8">
                <div className="h-60 bg-gray-200 rounded-xl"></div>
                <div className="h-40 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!figure) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNav />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link 
              to="/figurines"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} className="mr-1" />
              Retour à la liste
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Figurine non trouvée</h1>
            <p className="text-gray-600 mb-6">La figurine demandée n'existe pas dans notre base de données.</p>
            <Button asChild>
              <Link to="/figurines">Parcourir les figurines</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = `${figure.name} - ${figure.series}`;
  const mainImageUrl = figure.images[0];

  const handleDownloadImages = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Les images de la figurine seront téléchargées dans quelques instants.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <ScrollToTop />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <Link 
            to="/figurines"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour à la liste
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in">
            <FigurineHeader
              series={figure.series}
              name={figure.name}
              reference={figure.reference}
              id={figure.id}
              rating={4.7}
              releaseDate={figure.releaseDate}
              className="sticky top-20 z-10"
            />
            
            <FigurineCarousel name={figure.name} images={figure.images} />
            
            <div className="flex items-center justify-center gap-4 my-6">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={handleDownloadImages}
              >
                <Download size={16} />
                Télécharger les images
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Voir sur le site officiel
                </a>
              </Button>
            </div>
            
            <FigurineDescription description={figure.description} />
          </div>
          
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <FigurineQuickActions 
              name={figure.name} 
              shopUrl={figure.shops[0]?.url}
              imageUrl={mainImageUrl}
            />
            
            <FigurineSpecs specs={figure} />
            <FigurineShops shops={figure.shops} />
            <FigurineNews news={figure.news} />
            <SocialShare title={shareTitle} url={shareUrl} />
          </div>
        </div>

        <div className="mt-8 space-y-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <FigurineRelated figures={figure.relatedFigures} />
          <FigurineComments comments={figure.comments} />
        </div>
      </main>
    </div>
  );
};

export default FigurineDetails;
