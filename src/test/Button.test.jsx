import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Componets/UI/Button/Button';
import { ThemeContext, themes } from '../styles/Theme'; // Importe themes também
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('Button', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders children correctly', () => {
        render(
            <ThemeContext.Provider value={{ theme: themes.light }}> {/* Fornece um tema */}
                <Button>Click Me</Button>
            </ThemeContext.Provider>
        );
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
        const onClick = vi.fn();
        render(
            <ThemeContext.Provider value={{ theme: themes.light }}> {/* Fornece um tema */}
                <Button onClick={onClick}>Click Me</Button>
            </ThemeContext.Provider>
        );
        const button = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is true', () => {
        render(
            <ThemeContext.Provider value={{ theme: themes.light }}> {/* Fornece um tema */}
                <Button disabled>Click Me</Button>
            </ThemeContext.Provider>
        );
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeDisabled();
    });

    it('is not disabled when disabled prop is false', () => {
        render(
            <ThemeContext.Provider value={{ theme: themes.light }}> {/* Fornece um tema */}
                <Button disabled={false}>Click Me</Button>
            </ThemeContext.Provider>
        );
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).not.toBeDisabled();
    });

    it('has the correct type', () => {
        render(
            <ThemeContext.Provider value={{ theme: themes.light }}> {/* Fornece um tema */}
                <Button type="submit">Submit</Button>
            </ThemeContext.Provider>
        );
        const button = screen.getByRole('button', { name: /submit/i });
        expect(button).toHaveAttribute('type', 'submit');
    });

    it('has default type of button', () => {
        render(
            <ThemeContext.Provider value={{ theme: themes.light }}> {/* Fornece um tema */}
                <Button>Click</Button>
            </ThemeContext.Provider>
        );
        const button = screen.getByRole('button', { name: /click/i });
        expect(button).toHaveAttribute('type', 'button');
    });

    it('passes additional props to the underlying button', () => {
        render(
            <ThemeContext.Provider value={{ theme: themes.light }}> {/* Fornece um tema */}
                <Button data-testid="my-button" className="custom-class">
                    Click Me
                </Button>
            </ThemeContext.Provider>
        );
        const button = screen.getByTestId('my-button');
        expect(button).toHaveClass('custom-class');
    });

    it('should have theme props', () => {
        const { container } = render(
            <ThemeContext.Provider value={{ theme: themes.light }}> {/* Fornece um tema */}
                <Button>
                    Click Me
                </Button>
            </ThemeContext.Provider>
        );
        const button = container.querySelector('button');
        expect(button).toHaveStyle(`background-color: ${themes.light.backgroundColor}`);
        expect(button).toHaveStyle(`color: ${themes.light.color}`);
    });
});
