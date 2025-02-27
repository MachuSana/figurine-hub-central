import MainNav from "../components/MainNav";
import { Calendar, Eye, MessageSquare, ArrowRight, Star, TrendingUp, Tag, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">FigureNews</h1>
          <p className="text-gray-600 mb-8">Toute l'actualité des figurines</p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/figurines"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Explorer les figurines
            </Link>
            <Link 
              to="/auth"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
