
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, MapPin, Clock, Users, ExternalLink } from "lucide-react";
import MainNav from "@/components/MainNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SocialShare } from "@/components/SocialShare";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Dummy data - in a real app, this would come from an API
const eventsData = [
  {
    id: 3,
    title: "Exposition de figurines à Paris en janvier 2024",
    summary: "Le plus grand salon de figurines d'Europe se tiendra à Paris",
    content: "Le Paris Figure Expo, considéré comme le plus grand salon européen dédié aux figurines et aux collectibles, se tiendra du 15 au 17 janvier 2024 au Parc des Expositions de la Porte de Versailles. Plus de 200 exposants du monde entier présenteront leurs dernières créations et des pièces exclusives. Des artistes renommés dans le domaine des figurines seront présents pour des sessions de dédicaces et des masterclass sur la peinture et la sculpture.\n\nLes visiteurs pourront découvrir les nouvelles collections des plus grands fabricants comme Bandai, Good Smile Company, Kotobukiya, et bien d'autres. Des pièces exclusives seront mises en vente uniquement pendant l'événement.\n\nEn plus des stands d'exposition et de vente, le salon proposera des conférences, des ateliers de peinture et de customisation, ainsi que des concours pour les créateurs amateurs.",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1600",
    date: "2023-10-25",
    category: "Événement",
    source: "Paris Figure Expo",
    author: "FigureNews",
    // Event specific fields
    eventDate: "2024-01-15",
    eventEndDate: "2024-01-17",
    location: "Parc des Expositions de la Porte de Versailles, Paris",
    ticketPrice: "15€ - 45€",
    website: "https://parisfigureexpo.com",
    expectedAttendees: "10,000+",
    schedule: [
      { time: "09:00", description: "Ouverture des portes" },
      { time: "10:30", description: "Conférence: Les nouvelles technologies d'impression 3D" },
      { time: "12:00", description: "Pause déjeuner" },
      { time: "14:00", description: "Masterclass: Techniques de peinture avancées" },
      { time: "16:30", description: "Session de dédicaces: Artistes invités" },
      { time: "18:00", description: "Fermeture des stands" }
    ],
    exhibitors: [
      "Bandai Namco Collectibles",
      "Good Smile Company",
      "Kotobukiya",
      "Tsume Art",
      "First 4 Figures",
      "MegaHouse"
    ]
  }
];

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<typeof eventsData[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
                      <span className="text-xs font-bold">€</span>
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
          
          {/* Main content */}
          <div className="prose prose-gray max-w-none mb-8">
            <p className="text-lg font-medium mb-6 text-gray-700">{event.summary}</p>
            
            {event.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          {/* Event schedule */}
          {event.schedule && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Programme</h2>
              <div className="space-y-3">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="bg-purple-100 text-purple-700 font-medium px-2 py-1 rounded-md w-16 text-center">
                      {item.time}
                    </div>
                    <div className="flex-1">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Exhibitors */}
          {event.exhibitors && (
            <div className="mb-12 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Exposants</h2>
              <div className="flex flex-wrap gap-2">
                {event.exhibitors.map((exhibitor, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {exhibitor}
                  </span>
                ))}
              </div>
            </div>
          )}
          
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
