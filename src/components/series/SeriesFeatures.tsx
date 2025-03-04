
import { Info } from "lucide-react";
import { Separator } from "../ui/separator";

type SeriesFeaturesProps = {
  features: string[];
}

export const SeriesFeatures = ({ features }: SeriesFeaturesProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Info size={20} className="text-primary" />
      Caractéristiques
    </h2>
    <Separator className="mb-6 bg-gray-100" />
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-lg px-4 py-3 text-sm hover:bg-primary/5 transition-colors"
        >
          {feature}
        </div>
      ))}
    </div>
  </div>
);
