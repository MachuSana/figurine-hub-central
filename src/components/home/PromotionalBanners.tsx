
import { ArrowRight } from "lucide-react";

type PromotionalBanner = {
  id: number;
  title: string;
  description: string;
  image: string;
  bgColor: string;
};

export const PromotionalBanners = () => {
  const promotionalBanners = [
    {
      id: 1,
      title: "Nouvelles Collections",
      description: "Découvrez les dernières figurines des séries populaires",
      image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64",
      bgColor: "bg-violet-50"
    },
    {
      id: 2,
      title: "Précommandes",
      description: "Ne manquez pas les figurines les plus attendues",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      bgColor: "bg-blue-50"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {promotionalBanners.map((banner, index) => (
        <div
          key={banner.id}
          className={`${banner.bgColor} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group animate-fade-up`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center p-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
              <p className="text-gray-600 mb-4">{banner.description}</p>
              <button className="bg-white text-primary px-6 py-2 rounded-full inline-flex items-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                Découvrir <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
            <div className="w-32 h-32 relative overflow-hidden rounded-lg">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
