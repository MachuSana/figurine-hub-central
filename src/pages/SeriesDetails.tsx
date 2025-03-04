
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Calendar, Info, Users, History, Star, Package } from "lucide-react";
import MainNav from "../components/MainNav";
import { FigurineRelated } from "../components/FigurineRelated";
import { FigurineDescription } from "../components/FigurineDescription";
import { Button } from "../components/ui/button";
import { SeriesHeader } from "../components/series/SeriesHeader";
import { SeriesQuickStats } from "../components/series/SeriesQuickStats";
import { SeriesFeatures } from "../components/series/SeriesFeatures";
import { SeriesSpecifications } from "../components/series/SeriesSpecifications";
import { Separator } from "../components/ui/separator";

const SeriesDetails = () => {
  const { name } = useParams();
  
  const series = [
    {
      id: "nendoroid",
      name: "Nendoroid",
      manufacturer: "Good Smile Company",
      description: "Les Nendoroids sont des figurines super-deformées avec des pièces interchangeables, permettant de recréer différentes expressions et poses des personnages. Chaque Nendoroid est soigneusement conçu pour capturer l'essence du personnage tout en maintenant le style unique et mignon de la gamme.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      startYear: "2006",
      totalReleases: 2000,
      scale: "10cm",
      price: "4000¥ - 7000¥",
      features: [
        "Pièces interchangeables",
        "Expressions faciales multiples",
        "Support inclus",
        "Accessoires variés",
        "Style super-deformé",
        "Haute qualité de finition"
      ],
      specifications: {
        material: "PVC & ABS",
        packaging: "Boîte fenêtre",
        articulations: "Points d'articulation multiples",
        base: "Support transparent inclus",
        instructions: "Manuel multilingue"
      },
      popularFigurines: [
        {
          id: 1,
          name: "Hatsune Miku",
          image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
          series: "Vocaloid",
          price: "5500¥",
          rating: 4.9,
          releaseDate: "2023-12"
        },
        {
          id: 2,
          name: "Monkey D. Luffy",
          image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
          series: "One Piece",
          price: "6000¥",
          rating: 4.8,
          releaseDate: "2024-01"
        },
        {
          id: 3,
          name: "Link",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
          series: "The Legend of Zelda",
          price: "5800¥",
          rating: 4.7,
          releaseDate: "2024-02"
        }
      ],
      upcomingReleases: [
        {
          name: "Eren Yeager",
          series: "Attack on Titan",
          releaseDate: "2024-05",
          price: "6500¥"
        },
        {
          name: "Jotaro Kujo",
          series: "JoJo's Bizarre Adventure",
          releaseDate: "2024-06",
          price: "6000¥"
        }
      ]
    },
    {
      id: "figma",
      name: "figma",
      manufacturer: "Max Factory",
      description: "Les figma sont des figurines articulées hautement détaillées qui permettent de recréer des poses dynamiques tout en conservant une excellente fidélité aux personnages originaux. La gamme est reconnue pour sa qualité de fabrication et sa grande mobilité.",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      startYear: "2008",
      totalReleases: 500,
      scale: "15cm",
      price: "7000¥ - 12000¥",
      features: [
        "Articulations multiples",
        "Grande mobilité",
        "Accessoires interchangeables",
        "Support articulé inclus",
        "Finition détaillée",
        "Matériaux de haute qualité"
      ],
      specifications: {
        material: "PVC & ABS",
        packaging: "Boîte fenêtre",
        articulations: "Plus de 20 points d'articulation",
        base: "Support articulé inclus",
        instructions: "Manuel multilingue"
      },
      popularFigurines: [
        {
          id: 4,
          name: "Saber",
          image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
          series: "Fate/stay night",
          price: "8500¥",
          rating: 4.9,
          releaseDate: "2023-11"
        }
      ],
      upcomingReleases: [
        {
          name: "Cloud Strife",
          series: "Final Fantasy VII",
          releaseDate: "2024-07",
          price: "9000¥"
        }
      ]
    }
  ];

  const currentSeries = series.find(s => s.id === name?.toLowerCase());

  if (!currentSeries) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNav />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link 
              to="/series"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} className="mr-1" />
              Retour aux gammes
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Gamme non trouvée</h1>
            <p className="text-gray-600">La gamme demandée n'existe pas dans notre base de données.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <SeriesHeader 
          name={currentSeries.name}
          manufacturer={currentSeries.manufacturer}
          image={currentSeries.image}
          price={currentSeries.price}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <FigurineDescription description={currentSeries.description} />
            <SeriesQuickStats 
              startYear={currentSeries.startYear}
              totalReleases={currentSeries.totalReleases}
              scale={currentSeries.scale}
            />
            <SeriesFeatures features={currentSeries.features} />
            <SeriesSpecifications specifications={currentSeries.specifications} />
          </div>

          <div className="space-y-8">
            {/* Popular figurines teaser */}
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star size={20} className="text-primary" />
                Figurines populaires
              </h2>
              <Separator className="mb-4 bg-gray-100" />
              <div className="space-y-4">
                {currentSeries.popularFigurines.slice(0, 3).map((fig, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <img 
                      src={fig.image} 
                      alt={fig.name}
                      className="w-12 h-12 object-cover rounded-md" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{fig.name}</div>
                      <div className="text-sm text-gray-500">{fig.series}</div>
                    </div>
                    <div className="text-primary font-medium">{fig.price}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Voir toutes les figurines
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            {/* Upcoming releases */}
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-primary" />
                Prochaines sorties
              </h2>
              <Separator className="mb-4 bg-gray-100" />
              <div className="space-y-4">
                {currentSeries.upcomingReleases.map((release, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 flex justify-between items-center hover:bg-primary/5 transition-colors"
                  >
                    <div>
                      <div className="font-medium">{release.name}</div>
                      <div className="text-sm text-gray-500">{release.series}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-primary">{release.price}</div>
                      <div className="text-sm text-gray-500">{release.releaseDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional info links */}
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold mb-4">En savoir plus</h2>
              <Separator className="mb-4 bg-gray-100" />
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users size={18} className="mr-2" />
                  À propos du fabricant
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <History size={18} className="mr-2" />
                  Histoire de la gamme
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Info size={18} className="mr-2" />
                  Guide d'achat
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Popular figurines full section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Figurines populaires</h2>
            <Button variant="outline">
              Voir toutes
              <ArrowRight size={16} />
            </Button>
          </div>
          <FigurineRelated
            figures={currentSeries.popularFigurines.map(fig => ({
              id: fig.id,
              name: fig.name,
              image: fig.image,
              manufacturer: currentSeries.manufacturer,
              price: fig.price
            }))}
          />
        </div>
      </main>
    </div>
  );
};

export default SeriesDetails;
