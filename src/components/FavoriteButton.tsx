
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useToast } from "../components/ui/use-toast";

type FavoriteButtonProps = {
  figurineId: number;
  initialState?: boolean;
  className?: string;
}

export const FavoriteButton = ({ 
  figurineId, 
  initialState = false,
  className = ""
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialState);
  const { toast } = useToast();
  
  // Check localStorage on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(figurineId));
  }, [figurineId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    const newState = !isFavorite;
    setIsFavorite(newState);
    
    // Sauvegarder dans le localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (newState) {
      if (!favorites.includes(figurineId)) {
        favorites.push(figurineId);
        toast({
          title: "Ajouté aux favoris",
          description: "La figurine a été ajoutée à vos favoris",
          variant: "default",
          duration: 2000,
        });
      }
    } else {
      const index = favorites.indexOf(figurineId);
      if (index > -1) {
        favorites.splice(index, 1);
        toast({
          title: "Retiré des favoris",
          description: "La figurine a été retirée de vos favoris",
          variant: "default",
          duration: 2000,
        });
      }
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-colors ${
        isFavorite 
          ? 'bg-rose-100 text-rose-500 hover:bg-rose-200' 
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      } ${className}`}
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart 
        size={24} 
        className={isFavorite ? 'fill-current' : ''} 
      />
    </button>
  );
};
