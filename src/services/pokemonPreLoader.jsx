// Serviço para pré-carregar Pokémon
import { fetchPokemonData } from './utils';

class PokemonPreLoader {
  constructor() {
    this.cache = new Map();
    this.preloadQueue = [];
    this.isPreloading = false;
  }

  // Verifica se um Pokémon já está em cache
  has(id) {
    return this.cache.has(id);
  }

  // Obtém um Pokémon do cache
  get(id) {
    return this.cache.get(id);
  }

  // Adiciona um Pokémon ao cache
  set(id, pokemon) {
    this.cache.set(id, pokemon);
    
    // Limita o tamanho do cache para evitar uso excessivo de memória
    if (this.cache.size > 100) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }

  // Pré-carrega Pokémon próximos
  preloadNearby(currentId) {
    // Limpa a fila atual
    this.preloadQueue = [];
    
    // Adiciona IDs para pré-carregar (2 para frente e 2 para trás)
    for (let offset of [-2, -1, 1, 2]) {
      const idToPreload = currentId + offset;
      
      // Certifique-se de que o ID é válido (maior que 0 e menor que o máximo de Pokémon)
      if (idToPreload > 0 && idToPreload <= 898 && !this.has(idToPreload)) {
        this.preloadQueue.push(idToPreload);
      }
    }
    
    // Inicia o pré-carregamento se não estiver já em andamento
    if (!this.isPreloading) {
      this._processPreloadQueue();
    }
  }

  // Processa a fila de pré-carregamento
  async _processPreloadQueue() {
    if (this.preloadQueue.length === 0) {
      this.isPreloading = false;
      return;
    }
    
    this.isPreloading = true;
    const nextId = this.preloadQueue.shift();
    
    try {
      // Carrega o próximo Pokémon da fila
      const pokemon = await fetchPokemonData(nextId);
      this.set(nextId, pokemon);
      
      // Pré-carrega as imagens
      if (pokemon.sprites?.other?.["official-artwork"]?.front_default) {
        const img = new Image();
        img.src = pokemon.sprites.other["official-artwork"].front_default;
      }
    } catch (error) {
      console.error(`Falha ao pré-carregar Pokémon ID ${nextId}:`, error);
    }
    
    // Continua com o próximo Pokémon da fila
    setTimeout(() => this._processPreloadQueue(), 100);
  }
}

// Exporta uma única instância para ser usada em toda a aplicação
export const pokemonPreLoader = new PokemonPreLoader();