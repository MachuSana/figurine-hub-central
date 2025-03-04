
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

type SeriesHeaderProps = {
  name: string;
  manufacturer: string;
  image: string;
  price: string;
}

export const SeriesHeader = ({ name, manufacturer, image, price }: SeriesHeaderProps) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 group animate-fade-up">
    <div className="relative h-96">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute top-0 left-0 right-0 p-8">
        <Link 
          to="/series"
          className="inline-flex items-center text-sm text-white/80 hover:text-white transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft size={16} className="mr-2" />
          Retour aux gammes
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="space-y-4">
          <div>
            <div className="text-white/80 text-lg mb-2">{manufacturer}</div>
            <h1 className="text-5xl font-bold text-white">{name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-6 py-2 bg-primary/90 text-white rounded-full backdrop-blur-sm text-lg">
              {price}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
