
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { toast } from "sonner";

export const Newsletter = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailRef.current?.value) {
      setIsSubscribed(true);
      toast.success("Merci pour votre inscription à la newsletter!");
    } else {
      toast.error("Veuillez entrer une adresse email valide");
    }
  };

  return (
    <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl shadow-sm p-8 mb-12">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Restez informé des dernières sorties</h2>
        <p className="text-gray-600 mb-6">
          Inscrivez-vous à notre newsletter pour ne manquer aucune nouveauté et promotion exclusive.
        </p>
        {isSubscribed ? (
          <div className="bg-green-50 text-green-700 rounded-lg p-4 animate-fade-in">
            <p className="font-medium">Merci pour votre inscription!</p>
            <p className="text-sm">Vous recevrez bientôt nos actualités.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              ref={emailRef}
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
            <Button type="submit" className="flex items-center gap-2">
              <Mail size={16} />
              S'inscrire
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
