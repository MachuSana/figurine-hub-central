
import MainNav from "../components/MainNav";
import { useState } from "react";
import { Star, Tag, Box, Calendar, Ruler, Info, List } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type SortOption = "date" | "scale" | "name" | "series";

const Figurines = () => {
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [selectedScales, setSelectedScales] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [selectedFigure, setSelectedFigure] = useState<typeof figures[0] | null>(null);

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
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
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

  // Fonction de tri des figurines
  const sortedFigures = [...figures].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.articleDate).getTime() - new Date(a.articleDate).getTime();
      case "scale":
        return a.scale.localeCompare(b.scale);
      case "name":
        return a.name.localeCompare(b.name);
      case "series":
        return a.series.localeCompare(b.series);
      default:
        return 0;
    }
  });

  // Fonction de filtrage des figurines
  const filteredFigures = sortedFigures.filter(figure => {
    const scale = selectedScales.length === 0 || 
      selectedScales.includes(figure.scale);

    const manufacturer = selectedManufacturers.length === 0 || 
      selectedManufacturers.includes(figure.manufacturer);

    const series = selectedSeries.length === 0 ||
      selectedSeries.includes(figure.series);

    return scale && manufacturer && series;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Base de données Figurines</h1>
            <p className="text-gray-500">Documentation et archivage des figurines</p>
          </div>
          <div className="flex gap-4">
            <select 
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="date">Date d'ajout</option>
              <option value="scale">Échelle</option>
              <option value="name">Nom</option>
              <option value="series">Série</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtres sur le côté */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Filtres</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Échelle</h3>
                  <div className="space-y-2">
                    {["1/4", "1/7"].map((scale) => (
                      <label key={scale} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="rounded text-primary"
                          checked={selectedScales.includes(scale)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedScales([...selectedScales, scale]);
                            } else {
                              setSelectedScales(selectedScales.filter(s => s !== scale));
                            }
                          }}
                        />
                        <span className="ml-2">{scale}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Fabricants</h3>
                  <div className="space-y-2">
                    {["Good Smile Company", "Kotobukiya", "Bandai"].map((manufacturer) => (
                      <label key={manufacturer} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="rounded text-primary"
                          checked={selectedManufacturers.includes(manufacturer)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedManufacturers([...selectedManufacturers, manufacturer]);
                            } else {
                              setSelectedManufacturers(selectedManufacturers.filter(m => m !== manufacturer));
                            }
                          }}
                        />
                        <span className="ml-2">{manufacturer}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Séries</h3>
                  <div className="space-y-2">
                    {["One Piece", "L'Attaque des Titans", "One Punch Man", "Jujutsu Kaisen"].map((series) => (
                      <label key={series} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="rounded text-primary"
                          checked={selectedSeries.includes(series)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSeries([...selectedSeries, series]);
                            } else {
                              setSelectedSeries(selectedSeries.filter(s => s !== series));
                            }
                          }}
                        />
                        <span className="ml-2">{series}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Liste de figurines */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-4">
              {filteredFigures.map((figure) => (
                <div
                  key={figure.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                  onClick={() => setSelectedFigure(figure)}
                >
                  <div className="flex items-center p-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={figure.image}
                        alt={figure.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <Tag size={16} className="text-primary" />
                        <span className="text-sm text-gray-600">{figure.series}</span>
                      </div>
                      <h3 className="font-bold">{figure.name}</h3>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <List size={16} className="text-gray-400" />
                          <span className="text-sm">Ref: {figure.reference}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Box size={16} className="text-gray-400" />
                          <span className="text-sm">{figure.scale}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date(figure.releaseDate).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long"
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Dialog open={!!selectedFigure} onOpenChange={(open) => !open && setSelectedFigure(null)}>
        <DialogContent className="max-w-3xl">
          {selectedFigure && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Tag size={16} className="text-primary" />
                      <span className="text-sm text-gray-600">{selectedFigure.series}</span>
                    </div>
                    <DialogTitle className="text-2xl mb-1">{selectedFigure.name}</DialogTitle>
                    <DialogDescription className="text-base">
                      Référence: {selectedFigure.reference}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={selectedFigure.image}
                      alt={selectedFigure.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-500 mb-2">Informations de base</h4>
                      <dl className="grid grid-cols-2 gap-2 text-sm">
                        <dt className="text-gray-500">ID</dt>
                        <dd className="font-medium">{selectedFigure.id}</dd>
                        <dt className="text-gray-500">Référence</dt>
                        <dd className="font-medium">{selectedFigure.reference}</dd>
                        <dt className="text-gray-500">Série</dt>
                        <dd className="font-medium">{selectedFigure.series}</dd>
                        <dt className="text-gray-500">Fabricant</dt>
                        <dd className="font-medium">{selectedFigure.manufacturer}</dd>
                      </dl>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-500 mb-2">Dates</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-500">Sortie</dt>
                          <dd className="font-medium">
                            {new Date(selectedFigure.releaseDate).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "long"
                            })}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-500">Ajout BDD</dt>
                          <dd className="font-medium">
                            {new Date(selectedFigure.articleDate).toLocaleDateString("fr-FR", {
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
                    <h3 className="font-medium mb-2 text-sm text-gray-500">Description</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm">{selectedFigure.description}</p>
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
                            <dd className="font-medium">{selectedFigure.scale}</dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-gray-500">Hauteur</dt>
                            <dd className="font-medium">{selectedFigure.height}</dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-gray-500">Poids</dt>
                            <dd className="font-medium">{selectedFigure.weight}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-sm text-gray-500 mb-2">Production</h4>
                        <dl className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <dt className="text-gray-500">Sculpteur</dt>
                            <dd className="font-medium">{selectedFigure.sculpteur}</dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-gray-500">Edition</dt>
                            <dd className="font-medium">{selectedFigure.edition}</dd>
                          </div>
                          <div className="flex items-center justify-between">
                            <dt className="text-gray-500">Matériaux</dt>
                            <dd className="font-medium">{selectedFigure.material}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-500 mb-2">Packaging</h4>
                      <p className="text-sm">{selectedFigure.packaging}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Figurines;
