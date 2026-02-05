'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
} from '@mui/material';
import { DeliveryDetails } from '@/types';

interface CheckoutFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (details: DeliveryDetails) => void;
}

export default function CheckoutForm({
    open,
    onClose,
    onSubmit,
}: CheckoutFormProps) {
    const [formData, setFormData] = useState<DeliveryDetails>({
        name: '',
        address: '',
        phone: '',
    });

    const [errors, setErrors] = useState<Partial<DeliveryDetails>>({});

    const handleChange = (field: keyof DeliveryDetails, value: string) => {
        setFormData({ ...formData, [field]: value });
        // Clear error when user types
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const validate = () => {
        const newErrors: Partial<DeliveryDetails> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onSubmit(formData);
            setFormData({ name: '', address: '', phone: '' });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Delivery Details</DialogTitle>
            <DialogContent>
                <Box className="flex flex-col gap-6 mt-4">
                    <TextField
                        label="Full Name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                        variant="outlined"
                        className="bg-gray-50"
                    />
                    <TextField
                        label="Delivery Address"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        error={!!errors.address}
                        helperText={errors.address}
                        variant="outlined"
                        className="bg-gray-50"
                    />
                    <TextField
                        label="Phone Number"
                        fullWidth
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        variant="outlined"
                        className="bg-gray-50"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" className="bg-orange-600 hover:bg-orange-700">
                    Place Order
                </Button>
            </DialogActions>
        </Dialog>
    );
}