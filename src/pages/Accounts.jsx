import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { accounts, money } from '../data.js'

function AccountCard({ a }) {
  return (
    <div className={'acct-card ' + a.color}>
      <div className="row-between">
        <span className="chip-gold" />
        <span className="badge-live">{a.type === 'Live' ? 'LIVE' : 'DEMO'}</span>
      </div>
      <h4>{a.name}</h4>
      <small className="code">{a.platform} · {a.code}</small>

      <p className="acct-balance">{money(a.symbol, a.balance)}</p>
      <small>Balance</small>

      <div className="acct-split">
        <div>
          <small className="tiny">UNREALISED</small>
          <b className="mint">{a.unrealised >= 0 ? '+' : ''}{money(a.symbol, a.unrealised)}</b>
        </div>
        <div>
          <small className="tiny">EQUITY</small>
          <b>{money(a.symbol, a.equity)}</b>
        </div>
      </div>

      <div className="row-between tiny-row">
        <span>Free margin</span>
        <span>{money(a.symbol, a.freeMargin)} · {a.marginPct}%</span>
      </div>
      <div className="bar"><div style={{ width: a.marginPct + '%' }} /></div>

      <div className="acct-buttons">
        <Link to="/fund" className="mint-btn">Fund</Link>
        <Link to="/transfer" className="ghost-btn">Transfer</Link>
        <button className="ghost-btn outline">Details</button>
      </div>
      <p className="updated">Updated {a.updated}</p>
    </div>
  )
}

function Section({ label, title, count, list }) {
  return (
    <section className="acct-section">
      <div className="row-between">
        <div className="section-title">
          <span className="section-icon"><i /></span>
          <div>
            <small className="eyebrow muted">{label}</small>
            <h3>{title}</h3>
          </div>
        </div>
        <small className="muted-text">{count}</small>
      </div>
      <div className="acct-grid">
        {list.map((a) => <AccountCard key={a.id} a={a} />)}
      </div>
    </section>
  )
}

export default function Accounts() {
  const usd = accounts.filter((a) => a.currency === 'USD' && a.type === 'Live')
  const eur = accounts.filter((a) => a.currency === 'EUR')
  const demo = accounts.filter((a) => a.type === 'Demo')

  return (
    <>
      <PageHeader
        eyebrow="Accounts"
        title="Your broker accounts"
        subtitle="Balances, funding and onboarding stay in this CRM view. No dealing or order tools."
      >
        <Link to="/open-account" className="btn primary">Open account</Link>
        <Link to="/transfer" className="btn light">Transfer</Link>
      </PageHeader>

      <section className="summary-card">
        <div className="summary-grid">
          <div className="summary-item">
            <small className="tiny">USD HELD</small>
            <p>$13,450.00</p>
            <small>Across 2 live accounts</small>
            <div className="split-bar"><div style={{ width: '93%' }} /></div>
            <div className="split-legend">
              <span><i className="sq a" />Live USD <b>93%</b></span>
              <span><i className="sq b" />Raw Spread USD <b>7%</b></span>
            </div>
          </div>
          <div className="summary-item">
            <small className="tiny">EUR HELD</small>
            <p>€820.00</p>
            <small>Across 1 live account</small>
          </div>
          <div className="summary-item">
            <small className="tiny">LIVE ACCOUNTS</small>
            <p className="mid">3</p>
            <small>2 currencies</small>
          </div>
          <div className="summary-item">
            <small className="tiny">PRACTICE</small>
            <p className="mid">1</p>
            <small>demo account</small>
          </div>
        </div>
        <p className="summary-note">
          Unrealised P/L is shown per account. Currencies are never added together — the portal holds no exchange rates.
        </p>
      </section>

      <Section label="Balances" title="USD accounts" count="2 live accounts" list={usd} />
      <Section label="Balances" title="EUR accounts" count="1 live account" list={eur} />
      <Section label="Practice" title="Demo accounts" count="1 demo account" list={demo} />
    </>
  )
}
