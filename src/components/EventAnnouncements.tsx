
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type Announcement = {
  id: number;
  name: string;
  series: string;
  manufacturer: string;
  image: string;
}

type AnnouncementsData = {
  [category: string]: Announcement[];
}

interface EventAnnouncementsProps {
  announcements: AnnouncementsData;
}

export const EventAnnouncements = ({ announcements }: EventAnnouncementsProps) => {
  const categories = Object.keys(announcements);
  
  // Utiliser la première catégorie comme valeur par défaut
  const defaultCategory = categories.length > 0 ? categories[0] : "";

  return (
    <Tabs defaultValue={defaultCategory} className="space-y-4">
      <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${Math.min(categories.length, 4)}, 1fr)` }}>
        {categories.map((category) => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category} value={category} className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements[category].map((item) => (
              <Link
                key={item.id}
                to={`/figurines/${item.id}`}
                className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{item.name}</h3>
                  <div className="text-sm text-gray-500 mb-2">
                    <div>{item.series}</div>
                    <div>{item.manufacturer}</div>
                  </div>
                  <Button
                    variant="link"
                    className="p-0 h-auto font-medium text-primary flex items-center gap-1"
                    asChild
                  >
                    <span>
                      Voir détails
                      <ArrowRight size={14} />
                    </span>
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
