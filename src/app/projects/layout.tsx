import { ReactNode } from 'react'

interface ProjectsLayoutProps {
    children: ReactNode;
}

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
    return (
        <main className="min-h-screen bg-transparent">
            {children}
        </main>
    )
}
