import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import PokemonProperties from '../pages/PokemonProperties/PokemonProperities';
import { fetchPokemonData } from '../services/utils';
import { mockedPokemonData } from './mocks';
import { useNavigate, useParams } from 'react-router-dom';

const mockUseNavigate = vi.fn();
const mockUseParams = () => ({ pokemonId: '1' });

vi.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
    useParams: mockUseParams,
}));

vi.mock('../services/utils', () => ({
    fetchPokemonData: vi.fn(() => Promise.resolve(mockedPokemonData)),
}));

vi.mock('../../Componets/PokemonProperties/NavigationButtons/NavigationButtons', () => ({
    __esModule: true,
    default: ({ onPrevious, onNext, isPreviousDisabled, isNextDisabled }) => (
        <div data-testid="navigation-buttons">
            <button data-testid="previous-button" onClick={onPrevious} disabled={isPreviousDisabled}>Previous</button>
            <button data-testid="next-button" onClick={onNext} disabled={isNextDisabled}>Next</button>
        </div>
    ),
}));

vi.mock('../../Componets/PokemonProperties/NavigationButtons/NavigationButtons', () => ({
    __esModule: true,
    default: ({ onPrevious, onNext, isPreviousDisabled, isNextDisabled }) => (
        <div data-testid="navigation-buttons">
            <button data-testid="previous-button" onClick={onPrevious} disabled={isPreviousDisabled}>Previous</button>
            <button data-testid="next-button" onClick={onNext} disabled={isNextDisabled}>Next</button>
        </div>
    ),
}));

vi.mock('../../Componets/PokemonProperties/PokemonDetails/PokemonDetails', () => ({
    __esModule: true,
    default: ({ pokemon }) => (
        <div data-testid="pokemon-details">
            <p data-testid="pokemon-name">{pokemon?.name || 'Nome não encontrado'}</p>
            <img data-testid="pokemon-image" src={pokemon?.sprites?.other?.["official-artwork"]?.front_default || ''} alt={pokemon?.name || ''} />
        </div>
    ),
}));

vi.mock('../../Componets/themeTogglerButton/themeTogglerButton', () => ({
    __esModule: true,
    default: () => <button data-testid="theme-toggler" />,
}));

describe('PokemonProperties', () => {
    beforeEach(() => {
        fetchPokemonData.mockResolvedValue(mockedPokemonData);
    });

    it('should render loading indicator initially', async () => {
        fetchPokemonData.mockResolvedValueOnce(null);
        render(<PokemonProperties />);
        expect(await screen.findByText('Carregando...')).toBeInTheDocument();
    });

    it('should render PokemonDetails when data is fetched', async () => {
        render(<PokemonProperties />);
        expect(await screen.findByTestId('pokemon-details')).toBeInTheDocument();
        expect(screen.getByTestId('pokemon-name')).toHaveTextContent(mockedPokemonData.name);
    });

    it('should render error message if data fetching fails', async () => {
        fetchPokemonData.mockRejectedValue(new Error('Failed to fetch data'));
        render(<PokemonProperties />);
        expect(await screen.findByText(/Erro:/i)).toBeInTheDocument();
    });

    it('should render navigation buttons', () => {
        render(<PokemonProperties />);
        expect(screen.getByTestId('navigation-buttons')).toBeInTheDocument();
    });

    it('should render theme toggler button', () => {
        render(<PokemonProperties />);
        expect(screen.getByTestId('theme-toggler')).toBeInTheDocument();
    });

    it('should call handlePrevious when previous button is clicked', () => {
        render(<PokemonProperties />);
        fireEvent.click(screen.getByTestId('previous-button'));
        expect(mockUseNavigate).toHaveBeenCalledWith('/pokemon/1');
    });

    it('should call handleNext when next button is clicked', () => {
        render(<PokemonProperties />);
        fireEvent.click(screen.getByTestId('next-button'));
        expect(mockUseNavigate).toHaveBeenCalledWith('/pokemon/2');
    });

    it('should handle back button click', () => {
        const navigate = vi.fn();
        vi.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useParams: () => ({ pokemonId: '1' }),
            useNavigate: () => navigate,
        }));
        render(<PokemonProperties />);
        fireEvent.click(screen.getByText('HOME'));
        expect(navigate).toHaveBeenCalledWith('/');
    });
});
