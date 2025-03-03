
import { FileText, AlignLeft } from "lucide-react";
import { Separator } from "./ui/separator";

type FigurineDescriptionProps = {
  description: string;
  className?: string;
}

export const FigurineDescription = ({ description, className }: FigurineDescriptionProps) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md ${className}`}>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <AlignLeft size={20} className="text-primary" />
      Description
    </h2>
    <Separator className="mb-4 bg-gray-100" />
    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
      {description}
    </p>
  </div>
);
