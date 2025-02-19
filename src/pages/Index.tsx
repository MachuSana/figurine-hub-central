import MainNav from "../components/MainNav";
import { Calendar, Eye, MessageSquare, ArrowRight, Star, TrendingUp, Tag } from "lucide-react";

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
      thumbnail: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64",
    },
    {
      id: 4,
      title: "Guide du débutant : Comment bien choisir sa première figurine",
      date: "2024-04-07",
      views: 1543,
      comments: 67,
      thumbnail: "https://images.unsplash.com/photo-1608889824875-56aa13be3ff0",
    },
  ];

  const popularFigures = [
    {
      id: 5,
      title: "Naruto Uzumaki Mode Sage",
      price: "129.99 €",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81",
    },
    {
      id: 6,
      title: "Monkey D. Luffy Gear 5",
      price: "199.99 €",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1608889175638-48e13d0f104f",
    },
  ];

  const categories = [
    { name: "Anime", count: 145 },
    { name: "Jeux Vidéo", count: 89 },
    { name: "Comics", count: 67 },
    { name: "Films", count: 54 },
  ];

  const latestReleases = [
    {
      id: 7,
      title: "Gon Freecss - Hunter × Hunter",
      price: "89.99 €",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      brand: "Good Smile Company",
      releaseDate: "Mai 2024",
    },
    {
      id: 8,
      title: "Mikasa Ackerman - L'Attaque des Titans",
      price: "159.99 €",
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
      brand: "Kotobukiya",
      releaseDate: "Juin 2024",
    },
  ];

  const promotionalBanners = [
    {
      id: 1,
      title: "Pré-commandes printemps 2024",
      description: "Découvrez les nouveautés à venir",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      bgColor: "bg-violet-100",
    },
    {
      id: 2,
      title: "Collection Dragon Ball",
      description: "Éditions limitées en stock",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        {/* Promotional Banners */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {promotionalBanners.map((banner) => (
            <div
              key={banner.id}
              className={`${banner.bgColor} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group`}
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

        {/* Latest Releases Carousel */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Star className="mr-2 text-primary" size={24} />
            Dernières Sorties
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {latestReleases.map((release) => (
              <div
                key={release.id}
                className="group cursor-pointer bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex p-4">
                  <div className="w-36 h-36 relative overflow-hidden rounded-lg">
                    <img
                      src={release.image}
                      alt={release.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <span className="text-sm text-primary font-medium">{release.brand}</span>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                      {release.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mb-2">{release.price}</p>
                    <p className="text-sm text-gray-500">
                      Sortie prévue : {release.releaseDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-12">
          L'actualité des <span className="text-primary">Figurines</span>
        </h1>

        {/* Featured Articles Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Articles */}
          <div className="lg:col-span-2 space-y-8">
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
          <div className="lg:col-span-1 space-y-8">
            {/* Recent Articles */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 flex items-center">
                <TrendingUp className="mr-2 text-primary" size={20} />
                Articles Récents
              </h3>
              <div className="space-y-4">
                {recentNews.map((news) => (
                  <article key={news.id} className="group cursor-pointer flex gap-4">
                    <div className="w-20 h-20 overflow-hidden rounded-lg">
                      <img 
                        src={news.thumbnail} 
                        alt={news.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
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
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Popular Figures */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 flex items-center">
                <Star className="mr-2 text-primary" size={20} />
                Figurines Populaires
              </h3>
              <div className="space-y-4">
                {popularFigures.map((figure) => (
                  <div key={figure.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg mb-2">
                      <img
                        src={figure.image}
                        alt={figure.title}
                        className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white font-semibold">{figure.price}</p>
                      </div>
                    </div>
                    <h4 className="font-medium group-hover:text-primary transition-colors duration-200">
                      {figure.title}
                    </h4>
                    <div className="flex items-center text-yellow-400">
                      <Star size={16} className="fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{figure.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 flex items-center">
                <Tag className="mr-2 text-primary" size={20} />
                Catégories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer group"
                  >
                    <span className="group-hover:text-primary transition-colors duration-200">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
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
