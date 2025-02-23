
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Figurines from "./pages/Figurines";
import FigurineDetails from "./pages/FigurineDetails";
import Manufacturers from "./pages/Manufacturers";
import Series from "./pages/Series";
import Licenses from "./pages/Licenses";
import Characters from "./pages/Characters";
import Shops from "./pages/Shops";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/figurines" element={<Figurines />} />
          <Route path="/figurines/:id" element={<FigurineDetails />} />
          <Route path="/manufacturers" element={<Manufacturers />} />
          <Route path="/series" element={<Series />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
