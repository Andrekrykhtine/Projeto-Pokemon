import styled from "styled-components";
import picachu from "../../assets/images/image.png/"

export const Container = styled.div`
    background: url(${picachu}) no-repeat center center fixed;
    background-size: couver;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100vw;
    min-height: 100vh;
    padding: 2rem;
`;

export const PokedexImg = styled.img`
    max-width: 27%;
    height: auto;
    position: absolute;
`;

export const ListsPokemon = styled.div`
    display: flex;
    flax-direction: column;
    position: relative;
    
    `;