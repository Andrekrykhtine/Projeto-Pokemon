import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from './index';
import { ThemeContext } from '../../contexts/ThemeContext'; // Importe o contexto
import { ThemeContextProvider } from '../../contexts/ThemeContextProvider'; // Importe o provider
import { MemoryRouter } from 'react-router-dom';
import { mockedPokemonList, mockedPokemonData } from './mocks'; // Arquivo de mocks

jest.mock('../../Componets/MainPage/ListPokemon/ListPokemon', () => ({
    __esModule: true,
    default: ({ pokemonIds, setPokemonIds, allPokemonData, setAllPokemonData, limitReached, setLimitReached, selectedType }) => (
        <div data-testid="list-pokemon">
            {/* Simula a renderização da lista de Pokemons */}
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
            {/* Simula o filtro */}
            <select data-testid="type-select" onChange={onSelectType}>
                {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>
    ),
}));


describe('MainPage', () => {
    it('should render the main page components', () => {
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

    it('should handle button clicks correctly', () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <MainPage />
                </ThemeContextProvider>
            </MemoryRouter>
        );
        const loadMoreButton = screen.getByText('Carregar mais...');
        fireEvent.click(loadMoreButton);
        //Verificar se a lista foi atualizada aqui (Verificar usando os mocks, por exemplo)
    });

    it('should handle reset button correctly', () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <MainPage />
                </ThemeContextProvider>
            </MemoryRouter>
        );
        const resetButton = screen.getByText('Resetar Lista');
        fireEvent.click(resetButton);
        //Verificar se a lista foi resetada aqui (Verificar usando os mocks, por exemplo)
    });

    it('should handle type filter correctly', () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <MainPage />
                </ThemeContextProvider>
            </MemoryRouter>
        );
        const typeSelect = screen.getByTestId('type-select');
        fireEvent.change(typeSelect, { target: { value: 'fire' } }); // Exemplo de um tipo
        //Verificar se o filtro foi aplicado corretamente (Verificar usando os mocks, por exemplo)
    });

    //Adicione mais testes conforme necessário

});

