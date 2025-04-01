
import { Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

type News = {
  id: number;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  date: string;
  category: string;
  source: string;
  author: string;
};

interface NewsCardProps {
  news: News;
}

export const NewsCard = ({ news }: NewsCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Link to={`/news/${news.id}`}>
            <img 
              src={news.coverImage} 
              alt={news.title} 
              className="h-48 w-full object-cover hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
        <div className="md:col-span-2 flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge className="mb-2">{news.category}</Badge>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar size={14} className="mr-1" />
                {formatDate(news.date)}
              </span>
            </div>
            <Link to={`/news/${news.id}`} className="hover:text-primary transition-colors">
              <CardTitle className="text-xl">{news.title}</CardTitle>
            </Link>
            <CardDescription>{news.summary}</CardDescription>
          </CardHeader>
          
          <CardContent className="pb-2 flex-grow">
            <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-96' : 'max-h-20'}`}>
              <p className="text-gray-600">{news.content}</p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between items-center pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Voir moins' : 'Lire la suite'}
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/news/${news.id}`}>
                  Lire l'article
                </Link>
              </Button>
              
              <div className="text-sm text-gray-500">
                Source: <a href="#" className="text-primary inline-flex items-center hover:underline">
                  {news.source} <ExternalLink size={12} className="ml-1" />
                </a>
              </div>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};
