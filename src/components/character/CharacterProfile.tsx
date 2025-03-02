
import React, { useState } from "react";
import { Heart, Share2, Star, BadgeInfo } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type CharacterProfileProps = {
  character: {
    id: number;
    name: string;
    japaneseName: string;
    series: string;
    image: string;
    figureCount: number;
    popularity: number;
    traits: string[];
    affiliations: string[];
    biography: Record<string, string>;
  };
}

export const CharacterProfile = ({ character }: CharacterProfileProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="relative">
          <img
            src={character.image}
            alt={character.name}
            className="w-full aspect-square object-cover"
          />
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full ${
                isFavorite
                  ? "bg-red-100 text-red-500"
                  : "bg-white/80 text-gray-700"
              }`}
            >
              <Heart
                size={20}
                className={isFavorite ? "fill-current" : ""}
              />
            </button>
            <button className="p-2 rounded-full bg-white/80 text-gray-700">
              <Share2 size={20} />
            </button>
          </div>
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            {character.popularity}
          </div>
        </div>

        <div className="p-4">
          <h1 className="text-2xl font-bold">{character.name}</h1>
          <div className="text-gray-500 mb-3">{character.japaneseName}</div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{character.series}</Badge>
            <div className="text-sm text-muted-foreground">
              {character.figureCount}+ figurines
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 mb-2">Traits de caractère</div>
              <div className="flex flex-wrap gap-2">
                {character.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">Affiliations</div>
              <div className="flex flex-wrap gap-2">
                {character.affiliations.map((affiliation, index) => (
                  <span
                    key={index}
                    className="bg-muted text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {affiliation}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-medium flex items-center gap-2 mb-3">
          <BadgeInfo size={18} /> Détails du personnage
        </h2>
        <div className="space-y-2">
          {Object.entries(character.biography).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-500">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
