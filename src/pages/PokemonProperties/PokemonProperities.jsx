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
  const [pokemonData, setPokemonData] = useState({ current: null, next: null, previous: null });
  const [loading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  const fetchPokemonDataById = async (id) => {
    try {
      const data = await fetchPokemonData(id);
      return data;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };


  useEffect(() => {
    const fetchCurrentPokemon = async () => {
      const currentPokemon = await fetchPokemonDataById(id);
      setPokemonData({ current: currentPokemon, next: null, previous: null });
    };
    fetchCurrentPokemon();
  }, [id]);


  const handleNext = async () => {
    const nextId = parseInt(id) + 1;
    if (nextId <= 700) {
      navigate(`/pokemon/${nextId}`);
    }
  };

  const handlePrevious = async () => {
    const previousId = parseInt(id) - 1;
    if (previousId >= 1) {
      navigate(`/pokemon/${previousId}`);
    }
  };

  const handleBackToMainPage = () => {
    navigate('/');
  };

  if (loading && !pokemonData.current) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!pokemonData.current) return <p>Pokémon não encontrado</p>;


  return (
    <Container theme={theme}>
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
