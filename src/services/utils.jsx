export const getId = (quantity, min, max) => {
  // Validação de entrada
  if (typeof quantity !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('All parameters must be numbers.');
  }
  if (quantity <= 0 || min > max) {
    throw new Error('Invalid parameters: quantity must be positive and min must be less than or equal to max.');
  }

  // Verifica se a quantidade solicitada é maior que o intervalo disponível
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

export const fetchPokemonData = async (id, timeout = 5000) => {
  // Validação de entrada
  if (typeof id !== 'number' && typeof id !== 'string') {
    throw new TypeError('ID must be a number or string.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, { signal: controller.signal });
  
    clearTimeout(timeoutId); // Limpa o timeout após a resposta

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error; 
  }
};

