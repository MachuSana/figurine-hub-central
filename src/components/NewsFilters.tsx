
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewsFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const NewsFilters = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: NewsFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "rounded-full",
          selectedCategory === null && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        onClick={() => onSelectCategory(null)}
      >
        Toutes
      </Button>
      
      {categories.map(category => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full",
            selectedCategory === category && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
