import styled from 'styled-components';

export const ImagePokemon = styled.img`
width: 90px;
height: 90px;
`;
export const Card = styled.div`
  text-decoration: none;
  color: black;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: transform 0.2s;
  font-size: 0.6rem;
  width: 105px;

  &:hover {
    transform: scale(1.05);
  }
`;

