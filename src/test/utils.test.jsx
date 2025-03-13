import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPokemonData } from '../services/utils';

describe('fetchPokemonData', () => {
    beforeEach(() => {
      vi.resetAllMocks(); // Reseta todos os mocks antes de cada teste
    });
  
    // Teste 1: Retorna dados válidos para um ID válido
    it('should return Pokemon data for a valid ID', async () => {
      const mockData = { name: 'pikachu', id: 25 };
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        })
      );
  
      const result = await fetchPokemonData(25);
  
      // Verifica se o resultado é o esperado
      expect(result).toEqual(mockData);
  
      // Verifica se o fetch foi chamado com a URL e as opções corretas
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/25/',
        {
          signal: expect.any(AbortSignal), // Verifica se um AbortSignal foi passado
        }
      );
    });
  
    // Teste 2: Lança erro se o ID não for um número ou string
    it('should throw a TypeError if ID is not a number or string', async () => {
      await expect(fetchPokemonData(null)).rejects.toThrowError(
        'ID must be a number or string.'
      );
      await expect(fetchPokemonData(undefined)).rejects.toThrowError(
        'ID must be a number or string.'
      );
      await expect(fetchPokemonData({})).rejects.toThrowError(
        'ID must be a number or string.'
      );
    });
  
    // Teste 3: Lança erro se a requisição falhar
    it('should throw an error if the request fails', async () => {
      globalThis.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
        })
      );
  
      await expect(fetchPokemonData(999)).rejects.toThrowError(
        'HTTP error! Status: 404'
      );
    });
  
    // Teste 4: Lança erro se a requisição exceder o timeout
    it('should throw an error if the request times out', async () => {
      globalThis.fetch = vi.fn(() =>
        new Promise((_, reject) => {
          // Simula uma requisição que nunca é resolvida
          setTimeout(() => {
            reject(new Error('Request timed out'));
          }, 2000); // Simula um atraso de 2 segundos
        })
      );
  
      await expect(fetchPokemonData(25, 1000)).rejects.toThrowError('Request timed out');
    });
  });