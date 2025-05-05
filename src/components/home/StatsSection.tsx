
import { Tag, Star, Heart, MessageSquare } from "lucide-react";

type Stat = {
  value: string;
  label: string;
  icon: React.ElementType;
};

export const StatsSection = () => {
  const stats: Stat[] = [
    { value: "10,000+", label: "Figurines", icon: Tag },
    { value: "50+", label: "Marques", icon: Star },
    { value: "25,000+", label: "Clients Satisfaits", icon: Heart },
    { value: "1,000+", label: "Avis Clients", icon: MessageSquare }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300 animate-fade-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
          <div className="text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
