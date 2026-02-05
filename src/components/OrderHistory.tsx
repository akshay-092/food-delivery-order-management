'use client';

import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Button,
    Divider,
    Box,
    Chip,
} from '@mui/material';
import { Order } from '@/types';

interface OrderHistoryProps {
    open: boolean;
    onClose: () => void;
    orders: Order[];
    onOrderClick: (order: Order) => void;
    onClearHistory: () => void;
}

export default function OrderHistory({
    open,
    onClose,
    orders,
    onOrderClick,
    onClearHistory,
}: OrderHistoryProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Order Received': return 'default';
            case 'Preparing': return 'warning';
            case 'Out for Delivery': return 'info';
            case 'Delivered': return 'success';
            default: return 'default';
        }
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box className="w-80 md:w-96 p-6 h-full flex flex-col">
                <Box className="flex justify-between items-center mb-6">
                    <Typography variant="h5" className="font-bold">
                        Order History
                    </Typography>
                    {orders.length > 0 && (
                        <Button
                            size="small"
                            color="error"
                            onClick={onClearHistory}
                            className="normal-case text-xs"
                        >
                            Clear All
                        </Button>
                    )}
                </Box>

                {orders.length === 0 ? (
                    <Typography color="text.secondary" className="text-center mt-10">You haven't placed any orders yet</Typography>
                ) : (
                    <List className="flex-1 overflow-y-auto">
                        {[...orders].reverse().map((order, index) => (
                            <Box key={order.id}>
                                <ListItem
                                    className="flex-col items-start py-4 px-2 hover:bg-slate-50 cursor-pointer rounded-lg transition-colors"
                                    onClick={() => onOrderClick(order)}
                                >
                                    <Box className="w-full flex justify-between items-center mb-2">
                                        <Typography variant="subtitle2" className="font-mono text-gray-500">
                                            #{order.id.split('-')[1]}
                                        </Typography>
                                        <Chip
                                            label={order.status}
                                            size="small"
                                            color={getStatusColor(order.status) as any}
                                            variant="outlined"
                                        />
                                    </Box>

                                    <Box className="w-full mb-2">
                                        {order.items.map((item) => (
                                            <Typography key={item.id} variant="body2" className="text-gray-600">
                                                {item.name} x {item.quantity}
                                            </Typography>
                                        ))}
                                    </Box>

                                    <Box className="w-full flex justify-between items-center">
                                        <Typography variant="caption" className="text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </Typography>
                                        <Typography className="font-bold text-orange-600">
                                            ₹{order.totalAmount.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </ListItem>
                                {index < orders.length - 1 && <Divider />}
                            </Box>
                        ))}
                    </List>
                )}
            </Box>
        </Drawer>
    );
}
