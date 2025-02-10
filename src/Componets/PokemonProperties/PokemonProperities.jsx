// PokemonProperties.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchPokemonData } from '../../services/utils';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import PokemonDetails from '../PokemonDetails/PokemonDetails';

const PokemonProperties = () => {
  const { id } = useParams(); // Pegando o ID da URL
  const navigate = useNavigate(); // Para navegar entre os Pokémons
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <Container>
      <BackButton onClick={handleBackToMainPage}>Voltar para a Página Principal</BackButton>
      {/* Componente de Navegação */}
      <NavigationButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        isPreviousDisabled={parseInt(id) === 1}
        isNextDisabled={parseInt(id) === 700}
      />

      {/* Componente de Detalhes do Pokémon */}
      <PokemonDetails pokemon={pokemon} />
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  padding: 20px;
  `;

const BackButton = styled.button`
  background-color: #6c757d; /* Cinza */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a6268; /* Escurece o cinza */
  }
`;

export default PokemonProperties;