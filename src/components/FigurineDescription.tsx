
import { FileText, AlignLeft } from "lucide-react";

type FigurineDescriptionProps = {
  description: string;
}

export const FigurineDescription = ({ description }: FigurineDescriptionProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <AlignLeft size={20} className="text-primary" />
      Description
    </h2>
    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
      {description}
    </p>
  </div>
);
