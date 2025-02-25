
import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { ListContainer, Main , NoPokemonMessage } from './style';
import PokemonCard from '../PokemonCard/PokemonCard';
import { getId, fetchPokemonData } from '../../../services/utils';
import LimitReachedMessage from '../LimitReachedMessage/LimitReachedMessage';
import { ThemeContext } from '../../../contexts/ThemeContext';
import LoadingSpinner from '../LoadingSpiner/LoadingSpiner';

const ListPokemon = ({
  pokemonIds,
  setPokemonIds,
  allPokemonData,
  setAllPokemonData,
  limitReached,
  setLimitReached,
  selectedType, 
}) => {
  const { theme } = useContext(ThemeContext);

  // Initialize with 10 Pokémon when component first loads
  useEffect(() => {
    const initialIds = getId(10, 1, 700);
    setPokemonIds(initialIds);
  }, [setPokemonIds]);

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

  // Filtra os Pokémon pelo tipo selecionado
  const filteredPokemon = selectedType
    ? allPokemonData.filter((pokemon) => pokemon.types.some((type) => type.type.name === selectedType))
    : allPokemonData;

  if (isError) return <p>Erro: {error.message}</p>;

   // Verifica se há Pokémon correspondentes ao tipo selecionado
   const noPokemonFound = selectedType && filteredPokemon.length === 0;

  return (
    <>
      <Main>
        <ListContainer >
          {isLoading && <LoadingSpinner />}
           {noPokemonFound ? (
        <NoPokemonMessage>Nenhum Pokémon encontrado desse tipo.</NoPokemonMessage>
      ) : (
        filteredPokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))
      )}
        </ListContainer>
        {limitReached && <LimitReachedMessage />}
      </Main>
    </>
  );
};


ListPokemon.propTypes = {
  pokemonIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  setPokemonIds: PropTypes.func.isRequired,
  allPokemonData: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAllPokemonData: PropTypes.func.isRequired,
  limitReached: PropTypes.bool.isRequired,
  setLimitReached: PropTypes.func.isRequired,
  selectedType: PropTypes.string,
  setSelectedType: PropTypes.func.isRequired,
};

export default ListPokemon;
