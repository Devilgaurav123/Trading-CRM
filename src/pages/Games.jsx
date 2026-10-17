import { useState } from 'react'
import { ArrowUpRight, ArrowDownRight, Minus, CircleDot, RotateCw } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

const matches = [
  {
    id: 'market', tag: 'EURUSD', kind: 'MARKET PREDICTOR', level: 'BASIC', title: 'Market predictor',
    question: 'Where will EUR/USD finish today?', hint: 'Choose a direction before the prediction window closes.',
    cost: 120, xp: 50, counted: 100, split: [52, 31, 17],
    options: [{ label: 'Higher', kind: 'up' }, { label: 'Lower', kind: 'down' }, { label: 'Unchanged', kind: 'flat' }],
  },
  {
    id: 'calendar', tag: 'EVENT', kind: 'CALENDAR CHALLENGE', level: 'BASIC', title: 'Calendar challenge',
    question: 'Which event has the strongest scheduled market impact?', hint: 'Choose an option before the prediction window closes.',
    cost: 120, xp: 50, counted: 86, split: [48, 34, 18],
    options: [{ label: 'US CPI', kind: 'dot' }, { label: 'Rate decision', kind: 'dot' }, { label: 'Jobs report', kind: 'dot' }],
  },
  {
    id: 'bull', tag: 'XAUUSD', kind: 'BULL VS BEAR', level: 'BASIC', title: 'Bull vs Bear',
    question: 'What is the next directional move for gold?', hint: 'Choose an option before the prediction window closes.',
    cost: 120, xp: 50, counted: 64, split: [58, 42],
    options: [{ label: 'Bull', kind: 'up' }, { label: 'Bear', kind: 'down' }],
  },
  {
    id: 'target', tag: 'EURUSD', kind: 'PRICE TARGET', level: 'ADVANCED', title: 'Price target',
    question: "Set Friday's EUR/USD closing target.", hint: 'Choose an option before the prediction window closes.',
    cost: 180, xp: 80, counted: 72, split: [40, 35, 25],
    options: [{ label: 'Below 1.0800', kind: 'dot' }, { label: '1.0800 – 1.0900', kind: 'dot' }, { label: 'Above 1.0900', kind: 'dot' }],
  },
]

const boards = {
  Daily: {
    range: '18 Oct – 19 Oct · Asia/Dubai',
    rows: [
      { name: 'AtlasWave', score: '9 of 12 correct · 1,240 XP', pts: 820 },
      { name: 'MintFalcon', you: true, score: '8 of 11 correct · 1,100 XP', pts: 760 },
      { name: 'GulfSignal', score: '7 of 10 correct · 980 XP', pts: 690 },
      { name: 'CedarChart', score: '7 of 11 correct · 910 XP', pts: 610 },
    ],
  },
  Weekly: {
    range: '12 Oct – 19 Oct · Asia/Dubai',
    rows: [
      { name: 'GulfSignal', score: '31 of 40 correct · 4,310 XP', pts: 2840 },
      { name: 'AtlasWave', score: '29 of 41 correct · 4,020 XP', pts: 2610 },
      { name: 'MintFalcon', you: true, score: '27 of 38 correct · 3,880 XP', pts: 2490 },
      { name: 'CedarChart', score: '25 of 39 correct · 3,540 XP', pts: 2260 },
    ],
  },
  Monthly: {
    range: '1 Oct – 31 Oct · Asia/Dubai',
    rows: [
      { name: 'AtlasWave', score: '88 of 120 correct · 11,900 XP', pts: 7650 },
      { name: 'GulfSignal', score: '84 of 118 correct · 11,240 XP', pts: 7210 },
      { name: 'CedarChart', score: '80 of 119 correct · 10,420 XP', pts: 6720 },
      { name: 'MintFalcon', you: true, score: '72 of 99 correct · 9,860 XP', pts: 6330 },
    ],
  },
}

const icons = { up: ArrowUpRight, down: ArrowDownRight, flat: Minus, dot: CircleDot }
const splitColors = ['#4aa890', '#c8485a', '#7a8794']

