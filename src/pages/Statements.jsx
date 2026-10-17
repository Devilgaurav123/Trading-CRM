import { useState } from 'react'
import { FileText, Clock } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// [year, monthIndex, currencies, pending?]  newest first
const periods = [
  [2026, 9, ['USD', 'EUR'], true],
  [2026, 8, ['USD', 'EUR']], [2026, 7, ['USD', 'EUR']], [2026, 6, ['USD', 'EUR']], [2026, 5, ['USD', 'EUR']],
  [2026, 4, ['USD', 'EUR']], [2026, 3, ['USD', 'EUR']], [2026, 2, ['USD', 'EUR']], [2026, 1, ['USD', 'EUR']],
  [2026, 0, ['USD']],
  [2025, 11, ['USD', 'EUR']], [2025, 10, ['USD', 'EUR']], [2025, 9, ['USD']],
]

// turn the list above into one row per statement
const statements = []
periods.forEach(([year, m, currencies, pending]) => {
  currencies.forEach((currency) => {
    const issueYear = m === 11 ? year + 1 : year
    const issueMonth = (m + 1) % 12
    statements.push({
      id: `${year}-${m}-${currency}`,
      year, currency, pending: !!pending,
      title: `${months[m]} ${year}`,
      issued: `${short[issueMonth]} 1, ${issueYear}`,
    })
  })
})

function download(s) {
  const text = [
    'HX Nexus — account statement (demo)',
    `Period: ${s.title}`,
    `Account currency: ${s.currency}`,
    `Issued: ${s.issued}`,
    '',
    'This is a demonstration file. A real statement is a broker record.',
  ].join('\n')
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `statement-${s.id}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

export default function Statements() {
  const [filter, setFilter] = useState('All')

  const ready = statements.filter((s) => !s.pending).length
  const pending = statements.filter((s) => s.pending).length
  const years = [...new Set(statements.map((s) => s.year))]
  const shown = statements.filter((s) => filter === 'All' || s.currency === filter)
  const latest = statements.find((s) => !s.pending && s.currency === 'USD')

  return (
    <>
      <PageHeader
        eyebrow="Statements"
        title="Account statements"
        subtitle="Monthly digests of activity, funding and fees, issued after each month closes."
      >
        <button className="btn primary" onClick={() => window.print()}>Generate PDF</button>
      </PageHeader>

      <div className="sp-pills">
        <span className="sp-pill"><b>{ready}</b> ready to download</span>
        <span className="sp-pill"><b>{pending}</b> pending</span>
        <span className="sp-pill"><b>{years.length}</b> years on file</span>
      </div>

      <div className="st-grid">
        <section className="card card-pad">
          <div className="row-between">
            <div>
              <small className="eyebrow muted">Archive</small>
              <h3>Issued periods</h3>
            </div>
            <div className="segmented small">
              {['All', 'EUR', 'USD'].map((f) => (
                <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>

          <div className="st-list">
            {years.map((y) => {
              const rows = shown.filter((s) => s.year === y)
              if (rows.length === 0) return null
              return (
                <div key={y}>
                  <p className="st-year"><b>{y}</b> {rows.length} periods</p>
                  {rows.map((s) => (
                    <div className="st-row" key={s.id}>
                      <span className={'st-icon' + (s.pending ? ' pending' : '')}>
                        {s.pending ? <Clock size={16} /> : <FileText size={16} />}
                      </span>
                      <div>
                        <strong>{s.title}</strong>
                        <small>{s.currency} · {s.pending ? 'available after month-end settlement' : `issued ${s.issued}`}</small>
                      </div>
                      {s.pending
                        ? <span className="status scheduled" style={{ marginTop: 0 }}>Pending</span>
                        : <button className="btn primary" onClick={() => download(s)}>Download</button>}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </section>

        <div className="side-col">
          <section className="card card-pad">
            <small className="eyebrow muted">Most recent</small>
            <h3 className="st-recent-title">{latest.title}</h3>
            <small className="st-recent-sub">{latest.currency} · issued {latest.issued}</small>
            <p className="muted-text st-recent-text">Monthly activity, funding and fee summary for your {latest.currency} account.</p>
            <button className="btn primary full big" onClick={() => download(latest)}>Download {latest.title}</button>
          </section>

          <section className="card card-pad">
            <small className="eyebrow muted">About these documents</small>
            <h3>What you receive</h3>
            <ul className="st-bullets">
              <li>A statement summarises activity, funding and fees for one calendar month on one account currency.</li>
              <li>Every figure is a broker record. The portal displays them and never recomputes them.</li>
              <li>The PDF carries your broker's brand pack and legal name, not this portal's.</li>
              <li>A period becomes available once month-end settlement completes, which is why the current month reads as pending.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}
