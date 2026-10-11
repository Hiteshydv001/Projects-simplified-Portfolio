import { StudioHeading, SelectionFrame, Sticker } from '@/components/studio/primitives'
import { Reveal } from '@/components/studio/motion'
import { ArrowUpRight } from 'lucide-react'

const exhibits = [
  { title: 'The first version.', url: 'https://hiteshydv001.github.io/portfolio.hitesh.aiml/', description: 'An early exploration of personal branding and GitHub Pages.' },
  { title: 'Finding a direction.', url: 'https://portfolio-hitesh-aiml.vercel.app/', description: 'A Vercel-hosted iteration focused on typography and layout.' },
  { title: 'Adding a little AI.', url: 'https://hitesh-bot-portfolio.vercel.app/', description: 'An interface built around AI and chatbot integration.' },
  { title: 'Keeping it simple.', url: 'https://hitesh-aiml.vercel.app/', description: 'A simpler approach to presenting engineering projects.' },
  { title: 'The notebook chapter.', url: 'https://hitesh-ml.vercel.app/', description: 'The previous chapter in this portfolio’s design and engineering.' },
]

export default function Portfolio() {
  return <div className="studio-page"><Reveal><StudioHeading note="a little time travel">Past selves</StudioHeading><p className="mb-16 max-w-xl">Every version taught me something. A small archive of the websites that came before this one.</p></Reveal>{exhibits.map((exhibit, index) => <Reveal key={exhibit.url} className="portfolio-exhibit"><div className="exhibit-copy"><div><Sticker color={['cyan','yellow','green','pink'][index % 4]}>Exhibit {String(index + 1).padStart(2, '0')}</Sticker><h2>{exhibit.title}</h2><p>{exhibit.description}</p></div><a href={exhibit.url} target="_blank" rel="noopener noreferrer" className="small-link">Open original site <ArrowUpRight size={16} /></a></div><SelectionFrame color="ink"><div className="exhibit-preview"><div className="exhibit-address">{new URL(exhibit.url).hostname}</div><iframe src={exhibit.url} title={exhibit.title} loading="lazy" sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer" /></div></SelectionFrame></Reveal>)}</div>
}
