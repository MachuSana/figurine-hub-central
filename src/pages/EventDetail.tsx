
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, MapPin, Clock } from "lucide-react";
import MainNav from "@/components/MainNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SocialShare } from "@/components/SocialShare";
import { FigurineGallery } from "@/components/FigurineGallery";
import { FigurineComments } from "@/components/FigurineComments";
import { EventAnnouncements } from "@/components/EventAnnouncements";
import { useToast } from "@/components/ui/use-toast";

// Données factices pour les événements - dans une vraie application, cela proviendrait d'une API
const eventsData = [
  {
    id: 1,
    title: "Wonder Festival 2023 Winter",
    summary: "Découvrez toutes les annonces du plus grand salon de figurines du Japon",
    content: "Le Wonder Festival 2023 Winter s'est tenu le 12 février 2023 au Makuhari Messe à Chiba, Japon. Cet événement biannuel est l'un des plus grands salons dédiés aux figurines et aux hobby au Japon, réunissant fabricants professionnels et amateurs passionnés.\n\nCette édition a été marquée par de nombreuses annonces majeures des plus grands fabricants du secteur, notamment Good Smile Company, Kotobukiya et Alter. Les visiteurs ont pu découvrir en avant-première les prochaines sorties de figurines, ainsi que des prototypes exclusifs.\n\nParmi les moments forts de l'événement, on peut noter la présentation de nouvelles gammes de Nendoroid et Figma, ainsi que plusieurs collaborations inédites entre fabricants et franchises populaires. La section professionnelle a mis en lumière l'innovation technique dans le domaine des figurines, avec des finitions et des poses toujours plus élaborées.",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1600",
    date: "2023-02-15",
    category: "Événement",
    source: "Wonder Festival Official",
    author: "FigureNews",
    location: "Makuhari Messe, Chiba, Japon",
    eventDate: "2023-02-12",
    announcements: {
      "Scales": [
        {
          id: 101,
          name: "Asuna: Goddess of Creation Stacia Ver.",
          series: "Sword Art Online: Alicization",
          manufacturer: "Aniplex",
          image: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=500"
        },
        {
          id: 102,
          name: "Rem: Crystal Dress Ver.",
          series: "Re:Zero",
          manufacturer: "eStream",
          image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500"
        },
        {
          id: 103,
          name: "Miku Hatsune: Symphony 2023 Ver.",
          series: "Vocaloid",
          manufacturer: "Good Smile Company",
          image: "https://images.unsplash.com/photo-1633532482120-973d3a3a9af5?q=80&w=500"
        }
      ],
      "Nendoroid": [
        {
          id: 201,
          name: "Anya Forger",
          series: "Spy x Family",
          manufacturer: "Good Smile Company",
          image: "https://images.unsplash.com/photo-1581337377343-0de1435aa5c8?q=80&w=500"
        },
        {
          id: 202,
          name: "Pochita",
          series: "Chainsaw Man",
          manufacturer: "Good Smile Company",
          image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?q=80&w=500"
        }
      ],
      "Figma": [
        {
          id: 301,
          name: "Gojo Satoru",
          series: "Jujutsu Kaisen",
          manufacturer: "Max Factory",
          image: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?q=80&w=500"
        },
        {
          id: 302,
          name: "Link",
          series: "The Legend of Zelda: Tears of the Kingdom",
          manufacturer: "Max Factory",
          image: "https://images.unsplash.com/photo-1642845135754-31657ced0875?q=80&w=500"
        }
      ]
    },
    gallery: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=500",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500",
      "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=500",
      "https://images.unsplash.com/photo-1581337377343-0de1435aa5c8?q=80&w=500",
      "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?q=80&w=500"
    ],
    comments: [
      {
        author: "FigureCollector42",
        date: "2023-02-16T14:23:00",
        content: "J'ai assisté à cet événement et l'ambiance était incroyable ! Les nouvelles figurines de Re:Zero sont absolument magnifiques.",
        rating: 5
      },
      {
        author: "OtakuMaster",
        date: "2023-02-17T09:15:00",
        content: "Déçu de ne pas voir de nouvelles annonces pour la série Demon Slayer. J'espérais vraiment une figurine de Nezuko en version démon complet.",
        rating: 3
      }
    ]
  },
  {
    id: 2,
    title: "Anime Japan 2023",
    summary: "Toutes les nouveautés figurines présentées durant l'Anime Japan 2023",
    content: "L'Anime Japan 2023 s'est déroulé du 25 au 28 mars au Tokyo Big Sight, attirant des milliers de fans d'anime et de manga. Cet événement majeur de l'industrie a été l'occasion pour de nombreux fabricants de figurines de présenter leurs prochaines sorties.\n\nParmi les stands les plus remarqués, celui de Bandai Namco Arts a présenté une impressionnante collection de figurines issues des licences les plus populaires comme One Piece, Dragon Ball et Gundam. De son côté, Kotobukiya a dévoilé sa nouvelle gamme ARTFX J avec des pièces particulièrement détaillées.\n\nL'événement a également été marqué par plusieurs collaborations exclusives entre studios d'animation et fabricants de figurines, permettant d'annoncer des séries limitées accompagnant la sortie de nouveaux animes pour la saison à venir.",
    coverImage: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=1600",
    date: "2023-04-01",
    category: "Événement",
    source: "Anime Japan Official",
    author: "FigureNews",
    location: "Tokyo Big Sight, Tokyo, Japon",
    eventDate: "2023-03-25",
    announcements: {
      "Scales": [
        {
          id: 104,
          name: "Luffy Gear 5",
          series: "One Piece",
          manufacturer: "Megahouse",
          image: "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?q=80&w=500"
        }
      ],
      "Prize Figures": [
        {
          id: 401,
          name: "Tanjiro Kamado",
          series: "Demon Slayer",
          manufacturer: "Banpresto",
          image: "https://images.unsplash.com/photo-1628072281945-b8e9b2f407f6?q=80&w=500"
        },
        {
          id: 402,
          name: "Marin Kitagawa",
          series: "My Dress-Up Darling",
          manufacturer: "SEGA",
          image: "https://images.unsplash.com/photo-1604306354505-0d03d4706b9c?q=80&w=500"
        }
      ]
    },
    gallery: [
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=500",
      "https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?q=80&w=500",
      "https://images.unsplash.com/photo-1628072281945-b8e9b2f407f6?q=80&w=500",
      "https://images.unsplash.com/photo-1604306354505-0d03d4706b9c?q=80&w=500"
    ],
    comments: [
      {
        author: "AnimeFan2023",
        date: "2023-04-02T16:45:00",
        content: "Les exclusivités Anime Japan sont toujours au top ! J'ai déjà précommandé la figurine de Luffy Gear 5.",
        rating: 5
      }
    ]
  }
];

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<typeof eventsData[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulation d'une requête API
    setLoading(true);
    const fetchedEvent = eventsData.find(item => item.id === Number(id));
    
    setTimeout(() => {
      setEvent(fetchedEvent || null);
      setLoading(false);
    }, 500); // Simuler un délai réseau
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
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
            
            <Badge className="mb-4">{event.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{event.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                Publié le {formatDate(event.date)}
              </div>
              <div className="flex items-center">
                <User size={14} className="mr-1" />
                {event.author}
              </div>
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                {event.location}
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                Événement du {formatDate(event.eventDate)}
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
          
          <div className="prose prose-gray max-w-none mb-12">
            <p className="text-lg font-medium mb-6 text-gray-700">{event.summary}</p>
            
            {event.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
            
            <div className="mt-8 pt-4 border-t text-sm text-gray-500">
              Source: <a href="#" className="text-primary hover:underline">{event.source}</a>
            </div>
          </div>
          
          {/* Annonces par catégorie */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Annonces de l'événement</h2>
            <EventAnnouncements announcements={event.announcements} />
          </div>

          {/* Galerie de photos */}
          <div className="mb-12">
            <FigurineGallery name={event.title} images={event.gallery} />
          </div>
          
          {/* Section commentaires */}
          <div className="mb-12">
            <FigurineComments comments={event.comments} />
          </div>

          {/* Partage social */}
          <SocialShare 
            title={event.title} 
            url={window.location.href} 
          />
        </div>
      </main>
    </div>
  );
};

export default EventDetail;
