import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const DarkModeContext = createContext();
export const useDarkMode = () => useContext(DarkModeContext);

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(/* (prev) => !prev */ !darkMode);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  // if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  //   document.documentElement.classList.add('dark')
  // } else {
  //   document.documentElement.classList.remove('dark')
  // }

  return (
    <DarkModeContext.Provider value={{ darkMode: darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}
