
import MainNav from "../components/MainNav";
import { Calendar, Eye, MessageSquare, ArrowRight, Star, TrendingUp, Tag, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">FigureNews</h1>
          <p className="text-gray-600 mb-8">Toute l'actualité des figurines</p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/figurines"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Explorer les figurines
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-primary mb-4">
              <Eye size={24} />
            </div>
            <h3 className="font-semibold mb-2">Dernières Sorties</h3>
            <p className="text-gray-600 text-sm">Découvrez les dernières figurines disponibles</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-primary mb-4">
              <Calendar size={24} />
            </div>
            <h3 className="font-semibold mb-2">Calendrier</h3>
            <p className="text-gray-600 text-sm">Les dates de sortie à ne pas manquer</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-primary mb-4">
              <MessageSquare size={24} />
            </div>
            <h3 className="font-semibold mb-2">Avis & Reviews</h3>
            <p className="text-gray-600 text-sm">Partagez votre expérience avec la communauté</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-primary mb-4">
              <Star size={24} />
            </div>
            <h3 className="font-semibold mb-2">Collection</h3>
            <p className="text-gray-600 text-sm">Gérez votre collection en ligne</p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8">Explorez notre catalogue</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/manufacturers" className="group">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Tag size={24} />
                </div>
                <h3 className="font-semibold mb-2">Fabricants</h3>
                <p className="text-gray-600 text-sm mb-4">Découvrez tous nos fabricants</p>
                <ArrowRight className="mx-auto text-primary" size={20} />
              </div>
            </Link>

            <Link to="/series" className="group">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp size={24} />
                </div>
                <h3 className="font-semibold mb-2">Séries</h3>
                <p className="text-gray-600 text-sm mb-4">Explorez par séries</p>
                <ArrowRight className="mx-auto text-primary" size={20} />
              </div>
            </Link>

            <Link to="/shops" className="group">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <h3 className="font-semibold mb-2">Boutiques</h3>
                <p className="text-gray-600 text-sm mb-4">Trouvez où acheter</p>
                <ArrowRight className="mx-auto text-primary" size={20} />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
