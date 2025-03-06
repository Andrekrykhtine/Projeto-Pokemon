import PropTypes from 'prop-types';
import { useState } from 'react';
import { ListContainer, NoPokemonMessage } from './style';
import PokemonCard from '../PokemonCard/PokemonCard';
import LimitReachedMessage from '../LimitReachedMessage/LimitReachedMessage';
import LoadingSpinner from '../../UI/LoadingSpiner/LoadingSpiner';
import { usePokemonData } from '../../../hooks/usePokemonData';
import { usePokemonFilter } from '../../../hooks/usePokemonFilter';
import { usePokemonInitializer } from '../../../hooks/usePokemonInitializer';
import { useFetchPokemonData } from '../../../hooks/useFetchPokemonData';

const ListPokemon = ({
  pokemonIds,
  setPokemonIds,
  allPokemonData,
  setAllPokemonData,
  limitReached,
  setLimitReached,
  selectedType,
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { loadMorePokemon } = usePokemonData({ pokemonIds, setPokemonIds, setLimitReached });
  const { filteredPokemon, noPokemonFound } = usePokemonFilter({ allPokemonData, selectedType });
  usePokemonInitializer({ setPokemonIds });
  const { isError, error, isLoading } = useFetchPokemonData({ pokemonIds, allPokemonData, setAllPokemonData, setLimitReached });

  if (isError) return <p>Erro: {error.message}</p>;

  return (
    <>
      <ListContainer>
        {(isLoading || isLoadingMore) && <LoadingSpinner />}
        {noPokemonFound ? (
          <NoPokemonMessage>
            {selectedType ? 'Nenhum Pokémon encontrado desse tipo.' : 'Nenhum Pokemon encontrado ainda'}
          </NoPokemonMessage>
        ) : (
          filteredPokemon.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
        )}
        {!limitReached &&
          filteredPokemon.length > 0 &&
          !isLoading &&
          !isLoadingMore && (
            <button
              onClick={() => {
                setIsLoadingMore(true);
                loadMorePokemon();
              }}
            >
              Carregar Mais
            </button>
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
