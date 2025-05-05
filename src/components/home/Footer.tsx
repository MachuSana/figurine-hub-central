
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { label: "À propos", url: "/about" },
    { label: "Mentions légales", url: "/legal" },
    { label: "Confidentialité", url: "/privacy" },
    { label: "Contact", url: "/contact" }
  ];
  
  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, url: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, url: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, url: "https://youtube.com", label: "YouTube" },
    { icon: Mail, url: "mailto:contact@figurenews.com", label: "Email" }
  ];

  return (
    <footer className="bg-white py-10 border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-4 text-primary">FigureNews</h3>
            <p className="text-gray-600 mb-4">
              Votre source d'actualités et d'informations sur l'univers des figurines de collection.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  className="text-gray-500 hover:text-primary transition-colors duration-200"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.url}
                    className="text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Inscrivez-vous à notre newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/50 flex-grow"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} FigureNews - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};
