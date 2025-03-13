import { Message } from "./style";

const LimitReachedMessage = () => {
  return (
    <Message data-testid="limit-reached-message">
      Limite de 100 Pokémons atingido!
    </Message>
  );
};


export default LimitReachedMessage;
