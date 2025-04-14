"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  //   const [themeColor, setThemeColor] = useState("#089e19"); // Set default color
  const themeColor = "#0288d1";
  const bgColor = "#  ";
  const myFont = "mukta";
  return (
    <ThemeContext.Provider value={{ themeColor, bgColor, myFont }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
