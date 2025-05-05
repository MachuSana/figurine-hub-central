
import { Tag, Star, Heart, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type Stat = {
  value: string;
  label: string;
  icon: React.ElementType;
  color: string;
};

export const StatsSection = () => {
  const stats: Stat[] = [
    { value: "10,000+", label: "Figurines", icon: Tag, color: "bg-blue-500/10 text-blue-500" },
    { value: "50+", label: "Marques", icon: Star, color: "bg-amber-500/10 text-amber-500" },
    { value: "25,000+", label: "Clients Satisfaits", icon: Heart, color: "bg-red-500/10 text-red-500" },
    { value: "1,000+", label: "Avis Clients", icon: MessageSquare, color: "bg-green-500/10 text-green-500" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
      <h2 className="text-2xl font-bold text-center mb-8">Chiffres clés</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300 animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={cn("w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
