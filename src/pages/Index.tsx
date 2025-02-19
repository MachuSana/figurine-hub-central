
import MainNav from "../components/MainNav";
import { Calendar, Eye, MessageSquare } from "lucide-react";

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
        "Good Smile Company dévoile une nouvelle figurine de Tanjiro Kamado dans une pose dynamique...",
    },
    {
      id: 2,
      title: "One Piece : La collection Grandista s'agrandit",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      date: "2024-04-09",
      views: 987,
      comments: 32,
      excerpt:
        "Découvrez les nouvelles figurines de la collection Grandista avec Luffy et Zoro...",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          L'actualité des <span className="text-primary">Figurines</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8 animate-fade-up">
          {featuredNews.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 hover:text-primary transition-colors duration-200">
                  {news.title}
                </h2>
                <p className="text-gray-600 mb-4">{news.excerpt}</p>
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
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
