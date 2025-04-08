
import { Tag, Calendar, Package, Star, Clock } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type FigurineHeaderProps = {
  series: string;
  name: string;
  reference: string;
  id: number;
  rating?: number;
  releaseDate?: string;
  className?: string;
}

export const FigurineHeader = ({ series, name, reference, id, rating, releaseDate, className }: FigurineHeaderProps) => {
  const isNewRelease = new Date().getMonth() < 3; // Just for demo
  const isUpcoming = releaseDate && new Date(releaseDate) > new Date();
  
  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    });
  };
  
  return (
    <div className={cn("bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md", className)}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="outline" className="flex items-center gap-1 bg-muted">
                <Tag size={14} className="text-primary" />
                {series}
              </Badge>
              
              {isNewRelease && (
                <Badge className="bg-blue-500 text-white hover:bg-blue-600">Nouveau</Badge>
              )}
              
              {isUpcoming && (
                <Badge className="bg-amber-500 text-white hover:bg-amber-600">À venir</Badge>
              )}
              
              {rating && (
                <div className="flex items-center gap-1 text-sm bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full border border-yellow-200">
                  <Star size={14} className="fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-3">{name}</h1>
            
            <div className="flex flex-wrap gap-y-2 gap-x-3 text-sm text-gray-600">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center group cursor-help">
                      <Package size={14} className="mr-1.5 text-gray-400 group-hover:text-primary transition-colors" />
                      <span className="group-hover:text-gray-800 transition-colors">Réf: {reference}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Référence fabricant</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className="flex items-center">
                <Calendar size={14} className="mr-1.5 text-gray-400" />
                <span>Ajouté le: {new Date().toLocaleDateString('fr-FR')}</span>
              </div>
              
              {releaseDate && (
                <div className="flex items-center">
                  <Clock size={14} className="mr-1.5 text-gray-400" />
                  <span>Sortie: {formatReleaseDate(releaseDate)}</span>
                </div>
              )}
            </div>
          </div>
          <FavoriteButton figurineId={id} className="text-lg" />
        </div>
      </div>
    </div>
  );
};
