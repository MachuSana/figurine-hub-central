import { useState } from "react";
import { useParams } from "react-router-dom";
import MainNav from "../components/MainNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Users, Activity, ListTree } from "lucide-react";
import { CharacterProfile } from "../components/character/CharacterProfile";
import { CharacterDescription } from "../components/character/CharacterDescription";
import { CharacterAbilities } from "../components/character/CharacterAbilities";
import { CharacterRelationships } from "../components/character/CharacterRelationships";
import { CharacterFigurines } from "../components/character/CharacterFigurines";

const CharacterDetails = () => {
  const { id } = useParams();

  // Character data - this would typically come from an API
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
      age: "19", // Convertir de number à string
      birthday: "5 mai",
      height: "174 cm",
      bounty: "1 500 000 000 Berrys",
      devilFruit: "Gomu Gomu no Mi (Fruit du Caoutchoutier)",
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
        series: "One Piece",
        price: "150",
        images: ["https://images.unsplash.com/photo-1605810230434-7631ac76ec81"],
        releaseDate: "2023-05-10",
        rating: 4.9,
        isNew: true,
        isPopular: true,
      },
      {
        id: 2,
        name: "Monkey D. Luffy - Wano Kuni",
        manufacturer: "Bandai",
        series: "One Piece",
        price: "120",
        images: ["https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"],
        releaseDate: "2022-10-15",
        rating: 4.7,
      },
      {
        id: 3,
        name: "Monkey D. Luffy - Strong World",
        manufacturer: "Banpresto",
        series: "One Piece",
        price: "75",
        images: ["https://images.unsplash.com/photo-1485827404703-89b55fcc595e"],
        releaseDate: "2021-08-22",
        rating: 4.5,
      },
      {
        id: 4,
        name: "Monkey D. Luffy - Film Red",
        manufacturer: "Good Smile Company",
        series: "One Piece",
        price: "180",
        images: ["https://images.unsplash.com/photo-1605810230434-7631ac76ec81"],
        releaseDate: "2023-01-30",
        rating: 4.8,
        isPopular: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <CharacterProfile character={character} />
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

              <TabsContent value="description">
                <CharacterDescription character={character} />
              </TabsContent>

              <TabsContent value="abilities">
                <CharacterAbilities abilities={character.abilities} />
              </TabsContent>

              <TabsContent value="relationships">
                <CharacterRelationships relationships={character.relationships} />
              </TabsContent>

              <TabsContent value="figurines">
                <CharacterFigurines figurines={character.figurines} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CharacterDetails;
