import React, { useEffect, useState } from "react";

const THEME_KEY = "youBuidl-theme";

export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(THEME_KEY) || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 22,
        marginLeft: 12,
        color: "inherit",
        borderRadius: 8,
        padding: 4,
        transition: "background 0.2s"
      }}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
};
