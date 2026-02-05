import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MenuList from '@/components/MenuList';

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve([
                {
                    id: '1',
                    name: 'Test Pizza',
                    description: 'Test description',
                    price: 10.99,
                    image: '/test.jpg',
                },
            ]),
    })
) as jest.Mock;

describe('MenuList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders menu items after loading', async () => {
        render(<MenuList onAddToCart={jest.fn()} />);

        await waitFor(() => {
            expect(screen.getByText('Test Pizza')).toBeInTheDocument();
        });
    });

    it('calls onAddToCart when Add to Cart button is clicked', async () => {
        const mockAddToCart = jest.fn();
        render(<MenuList onAddToCart={mockAddToCart} />);

        await waitFor(() => {
            expect(screen.getByText('Test Pizza')).toBeInTheDocument();
        });

        const addButton = screen.getByText('Add');
        fireEvent.click(addButton);

        expect(mockAddToCart).toHaveBeenCalledWith(
            expect.objectContaining({
                id: '1',
                name: 'Test Pizza',
                quantity: 1,
            })
        );
    });

    it('updates quantity when input changes', async () => {
        render(<MenuList onAddToCart={jest.fn()} />);

        await waitFor(() => {
            expect(screen.getByText('Test Pizza')).toBeInTheDocument();
        });

        const quantityInput = screen.getByDisplayValue('1');
        fireEvent.change(quantityInput, { target: { value: '3' } });

        expect(quantityInput).toHaveValue(3);
    });
});