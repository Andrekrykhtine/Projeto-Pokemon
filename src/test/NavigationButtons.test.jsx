import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavigationButtons from '../Componets/PokemonProperties/NavigationButtons/NavigationButtons';


describe('NavigationButtons', () => {
    let onPreviousMock = vi.fn(); 
    let onNextMock = vi.fn(); 

    beforeEach(() => {
      onPreviousMock = vi.fn();
      onNextMock = vi.fn();
    });
  
    it('should render navigation buttons', () => {
      render(
        <NavigationButtons
          onPrevious={onPreviousMock}
          onNext={onNextMock}
          isPreviousDisabled={false}
          isNextDisabled={false}
        />
      );
  
  
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });
  
    it('should call onPrevious when previous button is clicked', () => {
      render(
        <NavigationButtons
          onPrevious={onPreviousMock}
          onNext={onNextMock}
          isPreviousDisabled={false}
          isNextDisabled={false}
        />
      );
  
      fireEvent.click(screen.getByRole('button', { name: /previous/i }));
      expect(onPreviousMock).toHaveBeenCalledTimes(1);
    });
  
    it('should call onNext when next button is clicked', () => {
      render(
        <NavigationButtons
          onPrevious={onPreviousMock}
          onNext={onNextMock}
          isPreviousDisabled={false}
          isNextDisabled={false}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      expect(onNextMock).toHaveBeenCalledTimes(1);
    });
  
    it('should disable previous button when isPreviousDisabled is true', () => {
      render(
        <NavigationButtons
          onPrevious={onPreviousMock}
          onNext={onNextMock}
          isPreviousDisabled={true}
          isNextDisabled={false}
        />
      );
  
      const previousButton = screen.getByRole('button', { name: /previous/i });
      expect(previousButton).toBeDisabled();
    });
  
    it('should disable next button when isNextDisabled is true', () => {
      render(
        <NavigationButtons
          onPrevious={onPreviousMock}
          onNext={onNextMock}
          isPreviousDisabled={false}
          isNextDisabled={true}
        />
      );

      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });
  
    it('should not call onPrevious when previous button is disabled', () => {
      render(
        <NavigationButtons
          onPrevious={onPreviousMock}
          onNext={onNextMock}
          isPreviousDisabled={true} 
          isNextDisabled={false}
        />
      );
  
      const previousButton = screen.getByRole('button', { name: /previous/i });
      expect(previousButton).toBeDisabled();
      fireEvent.click(previousButton);
      expect(onPreviousMock).not.toHaveBeenCalled();
    });
  
    it('should not call onNext when next button is disabled', () => {
      render(
        <NavigationButtons
          onPrevious={onPreviousMock}
          onNext={onNextMock}
          isPreviousDisabled={false}
          isNextDisabled={true} 
        />
      );
  
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
      fireEvent.click(nextButton);
      expect(onNextMock).not.toHaveBeenCalled();
    });
  });
