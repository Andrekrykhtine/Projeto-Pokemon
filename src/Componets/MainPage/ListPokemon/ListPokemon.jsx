import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { ListContainer, NoPokemonMessage } from './style';
import PokemonCard from '../PokemonCard/PokemonCard';
import LimitReachedMessage from '../LimitReachedMessage/LimitReachedMessage';
import LoadingSpinner from '../../UI/LoadingSpiner/LoadingSpiner';
import { useFetchPokemonData } from '../../../hooks/useFetchPokemonData';
import { usePokemonFilter } from '../../../hooks/usePokemonFilter';
import { usePokemonInitializer } from '../../../hooks/usePokemonInitializer';

const ListPokemon = ({
  pokemonIds,
  setPokemonIds,
  allPokemonData,
  setAllPokemonData,
  limitReached,
  setLimitReached,
  selectedType = '',
}) => {
  const [isLoadingMore] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  usePokemonInitializer({ setPokemonIds });

  const { isError, error, isLoading } = useFetchPokemonData({
    pokemonIds,
    allPokemonData,
    setAllPokemonData,
    setLimitReached
  });

  const allPokemonDataString = JSON.stringify(allPokemonData);
  const stablePokemonData = useMemo(() => allPokemonData, [allPokemonDataString, allPokemonData]);

  const { filteredPokemon, noPokemonFound } = usePokemonFilter({
    allPokemonData: stablePokemonData,
    selectedType,
    isLoading: isLoading || initialLoad
  });

  useEffect(() => {
    if (allPokemonData.length > 0 && initialLoad) {
      setInitialLoad(false);
    }
  }, [allPokemonData, initialLoad]);

  useEffect(() => {
    if (allPokemonData.length === 0 && !initialLoad) {
      setInitialLoad(true);
    }
  }, [allPokemonData, initialLoad]);

  const showSpinner = isLoading || isLoadingMore || (initialLoad && allPokemonData.length === 0);
  const showMessage = noPokemonFound && !showSpinner;

  if (isError) return <p>Erro: {error.message}</p>;

  return (
    <>
      <ListContainer data-testid="list-container">
        {showSpinner && <LoadingSpinner />}
        {showMessage ? (
          <NoPokemonMessage data-testid="no-pokemon-message">
            {selectedType ? 'Nenhum Pokémon encontrado desse tipo.' : 'Nenhum Pokémon encontrado ainda'}
          </NoPokemonMessage>
        ) : (

          !initialLoad && filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </ListContainer>
      {limitReached && <LimitReachedMessage />}
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
};

export default ListPokemon;