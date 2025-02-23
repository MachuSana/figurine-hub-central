import { useParams, Link } from "react-router-dom";
import { Star, Tag, Box, Calendar, Ruler, Info, List, ArrowLeft, ShoppingBag, Newspaper, MessageCircle, ImageIcon, Store, ArrowRight } from "lucide-react";
import MainNav from "../components/MainNav";

const FigurineDetails = () => {
  const { id } = useParams();
  
  const figures = [
    {
      id: 1,
      name: "Monkey D. Luffy - Gear 5",
      character: "Monkey D. Luffy",
      series: "One Piece",
      line: "Portrait Of Pirates",
      images: [
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
      ],
      manufacturer: "Bandai",
      releaseDate: "2024-06",
      description: "Figurine représentant Luffy dans sa forme Gear 5, capturant toute la puissance et l'aspect comique de cette transformation.",
      height: "32cm",
      material: "PVC & ABS",
      scale: "1/7",
      weight: "800g",
      sculpteur: "Takashi Yamamoto",
      painter: "Hiroshi Tanaka",
      price: "24800",
      reference: "BAS55789",
      edition: "Standard",
      packaging: "Window box with blister",
      articleDate: "2023-12-15",
      shops: [
        { name: "FigurineZ", price: "24800¥", stock: true, url: "#" },
        { name: "HobbyLink Japan", price: "24500¥", stock: false, url: "#" },
        { name: "AmiAmi", price: "24900¥", stock: true, url: "#" }
      ],
      news: [
        {
          title: "Annonce de la figurine Luffy Gear 5",
          date: "2023-12-15",
          url: "#"
        }
      ],
      relatedFigures: [
        {
          id: 5,
          name: "Monkey D. Luffy - Gear 4",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
          manufacturer: "Bandai",
          price: "19800¥"
        },
        {
          id: 6,
          name: "Roronoa Zoro - Wano",
          image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
          manufacturer: "Bandai",
          price: "22800¥"
        }
      ],
      comments: [
        {
          author: "OnePieceFan",
          date: "2024-02-15",
          content: "Le niveau de détail est incroyable !",
          rating: 5
        }
      ]
    }
  ];

  const figure = figures.find(f => f.id === Number(id));

  if (!figure) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNav />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link 
              to="/figurines"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} className="mr-1" />
              Retour à la liste
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Figurine non trouvée</h1>
            <p className="text-gray-600">La figurine demandée n'existe pas dans notre base de données.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            to="/figurines"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-1" />
            Retour à la liste
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag size={16} className="text-primary" />
              <span className="text-sm text-gray-600">{figure.series}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{figure.name}</h1>
            <p className="text-gray-600">Référence: {figure.reference}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ImageIcon size={20} />
              Galerie
            </h2>
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src={figure.images[0]}
                alt={figure.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {figure.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src={image}
                    alt={`${figure.name} view ${index + 2}`}
                    className="w-full h-full object-cover hover:opacity-75 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Info size={20} />
              Spécifications
            </h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-gray-500 mb-1">Fabricant</dt>
                <dd className="font-medium">{figure.manufacturer}</dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-1">Gamme</dt>
                <dd className="font-medium">{figure.line}</dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-1">Série</dt>
                <dd className="font-medium">{figure.series}</dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-1">Personnage</dt>
                <dd className="font-medium">{figure.character}</dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-1">Échelle & Dimensions</dt>
                <dd className="font-medium">{figure.scale} - {figure.height}</dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-1">Sculpteur</dt>
                <dd className="font-medium">{figure.sculpteur}</dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-1">Peintre</dt>
                <dd className="font-medium">{figure.painter}</dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-1">Prix de sortie</dt>
                <dd className="font-medium">{figure.price}¥</dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-1">Date de sortie</dt>
                <dd className="font-medium">
                  {new Date(figure.releaseDate).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long"
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-1">Matériaux</dt>
                <dd className="font-medium">{figure.material}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Store size={20} />
            Où acheter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {figure.shops.map((shop, index) => (
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

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Newspaper size={20} />
            Actualités
          </h2>
          {figure.news.map((news, index) => (
            <a
              key={index}
              href={news.url}
              className="block p-4 border rounded-lg hover:border-primary transition-colors mb-4 last:mb-0"
            >
              <div className="font-medium mb-1">{news.title}</div>
              <div className="text-sm text-gray-500">
                {new Date(news.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </div>
            </a>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <List size={20} />
            Autres figurines suggérées
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {figure.relatedFigures.map((related) => (
              <Link
                key={related.id}
                to={`/figurines/${related.id}`}
                className="flex items-center p-4 border rounded-lg hover:border-primary transition-colors"
              >
                <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={related.image}
                    alt={related.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <div className="font-medium">{related.name}</div>
                  <div className="text-sm text-gray-500">{related.manufacturer}</div>
                  <div className="font-bold mt-1">{related.price}</div>
                </div>
                <ArrowRight size={20} className="text-gray-400" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MessageCircle size={20} />
            Commentaires
          </h2>
          {figure.comments.map((comment, index) => (
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
      </main>
    </div>
  );
};

export default FigurineDetails;
