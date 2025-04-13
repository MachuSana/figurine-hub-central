
import { Bell, ExternalLink, ShoppingCart, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type FigurineQuickActionsProps = {
  name: string;
  shopUrl?: string;
  imageUrl?: string;
  className?: string;
}

export const FigurineQuickActions = ({ name, shopUrl, imageUrl, className }: FigurineQuickActionsProps) => {
  const { toast } = useToast();
  const [isPreordered, setIsPreordered] = useState(false);

  const handlePreorder = () => {
    setIsPreordered(!isPreordered);
    toast({
      title: isPreordered ? "Précommande annulée" : "Précommande ajoutée",
      description: isPreordered 
        ? `Vous ne serez plus notifié pour ${name}.` 
        : `Vous serez notifié lorsque ${name} sera disponible.`,
      duration: 3000,
    });
  };
  
  const handleShare = async () => {
    const shareData = {
      title: `Figurine ${name}`,
      text: `Découvre cette figurine ${name} !`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Partagé avec succès",
          description: "Merci d'avoir partagé cette figurine !",
          duration: 2000,
        });
      } else {
        // Fallback for browsers that don't support the Share API
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Lien copié",
          description: "L'URL a été copiée dans le presse-papier.",
          duration: 2000,
        });
      }
    } catch (error) {
      // User probably canceled the share
      console.error("Erreur lors du partage:", error);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) {
      toast({
        title: "Erreur",
        description: "Aucune image disponible à télécharger.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Téléchargement démarré",
      description: "L'image sera téléchargée dans quelques instants.",
      duration: 3000,
    });
    
    // In a real app, we would add code to download the image here
    // This is just a mock toast notification for demo purposes
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 border-primary ${className}`}>
      <h2 className="font-semibold mb-3 text-lg">Actions rapides</h2>
      <div className="space-y-4">
        <Button 
          onClick={handlePreorder} 
          className={`w-full flex items-center justify-center gap-2 ${
            isPreordered ? 'bg-green-600 hover:bg-green-700' : ''
          }`}
        >
          <Bell size={16} />
          {isPreordered ? 'Alerte activée' : 'Activer l\'alerte de disponibilité'}
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          asChild
        >
          <a href={shopUrl || "#"} target="_blank" rel="noopener noreferrer">
            <ShoppingCart size={16} />
            Voir les offres d'achat
          </a>
        </Button>
        
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button 
            variant="secondary" 
            className="flex items-center justify-center gap-2"
            onClick={handleShare}
          >
            <Share2 size={16} />
            Partager
          </Button>
          
          <Button 
            variant="secondary" 
            className="flex items-center justify-center gap-2"
            onClick={handleDownload}
          >
            <Download size={16} />
            Télécharger
          </Button>
        </div>
      </div>
    </div>
  );
};
