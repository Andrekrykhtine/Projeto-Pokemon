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

export const LimitReached = styled.p`
color: ${(props) => props.theme.colors.red};
font-weight: 700;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Espaçamento entre os cards */
  justify-content: center; /* Centraliza os cards horizontalmente */
   width: 100%;
 `;

 export const NoPokemonMessage = styled.div`
  font-size: 1rem;
  color: #000000;
  text-align: center;
`;

 