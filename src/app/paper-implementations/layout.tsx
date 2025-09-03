import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Paper_Implementations | Hitesh',
    description: 'Research paper implementations and deep dives into ML/AI papers',
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
