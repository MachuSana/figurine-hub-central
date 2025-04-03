
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainNav from "@/components/MainNav";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Filter, Tag, Building, BadgeJapan } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { NewsCategory } from "@/components/NewsCategory";

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

  // Grouper les figurines par date de sortie
  const groupedByDate = filteredFigurines.reduce((acc, figurine) => {
    if (!acc[figurine.releaseDate]) {
      acc[figurine.releaseDate] = [];
    }
    acc[figurine.releaseDate].push(figurine);
    return acc;
  }, {} as Record<string, typeof releaseData.figurines>);

  // Trier les dates
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
    return new Date(a.split(' ')[1] + ' ' + a.split(' ')[0] + ' 2025').getTime() - 
           new Date(b.split(' ')[1] + ' ' + b.split(' ')[0] + ' 2025').getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        {/* Bannière et titre */}
        <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
          <div className="h-64 md:h-80 w-full">
            <img 
              src={releaseData.banner} 
              alt={releaseData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-6 left-6 md:left-10 text-white max-w-xl">
            <Badge variant="secondary" className="mb-3 text-xs font-medium py-1 px-3 bg-primary/90 hover:bg-primary">
              Planning des sorties
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-md">{releaseData.title}</h1>
            <p className="flex items-center gap-2 text-white/90 text-sm md:text-base">
              <Calendar size={16} className="text-primary-foreground" />
              Mis à jour le {releaseData.lastUpdated}
            </p>
          </div>
        </div>
        
        {/* Description */}
        <div className="max-w-4xl mx-auto mb-8 bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-700 text-lg leading-relaxed">{releaseData.description}</p>
        </div>
        
        {/* Filtres et recherche */}
        <Card className="mb-8 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Filter size={18} className="text-primary" />
              Filtrer les figurines
            </CardTitle>
            <CardDescription>
              Affinez votre recherche pour trouver les figurines qui vous intéressent
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Rechercher par nom, personnage..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select onValueChange={(value) => setSelectedSeries(value === "all" ? null : value)}>
              <SelectTrigger className="flex gap-2 items-center">
                <Tag size={16} className="text-gray-400" />
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
              <SelectTrigger className="flex gap-2 items-center">
                <Building size={16} className="text-gray-400" />
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
              <SelectTrigger className="flex gap-2 items-center">
                <BadgeJapan size={16} className="text-gray-400" />
                <SelectValue placeholder="Gamme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les gammes</SelectItem>
                {getAllLines().map(line => (
                  <SelectItem key={line} value={line}>{line}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        {/* Liste des figurines */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calendar size={20} className="mr-2 text-primary" />
            {filteredFigurines.length} figurine{filteredFigurines.length > 1 ? 's' : ''} pour {releaseData.title.toLowerCase()}
          </h2>
          
          {filteredFigurines.length > 0 ? (
            <div className="space-y-10">
              {sortedDates.map(date => (
                <NewsCategory 
                  key={date} 
                  title={date}
                  icon={<Calendar size={20} />}
                >
                  <div className="grid grid-cols-1 gap-6 mt-2">
                    {groupedByDate[date].map(figurine => (
                      <Card key={figurine.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 h-64 md:h-auto bg-gray-100 relative overflow-hidden">
                            <img 
                              src={figurine.image} 
                              alt={figurine.name} 
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <Badge className="absolute top-2 left-2 bg-white/80 text-primary hover:bg-white">
                              {figurine.series}
                            </Badge>
                          </div>
                          
                          <CardContent className="flex-1 p-6">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{figurine.name}</h3>
                                <p className="text-sm text-gray-600 mb-4">Personnage: {figurine.character}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-4">
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Fabricant</p>
                                    <p className="font-medium">{figurine.manufacturer}</p>
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
                              
                              <div className="md:text-right mt-6 md:mt-0">
                                <div className="inline-block bg-primary/10 rounded-lg px-6 py-3 mb-3">
                                  <p className="text-sm text-gray-600">Prix</p>
                                  <p className="text-2xl font-bold text-primary">{figurine.price.toLocaleString()} ¥</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-xs py-1 px-3">
                                {figurine.series}
                              </Badge>
                              <Badge variant="outline" className="text-xs py-1 px-3">
                                {figurine.manufacturer}
                              </Badge>
                              <Badge variant="outline" className="text-xs py-1 px-3">
                                {figurine.line}
                              </Badge>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </NewsCategory>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xl font-medium text-gray-700 mb-2">Aucune figurine trouvée</p>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReleaseScheduleDetail;
