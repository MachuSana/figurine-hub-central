
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";

type NewsItem = {
  id: number;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  date: string;
  category: string;
  source: string;
  author: string;
  scheduleMonth?: string;
};

interface NewsCardProps {
  news: NewsItem;
  isSchedule?: boolean;
  scheduleLink?: string;
}

export const NewsCard = ({ news, isSchedule = false, scheduleLink }: NewsCardProps) => {
  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Déterminer le lien approprié en fonction du type d'actualité
  const newsLink = isSchedule && news.scheduleMonth 
    ? `/release-schedule/${news.scheduleMonth}` 
    : `/news/${news.id}`;

  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
      <Link to={newsLink}>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-48 md:h-auto bg-gray-100">
            <img 
              src={news.coverImage} 
              alt={news.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <CardContent className="flex-1 p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-3 py-1 text-xs font-medium rounded-full 
                ${news.category === "Planning des sorties" ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-800'}`}>
                {news.category}
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                {news.source}
              </span>
            </div>
            
            <h2 className="text-xl font-bold mb-2">{news.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{news.summary}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(news.date)}
              </span>
              
              <span className="text-primary inline-flex items-center gap-1 hover:underline">
                {isSchedule ? "Voir le planning complet" : "Lire l'article"} 
                <ArrowRight size={16} />
              </span>
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
};
