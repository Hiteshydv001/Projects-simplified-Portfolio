import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = { title: 'Past portfolios', description: 'An archive of Hitesh Kumar’s previous portfolio websites.' }
export default function Layout({ children }: { children: ReactNode }) { return children }
