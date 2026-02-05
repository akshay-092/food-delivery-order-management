import { CartItem, Order, OrderStatus } from '@/types';

export const STORAGE_KEYS = {
    CART: 'food-delivery-cart',
    ORDERS: 'food-delivery-orders',
};

export const storage = {
    getCart: () => {
        if (typeof window === 'undefined') return [];
        const cart = localStorage.getItem(STORAGE_KEYS.CART);
        return cart ? JSON.parse(cart) : [];
    },

    saveCart: (cart: CartItem[]) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    },

    clearCart: () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(STORAGE_KEYS.CART);
    },

    getOrders: () => {
        if (typeof window === 'undefined') return [];
        const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
        return orders ? JSON.parse(orders) : [];
    },

    saveOrder: (order: Order) => {
        if (typeof window === 'undefined') return;
        const orders = storage.getOrders();
        orders.push(order);
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    },

    saveOrders: (orders: Order[]) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    },

    updateOrderStatus: (orderId: string, status: OrderStatus) => {
        if (typeof window === 'undefined') return;
        const orders = storage.getOrders();
        const updatedOrders = orders.map((order: Order) =>
            order.id === orderId ? { ...order, status } : order
        );
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));
    },
};