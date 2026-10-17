import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

const types = [
  { id: 'live', env: 'Live', name: 'Standard USD', currency: 'USD', platform: 'MetaTrader 5' },
  { id: 'demo', env: 'Demo', name: 'Demo USD', currency: 'USD', platform: 'MetaTrader 5' },
]

export default function OpenAccount() {
  const [selectedId, setSelectedId] = useState('live')
  const [requested, setRequested] = useState(false)
  const selected = types.find((t) => t.id === selectedId)

  function choose(id) {
    setSelectedId(id)
    setRequested(false)
  }

  return (
    <>
      <PageHeader
        eyebrow="Open account"
        title="Choose an account type"
        subtitle="Traders see display name, currency and environment only. MT5 groups stay broker-side."
      />

      <div className="oa-grid">
        {types.map((t) => (
          <button key={t.id} className={'oa-type' + (t.id === selectedId ? ' active' : '')} onClick={() => choose(t.id)}>
            <span className={'oa-badge ' + t.id}>{t.env}</span>
            <strong>{t.name}</strong>
            <small>{t.currency} · {t.platform}</small>
          </button>
        ))}

        <section className="card card-pad oa-confirm">
          <small className="eyebrow muted">Confirmation</small>
          <h3>{selected.name}</h3>

          <div className="oa-tiles">
            <div><small className="tiny">ENVIRONMENT</small><b>{selected.env}</b></div>
            <div><small className="tiny">CURRENCY</small><b>{selected.currency}</b></div>
            <div><small className="tiny">PLATFORM</small><b>{selected.platform}</b></div>
          </div>

          <button className="btn primary full big" disabled={requested} onClick={() => setRequested(true)}>
            {requested ? 'Request sent' : 'Open account'}
          </button>
          <p className="oa-msg">
            {requested
              ? `Your ${selected.name} account request was recorded for broker review.`
              : 'Trader actions must use the exact portal origin.'}
          </p>
          <p className="oa-note">
            MT5 group routing stays broker-side. <Link to="/accounts">Back to accounts</Link>
          </p>
        </section>
      </div>
    </>
  )
}
