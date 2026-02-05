'use client';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';
import { ReactNode } from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ea580c', // orange-600 matching Tailwind
        },
        background: {
            default: '#f9fafb', // gray-50
        },
    },
    typography: {
        fontFamily: 'inherit', // Inherit from Tailwind/Globals
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '0.5rem',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '1rem',
                },
                elevation1: {
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                },
            },
        },
    },
});

export default function ThemeRegistry({ children }: { children: ReactNode }) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
