import { useState, useEffect } from 'react';

export const usePokemonFilter = ({ allPokemonData, selectedType }) => {
  const [filteredPokemon, setFilteredPokemon] = useState(allPokemonData);
  const [noPokemonFound, setNoPokemonFound] = useState(false);

  useEffect(() => {
    if (selectedType) {
      const filtered = allPokemonData.filter(pokemon =>
        pokemon.types.some(type => type.type.name === selectedType)
      );
      setFilteredPokemon(filtered);
      setNoPokemonFound(filtered.length === 0);
    } else {
      setFilteredPokemon(allPokemonData);
      setNoPokemonFound(allPokemonData.length === 0);
    }
  }, [allPokemonData, selectedType]);

  return { filteredPokemon, noPokemonFound };
};
