import { render, fireEvent } from '@testing-library/react';
import { expect } from "@jest/globals";
import NavigationButtons from './NavigationButtons';

describe('NavigationButtons', () => {
    test('calls onPrevious when the previous button is clicked', () => {
        const onPrevious = jest.fn();
        const onNext = jest.fn();
        const { getByText } = render(
            <NavigationButtons
                onPrevious={onPrevious}
                onNext={onNext}
                isPreviousDisabled={false}
                isNextDisabled={false}
            />
        );

        fireEvent.click(getByText('← Anterior'));
        expect(onPrevious).toHaveBeenCalled();
    });

    test('calls onNext when the next button is clicked', () => {
        const onPrevious = jest.fn();
        const onNext = jest.fn();
        const { getByText } = render(
            <NavigationButtons
                onPrevious={onPrevious}
                onNext={onNext}
                isPreviousDisabled={false}
                isNextDisabled={false}
            />
        );

        fireEvent.click(getByText('Próximo →'));
        expect(onNext).toHaveBeenCalled();
    });

    test('previous button is disabled when isPreviousDisabled is true', () => {
        const onPrevious = jest.fn();
        const onNext = jest.fn();
        const { getByText } = render(
            <NavigationButtons
                onPrevious={onPrevious}
                onNext={onNext}
                isPreviousDisabled={true}
                isNextDisabled={false}
            />
        );

        expect(getByText('← Anterior')).toBeDisabled();
    });

    test('next button is disabled when isNextDisabled is true', () => {
        const onPrevious = jest.fn();
        const onNext = jest.fn();
        const { getByText } = render(
            <NavigationButtons
                onPrevious={onPrevious}
                onNext={onNext}
                isPreviousDisabled={false}
                isNextDisabled={true}
            />
        );

        expect(getByText('Próximo →')).toBeDisabled();
    });
});