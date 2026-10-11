import type { Metadata } from 'next'
import { CertificateGallery } from '@/components/blocks/certificates/certificate-gallery'

export const metadata: Metadata = { title: 'Certificates', description: 'Professional certifications, technical credentials, and volunteer recognition.' }
export default function CertificatesPage() { return <div className="studio-page"><CertificateGallery /></div> }
