import { useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, themes } from '../styles/Theme';
import { ThemeProvider } from 'styled-components';


export const ThemeContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme: setCurrentTheme }}>
      <ThemeProvider theme={currentTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};