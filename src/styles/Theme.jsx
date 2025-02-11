import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

// Objeto de tema
export const theme = {
  colors: {
    white: "#fff",
    black: "#000",
    red: "#ff0000",

    // Cores padrão
    primary: "#1B1B1B",
    secondary: "#E5E5E5",
    background: "#e5e5e5e5",
    container: "#1B1B1B",
    text: "#E5E5E5",
    link: "#E5E5E5",
  },

  fonts: ["Press Start 2P", "sans-serif"].join(", "),
  fontsize: {
    small: "0.8rem", 
    normal: "1rem",
    large: "1.5rem",
    xlarge: "2rem",
    xxlarge: "2.5rem",
    Title: "4rem",
    Subtitle: "3rem",
  },

  breakpoints: {
    xs: "0",
    small: "576px",
    medium: "768px",
    large: "992px",
    xl: "1200px",
    xxl: "1400px",
  },
};

// Componente ThemeProvider
const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

// Validação de props
Theme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Theme;