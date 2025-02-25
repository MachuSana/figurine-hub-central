
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Package, ArrowRight, Calendar } from "lucide-react";
import MainNav from "../components/MainNav";
import { FigurineGallery } from "../components/FigurineGallery";

const ManufacturerDetails = () => {
  const { id } = useParams();
  
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
      history: "Good Smile Company a été fondée en 2001 et s'est rapidement imposée comme le leader des figurines Nendoroid. L'entreprise est connue pour sa qualité exceptionnelle et son attention aux détails.",
      popularLines: [
        { name: "Nendoroid", description: "Figurines super deformed avec pièces interchangeables" },
        { name: "figma", description: "Figurines articulées hautement détaillées" },
        { name: "Pop Up Parade", description: "Figurines abordables de haute qualité" }
      ],
      recentReleases: [
        { name: "Nendoroid Monkey D. Luffy", date: "2024-02" },
        { name: "figma Saber", date: "2024-01" },
        { name: "Pop Up Parade Miku", date: "2023-12" }
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
      ]
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
      history: "Kotobukiya est un fabricant japonais de figurines, de kits de modèles et de jouets fondé en 1953. L'entreprise est connue pour ses produits de haute qualité et son souci du détail.",
      popularLines: [
        { name: "ARTFX", description: "Figurines en PVC à l'échelle" },
        { name: "Bishoujo", description: "Figurines de personnages féminins" },
        { name: "Frame Arms", description: "Kits de modèles de robots" }
      ],
      recentReleases: [
        { name: "ARTFX J Joker", date: "2024-03" },
        { name: "Bishoujo Harley Quinn", date: "2024-02" },
        { name: "Frame Arms Girl Hresvelgr", date: "2024-01" }
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
      ]
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
      history: "Bandai est une entreprise japonaise de jouets et de jeux vidéo fondée en 1950. L'entreprise est connue pour ses figurines d'anime et de manga, ainsi que pour ses kits de modèles Gunpla.",
      popularLines: [
        { name: "S.H.Figuarts", description: "Figurines articulées hautement détaillées" },
        { name: "Gunpla", description: "Kits de modèles de robots Gundam" },
        { name: "Tamashii Nations", description: "Figurines de collection haut de gamme" }
      ],
      recentReleases: [
        { name: "S.H.Figuarts Son Goku", date: "2024-04" },
        { name: "Gunpla RX-78-2 Gundam", date: "2024-03" },
        { name: "Tamashii Nations Sailor Moon", date: "2024-02" }
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
      ]
    }
  ];

  const manufacturer = manufacturers.find(m => m.id === Number(id));

  if (!manufacturer) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNav />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link 
              to="/manufacturers"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} className="mr-1" />
              Retour à la liste
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Fabricant non trouvé</h1>
            <p className="text-gray-600">Le fabricant demandé n'existe pas dans notre base de données.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/manufacturers"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour à la liste
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-64">
            <img
              src={manufacturer.image}
              alt={manufacturer.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
              <Star size={16} className="text-yellow-400 fill-current" />
              {manufacturer.rating}
            </div>
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{manufacturer.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{manufacturer.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Calendar size={24} className="text-primary" />
                <div>
                  <div className="text-sm text-gray-500">Fondé en</div>
                  <div className="font-medium">{manufacturer.founded}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={24} className="text-primary" />
                <div>
                  <div className="text-sm text-gray-500">Localisation</div>
                  <div className="font-medium">{manufacturer.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package size={24} className="text-primary" />
                <div>
                  <div className="text-sm text-gray-500">Produits</div>
                  <div className="font-medium">{manufacturer.productsCount}+</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {manufacturer.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <a
              href={manufacturer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-white hover:bg-primary px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              Visiter le site officiel
              <ArrowRight size={20} />
            </a>
          </div>
        </div>

        {/* Galerie */}
        <div className="mt-8">
          <FigurineGallery 
            name={manufacturer.name}
            images={manufacturer.galleryImages}
          />
        </div>

        {/* Histoire */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-4">Histoire</h2>
          <p className="text-gray-600 leading-relaxed">{manufacturer.history}</p>
        </div>

        {/* Gammes populaires */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Gammes Populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {manufacturer.popularLines.map((line, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold mb-2">{line.name}</h3>
                <p className="text-gray-600 text-sm">{line.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sorties récentes */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Sorties Récentes</h2>
          <div className="space-y-4">
            {manufacturer.recentReleases.map((release, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">{release.name}</span>
                <span className="text-gray-500">{release.date}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManufacturerDetails;
