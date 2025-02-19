
import MainNav from "../components/MainNav";
import { Calendar, Eye, MessageSquare, ArrowRight } from "lucide-react";

const Index = () => {
  const featuredNews = [
    {
      id: 1,
      title: "Nouvelle Figurine Demon Slayer annoncée",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      date: "2024-04-10",
      views: 1234,
      comments: 45,
      excerpt:
        "Good Smile Company dévoile une nouvelle figurine de Tanjiro Kamado dans une pose dynamique qui capture parfaitement l'essence du personnage...",
      category: "Nouveautés",
    },
    {
      id: 2,
      title: "One Piece : La collection Grandista s'agrandit",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      date: "2024-04-09",
      views: 987,
      comments: 32,
      excerpt:
        "Découvrez les nouvelles figurines de la collection Grandista avec Luffy et Zoro dans des poses emblématiques qui raviront tous les fans...",
      category: "Collections",
    },
  ];

  const recentNews = [
    {
      id: 3,
      title: "Précommandes : Les dates à ne pas manquer",
      date: "2024-04-08",
      views: 756,
      comments: 23,
    },
    {
      id: 4,
      title: "Guide du débutant : Comment bien choisir sa première figurine",
      date: "2024-04-07",
      views: 1543,
      comments: 67,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          L'actualité des <span className="text-primary">Figurines</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Articles principaux */}
          <div className="lg:col-span-2 space-y-8 animate-fade-up">
            {featuredNews.map((news) => (
              <article
                key={news.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group"
              >
                <div className="md:flex">
                  <div className="md:w-2/5 relative overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-64 md:h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {news.category}
                    </span>
                  </div>
                  <div className="md:w-3/5 p-6">
                    <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors duration-200">
                      {news.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {news.date}
                        </div>
                        <div className="flex items-center">
                          <Eye size={16} className="mr-1" />
                          {news.views}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare size={16} className="mr-1" />
                          {news.comments}
                        </div>
                      </div>
                      <div className="text-primary hidden group-hover:flex items-center transition-all duration-200">
                        Lire plus <ArrowRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
                Articles Récents
              </h3>
              <div className="space-y-4">
                {recentNews.map((news) => (
                  <article
                    key={news.id}
                    className="group cursor-pointer"
                  >
                    <h4 className="font-medium mb-2 group-hover:text-primary transition-colors duration-200">
                      {news.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {news.date}
                      </div>
                      <div className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        {news.views}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare size={14} className="mr-1" />
                        {news.comments}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
