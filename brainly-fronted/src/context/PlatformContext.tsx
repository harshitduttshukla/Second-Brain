import { createContext, useContext, useState, ReactNode } from "react";

type Platform = "twitter" | "youtube" | null;

interface PlatformContextType {
  activePlatform: Platform;
  setActivePlatform: (platform: Platform) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) throw new Error("usePlatform must be used within PlatformProvider");
  return context;
};

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [activePlatform, setActivePlatform] = useState<Platform>(null);

  return (
    <PlatformContext.Provider value={{ activePlatform, setActivePlatform }}>
      {children}
    </PlatformContext.Provider>
  );
}
