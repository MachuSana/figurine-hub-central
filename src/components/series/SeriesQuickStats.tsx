
import { Calendar, Package, Star } from "lucide-react";

type SeriesQuickStatsProps = {
  startYear: string;
  totalReleases: number;
  scale: string;
}

export const SeriesQuickStats = ({ startYear, totalReleases, scale }: SeriesQuickStatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:bg-primary/5">
      <div className="flex items-center gap-4">
        <Calendar size={28} className="text-primary" />
        <div>
          <div className="text-sm text-gray-500">Création</div>
          <div className="font-medium text-xl">{startYear}</div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:bg-primary/5">
      <div className="flex items-center gap-4">
        <Package size={28} className="text-primary" />
        <div>
          <div className="text-sm text-gray-500">Figurines</div>
          <div className="font-medium text-xl">{totalReleases}+</div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:bg-primary/5">
      <div className="flex items-center gap-4">
        <Star size={28} className="text-primary" />
        <div>
          <div className="text-sm text-gray-500">Taille moyenne</div>
          <div className="font-medium text-xl">{scale}</div>
        </div>
      </div>
    </div>
  </div>
);
