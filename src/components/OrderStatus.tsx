'use client';

import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Box,
} from '@mui/material';
import { Order, OrderStatus as OrderStatusType } from '@/types';

interface OrderStatusProps {
    open: boolean;
    onClose: () => void;
    order: Order | null;
}

const statusSteps: OrderStatusType[] = [
    'Order Received',
    'Preparing',
    'Out for Delivery',
    'Delivered',
];

export default function OrderStatus({
    open,
    onClose,
    order,
}: OrderStatusProps) {
    const [currentStatus, setCurrentStatus] = useState<OrderStatusType>(
        'Order Received'
    );

    useEffect(() => {
        if (order) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentStatus(order.status);

            // Poll for status updates
            const interval = setInterval(() => {
                const updatedOrder = JSON.parse(
                    localStorage.getItem('food-delivery-orders') || '[]'
                ).find((o: Order) => o.id === order.id);

                if (updatedOrder) {
                    setCurrentStatus(updatedOrder.status);
                }
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [order]);

    if (!order) return null;

    const activeStep = statusSteps.indexOf(currentStatus);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Order Status</DialogTitle>
            <DialogContent>
                <Box className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <Typography variant="body2" color="text.secondary" className="mb-1">
                        Order ID: <span className="font-mono font-medium text-black">{order.id}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Total Amount: <span className="font-bold text-green-600">₹{order.totalAmount.toFixed(2)}</span>
                    </Typography>
                </Box>

                <Stepper activeStep={activeStep} alternativeLabel className="my-10">
                    {statusSteps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box className="mt-8">
                    <Typography variant="h6" className="mb-4 font-bold border-b pb-2">
                        Order Items
                    </Typography>
                    {order.items.map((item) => (
                        <Box key={item.id} className="flex justify-between mb-3 last:mb-0">
                            <Typography className="text-gray-700">
                                {item.name} <span className="text-gray-400">x {item.quantity}</span>
                            </Typography>
                            <Typography className="font-medium">
                                ₹{(item.price * item.quantity).toFixed(2)}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Box className="mt-8">
                    <Typography variant="h6" className="mb-4 font-bold border-b pb-2">
                        Delivery Details
                    </Typography>
                    <Box className="space-y-2">
                        <Typography variant="body2">
                            <span className="font-semibold w-20 inline-block">Name:</span> {order.deliveryDetails.name}
                        </Typography>
                        <Typography variant="body2">
                            <span className="font-semibold w-20 inline-block">Address:</span> {order.deliveryDetails.address}
                        </Typography>
                        <Typography variant="body2">
                            <span className="font-semibold w-20 inline-block">Phone:</span> {order.deliveryDetails.phone}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}