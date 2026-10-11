import type { Metadata } from 'next'
import { StudioAnalytics } from '@/components/studio/analytics'

export const metadata: Metadata = { title: 'Analytics', description: 'A public look at visitors and page views across Hitesh Kumar’s portfolio.' }
export default function AnalyticsPage() { return <StudioAnalytics /> }
