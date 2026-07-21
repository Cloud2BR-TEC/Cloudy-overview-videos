import { useEffect, useState } from 'react'

// Mouth shapes cycling through talking frames (viewBox 0 0 100 80)
const TALK_FRAMES = [
  { d: 'M36 62 Q50 67 64 62', fill: 'none' },
  { d: 'M37 61 Q50 67 63 61 Q50 65 37 61Z', fill: '#d94f3d' },
  { d: 'M36 60 Q50 70 64 60 Q50 67 36 60Z', fill: '#c94030' },
  { d: 'M36 59 Q50 72 64 59 Q50 68 36 59Z', fill: '#be3828' },
  { d: 'M38 60 Q50 70 62 60 Q50 67 38 60Z', fill: '#c94030' },
  { d: 'M37 61 Q50 67 63 61 Q50 65 37 61Z', fill: '#d94f3d' },
]

export default function CloudyAvatar({
  speaking = false,
  size = 78,
}: {
  speaking?: boolean
  size?: number
}) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (!speaking) { setFrame(0); return }
    const interval = window.setInterval(() => setFrame((f) => (f + 1) % TALK_FRAMES.length), 90)
    return () => window.clearInterval(interval)
  }, [speaking])

  const mouth = TALK_FRAMES[frame]
  const showTeeth = frame >= 2
  const mouthClipId = `mouth-clip-${size}`
  const filterId = `cloud-shadow-${size}`

  return (
    <svg
      viewBox="0 0 100 80"
      width={size}
      height={Math.round(size * 0.8)}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible' }}
      aria-label="Cloudy"
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation={speaking ? '3' : '2'}
            floodColor={speaking ? '#f5a975' : '#aac8d8'} floodOpacity="0.5" />
        </filter>
        {showTeeth && (
          <clipPath id={mouthClipId}>
            <path d={mouth.d} />
          </clipPath>
        )}
      </defs>

      {/* ── Cloud body ── */}
      <g filter={`url(#${filterId})`}>
        {/* Puffy bumps */}
        <circle cx="28" cy="52" r="18" fill="white" />
        <circle cx="50" cy="44" r="22" fill="white" />
        <circle cx="72" cy="52" r="18" fill="white" />
        <circle cx="38" cy="42" r="17" fill="white" />
        <circle cx="63" cy="41" r="16" fill="white" />
        {/* Flat bottom */}
        <rect x="10" y="52" width="80" height="24" rx="6" fill="white" />
      </g>

      {/* ── Graduation cap ── */}
      <g transform="translate(50,18) rotate(-3)">
        <ellipse cx="0" cy="5" rx="14" ry="7" fill="#1a1a2e" />
        <rect x="-20" y="-3" width="40" height="8" rx="3" fill="#1a1a2e" />
        <line x1="20" y1="2" x2="25" y2="12" stroke="#f5a975" strokeWidth="2" strokeLinecap="round" />
        <circle cx="25" cy="13" r="3" fill="#f5a975" />
        <line x1="23" y1="16" x2="21" y2="21" stroke="#f5a975" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="25" y1="16" x2="26" y2="21" stroke="#f5a975" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="27" y1="15" x2="29" y2="20" stroke="#f5a975" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* ── Glasses ── */}
      <circle cx="38" cy="55" r="10" fill="rgba(185,225,255,0.5)" stroke="#1e1e38" strokeWidth="2.5" />
      <circle cx="62" cy="55" r="10" fill="rgba(185,225,255,0.5)" stroke="#1e1e38" strokeWidth="2.5" />
      <line x1="48" y1="55" x2="52" y2="55" stroke="#1e1e38" strokeWidth="2.2" />
      <line x1="28" y1="53" x2="31" y2="55" stroke="#1e1e38" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="72" y1="53" x2="69" y2="55" stroke="#1e1e38" strokeWidth="1.8" strokeLinecap="round" />

      {/* ── Pupils ── */}
      <circle cx="38" cy="55" r="4" fill="#1a1a2e" />
      <circle cx="62" cy="55" r="4" fill="#1a1a2e" />
      <circle cx="40" cy="53" r="1.6" fill="white" />
      <circle cx="64" cy="53" r="1.6" fill="white" />

      {/* ── Cheeks ── */}
      <circle cx="30" cy="63" r="6" fill="rgba(255,160,160,0.3)" />
      <circle cx="70" cy="63" r="6" fill="rgba(255,160,160,0.3)" />

      {/* ── Mouth ── */}
      {showTeeth && <path d={mouth.d} fill="#8b1a1a" />}
      {showTeeth && (
        <rect x="44" y="62" width="12" height="4" rx="1" fill="white" clipPath={`url(#${mouthClipId})`} />
      )}
      <path d={mouth.d} fill={mouth.fill} stroke="#b03020" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
