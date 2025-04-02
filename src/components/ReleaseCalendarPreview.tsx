
import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Données fictives pour les sorties de figurines
const upcomingReleases = {
  "mars-2025": [
    { 
      id: 1, 
      date: "5 mars 2025",
      figurines: [
        {
          id: 101,
          name: "Rem: Winter Clothes Ver.",
          series: "Re:Zero",
          manufacturer: "Good Smile Company",
          price: 16500
        }
      ]
    },
    { 
      id: 2, 
      date: "12 mars 2025",
      figurines: [
        {
          id: 102,
          name: "Goku Ultra Instinct",
          series: "Dragon Ball Super",
          manufacturer: "Bandai",
          price: 8800
        }
      ]
    },
    { 
      id: 3, 
      date: "15 mars 2025",
      figurines: [
        {
          id: 103,
          name: "Levi Cleaning Ver.",
          series: "L'Attaque des Titans",
          manufacturer: "Kotobukiya",
          price: 22000
        }
      ]
    },
    { 
      id: 4, 
      date: "20 mars 2025",
      figurines: [
        {
          id: 104,
          name: "Tanjiro Combat Form",
          series: "Demon Slayer",
          manufacturer: "Aniplex",
          price: 28500
        }
      ]
    }
  ]
};

const ReleaseCalendarPreview = () => {
  // On récupère le mois courant pour l'affichage
  const currentMonth = "mars-2025"; // Dans une version réelle, on calculerait le mois courant
  const releases = upcomingReleases[currentMonth];
  
  return (
    <Card className="border-none shadow-sm">
      <div className="bg-primary/10 p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Planning des sorties</h3>
        </div>
        <Link 
          to={`/release-schedule/${currentMonth}`}
          className="text-sm text-primary hover:underline flex items-center"
        >
          Voir tout <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          {releases.map(releaseDay => (
            <div key={releaseDay.id} className="relative pl-6 pb-4 border-l border-dashed border-gray-300 last:border-l-0 last:pb-0">
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
              
              <p className="font-medium mb-2">{releaseDay.date}</p>
              
              <div className="space-y-3">
                {releaseDay.figurines.map(figurine => (
                  <div key={figurine.id} className="pl-2">
                    <p className="font-medium">{figurine.name}</p>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <p>{figurine.manufacturer}</p>
                      <p>{figurine.price.toLocaleString()} ¥</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReleaseCalendarPreview;
