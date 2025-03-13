import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ThemeContext, themes } from '../styles/Theme';
import MainPage from '../pages/MainPage/index';
import { getId } from '../services/utils';
import {PropTypes} from 'prop-types';
import { Button } from '../Componets/UI/Button/Button';

// Mocks
vi.mock('../services/utils', () => ({
  getId: vi.fn(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
}));

vi.mock('../Componets/MainPage/ListPokemon/ListPokemon', () => ({
  default: () => <div data-testid="list-pokemon">Lista de Pokémon</div>,
}));

vi.mock('../Componets/MainPage/Filter/Fliter', () => ({
  default: () => <div data-testid="type-filter">Filtro de Tipos</div>,
}));

vi.mock('../Componets/themeTogglerButton/themeTogglerButton', () => ({
  ThemeTogglerButton: () => <button data-testid="theme-toggler">Alternar Tema</button>,
}));

// Mock corrigido para a imagem
vi.mock('../assets/images/pokedexsemfundo.png', () => ({
  default: 'pokedex-image-path',
}));

// Mock corrigido para o Button
vi.mock('../Componets/UI/Button/Button', () => ({
  Button: ({ children, onClick, disabled, type, ...rest }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      data-testid={`button-${String(children).toLowerCase().replace(/\s+/g, '-')}`}
      {...rest}
    >
      {children}
      </button>
    )
  }));
  
  Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.string,
  };

describe('MainPage', () => {
  const mockTheme = {
    theme: themes.light,
    setTheme: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithTheme = (ui) => {
    return render(
      <ThemeContext.Provider value={mockTheme}>
        {ui}
      </ThemeContext.Provider>
    );
  };

  it('deve renderizar corretamente todos os componentes', () => {
    renderWithTheme(<MainPage />);

    expect(screen.getByTestId('list-pokemon')).toBeInTheDocument();
    expect(screen.getByTestId('type-filter')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggler')).toBeInTheDocument();
    expect(screen.getByTestId('button-carregar-mais...')).toBeInTheDocument();
    expect(screen.getByTestId('button-resetar-lista')).toBeInTheDocument();
    expect(screen.getByTestId('button-mostrar-todos')).toBeInTheDocument();
    expect(screen.getByAltText('Pokedex')).toBeInTheDocument();
  });

  it('deve chamar getId ao clicar no botão "Carregar mais..."', () => {
    renderWithTheme(<MainPage />);

    fireEvent.click(screen.getByTestId('button-carregar-mais...'));

    expect(getId).toHaveBeenCalledWith(10, 1, 700);
  });

  it('deve chamar getId ao clicar no botão "Resetar Lista"', () => {
    renderWithTheme(<MainPage />);

    fireEvent.click(screen.getByTestId('button-resetar-lista'));

    expect(getId).toHaveBeenCalledWith(10, 1, 700);
  });

  it('deve ter o botão "Mostrar Todos" desabilitado inicialmente', () => {
    renderWithTheme(<MainPage />);

    expect(screen.getByTestId('button-mostrar-todos')).toBeDisabled();
  });
});