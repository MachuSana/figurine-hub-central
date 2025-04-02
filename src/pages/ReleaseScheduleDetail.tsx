
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainNav from "@/components/MainNav";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Filter } from "lucide-react";

// Données fictives pour les figurines du mois
const monthlyReleasesData = {
  "mars-2025": {
    title: "Sorties de mars 2025",
    banner: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600",
    lastUpdated: "18 mars 2025",
    description: "Découvrez toutes les figurines prévues pour le mois de mars 2025. Ce planning comprend les sorties confirmées par les fabricants et peut être sujet à des modifications.",
    figurines: [
      {
        id: 101,
        name: "Rem: Winter Clothes Ver.",
        character: "Rem",
        image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=500",
        series: "Re:Zero",
        manufacturer: "Good Smile Company",
        line: "Pop Up Parade",
        dimensions: "17 × 15 × 12 cm",
        price: 16500,
        releaseDate: "5 mars 2025",
      },
      {
        id: 102,
        name: "Goku Ultra Instinct",
        character: "Son Goku",
        image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=500",
        series: "Dragon Ball Super",
        manufacturer: "Bandai",
        line: "S.H.Figuarts",
        dimensions: "16 × 10 × 8 cm",
        price: 8800,
        releaseDate: "12 mars 2025",
      },
      {
        id: 103,
        name: "Levi Cleaning Ver.",
        character: "Levi Ackerman",
        image: "/placeholder.svg",
        series: "L'Attaque des Titans",
        manufacturer: "Kotobukiya",
        line: "ARTFX J",
        dimensions: "24 × 18 × 14 cm",
        price: 22000,
        releaseDate: "15 mars 2025",
      },
      {
        id: 104,
        name: "Tanjiro Combat Form",
        character: "Tanjiro Kamado",
        image: "/placeholder.svg",
        series: "Demon Slayer",
        manufacturer: "Aniplex",
        line: "DX",
        dimensions: "22 × 19 × 15 cm",
        price: 28500,
        releaseDate: "20 mars 2025",
      },
      {
        id: 105,
        name: "Asuka Racing Ver.",
        character: "Asuka Langley",
        image: "/placeholder.svg",
        series: "Evangelion",
        manufacturer: "Alter",
        line: "Racing Queens",
        dimensions: "25 × 12 × 12 cm",
        price: 24000,
        releaseDate: "25 mars 2025",
      },
      {
        id: 106,
        name: "Nami Wano Ver.",
        character: "Nami",
        image: "/placeholder.svg",
        series: "One Piece",
        manufacturer: "MegaHouse",
        line: "Portrait of Pirates",
        dimensions: "22 × 10 × 10 cm",
        price: 15800,
        releaseDate: "28 mars 2025",
      }
    ]
  },
  "avril-2025": {
    title: "Sorties d'avril 2025",
    banner: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600",
    lastUpdated: "15 mars 2025",
    description: "Voici un aperçu préliminaire des figurines prévues pour avril 2025. Cette liste sera mise à jour régulièrement au fur et à mesure des annonces officielles.",
    figurines: [
      {
        id: 201,
        name: "Saber Kimono Ver.",
        character: "Artoria Pendragon",
        image: "/placeholder.svg",
        series: "Fate/Stay Night",
        manufacturer: "Aniplex",
        line: "Limited",
        dimensions: "24 × 15 × 14 cm",
        price: 29800,
        releaseDate: "5 avril 2025",
      },
      {
        id: 202,
        name: "Midoriya Hero Costume Ver.",
        character: "Izuku Midoriya",
        image: "/placeholder.svg",
        series: "My Hero Academia",
        manufacturer: "Kotobukiya",
        line: "ARTFX J",
        dimensions: "27 × 16 × 15 cm",
        price: 19800,
        releaseDate: "12 avril 2025",
      }
    ]
  }
};

// Extraire les séries, fabricants et gammes uniques pour les filtres
const getAllSeries = () => {
  const allSeries: string[] = [];
  
  Object.values(monthlyReleasesData).forEach(monthData => {
    monthData.figurines.forEach(fig => {
      if (!allSeries.includes(fig.series)) {
        allSeries.push(fig.series);
      }
    });
  });
  
  return allSeries.sort();
};

