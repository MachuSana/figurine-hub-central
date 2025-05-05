
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Recherche lancée pour "${searchQuery}"`);
      // Dans une application réelle, on redirigerait vers la page de recherche
    }
  };

  return (
    <section className="mb-10">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Search className="mr-2 text-primary" size={20} />
          Recherche rapide
        </h2>
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Nom de figurine, série, personnage..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="flex items-center gap-2">
            <Search size={16} />
            Rechercher
          </Button>
        </form>
      </div>
    </section>
  );
};
