import styled from 'styled-components';

// Contêiner principal responsivo
export const Section = styled.section`
  background-color: ${(props) => props.theme.colors.background};
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100vw; // Ocupa 100% da largura da tela
  height: 100vh; // Ocupa 100% da altura da tela
  max-width: 375px; // Largura máxima
  max-height: 586px; // Altura máxima
  margin: 0 auto; // Centraliza na tela
  padding: 1rem;
  position: relative;
  overflow: hidden; // Evita barras de rolagem

  @media (max-width: 375px) {
    max-width: 100%; // Ajusta para telas menores que 375px
    max-height: 100%; // Ajusta para telas menores que 586px
  }
`;

// Contêiner da Pokedex que manterá a proporção da imagem
export const PokedexContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 375px; // Ajustado para o tamanho da página
  aspect-ratio: 16 / 9; // Mantenha proporção da imagem

  @media (max-width: 375px) {
    max-width: 100%; // Ajusta para telas menores que 375px
  }
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
  top: 19.6%; 
  left: 49.9%; 
  width: 34.8%; 
  height: 60.5%; 
  transform: translateX(-50%); 
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 375px) {
    width: 40%; // Ajusta a largura para telas menores
    height: 50%; // Ajusta a altura para telas menores
  }
`;

// Botão do tema posicionado de forma responsiva
export const ThemeButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;

  @media (max-width: 375px) {
    top: 5px;
    right: 5px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 2px;
`;

export const FilterColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  background-color: #fc3535;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 10px;
  top: 10px;
  max-height: 200px; /* Reduzido para caber na altura fixa */
  overflow-y: auto; /* Adiciona barra de rolagem vertical se necessário */

  @media (max-width: 375px) {
    left: 5px;
    top: 5px;
    max-height: 150px; // Ajusta a altura para telas menores
  }
`;