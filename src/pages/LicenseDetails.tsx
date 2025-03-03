
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Calendar, Users, Package, ShoppingBag, TrendingUp, BadgeInfo, ExternalLink, Share2, Tag, ArrowRight, Heart, Info, Globe, Clock } from "lucide-react";
import MainNav from "../components/MainNav";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { useEffect, useState } from "react";
import { FigurineDescription } from "../components/FigurineDescription";

const LicenseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Mock data for licenses
  const licenses = [
    {
      id: 1,
      name: "Re:Zero",
      company: "White Fox",
      type: "Anime/Light Novel",
      description: "Une histoire de fantasy où Subaru Natsuki se retrouve transporté dans un autre monde. Après sa mort, il réalise qu'il a le pouvoir de revenir dans le temps, ce qui lui permet de corriger ses erreurs et d'essayer de sauver ses amis.",
      longDescription: `Re:Zero - Starting Life in Another World est une série de light novels écrite par Tappei Nagatsuki et illustrée par Shinichirou Otsuka. Elle raconte l'histoire de Subaru Natsuki, un hikikomori (reclus) qui est soudainement transporté dans un monde fantastique alors qu'il rentrait de l'épicerie.

Dans ce monde, Subaru découvre qu'il possède un pouvoir unique appelé "Retour par la Mort" qui le ramène à un point fixe dans le temps après sa mort. Ce pouvoir lui permet de corriger ses erreurs, d'apprendre de ses échecs et d'essayer de créer un avenir meilleur pour lui et ses proches.

La série a été adaptée en anime par White Fox en 2016, et a rapidement gagné en popularité grâce à son intrigue profonde, ses personnages attachants et sa représentation réaliste des conséquences psychologiques du voyage dans le temps.`,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      images: [
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
      ],
      startDate: "2012-04-20",
      endDate: null,
      seriesCount: 1,
      figureCount: 150,
      rating: 4.9,
      seasons: ["Saison 1", "Saison 2 Partie 1", "Saison 2 Partie 2"],
      popularCharacters: [
        { name: "Rem", popularity: 98, bestFigure: "Rem - Maid Ver. 1/7" },
        { name: "Emilia", popularity: 92, bestFigure: "Emilia - Crystal Dress 1/7" },
        { name: "Ram", popularity: 85, bestFigure: "Ram & Rem - Birthday 1/7" },
        { name: "Beatrice", popularity: 80, bestFigure: "Beatrice - Library 1/7" },
        { name: "Subaru Natsuki", popularity: 75, bestFigure: "Subaru - Winter Outfit 1/8" }
      ],
      bestSellers: [
        { name: "Rem - Maid Ver. 1/7", price: "14800¥", manufacturer: "Good Smile Company", releaseDate: "2018-03" },
        { name: "Emilia - Crystal Dress 1/7", price: "24000¥", manufacturer: "eStream", releaseDate: "2021-06" },
        { name: "Ram & Rem - Birthday 1/7", price: "28000¥", manufacturer: "Kadokawa", releaseDate: "2020-09" }
      ],
      relatedLicenses: [
        { id: 3, name: "DanMachi", type: "Anime/Light Novel" },
        { id: 4, name: "Genshin Impact", type: "Jeu Vidéo" }
      ],
      news: [
        { title: "Annonce d'une nouvelle figurine Rem", date: "2023-12-15", source: "MFC" },
        { title: "Début de la production de la saison 3", date: "2023-10-28", source: "ANN" },
        { title: "Nouvelle collection de figurines annoncée", date: "2023-09-05", source: "AmiAmi" }
      ],
      statistics: {
        totalSales: "1.2B ¥",
        marketShare: "15%",
        growthRate: "+8%",
        averageFigurePrice: "16500¥",
        popularityTrend: "En hausse",
        releasesPerYear: 25
      },
      externalLinks: [
        { name: "Site Officiel", url: "https://re-zero-anime.jp/" },
        { name: "Crunchyroll", url: "https://www.crunchyroll.com/series/GRGG9798R/rezero--starting-life-in-another-world-" },
        { name: "Twitter", url: "https://twitter.com/rezero_official" },
        { name: "Instagram", url: "https://www.instagram.com/rezero_official/" },
        { name: "YouTube", url: "https://www.youtube.com/channel/UCXf-aXMJMQfi8VeSXpw0j_w" }
      ],
      events: [
        { name: "Re:Zero Festival 2023", date: "2023-11-25", location: "Tokyo, Japon" },
        { name: "WonderFest Winter 2024", date: "2024-02-10", location: "Chiba, Japon" }
      ],
      timeline: [
        { year: 2012, event: "Début de la publication du light novel" },
        { year: 2016, event: "Première saison de l'anime" },
        { year: 2018, event: "Film Re:Zero Memory Snow" },
        { year: 2019, event: "Film Re:Zero Frozen Bonds" },
        { year: 2020, event: "Deuxième saison de l'anime" }
      ]
    },
    {
      id: 2,
      name: "Azur Lane",
      company: "Yostar",
      type: "Jeu Vidéo/Anime",
      description: "Un jeu de tir naval mettant en scène des navires anthropomorphisés en jeunes filles",
      longDescription: `Azur Lane est un jeu mobile free-to-play développé par Shanghai Manjuu et Xiamen Yongshi, et publié par Yostar. Il combine des éléments de shoot 'em up avec des mécaniques de gacha et de jeu de rôle.

Le jeu se déroule dans un monde où des navires de guerre historiques sont représentés sous forme de jeunes filles appelées "Shipgirls". Ces personnages sont inspirés de vrais navires de la Seconde Guerre mondiale provenant des marines américaine, britannique, japonaise et allemande.

Azur Lane a été adapté en anime et a connu un grand succès commercial, en particulier au Japon et en Chine. Sa popularité a donné naissance à de nombreux produits dérivés, dont des figurines de haute qualité.`,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      images: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
      ],
      startDate: "2017-05-25",
      endDate: null,
      seriesCount: 2,
      figureCount: 200,
      rating: 4.8,
      seasons: ["Anime Saison 1", "Slow Ahead!"],
      popularCharacters: [
        { name: "Enterprise", popularity: 97, bestFigure: "Enterprise - Party Dress" },
        { name: "Belfast", popularity: 94, bestFigure: "Belfast - Wedding Ver." },
        { name: "Akagi", popularity: 88, bestFigure: "Akagi - Race Queen" },
        { name: "Prinz Eugen", popularity: 85, bestFigure: "Prinz Eugen - Swimsuit Ver." },
        { name: "Atago", popularity: 83, bestFigure: "Atago - Luxurious Wheels" }
      ],
      bestSellers: [
        { name: "Enterprise - Party Dress", price: "19800¥", manufacturer: "Alter", releaseDate: "2022-01" },
        { name: "Belfast - Wedding Ver.", price: "22500¥", manufacturer: "Knead", releaseDate: "2021-08" },
        { name: "Akagi - Race Queen", price: "20800¥", manufacturer: "Alter", releaseDate: "2020-11" }
      ],
      relatedLicenses: [
        { id: 4, name: "Genshin Impact", type: "Jeu Vidéo" },
        { id: 5, name: "Fate/Grand Order", type: "Jeu Vidéo/Anime" }
      ],
      news: [
        { title: "Nouvelle collaboration avec SSSS.Gridman", date: "2023-11-30", source: "Crunchyroll" },
        { title: "Figurine exclusive de Shinano annoncée", date: "2023-10-15", source: "MFC" }
      ],
      statistics: {
        totalSales: "890M ¥",
        marketShare: "12%",
        growthRate: "+15%",
        averageFigurePrice: "19800¥",
        popularityTrend: "En hausse",
        releasesPerYear: 30
      },
      externalLinks: [
        { name: "Site Officiel", url: "https://azurlane.yo-star.com/" },
        { name: "Crunchyroll", url: "https://www.crunchyroll.com/series/GR0K8QPG2/azur-lane" },
        { name: "Twitter", url: "https://twitter.com/AzurLane_EN" },
        { name: "Facebook", url: "https://www.facebook.com/AzurLaneEN/" },
        { name: "Discord", url: "https://discord.gg/azurlane" }
      ],
      events: [
        { name: "Azur Lane 6th Anniversary", date: "2023-05-25", location: "Shanghai, Chine" }
      ],
      timeline: [
        { year: 2017, event: "Sortie du jeu en Chine" },
        { year: 2019, event: "Adaptation anime" },
        { year: 2021, event: "Anime Slow Ahead!" }
      ]
    },
    // ... more licenses
  ];
  
  const license = licenses.find(l => l.id === Number(id));
  
  // Handle image carousel
  useEffect(() => {
    if (!license) return;
    
    const interval = setInterval(() => {
      setActiveImageIndex((current) => 
        current === license.images.length - 1 ? 0 : current + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [license]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  if (!license) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNav />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link 
              to="/licenses"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} className="mr-1" />
              Retour aux licences
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Licence non trouvée</h1>
            <p className="text-gray-600">La licence demandée n'existe pas dans notre base de données.</p>
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
            to="/licenses"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour aux licences
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 transition-all duration-300 hover:shadow-lg">
          <div className="relative h-72 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
            <img 
              src={license.images[activeImageIndex]} 
              alt={license.name} 
              className="w-full h-full object-cover transition-opacity duration-700 animate-fade-in"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {license.type}
                </span>
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  {license.rating}
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-1">{license.name}</h1>
              <p className="text-white/90 text-lg">{license.company}</p>
            </div>
            <div className="absolute top-4 right-4 z-20 flex space-x-2">
              <button 
                onClick={toggleFavorite}
                className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                  isFavorite 
                    ? 'bg-primary/90 text-white' 
                    : 'bg-white/80 text-gray-700 hover:bg-primary/20'
                }`}
                aria-label="Ajouter aux favoris"
              >
                <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
              </button>
              <button 
                className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-primary/20 transition-colors"
                aria-label="Partager"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center -mt-4 relative z-30">
            <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm">
              {license.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeImageIndex ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors">
                <Calendar className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-sm text-gray-500">Année de début</div>
                  <div className="font-medium text-lg">{new Date(license.startDate).getFullYear()}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-sm text-gray-500">Personnages</div>
                  <div className="font-medium text-lg">{license.popularCharacters.length}+ populaires</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors">
                <Package className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-sm text-gray-500">Figurines</div>
                  <div className="font-medium text-lg">{license.figureCount}+ disponibles</div>
                </div>
              </div>
            </div>
            
            <FigurineDescription description={license.description} />
            
            <div className="flex flex-wrap gap-3 mt-6">
              {license.seasons.map((season, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  {season}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6 bg-white/90 backdrop-blur-sm p-1 rounded-full">
                <TabsTrigger value="overview" className="rounded-full">Aperçu</TabsTrigger>
                <TabsTrigger value="characters" className="rounded-full">Personnages</TabsTrigger>
                <TabsTrigger value="figures" className="rounded-full">Figurines</TabsTrigger>
                <TabsTrigger value="history" className="rounded-full">Histoire</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 animate-fade-in">
                <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Info size={20} className="text-primary" />
                    À propos de {license.name}
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">{license.longDescription}</p>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Globe size={18} className="mr-2 text-primary" />
                      Liens et réseaux sociaux
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {license.externalLinks.map((link, index) => (
                        <a 
                          key={index}
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center p-4 rounded-lg border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                        >
                          <ExternalLink size={16} className="mr-3 text-primary" />
                          <div>
                            <div className="font-medium">{link.name}</div>
                            <div className="text-xs text-gray-500 truncate">{link.url}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    Actualités récentes
                  </h3>
                  {license.news.map((item, index) => (
                    <div key={index} className={`${index > 0 ? "mt-4 pt-4 border-t" : ""} hover:bg-primary/5 p-2 rounded-lg transition-colors`}>
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{item.title}</h4>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.date}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Source: {item.source}</div>
                    </div>
                  ))}
                </div>
                
                {license.relatedLicenses.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Licences similaires</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {license.relatedLicenses.map((related) => (
                        <Link 
                          key={related.id}
                          to={`/licenses/${related.id}`}
                          className="flex items-center p-4 rounded-lg border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                        >
                          <div>
                            <div className="font-medium">{related.name}</div>
                            <div className="text-sm text-gray-500">{related.type}</div>
                          </div>
                          <ArrowRight size={16} className="ml-auto text-primary" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="characters" className="animate-fade-in">
                <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Users size={20} className="text-primary" />
                    Personnages populaires
                  </h2>
                  
                  <div className="space-y-6">
                    {license.popularCharacters.map((character, index) => (
                      <div key={index} className={`${index > 0 ? "pt-6 border-t" : ""} hover:bg-primary/5 p-3 rounded-lg transition-colors`}>
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <h3 className="font-semibold text-lg">{character.name}</h3>
                          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            Popularité: {character.popularity}%
                          </div>
                        </div>
                        <p className="text-gray-600 mt-2">
                          Meilleure figurine: <span className="font-medium">{character.bestFigure}</span>
                        </p>
                        <div className="mt-4">
                          <Link to={`/characters?search=${character.name}`}>
                            <Button size="sm" variant="outline" className="hover:bg-primary/10 transition-colors">
                              Voir le personnage
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="figures" className="animate-fade-in">
                <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Package size={20} className="text-primary" />
                    Figurines les plus populaires
                  </h2>
                  
                  <div className="space-y-6">
                    {license.bestSellers.map((figure, index) => (
                      <div key={index} className={`${index > 0 ? "pt-6 border-t" : ""} hover:bg-primary/5 p-3 rounded-lg transition-colors`}>
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <h3 className="font-semibold text-lg">{figure.name}</h3>
                          <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                            {figure.price}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          <p className="text-gray-600">
                            Fabricant: <span className="font-medium">{figure.manufacturer}</span>
                          </p>
                          <p className="text-gray-600">
                            Date de sortie: <span className="font-medium">{figure.releaseDate}</span>
                          </p>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline" className="flex items-center gap-2">
                            <ShoppingBag size={16} />
                            Voir les boutiques
                          </Button>
                          <Button size="sm" variant="secondary" className="flex items-center gap-2">
                            Pré-commander
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="animate-fade-in">
                <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Clock size={20} className="text-primary" />
                    Chronologie de la licence
                  </h2>
                  
                  <div className="relative pl-8 ml-6 space-y-8 pb-4">
                    <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-primary/20"></div>
                    
                    {license.timeline.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-10 top-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                          <span>{index + 1}</span>
                        </div>
                        <div className="p-5 rounded-lg border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
                          <div className="font-bold text-primary text-lg">{item.year}</div>
                          <div className="mt-1 text-gray-700">{item.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {license.events.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-6 mt-6 transition-all duration-300 hover:shadow-md">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Calendar size={18} className="text-primary" />
                      Événements à venir
                    </h3>
                    <div className="space-y-4">
                      {license.events.map((event, index) => (
                        <div key={index} className="flex items-start p-3 rounded-lg hover:bg-primary/5 transition-colors">
                          <div className="min-w-24 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">{event.date}</div>
                          <div className="ml-4">
                            <div className="font-medium">{event.name}</div>
                            <div className="text-sm text-gray-600">{event.location}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BadgeInfo size={18} className="text-primary" />
                Informations clés
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{license.type}</span>
                </div>
                <Separator className="bg-gray-100" />
                <div className="flex justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span className="text-gray-600">Entreprise:</span>
                  <span className="font-medium">{license.company}</span>
                </div>
                <Separator className="bg-gray-100" />
                <div className="flex justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span className="text-gray-600">Début:</span>
                  <span className="font-medium">{new Date(license.startDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <Separator className="bg-gray-100" />
                <div className="flex justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span className="text-gray-600">Séries:</span>
                  <span className="font-medium">{license.seriesCount}</span>
                </div>
                <Separator className="bg-gray-100" />
                <div className="flex justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span className="text-gray-600">Figurines:</span>
                  <span className="font-medium">{license.figureCount}+</span>
                </div>
                <Separator className="bg-gray-100" />
                <div className="flex justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span className="text-gray-600">Note:</span>
                  <span className="font-medium flex items-center">
                    {license.rating}
                    <Star size={14} className="ml-1 text-yellow-400 fill-current" />
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full">Voir toutes les figurines</Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" />
                Statistiques
              </h3>
              
              <div className="space-y-3">
                {license.statistics && Object.entries(license.statistics).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors">
                    <span className="text-gray-600">
                      {key.replace(/([A-Z])/g, ' $1')
                        .replace(/^./, function(str){ return str.toUpperCase(); })
                        .replace(/Total/g, 'Total des')
                        .replace(/Average/g, 'Moyenne des')
                        .replace(/Rate/g, 'Taux')}:
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Share2 size={18} className="text-primary" />
                Partager
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <Button size="sm" variant="outline" className="flex-1 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Twitter
                </Button>
                <Button size="sm" variant="outline" className="flex-1 hover:bg-blue-100 hover:text-blue-800 transition-colors">
                  Facebook
                </Button>
                <Button size="sm" variant="outline" className="flex-1 hover:bg-gray-100 transition-colors">
                  Copier
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LicenseDetails;
