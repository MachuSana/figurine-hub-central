
import { Newspaper } from "lucide-react";

type News = {
  title: string;
  date: string;
  url: string;
}

type FigurineNewsProps = {
  news: News[];
}

export const FigurineNews = ({ news }: FigurineNewsProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Newspaper size={20} />
      Actualités
    </h2>
    {news.map((item, index) => (
      <a
        key={index}
        href={item.url}
        className="block p-4 border rounded-lg hover:border-primary transition-colors mb-4 last:mb-0"
      >
        <div className="font-medium mb-1">{item.title}</div>
        <div className="text-sm text-gray-500">
          {new Date(item.date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </div>
      </a>
    ))}
  </div>
);
