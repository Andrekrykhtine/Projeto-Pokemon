import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { ListCard, Card, ImagePokemon,LimitReached ,ListContainer } from './style';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

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

const fetchPokemonData = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export default function ButtonExample() {
    const [pokemonIds, setPokemonIds] = useState([]);
    const [allPokemonData, setAllPokemonData] = useState([]);
    const [limitReached, setLimitReached] = useState(false);

    // Initialize with 10 Pokémon when component first loads
    useEffect(() => {
        const initialIds = getId(10, 1, 700);
        setPokemonIds(initialIds);
    }, []);

    const handleClick = () => {
        if (allPokemonData.length >= 100) {
            setLimitReached(true);
            return;
        }

        const uniqueNumbers = getId(10, 1, 700);
        setPokemonIds(uniqueNumbers);
        setLimitReached(false);
    };

    const handleReset = () => {
        // Reset to 10 new Pokémon when reset is clicked
        const resetIds = getId(10, 1, 700);
        setPokemonIds(resetIds);
        setAllPokemonData([]);
        setLimitReached(false);
    };

    const { isLoading, isError, error } = useQuery(
        ['pokemons', pokemonIds],
        async () => {
            const newData = await Promise.all(
                pokemonIds.map(id => fetchPokemonData(id))
            );

            const filteredData = newData.filter(
                (newPokemon) => !allPokemonData.some((existingPokemon) => existingPokemon.id === newPokemon.id)
            );

            setAllPokemonData((prevData) => {
                const updatedData = [...prevData, ...filteredData];

                if (updatedData.length >= 100) {
                    setLimitReached(true);
                }

                return updatedData;
            });

            return filteredData;
        },
        {
            enabled: pokemonIds.length > 0,
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) return <p>Carregando...</p>;
    if (isError) return <p>Erro: {error.message}</p>;

    return (
        <section>
            <ListContainer>
                {allPokemonData?.map((pokemon, index) => (
                    <ListCard key={index}>
                     <Card as={Link} to={`/pokemon/${pokemon.id}`}>
                            <ImagePokemon
                                src={pokemon.sprites.other["official-artwork"].front_default}
                                alt={`Imagem do ${pokemon.name}`}
                            />
                            <p>{pokemon.name}</p>
                        </Card>
                    </ListCard>
                ))}
            </ListContainer>

            {limitReached && (
                <LimitReached >
                    Limite de 100 Pokémon atingido!
                </LimitReached>
            )}

            <Button
                onClick={handleClick}
                disabled={limitReached}
            >
                Clique em mim
            </Button>

            <Button
                onClick={handleReset}         
            >
                Resetar Lista
            </Button>
        </section>
    );
}