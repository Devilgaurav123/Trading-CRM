import { money } from '../data.js'

// Simple SVG line chart. Dots are normal HTML elements so they stay round.
export default function LineChart({ points, symbol }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1

  const coords = points.map((v, i) => ({
    x: (i / (points.length - 1)) * 100,
    y: 10 + (1 - (v - min) / range) * 80,
  }))
  const line = coords.map((c) => `${c.x},${c.y}`).join(' ')
  const area = `0,100 ${line} 100,100`

  return (
    <div className="chart">
      <div className="chart-y">
        <span>{money(symbol, max)}</span>
        <span>{money(symbol, (max + min) / 2)}</span>
        <span>{money(symbol, min)}</span>
      </div>
      <div className="chart-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="10" x2="100" y2="10" className="grid-line" />
          <line x1="0" y1="50" x2="100" y2="50" className="grid-line" />
          <line x1="0" y1="90" x2="100" y2="90" className="grid-line" />
          <polygon points={area} fill="url(#areaFill)" />
          <polyline points={line} fill="none" stroke="var(--primary)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        </svg>
        {coords.map((c, i) => (
          <span
            key={i}
            className={'chart-dot' + (i === coords.length - 1 ? ' last' : '')}
            style={{ left: c.x + '%', top: c.y + '%' }}
          />
        ))}
      </div>
    </div>
  )
}
