"use client";

import Logo from "@/lib/Logo";
import { useAllMediaLoaded } from "@/lib/useAllMediaLoaded";
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
 * Provides a theme context to its children components, managing the theme state and persistence in local storage.
 *
 * It initializes the theme from local storage or defaults to "system". It also determines if the current theme is dark.
 * The component prevents a flash of incorrect theme by hiding itself until it is fully mounted. It provides methods to
 * set the theme, update the document's class list based on the theme, and syncs with the system's preferred color scheme.
 *
 * @param children - React components that will receive the theme context.
 * @param defaultTheme - The default theme to use if none is stored in local storage. Defaults to "system".
 * @param storageKey - The key under which the theme is stored in local storage. Defaults to "servana-ui-theme".
 * @returns A React component providing the theme context to its children.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "servana-ui-theme",
  ...props
}: ThemeProviderProps) {
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

  // ✅ CALL HOOK UNCONDITIONALLY
  const ready = useAllMediaLoaded();

  useEffect(() => {
    setMounted(true);
  }, []);

  // ...rest of useEffects

  const value = {
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

  // Prevent flash of wrong theme
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  // if (!ready) {
  //   return (
  //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
  //       <Logo darkmode={isDarkTheme} className="w-16 h-16 animate-bounce" />
  //     </div>
  //   );
  // }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
