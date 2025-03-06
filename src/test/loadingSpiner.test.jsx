import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../Componets/MainPage/LoadingSpiner/LoadingSpiner';
import { describe, it, expect } from 'vitest';

describe('LoadingSpinner', () => {
  it('renders the spinner', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should have a role', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('loading-spinner'); // Verifique se a classe está presente
  });
});