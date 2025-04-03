
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Lock, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const navItems = [
    { name: "Actualités", path: "/news" },
    { name: "Figurines", path: "/figurines" },
    { name: "Fabricants", path: "/manufacturers" },
    { name: "Gammes", path: "/series" },
    { name: "Licences", path: "/licenses" },
    { name: "Personnages", path: "/characters" },
    { name: "Boutiques", path: "/shops" },
  ];

  // Check if user is logged in
  supabase.auth.getSession().then(({ data }) => {
    setUser(data.session?.user || null);
  });

  // Handle logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl text-primary">
            FigureNews
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-1"
            >
              <Lock size={16} />
              Admin
            </Link>
            
            {user ? (
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Déconnexion
              </Button>
            ) : (
              <Link
                to="/admin/login"
                className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center gap-1"
              >
                <LogIn size={16} />
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-600 hover:text-primary transition-colors duration-200 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admin"
                className="text-primary hover:text-primary/80 transition-colors duration-200 py-2 flex items-center gap-1"
                onClick={() => setIsOpen(false)}
              >
                <Lock size={16} />
                Admin
              </Link>
              
              {user ? (
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-gray-600 hover:text-primary transition-colors duration-200 py-2 justify-start"
                >
                  Déconnexion
                </Button>
              ) : (
                <Link
                  to="/admin/login"
                  className="text-gray-600 hover:text-primary transition-colors duration-200 py-2 flex items-center gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={16} />
                  Connexion
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
