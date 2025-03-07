import { getId } from '../services/utils';
import { useCallback } from 'react';

export const usePokemonData = ({
    setPokemonIds,
    setLimitReached
}) => {
    const loadMorePokemon = useCallback(() => {
        const newIds = getId(10, 1, 700); //carrega mais 10 ids
        setPokemonIds((prevIds) => {
           
            const combinedIds = [...new Set([...prevIds, ...newIds])] // remove os ids duplicados
            if(combinedIds.length >= 100){
                setLimitReached(true);
                return prevIds; // se passou do limite, mantem o array anterior.
            }
            return combinedIds;
        });
    }, [setPokemonIds,setLimitReached]);

    return { loadMorePokemon };
};
