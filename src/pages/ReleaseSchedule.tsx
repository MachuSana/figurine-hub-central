
import { useState } from "react";
import MainNav from "../components/MainNav";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { format, addMonths, startOfMonth, getDaysInMonth, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, ArrowRight, CalendarDays, List, Calendar as CalendarIcon, Info, Clock, Package, Tag } from "lucide-react";

// Sample data - in a real app, this would come from an API
const releaseData = [
  {
    id: 1,
    name: "Monkey D. Luffy - Gear 5",
    manufacturer: "Bandai",
    series: "One Piece",
    releaseDate: new Date(2024, 5, 15), // June 15, 2024
    price: "24800¥",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "Cette figurine représente Luffy dans sa forme ultime, le Gear 5. Avec une finition détaillée et une pose dynamique, elle capture parfaitement l'essence du personnage dans ce moment emblématique de la série."
  },
  {
    id: 2,
    name: "Rei Ayanami - EVA 01",
    manufacturer: "Good Smile Company",
    series: "Evangelion",
    releaseDate: new Date(2024, 6, 20), // July 20, 2024
    price: "18500¥",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    description: "Cette figurine de Rei Ayanami présente le personnage avec son Eva-01. Les détails de la combinaison et l'expression du visage sont soigneusement reproduits, offrant aux collectionneurs une pièce fidèle à l'anime."
  },
  {
    id: 3,
    name: "Gojo Satoru - Jujutsu Kaisen",
    manufacturer: "MegaHouse",
    series: "Jujutsu Kaisen",
    releaseDate: new Date(2024, 5, 10), // June 10, 2024
    price: "22000¥",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    description: "La figurine de Gojo Satoru capture l'exorciste le plus puissant de Jujutsu Kaisen dans une pose caractéristique. Les détails comme son bandeau sur les yeux et son aura d'énergie occulte sont particulièrement bien rendus."
  },
  {
    id: 4,
    name: "Eren Yaeger - Final Season",
    manufacturer: "Kotobukiya",
    series: "Attack on Titan",
    releaseDate: new Date(2024, 7, 5), // August 5, 2024
    price: "19800¥",
    image: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8",
    description: "Cette version d'Eren de la saison finale présente le personnage dans son apparence mûre, avec une expression déterminée. La base est conçue pour recréer une scène iconique de la bataille finale."
  },
  {
    id: 5,
    name: "Asuka Langley - Test Plug Suit",
    manufacturer: "Alter",
    series: "Evangelion",
    releaseDate: new Date(2024, 5, 25), // June 25, 2024
    price: "21500¥",
    image: "https://images.unsplash.com/photo-1508693926297-1d61f13ab8b8",
    description: "La figurine d'Asuka en combinaison de test présente un niveau de détail exceptionnel, des motifs de la combinaison aux accessoires inclus. La peinture de haute qualité fait ressortir les couleurs vives caractéristiques du personnage."
  },
  {
    id: 6,
    name: "Saitama - Serious Mode",
    manufacturer: "Max Factory",
    series: "One Punch Man",
    releaseDate: new Date(2024, 6, 30), // July 30, 2024
    price: "18000¥",
    image: "https://images.unsplash.com/photo-1501432377862-3d0432b87a14",
    description: "Cette figurine capture Saitama dans son rare 'mode sérieux', avec une expression faciale intense et une pose prête au combat. La figurine inclut des effets spéciaux pour représenter la puissance de son poing dévastateur."
  }
];

// Group releases by month
const groupReleasesByMonth = (releases: typeof releaseData) => {
  const grouped: Record<string, typeof releaseData> = {};
  
  releases.forEach(release => {
    const monthKey = format(release.releaseDate, "yyyy-MM");
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(release);
  });
  
  return grouped;
};

// Get releases for a specific date
const getReleasesForDate = (date: Date, releases: typeof releaseData) => {
  return releases.filter(release => isSameDay(release.releaseDate, date));
};

