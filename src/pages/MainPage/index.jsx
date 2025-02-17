import ListPokemon from '../../Componets/ListPokemon/ListPokemon';
import { useState } from 'react';
import { ThemeTogglerButton } from '../../Componets/themeTogglerButton/themeTogglerButton';
import {PokedexImg} from './style'
import pokedex from '../../assets/images/pokedexsemfundo.png'
import { Section, ListPokemonWrapper, PokedexContainer, ThemeButtonWrapper, ButtonsContainer } from './style';
import {getId}from '../../services/utils'
import {Button} from '../../Componets/Button/Button'
const MainPage = () => {
  const [pokemonIds, setPokemonIds] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [limitReached, setLimitReached] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (allPokemonData.length >= 100) {
      setLimitReached(true);
      return;
    }
    const uniqueNumbers = getId(10, 1, 700);
    setPokemonIds(uniqueNumbers);
    setLimitReached(false);
  };

  const handleReset = () => {
    const resetIds = getId(10, 1, 700);
    setPokemonIds(resetIds);
    setAllPokemonData([]);
    setLimitReached(false);
    setSelectedType(null);
  };

  return (
    <Section>
      <PokedexContainer>
        <PokedexImg src={pokedex} alt="Pokedex" />
        <ListPokemonWrapper>
          <ListPokemon
            pokemonIds={pokemonIds}
            setPokemonIds={setPokemonIds}
            allPokemonData={allPokemonData}
            setAllPokemonData={setAllPokemonData}
            limitReached={limitReached}
            setLimitReached={setLimitReached}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </ListPokemonWrapper>
      </PokedexContainer>
      <ThemeButtonWrapper>
        <ThemeTogglerButton />
      </ThemeButtonWrapper>
      <ButtonsContainer>
        <Button onClick={handleClick} disabled={limitReached || isLoading}>
          {isLoading ? 'Carregando...' : 'Carregar mais...'}
        </Button>
        <Button onClick={handleReset}> Resetar Lista </Button>
        <Button onClick={() => setSelectedType(null)} disabled={!selectedType}>
          Mostrar Todos
        </Button>
      </ButtonsContainer>
    </Section>
  );
};

export default MainPage;

