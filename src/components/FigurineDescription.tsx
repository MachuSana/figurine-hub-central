
import { AlignLeft, ArrowDown, ArrowUp, Bookmark, BookmarkCheck } from "lucide-react";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

type FigurineDescriptionProps = {
  description: string;
  className?: string;
}

export const FigurineDescription = ({ description, className }: FigurineDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldTruncate, setShouldTruncate] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  
  // Check if the description is long enough to be truncated
  useEffect(() => {
    setShouldTruncate(description.length > 300);
  }, [description]);
  
  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Description retirée" : "Description sauvegardée",
      description: isSaved 
        ? "La description a été retirée de vos favoris." 
        : "La description a été ajoutée à vos favoris pour référence future.",
      duration: 2000,
    });
  };
  
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <AlignLeft size={20} className="text-primary" />
          Description
        </h2>
        
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "p-2 h-9 w-9 rounded-full",
            isSaved ? "text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50" : "text-gray-400 hover:text-gray-600"
          )}
          onClick={handleSaveToggle}
          title={isSaved ? "Retirer des favoris" : "Sauvegarder la description"}
        >
          {isSaved ? <BookmarkCheck size={18} className="fill-current" /> : <Bookmark size={18} />}
        </Button>
      </div>
      
      <Separator className="mb-4 bg-gray-100" />
      
      <div className="relative">
        {shouldTruncate && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        )}
        
        <div className={cn(
          "text-gray-600 leading-relaxed prose prose-sm max-w-none transition-all duration-300",
          shouldTruncate && !isExpanded ? "max-h-32 overflow-hidden" : "max-h-[2000px]"
        )}>
          {description.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
          ))}
        </div>
        
        {shouldTruncate && (
          <Button 
            variant="ghost" 
            size="sm"
            className="mt-3 text-primary font-medium hover:bg-primary/5 focus:outline-none flex items-center gap-1 px-3"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <>
                <ArrowUp size={16} />
                Voir moins
              </>
            ) : (
              <>
                <ArrowDown size={16} />
                Voir plus
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
