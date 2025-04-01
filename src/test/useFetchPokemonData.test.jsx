import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useFetchPokemonData } from '../hooks/useFetchPokemonData';
import { fetchPokemonData } from '../services/utils';

vi.mock('../services/utils', () => ({
  fetchPokemonData: vi.fn()
}));

describe('useFetchPokemonData', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const mockPokemon1 = { id: 1, name: 'bulbasaur' };
  const mockPokemon2 = { id: 2, name: 'ivysaur' };
  const mockPokemon3 = { id: 100, name: 'venusaur' };

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  beforeEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
    console.log = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should start with correct data and not fetch when pokemonIds is empty', async () => {
    const setAllPokemonData = vi.fn();
    const setLimitReached = vi.fn();

    const { result } = renderHook(() => useFetchPokemonData({
      pokemonIds: [],
      allPokemonData: [],
      setAllPokemonData,
      setLimitReached
    }), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(fetchPokemonData).not.toHaveBeenCalled();
    expect(setAllPokemonData).not.toHaveBeenCalled();
  });

  it('should fetch data for new IDs and update the state', async () => {
    fetchPokemonData.mockResolvedValueOnce(mockPokemon1);
    
    const setAllPokemonData = vi.fn(callback => {
      const newState = callback([]);
      return newState;
    });
    const setLimitReached = vi.fn();

    const { result } = renderHook(() => useFetchPokemonData({
      pokemonIds: [1],
      allPokemonData: [],
      setAllPokemonData,
      setLimitReached
    }), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    
    expect(fetchPokemonData).toHaveBeenCalledWith(1);
    expect(setAllPokemonData).toHaveBeenCalled();
  });

  it('should not fetch duplicate data', async () => {
    const initialData = [mockPokemon1];
    fetchPokemonData.mockResolvedValueOnce(mockPokemon2);
    const setAllPokemonData = vi.fn(callback => {
      const newState = callback(initialData);
      return newState;
    });
    const setLimitReached = vi.fn();

    const { result } = renderHook(() => useFetchPokemonData({
      pokemonIds: [1, 2],
      allPokemonData: initialData,
      setAllPokemonData,
      setLimitReached
    }), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    
    expect(fetchPokemonData).toHaveBeenCalledTimes(1);
    expect(fetchPokemonData).toHaveBeenCalledWith(2);
    expect(fetchPokemonData).not.toHaveBeenCalledWith(1);
  });

  it('should activate setLimitReached when reaching 100 Pokémon', async () => {
    const initialData = Array.from({ length: 99 }, (_, i) => ({ 
      id: i + 1, 
      name: `pokemon-${i + 1}` 
    }));
    
    fetchPokemonData.mockResolvedValueOnce(mockPokemon3);
    const setAllPokemonData = vi.fn(callback => {
      const newState = callback(initialData);
      return newState;
    });
    const setLimitReached = vi.fn();

    const { result } = renderHook(() => useFetchPokemonData({
      pokemonIds: [100],
      allPokemonData: initialData,
      setAllPokemonData,
      setLimitReached
    }), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(setLimitReached).toHaveBeenCalledWith(true);
  });

  it('should handle request errors', async () => {
    const errorMessage = 'Failed to fetch Pokémon data';
    fetchPokemonData.mockRejectedValueOnce(new Error(errorMessage));
    
    const setAllPokemonData = vi.fn();
    const setLimitReached = vi.fn();
    const { result } = renderHook(() => useFetchPokemonData({
      pokemonIds: [999],
      allPokemonData: [],
      setAllPokemonData,
      setLimitReached
    }), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    
    expect(result.current.error).toBeDefined();
    expect(setAllPokemonData).not.toHaveBeenCalled();
  });

  it('should not update state when data is empty', async () => {
    fetchPokemonData.mockResolvedValueOnce(null);
    
    const setAllPokemonData = vi.fn();
    const setLimitReached = vi.fn();

    const { result } = renderHook(() => useFetchPokemonData({
      pokemonIds: [500],
      allPokemonData: [],
      setAllPokemonData,
      setLimitReached
    }), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    
    expect(setAllPokemonData).not.toHaveBeenCalled();
  });
});