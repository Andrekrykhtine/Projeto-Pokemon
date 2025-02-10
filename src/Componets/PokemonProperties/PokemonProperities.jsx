import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import PokemonFetcher from '../PokemonFatcher';


const PokemonProperties = () => {
    const { id } = useParams(); // Pegando o ID da URL
    const navigate = useNavigate(); // Para navegar entre os Pokémons
    const [pokemon, setPokemon] = useState(null);

    const handleNext = () => {
        const nextId = parseInt(id) + 1;
        if (nextId <= 700) {
            navigate(`/pokemon/${nextId}`);
        }
    };

    const handlePrevious = () => {
        const previousId = parseInt(id) - 1;
        if (previousId >= 1) {
            navigate(`/pokemon/${previousId}`);
        }
    };

    return (
        <Container>
            <Navigation>
                <ArrowButton onClick={handlePrevious} disabled={parseInt(id) === 1}>
                    ← Anterior
                </ArrowButton>
                <ArrowButton onClick={handleNext} disabled={parseInt(id) === 700}>
                    Próximo →
                </ArrowButton>
            </Navigation>

            <PokemonFetcher
                id={id}
                onDataFetched={(data) => setPokemon(data)}
            />

            {pokemon && (
                <>
                    <h1>{pokemon.name.toUpperCase()}</h1>
                    <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
                    <h2>Tipo:</h2>
                    <ul>
                        {pokemon.types.map((typeInfo) => (
                            <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
                        ))}
                    </ul>
                    <h2>Movimentos:</h2>
                    <ul>
                        {pokemon.moves.slice(0, 10).map((moveInfo) => (
                            <li key={moveInfo.move.name}>{moveInfo.move.name}</li>
                        ))}
                    </ul>
                </>
            )}
        </Container>
    );
};

const Container = styled.div`
  text-align: center;
  padding: 20px;

  img {
    width: 200px;
    height: 200px;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 5px 0;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ArrowButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007bff')};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#0056b3')};
  }
`;

export default PokemonProperties;