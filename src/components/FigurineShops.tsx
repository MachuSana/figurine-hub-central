
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
    <div className="space-y-3">
      {shops.map((shop, index) => (
        <a
          key={index}
          href={shop.url}
          className="flex items-center justify-between p-3 border rounded-lg hover:border-primary transition-colors"
        >
          <div>
            <div className="font-medium mb-1">{shop.name}</div>
            <div className={`text-sm ${shop.stock ? 'text-green-600' : 'text-red-600'}`}>
              {shop.stock ? 'En stock' : 'Rupture de stock'}
            </div>
          </div>
          <div className="text-xl font-bold text-primary">{shop.price}</div>
        </a>
      ))}
    </div>
  </div>
);
