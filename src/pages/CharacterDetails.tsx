import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Heart, Shield, Users, Package, Sword, BookOpen, TrendingUp, Calendar, ExternalLink, UserRound, Share2 } from "lucide-react";
import MainNav from "../components/MainNav";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { useToast } from "../components/ui/use-toast";

const CharacterDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Les personnages avec des données détaillées
  const characters = [
    {
      id: 1,
      name: "Monkey D. Luffy",
      japaneseName: "モンキー・D・ルフィ",
      nickname: "Chapeau de Paille",
      series: "One Piece",
      age: 19,
      height: "174 cm",
      weight: "?? kg",
      birthday: "5 mai",
      description: 
        "Monkey D. Luffy, surnommé Chapeau de paille, est le capitaine de l'équipage du même nom. Ayant mangé accidentellement le fruit du démon Gomu Gomu no Mi étant enfant, il a acquis un corps élastique au prix de sa capacité à nager. Son rêve est de devenir le Roi des Pirates en trouvant le légendaire trésor One Piece laissé par Gold Roger.",
      longBio: 
        "Luffy est né dans le village de Fushia sur l'île de Dawn. Il est inspiré par Shanks le Roux, un capitaine pirate qui a séjourné dans son village. À l'âge de 7 ans, il mange un fruit du démon par accident, le Gomu Gomu no Mi, qui lui donne des propriétés élastiques mais le rend incapable de nager. Après que Shanks lui ait sauvé la vie en sacrifiant son bras gauche, Luffy se promet de devenir le Roi des Pirates. Il quitte son village natal à 17 ans pour poursuivre ce rêve.\n\nDurant son voyage, il rassemble un équipage composé de Zoro, Nami, Usopp, Sanji, Chopper, Robin, Franky, Brook et Jinbe. Ensemble, ils naviguent sur le Grand Line à la recherche du One Piece, tout en affrontant des pirates puissants et le Gouvernement Mondial.\n\nLuffy se distingue par son chapeau de paille, cadeau de Shanks, sa cicatrice sous l'œil gauche, et sa personnalité insouciante mais déterminée. Ses techniques de combat, basées sur son fruit du démon, incluent le fameux 'Gomu Gomu no Pistol' et ses dérivés.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      gallery: [
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
      ],
      figureCount: 150,
      popularity: 4.9,
      traits: ["Élastique", "Optimiste", "Déterminé", "Naïf", "Loyal", "Courageux", "Simple d'esprit", "Glouton"],
      affiliations: ["Pirates du Chapeau de Paille", "Famille Monkey", "Pire Génération"],
      voice: {
        japanese: "Mayumi Tanaka",
        english: "Colleen Clinkenbeard"
      },
      abilities: [
        "Corps élastique (Fruit du Gomu Gomu no Mi)",
        "Haki de l'Observation",
        "Haki de l'Armement",
        "Haki des Rois",
        "Gear Second",
        "Gear Third",
        "Gear Fourth",
        "Gear Fifth"
      ],
      appearances: [
        "One Piece (Manga)", 
        "One Piece (Anime)", 
        "One Piece Film: Red",
        "One Piece Film: Gold", 
        "One Piece: Stampede"
      ],
      relationships: [
        { name: "Monkey D. Garp", relation: "Grand-père" },
        { name: "Monkey D. Dragon", relation: "Père" },
        { name: "Portgas D. Ace", relation: "Frère adoptif" },
        { name: "Sabo", relation: "Frère adoptif" },
        { name: "Shanks", relation: "Mentor" }
      ],
      popularFigurines: [
        { name: "Portrait of Pirates Luffy Gear 5", manufacturer: "MegaHouse", scale: "1/8", price: "29,800¥", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81" },
        { name: "Figuarts ZERO Luffy Gear 4", manufacturer: "Bandai", scale: "Non-scale", price: "9,350¥", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" },
        { name: "Variable Action Heroes Luffy", manufacturer: "MegaHouse", scale: "Non-scale", price: "13,200¥", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e" }
      ],
      externalLinks: [
        { name: "One Piece Wiki", url: "https://onepiece.fandom.com/wiki/Monkey_D._Luffy" },
        { name: "Crunchyroll", url: "https://www.crunchyroll.com/series/GRMG8ZQZR/one-piece" },
        { name: "Site Officiel", url: "https://one-piece.com/index.html" }
      ]
    },
    {
      id: 2,
      name: "Son Goku",
      japaneseName: "孫悟空",
      nickname: "Kakarot",
      series: "Dragon Ball",
      age: "Plus de 40 ans",
      height: "175 cm",
      weight: "62 kg",
      birthday: "16 avril",
      description: 
        "Son Goku est un Saiyan envoyé sur Terre alors qu'il était bébé. Élevé par Son Gohan qui l'a trouvé dans la forêt, il devient un artiste martial exceptionnel et défend la Terre contre nombreuses menaces extraterrestres.",
      longBio: 
        "Son Goku, de son vrai nom Kakarot, est né sur la planète Vegeta. Il a été envoyé sur Terre avant la destruction de sa planète natale par Freezer. Trouvé et adopté par Son Gohan, il grandit dans les montagnes, ignorant ses origines extraterrestres. Suite à un accident où il se cogna la tête étant bébé, il perdit sa nature Saiyan violente et devint un enfant joyeux et innocent.\n\nDès son plus jeune âge, Goku montre des capacités extraordinaires en arts martiaux. Il devient l'élève de Maître Roshi, participant au Tenkaichi Budokai (Tournoi d'arts martiaux) à plusieurs reprises. Au fil des ans, il affronte des adversaires de plus en plus puissants : l'armée du Red Ribbon, Piccolo, les Saiyans dont Vegeta, Freezer, Cell, Majin Buu, et bien d'autres.\n\nGoku est connu pour son amour du combat et son désir constant de devenir plus fort. Il maîtrise de nombreuses techniques, notamment le Kamehameha et diverses formes de Super Saiyan, devenant l'un des guerriers les plus puissants de l'univers.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      gallery: [
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
      ],
      figureCount: 200,
      popularity: 4.8,
      traits: ["Fort", "Naïf", "Héroïque", "Optimiste", "Déterminé", "Compétitif", "Glouton"],
      affiliations: ["Guerriers Z", "Famille Son", "Saiyans", "Univers 7"],
      voice: {
        japanese: "Masako Nozawa",
        english: "Sean Schemmel"
      },
      abilities: [
        "Super Saiyan (plusieurs niveaux)",
        "Kamehameha",
        "Genki Dama (Spirit Bomb)",
        "Kaïoken",
        "Ultra Instinct",
        "Téléportation Instantanée"
      ],
      appearances: [
        "Dragon Ball (Manga)", 
        "Dragon Ball (Anime)", 
        "Dragon Ball Z", 
        "Dragon Ball GT", 
        "Dragon Ball Super",
        "Films Dragon Ball"
      ],
      relationships: [
        { name: "Chi-Chi", relation: "Épouse" },
        { name: "Son Gohan", relation: "Fils aîné" },
        { name: "Son Goten", relation: "Fils cadet" },
        { name: "Vegeta", relation: "Rival/Ami" },
        { name: "Krillin", relation: "Meilleur ami" }
      ],
      popularFigurines: [
        { name: "S.H.Figuarts Son Goku Ultra Instinct", manufacturer: "Bandai", scale: "Non-scale", price: "6,380¥", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" },
        { name: "Grandista Nero Son Goku", manufacturer: "Bandai", scale: "Non-scale", price: "4,500¥", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81" },
        { name: "Dragon Ball Z: Dokkan Battle Son Goku", manufacturer: "Banpresto", scale: "Non-scale", price: "2,500¥", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e" }
      ],
      externalLinks: [
        { name: "Dragon Ball Wiki", url: "https://dragonball.fandom.com/wiki/Goku" },
        { name: "Crunchyroll", url: "https://www.crunchyroll.com/series/GR757DMKY/dragon-ball-super" },
        { name: "Site Officiel", url: "https://www.dragonballz.com" }
      ]
    },
    {
      id: 3,
      name: "Naruto Uzumaki",
      japaneseName: "うずまきナルト",
      nickname: "Le ninja le plus imprévisible",
      series: "Naruto",
      age: "17 ans (Shippuden)",
      height: "166 cm",
      weight: "50.9 kg",
      birthday: "10 octobre",
      description: 
        "Naruto Uzumaki est un ninja du village de Konoha qui rêve de devenir Hokage. Orphelin dès sa naissance, il est le jinchūriki de Kyûbi, ce qui lui a valu l'exclusion des villageois pendant son enfance.",
      longBio: 
        "Naruto Uzumaki est né le jour où le village de Konoha a été attaqué par le démon à neuf queues, Kyûbi. Pour sauver le village, le Quatrième Hokage, Minato Namikaze (qui s'avère être son père), a scellé la bête à l'intérieur de Naruto, au prix de sa vie et de celle de sa femme Kushina Uzumaki.\n\nEn raison de sa condition de jinchūriki, Naruto a grandi isolé et rejeté par les villageois qui le voyaient comme l'incarnation du démon qui avait ravagé leur village. Pour attirer l'attention, il est devenu un farceur et un perturbateur à l'Académie des ninjas.\n\nMalgré cela, Naruto possède une personnalité optimiste et une détermination sans faille. Son rêve est de devenir Hokage pour gagner le respect de tous. Au fil de son parcours, il forme l'équipe 7 avec Sasuke Uchiha, Sakura Haruno et leur professeur Kakashi Hatake.\n\nNaruto développe progressivement ses compétences ninja, apprenant à maîtriser le Rasengan, le Mode Sage, et finalement à contrôler le pouvoir de Kyûbi. Son parcours est marqué par sa promesse de ramener Sasuke au village après sa désertion et par son combat contre l'organisation Akatsuki.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      gallery: [
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
      ],
      figureCount: 120,
      popularity: 4.7,
      traits: ["Persévérant", "Loyal", "Énergique", "Imprévisible", "Optimiste", "Déterminé"],
      affiliations: ["Village de Konoha", "Team 7", "Clan Uzumaki"],
      voice: {
        japanese: "Junko Takeuchi",
        english: "Maile Flanagan"
      },
      abilities: [
        "Rasengan",
        "Multiclonage",
        "Mode Ermite",
        "Mode Kyûbi",
        "Mode Baryon",
        "Sexy Meta"
      ],
      appearances: [
        "Naruto (Manga)", 
        "Naruto (Anime)", 
        "Naruto Shippuden", 
        "Boruto: Naruto Next Generations",
        "Films Naruto"
      ],
      relationships: [
        { name: "Minato Namikaze", relation: "Père" },
        { name: "Kushina Uzumaki", relation: "Mère" },
        { name: "Hinata Hyuga", relation: "Épouse" },
        { name: "Boruto Uzumaki", relation: "Fils" },
        { name: "Himawari Uzumaki", relation: "Fille" },
        { name: "Sasuke Uchiha", relation: "Meilleur ami/Rival" },
        { name: "Jiraiya", relation: "Mentor" }
      ],
      popularFigurines: [
        { name: "G.E.M. Series Naruto Uzumaki Hokage Ver.", manufacturer: "MegaHouse", scale: "1/8", price: "12,800¥", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e" },
        { name: "S.H.Figuarts Naruto Sage Mode", manufacturer: "Bandai", scale: "Non-scale", price: "6,600¥", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81" },
        { name: "Naruto Shippuden Naruto & Kurama Mode", manufacturer: "Tsume", scale: "1/6", price: "29,900¥", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" }
      ],
      externalLinks: [
        { name: "Naruto Wiki", url: "https://naruto.fandom.com/wiki/Naruto_Uzumaki" },
        { name: "Crunchyroll", url: "https://www.crunchyroll.com/series/GYQ4MW246/naruto-shippuden" },
        { name: "Site Officiel", url: "https://www.viz.com/naruto" }
      ]
    },
    {
      id: 4,
      name: "Rem",
      japaneseName: "レム",
      nickname: "N/A",
      series: "Re:Zero",
      age: "18 ans",
      height: "154 cm",
      weight: "??",
      birthday: "2 février",
      description: 
        "Rem est une démone aux cheveux bleus qui travaille comme servante au manoir Roswaal aux côtés de sa sœur jumelle Ram. Elle se dévoue entièrement à ceux qu'elle aime.",
      longBio: 
        "Rem est née dans un petit village de démons avec sa sœur jumelle Ram. Contrairement aux autres démons qui possèdent naturellement deux cornes, Rem n'en a qu'une, ce qui la fait se sentir inférieure à sa sœur qui en avait deux (avant qu'une ne soit perdue). Après que leur village ait été détruit, les sœurs ont été recueillies par Roswaal L. Mathers et sont devenues servantes dans son manoir.\n\nInitialement méfiante envers Subaru Natsuki lorsqu'il arrive au manoir, elle suspecte qu'il est un espion de la Sorcière de l'Envie en raison de l'odeur qui émane de lui. Cependant, après que Subaru l'ait sauvée lors d'un incident impliquant des bêtes mabeast, Rem développe un profond attachement pour lui, allant jusqu'à tomber amoureuse.\n\nRem possède une grande force physique et peut utiliser la magie de l'eau. En situation de combat, elle utilise un morgenstern (fléau d'armes) comme arme. Elle peut aussi entrer dans un état de 'Oni Mode' où sa corne devient visible et ses capacités sont grandement augmentées.",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
      gallery: [
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
      ],
      figureCount: 95,
      popularity: 4.9,
      traits: ["Dévouée", "Déterminée", "Protectrice", "Perfectionniste", "Loyale", "Amoureuse"],
      affiliations: ["Manoir Roswaal", "Démone"],
      voice: {
        japanese: "Inori Minase",
        english: "Brianna Knickerbocker"
      },
      abilities: [
        "Force surhumaine",
        "Magie de l'eau",
        "Mode Oni",
        "Maniement du Morgenstern"
      ],
      appearances: [
        "Re:Zero (Light Novel)", 
        "Re:Zero (Anime)", 
        "Re:Zero OVA Memory Snow", 
        "Re:Zero OVA The Frozen Bond"
      ],
      relationships: [
        { name: "Ram", relation: "Sœur jumelle" },
        { name: "Subaru Natsuki", relation: "Intérêt amoureux" },
        { name: "Roswaal L. Mathers", relation: "Maître" },
        { name: "Emilia", relation: "Amie/Rivale" }
      ],
      popularFigurines: [
        { name: "Rem Birthday Ver. 1/7", manufacturer: "Kadokawa", scale: "1/7", price: "15,800¥", image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc" },
        { name: "Rem Kimono Ver. 1/8", manufacturer: "FuRyu", scale: "1/8", price: "13,500¥", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81" },
        { name: "Rem Oni Mode 1/7", manufacturer: "Good Smile Company", scale: "1/7", price: "16,800¥", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" }
      ],
      externalLinks: [
        { name: "Re:Zero Wiki", url: "https://rezero.fandom.com/wiki/Rem" },
        { name: "Crunchyroll", url: "https://www.crunchyroll.com/series/GRGG9798R/rezero--starting-life-in-another-world-" },
        { name: "Site Officiel", url: "https://re-zero-anime.jp/" }
      ]
    },
    {
      id: 5,
      name: "Asuka Langley Soryu",
      japaneseName: "惣流・アスカ・ラングレー",
      nickname: "N/A",
      series: "Neon Genesis Evangelion",
      age: "14 ans",
      height: "157 cm",
      weight: "??",
      birthday: "4 décembre",
      description: 
        "Asuka est la pilote de l'EVA-02. Elle est connue pour sa forte personnalité et ses compétences exceptionnelles en tant que pilote.",
      longBio: 
        "Asuka est née en Allemagne et a été sélectionnée comme pilote d'EVA dès son plus jeune âge. Elle est fière de ses compétences et a une attitude très compétitive. Son passé est marqué par des traumatismes familiaux, notamment le suicide de sa mère.\n\nElle rejoint NERV en tant que pilote de l'EVA-02 et travaille en collaboration avec Shinji Ikari et Rei Ayanami. Asuka a du mal à s'intégrer et à créer des liens avec les autres en raison de son besoin de reconnaissance et de son incapacité à exprimer ses émotions.\n\nAu fil de la série, Asuka est confrontée à ses propres démons intérieurs et à la pression de performer. Elle finit par perdre sa capacité à synchroniser avec son EVA, ce qui la conduit à une dépression profonde. Son personnage est complexe et tragique, reflétant les thèmes de l'isolement et de la souffrance psychologique.",
      image: "https://images.unsplash.com/photo-1547333590-47fae5f58d21",
      gallery: [
        "https://images.unsplash.com/photo-1547333590-47fae5f58d21",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
      ],
      figureCount: 80,
      popularity: 4.7,
      traits: ["Orgueilleuse", "Compétitive", "Complexe", "Instable", "Intelligente", "Indépendante"],
      affiliations: ["NERV", "Pilotes d'EVA"],
      voice: {
        japanese: "Yūko Miyamura",
        english: "Tiffany Grant"
      },
      abilities: [
        "Pilotage d'EVA-02",
        "Synchronisation élevée",
        "Intelligence tactique",
        "Compétences linguistiques (allemand, japonais, anglais)"
      ],
      appearances: [
        "Neon Genesis Evangelion (Anime)",
        "The End of Evangelion (Film)",
        "Rebuild of Evangelion (Films)"
      ],
      relationships: [
        { name: "Shinji Ikari", relation: "Rival/Intérêt amoureux" },
        { name: "Misato Katsuragi", relation: "Tutrice" },
        { name: "Rei Ayanami", relation: "Rival" }
      ],
      popularFigurines: [
        { name: "Asuka Langley Soryu - Test Suit Ver.", manufacturer: "Kotobukiya", scale: "1/6", price: "14,800¥", image: "https://images.unsplash.com/photo-1547333590-47fae5f58d21" },
        { name: "Asuka Langley Soryu - Plugsuit Ver.", manufacturer: "Good Smile Company", scale: "1/7", price: "12,500¥", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81" },
        { name: "Asuka Langley Soryu - Last Scene Ver.", manufacturer: "Alter", scale: "1/7", price: "16,200¥", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e" }
      ],
      externalLinks: [
        { name: "Evangelion Wiki", url: "https://evangelion.fandom.com/wiki/Asuka_Langley_Soryu" },
        { name: "Crunchyroll", url: "https://www.crunchyroll.com/series/GYQAP09AY/neon-genesis-evangelion" },
        { name: "Site Officiel", url: "https://www.evangelion.co.jp/" }
      ]
    },
    {
      id: 6,
      name: "Mikasa Ackerman",
      japaneseName: "ミカサ・アッカーマン",
      nickname: "N/A",
      series: "Attack on Titan",
      age: "19 ans",
      height: "170 cm",
      weight: "68 kg",
      birthday: "10 février",
      description: 
        "Mikasa est une soldate d'élite du bataillon d'exploration. Elle est dévouée à protéger Eren et est l'une des combattantes les plus compétentes de l'humanité.",
      longBio: 
        "Mikasa a été adoptée par la famille Yeager après que ses parents biologiques aient été assassinés par des trafiquants d'êtres humains. Elle a développé un lien fort avec Eren et le considère comme sa famille. Après la chute du mur Maria, elle rejoint l'armée avec Eren et Armin.\n\nMikasa est connue pour son calme, sa détermination et ses compétences exceptionnelles au combat. Elle est l'une des meilleures diplômées de sa classe et excelle dans l'utilisation de l'équipement de manœuvre tridimensionnelle.\n\nTout au long de la série, Mikasa reste dévouée à Eren, même lorsque ses actions deviennent de plus en plus controversées. Elle est déchirée entre son amour pour lui et son devoir envers l'humanité. Son personnage est complexe et explore les thèmes de la loyauté, du sacrifice et de la perte.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      gallery: [
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
      ],
      figureCount: 110,
      popularity: 4.8,
      traits: ["Forte", "Protectrice", "Loyale", "Calme", "Déterminée", "Compétente"],
      affiliations: ["Bataillon d'exploration", "104ème Brigade d'entraînement"],
      voice: {
        japanese: "Yui Ishikawa",
        english: "Trina Nishimura"
      },
      abilities: [
        "Maniement de l'équipement de manœuvre tridimensionnelle",
        "Compétences au combat exceptionnelles",
        "Force physique",
        "Agilité"
      ],
      appearances: [
        "Attack on Titan (Manga)",
        "Attack on Titan (Anime)",
        "Attack on Titan (Films)"
      ],
      relationships: [
        { name: "Eren Yeager", relation: "Frère adoptif/Intérêt amoureux" },
        { name: "Armin Arlert", relation: "Ami d'enfance" }
      ],
      popularFigurines: [
        { name: "Mikasa Ackerman - Attack on Titan Ver.", manufacturer: "Good Smile Company", scale: "1/7", price: "13,800¥", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e" },
        { name: "Mikasa Ackerman - Figma Ver.", manufacturer: "Max Factory", scale: "Non-scale", price: "7,800¥", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81" },
        { name: "Mikasa Ackerman - DX Ver.", manufacturer: "Kotobukiya", scale: "1/7", price: "15,500¥", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" }
      ],
      externalLinks: [
        { name: "Attack on Titan Wiki", url: "https://attackontitan.fandom.com/wiki/Mikasa_Ackermann" },
        { name: "Crunchyroll", url: "https://www.crunchyroll.com/series/GRGG84XWJ/attack-on-titan" },
        { name: "Site Officiel", url: "https://shingeki.tv/" }
      ]
    }
  ];
  
  // Trouver le personnage actuel basé sur l'ID de l'URL
  const character = characters.find(char => char.id === Number(id));
  
  // Gérer le cas où le personnage n'est pas trouvé
  if (!character) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNav />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <UserRound className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Personnage non trouvé</h2>
            <p className="text-gray-600 mb-6">Le personnage que vous recherchez n'existe pas ou a été supprimé.</p>
            <Link to="/characters">
              <Button>Retour aux personnages</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  // Fonction pour partager la page
  const shareCharacter = () => {
    if (navigator.share) {
      navigator.share({
        title: `${character.name} - Figurine Collection`,
        text: `Découvrez ${character.name} de ${character.series} dans notre collection de figurines!`,
        url: window.location.href,
      })
      .catch((error) => console.log('Erreur de partage:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié!",
        description: "Le lien a été copié dans votre presse-papiers.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/characters" className="flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux personnages
          </Link>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-b from-gray-900 to-gray-700">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover opacity-50"
              />
              
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-end gap-4">
                  <div className="md:flex-shrink-0 bg-white rounded-xl overflow-hidden h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-lg">
                    <img
