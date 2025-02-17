import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pokemonTypes } from '../../services/pokemonTypes';

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) return null;

  // Função para encontrar o ícone com base no nome do tipo
  const getTypeIcon = (typeName) => {
    const type = pokemonTypes.find((type) => type.name === typeName);
    return type ? type.icon : ''; // Retorna o ícone ou uma string vazia se não encontrado
  };

  // Obtém o primeiro tipo do Pokémon para definir a cor de fundo do card
  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = pokemonTypes.find((type) => type.name === primaryType)?.color || '#ccc';

  return (
    <StyledCard style={{ backgroundColor: typeColor }}>
      <StyledHeader>
        <h1>{pokemon.name.toUpperCase()}</h1>
        <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
      </StyledHeader>

      <StyledSection>
        <h2>Tipo:</h2>
        <ul>
          {pokemon.types.map((typeInfo) => (
            <li key={typeInfo.type.name}>
              {getTypeIcon(typeInfo.type.name)} {typeInfo.type.name}
            </li>
          ))}
        </ul>
      </StyledSection>

      <StyledSection>
        <h2>Movimentos:</h2>
        <ul>
          {pokemon.moves.slice(0, 5).map((moveInfo) => (
            <li key={moveInfo.move.name}>{moveInfo.move.name}</li>
          ))}
        </ul>
      </StyledSection>

      <StyledSection>
        <h2>Habilidades:</h2>
        <ul>
          {pokemon.abilities.slice(0, 3).map((abilitiesInfo) => (
            <li key={abilitiesInfo.ability.name}>{abilitiesInfo.ability.name}</li>
          ))}
        </ul>
      </StyledSection>
    </StyledCard>
  );
};

// Estilização do Card
const StyledCard = styled.div`
  text-align: center;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9; /* Cor padrão */
  color: #fff; /* Texto branco para contraste */
  max-width: 400px;
  margin: 0 auto;

  h1 {
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: #fff;
  }

  img {
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledSection = styled.div`
  margin-top: 15px;

  h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #fff;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 5px 0;
    font-size: 1rem;
    color: #fff;
  }
`;

PokemonDetails.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sprites: PropTypes.shape({
      other: PropTypes.shape({
        "official-artwork": PropTypes.shape({
          front_default: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
    moves: PropTypes.arrayOf(
      PropTypes.shape({
        move: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

export default PokemonDetails;
