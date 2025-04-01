
import { useState } from "react";
import MainNav from "../components/MainNav";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { format, addMonths, startOfMonth, getDaysInMonth, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, ArrowRight, CalendarDays, List, Calendar as CalendarIcon, Info } from "lucide-react";

// Sample data - in a real app, this would come from an API
const releaseData = [
  {
    id: 1,
    name: "Monkey D. Luffy - Gear 5",
    manufacturer: "Bandai",
    series: "One Piece",
    releaseDate: new Date(2024, 5, 15), // June 15, 2024
    price: "24800¥",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
  {
    id: 2,
    name: "Rei Ayanami - EVA 01",
    manufacturer: "Good Smile Company",
    series: "Evangelion",
    releaseDate: new Date(2024, 6, 20), // July 20, 2024
    price: "18500¥",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
  },
  {
    id: 3,
    name: "Gojo Satoru - Jujutsu Kaisen",
    manufacturer: "MegaHouse",
    series: "Jujutsu Kaisen",
    releaseDate: new Date(2024, 5, 10), // June 10, 2024
    price: "22000¥",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  },
  {
    id: 4,
    name: "Eren Yaeger - Final Season",
    manufacturer: "Kotobukiya",
    series: "Attack on Titan",
    releaseDate: new Date(2024, 7, 5), // August 5, 2024
    price: "19800¥",
    image: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8"
  },
  {
    id: 5,
    name: "Asuka Langley - Test Plug Suit",
    manufacturer: "Alter",
    series: "Evangelion",
    releaseDate: new Date(2024, 5, 25), // June 25, 2024
    price: "21500¥",
    image: "https://images.unsplash.com/photo-1508693926297-1d61f13ab8b8"
  },
  {
    id: 6,
    name: "Saitama - Serious Mode",
    manufacturer: "Max Factory",
    series: "One Punch Man",
    releaseDate: new Date(2024, 6, 30), // July 30, 2024
    price: "18000¥",
    image: "https://images.unsplash.com/photo-1501432377862-3d0432b87a14"
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
  const [view, setView] = useState<"calendar" | "list" | "month">("month");
  
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Planning des sorties</h1>
          
          <div className="flex items-center space-x-4">
            <Tabs 
              value={view} 
              onValueChange={(v) => setView(v as "calendar" | "list" | "month")}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="month" className="flex items-center gap-1">
                  <CalendarIcon size={16} />
                  <span className="hidden sm:inline">Mois</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-1">
                  <CalendarDays size={16} />
                  <span className="hidden sm:inline">Calendrier</span>
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-1">
                  <List size={16} />
                  <span className="hidden sm:inline">Liste</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <TabsContent value="month" className="m-0">
              <div className="flex justify-between items-center">
                <CardTitle>
                  {format(selectedMonth, 'MMMM yyyy', { locale: fr })}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => navigateMonth("prev")}
                  >
                    <ArrowLeft size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => navigateMonth("next")}
                  >
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
              <CardDescription>
                {releasesForSelectedMonth.length} figurine{releasesForSelectedMonth.length !== 1 ? 's' : ''} à sortir ce mois-ci
              </CardDescription>
            </TabsContent>
            
            <TabsContent value="calendar" className="m-0">
              <CardTitle>Calendrier des sorties</CardTitle>
              <CardDescription>
                Cliquez sur une date pour voir les figurines qui sortent ce jour-là
              </CardDescription>
            </TabsContent>
            
            <TabsContent value="list" className="m-0">
              <CardTitle>Liste des sorties à venir</CardTitle>
              <CardDescription>
                Toutes les figurines prévues dans les prochains mois
              </CardDescription>
            </TabsContent>
          </CardHeader>
          
          <CardContent>
            {/* Month View - Grid of days with figurines */}
            <TabsContent value="month" className="space-y-6 m-0">
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
            </TabsContent>
            
            {/* Calendar View */}
            <TabsContent value="calendar" className="m-0">
              <div className="flex flex-col items-center space-y-4">
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
                
                <Card className="w-full mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Sorties du {format(date, 'dd MMMM yyyy', { locale: fr })}
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
            </TabsContent>
            
            {/* List View */}
            <TabsContent value="list" className="space-y-8 m-0">
              {monthsList.map(month => (
                <div key={format(month, 'yyyy-MM')} className="space-y-4">
                  <h2 className="text-xl font-semibold capitalize">
                    {format(month, 'MMMM yyyy', { locale: fr })}
                  </h2>
                  
                  <div className="space-y-4">
                    {groupedReleases[format(month, 'yyyy-MM')].map(release => (
                      <Link 
                        to={`/figurines/${release.id}`}
                        key={release.id} 
                        className="flex items-center border rounded-lg p-4 hover:shadow-md transition-all"
                      >
                        <img 
                          src={release.image} 
                          alt={release.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{release.name}</h3>
                          <div className="text-sm text-gray-600 mt-1">
                            {release.manufacturer} • {release.series}
                          </div>
                          <div className="text-sm font-medium mt-1">
                            {format(release.releaseDate, 'dd MMMM yyyy', { locale: fr })}
                          </div>
                        </div>
                        <div className="text-lg font-medium text-primary">
                          {release.price}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReleaseSchedule;
