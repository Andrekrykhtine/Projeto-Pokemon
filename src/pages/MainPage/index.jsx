import ListPokemon from '../../Componets/ListPokemon/ListPokemon';
import { ThemeTogglerButton } from '../../Componets/themeTogglerButton/themeTogglerButton';

const MainPage = () => {

  return (
    <section >
        <ListPokemon />
        <ThemeTogglerButton />
    </section>
  );
};

export default MainPage;