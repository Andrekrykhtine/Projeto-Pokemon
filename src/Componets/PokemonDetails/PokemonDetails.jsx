import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pokemonTypes } from '../../services/pokemonTypes';

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) return null;

  const getTypeIcon = (typeName) => {
    const type = pokemonTypes.find((type) => type.name === typeName);
    return type ? type.icon : ''; // Retorna o ícone ou uma string vazia se não encontrado
  };

  return (
    <StyledContainer>
      <h1>{pokemon.name.toUpperCase()}</h1>
      <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />

      <h2>Tipo:</h2>
      <ul>
        {pokemon.types.map((typeInfo) => (
          <li key={typeInfo.type.name}>
            {getTypeIcon(typeInfo.type.name)} {typeInfo.type.name}
          </li>
        ))}
      </ul>

      <h2>Movimentos:</h2>
      <ul>
        {pokemon.moves.slice(0, 10).map((moveInfo) => (
          <li key={moveInfo.move.name}>{moveInfo.move.name}</li>
        ))}
      </ul>
      
      <h2>Habilidades:</h2>
      <ul>
        {pokemon.abilities.slice(0, 10).map((abilitiesInfo) => (
          <li key={abilitiesInfo.ability.name}>{abilitiesInfo.ability.name}</li>
        ))}
      </ul>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
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
        name: PropTypes.string.isRequired,
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
