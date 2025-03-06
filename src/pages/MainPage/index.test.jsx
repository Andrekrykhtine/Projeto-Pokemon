import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainPage from './index';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getId } from '../../services/utils';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from 'react-query';

const mockTheme = {
    colors: {
        background: '#fff',
        text: '#000',
    },
    backgroundImage: 'none',
};

vi.mock('../../services/utils', () => ({
    getId: vi.fn(),
}));

describe('MainPage', () => {
    let queryClient;

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                    refetchOnMount: false,
                    refetchOnWindowFocus: false,
                    refetchOnReconnect: false
                },
            },
        });
        vi.clearAllMocks();
    });
    afterEach(() => {
        vi.resetAllMocks();
    });

    const renderComponent = () => {
        return render(
            <QueryClientProvider client={queryClient}>
                <ThemeContext.Provider value={{ theme: mockTheme }}>
                    <MainPage />
                </ThemeContext.Provider>
            </QueryClientProvider>
        );
    }

    it('renders correctly', () => {
        renderComponent();
        expect(screen.getByText('Carregar mais...')).toBeInTheDocument();
        expect(screen.getByText('Resetar Lista')).toBeInTheDocument();
        expect(screen.getByText('Mostrar Todos')).toBeInTheDocument();
    });

    it('handles "Carregar mais..." button click', async () => {
        getId.mockReturnValue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        renderComponent();
        const loadMoreButton = screen.getByText('Carregar mais...');
        fireEvent.click(loadMoreButton);
        await waitFor(() => {
            expect(getId).toHaveBeenCalledWith(10, 1, 700);
        });
    });

    it('disables "Carregar mais..." button when limit is reached', async () => {
        getId.mockReturnValue(Array.from({ length: 100 }, (_, i) => i + 1));
        renderComponent();
        const loadMoreButton = screen.getByText('Carregar mais...');
        fireEvent.click(loadMoreButton);

        await waitFor(() => {
            expect(loadMoreButton).toBeDisabled();
        });
    });

    it('handles "Resetar Lista" button click', async () => {
        getId.mockReturnValue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        renderComponent();
        const resetButton = screen.getByText('Resetar Lista');
        fireEvent.click(resetButton);
        await waitFor(() => {
            expect(getId).toHaveBeenCalledWith(10, 1, 700);
        });
    });

    it('handles type selection in TypeFilter', async () => {
        renderComponent();
        const typeFilter = screen.getByLabelText('Filtrar por tipo');
        fireEvent.change(typeFilter, { target: { value: 'fire' } });
        await waitFor(() => {
            expect(screen.getByDisplayValue('fire')).toBeInTheDocument();
        });
    });

    it('handles "Mostrar Todos" button click', async () => {
        renderComponent();
        const showAllButton = screen.getByText('Mostrar Todos');
        fireEvent.click(showAllButton);
        await waitFor(() => {
            expect(showAllButton).toBeDisabled();
        });
    });
});
