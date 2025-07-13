"use client";

import Logo from "@/lib/Logo";
import { useAllMediaLoaded } from "@/lib/useAllMediaLoaded";
import { usePathname } from "next/navigation";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  isDarkTheme: boolean;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  isDarkTheme: false,
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * Provides a theme context and manages theme state for an application.
 *
 * This component initializes the theme based on localStorage or default settings,
 * and provides a context with functions to update the theme. It also handles
 * page transitions by showing a loading spinner during navigation.
 *
 * @param children - The child components that will receive the theme context.
 * @param defaultTheme - The default theme to use if no theme is stored in localStorage (default: "system").
 * @param storageKey - The key used to store and retrieve the theme from localStorage (default: "servana-ui-theme").
 * @returns A React provider component with the theme context.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "servana-ui-theme",
  ...props
}: ThemeProviderProps) {
  const pathname = usePathname(); // triggers change when route changes

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey) as Theme;
      return stored || defaultTheme;
    }
    return defaultTheme;
  });

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey) as Theme;
      if (stored === "dark") return true;
      if (stored === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const [mounted, setMounted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const ready = useAllMediaLoaded();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect page transitions by watching pathname changes
  useEffect(() => {
    setIsNavigating(true);
    const timeout = setTimeout(() => {
      setIsNavigating(false);
    }, 300); // short delay to show loader (optional)

    return () => clearTimeout(timeout);
  }, [pathname]);

  const value: ThemeProviderState = {
    theme,
    isDarkTheme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
      localStorage.setItem(storageKey, newTheme);

      const root = window.document.documentElement;
      root.classList.remove("light", "dark");

      let effectiveTheme: "light" | "dark";
      if (newTheme === "system") {
        effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
      } else {
        effectiveTheme = newTheme;
      }

      root.classList.add(effectiveTheme);
      setIsDarkTheme(effectiveTheme === "dark");
    },
  };

  if (!mounted || isNavigating || !ready) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/100 backdrop-blur-sm">
        <Logo darkmode={isDarkTheme} className="w-16 h-16 animate-bounce" />
      </div>
    );
  }

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Retrieves the theme context from a ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
