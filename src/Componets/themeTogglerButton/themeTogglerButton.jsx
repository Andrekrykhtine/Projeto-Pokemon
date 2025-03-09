import { useContext } from "react";
import { ThemeContext, themes } from "../../styles/Theme";
import { StyledThemeButton } from "./style";
import { CgPokemon } from "react-icons/cg"; // Ícone para o tema claro
import { TbCircleLetterRFilled } from "react-icons/tb"; // Ícone para o tema escuro

export const ThemeTogglerButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    // Alterna entre os temas claro e escuro
    setTheme(theme === themes.dark ? themes.light : themes.dark);
  };

  return (
    <StyledThemeButton onClick={toggleTheme}>
      {theme === themes.dark ? <TbCircleLetterRFilled /> : <CgPokemon />}
    </StyledThemeButton>
  );
};