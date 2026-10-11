import { Cpu } from 'lucide-react'

// Integer heights avoid cross-runtime Math.sin precision differences during hydration.
const bars = Array.from({ length: 144 }, (_, index) => {
  const envelope = (Math.sin(index * .19) + 1) / 2
  return { x: index * 10 + 4, height: Math.round(5 + envelope * 20) }
})

export function SignalRibbon({ bottom = false }: { bottom?: boolean }) {
  return <div className={`signal-ribbon${bottom ? ' signal-ribbon-bottom' : ''}`} data-running="false" aria-hidden="true">
    <svg viewBox="0 0 1440 36" preserveAspectRatio="xMidYMid slice" focusable="false">
      <path className="signal-baseline" d="M0 18H1440" />
      {bars.map((bar, index) => <rect key={index} className={`signal-bar${index % 9 === 0 ? ' signal-bar-green' : ''}`} x={bar.x} y={18 - bar.height / 2} width="2.5" height={bar.height} rx="1.25" />)}
    </svg>
    <span className="signal-mark"><Cpu size={13} strokeWidth={1.6} /><span>AI / ML</span></span>
  </div>
}
