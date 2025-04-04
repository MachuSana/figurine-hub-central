
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminProtectedRoute } from "@/components/auth/AdminProtectedRoute";

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
import AdminManufacturers from "./pages/admin/AdminManufacturers";
import AdminCharacters from "./pages/admin/AdminCharacters";

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
        <AuthProvider>
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
            <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
            <Route path="/admin/news" element={<AdminProtectedRoute><AdminNews /></AdminProtectedRoute>} />
            <Route path="/admin/figurines" element={<AdminProtectedRoute><AdminFigurines /></AdminProtectedRoute>} />
            <Route path="/admin/manufacturers" element={<AdminProtectedRoute><AdminManufacturers /></AdminProtectedRoute>} />
            <Route path="/admin/characters" element={<AdminProtectedRoute><AdminCharacters /></AdminProtectedRoute>} />
            
            {/* Not Found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
