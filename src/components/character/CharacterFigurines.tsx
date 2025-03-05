
import React from "react";
import { ExternalLink } from "lucide-react";
import { FigurineCard } from "../FigurineCard";
import { Button } from "@/components/ui/button";

type CharacterFigurinesProps = {
  figurines: Array<{
    id: number;
    name: string;
    manufacturer: string;
    series: string;
    price: string;
    images: string[];
    releaseDate?: string;
    rating?: number;
    isNew?: boolean;
    isPopular?: boolean;
  }>;
  title?: string;
};

export const CharacterFigurines = ({ 
  figurines, 
  title = "Figurines populaires" 
}: CharacterFigurinesProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <Button variant="link" className="text-primary flex items-center p-0">
          Voir tout <ExternalLink size={14} className="ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {figurines.length > 0 ? (
          figurines.map((figurine) => (
            <FigurineCard
              key={figurine.id}
              figurine={figurine}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-500">
            Aucune figurine disponible pour le moment
          </div>
        )}
      </div>
    </div>
  );
};
