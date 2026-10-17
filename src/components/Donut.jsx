// Small ring showing a percentage in the middle
export default function Donut({ percent, size = 88, stroke = 10, onDark = false }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="donut" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke}
          stroke={onDark ? 'rgba(255,255,255,0.15)' : 'var(--ring-track)'} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke}
          stroke={onDark ? '#6fd1b9' : 'var(--primary)'} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (c * percent) / 100} />
      </svg>
      <span>{percent}%</span>
    </div>
  )
}
