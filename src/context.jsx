// src/context/ThemeContext.jsx
import React, { createContext, useState } from 'react';

// 1. Создаем контекст с начальным значением
export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
});

// 2. Создаем компонент-провайдер
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // 3. Передаем значение контекста
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};