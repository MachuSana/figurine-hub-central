import { useState } from "react";
import { useParams } from "react-router-dom";
import MainNav from "../components/MainNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  UserRound,
  Star,
  Heart,
  Share2,
  Info,
  Users,
  Activity,
  ListTree,
  ExternalLink,
  Shield,
  BadgeInfo,
} from "lucide-react";
import { FigurineCard } from "../components/FigurineCard";

const CharacterDetails = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const character = {
    id: parseInt(id || "1"),
    name: "Monkey D. Luffy",
    japaneseName: "モンキー・D・ルフィ",
    series: "One Piece",
    description:
      "Monkey D. Luffy est le protagoniste principal du manga et anime One Piece. Il est le fondateur et le capitaine de l'équipage de pirates au chapeau de paille. Son rêve est de devenir le Roi des Pirates en trouvant le trésor légendaire, le One Piece.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    gallery: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    ],
    figureCount: 150,
    popularity: 4.9,
    traits: ["Élastique", "Optimiste", "Déterminé", "Courageux", "Loyal"],
    abilities: [
      {
        name: "Gomu Gomu no Mi",
        description: "Fruit du démon qui a donné à Luffy un corps en caoutchouc",
      },
      {
        name: "Haki de l'Observation",
        description: "Permet de sentir la présence des autres",
      },
      {
        name: "Haki de l'Armement",
        description: "Permet de durcir son corps pour l'attaque et la défense",
      },
      {
        name: "Haki des Rois",
        description: "Permet d'imposer sa volonté sur les autres",
      },
    ],
    biography: {
      age: 19,
      birthday: "5 Mai",
      height: "174 cm",
      bounty: "1 500 000 000 Berry",
      devilFruit: "Gomu Gomu no Mi (Fruit du Gum-Gum)",
      firstAppearance: "Chapitre 1 (Manga), Épisode 1 (Anime)",
      japaneseVoice: "Mayumi Tanaka",
      englishVoice: "Colleen Clinkenbeard",
    },
    relationships: [
      {
        name: "Shanks le Roux",
        relation: "Mentor",
        description: "A inspiré Luffy à devenir pirate",
      },
      {
        name: "Monkey D. Garp",
        relation: "Grand-père",
        description: "Vice-amiral de la Marine qui a élevé Luffy",
      },
      {
        name: "Portgas D. Ace",
        relation: "Frère adoptif",
        description: "A grandi avec Luffy, fils de Gol D. Roger",
      },
      {
        name: "Sabo",
        relation: "Frère adoptif",
        description: "A grandi avec Luffy et Ace",
      },
      {
        name: "Monkey D. Dragon",
        relation: "Père",
        description: "Le révolutionnaire le plus recherché au monde",
      },
    ],
    affiliations: ["Pirates du Chapeau de Paille", "Famille Monkey"],
    figurines: [
      {
        id: 1,
        name: "Monkey D. Luffy - Gear 5",
        manufacturer: "MegaHouse",
        price: 150,
        releaseDate: "2023-05-10",
        image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        scale: "1/8",
        rating: 4.9,
      },
      {
        id: 2,
        name: "Monkey D. Luffy - Wano Kuni",
        manufacturer: "Bandai",
        price: 120,
        releaseDate: "2022-10-15",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
        scale: "1/7",
        rating: 4.7,
      },
      {
        id: 3,
        name: "Monkey D. Luffy - Strong World",
        manufacturer: "Banpresto",
        price: 75,
        releaseDate: "2021-08-22",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
        scale: "1/8",
        rating: 4.5,
      },
      {
        id: 4,
        name: "Monkey D. Luffy - Film Red",
        manufacturer: "Good Smile Company",
        price: 180,
        releaseDate: "2023-01-30",
        image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        scale: "1/6",
        rating: 4.8,
      },
    ],
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="relative">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={toggleFavorite}
                    className={`p-2 rounded-full ${
                      isFavorite
                        ? "bg-red-100 text-red-500"
                        : "bg-white/80 text-gray-700"
                    }`}
                  >
                    <Heart
                      size={20}
                      className={isFavorite ? "fill-current" : ""}
                    />
                  </button>
                  <button className="p-2 rounded-full bg-white/80 text-gray-700">
                    <Share2 size={20} />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  {character.popularity}
                </div>
              </div>

              <div className="p-4">
                <h1 className="text-2xl font-bold">{character.name}</h1>
                <div className="text-gray-500 mb-3">{character.japaneseName}</div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{character.series}</Badge>
                  <div className="text-sm text-muted-foreground">
                    {character.figureCount}+ figurines
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-2">Traits de caractère</div>
                    <div className="flex flex-wrap gap-2">
                      {character.traits.map((trait, index) => (
                        <span
                          key={index}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-2">Affiliations</div>
                    <div className="flex flex-wrap gap-2">
                      {character.affiliations.map((affiliation, index) => (
                        <span
                          key={index}
                          className="bg-muted text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {affiliation}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-medium flex items-center gap-2 mb-3">
                <BadgeInfo size={18} /> Détails du personnage
              </h2>
              <div className="space-y-2">
                {Object.entries(character.biography).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-500">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="description" className="flex-1">
                  <Info size={16} className="mr-2" /> Description
                </TabsTrigger>
                <TabsTrigger value="abilities" className="flex-1">
                  <Activity size={16} className="mr-2" /> Capacités
                </TabsTrigger>
                <TabsTrigger value="relationships" className="flex-1">
                  <Users size={16} className="mr-2" /> Relations
                </TabsTrigger>
                <TabsTrigger value="figurines" className="flex-1">
                  <ListTree size={16} className="mr-2" /> Figurines
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">À propos de {character.name}</h2>
                <p className="text-gray-700 leading-relaxed">{character.description}</p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Galerie</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {character.gallery.map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img src={image} alt={`${character.name} ${index+1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="abilities" className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Capacités</h2>
                <div className="space-y-4">
                  {character.abilities.map((ability, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield size={20} className="text-primary" />
                        <h3 className="font-medium">{ability.name}</h3>
                      </div>
                      <p className="text-gray-600">{ability.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="relationships" className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Relations</h2>
                <div className="space-y-4">
                  {character.relationships.map((relationship, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{relationship.name}</h3>
                        <Badge variant="outline">{relationship.relation}</Badge>
                      </div>
                      <p className="text-gray-600">{relationship.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="figurines" className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Figurines populaires</h2>
                  <a href="#" className="text-primary flex items-center">
                    Voir tout <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {character.figurines.map((figurine) => (
                    <FigurineCard
                      key={figurine.id}
                      id={figurine.id}
                      name={figurine.name}
                      image={figurine.image}
                      manufacturer={figurine.manufacturer}
                      price={figurine.price}
                      releaseDate={figurine.releaseDate}
                      scale={figurine.scale}
                      rating={figurine.rating}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CharacterDetails;
