// src/test/mocks.js
export const mockedPokemonData = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    other: {
      "official-artwork": {
        front_default: 'https://example.com/bulbasaur.png'
      }
    }
  },
  types: [
    { type: { name: 'grass' } },
    { type: { name: 'poison' } }
  ],
  abilities: [
    { ability: { name: 'overgrow' } },
    { ability: { name: 'chlorophyll' } }
  ],
  moves: [
    { move: { name: 'razor-wind' } },
    { move: { name: 'swords-dance' } },
    { move: { name: 'cut' } }
  ]
};