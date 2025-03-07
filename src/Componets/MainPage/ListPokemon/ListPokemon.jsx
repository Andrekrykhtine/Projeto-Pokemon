import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { ListContainer, NoPokemonMessage } from './style';
import PokemonCard from '../PokemonCard/PokemonCard';
import LimitReachedMessage from '../LimitReachedMessage/LimitReachedMessage';
import LoadingSpinner from '../../UI/LoadingSpiner/LoadingSpiner';
import { useFetchPokemonData } from '../../../hooks/useFetchPokemonData';
import { usePokemonData } from '../../../hooks/usePokemonData';
import { usePokemonFilter } from '../../../hooks/usePokemonFilter';
import { usePokemonInitializer } from '../../../hooks/usePokemonInitializer';

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
  const [initialLoad, setInitialLoad] = useState(true);

  // Inicializa com 10 Pokémon quando o componente carrega pela primeira vez
  usePokemonInitializer({ setPokemonIds });

  // Hook para buscar dados dos Pokémon
  const { isError, error, isLoading } = useFetchPokemonData({ 
    pokemonIds, 
    allPokemonData, 
    setAllPokemonData, 
    setLimitReached 
  });

  // Hook para filtrar Pokémon por tipo
  const { filteredPokemon, noPokemonFound } = usePokemonFilter({
    allPokemonData,
    selectedType,
    isLoading: isLoading || initialLoad
  });

  // Detectar quando o carregamento inicial termina
  useEffect(() => {
    if (allPokemonData.length > 0 && initialLoad) {
      setInitialLoad(false);
    }
  }, [allPokemonData, initialLoad]);

  // Se os dados estiverem vazios e voltarmos para o início, considerar como carregamento inicial novamente
  useEffect(() => {
    if (allPokemonData.length === 0 && !initialLoad) {
      setInitialLoad(true);
    }
  }, [allPokemonData, initialLoad]);

  if (isError) return <p>Erro: {error.message}</p>;

  // Determinar se deve mostrar o spinner ou a lista
  const showSpinner = isLoading || isLoadingMore || (initialLoad && allPokemonData.length === 0);
  const showMessage = noPokemonFound && !showSpinner;

  return (
    <>
      <ListContainer>
        {showSpinner && <LoadingSpinner />}
        {showMessage ? (
          <NoPokemonMessage>
            {selectedType ? 'Nenhum Pokémon encontrado desse tipo.' : 'Nenhum Pokemon encontrado ainda'}
          </NoPokemonMessage>
        ) : (
          // Só mostrar a lista se não estiver no carregamento inicial
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