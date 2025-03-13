import PropTypes from 'prop-types';
import { StyledCard, StyledHeader, StyledSection } from './style';
import { pokemonTypes } from '../../../services/pokemonTypes';

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) return <div data-testid="loading">Carregando...</div>;

  const hasRequiredData = pokemon.sprites?.other?.["official-artwork"]?.front_default;
  
  if (!hasRequiredData) return <div data-testid="error">Dados incompletos</div>;

  const primaryType = pokemon.types?.[0]?.type?.name || 'normal';
  const typeColor = pokemonTypes.find(type => type.name === primaryType)?.color || '#ccc';

  return (
    <StyledCard style={{ backgroundColor: typeColor }}>
      <StyledHeader>
        <h1>{pokemon.name.toUpperCase()}</h1>
        <img 
          src={pokemon.sprites.other["official-artwork"].front_default} 
          alt={pokemon.name}
          data-testid="pokemon-image"
        />
      </StyledHeader>

      <StyledSection>
        <h2>Tipo:</h2>
        <ul>
          {pokemon.types?.map(typeInfo => (
            <li key={typeInfo.type.name}>
              {typeInfo.type.name}
            </li>
          ))}
        </ul>
      </StyledSection>

      <StyledSection>
        <h2>Movimentos:</h2>
        <ul>
          {pokemon.moves?.slice(0, 5).map(moveInfo => (
            <li key={moveInfo.move.name}>{moveInfo.move.name}</li>
          ))}
        </ul>
      </StyledSection>

      <StyledSection>
        <h2>Habilidades:</h2>
        <ul>
          {pokemon.abilities?.slice(0, 3).map(abilityInfo => (
            <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
          ))}
        </ul>
      </StyledSection>
    </StyledCard>
  );
};

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
      })
    ),
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ),
    moves: PropTypes.arrayOf(
      PropTypes.shape({
        move: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ),
  }),
};

export default PokemonDetails;