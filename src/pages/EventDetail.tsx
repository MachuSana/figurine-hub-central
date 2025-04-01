
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, MapPin, Clock, Users, ExternalLink, Image, Ticket, Info } from "lucide-react";
import MainNav from "@/components/MainNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SocialShare } from "@/components/SocialShare";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Données fictives pour les événements, adaptées au format Wonder Festival
const eventsData = [
  {
    id: 3,
    title: "Wonder Festival 2024 Winter",
    summary: "Le plus grand salon mondial dédié aux figurines et à la culture pop japonaise",
    content: "Le Wonder Festival 2024 Winter se tiendra au Makuhari Messe International Exhibition Hall à Chiba, Japon. Il s'agit du plus grand salon mondial dédié aux figurines, garage kits et collectibles japonais. Cet événement semestriel rassemble des fabricants professionnels et des créateurs amateurs (cercles) qui présentent et vendent leurs dernières créations.\n\nChaque Wonder Festival attire plus de 50 000 visiteurs et compte plus de 2 000 exposants. Des grandes entreprises comme Good Smile Company, Kotobukiya et Bandai y dévoilent leurs prochaines figurines, tandis que des milliers de cercles indépendants proposent leurs créations uniques en édition limitée.\n\nLes visiteurs pourront découvrir en avant-première les figurines qui sortiront dans les mois à venir, acheter des pièces exclusives uniquement disponibles lors de l'événement, et participer à diverses activités comme des séances de dédicaces avec des sculpteurs renommés.",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1600",
    date: "2023-11-15",
    category: "Événement",
    source: "Wonder Festival Official",
    author: "FigureNews",
    // Event specific fields
    eventDate: "2024-02-11",
    location: "Makuhari Messe International Exhibition Hall, Chiba, Japon",
    ticketPrice: "2000¥ (adulte), 1000¥ (enfant)",
    website: "https://wonfes.jp",
    expectedAttendees: "50,000+",
    schedule: [
      { time: "10:00", description: "Ouverture des portes (entrée public)" },
      { time: "10:30", description: "Présentation des nouveautés Good Smile Company" },
      { time: "12:00", description: "Défilé de cosplay sur scène principale" },
      { time: "14:00", description: "Démonstration de sculpture par des artistes professionnels" },
      { time: "16:00", description: "Tirage au sort pour les produits exclusifs" },
      { time: "17:00", description: "Fermeture de l'événement" }
    ],
    exhibitors: [
      "Good Smile Company",
      "Max Factory",
      "Kotobukiya",
      "Bandai Spirits",
      "Alter",
      "MegaHouse",
      "FREEing",
      "Orange Rouge"
    ],
    exclusiveItems: [
      {
        name: "Nendoroid Hatsune Miku: Wonder Festival Edition",
        manufacturer: "Good Smile Company",
        price: "6000¥",
        limited: true
      },
      {
        name: "figma Rem: Crystal Dress Ver.",
        manufacturer: "Max Factory",
        price: "8500¥",
        limited: true
      },
      {
        name: "ARTFX J Jujutsu Kaisen: Gojo Satoru Special Color",
        manufacturer: "Kotobukiya",
        price: "13800¥",
        limited: false
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1567306226408-c302e8433c9a?q=80&w=1600",
      "https://images.unsplash.com/photo-1558507676-62229a0f63ed?q=80&w=1600",
      "https://images.unsplash.com/photo-1571173729635-1bb0efd7c696?q=80&w=1600"
    ]
  }
];

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<typeof eventsData[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    // Simulate fetching data from an API
    setLoading(true);
    const fetchedEvent = eventsData.find(item => item.id === Number(id));
    
    setTimeout(() => {
      setEvent(fetchedEvent || null);
      setLoading(false);
    }, 500); // Simulate network delay
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Format date range for event display
  const formatEventDateRange = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    
    if (!endDate) {
      return formatDate(startDate);
    }
    
    const end = new Date(endDate);
    
    // If same month and year, only show the day for start date
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.getDate()} - ${formatDate(endDate)}`;
    }
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNav />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNav />
        <main className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4">Événement non trouvé</h1>
          <p className="mb-8 text-gray-600">L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button asChild>
            <Link to="/news">
              <ArrowLeft className="mr-2" />
              Retour aux actualités
            </Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/news" className="flex items-center">
                <ArrowLeft size={16} className="mr-2" />
                Retour aux actualités
              </Link>
            </Button>
            
            <Badge className="mb-4 bg-purple-500 hover:bg-purple-600">{event.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{event.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                Article publié le {formatDate(event.date)}
              </div>
              <div className="flex items-center">
                <User size={14} className="mr-1" />
                {event.author}
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <img 
              src={event.coverImage} 
              alt={event.title} 
              className="w-full h-auto rounded-lg shadow-md object-cover max-h-96"
            />
          </div>
          
          {/* Event info card */}
          <Card className="mb-8 overflow-hidden border-purple-100 shadow-md">
            <CardContent className="p-0">
              <div className="bg-purple-50 p-4">
                <h2 className="text-xl font-semibold mb-2">Informations sur l'événement</h2>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.eventDate && (
                  <div className="flex items-start gap-2">
                    <Calendar size={18} className="text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-700">Date</div>
                      <div>{formatEventDateRange(event.eventDate, event.eventEndDate)}</div>
                    </div>
                  </div>
                )}
                
                {event.location && (
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-700">Lieu</div>
                      <div>{event.location}</div>
                    </div>
                  </div>
                )}
                
                {event.schedule && (
                  <div className="flex items-start gap-2">
                    <Clock size={18} className="text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-700">Horaires</div>
                      <div>{event.schedule[0].time} - {event.schedule[event.schedule.length-1].time}</div>
                    </div>
                  </div>
                )}
                
                {event.expectedAttendees && (
                  <div className="flex items-start gap-2">
                    <Users size={18} className="text-purple-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-700">Affluence prévue</div>
                      <div>{event.expectedAttendees}</div>
                    </div>
                  </div>
                )}
                
                {event.ticketPrice && (
                  <div className="flex items-start gap-2 col-span-1 md:col-span-2">
                    <div className="rounded-full bg-purple-100 p-1 text-purple-500 mt-0.5">
                      <Ticket size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Tarifs</div>
                      <div>{event.ticketPrice}</div>
                    </div>
                  </div>
                )}
                
                {event.website && (
                  <div className="col-span-1 md:col-span-2 mt-2">
                    <Button asChild variant="outline" className="text-purple-500 border-purple-200 hover:bg-purple-50">
                      <a href={event.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Visiter le site web <ExternalLink size={14} className="ml-1" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs for different sections */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="w-full border-b grid grid-cols-3">
              <TabsTrigger value="info" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500">
                <Info size={16} className="mr-2" /> Informations
              </TabsTrigger>
              <TabsTrigger value="schedule" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500">
                <Clock size={16} className="mr-2" /> Programme
              </TabsTrigger>
              <TabsTrigger value="exclusives" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500">
                <Image size={16} className="mr-2" /> Exclusivités
              </TabsTrigger>
            </TabsList>
            
            {/* Info tab content */}
            <TabsContent value="info" className="pt-6">
              <div className="prose prose-gray max-w-none mb-8">
                <p className="text-lg font-medium mb-6 text-gray-700">{event.summary}</p>
                
                {event.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
                
                <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Exposants principaux</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.exhibitors.map((exhibitor, index) => (
                      <span 
                        key={index} 
                        className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
                      >
                        {exhibitor}
                      </span>
                    ))}
                  </div>
                </div>
                
                {event.gallery && (
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Galerie des éditions précédentes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {event.gallery.map((image, index) => (
                        <img 
                          key={index}
                          src={image}
                          alt={`Wonder Festival image ${index + 1}`}
                          className="rounded-lg w-full h-48 object-cover hover:opacity-90 transition-all cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Schedule tab content */}
            <TabsContent value="schedule" className="pt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Programme de l'événement</h3>
                <div className="space-y-3">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start border-l-2 border-purple-200 pl-4 pb-4 relative">
                      <div className="absolute -left-1.5 top-1">
                        <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      </div>
                      <div className="bg-purple-100 text-purple-700 font-medium px-3 py-1 rounded-md w-16 text-center">
                        {item.time}
                      </div>
                      <div className="flex-1 pt-1">{item.description}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700">
                    <Info size={14} className="inline mr-1" /> 
                    Le programme peut être sujet à des modifications. Consultez le site officiel pour les dernières mises à jour.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            {/* Exclusives tab content */}
            <TabsContent value="exclusives" className="pt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Figurines exclusives</h3>
                <p className="text-gray-600 mb-6">
                  Ces figurines sont disponibles uniquement pendant l'événement et produites en quantité limitée.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {event.exclusiveItems && event.exclusiveItems.map((item, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="bg-purple-50 p-3 border-b">
                        <h4 className="font-medium">{item.name}</h4>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">{item.manufacturer}</span>
                          <span className="font-semibold">{item.price}</span>
                        </div>
                        {item.limited && (
                          <div className="text-amber-600 text-sm flex items-center mt-2">
                            <Info size={14} className="mr-1" />
                            Édition ultra limitée
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-gray-500 mt-6">
                  Les produits exclusifs sont généralement vendus selon le principe du premier arrivé, premier servi. 
                  Pour les articles les plus populaires, un système de loterie peut être mis en place.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator className="mb-6" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-sm text-gray-500">
              Source: <a href="#" className="text-purple-500 hover:underline">{event.source}</a>
            </div>
            
            <SocialShare 
              title={event.title} 
              url={window.location.href} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;
