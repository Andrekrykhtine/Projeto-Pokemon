// PokemonProperties.js
import { useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, BackButton } from './style';
import { fetchPokemonData } from '../../services/utils';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import PokemonDetails from '../PokemonDetails/PokemonDetails';
import { TbPokeball } from "react-icons/tb";
import { ThemeTogglerButton } from '../themeTogglerButton/themeTogglerButton';
import { ThemeContext } from '../../contexts/ThemeContext';


const PokemonProperties = () => {
  const { id } = useParams(); // Pegando o ID da URL
  const navigate = useNavigate(); // Para navegar entre os Pokémons
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonData(id);
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  const handleBackToMainPage = () => {
    navigate('/'); // Redireciona para a página principal
  };

  if (loading) return <p>Carregando...</p>;
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

      <PokemonDetails pokemon={pokemon} />
    </Container>
  );
};



export default PokemonProperties;