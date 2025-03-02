
import React from "react";
import { Shield } from "lucide-react";

type Ability = {
  name: string;
  description: string;
};

type CharacterAbilitiesProps = {
  abilities: Ability[];
};

export const CharacterAbilities = ({ abilities }: CharacterAbilitiesProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Capacités</h2>
      <div className="space-y-4">
        {abilities.map((ability, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Shield size={20} className="text-primary" />
              <h3 className="font-medium">{ability.name}</h3>
            </div>
            <p className="text-gray-600">{ability.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
