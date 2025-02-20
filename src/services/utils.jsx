export const getId = (quantity, min, max) => {
    if (quantity > max - min + 1) {
      throw new Error("The requested quantity of numbers is greater than the available range.");
    }
    const drawnNumbers = new Set();
    while (drawnNumbers.size < quantity) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      drawnNumbers.add(randomNumber);
    }
    return Array.from(drawnNumbers);
  };
  
  export const fetchPokemonData = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };