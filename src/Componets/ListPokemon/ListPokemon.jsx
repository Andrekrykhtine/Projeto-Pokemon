import { useState, useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import { ListContainer, Main } from './style';
import PokemonCard from '../PokemonCard/PokemonCard';
import { getId, fetchPokemonData } from '../../services/utils';
import { Button } from '../Button/Button';
import LimitReachedMessage from '../LimitReachedMessage/LimitReachedMessage';
import { ThemeContext } from '../../contexts/ThemeContext';
import LoadingSpinner from '../LoadingSpiner/LoadingSpiner';
import { pokemonTypes } from '../../services/pokemonTypes'
import TypeFilter from '../Filter/Fliter';


const ListPokemon = () => {
  const { theme } = useContext(ThemeContext);
  const [pokemonIds, setPokemonIds] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [limitReached, setLimitReached] = useState(false);
  const [selectedType, setSelectedType] = useState(null); // Estado para o tipo selecionado

  // Initialize with 10 Pokémon when component first loads
  useEffect(() => {
    const initialIds = getId(10, 1, 700);
    setPokemonIds(initialIds);
  }, []);

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

  const { isError, error, isLoading } = useQuery(
    ['pokemons', pokemonIds],
    async () => {
      const newData = await Promise.all(pokemonIds.map(id => fetchPokemonData(id)));
      const filteredData = newData.filter(
        (newPokemon) => !allPokemonData.some((existingPokemon) => existingPokemon.id === newPokemon.id)
      );
      setAllPokemonData((prevData) => {
        const updatedData = [...prevData, ...filteredData];
        if (updatedData.length >= 100) {
          setLimitReached(true);
        }
        return updatedData;
      });
      return filteredData;
    },
    {
      enabled: pokemonIds.length > 0,
      refetchOnWindowFocus: false,
    }
  );
  console.log(allPokemonData);

  // Filtra os Pokémon pelo tipo selecionado
  const filteredPokemon = selectedType
    ? allPokemonData.filter((pokemon) => pokemon.types.some((type) => type.type.name === selectedType))
    : allPokemonData;

  if (isError) return <p>Erro: {error.message}</p>;


  return (
    <>
      <Main>
        <TypeFilter
          types={pokemonTypes}
          selectedType={selectedType}
          onSelectType={setSelectedType} // Atualiza o tipo selecionado
        />
        <ListContainer style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
          {isLoading && <LoadingSpinner />}
          {filteredPokemon?.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))}
        </ListContainer>

        {limitReached && <LimitReachedMessage />}
       
          <Button onClick={handleClick} disabled={limitReached || isLoading}>
            {isLoading ? 'Carregando...' : 'Carregar mais...'}
          </Button>
          <Button onClick={handleReset}> Resetar Lista </Button>
          <Button onClick={() => setSelectedType(null)} disabled={!selectedType}>
            Mostrar Todos
          </Button>
    

      </Main>
    </>
  );
};

export default ListPokemon;