
type Brand = {
  id: number;
  name: string;
  logo: string;
};

export const BrandsSection = () => {
  const brands = [
    {
      id: 1,
      name: "Good Smile Company",
      logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      id: 2,
      name: "Bandai Spirits",
      logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 3,
      name: "Kotobukiya",
      logo: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Nos Marques Partenaires</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="group cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors duration-300 animate-fade-up"
          >
            <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-center font-medium text-gray-700 group-hover:text-primary transition-colors duration-200">
              {brand.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
