import { useQuery } from "react-query";
import { useState } from "react";


export const Main = () => {
    function sortearNumeros(quantidade, min, max) {
        // Verifica se a quantidade de números solicitada é válida
        if (quantidade > (max - min + 1)) {
            throw new Error("A quantidade de números solicitada é maior que o intervalo disponível.");
        }

        const numerosSorteados = new Set(); // Usamos um Set para garantir que os números sejam únicos

        while (numerosSorteados.size < quantidade) {
            const numeroSorteado = Math.floor(Math.random() * (max - min + 1)) + min;
            numerosSorteados.add(numeroSorteado); // Adiciona o número ao Set (não permite duplicatas)
        }

        return Array.from(numerosSorteados); // Converte o Set de volta para um array

    }

    try {
        const numerosSorteados = sortearNumeros(20, 1, 700); 
        console.log("Números sorteados:", numerosSorteados);
        const dezPrimeiros = numerosSorteados.slice(0, 10);
        console.log("Dez primeiros:", dezPrimeiros);
    } catch (error) {
        console.error(error.message);
    }

    async function buscarPokemons() {
        // Primeiro sorteamos os números
        const numerosSorteados = sortearNumeros(20, 1, 700);
        const dezPrimeiros = numerosSorteados.slice(0, 10);
        console.log("Dez IDs sorteados:", dezPrimeiros);
    
        try {
            // Fazemos as requisições para cada ID
            const promessas = dezPrimeiros.map(id => 
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
                    .then(response => response.json())
            );
    
            // Aguardamos todas as requisições terminarem
            const pokemons = await Promise.all(promessas);
            
            console.log("Pokémons sorteados:", pokemons);
            
            // Aqui você tem os dados de todos os pokémons
            pokemons.forEach(pokemon => {
                console.log(`Pokemon: ${pokemon.name}`);
            });
    
            return pokemons;
    
        } catch (error) {
            console.error("Erro ao buscar os pokémons:", error);
        }
    }
    
    // Chamada da função
    buscarPokemons();

    // const fetchData = async (id) => {
    //     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    //     return await response.json();
    // }

    // const { data, isLoading, isError, error } = useQuery("Pokemon", fetchData, {
    //     refetchOnWindowFocus: false,
    // });

    // if (isLoading) return <p>Carregando...</p>
    // if (isError) return <p>Erro: {error.message}</p>

    // console.log(data)

   


    //  const listaPokemon = () => {
    //      return (
    //          <ul>
    //              {                    
    //                      <li >
    //                          <a>
    //                              <p>{data.name}</p>
    //                              <img src={data.sprites.other["official-artwork"].front_default} alt={`Imagem do ${data.name}`} />
    //                          </a>
    //                      </li>                 
    //              }
    //          </ul>
    //      );
    //  };


    // // const [listaPokemon, setListaPokemon] = useState({
    // return listaPokemon();
}                  