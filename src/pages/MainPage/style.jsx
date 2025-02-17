import styled from "styled-components";

export const Section = styled.section`
    background-color: ${(props) => props.theme.colors.background};
    background-size: couver;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100vw;
    min-height: 100vh;
    padding: 2rem;
    position: relative;
`;

export const PokedexImg = styled.img`
    
    height: 100vh;
   position: relative;
  
`;

export const ListPokemonWrapper = styled.div`
  position: absolute;
  top: 155px; // Ajuste a posição vertical
  left: 609px; // Ajuste a posição horizontal
  width: 381px; // Largura da área da Pokédex
  height: 368px; // Altura da área da Pokédex
   overflow-y: scroll; /* ou auto */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */
  scroll-behavior: smooth; /* Rolagem suave */
  background: rgba(255, 255, 255, 0.8); 

   /* Esconde a barra de rolagem no Chrome, Safari e Edge */
  &::-webkit-scrollbar {
    display: none;
  }
`;




