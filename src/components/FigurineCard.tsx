
import { Link } from "react-router-dom";
import { Tag } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";

type FigurineCardProps = {
  figurine: {
    id: number;
    name: string;
    manufacturer: string;
    series: string;
    price: string;
    images: string[];
  };
}

export const FigurineCard = ({ figurine }: FigurineCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/figurines/${figurine.id}`} className="block">
        <div className="aspect-square relative">
          <img
            src={figurine.images[0]}
            alt={figurine.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <FavoriteButton figurineId={figurine.id} />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag size={16} className="text-primary" />
            <span className="text-sm text-gray-600">{figurine.series}</span>
          </div>
          <h3 className="font-semibold mb-1 line-clamp-2">{figurine.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{figurine.manufacturer}</p>
          <p className="text-lg font-bold text-primary">{figurine.price}¥</p>
        </div>
      </Link>
    </div>
  );
};
