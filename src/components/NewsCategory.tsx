
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsCategoryProps {
  initialActive?: boolean;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const NewsCategory = ({ initialActive = false, title, children, icon }: NewsCategoryProps) => {
  const [isOpen, setIsOpen] = useState(initialActive);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
      <Button
        variant="ghost"
        className="w-full flex justify-between items-center p-4 h-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold text-left flex items-center">
          {icon && <span className="mr-2 text-primary">{icon}</span>}
          {title}
        </h2>
        <ChevronDown
          size={20}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 pt-0">{children}</div>
      </div>
    </div>
  );
};
