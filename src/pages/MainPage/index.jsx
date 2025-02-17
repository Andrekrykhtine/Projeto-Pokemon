import ListPokemon from '../../Componets/ListPokemon/ListPokemon';
import { ThemeTogglerButton } from '../../Componets/themeTogglerButton/themeTogglerButton';
import {PokedexImg} from './style'
import pokedex from '../../assets/images/pokedexsemfundo.png'
import { Section, ListPokemonWrapper, PokedexContainer, ThemeButtonWrapper } from './style';
const MainPage = () => {
  return (
    <Section>
      <PokedexContainer>
        <PokedexImg src={pokedex} alt="Pokedex" />
        <ListPokemonWrapper>
          <ListPokemon />
        </ListPokemonWrapper>
      </PokedexContainer>
      <ThemeButtonWrapper>
        <ThemeTogglerButton />
      </ThemeButtonWrapper>
    </Section>
  );
};

export default MainPage;