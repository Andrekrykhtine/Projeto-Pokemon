import { createContext } from "react";

export const themes = {
  light: {
    backgroundColor: '#eeeeee',
    color: '#000000'
  },
  dark: {
    backgroundColor: '#000000',
    color: '#ffffff'
  }
};

export const ThemeContext = createContext({});