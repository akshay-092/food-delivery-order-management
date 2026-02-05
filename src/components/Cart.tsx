'use client';

import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Button,
    Divider,
    Box,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
} from '@mui/icons-material';
import { CartItem } from '@/types';

interface CartProps {
    open: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (itemId: string, quantity: number) => void;
    onRemoveItem: (itemId: string) => void;
    onCheckout: () => void;
}

export default function Cart({
    open,
    onClose,
    items,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
}: CartProps) {
    const totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box className="w-80 md:w-96 p-6 h-full flex flex-col">
                <Typography variant="h5" className="mb-6 font-bold">
                    Your Cart
                </Typography>

                {items.length === 0 ? (
                    <Typography color="text.secondary" className="text-center mt-10">Your cart is empty</Typography>
                ) : (
                    <>
                        <List className="flex-1 overflow-y-auto -mx-2 px-2">
                            {items.map((item, index) => (
                                <Box key={item.id}>
                                    <ListItem className="flex-col items-start py-4">
                                        <Box className="w-full flex justify-between items-start mb-3">
                                            <ListItemText
                                                primary={<Typography variant="subtitle1" className="font-semibold">{item.name}</Typography>}
                                                secondary={`₹${item.price.toFixed(2)}`}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={() => onRemoveItem(item.id)}
                                                color="error"
                                                className="mt-1"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>

                                        <Box className="w-full flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                                            <Box className="flex items-center gap-3">
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        onUpdateQuantity(item.id, item.quantity - 1)
                                                    }
                                                    disabled={item.quantity <= 1}
                                                    className="bg-white shadow-sm"
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography className="font-medium w-8 text-center">{item.quantity}</Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        onUpdateQuantity(item.id, item.quantity + 1)
                                                    }
                                                    className="bg-white shadow-sm"
                                                >
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                            <Typography className="font-bold">
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </ListItem>
                                    {index < items.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </List>

                        <Box className="pt-4 mt-auto">
                            <Divider className="mb-4" />
                            <Box className="mb-4">
                                <Typography variant="h6" className="flex justify-between font-bold">
                                    <span>Total:</span>
                                    <span>₹{totalAmount.toFixed(2)}</span>
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={onCheckout}
                                className="py-3 font-bold text-lg normal-case bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-lg transition-all"
                            >
                                Proceed to Checkout
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Drawer>
    );
}