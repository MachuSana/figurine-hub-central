
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ScrollToTop = ({ showBackToTop = true }: { showBackToTop?: boolean }) => {
  const { pathname, hash } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top when route changes
  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // If there's a hash, scroll to the element
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 p-2 h-10 w-10 rounded-full shadow-md z-50 transition-all duration-300 bg-primary/90 hover:bg-primary",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          )}
          aria-label="Retour en haut de page"
        >
          <ArrowUp size={20} />
        </Button>
      )}
    </>
  );
};
