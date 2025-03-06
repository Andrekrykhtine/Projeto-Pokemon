import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchPokemonData } from '../services/utils';

export const useFetchPokemonData = ({ pokemonIds, allPokemonData, setAllPokemonData, setLimitReached }) => {
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
        }
    }, [data, allPokemonData, setAllPokemonData, setLimitReached]);

    return { isError, error, isLoading, data };
};
