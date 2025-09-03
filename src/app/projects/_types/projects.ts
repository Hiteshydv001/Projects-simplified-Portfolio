export interface Project {
  id: string
  title: string
  summary: string
  description: string
  image: string
  technologies: string[]
  features?: string[]
  githubUrl?: string
  demoUrl?: string
  category: 'featured' | 'other'
}
