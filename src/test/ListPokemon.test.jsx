import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ListPokemon from '../Componets/MainPage/ListPokemon/ListPokemon';
import { useFetchPokemonData } from '../hooks/useFetchPokemonData'; 
import { usePokemonFilter } from '../hooks/usePokemonFilter';

vi.mock('../Componets/UI/LoadingSpiner/LoadingSpiner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>
}));

vi.mock('../Componets/MainPage/PokemonCard/PokemonCard', () => ({
  default: ({ pokemon }) => <div data-testid="pokemon-card">{pokemon.name}</div>
}));

vi.mock('../hooks/useFetchPokemonData', () => ({
  useFetchPokemonData: vi.fn(() => ({ isError: false, error: null, isLoading: false }))
}));

vi.mock('../hooks/usePokemonFilter', () => ({
  usePokemonFilter: vi.fn(() => ({ filteredPokemon: [], noPokemonFound: true }))
}));

vi.mock('../hooks/usePokemonInitializer', () => ({
  usePokemonInitializer: vi.fn()
}));


describe('ListPokemon Component', () => {
  const defaultProps = {
    pokemonIds: [1, 2, 3],
    setPokemonIds: vi.fn(),
    allPokemonData: [],
    setAllPokemonData: vi.fn(),
    limitReached: false,
    setLimitReached: vi.fn(),
    selectedType: '',
  };

  it('renders loading spinner when loading', () => {
    vi.mocked(useFetchPokemonData).mockReturnValue({
      isError: false,
      error: null,
      isLoading: true,
      data: [],
    });

    render(<ListPokemon {...defaultProps} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders pokemon cards when data is available', () => {
    vi.mocked(usePokemonFilter).mockReturnValue({
      filteredPokemon: [
        { id: 1, name: 'Pikachu' },
        { id: 2, name: 'Charmander' },
      ],
      noPokemonFound: false,
    });

    render(<ListPokemon {...defaultProps} allPokemonData={[{ id: 1, name: 'Pikachu' }, { id: 2, name: 'Charmander' }]} />);
    expect(screen.getAllByTestId('pokemon-card')).toHaveLength(2);
  });

  it('renders error message when there is an error', () => {
    // Mock do useFetchPokemonData para retornar um erro
    vi.mocked(useFetchPokemonData).mockReturnValue({
      isError: true,
      error: { message: 'Erro ao buscar dados' },
      isLoading: false,
      data: [],
    });

    render(<ListPokemon {...defaultProps} />);
    expect(screen.getByText('Erro: Erro ao buscar dados')).toBeInTheDocument();
  });
});