export interface TechnicalCertificate {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  skills: string[]
  image: string
  badgeImage?: string
  category: 'AI/ML' | 'Cloud' | 'Data' | 'Web Development' | 'Blockchain' | 'Other'
  slug: string
}

export interface NonTechnicalCertificate {
  id: string
  title: string
  organization: string
  role: string
  issueDate: string
  location: string
  image: string
  badgeImage?: string
  skills: string[]
  slug: string
  description: string
}
