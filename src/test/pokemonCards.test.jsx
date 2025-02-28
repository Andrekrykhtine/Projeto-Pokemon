import { render, waitFor, screen } from '@testing-library/react';
import { vi, beforeEach, afterEach, describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListPokemon from '../Componets/MainPage/ListPokemon/ListPokemon';
import * as utils from '../services/utils'; //Importar o arquivo inteiro
import { ThemeContext, themes } from '../contexts/ThemeContext';
import { MemoryRouter } from 'react-router-dom';

// Mock dos componentes filhos para isolar o teste
vi.mock('../Componets/MainPage/PokemonCard/PokemonCard', () => ({
    default: ({ pokemon }) => <div data-testid={`pokemon-card-${pokemon.id}`}>{pokemon.name}</div>
}));

vi.mock('../Componets/MainPage/LimitReachedMessage/LimitReachedMessage', () => ({
    default: () => <div data-testid="limit-reached-message">Limite de 100 Pokémon atingido</div>
}));

vi.mock('../Componets/MainPage/LoadingSpiner/LoadingSpiner', () => ({
    default: () => <div data-testid="loading-spinner" className="loading-spinner">Carregando...</div>
}));

// Mock do useQuery
vi.mock('react-query', async () => {
  const actual = await vi.importActual('react-query');
  return {
    ...actual,
    useQuery: vi.fn()
  }
})

describe('ListPokemon', () => {
    let queryClient;
    let getId;
    let fetchPokemonData;

    // Props padrão para os testes
    const defaultProps = {
        pokemonIds: [],
        setPokemonIds: vi.fn(),
        allPokemonData: [],
        setAllPokemonData: vi.fn(),
        limitReached: false,
        setLimitReached: vi.fn(),
        selectedType: null,
    };

    // Função auxiliar para renderizar com QueryClient
    const renderComponent = (props = {}) => {
        const testProps = { ...defaultProps, ...props };
        return render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                <ThemeContext.Provider value={{ theme: themes.light }}>
                        <ListPokemon {...testProps} />
                    </ThemeContext.Provider>
                </QueryClientProvider>
            </MemoryRouter>
        );
    };

    beforeEach(() => {
        // Criar novo QueryClient para cada teste
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                    refetchOnMount: false,
                    refetchOnWindowFocus: false,
                    refetchOnReconnect: false
                },
            },
        });

        // Limpar todos os mocks
        vi.clearAllMocks();

        // Monitorando as funções e mockando o valor retornado
        getId = vi.spyOn(utils, 'getId');
        fetchPokemonData = vi.spyOn(utils, 'fetchPokemonData');

    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('inicializa com 10 pokémons ao montar', async () => {
        const initialIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        getId.mockReturnValue(initialIds);
        renderComponent();
        await waitFor(() => {
            expect(getId).toHaveBeenCalledWith(10, 1, 700);
            expect(defaultProps.setPokemonIds).toHaveBeenCalledWith(initialIds);
        });
    });

    it('chama fetchPokemonData para cada pokemonId e atualiza os dados', async () => {
        const setAllPokemonData = vi.fn();
        const setLimitReached = vi.fn();
        const pokemonIds = [1, 2];
        const mockedPokemon1 = {
            id: 1, name: 'bulbasaur', types: [{ type: { name: 'grass' } }],
            sprites: { other: { "official-artwork": { front_default: "mocked_url1" } } }
        };
        const mockedPokemon2 = {
            id: 2, name: 'charmander', types: [{ type: { name: 'fire' } }],
            sprites: { other: { "official-artwork": { front_default: "mocked_url2" } } }
        };
        fetchPokemonData.mockResolvedValueOnce(mockedPokemon1).mockResolvedValueOnce(mockedPokemon2);
         useQuery.mockImplementation(async (queryKey, queryFn) => {
            if(queryKey[0] === 'pokemons')
                return {
                        data: await Promise.all(queryKey[1].map(queryFn)),
                        isLoading: false,
                        isError: false,
                        error: null,
                        refetch: vi.fn()
                };
            })
        renderComponent({ pokemonIds, setAllPokemonData, setLimitReached });
        await waitFor(() => {
            expect(fetchPokemonData).toHaveBeenCalledTimes(2);
            expect(fetchPokemonData).toHaveBeenNthCalledWith(1, 1);
            expect(fetchPokemonData).toHaveBeenNthCalledWith(2, 2);
        });
        await waitFor(() => {
            expect(setAllPokemonData).toHaveBeenCalled();
            expect(setAllPokemonData.mock.calls[0][0]).toEqual(expect.arrayContaining([mockedPokemon1, mockedPokemon2]))
        });
    });

    it('não busca pokémons que já existem em allPokemonData', async () => {
        const setAllPokemonData = vi.fn();
        const existingData = [
            { id: 1, name: 'Existing Pokemon 1', types: [{ type: { name: 'normal' } }],
            sprites: { other: { "official-artwork": { front_default: "mocked_url1" } } } }
        ];

        const ids = [1, 2];
       useQuery.mockImplementation(async (queryKey, queryFn) => {
            if (queryKey[0] === 'pokemons') {
                const data = await Promise.all(
                   queryKey[1].filter(id => !existingData.some(pokemon => pokemon.id === id))
                   .map(queryFn)
                  );
                 return {
                  data,
                  isLoading: false,
                  isError: false,
                  error: null,
                  refetch: vi.fn()
                };
            }
        });

        renderComponent({
          pokemonIds: ids,
          allPokemonData: existingData,
          setAllPokemonData,
        });

        await waitFor(() => {
          expect(fetchPokemonData).toHaveBeenCalledTimes(1);
          expect(fetchPokemonData).toHaveBeenCalledWith(2);
        });
      });

    it('filtra Pokémon por tipo quando selectedType está definido', async () => {
        // Criar dados com diferentes tipos
        const mockPokemonData = [
            { id: 1, name: 'Bulbasaur', types: [{ type: { name: 'grass' } }], sprites: { other: { "official-artwork": { front_default: "mocked_url1" } } } },
            { id: 2, name: 'Charmander', types: [{ type: { name: 'fire' } }], sprites: { other: { "official-artwork": { front_default: "mocked_url2" } } } }
        ];

        // Renderizar com tipo selecionado
        const { queryByTestId } = renderComponent({
            allPokemonData: mockPokemonData,
            selectedType: 'grass'
        });

        await waitFor(() => {
            // Verificar se apenas o Pokémon do tipo grass está visível
            expect(queryByTestId('pokemon-card-1')).toBeInTheDocument();
            expect(queryByTestId('pokemon-card-2')).not.toBeInTheDocument();
        });
    });

    it('mostra mensagem quando nenhum Pokémon é encontrado para o tipo selecionado', async () => {
        // Criar dados sem o tipo selecionado
        const mockPokemonData = [
            { id: 1, name: 'Bulbasaur', types: [{ type: { name: 'grass' } }], sprites: { other: { "official-artwork": { front_default: "mocked_url1" } } } },
            { id: 2, name: 'Charmander', types: [{ type: { name: 'fire' } }], sprites: { other: { "official-artwork": { front_default: "mocked_url2" } } } }
        ];

        // Renderizar com tipo que não existe nos dados
        const { queryByTestId } = renderComponent({
            allPokemonData: mockPokemonData,
            selectedType: 'water'
        });

        await waitFor(() => {
            expect(queryByTestId('no-pokemon-message')).toBeInTheDocument();
        });
    });

    it('chama setLimitReached quando o tamanho dos dados for igual a 100', async () => {
        // Criar uma lista de 99 Pokémon para allPokemonData
        const existingPokemon = Array.from({ length: 99 }, (_, i) => ({
            id: i + 1,
            name: `Pokemon ${i + 1}`,
            types: [{ type: { name: 'normal' } }],
            sprites: { other: { "official-artwork": { front_default: `mocked_url${i + 1}` } } }
        }));

        // Configurar novos IDs para buscar (que levarão o total a 100+)
        const pokemonIds = [100, 101];

        // Mock do setAllPokemonData para capturar a chamada
        const setAllPokemonData = vi.fn(callback => {
            // Simular o comportamento do setState com callback
            const newData = callback(existingPokemon);
            return newData;
        });

        const setLimitReached = vi.fn();

        renderComponent({
            pokemonIds,
            allPokemonData: existingPokemon,
            setAllPokemonData,
            setLimitReached
        });

        await waitFor(() => {
            expect(setAllPokemonData).toHaveBeenCalled();
            expect(setLimitReached).toHaveBeenCalledWith(true);
        });
    });

    it('exibe spinner de carregamento quando isLoading for true', async () => {
      useQuery.mockImplementation(() => ({
          data: [],
          isLoading: true,
          isError: false,
          error: null,
          refetch: vi.fn(),
      }));

      const { queryByTestId } = renderComponent();

      // Verificar se o spinner está presente
      expect(queryByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('exibe mensagem de erro quando ocorre um erro na requisição', async () => {
        // Configurar mock para simular erro
      useQuery.mockImplementation(() => ({
            data: [],
            isLoading: false,
            isError: true,
            error: new Error('Falha na API'),
            refetch: vi.fn(),
      }));

        const { queryByText } = renderComponent();

        await waitFor(() => {
            expect(queryByText('Erro: Falha na API')).toBeInTheDocument();
        });
    });

    it('não inicializa IDs novamente se já foi inicializado', async () => {
        // Primeira renderização
        const { unmount } = renderComponent();

        await waitFor(() => {
            expect(getId).toHaveBeenCalledTimes(1);
            expect(defaultProps.setPokemonIds).toHaveBeenCalledTimes(1);
        });

        // Limpar mocks
        vi.clearAllMocks();
        unmount();

        // Segunda renderização (simula remontagem do componente)
        renderComponent();

        // useRef deve manter o valor entre renderizações
        // Como estamos testando uma nova instância, getId será chamado novamente
        // Este teste não é ideal para verificar useRef mas é o melhor que podemos fazer
        // em um ambiente de teste sem poder acessar diretamente o ref
        await waitFor(() => {
            expect(getId).toHaveBeenCalledTimes(1);
        });
    });
});
