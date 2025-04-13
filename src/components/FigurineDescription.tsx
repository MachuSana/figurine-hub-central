
import { AlignLeft, ArrowDown, ArrowUp } from "lucide-react";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type FigurineDescriptionProps = {
  description: string;
  className?: string;
}

export const FigurineDescription = ({ description, className }: FigurineDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldTruncate, setShouldTruncate] = useState(false);
  
  // Check if the description is long enough to be truncated
  useEffect(() => {
    setShouldTruncate(description.length > 300);
  }, [description]);
  
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md",
      className
    )}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <AlignLeft size={20} className="text-primary" />
        Description
      </h2>
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
