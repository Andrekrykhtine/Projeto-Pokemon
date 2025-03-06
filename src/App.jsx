import { useState } from 'react';
import ListPokemon from './Componets/MainPage/ListPokemon/ListPokemon';
import Header from './Componets/Header/Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from './styles/global';
import { AppContainer } from './AppStyle';

const queryClient = new QueryClient();

function App() {
  const [pokemonIds, setPokemonIds] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [limitReached, setLimitReached] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <GlobalStyle />
        <Header setSelectedType={setSelectedType} />
        <ListPokemon
          pokemonIds={pokemonIds}
          setPokemonIds={setPokemonIds}
          allPokemonData={allPokemonData}
          setAllPokemonData={setAllPokemonData}
          limitReached={limitReached}
          setLimitReached={setLimitReached}
          selectedType={selectedType}
        />
      </AppContainer>
    </QueryClientProvider>
  );
}

export default App;
