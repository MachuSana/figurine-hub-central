
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

// Données fictives pour les événements
const events = [
  {
    id: 1,
    title: "Wonder Festival 2023 Winter",
    date: "2023-02-12",
    location: "Makuhari Messe, Japon"
  },
  {
    id: 2,
    title: "Anime Japan 2023",
    date: "2023-03-25",
    location: "Tokyo Big Sight, Japon"
  }
];

interface EventLinkProps {
  limit?: number;
}

export const EventLink = ({ limit = events.length }: EventLinkProps) => {
  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const displayedEvents = events.slice(0, limit);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Calendar className="mr-2 text-primary" size={20} />
        Événements à venir
      </h2>
      
      <div className="space-y-4">
        {displayedEvents.map(event => (
          <div key={event.id} className="border-l-4 border-primary pl-4 py-1 hover:bg-gray-50 transition-colors">
            <Link 
              to={`/events/${event.id}`}
              className="block"
            >
              <h3 className="font-semibold text-lg hover:text-primary transition-colors">{event.title}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
                <span>{formatDate(event.date)}</span>
                <span>{event.location}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500">{displayedEvents.length} événement(s) à découvrir</span>
        <Link 
          to="/news?category=Événement"
          className="inline-flex items-center text-primary hover:underline text-sm font-medium"
        >
          Voir tous les événements
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};
