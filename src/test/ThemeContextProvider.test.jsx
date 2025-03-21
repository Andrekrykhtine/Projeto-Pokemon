import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useContext } from 'react';
import { ThemeContextProvider } from '../contexts/ThemeContextProvider';
import { ThemeContext, themes } from '../styles/Theme';
import styled from 'styled-components';

vi.mock('../styles/Theme', async () => {
  const actual = await vi.importActual('../styles/Theme');
  return {
    ...actual,
  };
});

const TestComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <div>
      <pre data-testid="theme-json">{JSON.stringify(theme, null, 2)}</pre>
      <button 
        data-testid="toggle-theme" 
        onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}
      >
        Toggle Theme
      </button>
    </div>
  );
};

const StyledComponent = styled.div`
  background-color: ${props => props.theme.colors?.background || props.theme.background};
  color: ${props => props.theme.colors?.text || props.theme.text};
`;

const TestStyledComponent = () => (
  <StyledComponent data-testid="styled-component">
    Styled content
  </StyledComponent>
);

describe('ThemeContextProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children correctly', () => {
    render(
      <ThemeContextProvider>
        <div data-testid="child-element">Test Child</div>
      </ThemeContextProvider>
    );
    
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByTestId('child-element')).toHaveTextContent('Test Child');
  });

  it('should provide the light theme by default', () => {
    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>
    );
    
    const themeJson = screen.getByTestId('theme-json').textContent;
    const parsedTheme = JSON.parse(themeJson);
    
    expect(parsedTheme).toEqual(themes.light);
  });

  it('should allow toggling between themes', () => {
    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>
    );
    
    let themeJson = screen.getByTestId('theme-json').textContent;
    let initialTheme = JSON.parse(themeJson);
    
    expect(initialTheme).toEqual(themes.light);
    fireEvent.click(screen.getByTestId('toggle-theme'));
    themeJson = screen.getByTestId('theme-json').textContent;
    let updatedTheme = JSON.parse(themeJson);
    
    expect(updatedTheme).toEqual(themes.dark);
    
    fireEvent.click(screen.getByTestId('toggle-theme'));
    
    themeJson = screen.getByTestId('theme-json').textContent;
    updatedTheme = JSON.parse(themeJson);
    
    expect(updatedTheme).toEqual(themes.light);
  });

  it('should apply the theme to the styled-components ThemeProvider', () => {
    let contextValue;
    
    const ContextConsumer = () => {
      contextValue = useContext(ThemeContext);
      return null;
    };
    
    render(
      <ThemeContextProvider>
        <ContextConsumer />
        <TestStyledComponent />
      </ThemeContextProvider>
    );
    
    expect(contextValue).toBeDefined();
    expect(contextValue.theme).toEqual(themes.light);
  });

  it('should respect the theme context interface', () => {
    let contextValue;
    
    const ContextConsumer = () => {
      contextValue = useContext(ThemeContext);
      return null;
    };
    
    render(
      <ThemeContextProvider>
        <ContextConsumer />
      </ThemeContextProvider>
    );
    
    expect(contextValue).toHaveProperty('theme');
    expect(contextValue).toHaveProperty('setTheme');
    expect(typeof contextValue.setTheme).toBe('function');
  });
});