
'use client'

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes'

// You can use ThemeProviderProps directly, or define a type alias if needed
type ThemeProviderCustomProps = ThemeProviderProps;

export function ThemeProvider(props: ThemeProviderCustomProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            {...props}
        >
            {props.children}
        </NextThemesProvider>
    )
} 