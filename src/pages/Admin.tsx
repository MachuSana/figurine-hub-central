
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import MainNav from "@/components/MainNav";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Administration</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Fabricants", href: "/admin/manufacturers" },
            { title: "Gammes", href: "/admin/product-lines" },
            { title: "Séries", href: "/admin/series" },
            { title: "Personnages", href: "/admin/characters" },
            { title: "Figurines", href: "/admin/figures" },
            { title: "Actualités", href: "/admin/news" }
          ].map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.href)}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Admin;
