'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BaseContainer from '@/components/layout/container/base-container'
import { StackVertical } from '@/components/layout/layout-stack/layout-stack'
import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import { DynamicBreadcrumb } from "@/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle"
import { Button } from '@/components/ui/primitives/button'
import { Send } from 'lucide-react'
import { useToast } from '@/components/ui/toast/use-toast'

export default function ContactPage() {
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const data = await response.json().catch(() => ({}))
                throw new Error(data?.error || 'Failed to send message')
            }

            toast({
                title: "Message sent! 🚀",
                description: "Thanks for reaching out. I'll get back to you soon.",
            })

            setFormData({ name: '', phone: '', email: '', message: '' })
        } catch (error: any) {
            toast({
                title: "Something went wrong",
                description: error?.message || "Unable to send your message right now.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <BaseContainer size="md" paddingY="lg" className="min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <DynamicBreadcrumb 
                    items={[
                        { href: '/', label: 'Home', emoji: '👾' },
                        { label: 'Contact' }
                    ]}
                />
                <ThemeToggle />
            </div>

            <StackVertical gap="xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <TextHeading as="h1" className="text-4xl md:text-5xl font-bold">Contact</TextHeading>
                    <Text variant="muted">Get in touch with me. I will get back to you as soon as possible.</Text>
                </motion.div>

                <div className="w-full h-px bg-border/40" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-5"
                >
                    <div className="space-y-1">
                        <TextHeading as="h2" weight="bold">Send me a message</TextHeading>
                        <Text variant="muted" size="sm">Fill out the form below and I will get back to you as soon as possible.</Text>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Text size="sm" weight="medium">Name *</Text>
                                <input
                                    required
                                    type="text"
                                    placeholder="Your full name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full py-2.5 px-3.5 rounded-lg border border-border/20 bg-transparent focus:ring-2 focus:ring-accent/40 focus:border-transparent outline-none transition-all duration-300 text-sm"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Text size="sm" weight="medium">Phone *</Text>
                                <input
                                    required
                                    type="tel"
                                    placeholder="+91 xxxxx xxxxx"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full py-2.5 px-3.5 rounded-lg border border-border/20 bg-transparent focus:ring-2 focus:ring-accent/40 focus:border-transparent outline-none transition-all duration-300 text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Text size="sm" weight="medium">Email *</Text>
                            <input
                                required
                                type="email"
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full py-2.5 px-3.5 rounded-lg border border-border/20 bg-transparent focus:ring-2 focus:ring-accent/40 focus:border-transparent outline-none transition-all duration-300 text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Text size="sm" weight="medium">Message *</Text>
                            <textarea
                                required
                                rows={4}
                                placeholder="Tell me about your project or just say hello..."
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full py-2.5 px-3.5 rounded-lg border border-border/20 bg-transparent focus:ring-2 focus:ring-accent/40 focus:border-transparent outline-none resize-none transition-all duration-300 text-sm"
                            />
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="rounded-full bg-accent hover:bg-accent/90 text-white px-8 h-10 text-sm font-medium shadow-md shadow-accent/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Send className="w-3.5 h-3.5 mr-2" />
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </form>
                </motion.div>
            </StackVertical>
        </BaseContainer>
    )
}
