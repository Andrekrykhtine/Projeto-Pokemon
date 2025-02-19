import { render, fireEvent } from '@testing-library/react';
import TypeFilter from '../src/Componets/Filter/Fliter';
import { expect } from "@jest/globals";

describe('TypeFilter Component', () => {
    const types = [
        { name: 'type1', icon: <span>Icon1</span> },
        { name: 'type2', icon: <span>Icon2</span> },
    ];
    const selectedType = 'type1';
    const onSelectType = jest.fn();

    test('renders all types', () => {
        const { getByText } = render(
            <TypeFilter types={types} selectedType={selectedType} onSelectType={onSelectType} />
        );

        types.forEach((type) => {
            expect(getByText(type.icon.props.children)).toBeInTheDocument();
        });
    });

    test('applies correct opacity to selected type', () => {
        const { getByText } = render(
            <TypeFilter types={types} selectedType={selectedType} onSelectType={onSelectType} />
        );

        const selectedTypeButton = getByText('Icon1').parentElement;
        const unselectedTypeButton = getByText('Icon2').parentElement;

        expect(selectedTypeButton).toHaveStyle('opacity: 1');
        expect(unselectedTypeButton).toHaveStyle('opacity: 0.5');
    });

    test('calls onSelectType with correct type name when a type is clicked', () => {
        const { getByText } = render(
            <TypeFilter types={types} selectedType={selectedType} onSelectType={onSelectType} />
        );

        fireEvent.click(getByText('Icon2'));

        expect(onSelectType).toHaveBeenCalledWith('type2');
    });
});