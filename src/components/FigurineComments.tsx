
import { MessageCircle, Star } from "lucide-react";

type Comment = {
  author: string;
  date: string;
  content: string;
  rating: number;
}

type FigurineCommentsProps = {
  comments: Comment[];
}

export const FigurineComments = ({ comments }: FigurineCommentsProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <MessageCircle size={20} />
      Commentaires
    </h2>
    {comments.map((comment, index) => (
      <div key={index} className="border-b last:border-0 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">{comment.author}</div>
          <div className="flex items-center">
            <div className="flex gap-1 mr-2">
              {[...Array(comment.rating)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
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
);
