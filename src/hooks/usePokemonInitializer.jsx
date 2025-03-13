import { useEffect } from 'react';
import { getId } from '../services/utils';

export const usePokemonInitializer = ({ setPokemonIds }) => {
  useEffect(() => {
    console.log(setPokemonIds);
    
    const initialIds = getId(10, 1, 700);
    setPokemonIds(initialIds);
  }, [setPokemonIds]);
};
