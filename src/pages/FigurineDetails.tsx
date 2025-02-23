
import { useParams, Link } from "react-router-dom";
import { Star, Tag, Box, Calendar, Ruler, Info, List, ArrowLeft } from "lucide-react";
import MainNav from "../components/MainNav";

const FigurineDetails = () => {
  const { id } = useParams();
  
  const figures = [
    {
      id: 1,
      name: "Monkey D. Luffy - Gear 5",
      series: "One Piece",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      manufacturer: "Bandai",
      releaseDate: "2024-06",
      description: "Figurine représentant Luffy dans sa forme Gear 5, capturant toute la puissance et l'aspect comique de cette transformation.",
      height: "32cm",
      material: "PVC & ABS",
      scale: "1/7",
      weight: "800g",
      sculpteur: "Takashi Yamamoto",
      reference: "BAS55789",
      edition: "Standard",
      packaging: "Window box with blister",
      articleDate: "2023-12-15"
    },
    {
      id: 2,
      name: "Eren Yeager - Version Titan",
      series: "L'Attaque des Titans",
      image: "https://images.unsplash.com/photo-1501286353178-1ec871214838",
      manufacturer: "Good Smile Company",
      releaseDate: "2023-12",
      description: "Une représentation détaillée d'Eren dans sa forme de Titan, montrant toute la rage et la détermination du personnage.",
      height: "45cm",
      material: "PVC & ABS",
      scale: "1/4",
      weight: "2kg",
      sculpteur: "Shinji Kosaka",
      reference: "GSC94422",
      edition: "Deluxe",
      packaging: "Collector box with acrylic stand",
      articleDate: "2023-08-20"
    },
    {
      id: 3,
      name: "Saitama - Edition Limitée",
      series: "One Punch Man",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      manufacturer: "Kotobukiya",
      releaseDate: "2024-01",
      description: "Edition limitée de Saitama dans sa pose iconique, avec effets spéciaux et base personnalisée.",
      height: "25cm",
      material: "PVC & ABS",
      scale: "1/7",
      weight: "600g",
      sculpteur: "Keita Misonou",
      reference: "KOT77123",
      edition: "Limited",
      packaging: "Collector box with numbering",
      articleDate: "2023-11-05"
    },
    {
      id: 4,
      name: "Gojo Satoru",
      series: "Jujutsu Kaisen",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      manufacturer: "Bandai",
      releaseDate: "2024-07",
      description: "Gojo Satoru dans une pose dynamique, avec ses yeux révélés et des effets de son pouvoir Domain Expansion.",
      height: "24cm",
      material: "PVC & ABS",
      scale: "1/7",
      weight: "550g",
      sculpteur: "Yuki Ishiyama",
      reference: "BAS66321",
      edition: "Standard",
      packaging: "Window box",
      articleDate: "2024-01-10"
    }
  ];

  const figure = figures.find(f => f.id === Number(id));

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
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Figurine non trouvée</h1>
            <p className="text-gray-600">La figurine demandée n'existe pas dans notre base de données.</p>
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
            to="/figurines"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour à la liste
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Tag size={16} className="text-primary" />
                  <span className="text-sm text-gray-600">{figure.series}</span>
                </div>
                <h1 className="text-2xl font-bold mb-1">{figure.name}</h1>
                <p className="text-gray-600">Référence: {figure.reference}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="relative aspect-square rounded-lg overflow-hidden mb-6">
                  <img
                    src={figure.image}
                    alt={figure.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-sm text-gray-500 mb-2">Informations de base</h3>
                    <dl className="grid grid-cols-2 gap-2 text-sm">
                      <dt className="text-gray-500">ID</dt>
                      <dd className="font-medium">{figure.id}</dd>
                      <dt className="text-gray-500">Référence</dt>
                      <dd className="font-medium">{figure.reference}</dd>
                      <dt className="text-gray-500">Série</dt>
                      <dd className="font-medium">{figure.series}</dd>
                      <dt className="text-gray-500">Fabricant</dt>
                      <dd className="font-medium">{figure.manufacturer}</dd>
                    </dl>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-sm text-gray-500 mb-2">Dates</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-500">Sortie</dt>
                        <dd className="font-medium">
                          {new Date(figure.releaseDate).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long"
                          })}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-gray-500">Ajout BDD</dt>
                        <dd className="font-medium">
                          {new Date(figure.articleDate).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Description</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm">{figure.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500">Spécifications techniques</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-500 mb-2">Dimensions</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-500">Échelle</dt>
                          <dd className="font-medium">{figure.scale}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-500">Hauteur</dt>
                          <dd className="font-medium">{figure.height}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-500">Poids</dt>
                          <dd className="font-medium">{figure.weight}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-500 mb-2">Production</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-500">Sculpteur</dt>
                          <dd className="font-medium">{figure.sculpteur}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-500">Edition</dt>
                          <dd className="font-medium">{figure.edition}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-500">Matériaux</dt>
                          <dd className="font-medium">{figure.material}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-500 mb-2">Packaging</h4>
                    <p className="text-sm">{figure.packaging}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FigurineDetails;
