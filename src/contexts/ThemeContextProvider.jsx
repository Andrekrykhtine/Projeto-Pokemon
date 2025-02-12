import { useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, themes } from './ThemeContext'; 

export const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState(themes.light); 

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};