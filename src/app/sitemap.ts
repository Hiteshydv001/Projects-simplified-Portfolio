import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/about', '/projects', '/research', '/experience', '/patents', '/certificates', '/resume', '/contact', '/ai-playground', '/portfolio']
  return routes.map(route => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: route === '/' ? 'weekly' : 'monthly', priority: route === '/' ? 1 : 0.7 }))
}
