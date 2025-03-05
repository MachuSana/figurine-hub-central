
import { Tag, Calendar, Package } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { Badge } from "@/components/ui/badge";

type FigurineHeaderProps = {
  series: string;
  name: string;
  reference: string;
  id: number;
}

export const FigurineHeader = ({ series, name, reference, id }: FigurineHeaderProps) => {
  const isNewRelease = new Date().getMonth() < 3; // Just for demo
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="flex items-center gap-1 bg-muted">
                <Tag size={14} className="text-primary" />
                {series}
              </Badge>
              
              {isNewRelease && (
                <Badge className="bg-green-500 text-white hover:bg-green-600">Nouveau</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-3">{name}</h1>
            
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Package size={14} className="mr-1 text-gray-400" />
                Référence: {reference}
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-1 text-gray-400" />
                Ajouté le: {new Date().toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
          <FavoriteButton figurineId={id} className="text-lg" />
        </div>
      </div>
    </div>
  );
};
