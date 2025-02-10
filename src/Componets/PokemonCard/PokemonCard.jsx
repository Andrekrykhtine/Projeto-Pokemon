import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const Card = styled.div`
  text-decoration: none;
  color: black;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  width: 150px;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImagePokemon = styled.img`
  width: 100px;
  height: 100px;
`;
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
