import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  /** True while a product pins the theme — the toggle is inert and light is unreachable. */
  isForced: boolean;
  /** Pin the theme to `t`, or pass null to hand control back to the reader. */
  setForcedTheme: (t: Theme | null) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
  isDark: false,
  isForced: false,
  setForcedTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The reader's own preference. A forced theme never overwrites it, so leaving
  // a dark-only product returns them to whatever they had chosen.
  const [preferred, setPreferred] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('theme');
      if (q === 'light' || q === 'dark') return q;
      return (localStorage.getItem('breathe-theme') as Theme) || 'light';
    }
    return 'light';
  });
  const [forced, setForced] = useState<Theme | null>(null);

  const theme = forced ?? preferred;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Only the reader's choice is persisted; a forced theme is a property of the
  // page they happen to be on, not a preference.
  useEffect(() => {
    localStorage.setItem('breathe-theme', preferred);
  }, [preferred]);

  const toggleTheme = () => {
    if (forced) return;
    setPreferred(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isDark: theme === 'dark',
        isForced: forced !== null,
        setForcedTheme: setForced,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
