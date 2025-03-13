import { getId } from '../services/utils';
import { useCallback } from 'react';

export const usePokemonData = ({
    setPokemonIds,
    setLimitReached
}) => {
    const loadMorePokemon = useCallback(() => {
        const newIds = getId(10, 1, 700); 
        setPokemonIds((prevIds) => {
           
            const combinedIds = [...new Set([...prevIds, ...newIds])] 
            if(combinedIds.length >= 100){
                setLimitReached(true);
                return prevIds; 
            }
            return combinedIds;
        });
    }, [setPokemonIds,setLimitReached]);

    return { loadMorePokemon };
};
