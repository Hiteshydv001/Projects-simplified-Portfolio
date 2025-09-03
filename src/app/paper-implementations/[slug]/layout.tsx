import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Paper_Implementation',
    description: 'Detailed implementation and explanation of ML/AI research papers',
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
