
import { Info } from "lucide-react";

type FigurineSpecsProps = {
  specs: {
    manufacturer: string;
    line: string;
    series: string;
    character: string;
    scale: string;
    height: string;
    sculpteur: string;
    painter: string;
    price: string;
    releaseDate: string;
    material: string;
  }
}

export const FigurineSpecs = ({ specs }: FigurineSpecsProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Info size={20} />
      Spécifications
    </h2>
    <dl className="space-y-4 text-sm">
      {Object.entries({
        Fabricant: specs.manufacturer,
        Gamme: specs.line,
        Série: specs.series,
        Personnage: specs.character,
        "Échelle & Dimensions": `${specs.scale} - ${specs.height}`,
        Sculpteur: specs.sculpteur,
        Peintre: specs.painter,
        "Prix de sortie": `${specs.price}¥`,
        "Date de sortie": new Date(specs.releaseDate).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long"
        }),
        Matériaux: specs.material
      }).map(([label, value]) => (
        <div key={label}>
          <dt className="text-gray-500 mb-1">{label}</dt>
          <dd className="font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  </div>
);
