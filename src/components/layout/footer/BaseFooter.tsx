'use client'

import { cn } from '@/lib/utils/utils'
import { monoFont } from '@/styles/fonts/fonts'
import { Github, Twitter, Mail, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Simple Kaggle SVG icon component
const Kaggle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
        <path d="M6.857 6.857v18.286h2.286v-7.429l2.857 3.857 2.857-3.857v7.429h2.286v-7.429l5.143 7.429h2.857l-6.286-9.143 6.286-9.143h-2.857l-5.143 7.429v-7.429h-2.286v7.429l-2.857-3.857-2.857 3.857v-7.429z" />
    </svg>
)

interface BaseFooterProps {
    color?: string;
    navigationLinks?: React.ReactNode;
    className?: string;
    showToTop?: boolean;
    showSectionName?: boolean;
    showSocialLinks?: boolean;
    showCopyright?: boolean;
}

export function BaseFooter({ 
    color = 'purple', 
    navigationLinks, 
    className,
    showToTop = true,
    showSectionName = true,
    showSocialLinks = true,
    showCopyright = true
}: BaseFooterProps) {
    const socialLinks = [
        { href: "mailto:hiteshofficial0001@gmail.com", icon: <Mail className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { href: "https://github.com/Hiteshydv001", icon: <Github className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { href: "https://x.com/tensor_nets", icon: <Twitter className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { href: "https://www.linkedin.com/in/hitesh-kumar-7b8a1b1b0/", icon: <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" /> },
        { href: "https://www.kaggle.com/hiteshkumar001", icon: <Kaggle className="w-3 h-3 sm:w-4 sm:h-4" /> }
    ]

    return (
        <footer className={cn("relative mt-auto pt-12", className)}>
            {/* Gradient Line */}
            <div className="relative w-full mb-8">
                <div className={cn(
                    "absolute inset-0 w-full",
                    "h-[1px]",
                    "bg-gradient-to-r",
                    color === 'purple' && [
                        "from-transparent via-purple-500/30 to-transparent",
                        "dark:via-purple-400/30"
                    ],
                    color === 'blue' && [
                        "from-transparent via-blue-500/30 to-transparent",
                        "dark:via-blue-400/30"
                    ],
                    color === 'green' && [
                        "from-transparent via-green-500/30 to-transparent",
                        "dark:via-green-400/30"
                    ]
                )} />
            </div>

            <div className={cn(
                monoFont.className,
                "w-full max-w-screen-md mx-auto px-4",
                "flex flex-col items-center gap-4 sm:gap-6",
                "text-sm text-muted-foreground/60"
            )}>
                {/* Navigation Links - First Row */}
                {navigationLinks && (showToTop || showSectionName) && (
                    <div className="flex flex-wrap items-center justify-center gap-x-3">
                        {navigationLinks}
                    </div>
                )}

                {/* Social Links and Copyright - Second Row */}
                {(showSocialLinks || showCopyright) && (
                    <div className="flex items-center justify-center gap-6 sm:gap-8">
                        {/* Social Links */}
                        {showSocialLinks && (
                            <div className="flex items-center gap-6">
                                {socialLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ 
                                            duration: 0.2,
                                            delay: index * 0.1 
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                                            className={cn(
                                                "block text-purple-400/80 hover:text-purple-400",
                                                "transition-all duration-200",
                                                "-m-2 p-2",
                                                "hover:bg-purple-400/10 rounded-md",
                                                "hover:shadow-md hover:shadow-purple-500/5"
                                            )}
                                        >
                                            {link.icon}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Copyright */}
                        {showCopyright && (
                            <motion.span 
                                className="text-[10px] sm:text-xs text-purple-400"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                © {new Date().getFullYear()} hitesh.ml
                            </motion.span>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom padding */}
            <div className="h-8" />
        </footer>
    )
} 