
import React from "react";
import { Info } from "lucide-react";

type CharacterDescriptionProps = {
  character: {
    name: string;
    description: string;
    gallery: string[];
  };
}

export const CharacterDescription = ({ character }: CharacterDescriptionProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">À propos de {character.name}</h2>
      <p className="text-gray-700 leading-relaxed">{character.description}</p>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Galerie</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {character.gallery.map((image, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden">
              <img src={image} alt={`${character.name} ${index+1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
