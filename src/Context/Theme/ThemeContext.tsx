import React, { createContext, useState, ReactNode } from 'react';

type ThemeType = {
  theme: string;
  toggleTheme: () => void;
}

const defaultState: ThemeType = {
  theme: 'light',
  toggleTheme: () => {},
};

// Create the context
const ThemeContext = createContext<ThemeType>(defaultState);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
