
import MainNav from "../components/MainNav";
import { EventLink } from "@/components/EventLink";
import ReleaseCalendarPreview from "@/components/ReleaseCalendarPreview";
import { HeroSection } from "@/components/home/HeroSection";
import { SearchBar } from "@/components/home/SearchBar";
import { FeaturedFigurines } from "@/components/home/FeaturedFigurines";
import { PromotionalBanners } from "@/components/home/PromotionalBanners";
import { NewsSection } from "@/components/home/NewsSection";
import { Newsletter } from "@/components/home/Newsletter";
import { StatsSection } from "@/components/home/StatsSection";
import { BrandsSection } from "@/components/home/BrandsSection";
import { Footer } from "@/components/home/Footer";
import { AdvertisementBanner } from "@/components/home/AdvertisementBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        
        <SearchBar />
        
        {/* Structure à deux colonnes: Événements + Calendrier */}
        <div className="grid md:grid-cols-5 gap-6 mb-10">
          <div className="md:col-span-3">
            <EventLink limit={2} />
          </div>
          <div className="md:col-span-2">
            <ReleaseCalendarPreview />
          </div>
        </div>

        {/* Première bannière publicitaire */}
        <AdvertisementBanner variant="fullwidth" />

        <FeaturedFigurines />
        
        <PromotionalBanners />

        {/* Deuxième bannière publicitaire avec un style différent */}
        <AdvertisementBanner variant="inline" className="mx-auto" />

        <NewsSection />
        
        <Newsletter />
        
        <StatsSection />
        
        <BrandsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
