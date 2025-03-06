import styled from "styled-components";

export const Container = styled.div`
  background-color:${(props) => props.theme.backgroundColor}; 
  text-align: center;
  padding: 20px;
  `;

export const BackButton = styled.button`
  background-color:rgb(224, 11, 11); /* Cinza */
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