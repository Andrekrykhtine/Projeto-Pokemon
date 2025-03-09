import { useContext } from "react"
import { ThemeContext, themes } from "../../styles/Theme"
import {StyledThemeButton} from "./style"
import { CgPokemon } from "react-icons/cg"; // Ícone para o tema claro
import { TbCircleLetterRFilled } from "react-icons/tb"; // Ícone para o tema escuro


export const ThemeTogglerButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const isDarkMode = theme === themes.dark;

  const toggleTheme = () => {
    setTheme(isDarkMode ? themes.light : themes.dark);
  };

  return (
    <StyledThemeButton onClick={toggleTheme} isDarkMode={isDarkMode}>
      {isDarkMode ? <TbCircleLetterRFilled /> : <CgPokemon />}
    </StyledThemeButton>
  );
};