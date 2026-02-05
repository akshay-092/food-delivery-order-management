'use client';

import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    TextField,
    Box,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { MenuItem, CartItem } from '@/types';

interface MenuListProps {
    onAddToCart: (item: CartItem) => void;
}

export default function MenuList({ onAddToCart }: MenuListProps) {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const response = await fetch('/api/menu');
            const data = await response.json();
            setMenuItems(data);

            // Initialize quantities
            const initialQuantities: { [key: string]: number } = {};
            data.forEach((item: MenuItem) => {
                initialQuantities[item.id] = 1;
            });
            setQuantities(initialQuantities);
        } catch (error) {
            console.error('Failed to fetch menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (itemId: string, value: number) => {
        if (value >= 1) {
            setQuantities({ ...quantities, [itemId]: value });
        }
    };

    const handleAddToCart = (item: MenuItem) => {
        const cartItem: CartItem = {
            ...item,
            quantity: quantities[item.id] || 1,
        };
        onAddToCart(cartItem);
    };

    if (loading) {
        return (
            <Box className="text-center py-8">
                <Typography>Loading menu...</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={4}>
            {menuItems.map((item) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                        <div className="relative h-56 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <Typography className="text-white font-medium text-sm">View Details</Typography>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <Typography variant="h6" className="font-bold text-slate-900 leading-tight">
                                    {item.name}
                                </Typography>
                                <span className="bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded text-sm">
                                    ₹{item.price.toFixed(2)}
                                </span>
                            </div>

                            <Typography variant="body2" className="text-slate-500 leading-relaxed mb-6 flex-1">
                                {item.description}
                            </Typography>

                            <div className="mt-auto border-t border-slate-50 pt-4">
                                <Box className="flex gap-3 items-center">
                                    <input
                                        type="number"
                                        value={quantities[item.id] || 1}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                        className="w-20 px-3 py-2 border-2 border-slate-200 rounded-lg text-center text-slate-900 font-semibold focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                                        min="1"
                                        placeholder="Qty"
                                    />

                                    <Button
                                        variant="contained"
                                        disableElevation
                                        startIcon={<AddIcon />}
                                        onClick={() => handleAddToCart(item)}
                                        fullWidth
                                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 rounded-lg normal-case shadow-none hover:shadow-lg transition-all"
                                    >
                                        Add
                                    </Button>
                                </Box>
                            </div>
                        </div>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
}