const ReleaseSchedule = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [view, setView] = useState<"calendar" | "list" | "month">("list");
  const [selectedFigurine, setSelectedFigurine] = useState<typeof releaseData[0] | null>(null);
  
  const groupedReleases = groupReleasesByMonth(releaseData);
  const monthsList = Object.keys(groupedReleases).map(key => {
    const [year, month] = key.split("-").map(Number);
    return new Date(year, month - 1);
  }).sort((a, b) => a.getTime() - b.getTime());
  
  // Get the days in the selected month that have releases
  const daysWithReleases = releaseData
    .filter(release => 
      release.releaseDate.getMonth() === selectedMonth.getMonth() &&
      release.releaseDate.getFullYear() === selectedMonth.getFullYear()
    )
    .map(release => release.releaseDate);
  
  // Get all releases for the selected month
  const releasesForSelectedMonth = releaseData.filter(release => 
    release.releaseDate.getMonth() === selectedMonth.getMonth() &&
    release.releaseDate.getFullYear() === selectedMonth.getFullYear()
  );

  const navigateMonth = (direction: "next" | "prev") => {
    setSelectedMonth(prev => addMonths(prev, direction === "next" ? 1 : -1));
  };
  
  const formatDate = (dateString: Date) => {
    return format(dateString, "dd MMMM yyyy", { locale: fr });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/" className="flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
          
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Planning des sorties</h1>
            <p className="text-lg text-gray-600 mb-4">
              Retrouvez toutes les figurines à venir dans les prochains mois et planifiez vos achats en conséquence.
            </p>
            
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <CalendarDays size={16} className="mr-2" /> 
              Dernière mise à jour: {formatDate(new Date())}
            </div>
          </div>
          
          <div className="mb-8">
            <Tabs value={view} onValueChange={(v) => setView(v as "calendar" | "list" | "month")} className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="list" className="flex items-center gap-1">
                    <List size={16} />
                    <span>Liste</span>
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="flex items-center gap-1">
                    <CalendarDays size={16} />
                    <span>Calendrier</span>
                  </TabsTrigger>
                  <TabsTrigger value="month" className="flex items-center gap-1">
                    <CalendarIcon size={16} />
                    <span>Mois</span>
                  </TabsTrigger>
                </TabsList>
                
                {view === "month" && (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => navigateMonth("prev")}
                    >
                      <ArrowLeft size={16} />
                    </Button>
                    <span className="flex items-center px-2 font-medium">
                      {format(selectedMonth, 'MMMM yyyy', { locale: fr })}
                    </span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => navigateMonth("next")}
                    >
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <TabsContent value="list" className="m-0">
                  <div className="p-6">
                    <div className="prose max-w-none">
                      <p>
                        Découvrez ci-dessous toutes les figurines prévues pour les prochains mois. 
                        Cliquez sur une figurine pour voir plus de détails.
                      </p>
                    </div>
                    
                    <div className="mt-8 space-y-12">
                      {monthsList.map(month => (
                        <div key={format(month, 'yyyy-MM')} className="space-y-6">
                          <h2 className="text-2xl font-bold border-b pb-2">
                            {format(month, 'MMMM yyyy', { locale: fr })}
                          </h2>
                          
                          <div className="space-y-6">
                            {groupedReleases[format(month, 'yyyy-MM')].map(release => (
                              <div 
                                key={release.id} 
                                className={`border rounded-lg transition-all ${
                                  selectedFigurine?.id === release.id 
                                    ? 'border-primary ring-1 ring-primary' 
                                    : 'hover:border-primary/50'
                                }`}
                                onClick={() => setSelectedFigurine(
                                  selectedFigurine?.id === release.id ? null : release
                                )}
                              >
                                <div className="p-4 cursor-pointer">
                                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <img 
                                      src={release.image} 
                                      alt={release.name}
                                      className="w-full md:w-32 h-32 object-cover rounded-md"
                                    />
                                    
                                    <div className="flex-grow">
                                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                        <div>
                                          <h3 className="text-lg font-semibold">{release.name}</h3>
                                          
                                          <div className="flex flex-wrap gap-y-1 gap-x-3 text-sm text-gray-600 mt-1">
                                            <div className="flex items-center">
                                              <Tag size={14} className="mr-1.5 text-gray-400" />
                                              <span>{release.series}</span>
                                            </div>
                                            
                                            <div className="flex items-center">
                                              <Package size={14} className="mr-1.5 text-gray-400" />
                                              <span>{release.manufacturer}</span>
                                            </div>
                                            
                                            <div className="flex items-center">
                                              <Clock size={14} className="mr-1.5 text-gray-400" />
                                              <span>{formatDate(release.releaseDate)}</span>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div className="text-lg font-medium text-primary">
                                          {release.price}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {selectedFigurine?.id === release.id && (
                                    <div className="mt-4 pt-4 border-t animate-fade-in">
                                      <p className="text-gray-700">{release.description}</p>
                                      
                                      <div className="mt-4 flex justify-end">
                                        <Button asChild>
                                          <Link to={`/figurines/${release.id}`}>
                                            Voir la fiche
                                          </Link>
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="calendar" className="m-0">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/2 flex flex-col items-center">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => newDate && setDate(newDate)}
                          className="rounded-md border"
                          modifiers={{
                            hasRelease: daysWithReleases,
                          }}
                          modifiersStyles={{
                            hasRelease: { 
                              fontWeight: 'bold', 
                              textDecoration: 'underline',
                              color: 'var(--primary)' 
                            }
                          }}
                        />
                        
                        <div className="text-sm text-muted-foreground mt-4 text-center">
                          Les dates en surbrillance indiquent des sorties prévues.
                        </div>
                      </div>
                      
                      <div className="md:w-1/2">
                        <Card className="h-full">
                          <CardHeader>
                            <CardTitle className="text-lg">
                              Sorties du {formatDate(date)}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {getReleasesForDate(date, releaseData).length > 0 ? (
                              <div className="space-y-4">
                                {getReleasesForDate(date, releaseData).map(release => (
                                  <Link 
                                    to={`/figurines/${release.id}`}
                                    key={release.id} 
                                    className="flex border rounded-lg p-4 hover:shadow-md transition-all"
                                  >
                                    <img 
                                      src={release.image} 
                                      alt={release.name}
                                      className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div className="ml-4">
                                      <h3 className="font-medium">{release.name}</h3>
                                      <div className="text-sm text-gray-600 mt-1">
                                        {release.manufacturer} • {release.series}
                                      </div>
                                      <div className="text-sm font-medium text-primary mt-1">
                                        {release.price}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-8 text-center">
                                <Info size={48} className="text-gray-300 mb-2" />
                                <p className="text-gray-500">Pas de sortie à cette date</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="month" className="m-0">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                      {Array.from({ length: getDaysInMonth(selectedMonth) }).map((_, i) => {
                        const day = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), i + 1);
                        const dayReleases = getReleasesForDate(day, releaseData);
                        const hasReleases = dayReleases.length > 0;
                        
                        return (
                          <div 
                            key={i}
                            className={`border rounded-lg p-2 ${hasReleases ? 'bg-white shadow-sm' : 'bg-gray-50'}`}
                          >
                            <div className="text-sm font-medium mb-2">
                              {format(day, 'd EEEE', { locale: fr })}
                            </div>
                            
                            {hasReleases ? (
                              <div className="space-y-2">
                                {dayReleases.map(release => (
                                  <Link 
                                    to={`/figurines/${release.id}`} 
                                    key={release.id}
                                    className="block p-2 hover:bg-gray-100 rounded-md transition-colors"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <img 
                                        src={release.image} 
                                        alt={release.name} 
                                        className="w-10 h-10 object-cover rounded"
                                      />
                                      <div>
                                        <div className="text-sm font-medium line-clamp-1">{release.name}</div>
                                        <div className="text-xs text-gray-500">{release.manufacturer}</div>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div className="text-xs text-gray-400 italic">Pas de sortie</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReleaseSchedule;
