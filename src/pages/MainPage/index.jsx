import ListPokemon from '../../Componets/ListPokemon/ListPokemon';
import { ThemeTogglerButton } from '../../Componets/themeTogglerButton/themeTogglerButton';
import {PokedexImg} from './style'
import pokedex from '../../assets/images/pokedexsemfundo.png'
import { Section, ListPokemonWrapper } from './style';
const MainPage = () => {

  return (
    <Section>
    <PokedexImg src={pokedex} alt="Pokedex" />
    <ListPokemonWrapper>
      <ListPokemon />
    </ListPokemonWrapper>
      <ThemeTogglerButton />
  </Section>
  );
};

export default MainPage;