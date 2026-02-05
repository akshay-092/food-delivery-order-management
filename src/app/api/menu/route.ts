import { NextResponse } from 'next/server';

const menuItems = [
    {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        price: 120.99,
        image: '/images/pizza.jpg',
    },
    {
        id: '2',
        name: 'Cheese Burger',
        description: 'Juicy beef patty with cheese, lettuce, and tomato',
        price: 90.99,
        image: '/images/burger.jpg',
    },
    {
        id: '3',
        name: 'Pasta Carbonara',
        description: 'Creamy pasta with bacon and parmesan cheese',
        price: 140.99,
        image: '/images/pasta.jpg',
    },
    {
        id: '4',
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing and croutons',
        price: 80.99,
        image: '/images/salad.jpg',
    },

    {
        id: '6',
        name: 'Sushi Platter',
        description: 'Assorted fresh sushi rolls',
        price: 180.99,
        image: '/images/sushi.jpg',
    },
];

export async function GET() {
    return NextResponse.json(menuItems);
}