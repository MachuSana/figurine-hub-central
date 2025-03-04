
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Package, ArrowRight, Calendar, Globe, History, Award, Newspaper } from "lucide-react";
import MainNav from "../components/MainNav";
import { FigurineComments } from "../components/FigurineComments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
      news: [
        { title: "Nouvelle collection Nendoroid annoncée", date: "2024-03-15", content: "Une nouvelle collection de Nendoroids basée sur la série Demon Slayer arrive bientôt !" },
        { title: "Augmentation de la production", date: "2024-03-01", content: "Notre usine augmente sa capacité de production de 30%" },
        { title: "Collaboration avec Studio Ghibli", date: "2024-02-15", content: "Nouvelle ligne de figurines en collaboration avec Studio Ghibli" }
      ],
      popularFigurines: [
        { name: "Nendoroid Eren Yeager", series: "Attack on Titan", price: "6900¥", rating: 4.9 },
        { name: "figma Guts", series: "Berserk", price: "9800¥", rating: 4.8 },
        { name: "Pop Up Parade Rei", series: "Evangelion", price: "4500¥", rating: 4.7 }
      ],
      comments: [
        {
          author: "CollectorPro",
          date: "2024-03-15",
          content: "Un fabricant de référence pour les Nendoroids. La qualité est toujours au rendez-vous !",
          rating: 5
        },
        {
          author: "FigurinesFan",
          date: "2024-03-10",
          content: "J'adore leurs Pop Up Parade, excellent rapport qualité-prix.",
          rating: 4
        }
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
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Fabricant non trouvé</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Le fabricant demandé n'existe pas dans notre base de données.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 animate-fade-in">
          <Link 
            to="/manufacturers"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour à la liste
          </Link>
        </div>

        {/* Header */}
        <Card className="border-none shadow-sm overflow-hidden mb-8 animate-fade-in">
          <div className="relative h-80">
            <img
              src={manufacturer.image}
              alt={manufacturer.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
              <Star size={16} className="text-yellow-400 fill-current" />
              {manufacturer.rating}
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{manufacturer.name}</h1>
              <p className="text-xl opacity-90 max-w-2xl">{manufacturer.description}</p>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="bg-muted/50 border-none">
                <CardContent className="p-4 flex items-center gap-3">
                  <Calendar className="text-primary h-5 w-5" />
                  <div>
                    <div className="text-sm text-gray-500">Fondé en</div>
                    <div className="font-medium">{manufacturer.founded}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/50 border-none">
                <CardContent className="p-4 flex items-center gap-3">
                  <MapPin className="text-primary h-5 w-5" />
                  <div>
                    <div className="text-sm text-gray-500">Localisation</div>
                    <div className="font-medium">{manufacturer.location}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/50 border-none">
                <CardContent className="p-4 flex items-center gap-3">
                  <Package className="text-primary h-5 w-5" />
                  <div>
                    <div className="text-sm text-gray-500">Produits</div>
                    <div className="font-medium">{manufacturer.productsCount}+</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/50 border-none">
                <CardContent className="p-4 flex items-center gap-3">
                  <Globe className="text-primary h-5 w-5" />
                  <div>
                    <div className="text-sm text-gray-500">Site Web</div>
                    <div className="font-medium truncate">
                      <a 
                        href={manufacturer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {manufacturer.website.replace('https://', '')}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {manufacturer.specialties.map((specialty, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-primary/5 text-primary px-4 py-2 rounded-full text-sm hover:bg-primary/10 transition-colors border-primary/10"
                >
                  {specialty}
                </Badge>
              ))}
            </div>

            <Button
              asChild
              variant="default"
              className="group"
            >
              <a
                href={manufacturer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Visiter le site officiel
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Histoire */}
            <Card className="border-none shadow-sm animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <History className="text-primary h-5 w-5" />
                  <CardTitle className="text-2xl">Histoire</CardTitle>
                </div>
              </CardHeader>
              <Separator className="mx-6" />
              <CardContent className="pt-6">
                <p className="text-gray-600 leading-relaxed">{manufacturer.history}</p>
              </CardContent>
            </Card>

            {/* Gammes */}
            <Card className="border-none shadow-sm animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Award className="text-primary h-5 w-5" />
                  <CardTitle className="text-2xl">Gammes populaires</CardTitle>
                </div>
              </CardHeader>
              <Separator className="mx-6" />
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {manufacturer.popularLines.map((line, index) => (
                    <Link
                      key={index}
                      to={`/series/${line.name.toLowerCase()}`}
                      className="bg-muted/50 rounded-lg p-5 hover:bg-muted transition-colors group"
                    >
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{line.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{line.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-primary font-medium text-sm">{line.count}+ figurines</div>
                        <ArrowRight size={16} className="text-gray-400 group-hover:text-primary transition-colors group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actualités */}
            <Card className="border-none shadow-sm animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Newspaper className="text-primary h-5 w-5" />
                  <CardTitle className="text-2xl">Actualités</CardTitle>
                </div>
              </CardHeader>
              <Separator className="mx-6" />
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {manufacturer.news.map((item, index) => (
                    <Card key={index} className="border border-muted">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base font-bold">{item.title}</CardTitle>
                          <Badge variant="outline" className="bg-muted/70 text-xs">
                            {item.date}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="text-gray-600 text-sm">{item.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Figurines */}
            <Card className="border-none shadow-sm animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Figurines Populaires</CardTitle>
                <CardDescription>Les plus vendues</CardDescription>
              </CardHeader>
              <Separator className="mx-6" />
              <CardContent className="pt-6">
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {manufacturer.popularFigurines.map((figurine, index) => (
                    <Card key={index} className="border border-muted">
                      <CardContent className="p-4">
                        <h3 className="font-bold text-base mb-1">{figurine.name}</h3>
                        <div className="text-gray-600 text-xs mb-3">{figurine.series}</div>
                        <div className="flex justify-between items-center">
                          <div className="text-primary font-medium">{figurine.price}</div>
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-400 fill-current" />
                            <span className="text-sm">{figurine.rating}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-4 px-6">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/figurines">
                    Voir toutes les figurines
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Commentaires */}
            <div className="animate-fade-in">
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Avis des collectionneurs</CardTitle>
                  <CardDescription>Ce qu'en pensent les experts</CardDescription>
                </CardHeader>
                <Separator className="mx-6" />
                <CardContent className="pt-6">
                  <FigurineComments comments={manufacturer.comments} />
                </CardContent>
                <CardFooter className="pt-0 pb-4 px-6">
                  <Button variant="outline" size="sm" className="w-full">
                    Ajouter un commentaire
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManufacturerDetails;
