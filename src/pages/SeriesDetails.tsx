
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Package, ArrowRight, Calendar } from "lucide-react";
import MainNav from "../components/MainNav";
import { FigurineRelated } from "../components/FigurineRelated";

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
        <div className="mb-8">
          <Link 
            to="/series"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour aux gammes
          </Link>
        </div>

        {/* En-tête */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-64">
            <img
              src={currentSeries.image}
              alt={currentSeries.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">{currentSeries.manufacturer}</div>
              <h1 className="text-3xl font-bold">{currentSeries.name}</h1>
            </div>

            <p className="text-xl text-gray-600 mb-8">{currentSeries.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Calendar size={24} className="text-primary" />
                <div>
                  <div className="text-sm text-gray-500">Création</div>
                  <div className="font-medium">{currentSeries.startYear}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package size={24} className="text-primary" />
                <div>
                  <div className="text-sm text-gray-500">Figurines</div>
                  <div className="font-medium">{currentSeries.totalReleases}+</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star size={24} className="text-primary" />
                <div>
                  <div className="text-sm text-gray-500">Taille moyenne</div>
                  <div className="font-medium">{currentSeries.scale}</div>
                </div>
              </div>
            </div>

            <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg inline-block">
              {currentSeries.price}
            </div>
          </div>
        </div>

        {/* Caractéristiques */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Caractéristiques</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentSeries.features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg px-4 py-3 text-sm"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Spécifications */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Spécifications techniques</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(currentSeries.specifications).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4">
                <dt className="text-gray-500 text-sm mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Figurines populaires */}
        <div className="mt-8">
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

        {/* Prochaines sorties */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Prochaines sorties</h2>
          <div className="space-y-4">
            {currentSeries.upcomingReleases.map((release, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
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
      </main>
    </div>
  );
};

export default SeriesDetails;
