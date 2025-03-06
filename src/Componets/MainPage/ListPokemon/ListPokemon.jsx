import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ListContainer, NoPokemonMessage } from './style';
import PokemonCard from '../PokemonCard/PokemonCard';
import { getId, fetchPokemonData } from '../../../services/utils';
import LimitReachedMessage from '../LimitReachedMessage/LimitReachedMessage';
import LoadingSpinner from '../../UI/LoadingSpiner/LoadingSpiner';
import { usePokemonData } from '../../../hooks/usePokemonData'; // Importando o hook personalizado

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

  // Initialize with 10 Pokémon when component first loads
  useEffect(() => {
    const initialIds = getId(10, 1, 700);
    setPokemonIds(initialIds);
  }, [setPokemonIds]);

  const { isError, error, isLoading, data } = useQuery(
    ['pokemons', pokemonIds],
    async () => {
      const newData = await Promise.all(pokemonIds.map(id => fetchPokemonData(id)));
      return newData;
    },
    {
      enabled: pokemonIds.length > 0,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(
        (newPokemon) => !allPokemonData.some((existingPokemon) => existingPokemon.id === newPokemon.id)
      );
      setAllPokemonData((prevData) => {
        const updatedData = [...prevData, ...filteredData];
        if (updatedData.length >= 100) {
          setLimitReached(true);
        }
        return updatedData;
      });
      setIsLoadingMore(false);
    }
  }, [data, allPokemonData, setAllPokemonData, setLimitReached]);

  // Filtra os Pokémon pelo tipo selecionado
  const filteredPokemon = selectedType
    ? allPokemonData.filter((pokemon) => pokemon.types.some((type) => type.type.name === selectedType))
    : allPokemonData;

  if (isError) return <p>Erro: {error.message}</p>;

  // Verifica se há Pokémon correspondentes ao tipo selecionado ou se não há nenhum Pokémon carregado
  const noPokemonFound = (selectedType && filteredPokemon.length === 0) || (!isLoading && filteredPokemon.length === 0);

  return (
    <>
      <ListContainer>
        {(isLoading || isLoadingMore) && <LoadingSpinner />}
        {noPokemonFound ? (
          <NoPokemonMessage>
            {selectedType ? 'Nenhum Pokémon encontrado desse tipo.' : 'Nenhum Pokemon encontrado ainda'}
          </NoPokemonMessage>
        ) : (
          filteredPokemon.map((pokemon) => (
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