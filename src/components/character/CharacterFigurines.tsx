
import React from "react";
import { ExternalLink } from "lucide-react";
import { FigurineCard } from "../FigurineCard";

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
};

export const CharacterFigurines = ({ figurines }: CharacterFigurinesProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Figurines populaires</h2>
        <a href="#" className="text-primary flex items-center">
          Voir tout <ExternalLink size={14} className="ml-1" />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {figurines.map((figurine) => (
          <FigurineCard
            key={figurine.id}
            figurine={figurine}
          />
        ))}
      </div>
    </div>
  );
};
