import styled from 'styled-components';


// Contêiner principal responsivo
export const Section = styled.section`
  background-image: ${(props) => props.theme.backgroundImage};
  background-color: ${(props) => props.theme.colors.background};
  background-size: 25vw ; 
  background-position: 5% 80% ;
  background-repeat: no-repeat; 
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100vw; 
  height: 100vh; 
  margin: 0 auto;
  padding: 1rem 0;
  position: relative;
  overflow: hidden; // Evita barras de rolagem
    @media (max-width: 900px) {
     background-size: 20vw ; 
  }
    @media (max-width: 750px) {
    backgroundImage: none;
}

`;

// Contêiner da Pokedex que manterá a proporção da imagem
export const PokedexContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px; 
  aspect-ratio: 16 / 9; 
  background-color:${(props) => props.theme.backgroundList};

    @media (max-width: 400px) {
     max-width: 320px;

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
  gap: 1rem;
  top: 50.6%; 
  left: 49.9%; 
  width: 81.3%; 
  height: 137%; 
  transform: translateX(-50%); 
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  background-color:${(props) => props.theme.backgroundList};

  &::-webkit-scrollbar {
    display: none;
  }

`;

// Botão do tema posicionado de forma responsiva
export const ThemeButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 7px;
   @media (max-width: 400px) {
     top: 4px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 485px;
  left: 125px;    
  @media (max-width: 400px) {
     top: 380px;
     left: 98px; 
  }
`;

export const FilterColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fc3535;
  border-radius: 10px;
  position: absolute;
  top: 110px;
  max-height: 310px; 
  overflow-y: auto; 
   scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 400px) {
     top: 85px;
     max-height: 256px; 
  }
`;