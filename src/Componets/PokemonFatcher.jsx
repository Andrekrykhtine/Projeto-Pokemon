import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

const fetchPokemonData = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  if (!response.ok) {
    throw new Error('Erro ao carregar os dados do Pokémon');
  }
  return response.json();
};

const PokemonFetcher = ({ id, onDataFetched }) => {
  // Usando o hook useQuery para buscar os dados do Pokémon
  const { isLoading, error } = useQuery(['pokemon', id], () => fetchPokemonData(id), {
    onSuccess: (data) => {
      // Chama o callback onDataFetched quando os dados são carregados
      if (onDataFetched) {
        onDataFetched(data);
      }
    },
    enabled: !!id, // Garante que a query só seja executada se o ID estiver disponível
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return null; // Este componente não renderiza nada diretamente
};
PokemonFetcher.propTypes = {
  id: PropTypes.number.isRequired,
  onDataFetched: PropTypes.func,
};

export default PokemonFetcher;
