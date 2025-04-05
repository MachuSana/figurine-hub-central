
import { useState } from "react";
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
}

export const TabsComponent = ({
  tabs,
  defaultValue,
  className,
  tabsListClassName,
  tabsTriggerClassName,
  tabsContentClassName,
  onChange,
}: TabsComponentProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.id);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
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
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