export default function Games() {
  const [arenaId, setArenaId] = useState('market')
  // matches the user has entered. Market predictor starts as already entered (locked).
  const [entries, setEntries] = useState({ market: '' })
  const [pick, setPick] = useState('')
  const [tab, setTab] = useState('Daily')
  const [refreshes, setRefreshes] = useState(0)

  const arena = matches.find((m) => m.id === arenaId)
  const others = matches.filter((m) => m.id !== arenaId)
  const entered = arena.id in entries
  const chosen = entered ? entries[arena.id] : pick
  const openNow = matches.filter((m) => !(m.id in entries)).length
  const board = boards[tab]

  function selectMatch(id) {
    setArenaId(id)
    setPick('')
  }

  function enter() {
    if (!pick) return
    setEntries({ ...entries, [arena.id]: pick })
  }

  return (
    <>
      <PageHeader
        eyebrow="Games"
        title="Prediction arena"
        subtitle="Broker-branded educational games and pseudonymous leaderboards. Financial activity is never an input."
      />

      {/* ---------- Player profile ---------- */}
      <section className="card gm-profile">
        <div className="gm-name">
          <span className="gm-avatar">MF</span>
          <div>
            <div className="gm-title-row">
              <h2>MintFalcon</h2>
              <span className="rank-chip">Rank #2</span>
              <button className="change-btn" disabled>Change</button>
            </div>
            <small>Changes reopen 26 Oct 2026.</small>
          </div>
        </div>
        <div className="gm-stats">
          <div><small className="tiny">EXPERIENCE</small><p>1,100</p><small>XP earned</small></div>
          <div><small className="tiny">CORRECT</small><p>8</p><small>of 11 scored</small></div>
          <div><small className="tiny">ACCURACY</small><p>73%</p><small>lifetime</small></div>
          <div><small className="tiny">OPEN NOW</small><p>{openNow}</p><small>matches to enter</small></div>
        </div>
      </section>

      <div className="gm-grid">
        {/* ---------- Arena ---------- */}
        <section className="gm-arena">
          <div>
            <div className="gm-chips">
              <span className="mint">{arena.tag}</span>
              <span>{arena.kind}</span>
              <span className="outline">{arena.level}</span>
              {entered && <span className="mint">ENTERED</span>}
            </div>
            <h2>{arena.title}</h2>
            <p className="gm-question">{arena.question}</p>
            <p className="gm-hint">{arena.hint}</p>

            <div className="gm-options" style={{ gridTemplateColumns: `repeat(${arena.options.length}, 1fr)` }}>
              {arena.options.map((o) => {
                const Icon = icons[o.kind]
                return (
                  <button
                    key={o.label}
                    className={'gm-option ' + o.kind + (chosen === o.label ? ' on' : '')}
                    disabled={entered}
                    onClick={() => setPick(o.label)}
                  >
                    <span className="gm-ico"><Icon size={16} /></span>
                    {o.label}
                  </button>
                )
              })}
            </div>

            <div className="gm-foot">
              <div>
                <p className="gm-reward">◆ {arena.cost}</p>
                <small>+{arena.xp} XP if correct</small>
                <p className="gm-lock-text">{entered ? 'Locked. One entry per match.' : pick ? 'Ready to enter. One entry per match.' : 'Pick an option to enter.'}</p>
              </div>
              <button className={'gm-enter' + (!entered && pick ? ' ready' : '')} disabled={entered || !pick} onClick={enter}>
                {entered ? 'Prediction locked' : 'Enter prediction'}
              </button>
            </div>
          </div>

          <div>
            <div className="gm-time">
              <div className="gm-step"><small className="tiny">OPENED</small><strong>18 Oct, 00:00</strong></div>
              <div className="gm-step"><small className="tiny">ENTRIES CLOSE</small><strong>19 Oct, 00:00</strong><em>in 1d 0h</em></div>
              <div className="gm-step"><small className="tiny">RESULT PUBLISHED</small><strong>19 Oct, 12:00</strong></div>
            </div>

            <div className="gm-community">
              <div className="row-between">
                <h4>Community split</h4>
                <button className="gm-refresh" onClick={() => setRefreshes(refreshes + 1)}>Refresh</button>
              </div>
              <div className="gm-split-bar">
                {arena.split.map((s, i) => <div key={i} style={{ width: s + '%', background: splitColors[i] }} />)}
              </div>
              <div className="gm-split-legend" style={{ gridTemplateColumns: `repeat(${arena.options.length}, 1fr)` }}>
                {arena.options.map((o, i) => (
                  <div key={o.label}><small>{o.label}</small><b>{arena.split[i]}%</b></div>
                ))}
              </div>
              <small className="gm-counted">{arena.counted + refreshes} entries counted.</small>
            </div>
          </div>
        </section>

        {/* ---------- Leaderboard ---------- */}
        <section className="gm-arena gm-board">
          <div className="row-between">
            <h3>Leaderboard</h3>
            <button className="gm-round" onClick={() => setRefreshes(refreshes + 1)} aria-label="Refresh leaderboard"><RotateCw size={16} /></button>
          </div>
          <p className="gm-sub">PSEUDONYMOUS RANKING</p>

          <div className="gm-tabs">
            {Object.keys(boards).map((t) => (
              <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
          <small className="gm-range">{board.range}</small>

          {board.rows.map((r, i) => (
            <div key={r.name} className={'gm-row' + (r.you ? ' you' : '')}>
              <span className={'gm-rank r' + (i + 1)}>{i + 1}</span>
              <div>
                <strong>{r.name} {r.you && <em className="you-chip">YOU</em>}</strong>
                <small>{r.score}</small>
              </div>
              <b>◆ {r.pts.toLocaleString('en-US')}</b>
            </div>
          ))}
          <small className="gm-note">Rankings carry usernames only — never account numbers, balances or trading activity.</small>
        </section>
      </div>

      {/* ---------- Also open ---------- */}
      <section className="card card-pad">
        <div className="row-between">
          <div><small className="eyebrow muted">Also open</small><h3>{others.length} more matches</h3></div>
          <small className="muted-text gm-hide-mobile">Select a match to bring it into the arena above.</small>
        </div>
        <div className="gm-mini-grid">
          {others.map((m) => (
            <button key={m.id} className="gm-mini" onClick={() => selectMatch(m.id)}>
              <div className="gm-tags">
                <span>{m.tag}</span>
                <span className="out">{m.level}</span>
                {m.id in entries && <span>ENTERED</span>}
              </div>
              <strong>{m.title}</strong>
              <p>{m.question}</p>
              <div className="row-between gm-mini-foot">
                <div><b>◆ {m.cost}</b><small>+{m.xp} XP</small></div>
                <small>Closes 19 Oct, 00:00</small>
              </div>
            </button>
          ))}
        </div>
        <p className="foot-note gm-disclaimer">
          Predictions are educational and test your market judgement. They never place orders or change account controls, and financial activity is never an input, a stake or a tie-break.
        </p>
      </section>
    </>
  )
}
