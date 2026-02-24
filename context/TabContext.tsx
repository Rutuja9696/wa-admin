"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface TabContextType {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [selectedTab, setSelectedTab] = useState("Groups");
  return (
    <TabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) throw new Error("useTab must be used within TabProvider");
  return context;
}