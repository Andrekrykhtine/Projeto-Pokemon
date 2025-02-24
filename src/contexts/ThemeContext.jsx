import { createContext } from "react";
import backgroundLight from "../assets/images/pikachu.png";
import backgroundDark from "../assets/images/rocket.png";

export const themes = {
  light: {
    backgroundImage:   `url(${backgroundLight})`,
    backgroundColor: '#eeeeee',
    color: '#000000'
  },
  dark: {
    backgroundImage:   `url(${backgroundDark})`,
    backgroundColor: '#000000',
    color: '#ffffff'
  }
};

export const ThemeContext = createContext({});