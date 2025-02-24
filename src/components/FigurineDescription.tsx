
import { FileText } from "lucide-react";

type FigurineDescriptionProps = {
  description: string;
}

export const FigurineDescription = ({ description }: FigurineDescriptionProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <FileText size={20} />
      Description
    </h2>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);
