import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";

const theme = {
    colors: {
        white: "#fff",
        black: "#000",

        //default colors
        primary: "#1B1B1B",
        secondary: "#E5E5E5",
        background: "#1B1B1B",
        container: "#1B1B1B",
        text: "#E5E5E5",
        link: "#E5E5E5",
    },

    fonts: ['Open Sans', 'sans-serif'].join(', '),
    fontsize: {
        small: "8 rem",
        normal: "16 rem",
        large: "24 rem",
        xlarge: "32 rem",
        xxlarge: "40 rem",
        Title: "64 rem",
        Subtitle: "48 rem",
    },

    breakpoints: {
        xs: '0',
        small: '576px',
        medium: '768px',
        large: '992px',
        xl: '1200px',
        xxl: '1400px',
    }

}

const Theme = ({ children }) => (
    <ThemeProvider theme={Theme}>{children}</ThemeProvider>
)
Theme.PropTypes = ({ children }) => {
    return (
        <ThemeProvider theme={Theme}>{children}</ThemeProvider>
    )
}

export default Theme