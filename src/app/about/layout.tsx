import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Me',
    description: 'Learn more about me and my work',
    openGraph: {
        title: 'About Me',
        description: 'Learn more about me and my work',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Me',
        description: 'Learn more about me and my work',
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 