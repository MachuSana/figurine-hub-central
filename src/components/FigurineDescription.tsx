
import { AlignLeft } from "lucide-react";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type FigurineDescriptionProps = {
  description: string;
  className?: string;
}

export const FigurineDescription = ({ description, className }: FigurineDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldTruncate, setShouldTruncate] = useState(false);
  
  // Check if description is long enough to truncate
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
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        {shouldTruncate && (
          <button 
            className="mt-3 text-primary text-sm font-medium hover:underline focus:outline-none flex items-center"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Voir moins' : 'Voir plus'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`ml-1 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
