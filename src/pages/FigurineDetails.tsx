import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MainNav from "../components/MainNav";
import { FigurineHeader } from "../components/FigurineHeader";
import { FigurineGallery } from "../components/FigurineGallery";
import { FigurineSpecs } from "../components/FigurineSpecs";
import { FigurineShops } from "../components/FigurineShops";
import { FigurineNews } from "../components/FigurineNews";
import { FigurineRelated } from "../components/FigurineRelated";
import { FigurineComments } from "../components/FigurineComments";

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

        <FigurineHeader
          series={figure.series}
          name={figure.name}
          reference={figure.reference}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <FigurineGallery name={figure.name} images={figure.images} />
          </div>
          <FigurineSpecs specs={figure} />
        </div>

        <div className="space-y-8">
          <FigurineShops shops={figure.shops} />
          <FigurineNews news={figure.news} />
          <FigurineRelated figures={figure.relatedFigures} />
          <FigurineComments comments={figure.comments} />
        </div>
      </main>
    </div>
  );
};

export default FigurineDetails;
