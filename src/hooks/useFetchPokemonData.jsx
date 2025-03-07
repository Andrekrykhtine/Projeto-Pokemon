import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { fetchPokemonData } from '../services/utils';

export const useFetchPokemonData = ({ pokemonIds, allPokemonData, setAllPokemonData, setLimitReached }) => {
    // Ref para armazenar os IDs dos Pokémon já processados
    const processedIds = useRef(new Set());
    
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
        if (!data) return;
        
        const newPokemon = data.filter(newPokemon => {
          
            if (processedIds.current.has(newPokemon.id)) {
                return false;
            }
            
            const isNewPokemon = !allPokemonData.some(
                existingPokemon => existingPokemon.id === newPokemon.id
            );
          
            if (isNewPokemon) {
                processedIds.current.add(newPokemon.id);
            }
            
            return isNewPokemon;
        });
        
        if (newPokemon.length > 0) {
            setAllPokemonData(prevData => {
                const updatedData = [...prevData, ...newPokemon];
                if (updatedData.length >= 100) {
                    setLimitReached(true);
                }
                return updatedData;
            });
        }
    }, [data]); 

    return { isError, error, isLoading, data };
};