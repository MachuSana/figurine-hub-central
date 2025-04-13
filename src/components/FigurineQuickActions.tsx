
import { Bell, ExternalLink, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type FigurineQuickActionsProps = {
  name: string;
  shopUrl?: string;
  className?: string;
}

export const FigurineQuickActions = ({ name, shopUrl, className }: FigurineQuickActionsProps) => {
  const { toast } = useToast();

  const handlePreorder = () => {
    toast({
      title: "Précommande ajoutée",
      description: `Vous serez notifié lorsque ${name} sera disponible.`,
      duration: 3000,
    });
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 border-primary ${className}`}>
      <h2 className="font-semibold mb-3 text-lg">Actions rapides</h2>
      <div className="space-y-4">
        <Button 
          onClick={handlePreorder} 
          className="w-full flex items-center justify-center gap-2"
        >
          <Bell size={16} />
          Activer l'alerte de disponibilité
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
      </div>
    </div>
  );
};
