// HTML do componente princiapal
import { Container, PokedexImg} from "./style";
import Button from "../../Componets/Button/Button";
import Pokedex from "../../assets/images/pokedex.svg";
import { ListPokemon } from "../../Componets/ListPokemon/ListPokemon";

const MainPage = () => (
        <Container>
            <ListPokemon />
            {/* <PokedexImg src={Pokedex} alt="Pokedex"/> */}
            <Button>Carregar mais</Button>
        </Container>
    );

    export default MainPage

