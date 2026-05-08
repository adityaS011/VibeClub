"use client"
import { useThemeStore } from '@/store/theme';
import React, { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
   const { darkMode } = useThemeStore();
  return (
    <div
      className={`${darkMode ? "dark" : ""} h-full`}
      style={{ colorScheme: darkMode ? "dark" : "light" }}
    >
      {children}
    </div>
  );
};

export default ThemeProvider;