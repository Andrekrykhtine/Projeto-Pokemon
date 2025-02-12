import ListPokemon from '../../Componets/ListPokemon/ListPokemon';
import { ThemeToggleButton } from '../../Componets/themeTogglerButton/themeTogglerButton';

const MainPage = () => {


  return (
    <section >
        <ListPokemon />
        <ThemeToggleButton />
    </section>
  );
};

export default MainPage;