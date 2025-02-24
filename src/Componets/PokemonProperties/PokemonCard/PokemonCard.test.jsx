import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PokemonCard from './PokemonCard';

describe('PokemonCard', () => {
    const mockPokemon = {
        id: 1,
        name: 'Bulbasaur',
        sprites: {
            other: {
                'official-artwork': {
                    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
                },
            },
        },
    };

    it('should render the PokemonCard component', () => {
        const { getByText, getByAltText } = render(
            <Router>
                <PokemonCard pokemon={mockPokemon} />
            </Router>
        );

        expect(getByText('Bulbasaur')).toBeInTheDocument();
        expect(getByAltText('Imagem do Bulbasaur')).toBeInTheDocument();
    });

    it('should have a link to the correct Pokemon page', () => {
        const { container } = render(
            <Router>
                <PokemonCard pokemon={mockPokemon} />
            </Router>
        );

        const link = container.querySelector('a');
        expect(link).toHaveAttribute('href', '/pokemon/1');
    });
});