'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Button,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import { ShoppingCart as CartIcon } from '@mui/icons-material';
import MenuList from '@/components/MenuList';
import Cart from '@/components/Cart';
import CheckoutForm from '@/components/CheckoutForm';
import OrderStatus from '@/components/OrderStatus';
import OrderHistory from '@/components/OrderHistory';
import { CartItem, DeliveryDetails, Order, OrderStatus as OrderStatusType } from '@/types';
import { storage } from '@/utils/storage';

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderStatusOpen, setOrderStatusOpen] = useState(false);
  const [orderHistoryOpen, setOrderHistoryOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    setCartItems(storage.getCart());
    setOrders(storage.getOrders());
  }, []);

  const handleAddToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex((i) => i.id === item.id);

    let updatedCart: CartItem[];
    if (existingItemIndex >= 0) {
      updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += item.quantity;
    } else {
      updatedCart = [...cartItems, item];
    }

    setCartItems(updatedCart);
    storage.saveCart(updatedCart);
    setSnackbar({
      open: true,
      message: 'Item added to cart!',
      severity: 'success',
    });
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    storage.saveCart(updatedCart);
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    storage.saveCart(updatedCart);
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handlePlaceOrder = async (deliveryDetails: DeliveryDetails) => {
    try {
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const orderData = {
        items: cartItems,
        deliveryDetails,
        totalAmount,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Failed to place order');

      const order = await response.json();

      // Save order locally
      storage.saveOrder(order);
      setCurrentOrder(order);

      setOrders(prev => [...prev, order]);

      // Simulate status updates (Global simulation for this demo)
      const statuses: OrderStatusType[] = ['Preparing', 'Out for Delivery', 'Delivered'];
      statuses.forEach((status, index) => {
        setTimeout(() => {
          storage.updateOrderStatus(order.id, status);
          setOrders(storage.getOrders());
          // If this is the current active tracking order, update it too
          setCurrentOrder(prev => {
            if (prev && prev.id === order.id) {
              return { ...prev, status };
            }
            return prev;
          });
        }, (index + 1) * 5000);
      });

      // Clear cart
      setCartItems([]);
      storage.clearCart();

      setCheckoutOpen(false);
      setOrderStatusOpen(true);

      setSnackbar({
        open: true,
        message: 'Order placed successfully!',
        severity: 'success',
      });
    } catch {
      setSnackbar({
        open: true,
        message: 'Failed to place order. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleClearHistory = () => {
    storage.saveOrders([]);
    setOrders([]);
  };

  return (
    <Box className="flex flex-col h-screen overflow-hidden">
      <Box className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <Container maxWidth="lg">
          <Toolbar disableGutters className="h-16 flex justify-between items-center px-4 md:px-0">
            <Typography variant="h5" className="font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              FoodDelivery
            </Typography>
            <Box className="flex gap-2">
              <Button
                variant="text"
                onClick={() => setOrderHistoryOpen(true)}
                className="text-slate-600 font-semibold normal-case hover:bg-slate-100"
              >
                My Orders
              </Button>
              <IconButton
                onClick={() => setCartOpen(true)}
                className="bg-orange-50 hover:bg-orange-100 transition-colors duration-300"
              >
                <Badge badgeContent={cartItems.length} color="error">
                  <CartIcon className="text-orange-600" />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </Box>

      <Box component="main" className="flex-1 overflow-y-auto">
        <Container maxWidth="lg" className="py-16 px-4 md:px-0">
          <Box className="mb-12 flex items-center gap-4">
            <Typography variant="h5" className="font-bold text-slate-900">
              Popular Items
            </Typography>
            <div className="h-px flex-1 bg-slate-200"></div>
          </Box>

          <MenuList onAddToCart={handleAddToCart} />
        </Container>
      </Box>

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <CheckoutForm
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handlePlaceOrder}
      />

      <OrderStatus
        open={orderStatusOpen}
        onClose={() => setOrderStatusOpen(false)}
        order={currentOrder}
      />

      <OrderHistory
        open={orderHistoryOpen}
        onClose={() => setOrderHistoryOpen(false)}
        orders={orders}
        onOrderClick={(order) => {
          setCurrentOrder(order);
          setOrderStatusOpen(true);
          setOrderHistoryOpen(false);
        }}
        onClearHistory={handleClearHistory}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}