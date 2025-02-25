import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from './index';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getId } from '../../services/utils';

// Mock do tema com a estrutura correta
const mockTheme = {
  colors: {
    background: '#fff', // Cor de fundo
    text: '#000', // Cor do texto
  },
  backgroundImage: 'none', // Imagem de fundo
};

// Mock da função getId
jest.mock('../../services/utils', () => ({
  getId: jest.fn(),
}));

describe('MainPage', () => {
  beforeEach(() => {
    // Resetar mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );

    // Verifica se os elementos estão presentes
    expect(screen.getByText('Carregar mais...')).toBeInTheDocument();
    expect(screen.getByText('Resetar Lista')).toBeInTheDocument();
    expect(screen.getByText('Mostrar Todos')).toBeInTheDocument();
  });

  it('handles "Carregar mais..." button click', () => {
    // Mock da função getId para retornar uma lista de IDs
    getId.mockReturnValue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );

    // Simula o clique no botão "Carregar mais..."
    const loadMoreButton = screen.getByText('Carregar mais...');
    fireEvent.click(loadMoreButton);

    // Verifica se a função getId foi chamada
    expect(getId).toHaveBeenCalledWith(10, 1, 700);
  });

  it('disables "Carregar mais..." button when limit is reached', () => {
    // Mock da função getId para retornar uma lista de IDs
    getId.mockReturnValue(Array.from({ length: 100 }, (_, i) => i + 1));

    render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );

    // Simula o clique no botão "Carregar mais..."
    const loadMoreButton = screen.getByText('Carregar mais...');
    fireEvent.click(loadMoreButton);

    // Verifica se o botão está desabilitado
    expect(loadMoreButton).toBeDisabled();
  });

  it('handles "Resetar Lista" button click', () => {
    // Mock da função getId para retornar uma lista de IDs
    getId.mockReturnValue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );

    // Simula o clique no botão "Resetar Lista"
    const resetButton = screen.getByText('Resetar Lista');
    fireEvent.click(resetButton);

    // Verifica se a função getId foi chamada
    expect(getId).toHaveBeenCalledWith(10, 1, 700);
  });

  it('handles type selection in TypeFilter', () => {
    render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );

    // Simula a seleção de um tipo no filtro
    const typeFilter = screen.getByLabelText('Filtrar por tipo'); // Ajuste o label conforme necessário
    fireEvent.change(typeFilter, { target: { value: 'fire' } });

    // Verifica se o tipo selecionado foi atualizado
    expect(screen.getByDisplayValue('fire')).toBeInTheDocument();
  });

  it('handles "Mostrar Todos" button click', () => {
    render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <MainPage />
      </ThemeContext.Provider>
    );

    // Simula o clique no botão "Mostrar Todos"
    const showAllButton = screen.getByText('Mostrar Todos');
    fireEvent.click(showAllButton);

    // Verifica se o tipo selecionado foi resetado
    expect(screen.getByText('Mostrar Todos')).toBeDisabled(); // O botão deve estar desabilitado se nenhum tipo estiver selecionado
  });
});