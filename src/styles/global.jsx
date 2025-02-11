import { createGlobalStyle } from "styled-components";
import styledNormalize from 'styled-normalize';


export const GlobalStyle = createGlobalStyle`
 ${styledNormalize}
htm,body, #root{
min-height: 100%;}

body{
    background-color: ${(props) => props.theme.colors.background};
        font-family: "Press Start 2P", serif;
        font-weight: 400;
        font-style: normal;

    };`
 