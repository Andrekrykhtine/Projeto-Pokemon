import styled from "styled-components";

export const StyledCard = styled.div`
  text-align: center;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9; /* Cor padrão */
  color: #fff; /* Texto branco para contraste */
  max-width: 400px;
  margin: 0 auto;

  h1 {
    font-size: 1.6rem;
    margin-bottom: 10px;
    color: #fff;
  }

  img {
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledSection = styled.div`
  margin-top: 15px;

  h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #fff;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 5px 0;
    font-size: 1rem;
    color: #fff;
  }
`;