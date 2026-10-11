'use client'

import Link from 'next/link'
import { Polaroid, Sticker, StudioButton, StudioHeading } from './primitives'
import { Draggable, Reveal } from './motion'


const pieces = [
  { image: '/images/playground-agents.svg', alt: 'Connected agents retrieving, reasoning, verifying, and responding', caption: 'agents working together', href: '/case-study/multi-rag-agent', color: 'cyan' },
  { image: '/images/playground-offline.svg', alt: 'Coffee and green hills for a break away from the keyboard', caption: 'a little away from the keyboard', href: '/about', color: 'green' },
  { image: '/images/playground-runner.svg', alt: 'A running agent learning to collect coins and avoid obstacles', caption: 'can an agent play this?', href: '/case-study/subway-surfer-rl-agent', color: 'yellow' },
  { image: '/images/playground-autograd.svg', alt: 'A computation graph with inputs, multiplication, and loss', caption: 'backprop, one node at a time', href: '/paper-implementations', color: 'pink' },
  { image: '/images/playground-vision.svg', alt: 'An eye inside a computer vision detection frame', caption: 'making machines see', href: '/case-study/guard-ai---remote-proctoring-system', color: 'yellow' },
  { image: '/images/playground-learning.svg', alt: 'An open book with a learning achievement badge', caption: 'always something new to learn', href: '/certificates/nvidia-gtc', color: 'cyan' },
]

export function StudioPlayground() {
  return <div className="studio-page"><Reveal className="playground-intro"><StudioHeading note="the things between the serious things">Experiments</StudioHeading><p>Experiments, learning, and a few snapshots along the way.</p><p className="mt-3 text-xs text-muted-foreground font-mono">Drag a photo around. Tap one to explore.</p></Reveal><div className="playground-board">{pieces.map(piece => <Draggable key={piece.href} className="board-piece"><Link href={piece.href}><Polaroid src={piece.image} alt={piece.alt} caption="a small side quest" /><Sticker color={piece.color}>{piece.caption}</Sticker></Link></Draggable>)}</div><div className="playground-tools"><Reveal><Sticker color="cyan">Try something</Sticker><h2>Peek inside a transformer.</h2><p>Explore attention, token relationships, and embeddings. Then draw something and see what the vision model thinks.</p><StudioButton href="/ai-playground">Open the AI lab</StudioButton></Reveal><Reveal><Sticker color="pink">Leave something</Sticker><h2>A wall of little notes.</h2><p>A thought, a question, or a hello. Add your own note to this corner of the internet.</p><StudioButton href="/leave_note_for_me">Leave a note</StudioButton></Reveal></div><Reveal className="playground-learning"><p className="hand-note">currently exploring</p><div className="project-tags">{['Traditional ML', 'Math for ML', 'Python', 'PyTorch & multidimensional tensors'].map(topic => <span key={topic}>{topic}</span>)}</div></Reveal></div>
}
