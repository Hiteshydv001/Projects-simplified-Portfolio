import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'

export const displayFont = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-display',
    display: 'swap',
})

export const sansFont = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-sans',
    display: 'swap',
})

export const monoFont = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-mono',
    display: 'swap',
})