import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Package, ArrowRight, Calendar, Building, Newspaper, ShoppingBag, Users } from "lucide-react";
import MainNav from "../components/MainNav";

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
        { name: "Nendoroid", description: "Figurines super deformed avec pièces interchangeables", count: 1200 },
        { name: "figma", description: "Figurines articulées hautement détaillées", count: 500 },
        { name: "Pop Up Parade", description: "Figurines abordables de haute qualité", count: 300 }
      ],
      recentReleases: [
        { name: "Nendoroid Monkey D. Luffy", date: "2024-02", price: "6900¥", series: "One Piece" },
        { name: "figma Saber", date: "2024-01", price: "8900¥", series: "Fate/Stay Night" },
        { name: "Pop Up Parade Miku", date: "2023-12", price: "4500¥", series: "Vocaloid" }
      ],
      news: [
        { title: "Nouvelle collection Nendoroid annoncée", date: "2024-03-15", content: "Une nouvelle collection de Nendoroids basée sur la série Demon Slayer arrive bientôt !" },
        { title: "Augmentation de la production", date: "2024-03-01", content: "Notre usine augmente sa capacité de production de 30%" },
        { title: "Collaboration avec Studio Ghibli", date: "2024-02-15", content: "Nouvelle ligne de figurines en collaboration avec Studio Ghibli" }
      ],
      retailers: [
        { name: "HobbyLink Japan", location: "Japon", website: "https://hlj.com", authorized: true },
        { name: "AmiAmi", location: "Japon", website: "https://amiami.com", authorized: true },
        { name: "Tsume Store", location: "France", website: "https://tsume-art.com", authorized: true }
      ],
      statistics: {
        salesGrowth: "15%",
        marketShare: "35%",
        customerSatisfaction: "92%",
        internationalPresence: "45 pays",
        annualProduction: "500000 unités",
        employeeCount: "250+"
      },
      popularFigurines: [
        { name: "Nendoroid Eren Yeager", series: "Attack on Titan", price: "6900¥", rating: 4.9 },
        { name: "figma Guts", series: "Berserk", price: "9800¥", rating: 4.8 },
        { name: "Pop Up Parade Rei", series: "Evangelion", price: "4500¥", rating: 4.7 }
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

        {/* Histoire */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-4">Histoire</h2>
          <p className="text-gray-600 leading-relaxed">{manufacturer.history}</p>
        </div>

        {/* Statistiques détaillées */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Statistiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-primary">{manufacturer.statistics.marketShare}</div>
              <div className="text-sm text-gray-600">Part de marché</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-primary">{manufacturer.statistics.salesGrowth}</div>
              <div className="text-sm text-gray-600">Croissance des ventes</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-primary">{manufacturer.statistics.customerSatisfaction}</div>
              <div className="text-sm text-gray-600">Satisfaction client</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-primary">{manufacturer.statistics.internationalPresence}</div>
              <div className="text-sm text-gray-600">Présence internationale</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-primary">{manufacturer.statistics.annualProduction}</div>
              <div className="text-sm text-gray-600">Production annuelle</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-2xl font-bold text-primary">{manufacturer.statistics.employeeCount}</div>
              <div className="text-sm text-gray-600">Employés</div>
            </div>
          </div>
        </div>

        {/* Gammes populaires */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Gammes Populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {manufacturer.popularLines.map((line, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">{line.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{line.description}</p>
                <div className="text-primary font-medium">{line.count}+ figurines</div>
              </div>
            ))}
          </div>
        </div>

        {/* Figurines populaires */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Figurines Populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {manufacturer.popularFigurines.map((figurine, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">{figurine.name}</h3>
                <div className="text-gray-600 text-sm mb-2">{figurine.series}</div>
                <div className="flex justify-between items-center">
                  <div className="text-primary font-medium">{figurine.price}</div>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span>{figurine.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actualités */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Actualités</h2>
          <div className="space-y-6">
            {manufacturer.news.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Revendeurs officiels */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Revendeurs Officiels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {manufacturer.retailers.map((retailer, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">{retailer.name}</h3>
                <div className="text-gray-600 mb-3">{retailer.location}</div>
                <a
                  href={retailer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Visiter le site
                  <ArrowRight size={16} />
                </a>
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
                <div>
                  <span className="font-medium">{release.name}</span>
                  <div className="text-sm text-gray-500">{release.series}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-primary">{release.price}</div>
                  <div className="text-sm text-gray-500">{release.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManufacturerDetails;
