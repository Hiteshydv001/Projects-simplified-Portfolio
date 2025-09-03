import React from 'react';
import { Metadata } from 'next'

export const metadata = {
    title: 'Learning | Hitesh',
    description: 'My journey of learning ML and Math, documented week by week',
    openGraph: {
        title: 'Learning | Hitesh',
        description: 'My journey of learning ML and Math, documented week by week',
        type: 'website',
        images: [
            {
                url: '/learning/opengraph-image.png',
                width: 1200,
                height: 630,
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Learning | Hitesh',
        description: 'My journey of learning ML and Math, documented week by week',
        images: ['/learning/twitter-image.png'],
    }
};

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return children;
}