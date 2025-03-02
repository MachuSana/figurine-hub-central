
import { Store, ShoppingCart, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Shop = {
  name: string;
  price: string;
  stock: boolean;
  url: string;
  logo?: string;
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
    
    {shops.length === 0 ? (
      <div className="text-center py-6">
        <Store className="w-12 h-12 text-gray-300 mx-auto mb-2" />
        <p className="text-gray-500">Aucun produit disponible pour le moment</p>
      </div>
    ) : (
      <div className="space-y-3">
        {shops.map((shop, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded-lg hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                {shop.logo ? (
                  <img 
                    src={shop.logo} 
                    alt={`Logo ${shop.name}`} 
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Store size={24} />
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium mb-1">{shop.name}</div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={shop.stock ? "default" : "outline"}
                    className={`${
                      shop.stock 
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }`}
                  >
                    {shop.stock ? 'En stock' : 'Rupture de stock'}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold text-primary">{shop.price}</div>
              <a href={shop.url} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="sm" 
                  className={!shop.stock ? "opacity-50 cursor-not-allowed" : ""}
                  disabled={!shop.stock}
                >
                  {shop.stock ? (
                    <>
                      <ShoppingCart size={16} className="mr-2" />
                      Acheter
                    </>
                  ) : (
                    <>
                      <ExternalLink size={16} className="mr-2" />
                      Voir
                    </>
                  )}
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
