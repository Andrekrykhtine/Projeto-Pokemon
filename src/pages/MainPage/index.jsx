import { useState,useContext } from 'react';
import ListPokemon from '../../Componets/ListPokemon/ListPokemon';
import { ThemeTogglerButton } from '../../Componets/themeTogglerButton/themeTogglerButton';
import pokedex from '../../assets/images/pokedexsemfundo.png'
import { Section, ListPokemonWrapper, PokedexContainer, ThemeButtonWrapper, ButtonsContainer, FilterColumn ,PokedexImg} from './style';
import {getId}from '../../services/utils'
import {Button} from '../../Componets/Button/Button'
import TypeFilter from '../../Componets/Filter/Fliter'
import {pokemonTypes} from '../../services/pokemonTypes'
import { ThemeContext } from '../../contexts/ThemeContext';

const MainPage = () => {
  const [pokemonIds, setPokemonIds] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [limitReached, setLimitReached] = useState(false);
  const [selectedType, setSelectedType] = useState(null); // Estado para o tipo selecionado
  const [isLoading] = useState(false); // Estado de loading, se necessário
  const { theme } = useContext(ThemeContext);
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
    setSelectedType(null); // Reseta o tipo selecionado
  };

  return (
    <Section style={{ backgroundColor: theme.backgroundColor, color: theme.color ,  backgroundImage: theme.backgroundImage }}>
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
            selectedType={selectedType} // Passa o tipo selecionado
          />
        <Button onClick={handleClick} disabled={limitReached || isLoading}>
          {isLoading ? 'Carregando...' : 'Carregar mais...'}
        </Button>
        </ListPokemonWrapper>
    
     <FilterColumn>
      <TypeFilter
        types={pokemonTypes} // Passa a lista de tipos
        selectedType={selectedType} // Passa o tipo selecionado
        onSelectType={setSelectedType} // Passa a função para atualizar o tipo
      />
      </FilterColumn>

      <ThemeButtonWrapper>
        <ThemeTogglerButton />
      </ThemeButtonWrapper>

      </PokedexContainer>

      <ButtonsContainer>
        <Button onClick={handleReset}>Resetar Lista</Button>
        <Button onClick={() => setSelectedType(null)} disabled={!selectedType}>
          Mostrar Todos
        </Button>
      </ButtonsContainer>
      
    </Section>
  );
};

export default MainPage;

