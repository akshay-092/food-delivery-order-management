/**
 * @jest-environment node
 */
import { POST, GET } from '@/app/api/orders/route';
import { NextRequest } from 'next/server';

describe('Orders API', () => {
    describe('POST /api/orders', () => {
        it('creates a new order with valid data', async () => {
            const body = {
                items: [{ id: '1', name: 'Pizza', price: 10, quantity: 2 }],
                deliveryDetails: {
                    name: 'John Doe',
                    address: '123 Main St',
                    phone: '1234567890',
                },
                totalAmount: 20,
            };
            const mockRequest = new NextRequest('http://localhost/api/orders', {
                method: 'POST',
                body: JSON.stringify(body),
            });

            const response = await POST(mockRequest);
            const data = await response.json();

            expect(response.status).toBe(201);
            expect(data).toHaveProperty('id');
            expect(data.status).toBe('Order Received');
            expect(data.totalAmount).toBe(20);
        });

        it('returns 400 when items are missing', async () => {
            const body = {
                items: [],
                deliveryDetails: {
                    name: 'John Doe',
                    address: '123 Main St',
                    phone: '1234567890',
                },
                totalAmount: 0,
            };
            const mockRequest = new NextRequest('http://localhost/api/orders', {
                method: 'POST',
                body: JSON.stringify(body),
            });

            const response = await POST(mockRequest);
            const data = await response.json();

            expect(response.status).toBe(400);
            expect(data.error).toBe('Order must contain at least one item');
        });

        it('returns 400 when delivery details are incomplete', async () => {
            const body = {
                items: [{ id: '1', name: 'Pizza', price: 10, quantity: 2 }],
                deliveryDetails: {
                    name: '',
                    address: '',
                    phone: '',
                },
                totalAmount: 20,
            };
            const mockRequest = new NextRequest('http://localhost/api/orders', {
                method: 'POST',
                body: JSON.stringify(body),
            });

            const response = await POST(mockRequest);
            const data = await response.json();

            expect(response.status).toBe(400);
            expect(data.error).toBe('Delivery details are required');
        });
    });

    describe('GET /api/orders', () => {
        it('returns all orders', async () => {
            const response = await GET();
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(Array.isArray(data)).toBe(true);
        });
    });
});