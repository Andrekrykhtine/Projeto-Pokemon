import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { ListCard,Card, ImagePokemon } from './style';

// Função para gerar IDs únicos
function getId(quantity, min, max) {
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

// Componente principal
export const ListPokemon = () => {
    const [pokemonIds, setPokemonIds] = useState([]);

    // Gera os IDs dos Pokémon quando o componente é montado
    useEffect(() => {
        const uniqueNumbers = getId(10, 1, 700);
        setPokemonIds(uniqueNumbers);
    }, []);

    // Busca os dados dos Pokémon usando React Query
    const { data, isLoading, isError, error } = useQuery(
        ['pokemons', pokemonIds],
        async () => {
            const data = await Promise.all(
                pokemonIds.map(id => fetchPokemonData(id))
            );
            return data;
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
                {data?.map((pokemon, index) => (
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
        </section>
    );
};
// atulizar com o array de pokemons 




 //para atualizar a função. Colocar novos pokemons


// inicializa a lista de pokemons

// lista: []

// montar componente
// envocando os metodos(componeteDidMount)
// pegar a lista de pokemos e atulizar o state
// //const numeroId = sortearNumeros (20, 1, 700)
// try {
//     const uniqueNumbers = getId(10, 1, 100); // Get 10 unique random numbers between 1 and 100
//     console.log("Unique numbers:", uniqueNumbers);
// } catch (error) {
//     console.error(error.message);
// }

// const dezPrimeirosId = numeroId.slice(0, 10);
// const listaPokemons = dezPrimeirosId.map(id => aqui pegar os 10 pokemons e armazenar em um array)(aqui q vou passar o id)



// atualizar o estado

// setLista pokemons
// cupular na lista 


//  Depois pegar esse array e  colocar ele na tela usando o map

//  renderizar a lista na tela

   

// }
