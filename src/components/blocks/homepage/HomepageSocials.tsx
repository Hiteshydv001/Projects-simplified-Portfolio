'use client'

import TextHeading from '@/components/ui/text-heading/text-heading'
import Text from '@/components/ui/text/text'
import Link from 'next/link'

export function HomepageSocials() {
    return (
        <div>
            <TextHeading as="h2" weight="bold">Socials</TextHeading>
            <Text>
                I’m always open to chat! Please feel free to ping me at <Link href="mailto:hiteshofficial0001@gmail.com" className="text-purple-500 hover:underline">hiteshofficial0001@gmail.com</Link> or <Link href="https://x.com/tensor_nets" target="_blank" className="text-purple-500 hover:underline">Twitter</Link> if you have any questions or just wanna talk.
            </Text>
        </div>

    )
} 