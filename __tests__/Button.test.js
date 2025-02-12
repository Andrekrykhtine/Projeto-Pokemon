
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import Button from './Button';

describe('Button Component', () => {
    it('renders correctly with default props', () => {
        const { getByText } = render(<Button>Click Me</Button>);
        expect(getByText('Click Me')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        const { getByText } = render(<Button onClick={handleClick}>Click Me</Button>);
        fireEvent.click(getByText('Click Me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is true', () => {
        const { getByText } = render(<Button disabled>Click Me</Button>);
        expect(getByText('Click Me')).toBeDisabled();
    });

    it('renders with the correct type', () => {
        const { getByText } = render(<Button type="submit">Submit</Button>);
        expect(getByText('Submit').getAttribute('type')).toBe('submit');
    });

    it('passes additional props to the button element', () => {
        const { getByText } = render(<Button data-testid="custom-button">Click Me</Button>);
        expect(getByText('Click Me').getAttribute('data-testid')).toBe('custom-button');
    });
});