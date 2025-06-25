"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextInterface {
  toggleDarkMode: () => void;
  darkmode: boolean;
}

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkmode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    localStorage.setItem("dark-mode", darkmode ? "0" : "1");
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    setDarkMode(localStorage.getItem("dark-mode") == "0" ? false : true);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleDarkMode, darkmode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeController({ children }: { children: ReactNode }) {
  const themeContext = useContext(ThemeContext);

  return (
    <div
      className={`${
        themeContext!.darkmode ? "dark" : "bright"
      } absolute z-[-100] bg-background text-foreground w-full`}
    >
      {children}
    </div>
  );
}
