import { createContext } from 'react';
import backgroundLight from "../assets/images/pikachu.png";
import backgroundDark from "../assets/images/rocket.png";

// Definição dos temas
export const themes = {
  light: {
    backgroundImage: `url(${backgroundLight})`,
    backgroundColor: '#fdf57e',
    backgroundList: '#fffff5',
    color: '#000001',
    backgroundButton: "#ff0000",
    colorButton: "#2c3e50",

    // Adicionar cores do tema anterior
    colors: {
      white: "#fff",
      black: "#000",
      red: "#ff0000",
      primary: "#1B1B1B",
      secondary: "#E5E5E5",
      background: "#e5e5e5e5",
      container: "#1B1B1B",
      text: "#000001",
      link: "#1B1B1B",
    }
  },
  dark: {
    backgroundImage: `url(${backgroundDark})`,
    backgroundColor: '#361735',
    backgroundList: '#000001',
    color: '#ffffff',
    backgroundButton: "#2c3e50",
    colorButton: "#ff0000",
    // Adicionar cores do tema anterior
    colors: {
      white: "#fff",
      black: "#000",
      red: "#ff0000",
      primary: "#E5E5E5",
      secondary: "#1B1B1B",
      background: "#361735",
      container: "#000001",
      text: "#ffffff",
      link: "#E5E5E5",
    }
  }
};

// Criar contexto para o tema
export const ThemeContext = createContext({});

