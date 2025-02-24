
import { Tag } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";

type FigurineHeaderProps = {
  series: string;
  name: string;
  reference: string;
  id: number;
}

export const FigurineHeader = ({ series, name, reference, id }: FigurineHeaderProps) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag size={16} className="text-primary" />
            <span className="text-sm text-gray-600">{series}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <p className="text-gray-600">Référence: {reference}</p>
        </div>
        <FavoriteButton figurineId={id} />
      </div>
    </div>
  </div>
);
