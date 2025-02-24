
import { useState, useMemo } from "react";
import { FigurineFilters, FilterState, SortOption } from "./FigurineFilters";
import { FigurineCard } from "./FigurineCard";

type Figurine = {
  id: number;
  name: string;
  manufacturer: string;
  series: string;
  price: string;
  releaseDate: string;
  images: string[];
  // ... autres propriétés
};

type FigurinesListProps = {
  figurines: Figurine[];
}

export const FigurinesList = ({ figurines }: FigurinesListProps) => {
  const [filters, setFilters] = useState<FilterState>({
    manufacturers: [],
    series: [],
    priceRange: [0, 100000],
    inStock: false,
    preorders: false,
  });

  const [sort, setSort] = useState<SortOption>({
    field: 'releaseDate',
    direction: 'desc'
  });

  const manufacturers = useMemo(() => 
    Array.from(new Set(figurines.map(f => f.manufacturer))).sort(),
    [figurines]
  );

  const series = useMemo(() => 
    Array.from(new Set(figurines.map(f => f.series))).sort(),
    [figurines]
  );

  const minPrice = useMemo(() => 
    Math.min(...figurines.map(f => parseInt(f.price))),
    [figurines]
  );

  const maxPrice = useMemo(() => 
    Math.max(...figurines.map(f => parseInt(f.price))),
    [figurines]
  );

  const filteredFigurines = useMemo(() => {
    let result = [...figurines];

    // Appliquer les filtres
    if (filters.manufacturers.length > 0) {
      result = result.filter(f => filters.manufacturers.includes(f.manufacturer));
    }

    if (filters.series.length > 0) {
      result = result.filter(f => filters.series.includes(f.series));
    }

    const [minPrice, maxPrice] = filters.priceRange;
    result = result.filter(f => {
      const price = parseInt(f.price);
      return price >= minPrice && price <= maxPrice;
    });

    // Appliquer le tri
    result.sort((a, b) => {
      if (sort.field === 'price') {
        const priceA = parseInt(a.price);
        const priceB = parseInt(b.price);
        return sort.direction === 'asc' ? priceA - priceB : priceB - priceA;
      }
      if (sort.field === 'releaseDate') {
        const dateA = new Date(a.releaseDate);
        const dateB = new Date(b.releaseDate);
        return sort.direction === 'asc' 
          ? dateA.getTime() - dateB.getTime() 
          : dateB.getTime() - dateA.getTime();
      }
      // Tri par nom
      return sort.direction === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    });

    return result;
  }, [figurines, filters, sort]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside>
        <FigurineFilters
          onFilterChange={setFilters}
          onSortChange={setSort}
          manufacturers={manufacturers}
          series={series}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </aside>
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFigurines.map((figurine) => (
            <FigurineCard key={figurine.id} figurine={figurine} />
          ))}
        </div>
      </div>
    </div>
  );
};
