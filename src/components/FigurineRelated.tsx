
import { List, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type RelatedFigure = {
  id: number;
  name: string;
  image: string;
  manufacturer: string;
  price: string;
}

type FigurineRelatedProps = {
  figures: RelatedFigure[];
}

export const FigurineRelated = ({ figures }: FigurineRelatedProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <List size={20} />
      Autres figurines suggérées
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {figures.map((figure) => (
        <Link
          key={figure.id}
          to={`/figurines/${figure.id}`}
          className="flex items-center p-4 border rounded-lg hover:border-primary transition-colors"
        >
          <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
            <img
              src={figure.image}
              alt={figure.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4 flex-grow">
            <div className="font-medium">{figure.name}</div>
            <div className="text-sm text-gray-500">{figure.manufacturer}</div>
            <div className="font-bold mt-1">{figure.price}</div>
          </div>
          <ArrowRight size={20} className="text-gray-400" />
        </Link>
      ))}
    </div>
  </div>
);
