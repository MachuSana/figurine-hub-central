
import { ImageIcon } from "lucide-react";

type FigurineGalleryProps = {
  name: string;
  images: string[];
}

export const FigurineGallery = ({ name, images }: FigurineGalleryProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <ImageIcon size={20} />
      Galerie
    </h2>
    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
      <img
        src={images[0]}
        alt={name}
        className="w-full h-full object-contain bg-gray-100"
      />
    </div>
    <div className="grid grid-cols-5 gap-2">
      {images.map((image, index) => (
        <div key={index} className="aspect-square rounded-lg overflow-hidden cursor-pointer border-2 hover:border-primary transition-colors">
          <img
            src={image}
            alt={`${name} view ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>
);
