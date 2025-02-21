import styled from 'styled-components';

// Contêiner principal responsivo
export const Section = styled.section`
  backgroundImage: ${(props) => props.theme.backgroundImage};
  background-color: ${(props) => props.theme.colors.background};
  background-size: 100vw ; 
  background-position: left;
  background-repeat: no-repeat; // Evita repetição da imagem
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100vw; // Ocupa 100% da largura da tela
  height: 100vh; // Ocupa 100% da altura da tela
  margin: 0 auto; // Centraliza na tela
  padding: 1rem;
  position: relative;
  overflow: hidden; // Evita barras de rolagem

`;

// Contêiner da Pokedex que manterá a proporção da imagem
export const PokedexContainer = styled.div`
margin-top: 1rem;
  position: relative;
  width: 100%;
  max-width: 320px; // Ajustado para o tamanho da página
  aspect-ratio: 16 / 9; // Mantenha proporção da imagem
`;

// Imagem da Pokedex que ocupa todo o contêiner
export const PokedexImg = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

// Wrapper da lista de Pokémon posicionado de forma responsiva
export const ListPokemonWrapper = styled.div`
  position: absolute;
  top: 50.6%; 
  left: 49.9%; 
  width: 80%; 
  height: 138%; 
  transform: translateX(-50%); 
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

`;

// Botão do tema posicionado de forma responsiva
export const ThemeButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 7px;
  z-index: 10;

  @media (max-width: 375px) {
    
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 2px;
  top: 405px;
  margin: 18px 0 0 18px
`;

export const FilterColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fc3535;
  border-radius: 10px;
  position: absolute;
  top: 80px;
  max-height: 265px; /* Reduzido para caber na altura fixa */
  overflow-y: auto; /* Adiciona barra de rolagem vertical se necessário */
   scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 375px) {
   
  }
`;