const getAllManufacturers = () => {
  const allManufacturers: string[] = [];
  
  Object.values(monthlyReleasesData).forEach(monthData => {
    monthData.figurines.forEach(fig => {
      if (!allManufacturers.includes(fig.manufacturer)) {
        allManufacturers.push(fig.manufacturer);
      }
    });
  });
  
  return allManufacturers.sort();
};

const getAllLines = () => {
  const allLines: string[] = [];
  
  Object.values(monthlyReleasesData).forEach(monthData => {
    monthData.figurines.forEach(fig => {
      if (!allLines.includes(fig.line)) {
        allLines.push(fig.line);
      }
    });
  });
  
  return allLines.sort();
};

const ReleaseScheduleDetail = () => {
  const { month } = useParams<{ month: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  
  // Si le mois n'existe pas dans les données, on utilise le premier mois disponible
  const currentMonthKey = month && monthlyReleasesData[month] 
    ? month 
    : Object.keys(monthlyReleasesData)[0];
  
  const releaseData = monthlyReleasesData[currentMonthKey];
  
  // Filtrer les figurines en fonction des critères de recherche
  const filteredFigurines = releaseData.figurines.filter(figurine => {
    const matchesSearch = figurine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         figurine.character.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         figurine.series.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeries = selectedSeries ? figurine.series === selectedSeries : true;
    const matchesManufacturer = selectedManufacturer ? figurine.manufacturer === selectedManufacturer : true;
    const matchesLine = selectedLine ? figurine.line === selectedLine : true;
    
    return matchesSearch && matchesSeries && matchesManufacturer && matchesLine;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        {/* Bannière et titre */}
        <div className="relative mb-8">
          <div className="h-64 w-full rounded-xl overflow-hidden">
            <img 
              src={releaseData.banner} 
              alt={releaseData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{releaseData.title}</h1>
            <p className="flex items-center gap-2 text-white/80">
              <Calendar size={16} />
              Mis à jour le {releaseData.lastUpdated}
            </p>
          </div>
        </div>
        
        {/* Description */}
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-gray-700 text-lg">{releaseData.description}</p>
        </div>
        
        {/* Filtres et recherche */}
        <Card className="mb-8 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={18} />
              <h2 className="text-lg font-semibold">Filtrer les figurines</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select onValueChange={(value) => setSelectedSeries(value === "all" ? null : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Série/Licence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les séries</SelectItem>
                  {getAllSeries().map(series => (
                    <SelectItem key={series} value={series}>{series}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select onValueChange={(value) => setSelectedManufacturer(value === "all" ? null : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Fabricant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les fabricants</SelectItem>
                  {getAllManufacturers().map(manufacturer => (
                    <SelectItem key={manufacturer} value={manufacturer}>{manufacturer}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select onValueChange={(value) => setSelectedLine(value === "all" ? null : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Gamme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les gammes</SelectItem>
                  {getAllLines().map(line => (
                    <SelectItem key={line} value={line}>{line}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Liste des figurines */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">
            {filteredFigurines.length} figurine{filteredFigurines.length > 1 ? 's' : ''} pour {releaseData.title.toLowerCase()}
          </h2>
          
          {filteredFigurines.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredFigurines.map(figurine => (
                <Card key={figurine.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-64 md:h-auto bg-gray-100">
                      <img 
                        src={figurine.image} 
                        alt={figurine.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{figurine.name}</h3>
                          <p className="text-sm text-gray-600 mb-4">Personnage: {figurine.character}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Série</p>
                              <p>{figurine.series}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Fabricant</p>
                              <p>{figurine.manufacturer}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Gamme</p>
                              <p>{figurine.line}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Dimensions</p>
                              <p>{figurine.dimensions}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:text-right mt-4 md:mt-0">
                          <div className="inline-block bg-primary/10 rounded-lg px-4 py-2 mb-2">
                            <p className="text-sm text-gray-600">Prix</p>
                            <p className="text-xl font-bold text-primary">{figurine.price.toLocaleString()} ¥</p>
                          </div>
                          <p className="flex items-center gap-1 justify-end text-sm text-gray-600">
                            <Calendar size={14} />
                            Sortie le {figurine.releaseDate}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucune figurine trouvée avec ces critères</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReleaseScheduleDetail;
