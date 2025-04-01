
import { useState } from "react";
import MainNav from "../components/MainNav";
import { Card, CardContent } from "@/components/ui/card";
import { format, addMonths } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Sample data - in a real app, this would come from an API
const releaseData = [
  {
    id: 1,
    name: "Rem: Winter Clothes Ver.",
    character: "Rem",
    series: "Re:Zero − Starting Life in Another World",
    manufacturer: "Good Smile Company",
    releaseDate: new Date(2025, 2, 15), // March 15, 2025
    price: "19,500¥",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    dimensions: "240mm (H) x 120mm (W) x 120mm (D)"
  },
  {
    id: 2,
    name: "Monkey D. Luffy: Wano Country Ver.",
    character: "Monkey D. Luffy",
    series: "One Piece",
    manufacturer: "MegaHouse",
    releaseDate: new Date(2025, 2, 12), // March 12, 2025
    price: "18,700¥",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    dimensions: "220mm (H) x 150mm (W) x 140mm (D)"
  },
  {
    id: 3,
    name: "Miku Hatsune: Magical Mirai 2023",
    character: "Miku Hatsune",
    series: "Vocaloid",
    manufacturer: "Good Smile Company",
    releaseDate: new Date(2025, 2, 18), // March 18, 2025
    price: "16,500¥",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    dimensions: "240mm (H) x 150mm (W) x 120mm (D)"
  },
  {
    id: 4,
    name: "Eren Yaeger: Final Season Ver.",
    character: "Eren Yaeger",
    series: "Attack on Titan",
    manufacturer: "Kotobukiya",
    releaseDate: new Date(2025, 2, 20), // March 20, 2025
    price: "22,000¥",
    image: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8",
    dimensions: "200mm (H) x 260mm (W) x 230mm (D)"
  },
  {
    id: 5,
    name: "Nezuko Kamado: Blood Demon Art",
    character: "Nezuko Kamado",
    series: "Demon Slayer",
    manufacturer: "Aniplex",
    releaseDate: new Date(2025, 2, 23), // March 23, 2025
    price: "23,800¥",
    image: "https://images.unsplash.com/photo-1508693926297-1d61f13ab8b8",
    dimensions: "210mm (H) x 182mm (W) x 140mm (D)"
  },
  {
    id: 6,
    name: "Saitama: Serious Punch",
    character: "Saitama",
    series: "One Punch Man",
    manufacturer: "Tsume Art",
    releaseDate: new Date(2025, 2, 27), // March 27, 2025
    price: "19,800¥",
    image: "https://images.unsplash.com/photo-1501432377862-3d0432b87a14",
    dimensions: "270mm (H) x 254mm (W) x 240mm (D)"
  },
  {
    id: 7,
    name: "Violet Evergarden: Memories",
    character: "Violet Evergarden",
    series: "Violet Evergarden",
    manufacturer: "Kotobukiya",
    releaseDate: new Date(2025, 2, 30), // March 30, 2025
    price: "25,800¥",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    dimensions: "235mm (H) x 150mm (W) x 180mm (D)"
  }
];

const monthNames = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const ReleaseSchedule = () => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(2025, 2, 1)); // March 2025
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter releases for the selected month
  const releasesForSelectedMonth = releaseData.filter(release => 
    release.releaseDate.getMonth() === selectedMonth.getMonth() &&
    release.releaseDate.getFullYear() === selectedMonth.getFullYear() &&
    (
      release.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.character.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  const navigateMonth = (direction: "next" | "prev") => {
    setSelectedMonth(prev => addMonths(prev, direction === "next" ? 1 : -1));
  };
  
  return (
    <div className="min-h-screen bg-white">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back button and title */}
        <div className="mb-6">
          <Link to="/news" className="text-gray-600 flex items-center gap-1 mb-2 text-sm hover:underline">
            <ArrowLeft size={14} />
            <span>Retour aux actualités</span>
          </Link>
          
          <h1 className="text-3xl font-bold">Sorties de {format(selectedMonth, 'MMMM yyyy', { locale: fr })}</h1>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <span>{format(new Date(), 'dd MMMM yyyy', { locale: fr })}</span>
            <span>•</span>
            <span>Figurines</span>
            <span>•</span>
            <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs">News</span>
          </div>
        </div>
        
        {/* Banner image */}
        <div className="mb-8">
          <img
            src="public/lovable-uploads/bb62b038-1c21-49e0-ad4c-14fec882c03e.png"
            alt="Planning des sorties figurines"
            className="w-full rounded-lg object-cover max-h-[300px]"
          />
        </div>
        
        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Figurines en sortie ce mois-ci</h2>
          <p className="text-gray-700">
            Découvrez toutes les figurines sorties et éditées qui sortent en mars 2025. Utilisez les filtres ci-dessous pour 
            trouver facilement les figurines qui vous intéressent.
          </p>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Série</label>
            <Input
              id="search"
              placeholder="Toutes les séries"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-1">Fabricant</label>
            <Select>
              <SelectTrigger id="manufacturer">
                <SelectValue placeholder="Tous les fabricants" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les fabricants</SelectItem>
                <SelectItem value="gsc">Good Smile Company</SelectItem>
                <SelectItem value="megahouse">MegaHouse</SelectItem>
                <SelectItem value="kotobukiya">Kotobukiya</SelectItem>
                <SelectItem value="aniplex">Aniplex</SelectItem>
                <SelectItem value="tsume">Tsume Art</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Month heading with figurine count */}
        <div className="border-b pb-4 mb-6">
          <h3 className="text-xl font-semibold">
            Mars 2025 ({releasesForSelectedMonth.length} figurines)
          </h3>
        </div>
        
        {/* Figurine list */}
        <div className="space-y-8">
          {releasesForSelectedMonth.map((figurine) => (
            <div key={figurine.id} className="grid grid-cols-[auto_1fr] gap-6 border-b pb-8">
              {/* Release date */}
              <div className="text-center">
                <div className="bg-gray-50 border rounded-md p-3 flex flex-col items-center">
                  <span className="text-sm text-gray-500">{format(figurine.releaseDate, 'MMM', { locale: fr })}</span>
                  <span className="text-2xl font-bold">{format(figurine.releaseDate, 'dd')}</span>
                </div>
              </div>
              
              {/* Figurine details */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                <img 
                  src={figurine.image} 
                  alt={figurine.name}
                  className="rounded-md object-cover w-full aspect-square"
                />
                
                <div>
                  <h3 className="text-xl font-semibold mb-1">{figurine.name}</h3>
                  <p className="text-gray-600 mb-4">{figurine.character} • {figurine.series}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <p className="text-gray-500 text-sm">Fabricant</p>
                      <p>{figurine.manufacturer}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm">Dimensions</p>
                      <p>{figurine.dimensions}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm">Prix</p>
                      <p className="font-medium">{figurine.price}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm">Date de sortie</p>
                      <p>{format(figurine.releaseDate, 'dd MMMM yyyy', { locale: fr })}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ReleaseSchedule;
