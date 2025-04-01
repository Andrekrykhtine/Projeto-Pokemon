import { useEffect, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonData } from '../services/utils';

export const useFetchPokemonData = ({ 
  pokemonIds, 
  allPokemonData, 
  setAllPokemonData, 
  setLimitReached 
}) => {
  const processedIds = useRef(new Set(allPokemonData.map(p => p.id)));

  const { isError, error, isLoading, data } = useQuery({
    queryKey: ['pokemons', pokemonIds],
    queryFn: async () => {
      const newData = await Promise.all(
        pokemonIds
          .filter(id => !processedIds.current.has(id))
          .map(id => fetchPokemonData(id))
      );
      return newData;
    },
    enabled: pokemonIds.length > 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 0
  });

  useEffect(() => {
    if (!data?.length) return;
  
    const newPokemon = data.filter(p => 
      p && !processedIds.current.has(p.id) 
    );

    if (newPokemon.length === 0) return;

    processedIds.current = new Set([
      ...processedIds.current,
      ...newPokemon.map(p => p.id)
    ]);

    setAllPokemonData(prev => {
      const updated = [...prev, ...newPokemon];
      if (updated.length >= 100) setLimitReached(true);
      return updated;
    });
  }, [data, setAllPokemonData, setLimitReached]);

  return { 
    isError, 
    error,
    isLoading,
    data: allPokemonData 
  };
};