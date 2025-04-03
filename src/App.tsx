
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Main site pages
import Index from "./pages/Index";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import EventDetail from "./pages/EventDetail";
import Figurines from "./pages/Figurines";
import FigurineDetails from "./pages/FigurineDetails";
import Manufacturers from "./pages/Manufacturers";
import ManufacturerDetails from "./pages/ManufacturerDetails";
import Series from "./pages/Series";
import SeriesDetails from "./pages/SeriesDetails";
import Licenses from "./pages/Licenses";
import LicenseDetails from "./pages/LicenseDetails";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";
import Shops from "./pages/Shops";
import ShopDetails from "./pages/ShopDetails";
import ReleaseScheduleDetail from "./pages/ReleaseScheduleDetail";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNews from "./pages/admin/AdminNews";
import AdminFigurines from "./pages/admin/AdminFigurines";

// Define the ProtectedRoute component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      setIsLoading(false);
    };

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    checkAuth();
    
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner richColors closeButton position="bottom-right" />
      <BrowserRouter>
        <Routes>
          {/* Main site routes */}
          <Route path="/" element={<Index />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/figurines" element={<Figurines />} />
          <Route path="/figurines/:id" element={<FigurineDetails />} />
          <Route path="/manufacturers" element={<Manufacturers />} />
          <Route path="/manufacturers/:id" element={<ManufacturerDetails />} />
          <Route path="/series" element={<Series />} />
          <Route path="/series/:name" element={<SeriesDetails />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/licenses/:id" element={<LicenseDetails />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shops/:id" element={<ShopDetails />} />
          <Route path="/release-schedule/:month" element={<ReleaseScheduleDetail />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/news" element={<ProtectedRoute><AdminNews /></ProtectedRoute>} />
          <Route path="/admin/figurines" element={<ProtectedRoute><AdminFigurines /></ProtectedRoute>} />
          
          {/* Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
