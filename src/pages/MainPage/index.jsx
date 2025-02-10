import LimitReachedMessage from "../../Componets/LimitReachedMessage/LimitReachedMessage";
import ListPokemon from '../../Componets/ListPokemon/ListPokemon';
import Button from '../../Componets/Button/Button';

const MainPage = () => {
  return (
    <section>
      <ListPokemon />
      {/* <LimitReachedMessage />
      <Button />
      <Button/> */}
    </section>
  );
};

export default MainPage;