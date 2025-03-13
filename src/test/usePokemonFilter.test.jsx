import { renderHook } from '@testing-library/react';
import { usePokemonFilter } from '../hooks/usePokemonFilter';
import { describe, it, expect, vi } from 'vitest';

describe('usePokemonFilter', () => {
  const mockData = [
    { name: 'Bulbasaur', types: [{ type: { name: 'grass' } }] },
    { name: 'Charmander', types: [{ type: { name: 'fire' } }] },
    { name: 'Squirtle', types: [{ type: { name: 'water' } }] },
  ];

  it('should filter by selected type', () => {
    const { result } = renderHook(() =>
      usePokemonFilter({
        allPokemonData: mockData,
        selectedType: 'grass',
        isLoading: false,
      })
    );

    expect(result.current.filteredPokemon).toHaveLength(1);
    expect(result.current.filteredPokemon[0].name).toBe('Bulbasaur');
    expect(result.current.noPokemonFound).toBe(false);
  });

  it('should show no results when no matches are found', () => {
    const { result } = renderHook(() =>
      usePokemonFilter({
        allPokemonData: mockData,
        selectedType: 'electric',
        isLoading: false,
      })
    );

    expect(result.current.filteredPokemon).toHaveLength(0);
    expect(result.current.noPokemonFound).toBe(true);
  });

  it('should return all data when no type is selected', () => {
    const { result } = renderHook(() =>
      usePokemonFilter({
        allPokemonData: mockData,
        selectedType: null,
        isLoading: false,
      })
    );

    expect(result.current.filteredPokemon).toHaveLength(3);
    expect(result.current.filteredPokemon).toEqual(mockData);
    expect(result.current.noPokemonFound).toBe(false);
  });

  it('should not filter while loading', () => {
    const { result } = renderHook(() =>
      usePokemonFilter({
        allPokemonData: mockData,
        selectedType: 'grass',
        isLoading: true,
      })
    );

    expect(result.current.filteredPokemon).toHaveLength(0);
    expect(result.current.noPokemonFound).toBe(false);
  });

  it('should handle invalid allPokemonData gracefully', () => {
    const { result } = renderHook(() =>
      usePokemonFilter({
        allPokemonData: null, 
        selectedType: 'grass',
        isLoading: false,
      })
    );

    expect(result.current.filteredPokemon).toHaveLength(0);
    expect(result.current.noPokemonFound).toBe(false);
  });

  it('should avoid unnecessary filtering when inputs do not change', () => {
    const consoleSpy = vi.spyOn(console, 'log'); // Espiar o console.log

    const { rerender } = renderHook(
      ({ allPokemonData, selectedType, isLoading }) =>
        usePokemonFilter({ allPokemonData, selectedType, isLoading }),
      {
        initialProps: {
          allPokemonData: mockData,
          selectedType: 'grass',
          isLoading: false,
        },
      }
    );

    // Re-render com as mesmas props
    rerender({
      allPokemonData: mockData,
      selectedType: 'grass',
      isLoading: false,
    });

    // Verificar se o console.log foi chamado apenas uma vez (sem re-filtragem desnecessária)
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    consoleSpy.mockRestore(); // Restaurar o console.log original
  });
});