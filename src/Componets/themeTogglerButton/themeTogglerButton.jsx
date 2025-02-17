import { useContext } from "react"
import { ThemeContext, themes } from "../../contexts/ThemeContext"
import {StyledThemeButton} from "./style"

export const ThemeTogglerButton = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    
    const isDarkMode = theme === themes.dark;
    
    const toggleTheme = () => {
      setTheme(isDarkMode ? themes.light : themes.dark);
    };
    
    return (
      <StyledThemeButton 
        onClick={toggleTheme}
        isDarkMode={isDarkMode}
      >
        {isDarkMode ? "Modo Claro ☀️" : "Modo Escuro 🌙"}
      </StyledThemeButton>
    );
  };