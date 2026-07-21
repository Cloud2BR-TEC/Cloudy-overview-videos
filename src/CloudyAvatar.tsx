import { useEffect, useState } from 'react'

// Mouth shapes as SVG path d-strings cycling through talking frames
// Each frame represents a different mouth opening (closed → open → closed)
const TALK_FRAMES = [
  // 0 – neutral smile
  { d: 'M52 87 Q60 91 68 87', fill: 'none', ry: 0 },
  // 1 – slight opening "ih"
  { d: 'M53 86 Q60 91 67 86 Q60 88 53 86Z', fill: '#d94f3d', ry: 2 },
  // 2 – open "ah"
  { d: 'M52 85 Q60 93 68 85 Q60 90 52 85Z', fill: '#c94030', ry: 4 },
  // 3 – wide "aah"
  { d: 'M52 84 Q60 95 68 84 Q60 91 52 84Z', fill: '#be3828', ry: 5.5 },
  // 4 – "oo"
  { d: 'M55 85 Q60 93 65 85 Q60 90 55 85Z', fill: '#c94030', ry: 4 },
  // 5 – closing "ih"
  { d: 'M53 86 Q60 91 67 86 Q60 88 53 86Z', fill: '#d94f3d', ry: 2 },
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
    if (!speaking) {
      setFrame(0)
      return
    }
    const interval = window.setInterval(() => {
      setFrame((f) => (f + 1) % TALK_FRAMES.length)
    }, 90)
    return () => window.clearInterval(interval)
  }, [speaking])

  const mouth = TALK_FRAMES[frame]
  const showTeeth = frame >= 2

  // unique clip-path id to avoid conflicts when multiple instances render
  const clipId = `badge-clip-${size}`
  const mouthClipId = `mouth-clip-${size}`

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible' }}
      aria-label="Cloudy avatar"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="60" cy="60" r="56" />
        </clipPath>
        <radialGradient id="badge-bg" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#3991e0" />
          <stop offset="100%" stopColor="#1050a0" />
        </radialGradient>
        {showTeeth && (
          <clipPath id={mouthClipId}>
            <path d={mouth.d} />
          </clipPath>
        )}
      </defs>

      {/* Circular badge background */}
      <circle cx="60" cy="60" r="58" fill="url(#badge-bg)" />
      <circle cx="60" cy="60" r="57" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />

      <g clipPath={`url(#${clipId})`}>
        {/* ── Cloud body ── */}
        <circle cx="44" cy="83" r="23" fill="#f0f8ff" />
        <circle cx="60" cy="75" r="26" fill="#f0f8ff" />
        <circle cx="76" cy="83" r="23" fill="#f0f8ff" />
        <circle cx="51" cy="70" r="21" fill="#f0f8ff" />
        <circle cx="69" cy="69" r="20" fill="#f0f8ff" />
        {/* Fill bottom gap */}
        <rect x="22" y="83" width="76" height="34" fill="#f0f8ff" />

        {/* ── Graduation cap ── */}
        {/* Board (mortarboard flat top) */}
        <g transform="translate(60,44) rotate(-2)">
          {/* cap dome */}
          <ellipse cx="0" cy="4" rx="17" ry="8" fill="#1a1a2e" />
          {/* flat top */}
          <rect x="-24" y="-4" width="48" height="9" rx="3" fill="#1a1a2e" />
          {/* Tassel string */}
          <line x1="24" y1="2" x2="30" y2="14" stroke="#f5a975" strokeWidth="2.2" strokeLinecap="round" />
          {/* Tassel end */}
          <circle cx="30" cy="15" r="3.5" fill="#f5a975" />
          <line x1="28" y1="18" x2="25" y2="24" stroke="#f5a975" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="30" y1="18" x2="31" y2="24" stroke="#f5a975" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="32" y1="18" x2="34" y2="23" stroke="#f5a975" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* ── Eyes ── */}
        {/* Glasses – left */}
        <circle cx="48" cy="77" r="11" fill="rgba(185,220,255,0.45)" stroke="#1e1e38" strokeWidth="2.8" />
        {/* Glasses – right */}
        <circle cx="72" cy="77" r="11" fill="rgba(185,220,255,0.45)" stroke="#1e1e38" strokeWidth="2.8" />
        {/* Bridge */}
        <line x1="59" y1="77" x2="61" y2="77" stroke="#1e1e38" strokeWidth="2.5" />
        {/* Left temple arm */}
        <line x1="37" y1="75" x2="40" y2="77" stroke="#1e1e38" strokeWidth="2" strokeLinecap="round" />
        {/* Right temple arm */}
        <line x1="83" y1="75" x2="80" y2="77" stroke="#1e1e38" strokeWidth="2" strokeLinecap="round" />
        {/* Pupils */}
        <circle cx="48" cy="77" r="4.5" fill="#1a1a2e" />
        <circle cx="72" cy="77" r="4.5" fill="#1a1a2e" />
        {/* Eye shine */}
        <circle cx="50" cy="75" r="1.8" fill="white" />
        <circle cx="74" cy="75" r="1.8" fill="white" />

        {/* ── Cheeks ── */}
        <circle cx="40" cy="86" r="7" fill="rgba(255,160,160,0.32)" />
        <circle cx="80" cy="86" r="7" fill="rgba(255,160,160,0.32)" />

        {/* ── Mouth ── */}
        {/* Inner mouth (dark cavity) when open */}
        {showTeeth && (
          <path d={mouth.d} fill="#8b1a1a" />
        )}
        {/* Teeth */}
        {showTeeth && (
          <rect
            x="54" y="85" width="12" height="5" rx="1"
            fill="white"
            clipPath={`url(#${mouthClipId})`}
          />
        )}
        {/* Mouth outline */}
        <path
          d={mouth.d}
          fill={mouth.fill}
          stroke="#b03020"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Speaking glow ring */}
        {speaking && (
          <circle
            cx="60" cy="60" r="57"
            fill="none"
            stroke="rgba(245,169,117,0.55)"
            strokeWidth="4"
          />
        )}
      </g>
    </svg>
  )
}
