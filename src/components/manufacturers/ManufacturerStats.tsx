
import { Package, Star, Trophy } from "lucide-react";

export const ManufacturerStats = () => {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Nos Partenaires en Chiffres</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <Package className="w-12 h-12 text-primary mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-1">15+</div>
          <div className="text-gray-600">Fabricants Partenaires</div>
        </div>
        <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <Star className="w-12 h-12 text-primary mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-1">50k+</div>
          <div className="text-gray-600">Produits Disponibles</div>
        </div>
        <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-1">25+</div>
          <div className="text-gray-600">Années d'Expérience</div>
        </div>
      </div>
    </div>
  );
};
