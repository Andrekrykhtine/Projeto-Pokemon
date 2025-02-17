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
`;

// Imagem da Pokedex que ocupa todo o contêiner
export const PokedexImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
`;

// Wrapper da lista de Pokémon posicionado de forma responsiva
export const ListPokemonWrapper = styled.div`
  position: absolute;
  top: 17.5%; 
  left: 49.9%; 
  width: 30.5%; 
  height: 52.8%; 
  transform: translateX(-50%); 
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  background: rgba(255, 255, 255, 0.8);

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




