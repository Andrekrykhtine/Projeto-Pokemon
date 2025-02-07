// HTML do componente princiapal
import { Container, PokedexImg} from "./style";
import Pokedex from "../../assets/images/pokedex.svg";
import { ListPokemon } from "../../Componets/ListPokemon/ListPokemon";
import ButtonExample from "../../Componets/Button/LoadMore";


const MainPage = () => (
        <Container>
            <ListPokemon />
            {/* <PokedexImg src={Pokedex} alt="Pokedex"/> */}
            <ButtonExample />
        </Container>
    );

    export default MainPage

