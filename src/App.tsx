
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { ScrollToTop } from "./components/ScrollToTop";

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
        <ScrollToTop />
        <Routes>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
