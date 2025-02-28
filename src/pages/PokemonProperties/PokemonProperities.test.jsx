import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainPage from './index';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getId } from '../../services/utils';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { getPokemons } from '../../services/pokemon';
import { renderWithRouter } from '../../test/utils';
import {MemoryRouter} from 'react-router-dom'

// Mock do tema com a estrutura correta
const mockTheme = {
  colors: {
    background: '#fff', // Cor de fundo
    text: '#000', // Cor do texto
  },
  backgroundImage: 'none', // Imagem de fundo,
  backgroundList: 'none'
};

// Mock das funções getId e getPokemons
vi.mock('../../services/utils', () => ({
  getId: vi.fn(),
}));

vi.mock('../../services/pokemon', () => ({
  getPokemons: vi.fn(),
}));

describe('MainPage', () => {
  beforeEach(() => {
    // Resetar mocks antes de cada teste
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    renderWithRouter(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );

    // Verifica se os elementos estão presentes
    expect(screen.getByText('Carregar mais...')).toBeInTheDocument();
    expect(screen.getByText('Resetar Lista')).toBeInTheDocument();
    expect(screen.getByText('Mostrar Todos')).toBeInTheDocument();
    expect(screen.getByLabelText('Filtrar por tipo')).toBeInTheDocument();
  });

  it('handles "Carregar mais..." button click and fetches pokemons', async () => {
    // Mock da função getId para retornar uma lista de IDs
    getId.mockReturnValue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // Mock da função getPokemons para retornar uma lista de pokemons
    getPokemons.mockResolvedValue([
        { id: 1, name: 'bulbasaur', types: ['grass', 'poison'] },
        { id: 2, name: 'ivysaur', types: ['grass', 'poison'] },
      ]);
    renderWithRouter(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );

    // Simula o clique no botão "Carregar mais..."
    const loadMoreButton = screen.getByText('Carregar mais...');
    fireEvent.click(loadMoreButton);

    // Verifica se a função getId foi chamada
    expect(getId).toHaveBeenCalledWith(10, 1, 700);
    
    // Verifica se a função getPokemons foi chamada corretamente
    await waitFor(() => expect(getPokemons).toHaveBeenCalledWith([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
    await waitFor(() => expect(screen.getByText('bulbasaur')).toBeInTheDocument());

  });

  it('disables "Carregar mais..." button when limit is reached', async () => {
     // Mock da função getId para retornar uma lista de IDs
    getId.mockReturnValueOnce(Array.from({ length: 70 }, (_, i) => i + 1))
      .mockReturnValue(Array.from({ length: 100 }, (_, i) => i + 1));

    getPokemons.mockResolvedValueOnce([
      { id: 1, name: 'bulbasaur', types: ['grass', 'poison'] },
      { id: 2, name: 'ivysaur', types: ['grass', 'poison'] },
    ]).mockResolvedValue([
      { id: 71, name: 'pokemon71', types: ['fire'] },
      { id: 72, name: 'pokemon72', types: ['water'] },
    ]);
    renderWithRouter(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );
    
    const loadMoreButton = screen.getByText('Carregar mais...');
    fireEvent.click(loadMoreButton);

    await waitFor(() => expect(getPokemons).toHaveBeenCalled());

    fireEvent.click(loadMoreButton);

    // Verifica se o botão está desabilitado
    await waitFor(() => expect(loadMoreButton).toBeDisabled());

  });

  it('handles "Resetar Lista" button click and reset', async () => {
     // Mock da função getId para retornar uma lista de IDs
    getId.mockReturnValueOnce([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .mockReturnValue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    getPokemons.mockResolvedValueOnce([
      { id: 1, name: 'bulbasaur', types: ['grass', 'poison'] },
      { id: 2, name: 'ivysaur', types: ['grass', 'poison'] },
    ]).mockResolvedValue([
      { id: 1, name: 'bulbasaur', types: ['grass', 'poison'] },
      { id: 2, name: 'ivysaur', types: ['grass', 'poison'] },
    ]);

    renderWithRouter(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );

    const loadMoreButton = screen.getByText('Carregar mais...');
    fireEvent.click(loadMoreButton);

    await waitFor(() => expect(screen.getByText('bulbasaur')).toBeInTheDocument());
    
    const resetButton = screen.getByText('Resetar Lista');
    fireEvent.click(resetButton);

    await waitFor(() => expect(getId).toHaveBeenCalledWith(10, 1, 700));
    await waitFor(() => expect(getPokemons).toHaveBeenCalledWith([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
  });

  it('handles type selection in TypeFilter', async () => {
    getId.mockReturnValue([1, 2]);
    getPokemons.mockResolvedValueOnce([
      { id: 1, name: 'bulbasaur', types: ['grass', 'poison'] },
      { id: 2, name: 'charizard', types: ['fire', 'flying'] },
    ]).mockResolvedValueOnce([]);

    renderWithRouter(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );
    
    const loadMoreButton = screen.getByText('Carregar mais...');
    fireEvent.click(loadMoreButton);

    await waitFor(() => expect(screen.getByText('bulbasaur')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('charizard')).toBeInTheDocument());

    // Simula a seleção de um tipo no filtro
    const typeFilter = screen.getByLabelText('Filtrar por tipo');
    fireEvent.change(typeFilter, { target: { value: 'fire' } });

    // Verifica se o tipo selecionado foi atualizado
    await waitFor(() => expect(screen.getByDisplayValue('fire')).toBeInTheDocument());

    // Verificar que so tem os pokemons do tipo fire
    await waitFor(() => expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('charizard')).toBeInTheDocument());
  });

  it('handles "Mostrar Todos" button click', async () => {
    getId.mockReturnValue([1, 2]);
    getPokemons.mockResolvedValueOnce([
      { id: 1, name: 'bulbasaur', types: ['grass', 'poison'] },
      { id: 2, name: 'charizard', types: ['fire', 'flying'] },
    ]).mockResolvedValueOnce([]);

    renderWithRouter(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );
    
    const loadMoreButton = screen.getByText('Carregar mais...');
    fireEvent.click(loadMoreButton);

    await waitFor(() => expect(screen.getByText('bulbasaur')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('charizard')).toBeInTheDocument());

    const typeFilter = screen.getByLabelText('Filtrar por tipo');
    fireEvent.change(typeFilter, { target: { value: 'fire' } });

    await waitFor(() => expect(screen.getByDisplayValue('fire')).toBeInTheDocument());

    // Simula o clique no botão "Mostrar Todos"
    const showAllButton = screen.getByText('Mostrar Todos');
    fireEvent.click(showAllButton);

    await waitFor(() => expect(screen.getByDisplayValue('')).toBeInTheDocument());
    //Verificar que tem todos os pokemons
    await waitFor(() => expect(screen.getByText('bulbasaur')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('charizard')).toBeInTheDocument());

    // Verifica se o tipo selecionado foi resetado
    expect(showAllButton).toBeDisabled();
  });
  
  it('should show "Nenhum pokemon encontrado." when no pokemons are found', async () => {
    getId.mockReturnValue([]);
    getPokemons.mockResolvedValue([]);
  
    renderWithRouter(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );
  
    const loadMoreButton = screen.getByText('Carregar mais...');
    fireEvent.click(loadMoreButton);
  
    await waitFor(() => {
      expect(screen.getByText('Nenhum pokemon encontrado.')).toBeInTheDocument();
    });
  });

  it('should show error message when getPokemons throws error', async () => {
      getId.mockReturnValue([1]);
      getPokemons.mockRejectedValue(new Error('API Error'));
  
      renderWithRouter(
        <ThemeContext.Provider value={{ theme: mockTheme }}>
          <MainPage />
        </ThemeContext.Provider>
      );
  
      const loadMoreButton = screen.getByText('Carregar mais...');
      fireEvent.click(loadMoreButton);
  
      await waitFor(() => {
        expect(screen.getByText('Erro ao carregar pokemons!')).toBeInTheDocument();
      });
  });
    it('should render ThemeTogglerButton', () => {
      renderWithRouter(
        <ThemeContext.Provider value={{ theme: mockTheme }}>
          <MainPage />
        </ThemeContext.Provider>
      );
      expect(screen.getByLabelText('themeToggler')).toBeInTheDocument();
    });

    it('should navigate to pokemon page when click in the pokemon name', async () => {
      // Mock da função getId para retornar uma lista de IDs
      getId.mockReturnValue([1]);
      // Mock da função getPokemons para retornar uma lista de pokemons
      getPokemons.mockResolvedValue([
          { id: 1, name: 'bulbasaur', types: ['grass', 'poison'] }
        ]);
      renderWithRouter(
        <ThemeContext.Provider value={{ theme: mockTheme }}>
          <MainPage />
        </ThemeContext.Provider>
      );

      // Simula o clique no botão "Carregar mais..."
      const loadMoreButton = screen.getByText('Carregar mais...');
      fireEvent.click(loadMoreButton);
      await waitFor(() => expect(screen.getByText('bulbasaur')).toBeInTheDocument());

      const pokemonName = screen.getByText('bulbasaur')
      fireEvent.click(pokemonName);

      await waitFor(() => {
        expect(window.location.pathname).toBe('/pokemon/1')
      });
    })
});
