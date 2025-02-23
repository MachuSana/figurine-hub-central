
import { Store } from "lucide-react";

type Shop = {
  name: string;
  price: string;
  stock: boolean;
  url: string;
}

type FigurineShopsProps = {
  shops: Shop[];
}

export const FigurineShops = ({ shops }: FigurineShopsProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Store size={20} />
      Où acheter
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {shops.map((shop, index) => (
        <a
          key={index}
          href={shop.url}
          className="block p-4 border rounded-lg hover:border-primary transition-colors"
        >
          <div className="font-medium mb-2">{shop.name}</div>
          <div className="text-xl font-bold mb-2">{shop.price}</div>
          <div className={`text-sm ${shop.stock ? 'text-green-600' : 'text-red-600'}`}>
            {shop.stock ? 'En stock' : 'Rupture de stock'}
          </div>
        </a>
      ))}
    </div>
  </div>
);
