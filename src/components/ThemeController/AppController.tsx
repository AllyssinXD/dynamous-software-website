"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

interface AppContextProps {
  fancy: boolean;
  setFancy: (mode: boolean) => void;
}

export const AppContext = createContext<AppContextProps | null>(null);

function AppProvider({ children }: { children: ReactNode }) {
  const [fancy, setFancy] = useState(false);

  const handleChangeFancy = (mode: boolean) => {
    localStorage.setItem("fancy", mode ? "1" : "0");
    setFancy(mode);
  };

  useEffect(() => {
    setFancy(localStorage.getItem("fancy") == "0" ? false : true);
  }, []);

  return (
    <AppContext.Provider value={{ fancy, setFancy: handleChangeFancy }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
