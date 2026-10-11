import localFont from 'next/font/local'

// Local files keep preview and production builds independent of font CDNs.
export const displayFont = localFont({ src: '../../../public/fonts/flux.woff2', variable: '--font-display', display: 'swap' })
export const sansFont = localFont({ src: '../../../public/fonts/inter.woff2', variable: '--font-sans', display: 'swap' })
export const monoFont = localFont({ src: '../../../public/fonts/dm-mono.woff2', variable: '--font-mono', display: 'swap' })
export const handwritingFont = localFont({ src: '../../../public/fonts/handwriting.woff2', variable: '--font-handwriting', display: 'swap' })
