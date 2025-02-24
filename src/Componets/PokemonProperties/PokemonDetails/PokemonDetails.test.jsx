import { render } from '@testing-library/react';
import PokemonDetails from './PokemonDetails';
import { pokemonTypes } from '../../services/pokemonTypes';

describe('PokemonDetails Component', () => {
    const mockPokemon = {
        name: 'pikachu',
        sprites: {
            other: {
                'official-artwork': {
                    front_default: 'https://example.com/pikachu.png',
                },
            },
        },
        types: [
            { type: { name: 'electric' } },
        ],
        abilities: [
            { ability: { name: 'static' } },
            { ability: { name: 'lightning-rod' } },
        ],
        moves: [
            { move: { name: 'thunder-shock' } },
            { move: { name: 'quick-attack' } },
            { move: { name: 'iron-tail' } },
            { move: { name: 'electro-ball' } },
            { move: { name: 'volt-tackle' } },
        ],
    };

    it('renders without crashing', () => {
        const { container } = render(<PokemonDetails pokemon={mockPokemon} />);
        expect(container).toBeInTheDocument();
    });

    it('displays the correct pokemon name', () => {
        const { getByText } = render(<PokemonDetails pokemon={mockPokemon} />);
        expect(getByText('PIKACHU')).toBeInTheDocument();
    });

    it('displays the correct pokemon image', () => {
        const { getByAltText } = render(<PokemonDetails pokemon={mockPokemon} />);
        const img = getByAltText('pikachu');
        expect(img).toHaveAttribute('src', 'https://example.com/pikachu.png');
    });

    it('displays the correct pokemon types', () => {
        const { getByText } = render(<PokemonDetails pokemon={mockPokemon} />);
        const electricType = getByText((content, element) => {
            return content.includes('electric');
        });
    
        expect(electricType).toBeInTheDocument();
    });

    it('displays the correct pokemon abilities', () => {
        const { getByText } = render(<PokemonDetails pokemon={mockPokemon} />);
        expect(getByText('static')).toBeInTheDocument();
        expect(getByText('lightning-rod')).toBeInTheDocument();
    });

    it('displays the correct pokemon moves', () => {
        const { getByText } = render(<PokemonDetails pokemon={mockPokemon} />);
        expect(getByText('thunder-shock')).toBeInTheDocument();
        expect(getByText('quick-attack')).toBeInTheDocument();
        expect(getByText('iron-tail')).toBeInTheDocument();
        expect(getByText('electro-ball')).toBeInTheDocument();
        expect(getByText('volt-tackle')).toBeInTheDocument();
    });

    it('applies the correct background color based on primary type', () => {
        const { container } = render(<PokemonDetails pokemon={mockPokemon} />);
        const primaryType = mockPokemon.types[0].type.name;
        const typeColor = pokemonTypes.find((type) => type.name === primaryType)?.color || '#ccc';
        expect(container.firstChild).toHaveStyle(`background-color: ${typeColor}`);
    });
});