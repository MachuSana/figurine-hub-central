
import { FileText, AlignLeft } from "lucide-react";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";

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
    <div className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md ${className}`}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <AlignLeft size={20} className="text-primary" />
        Description
      </h2>
      <Separator className="mb-4 bg-gray-100" />
      <div className="relative">
        <p className={`text-gray-600 leading-relaxed whitespace-pre-line ${shouldTruncate && !isExpanded ? 'line-clamp-4' : ''}`}>
          {description}
        </p>
        
        {shouldTruncate && (
          <button 
            className="mt-2 text-primary text-sm font-medium hover:underline focus:outline-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Voir moins' : 'Voir plus'}
          </button>
        )}
      </div>
    </div>
  );
};
