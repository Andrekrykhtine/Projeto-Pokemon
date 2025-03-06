import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PokemonCard from '../Componets/MainPage/PokemonCard/PokemonCard';    
import { vi, describe, it, expect } from 'vitest';

describe('PokemonCard', () => {
    const mockPokemon = {
        id: 1,
        name: 'bulbasaur',
        sprites: {
            other: {
                'official-artwork': {
                    front_default: 'mocked_url',
                },
            },
        },
    };

    const mockPokemonWithoutSprite = { id: 2, name: 'ivysaur' };
    const mockPokemonEmptyName = { id: 3, name: '', sprites: { other: { 'official-artwork': { front_default: 'mocked_url' } } } };
    const mockPokemonSpecialChars = { id: 4, name: 'pikachu!@#$%^&*()', sprites: { other: { 'official-artwork': { front_default: 'mocked_url' } } } };
    const mockPokemonLongName = { id: 5, name: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz', sprites: { other: { 'official-artwork': { front_default: 'mocked_url' } } } };

    it('should render the PokemonCard component', () => {
        render(
            <MemoryRouter>
                <PokemonCard pokemon={mockPokemon} />
            </MemoryRouter>
        );
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    it('should have a link to the correct Pokemon page', () => {
        render(
            <MemoryRouter>
                <PokemonCard pokemon={mockPokemon} />
            </MemoryRouter>
        );
        const linkElement = screen.getByRole('link');
        expect(linkElement).toHaveAttribute('href', '/pokemon/1');
    });

    it('should render the ImagePokemon component if the sprite exists', () => {
        render(
            <MemoryRouter>
                <PokemonCard pokemon={mockPokemon} />
            </MemoryRouter>
        );
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'mocked_url');
        expect(image).toHaveAttribute('alt', 'Imagem do bulbasaur');
    });

    it('should not render the ImagePokemon component if the sprite does not exist', () => {
        render(
            <MemoryRouter>
                <PokemonCard pokemon={mockPokemonWithoutSprite} />
            </MemoryRouter>
        );
        const image = screen.queryByRole('img');
        expect(image).not.toBeInTheDocument();
    });

    it('should render the correct name even if it is empty', () => {
        render(
            <MemoryRouter>
                <PokemonCard pokemon={mockPokemonEmptyName} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    });
    

    it('should render the correct name with special characters', () => {
        render(
            <MemoryRouter>
                <PokemonCard pokemon={mockPokemonSpecialChars} />
            </MemoryRouter>
        );
        expect(screen.getByText('pikachu!@#$%^&*()')).toBeInTheDocument();
    });

    it('should render the correct name even if it is very long', () => {
        render(
            <MemoryRouter>
                <PokemonCard pokemon={mockPokemonLongName} />
            </MemoryRouter>
        );
        expect(screen.getByText('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz')).toBeInTheDocument();
    });

    it('should pass additional props to the Card component', () => {
        render(
            <MemoryRouter>
                <PokemonCard pokemon={mockPokemon} className="test-class" /> {/* Passando className */}
            </MemoryRouter>
        );
        const card = screen.getByTestId('pokemon-card');
        expect(card).toHaveClass('test-class'); // Verifica a classe
    });

    it('should show propTypes warning if the prop is incorrect', () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
        render(<MemoryRouter><PokemonCard /></MemoryRouter>);
        expect(warnSpy).toHaveBeenCalled();
        warnSpy.mockRestore();
    });
    it('should show propTypes error if the prop pokemon is invalid', () => {
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        const invalidPokemon = {id: '1', name: 1, sprites: {other: { 'official-artwork': { front_default: 1 } }}}
        render(<MemoryRouter><PokemonCard pokemon={invalidPokemon} /></MemoryRouter>);
        expect(errorSpy).toHaveBeenCalled();
        errorSpy.mockRestore();
    });

});
