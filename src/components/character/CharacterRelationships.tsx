
import React from "react";
import { Badge } from "@/components/ui/badge";

type Relationship = {
  name: string;
  relation: string;
  description: string;
};

type CharacterRelationshipsProps = {
  relationships: Relationship[];
};

export const CharacterRelationships = ({ relationships }: CharacterRelationshipsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Relations</h2>
      <div className="space-y-4">
        {relationships.map((relationship, index) => (
          <div key={index} className="border-b pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{relationship.name}</h3>
              <Badge variant="outline">{relationship.relation}</Badge>
            </div>
            <p className="text-gray-600">{relationship.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
