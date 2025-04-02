
import { Link } from "react-router-dom";

interface EventLinkProps {
  eventId: number;
}

export const EventLink = ({ eventId }: EventLinkProps) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm mb-4">
      <h2 className="text-xl font-semibold mb-4">Accès direct aux événements</h2>
      <div className="flex flex-wrap gap-3">
        <Link 
          to={`/events/${eventId}`}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Voir l'événement {eventId}
        </Link>
      </div>
    </div>
  );
};
