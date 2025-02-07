import { useState } from 'react';
import { useQuery } from 'react-query';
import { ListCard, Card, ImagePokemon } from '../ListPokemon/style';

const getId = (quantity, min, max) => {
    if (quantity > (max - min + 1)) {
        throw new Error("The requested quantity of numbers is greater than the available range.");
    }

    const drawnNumbers = new Set();

    while (drawnNumbers.size < quantity) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        drawnNumbers.add(randomNumber);
    }

    return Array.from(drawnNumbers);
}

// Função para buscar dados de um Pokémon
const fetchPokemonData = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export default function ButtonExample() {
    const [pokemonIds, setPokemonIds] = useState([]);
    const [allPokemonData, setAllPokemonData] = useState([]); // Estado para acumular os dados dos Pokémon

    const handleClick = () => {
        // Gera novos IDs únicos
        const uniqueNumbers = getId(10, 1, 700);
        setPokemonIds(uniqueNumbers);
    };

    // Busca os dados dos Pokémon usando React Query
    const { isLoading, isError, error } = useQuery(
        ['pokemons', pokemonIds],
        async () => {
            const newData = await Promise.all(
                pokemonIds.map(id => fetchPokemonData(id))
            );

            // Filtra os Pokémon que já estão na lista
            const filteredData = newData.filter(
                (newPokemon) => !allPokemonData.some((existingPokemon) => existingPokemon.id === newPokemon.id)
            );

            // Adiciona apenas os Pokémon que não estão duplicados
            setAllPokemonData((prevData) => [...prevData, ...filteredData]);
            return filteredData;
        },
        {
            enabled: pokemonIds.length > 0, // Só executa a query se houver IDs
            refetchOnWindowFocus: false, // Evita refetch quando a janela ganha foco
        }
    );

    // Estados de carregamento e erro
    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Erro: {error.message}</p>;

    return (
        <section>
            <ul>
                {allPokemonData?.map((pokemon, index) => (
                    <ListCard key={index}>
                        <Card>
                            <ImagePokemon
                                src={pokemon.sprites.other["official-artwork"].front_default}
                                alt={`Imagem do ${pokemon.name}`}
                            />
                            <p>{pokemon.name}</p>
                        </Card>
                    </ListCard>
                ))}
            </ul>
            <button
                onClick={handleClick}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
               Carregue mais
            </button>
        </section>
    );
}