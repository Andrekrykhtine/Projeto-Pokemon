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