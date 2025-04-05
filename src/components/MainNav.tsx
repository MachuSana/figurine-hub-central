
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { 
      name: "Actualités", 
      path: "/news",
      dropdown: [
        { name: "Dernières Actualités", path: "/news" },
        { name: "Événements", path: "/events" }
      ]
    },
    { 
      name: "Figurines", 
      path: "/figurines",
      dropdown: [
        { name: "Toutes les Figurines", path: "/figurines" },
        { name: "Nouveautés", path: "/figurines?filter=new" },
        { name: "Précommandes", path: "/figurines?filter=preorder" }
      ]
    },
    { name: "Fabricants", path: "/manufacturers" },
    { name: "Gammes", path: "/series" },
    { name: "Licences", path: "/licenses" },
    { name: "Personnages", path: "/characters" },
    { name: "Boutiques", path: "/shops" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (name: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl text-primary flex items-center">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                className="fill-primary/10" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" 
                strokeLinecap="round" strokeLinejoin="round" className="fill-primary/20" />
            </svg>
            FigureNews
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.path} className="relative group">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={(e) => toggleDropdown(item.name, e)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 group ${
                        isActive(item.path) 
                          ? "text-primary bg-primary/5" 
                          : "text-gray-600 hover:text-primary hover:bg-gray-50"
                      }`}
                      aria-expanded={activeDropdown === item.name}
                    >
                      {item.name}
                      <ChevronDown 
                        size={16} 
                        className={`ml-1 transition-transform duration-200 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fade-in">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(item.path) 
                        ? "text-primary bg-primary/5" 
                        : "text-gray-600 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <div key={item.path} className="text-gray-600">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full flex justify-between items-center py-2 px-2 rounded-md ${
                          isActive(item.path) ? "bg-primary/5 text-primary" : "hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-200 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="pl-4 mt-1 mb-2 border-l-2 border-primary/20 ml-2 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className="block py-1.5 px-2 text-sm hover:text-primary transition-colors rounded-md"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block py-2 px-2 rounded-md ${
                        isActive(item.path) ? "bg-primary/5 text-primary" : "hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
