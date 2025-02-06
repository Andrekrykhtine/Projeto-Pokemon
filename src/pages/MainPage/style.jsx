import styled from "styled-components";


export const Container = styled.div`
    background-color:#000000;
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
    z-index: 1;
    `;