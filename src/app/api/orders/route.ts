import { NextRequest, NextResponse } from 'next/server';
import { Order, OrderStatus } from '@/types';

// In-memory storage for orders (in production, use a database)
let orders: Order[] = [];

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        if (!body.items || body.items.length === 0) {
            return NextResponse.json(
                { error: 'Order must contain at least one item' },
                { status: 400 }
            );
        }

        if (!body.deliveryDetails?.name || !body.deliveryDetails?.address || !body.deliveryDetails?.phone) {
            return NextResponse.json(
                { error: 'Delivery details are required' },
                { status: 400 }
            );
        }

        const order: Order = {
            id: `order-${Date.now()}`,
            items: body.items,
            deliveryDetails: body.deliveryDetails,
            status: 'Order Received',
            totalAmount: body.totalAmount,
            createdAt: new Date().toISOString(),
        };

        orders.push(order);

        // Simulate status updates
        setTimeout(() => updateOrderStatus(order.id, 'Preparing'), 5000);
        setTimeout(() => updateOrderStatus(order.id, 'Out for Delivery'), 10000);
        setTimeout(() => updateOrderStatus(order.id, 'Delivered'), 15000);

        return NextResponse.json(order, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(orders);
}

function updateOrderStatus(orderId: string, status: OrderStatus) {
    orders = orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
    );
}