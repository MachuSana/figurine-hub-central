
import MainNav from "../components/MainNav";
import { useState } from "react";
import { ManufacturerCard } from "../components/manufacturers/ManufacturerCard";
import { ManufacturerFilters } from "../components/manufacturers/ManufacturerFilters";
import { ManufacturerStats } from "../components/manufacturers/ManufacturerStats";
import { AdvertisementBanner } from "@/components/home/AdvertisementBanner";

const Manufacturers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const manufacturers = [
    {
      id: 1,
      name: "Good Smile Company",
      description: "Leader mondial des Nendoroids et figmas",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      founded: "2001",
      location: "Tokyo, Japon",
      rating: 4.8,
      productsCount: 1500,
      specialties: ["Nendoroid", "Figma", "Scale Figures"],
      website: "https://goodsmile.com",
    },
    {
      id: 2,
      name: "Kotobukiya",
      description: "Spécialiste des figurines de haute qualité",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      founded: "1953",
      location: "Tokyo, Japon",
      rating: 4.7,
      productsCount: 1200,
      specialties: ["ARTFX", "Bishoujo", "Frame Arms"],
      website: "https://kotobukiya.com",
    },
    {
      id: 3,
      name: "Bandai",
      description: "Expert en figurines d'anime et de manga",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      founded: "1950",
      location: "Tokyo, Japon",
      rating: 4.9,
      productsCount: 2000,
      specialties: ["S.H.Figuarts", "Gunpla", "Dragon Ball"],
      website: "https://bandai.com",
    },
    {
      id: 4,
      name: "Max Factory",
      description: "Créateur de figurines premium et détaillées",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      founded: "1987",
      location: "Tokyo, Japon",
      rating: 4.8,
      productsCount: 950,
      specialties: ["figma", "Scale Figures", "Statues"],
      website: "https://max-factory.jp",
    },
    {
      id: 5,
      name: "MegaHouse",
      description: "Spécialiste des figurines d'anime populaires",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
      founded: "1988",
      location: "Tokyo, Japon",
      rating: 4.6,
      productsCount: 1100,
      specialties: ["Portrait Of Pirates", "G.E.M", "Petit Chara"],
      website: "https://megahobby.jp",
    },
  ];

  const allSpecialties = Array.from(
    new Set(manufacturers.flatMap((m) => m.specialties))
  );

  const handleFilterChange = (filters: { search: string; specialty: string | null }) => {
    setSearchQuery(filters.search);
    setSelectedSpecialty(filters.specialty);
  };

  const filteredManufacturers = manufacturers.filter((manufacturer) => {
    const matchesSearch = manufacturer.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      !selectedSpecialty ||
      manufacturer.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <span className="bg-primary/10 text-primary p-2 rounded-lg mr-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-factory"
            >
              <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
              <path d="M17 18h1"/>
              <path d="M12 18h1"/>
              <path d="M7 18h1"/>
            </svg>
          </span>
          Fabricants
        </h1>

        {/* Bannière publicitaire en haut */}
        <AdvertisementBanner variant="fullwidth" className="mb-8" />

        <ManufacturerFilters 
          specialties={allSpecialties} 
          onFilterChange={handleFilterChange} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredManufacturers.length > 0 ? (
            filteredManufacturers.map((manufacturer) => (
              <ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-factory text-gray-300 mx-auto mb-4"
              >
                <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                <path d="M17 18h1"/>
                <path d="M12 18h1"/>
                <path d="M7 18h1"/>
              </svg>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Aucun fabricant trouvé</h3>
              <p className="text-gray-500 mb-4">
                Aucun fabricant ne correspond à vos critères de recherche.
              </p>
              <button 
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                onClick={() => handleFilterChange({ search: "", specialty: null })}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Bannière publicitaire au milieu */}
        <AdvertisementBanner variant="inline" className="my-10" />

        <ManufacturerStats />
        
        {/* Bannière publicitaire en bas */}
        <AdvertisementBanner variant="sidebar" className="mt-10" dismissible={false} />
      </main>
    </div>
  );
};

export default Manufacturers;
