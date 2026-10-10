'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface InkdropData {
  x: number;
  y: number;
  color: string;
  active: boolean;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const [inkdrop, setInkdrop] = useState<InkdropData | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('artixain_theme') as Theme | null;
    if (saved === 'dark' || saved === 'light') {
      setThemeState(saved);
      applyTheme(saved);
    } else {
      // Mandate: Light theme is unconditionally the default on first load
      setThemeState('light');
      applyTheme('light');
    }
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('artixain_theme', newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = (e?: React.MouseEvent) => {
    const next = theme === 'light' ? 'dark' : 'light';

    // Get click coordinates or default to top-right button area
    const x = e ? e.clientX : (typeof window !== 'undefined' ? window.innerWidth - 80 : 100);
    const y = e ? e.clientY : 40;

    // Inkdrop color: matches target theme
    const inkdropColor = next === 'dark' ? '#0E0E10' : '#FFFFFF';

    // Trigger visual inkdrop ripple
    setInkdrop({ x, y, color: inkdropColor, active: true });

    // Native View Transitions API support with circular clip-path
    if (typeof document !== 'undefined' && (document as any).startViewTransition) {
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as any).startViewTransition(() => {
        setThemeState(next);
        localStorage.setItem('artixain_theme', next);
        applyTheme(next);
      });

      transition.ready?.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
    } else {
      // Fallback: apply theme mid-ripple
      setTimeout(() => {
        setThemeState(next);
        localStorage.setItem('artixain_theme', next);
        applyTheme(next);
      }, 250);
    }

    // Dismiss inkdrop ripple element after animation finishes
    setTimeout(() => {
      setInkdrop(null);
    }, 700);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {/* Inkdrop Visual Wave Overlay */}
      {inkdrop && (
        <div
          className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute rounded-full inkdrop-expand"
            style={{
              left: `${inkdrop.x}px`,
              top: `${inkdrop.y}px`,
              backgroundColor: inkdrop.color,
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      )}
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
