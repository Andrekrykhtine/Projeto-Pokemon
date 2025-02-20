import { createContext } from "react";
import backgroundLight from "../assets/images/image.png";

export const themes = {
  light: {
    backgroundImage:   `url(${backgroundLight})`,
    backgroundColor: '#eeeeee',
    color: '#000000'
  },
  dark: {
    backgroundColor: '#000000',
    color: '#ffffff'
  }
};

export const ThemeContext = createContext({});