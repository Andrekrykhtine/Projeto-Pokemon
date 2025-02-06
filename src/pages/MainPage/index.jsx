// HTML do componente princiapal
import { Container, PokedexImg} from "./style";
import Pokedex from "../../assets/images/pokedex.svg";
import { ListPokemon } from "../../Componets/pokemons";

const MainPage = () => (
        <Container>
            <PokedexImg src={Pokedex} alt="Pokedex"/>
            <ListPokemon />
        </Container>
    );

    export default MainPage

