
import { MessageCircle, Star, Plus, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Comment = {
  author: string;
  date: string;
  content: string;
  rating: number;
}

type FigurineCommentsProps = {
  comments: Comment[];
}

export const FigurineComments = ({ comments: initialComments }: FigurineCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un commentaire",
        variant: "destructive",
      });
      return;
    }

    const comment: Comment = {
      author: "Vous",
      date: new Date().toISOString(),
      content: newComment,
      rating: newRating
    };

    setComments([...comments, comment]);
    setNewComment("");
    setNewRating(5);
    setIsAddingComment(false);

    toast({
      title: "Commentaire ajouté",
      description: "Merci pour votre avis !",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageCircle size={20} />
          Commentaires ({comments.length})
        </h2>
        
        {!isAddingComment && (
          <Button 
            onClick={() => setIsAddingComment(true)}
            variant="outline"
            size="sm"
            className="gap-1"
          >
            <Plus size={16} />
            Ajouter un avis
          </Button>
        )}
      </div>

      {isAddingComment && (
        <div className="bg-muted p-4 rounded-lg mb-6 animate-fade-in">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium flex items-center gap-2">
                <User size={16} className="text-gray-400" />
                Votre avis
              </div>
              
              <div 
                className="flex gap-1" 
                onMouseLeave={() => setHoveredRating(0)}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => setNewRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    className="focus:outline-none"
                  >
                    <Star 
                      size={20} 
                      className={`${
                        (hoveredRating ? star <= hoveredRating : star <= newRating)
                          ? "text-yellow-400 fill-current" 
                          : "text-gray-300"
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Partagez votre avis sur cette figurine..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsAddingComment(false)}
            >
              Annuler
            </Button>
            <Button size="sm" onClick={handleAddComment}>
              Publier
            </Button>
          </div>
        </div>
      )}

      {comments.length === 0 ? (
        <div className="text-center py-8">
          <MessageCircle size={40} className="mx-auto text-gray-300 mb-2" />
          <p className="text-gray-500 mb-4">Aucun avis pour le moment</p>
          <Button 
            variant="outline"
            onClick={() => setIsAddingComment(true)}
          >
            Soyez le premier à donner votre avis
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="border-b last:border-0 py-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{comment.author}</div>
                <div className="flex items-center">
                  <div className="flex gap-1 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < comment.rating ? "text-yellow-400 fill-current" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(comment.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
