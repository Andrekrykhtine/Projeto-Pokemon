import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, BackButton } from './style';
import { fetchPokemonData } from '../../services/utils';
import NavigationButtons from '../../Componets/PokemonProperties/NavigationButtons/NavigationButtons';
import PokemonDetails from '../../Componets/PokemonProperties/PokemonDetails/PokemonDetails';
import { TbPokeball } from 'react-icons/tb';
import { ThemeTogglerButton } from '../../Componets/themeTogglerButton/themeTogglerButton';
import { ThemeContext } from '../../styles/Theme';

const PokemonProperties = () => {
  const { id: pokemonId } = useParams();
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  const fetchPokemonDataById = async (id) => {
    try {
      const data = await fetchPokemonData(id);
      if (!data) throw new Error('Pokémon não encontrado');
      return data;
    } catch (err) {
      setError(err.message || 'Erro desconhecido');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonDataById(pokemonId);
      setPokemonData(data);
    };
    fetchData();
  }, [pokemonId]);

  const handleNext = () => {
    const nextId = parseInt(pokemonId, 10) + 1;
    if (nextId <= 700) {
      navigate(`/pokemon/${nextId}`);
    }
  };

  const handlePrevious = () => {
    const previousId = parseInt(pokemonId, 10) - 1;
    if (previousId >= 1) {
      navigate(`/pokemon/${previousId}`);
    }
  };

  const handleBackToMainPage = () => {
    navigate('/');
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <div data-testid="error-message">Erro: {error}</div>;
  if (!pokemonData) return <p>Pokémon não encontrado</p>;

  return (
    <Container theme={theme}>
      <ThemeTogglerButton />
      <BackButton data-testid="home-button" onClick={handleBackToMainPage}>
        HOME <TbPokeball />
      </BackButton>
      <NavigationButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        isPreviousDisabled={parseInt(pokemonId, 10) === 1}
        isNextDisabled={parseInt(pokemonId, 10) === 700}
      />
      {pokemonData && <PokemonDetails pokemon={pokemonData} />}
    </Container>
  );
};

export default PokemonProperties;