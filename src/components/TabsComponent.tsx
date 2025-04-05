
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsComponentProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
  tabsListClassName?: string;
  tabsTriggerClassName?: string;
  tabsContentClassName?: string;
  onChange?: (value: string) => void;
  useHash?: boolean;
}

export const TabsComponent = ({
  tabs,
  defaultValue,
  className,
  tabsListClassName,
  tabsTriggerClassName,
  tabsContentClassName,
  onChange,
  useHash = false,
}: TabsComponentProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.id);

  // Initialize from URL hash if useHash is true
  useEffect(() => {
    if (useHash && location.hash) {
      const hashValue = location.hash.replace("#", "");
      const tabExists = tabs.some(tab => tab.id === hashValue);
      if (tabExists) {
        setActiveTab(hashValue);
      }
    }
  }, [location.hash, tabs, useHash]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL hash if useHash is true
    if (useHash) {
      navigate(`${location.pathname}#${value}`, { replace: true });
    }
    
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={handleTabChange}
      className={cn("w-full", className)}
    >
      <TabsList className={cn("w-full justify-start mb-4 bg-gray-100/80", tabsListClassName)}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={cn(
              "data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm flex gap-2 items-center",
              tabsTriggerClassName
            )}
            id={`tab-${tab.id}`}
          >
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.id}
          value={tab.id}
          className={cn("mt-0 animate-fade-in", tabsContentClassName)}
          id={tab.id}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
