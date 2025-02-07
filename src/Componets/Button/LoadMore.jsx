import { useState } from 'react';
import { ListPokemon } from '../ListPokemon/ListPokemon';
import Button from './Button';

const LoadMore = () => {
    const [showList, setShowList] = useState(false);

    return (
        <div>
            <Button onClick={() => setShowList(!showList)}>
                {showList ? 'Ocultar Pokémon' : 'Mostrar Pokémon'}
            </Button>
            {showList && <ListPokemon />}
        </div>
    );
};

export default LoadMore;