import styled from 'styled-components';

export const Section = styled.section`
  background-color: ${(props) => props.theme.colors.background};
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  position: relative;
`;

// Contêiner da Pokedex que manterá a proporção da imagem
export const PokedexContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px; // Ajuste conforme o tamanho máximo desejado
  aspect-ratio: 16 / 9; // Mantenha proporção da imagem, ajuste conforme necessário
  align-items: center;
`;

// Imagem da Pokedex que ocupa todo o contêiner
export const PokedexImg = styled.img`
  width: 100%;
  height: 113%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
    @media (max-width: 1000px) {
    height: 120%; 
  }

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

`;

// Botão do tema posicionado de forma responsiva
export const ThemeButtonWrapper = styled.div`
  position: absolute;
  top: 70px;
  right: 550px;
  z-index: 10;
`;

export const ButtonsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 92%; 
  left: 51%;
  transform: translateX(-50%);
  gap: 2px;
`;

export const FilterColumn = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px; /* Espaçamento entre os itens do filtro */
  padding: 5px;
  background-color:#fc3535;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 245px;
`;




