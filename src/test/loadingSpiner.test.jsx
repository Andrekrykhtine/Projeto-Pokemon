import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../Componets/UI/LoadingSpiner/LoadingSpiner';
import { describe, it, expect } from 'vitest';

describe('LoadingSpinner', () => {
  it('renders the spinner', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

 
});