
import { useState } from "react";
import { useToast } from "./ui/use-toast";

type SocialShareProps = {
  title: string;
  url: string;
}

export const SocialShare = ({ title, url }: SocialShareProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const shareUrl = () => {
    if (navigator.share) {
      navigator.share({
        title,
        url
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast({
        title: "Lien copié !",
        description: "Le lien a été copié dans le presse-papier",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Partager</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 bg-transparent border-none focus:outline-none text-sm"
          />
          <button
            onClick={shareUrl}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            {copied ? "Copié !" : "Partager"}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 text-center text-sm font-medium text-gray-600 hover:text-primary transition-colors"
          >
            Twitter
          </a>
          <div className="w-px h-4 bg-gray-200" />
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 text-center text-sm font-medium text-gray-600 hover:text-primary transition-colors"
          >
            Facebook
          </a>
          <div className="w-px h-4 bg-gray-200" />
          <a
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
            className="flex-1 py-2 text-center text-sm font-medium text-gray-600 hover:text-primary transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
};
