import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, BackButton } from './style';
import { fetchPokemonData } from '../../services/utils';
import NavigationButtons from '../../Componets/PokemonProperties/NavigationButtons/NavigationButtons';
import PokemonDetails from '../../Componets/PokemonProperties/PokemonDetails/PokemonDetails';
import { TbPokeball } from 'react-icons/tb';
import { ThemeTogglerButton } from '../../Componets/themeTogglerButton/themeTogglerButton';
import { ThemeContext } from '../../contexts/ThemeContext';

const PokemonProperties = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState({
    current: null,
    next: null,
    previous: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  const fetchMultiplePokemonData = async (id) => {
    try {
      setLoading(true);

      const current = await fetchPokemonData(id);
      const next = parseInt(id) + 1 <= 700 ? await fetchPokemonData(parseInt(id) + 1) : null;
      const previous = parseInt(id) - 1 >= 1 ? await fetchPokemonData(parseInt(id) - 1) : null;

      setPokemonData({ current, next, previous });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMultiplePokemonData(id);
  }, [id]);

  const handleNext = () => {
    const nextId = parseInt(id) + 1;
    if (nextId <= 700) {
      if (pokemonData.next) {
        navigate(`/pokemon/${nextId}`);
      } else {
        fetchMultiplePokemonData(nextId).then(() => navigate(`/pokemon/${nextId}`));
      }
    }
  };

  const handlePrevious = () => {
    const previousId = parseInt(id) - 1;
    if (previousId >= 1) {
      if (pokemonData.previous) {
        navigate(`/pokemon/${previousId}`);
      } else {
        fetchMultiplePokemonData(previousId).then(() => navigate(`/pokemon/${previousId}`));
      }
    }
  };

  const handleBackToMainPage = () => {
    navigate('/');
  };

  if (loading && !pokemonData.current) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <Container style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
      <ThemeTogglerButton />
      <BackButton onClick={handleBackToMainPage}>HOME <TbPokeball /></BackButton>

      <NavigationButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        isPreviousDisabled={parseInt(id) === 1}
        isNextDisabled={parseInt(id) === 700}
      />

      {pokemonData.current && <PokemonDetails pokemon={pokemonData.current} />}
    </Container>
  );
};

export default PokemonProperties;