import { render, screen, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListPokemon from './ListPokemon';
import { ThemeContext } from '../../contexts/ThemeContext';
import { expect } from "@jest/globals";
import { MemoryRouter } from 'react-router-dom';


const queryClient = new QueryClient();

const mockSetPokemonIds = jest.fn();
const mockSetAllPokemonData = jest.fn();
const mockSetLimitReached = jest.fn();

const mockTheme = {
    backgroundColor: 'white',
    color: 'black',
};

const mockSetSelectedType = jest.fn();

test('renders loading spinner when loading', async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <ThemeContext.Provider value={{ theme: mockTheme }}>
            <ListPokemon setSelectedType={jest.fn()} />
          </ThemeContext.Provider>
        </QueryClientProvider>
      );
    });
  
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });


describe('ListPokemon Component', () => {
   
test('renders loading spinner when loading', async () => {
    const mockPokemonData = [
      { 
        id: 1, 
        name: 'Bulbasaur', 
        type: 'Grass',
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
            }
          }
        }
      },
      { 
        id: 4, 
        name: 'Charmander', 
        type: 'Fire',
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
            }
          }
        }
      }
    ];
  
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <ThemeContext.Provider value={{ theme: mockTheme }}>
            <MemoryRouter> {/* Envolvendo o componente com MemoryRouter */}
              <ListPokemon 
                setSelectedType={jest.fn()} 
                pokemonIds={[1, 4]} 
                setPokemonIds={jest.fn()} 
                allPokemonData={mockPokemonData} 
              />
            </MemoryRouter>
          </ThemeContext.Provider>
        </QueryClientProvider>
      );
    });
  
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
      
      

    test('renders no pokemon message when no pokemon found for selected type', () => {
        renderComponent({
            pokemonIds: [1, 2, 3],
            setPokemonIds: mockSetPokemonIds,
            allPokemonData: [],
            setAllPokemonData: mockSetAllPokemonData,
            limitReached: false,
            setLimitReached: mockSetLimitReached,
            selectedType: 'fire',
        });

        expect(screen.getByText('Nenhum Pokémon encontrado desse tipo.')).toBeInTheDocument();
    });

    test('renders limit reached message when limit is reached', async () => {
        await act(async () => {
          render(
            <QueryClientProvider client={queryClient}>
              <ThemeContext.Provider value={{ theme: mockTheme }}>
                <ListPokemon setSelectedType={jest.fn()} />
              </ThemeContext.Provider>
            </QueryClientProvider>
          );
        });
      
        expect(screen.getByText('Limite de 100 Pokémon atingido!')).toBeInTheDocument();
      });
});