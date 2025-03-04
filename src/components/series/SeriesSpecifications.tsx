
import { Package } from "lucide-react";
import { Separator } from "../ui/separator";

type SeriesSpecifications = {
  material: string;
  packaging: string;
  articulations: string;
  base: string;
  instructions: string;
}

type SeriesSpecificationsProps = {
  specifications: SeriesSpecifications;
}

export const SeriesSpecifications = ({ specifications }: SeriesSpecificationsProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Package size={20} className="text-primary" />
      Spécifications techniques
    </h2>
    <Separator className="mb-6 bg-gray-100" />
    <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(specifications).map(([key, value]) => (
        <div key={key} className="bg-gray-50 rounded-lg p-4 hover:bg-primary/5 transition-colors">
          <dt className="text-gray-500 text-sm mb-1">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </dt>
          <dd className="font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  </div>
);
