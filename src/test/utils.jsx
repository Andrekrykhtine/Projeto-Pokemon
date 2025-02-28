import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';
import { vi, beforeEach, afterEach, describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListPokemon from '../Componets/MainPage/ListPokemon/ListPokemon';
import { fetchPokemonData, getId } from '../services/utils'; 

// Mock das funções externas
vi.mock('../services/utils', () => ({
  fetchPokemonData: vi.fn(),
  getId: vi.fn()
}));
// Renderiza com BrowserRouter
export function renderWithRouter(ui, { route = '/' } = {}) {
  return render(ui, { wrapper: BrowserRouter });
}

// Renderiza com MemoryRouter (para testes mais controlados)
export function renderWithMemoryRouter(ui, { route = '/', initialEntries = [route] } = {}) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
  );

 
}
