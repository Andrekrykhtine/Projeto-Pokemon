import styled from "styled-components";

export const ListCard = styled.li`
display: flex;
align-items: center;    
justify-content: space-between;
`;

export const Card = styled.a`
display: flex;
align-items: center;    
justify-content: space-between;
background-color: ${(props) => props.theme.colors.container};
color: ${(props) => props.theme.colors.text};
padding: 1rem;
margin: 0.5rem;
border-radius: 0.5rem;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
transition: background-color 0.2s;
&:hover {
    background-color: ${(props) => props.theme.colors.primary};
    cursor: pointer;
};
`;

export const ImagePokemon = styled.img`
width: 100px;
height: 100px;
`; 

export const LimitReached = styled.p`
color: ${(props) => props.theme.colors.red};
font-weight: 700;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontalmente */
  justify-content: center; /* Centraliza verticalmente (opcional) */
  padding: 20px;
  min-height: 100vh; /* Garante que ocupe toda a altura da tela */
  background-color:rgb(228, 223, 223); /* Cor de fundo opcional */
`;

export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Espaçamento entre os cards */
  justify-content: center; /* Centraliza os cards horizontalmente */
  width: 100%;
  max-width: 500px; /* Largura máxima para evitar que fique muito largo */
  margin: 0 auto; /* Centraliza o container na tela */
`;
