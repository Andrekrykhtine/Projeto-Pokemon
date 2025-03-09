import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'jest';
import jest from 'jest-mock';
import MainPage from './index';
import { ThemeContextProvider } from '../../contexts/ThemeContextProvider';
import { MemoryRouter } from 'react-router-dom';
import { mockedPokemonTypes } from './mocks'; // Arquivo de mocks


jest.mock('../../Componets/MainPage/ListPokemon/ListPokemon', () => ({
    __esModule: true,
    default: ({ pokemonIds,  limitReached, selectedType }) => (
        <div data-testid="list-pokemon">
            <p data-testid="pokemon-count">{pokemonIds.length}</p>
            <p data-testid="limit-reached">{limitReached.toString()}</p>
            <p data-testid="selected-type">{selectedType}</p>
        </div>
    ),
}));


jest.mock('../../Componets/themeTogglerButton/themeTogglerButton', () => ({
    __esModule: true,
    default: () => <button data-testid="theme-toggler">Toggle Theme</button>,
}));

jest.mock('../../Componets/UI/Button/Button', () => ({
    __esModule: true,
    default: ({ children, onClick, disabled }) => (
        <button data-testid="button" onClick={onClick} disabled={disabled}>
            {children}
        </button>
    ),
}));

jest.mock('../../Componets/MainPage/Filter/Fliter', () => ({
    __esModule: true,
    default: ({ types, selectedType, onSelectType }) => (
        <div data-testid="filter">
            <select data-testid="type-select" onChange={onSelectType} value={selectedType}>
                {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>
    ),
}));

describe('MainPage', () => {
    it('should render main components', () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <MainPage />
                </ThemeContextProvider>
            </MemoryRouter>
        );
        expect(screen.getByTestId('list-pokemon')).toBeInTheDocument();
        expect(screen.getByTestId('theme-toggler')).toBeInTheDocument();
        expect(screen.getByTestId('button')).toBeInTheDocument();
        expect(screen.getByTestId('filter')).toBeInTheDocument();
    });


    it('should handle load more button click', () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <MainPage />
                </ThemeContextProvider>
            </MemoryRouter>
        );
        const loadMoreButton = screen.getByText('Carregar mais...');
        fireEvent.click(loadMoreButton);
        expect(screen.getByTestId('pokemon-count')).toHaveTextContent('20'); //Exemplo.  Verifique o estado
    });

    it('should handle reset button click', () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <MainPage />
                </ThemeContextProvider>
            </MemoryRouter>
        );
        const resetButton = screen.getByText('Resetar Lista');
        fireEvent.click(resetButton);
        expect(screen.getByTestId('pokemon-count')).toHaveTextContent('10'); //Exemplo. Verifique o estado
    });

    it('should handle type filter selection', () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <MainPage />
                </ThemeContextProvider>
            </MemoryRouter>
        );
        const typeSelect = screen.getByTestId('type-select');
        fireEvent.change(typeSelect, { target: { value: mockedPokemonTypes[0] } });
        expect(screen.getByTestId('selected-type')).toHaveTextContent(mockedPokemonTypes[0]); //Exemplo. Verifique o estado

    });
});

