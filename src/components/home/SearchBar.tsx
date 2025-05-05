
import { Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Recherche lancée pour "${searchQuery}"`);
      // Dans une application réelle, on redirigerait vers la page de recherche
    }
  };

  return (
    <section className="mb-10">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Search className="mr-2 text-primary" size={20} />
          Recherche rapide
        </h2>
        <form onSubmit={handleSearch}>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nom de figurine, série, personnage..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <Button type="submit" className="flex items-center gap-2">
              <Search size={16} />
              Rechercher
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filtres
              <ChevronDown size={14} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 animate-fade-in">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Marque</label>
                <select className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Toutes les marques</option>
                  <option value="goodsmile">Good Smile Company</option>
                  <option value="bandai">Bandai Spirits</option>
                  <option value="kotobukiya">Kotobukiya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Série</label>
                <select className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Toutes les séries</option>
                  <option value="attackontitan">L'Attaque des Titans</option>
                  <option value="dragonball">Dragon Ball</option>
                  <option value="demonslayer">Demon Slayer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Prix</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <span className="text-gray-500">-</span>
                  <input 
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Disponibilité</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="inStock" className="mr-2" />
                    <label htmlFor="inStock" className="text-sm">En stock</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="preorder" className="mr-2" />
                    <label htmlFor="preorder" className="text-sm">Précommande</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
