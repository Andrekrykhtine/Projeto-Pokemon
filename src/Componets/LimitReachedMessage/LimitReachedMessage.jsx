
import styled from 'styled-components';

const LimitReachedMessage = () => {
  return (
    <Message>
      Limite de 100 Pokémon atingido!
    </Message>
  );
};

const Message = styled.div`
  text-align: center;
  color: red;
  font-weight: bold;
  margin: 20px 0;
`;

export default LimitReachedMessage;