import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  output: 'standalone',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/CV_Hitesh_Kumar.pdf',
        destination: '/resume',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/learning/weekly-reflections/week-:num',
        destination: '/learning/weekly-reflections/[week]?week=week-:num',
      },
    ]
  },
}
 
const withMDX = createMDX({
})
 
export default withMDX(nextConfig)
