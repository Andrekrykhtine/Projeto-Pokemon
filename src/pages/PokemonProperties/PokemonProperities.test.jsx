import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonProperties from './PokemonProperities';
import { fetchPokemonData } from '../../services/utils';

jest.mock('../../services/utils');

describe('PokemonProperties', () => {
    const mockPokemonData = {
        id: 1,
        name: 'bulbasaur',
        // Add other necessary properties for the mock data
    };

    beforeEach(() => {
        fetchPokemonData.mockResolvedValue(mockPokemonData);
    });

    test('renders loading state initially', () => {
        render(
            <MemoryRouter initialEntries={['/pokemon/1']}>
                <Routes>
                    <Route path="/pokemon/:id" element={<PokemonProperties />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
    });

    test('renders pokemon details after loading', async () => {
        render(
            <MemoryRouter initialEntries={['/pokemon/1']}>
                <Routes>
                    <Route path="/pokemon/:id" element={<PokemonProperties />} />
                </Routes>
            </MemoryRouter>
        );
        expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
    });

    test('handles navigation to next pokemon', async () => {
        render(
            <MemoryRouter initialEntries={['/pokemon/1']}>
                <Routes>
                    <Route path="/pokemon/:id" element={<PokemonProperties />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(await screen.findByText(/Próximo/i));
        expect(fetchPokemonData).toHaveBeenCalledWith('2');
    });

    test('handles navigation to previous pokemon', async () => {
        render(
            <MemoryRouter initialEntries={['/pokemon/2']}>
                <Routes>
                    <Route path="/pokemon/:id" element={<PokemonProperties />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(await screen.findByText(/Anterior/i));
        expect(fetchPokemonData).toHaveBeenCalledWith('1');
    });

    test('handles back to main page', async () => {
        render(
            <MemoryRouter initialEntries={['/pokemon/1']}>
                <Routes>
                    <Route path="/pokemon/:id" element={<PokemonProperties />} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(await screen.findByText(/Voltar para a Página Principal/i));
        expect(screen.getByText(/Página Principal/i)).toBeInTheDocument();
    });
});