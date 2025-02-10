// HTML do componente princiapal
import { Container, PokedexImg} from "./style";
import Pokedex from "../../assets/images/pokedex.svg";
import  ListPokemon  from "../../Componets/ListPokemon/ListPokemon";



const MainPage = () => (
        <Container>
            <ListPokemon />
            {/* <PokedexImg src={Pokedex} alt="Pokedex"/> */}
        </Container>
    );

    export default MainPage

