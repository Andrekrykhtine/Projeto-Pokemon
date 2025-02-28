import { render, screen } from '@testing-library/react';
import LimitReachedMessage from '../Componets/MainPage/LimitReachedMessage/LimitReachedMessage';
import { describe, it, expect } from 'vitest';

describe('LimitReachedMessage', () => {
  it('renders the correct message', () => {
    render(<LimitReachedMessage />);
    expect(screen.getByText('Limite de 100 Pokémon atingido!')).toBeInTheDocument();
  });

  it('should have Message component', () => {
    render(<LimitReachedMessage />);
    //expect(screen.getByRole('paragraph')).toBeInTheDocument();//Altenativa
    expect(screen.getByText('Limite de 100 Pokémon atingido!')).toBeInTheDocument();// Alternativa
  });
});
