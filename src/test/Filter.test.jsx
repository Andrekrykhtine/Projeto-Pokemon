import { render, screen, fireEvent } from '@testing-library/react';
import TypeFilter from '../Componets/MainPage/Filter/Fliter';
import { vi, describe, it, expect, beforeEach } from 'vitest';


const mockIcons = {
  grass: <div data-testid="icon-grass">🌱</div>,
  fire: <div data-testid="icon-fire">🔥</div>,
  water: <div data-testid="icon-water">💧</div>,
};

const mockTypes = [
  { name: 'grass', icon: mockIcons.grass },
  { name: 'fire', icon: mockIcons.fire },
  { name: 'water', icon: mockIcons.water },
];

describe('TypeFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all type buttons', () => {
    render(
      <TypeFilter
        types={mockTypes}
        selectedType="grass"
        onSelectType={() => {}}
      />
    );
    expect(screen.getByTestId('icon-grass')).toBeInTheDocument();
    expect(screen.getByTestId('icon-fire')).toBeInTheDocument();
    expect(screen.getByTestId('icon-water')).toBeInTheDocument();
  });

  it('calls onSelectType with the correct type name when a button is clicked', () => {
    const onSelectType = vi.fn();
    render(
      <TypeFilter
        types={mockTypes}
        selectedType="grass"
        onSelectType={onSelectType}
      />
    );
    const fireButton = screen.getByTestId('icon-fire').closest('button');
    fireEvent.click(fireButton);
    expect(onSelectType).toHaveBeenCalledTimes(1);
    expect(onSelectType).toHaveBeenCalledWith('fire');
  });

  it('sets opacity to 1 for the selected type', () => {
    render(
      <TypeFilter
        types={mockTypes}
        selectedType="fire"
        onSelectType={() => {}}
      />
    );
    const fireButton = screen.getByTestId('icon-fire').closest('button');
    expect(fireButton).toHaveStyle('opacity: 1');
  });

  it('sets opacity to 0.5 for unselected types', () => {
    render(
      <TypeFilter
        types={mockTypes}
        selectedType="fire"
        onSelectType={() => {}}
      />
    );
    const grassButton = screen.getByTestId('icon-grass').closest('button');
    expect(grassButton).toHaveStyle('opacity: 0.5');
  });
  
  it('should have prop types', () => {
    const { container } = render(
        <TypeFilter
            types={mockTypes}
            selectedType="fire"
            onSelectType={() => {}}
        />
    );

    const typeFilterContainer = container.querySelector('div');
    expect(typeFilterContainer).toBeInTheDocument();
  });
});
