import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User } from "lucide-react";
import MainNav from "@/components/MainNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SocialShare } from "@/components/SocialShare";
import { useToast } from "@/components/ui/use-toast";
import { AdvertisementBanner } from "@/components/home/AdvertisementBanner";

// Dummy data - in a real app, this would come from an API
const newsData = [
  {
    id: 1,
    title: "Nouvelle collection Dragon Ball Z annoncée pour 2024",
    summary: "Good Smile Company dévoile sa nouvelle gamme de figurines Dragon Ball Z avec des finitions améliorées",
    content: "Good Smile Company a révélé lors du Tokyo Toy Show sa nouvelle collection de figurines Dragon Ball Z prévue pour le premier trimestre 2024. Cette nouvelle gamme proposera des finitions haute qualité et une attention particulière aux détails des personnages. Les premiers modèles incluront Goku Ultra Instinct, Vegeta Blue et Broly en version exclusive.\n\nLes précommandes devraient ouvrir dès septembre 2023, avec une livraison prévue entre janvier et mars 2024. Les prix annoncés varient entre 85€ et 150€ selon les modèles et leurs tailles.\n\nCette annonce s'inscrit dans la stratégie de Good Smile Company de renforcer sa présence sur le marché des figurines d'anime premium, face à la concurrence de Bandai et Kotobukiya.",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1600",
    date: "2023-11-15",
    category: "Annonce",
    source: "Tokyo Toy Show",
    author: "FigureNews"
  },
  {
    id: 2,
    title: "Retard de production pour les figurines One Piece",
    summary: "MegaHouse annonce un retard de 3 mois pour sa série Portrait of Pirates",
    content: "En raison de problèmes dans la chaîne d'approvisionnement, MegaHouse a annoncé un retard de trois mois pour sa célèbre série Portrait of Pirates (P.O.P) de One Piece. Les figurines de Luffy Gear 5, Zoro et Sanji initialement prévues pour décembre 2023 seront désormais disponibles en mars 2024. Des compensations seront offertes aux clients ayant déjà précommandé ces articles.\n\nLes difficultés d'approvisionnement en matières premières, notamment certains plastiques spécifiques et peintures, ainsi que des problèmes logistiques au niveau des usines de production en Asie sont à l'origine de ce retard.\n\nMegaHouse s'est engagé à offrir aux clients ayant précommandé un bon d'achat de 10% du montant de leur commande, utilisable sur leur prochain achat.",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600",
    date: "2023-11-02",
    category: "Production",
    source: "MegaHouse Official",
    author: "FigureNews"
  },
  {
    id: 3,
    title: "Exposition de figurines à Paris en janvier 2024",
    summary: "Le plus grand salon de figurines d'Europe se tiendra à Paris",
    content: "Le Paris Figure Expo, considéré comme le plus grand salon européen dédié aux figurines et aux collectibles, se tiendra du 15 au 17 janvier 2024 au Parc des Expositions de la Porte de Versailles. Plus de 200 exposants du monde entier présenteront leurs dernières créations et des pièces exclusives. Des artistes renommés dans le domaine des figurines seront présents pour des sessions de dédicaces et des masterclass sur la peinture et la sculpture.\n\nLes visiteurs pourront découvrir les nouvelles collections des plus grands fabricants comme Bandai, Good Smile Company, Kotobukiya, et bien d'autres. Des pièces exclusives seront mises en vente uniquement pendant l'événement.\n\nEn plus des stands d'exposition et de vente, le salon proposera des conférences, des ateliers de peinture et de customisation, ainsi que des concours pour les créateurs amateurs.",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1600",
    date: "2023-10-25",
    category: "Événement",
    source: "Paris Figure Expo",
    author: "FigureNews"
  },
  {
    id: 4,
    title: "Hausse des prix chez Bandai pour les figurines S.H.Figuarts",
    summary: "Une augmentation de 10% est annoncée pour début 2024",
    content: "Bandai a annoncé une hausse des prix de 10% sur sa gamme premium S.H.Figuarts à partir de janvier 2024. Cette augmentation est justifiée par la hausse du coût des matières premières et des frais de transport. Les précommandes effectuées avant le 31 décembre 2023 ne seront pas affectées par cette augmentation. La marque promet néanmoins une amélioration de la qualité des produits et l'introduction de nouvelles technologies d'articulation.\n\nCette augmentation intervient dans un contexte global d'inflation et de difficultés logistiques que connaît l'ensemble du secteur des figurines collectibles. Plusieurs autres fabricants pourraient suivre cette tendance dans les mois à venir.\n\nPour compenser cette hausse, Bandai a également annoncé un programme de fidélité qui permettra aux collectionneurs réguliers de bénéficier de remises et d'accès prioritaires aux précommandes des éditions limitées.",
    coverImage: "/placeholder.svg",
    date: "2023-10-14",
    category: "Industrie",
    source: "Bandai Collectibles",
    author: "FigureNews"
  },
  {
    id: 5,
    title: "Kotobukiya célèbre son 70e anniversaire avec des rééditions exceptionnelles",
    summary: "Des figurines emblématiques seront rééditées en version collector",
    content: "Pour célébrer son 70e anniversaire, le fabricant japonais Kotobukiya a annoncé la réédition de ses figurines les plus emblématiques en versions collector. Parmi les pièces concernées figurent des modèles de Star Wars, Marvel et diverses licences d'anime. Ces éditions spéciales comporteront des finitions améliorées, des bases exclusives et des certificats d'authenticité numérotés. Les précommandes ouvriront le mois prochain avec des quantités limitées.\n\nKotobukiya a également révélé qu'une série de figurines totalement inédites sera dévoilée lors d'un événement spécial à Tokyo. Ces nouvelles créations utiliseront des techniques de sculpture et de peinture innovantes, issues de plusieurs années de recherche et développement.\n\nEn plus des rééditions et des nouvelles figurines, la marque lancera un livre collector retraçant ses 70 ans d'histoire, avec des interviews exclusives des sculpteurs et designers qui ont contribué au succès de l'entreprise.",
    coverImage: "/placeholder.svg",
    date: "2023-10-05",
    category: "Anniversaire",
    source: "Kotobukiya",
    author: "FigureNews"
  }
];

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<typeof newsData[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching data from an API
    setLoading(true);
    const fetchedArticle = newsData.find(item => item.id === Number(id));
    
    setTimeout(() => {
      setArticle(fetchedArticle || null);
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

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNav />
        <main className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
          <p className="mb-8 text-gray-600">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
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
            
            <Badge className="mb-4">{article.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{article.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {formatDate(article.date)}
              </div>
              <div className="flex items-center">
                <User size={14} className="mr-1" />
                {article.author}
              </div>
            </div>
          </div>
          
          {/* Bannière publicitaire avant l'image */}
          <AdvertisementBanner variant="inline" className="mb-8" />
          
          <div className="mb-8">
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="w-full h-auto rounded-lg shadow-md object-cover max-h-96"
            />
          </div>
          
          <div className="prose prose-gray max-w-none mb-12">
            <p className="text-lg font-medium mb-6 text-gray-700">{article.summary}</p>
            
            {/* Afficher le premier paragraphe */}
            {article.content.split('\n\n').length > 0 && (
              <p className="mb-4">{article.content.split('\n\n')[0]}</p>
            )}
            
            {/* Bannière publicitaire entre les paragraphes */}
            {article.content.split('\n\n').length > 1 && (
              <AdvertisementBanner variant="fullwidth" className="my-8" />
            )}
            
            {/* Afficher les paragraphes restants */}
            {article.content.split('\n\n').slice(1).map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
            
            <div className="mt-8 pt-4 border-t text-sm text-gray-500">
              Source: <a href="#" className="text-primary hover:underline">{article.source}</a>
            </div>
          </div>
          
          <SocialShare 
            title={article.title} 
            url={window.location.href} 
          />
          
          {/* Bannière publicitaire en bas de l'article */}
          <AdvertisementBanner variant="sidebar" className="mt-8" dismissible={false} />
        </div>
      </main>
    </div>
  );
};

export default NewsDetail;
