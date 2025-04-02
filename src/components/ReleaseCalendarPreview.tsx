
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, addMonths, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Package } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data - using the same as in ReleaseSchedule.tsx
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

// Get releases for a specific month
const getReleasesForMonth = (date: Date) => {
  return releaseData.filter(
    (release) =>
      release.releaseDate.getMonth() === date.getMonth() &&
      release.releaseDate.getFullYear() === date.getFullYear()
  );
};

// Group releases by date within a month
const groupReleasesByDate = (releases: typeof releaseData) => {
  const grouped: Record<string, typeof releaseData> = {};
  
  releases.forEach(release => {
    const dateKey = format(release.releaseDate, "yyyy-MM-dd");
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(release);
  });
  
  return grouped;
};

export const ReleaseCalendarPreview = () => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  
  const releasesForMonth = getReleasesForMonth(selectedMonth);
  const groupedReleases = groupReleasesByDate(releasesForMonth);
  const sortedDates = Object.keys(groupedReleases).sort();
  
  const navigateMonth = (direction: "next" | "prev") => {
    setSelectedMonth(prev => addMonths(prev, direction === "next" ? 1 : -1));
  };
  
  return (
    <Card className="mb-8 overflow-hidden border-primary/20 shadow-md">
      <CardHeader className="bg-primary/10 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-xl">
            <CalendarDays size={20} className="text-primary" />
            Planning des sorties
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {format(selectedMonth, 'MMMM yyyy', { locale: fr })}
            </span>
            <div className="flex space-x-1">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => navigateMonth("prev")}
                className="h-7 w-7"
              >
                <ArrowLeft size={14} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => navigateMonth("next")}
                className="h-7 w-7"
              >
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        {releasesForMonth.length > 0 ? (
          <div className="space-y-6">
            {sortedDates.slice(0, 3).map(dateKey => {
              const date = new Date(dateKey);
              return (
                <div key={dateKey} className="border-l-2 border-primary pl-4">
                  <h3 className="font-medium mb-3">
                    {format(date, 'EEEE d', { locale: fr })}
                  </h3>
                  <div className="space-y-3">
                    {groupedReleases[dateKey].map(release => (
                      <Link 
                        to={`/figurines/${release.id}`}
                        key={release.id}
                        className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <img 
                          src={release.image} 
                          alt={release.name}
                          className="w-14 h-14 object-cover rounded-sm"
                        />
                        <div className="ml-3 flex-grow">
                          <div className="font-medium line-clamp-1">{release.name}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Package size={12} className="text-gray-400" />
                            {release.manufacturer}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-primary">{release.price}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {sortedDates.length > 3 && (
              <div className="text-center text-sm text-muted-foreground">
                Et {sortedDates.length - 3} autres dates...
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Aucune sortie prévue ce mois-ci
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <Button asChild variant="default">
            <Link to="/release-schedule" className="flex items-center gap-2">
              <Clock size={16} />
              Voir le calendrier complet
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
