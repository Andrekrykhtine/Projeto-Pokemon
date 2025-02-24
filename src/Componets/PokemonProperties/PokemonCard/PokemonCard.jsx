import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Card, ImagePokemon } from './style'

const PokemonCard = ({ pokemon }) => {
  return (
    <Card as={Link} to={`/pokemon/${pokemon.id}`}>
      <ImagePokemon
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={`Imagem do ${pokemon.name}`}
      />
      <p>{pokemon.name}</p>
    </Card>
  );
};


PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sprites: PropTypes.shape({
      other: PropTypes.shape({
        "official-artwork": PropTypes.shape({
          front_default: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default PokemonCard;
