import { useState, useEffect } from 'react';

export const usePokemonFilter = ({ allPokemonData, selectedType, isLoading }) => {
  const [filteredPokemon, setFilteredPokemon] = useState(allPokemonData);
  const [noPokemonFound, setNoPokemonFound] = useState(false);

  useEffect(() => {
    // Não mostrar a mensagem enquanto estiver carregando
    if (isLoading) {
      setNoPokemonFound(false);
      return;
    }
    
    if (selectedType) {
      const filtered = allPokemonData.filter(pokemon =>
        pokemon.types.some(type => type.type.name === selectedType)
      );
      setFilteredPokemon(filtered);
      // Só mostrar "nenhum pokémon encontrado" se não estivermos carregando
      setNoPokemonFound(filtered.length === 0);
    } else {
      setFilteredPokemon(allPokemonData);
      // Só mostrar "nenhum pokémon encontrado" se não estivermos carregando
      // e se realmente não tivermos pokémon
      setNoPokemonFound(allPokemonData.length === 0);
    }
  }, [allPokemonData, selectedType, isLoading]);

  return { filteredPokemon, noPokemonFound };
};