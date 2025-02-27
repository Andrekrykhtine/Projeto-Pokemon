import { createContext } from "react";
import backgroundLight from "../assets/images/pikachu.png";
import backgroundDark from "../assets/images/rocket.png";

export const themes = {
  light: {
    backgroundImage:   `url(${backgroundLight})`,
    backgroundColor: '#fdf57e',
    backgroundList: '#fffff5',
    color: '#000001'
  },
  dark: {
    backgroundImage:   `url(${backgroundDark})`,
    backgroundColor: '#361735',
    backgroundList: '#000001',
    color: '#ffffff'
  }
};

export const ThemeContext = createContext({});