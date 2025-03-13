import { useState, useEffect, useRef } from 'react';

export const usePokemonFilter = ({ allPokemonData, selectedType, isLoading }) => {
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [noPokemonFound, setNoPokemonFound] = useState(false);
  
  // Use uma ref para rastrear quando a filtragem foi realizada pela última vez
  const lastFilterRef = useRef({
    dataJSON: null, 
    selectedType: null,
    isLoading: null
  });
  
  useEffect(() => {
    // Converter o array para JSON para comparação
    const currentDataJSON = JSON.stringify(allPokemonData);
    
    // Verificar se algo realmente mudou para evitar filtragem desnecessária
    const shouldFilter = 
      lastFilterRef.current.dataJSON !== currentDataJSON ||
      lastFilterRef.current.selectedType !== selectedType ||
      lastFilterRef.current.isLoading !== isLoading;
    
    if (!shouldFilter) return;
    
    // Atualizar a referência com os valores atuais
    lastFilterRef.current = {
      dataJSON: currentDataJSON,
      selectedType,
      isLoading
    };
    
    console.log('🔄 Filtrando Pokémon...', {
      selectedType, 
      dataLength: Array.isArray(allPokemonData) ? allPokemonData.length : 0,
      isLoading
    });
    
    if (isLoading) {
      setNoPokemonFound(false);
      return;
    }
    
    if (!Array.isArray(allPokemonData)) {
      console.warn("⚠️ allPokemonData deve ser um array válido.");
      setFilteredPokemon([]);
      setNoPokemonFound(false);
      return;
    }
    
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
  }, [allPokemonData, selectedType, isLoading]);

  return { filteredPokemon, noPokemonFound };
};