
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Info, MessageSquare, Newspaper, Package, ShoppingCart, Images, FileText, Tag } from "lucide-react";
import MainNav from "../components/MainNav";
import { FigurineHeader } from "../components/FigurineHeader";
import { FigurineCarousel } from "../components/FigurineCarousel";
import { FigurineSpecs } from "../components/FigurineSpecs";
import { FigurineShops } from "../components/FigurineShops";
import { FigurineNews } from "../components/FigurineNews";
import { FigurineRelated } from "../components/FigurineRelated";
import { FigurineComments } from "../components/FigurineComments";
import { FigurineDescription } from "../components/FigurineDescription";
import { SocialShare } from "../components/SocialShare";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TabsComponent } from "@/components/TabsComponent";

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
      description: "Figurine représentant Luffy dans sa forme Gear 5, capturant toute la puissance et l'aspect comique de cette transformation.",
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
        }
      ],
      comments: [
        {
          author: "OnePieceFan",
          date: "2024-02-15",
          content: "Le niveau de détail est incroyable !",
          rating: 5
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

  const handlePreorder = () => {
    toast({
      title: "Précommande ajoutée",
      description: `Vous serez notifié lorsque ${figure.name} sera disponible.`,
      duration: 3000,
    });
  };

  // Create tab content
  const tabsContent = [
    {
      id: "gallery",
      label: "Galerie",
      icon: <Images size={18} />,
      content: <FigurineCarousel name={figure.name} images={figure.images} className="shadow-none p-0" />
    },
    {
      id: "description",
      label: "Description",
      icon: <FileText size={18} />,
      content: <FigurineDescription description={figure.description} />
    },
    {
      id: "specs",
      label: "Spécifications",
      icon: <Info size={18} />,
      content: <FigurineSpecs specs={figure} />
    },
    {
      id: "shops",
      label: "Acheter",
      icon: <ShoppingCart size={18} />,
      content: (
        <div className="space-y-6">
          <FigurineShops shops={figure.shops} />
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Button onClick={handlePreorder} className="w-full">
              Activer l'alerte de disponibilité
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "news",
      label: "Actualités",
      icon: <Newspaper size={18} />,
      content: <FigurineNews news={figure.news} />
    },
    {
      id: "comments",
      label: "Commentaires",
      icon: <MessageSquare size={18} />,
      content: <FigurineComments comments={figure.comments} />
    },
    {
      id: "related",
      label: "Similaires",
      icon: <Tag size={18} />,
      content: <FigurineRelated figures={figure.relatedFigures} />
    }
  ];

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

        <FigurineHeader
          series={figure.series}
          name={figure.name}
          reference={figure.reference}
          id={figure.id}
          className="mb-8 animate-fade-in"
        />

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in">
          <TabsComponent 
            tabs={tabsContent}
            defaultValue="gallery"
            useHash={true}
            tabsListClassName="bg-gray-100 p-1 rounded-lg"
            tabsTriggerClassName="text-sm py-2 px-3 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <SocialShare title={shareTitle} url={shareUrl} />
        </div>
      </main>
    </div>
  );
};

export default FigurineDetails;
