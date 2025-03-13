import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter, useParams, useNavigate } from 'react-router-dom';
import PokemonProperties from '../pages/PokemonProperties/PokemonProperities';
import { ThemeContext, themes } from '../styles/Theme';
import { fetchPokemonData } from '../services/utils';


vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock('../services/utils', () => ({
  fetchPokemonData: vi.fn(),
}));

vi.mock('../Componets/PokemonProperties/NavigationButtons/NavigationButtons', () => ({
  default: ({ onPrevious, onNext, isPreviousDisabled, isNextDisabled }) => (
    <div>
      <button
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        data-testid="previous-button"
      >
        Anterior
      </button>
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        data-testid="next-button"
      >
        Próximo
      </button>
    </div>
  ),
}));

vi.mock('../Componets/PokemonProperties/PokemonDetails/PokemonDetails', () => ({
  default: ({ pokemon }) => <div data-testid="pokemon-details">{pokemon.name}</div>,
}));

vi.mock('../Componets/themeTogglerButton/themeTogglerButton', () => ({
  ThemeTogglerButton: () => <button data-testid="theme-toggler">Alternar Tema</button>,
}));

describe('PokemonProperties', () => {
  const mockTheme = {
    theme: themes.light,
    setTheme: vi.fn(),
  };

  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useParams.mockReturnValue({ id: '2' }); // ID inicial é 2
    useNavigate.mockReturnValue(mockNavigate);
  });

  const renderWithTheme = (ui) => {
    return render(
      <ThemeContext.Provider value={mockTheme}>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeContext.Provider>
    );
  };

  it('deve renderizar o estado de carregamento', () => {
    fetchPokemonData.mockImplementation(() => new Promise(() => {})); // Simula carregamento infinito

    renderWithTheme(<PokemonProperties />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('deve renderizar uma mensagem de erro', async () => {
    fetchPokemonData.mockRejectedValue(new Error('Erro ao buscar dados'));

    renderWithTheme(<PokemonProperties />);
    expect(await screen.findByTestId('error-message')).toHaveTextContent('Erro: Erro ao buscar dados');
  });

  it('deve renderizar os detalhes do Pokémon', async () => {
    const mockPokemonData = { name: 'Pikachu', id: 1 };
    fetchPokemonData.mockResolvedValue(mockPokemonData);

    renderWithTheme(<PokemonProperties />);
    expect(await screen.findByTestId('pokemon-details')).toHaveTextContent('Pikachu');
  });

  it('deve navegar para o próximo Pokémon', async () => {
    const mockPokemonData = { name: 'Pikachu', id: 2 };
    fetchPokemonData.mockResolvedValue(mockPokemonData);

    renderWithTheme(<PokemonProperties />);
    fireEvent.click(await screen.findByTestId('next-button'));
    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/3');  // Corrigido para 3, que é o próximo após o ID 2
  });

  it('deve navegar para o Pokémon anterior', async () => {
    const mockPokemonData = { name: 'Pikachu', id: 2 };
    fetchPokemonData.mockResolvedValue(mockPokemonData);
    renderWithTheme(<PokemonProperties />);
    fireEvent.click(await screen.findByTestId('previous-button'));
    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/1');
  });
  
  it('deve voltar para a página inicial', async () => {
    const mockPokemonData = { name: 'Pikachu', id: 1 };
    fetchPokemonData.mockResolvedValue(mockPokemonData);

    renderWithTheme(<PokemonProperties />);
    fireEvent.click(await screen.findByTestId('home-button'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('deve desabilitar o botão "Anterior" quando o ID for 1', async () => {
    useParams.mockReturnValue({ id: '1' }); 
    const mockPokemonData = { name: 'Bulbasaur', id: 1 };
    fetchPokemonData.mockResolvedValue(mockPokemonData);

    renderWithTheme(<PokemonProperties />);
    expect(await screen.findByTestId('previous-button')).toBeDisabled();
  });

  it('deve desabilitar o botão "Próximo" quando o ID for 700', async () => {
    useParams.mockReturnValue({ id: '700' });
    const mockPokemonData = { name: 'Pokemon700', id: 700 };
    fetchPokemonData.mockResolvedValue(mockPokemonData);
    renderWithTheme(<PokemonProperties />);
    expect(await screen.findByTestId('next-button')).toBeDisabled();
  });
});