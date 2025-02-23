
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
    <div className="aspect-square rounded-lg overflow-hidden mb-4">
      <img
        src={images[0]}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="grid grid-cols-3 gap-4">
      {images.slice(1).map((image, index) => (
        <div key={index} className="aspect-square rounded-lg overflow-hidden cursor-pointer">
          <img
            src={image}
            alt={`${name} view ${index + 2}`}
            className="w-full h-full object-cover hover:opacity-75 transition-opacity"
          />
        </div>
      ))}
    </div>
  </div>
);
