import { useState } from 'react'
import { Banknote, Check, ArrowUp, ArrowDown, DollarSign, CircleDot, ArrowLeftRight, ChevronDown } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { money } from '../data.js'

const methods = [
  { id: 'card', name: 'Visa / Mastercard', fee: 1.5, currencies: ['USD', 'EUR'], min: 10, max: 500000 },
  { id: 'usdt', name: 'USDT (TRC-20)', fee: 0.5, currencies: ['USD'], min: 10, max: 500000 },
]
const symbols = { USD: '$', EUR: '€' }
const quickAmounts = [100, 250, 500, 1000]

export default function Fund() {
  const [mode, setMode] = useState('deposit')
  const [methodId, setMethodId] = useState('card')
  const [amount, setAmount] = useState('100.00')
  const [currency, setCurrency] = useState('USD')
  const [sent, setSent] = useState(false)

  const method = methods.find((m) => m.id === methodId)
  const sym = symbols[currency]
  const value = parseFloat(amount) || 0
  const fee = (value * method.fee) / 100
  const net = value - fee
  const invalid = value < method.min || value > method.max
  const isDeposit = mode === 'deposit'

  function pickMethod(m) {
    setMethodId(m.id)
    if (!m.currencies.includes(currency)) setCurrency(m.currencies[0])
    setSent(false)
  }

  return (
    <>
      <PageHeader
        eyebrow="Fund"
        title="Cashier"
        subtitle="Choose a payment method, see every fee upfront and review the final amount before you submit."
      />

      {/* Funding overview */}
      <section className="card card-pad funding-overview">
        <div>
          <small className="eyebrow muted">Funding overview</small>
          <h3>Available balances</h3>
          <small className="muted-text">Currencies are shown separately.</small>
        </div>
        <div className="avail-tiles">
          <div className="tile">
            <small className="tiny">USD AVAILABLE</small>
            <p>$13,450.00</p>
            <small>2 linked accounts</small>
          </div>
          <div className="tile">
            <small className="tiny">EUR AVAILABLE</small>
            <p>€820.00</p>
            <small>1 linked account</small>
          </div>
        </div>
      </section>

      <div className="fund-grid">
        {/* ---------- Payment request form ---------- */}
        <section className="card card-pad">
          <small className="eyebrow muted">Cashier</small>
          <h3>New payment request</h3>

          <div className="segmented wide">
            <button className={isDeposit ? 'on' : ''} onClick={() => { setMode('deposit'); setSent(false) }}>Deposit</button>
            <button className={!isDeposit ? 'on' : ''} onClick={() => { setMode('withdraw'); setSent(false) }}>Withdraw</button>
          </div>

          <div className="steps">
            <div className="step"><span className="step-num">01</span><div><strong>Method</strong><small>{method.name}</small></div></div>
            <i />
            <div className="step"><span className="step-num">02</span><div><strong>Amount</strong><small>{money(sym, value)}</small></div></div>
            <i />
            <div className="step"><span className="step-num filled">03</span><div><strong>Review</strong><small>Ready to request</small></div></div>
          </div>

          <p className="field-label">Method</p>
          <div className="method-grid">
            {methods.map((m) => (
              <button key={m.id} className={'method' + (m.id === methodId ? ' active' : '')} onClick={() => pickMethod(m)}>
                <span className={'method-icon' + (m.id === 'usdt' ? ' gold' : '')}><Banknote size={16} /></span>
                <div>
                  <strong>{m.name}</strong>
                  <small>{m.currencies.join(' · ')}</small>
                </div>
                <b>{m.fee.toFixed(2)}%</b>
              </button>
            ))}
          </div>

          <p className="field-label">Amount</p>
          <div className="amount-row">
            <input
              className="amount-input"
              value={amount}
              inputMode="decimal"
              onChange={(e) => { setAmount(e.target.value.replace(/[^0-9.]/g, '')); setSent(false) }}
              onBlur={() => setAmount(value.toFixed(2))}
            />
            <div className="select-wrap">
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {method.currencies.map((c) => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown size={16} />
            </div>
          </div>
          <div className="quick-amounts">
            {quickAmounts.map((q) => (
              <button key={q} onClick={() => { setAmount(q.toFixed(2)); setSent(false) }}>{money(sym, q)}</button>
            ))}
          </div>

          <div className="calc">
            <div><small className="tiny">{isDeposit ? 'YOU SEND' : 'YOU REQUEST'}</small><b>{money(sym, value)}</b></div>
            <span className="op">−</span>
            <div><small className="tiny">FEE ({method.fee.toFixed(2)}%)</small><b>{money(sym, fee)}</b></div>
            <span className="op">=</span>
            <div className="credited">
              <small className="tiny">{isDeposit ? 'CREDITED' : 'YOU RECEIVE'}</small>
              <b>{money(sym, net)}</b>
            </div>
          </div>

          <div className="checks">
            <span><Check size={12} /> Fee shown upfront</span>
            <span><Check size={12} /> Currency-bound</span>
            <span><Check size={12} /> Broker reviewed</span>
          </div>

          {invalid && (
            <p className="error-text">
              Enter an amount between {money(sym, method.min)} and {money(sym, method.max)}.
            </p>
          )}
          {sent && (
            <p className="success-text">
              Your {isDeposit ? 'deposit' : 'withdrawal'} request was recorded for broker review.
            </p>
          )}

          <button className="btn primary full big" disabled={invalid} onClick={() => setSent(true)}>
            {isDeposit ? 'Request deposit' : 'Request withdrawal'}
          </button>
          <p className="foot-note">Requests are recorded for broker review. Nothing is sent to a payment provider from this screen.</p>
        </section>

        {/* ---------- Right column ---------- */}
        <div className="side-col">
          <section className="card card-pad">
            <small className="eyebrow muted">Available</small>
            <h3>Your balances</h3>
            <div className="bal-list">
              <div className="bal-item"><span className="cur-chip">USD</span><div><strong>Live USD</strong><small>USD</small></div><b>$12,450.00</b></div>
              <div className="bal-item"><span className="cur-chip">USD</span><div><strong>Raw Spread USD</strong><small>USD</small></div><b>$1,000.00</b></div>
              <div className="bal-item"><span className="cur-chip">EUR</span><div><strong>Live EUR</strong><small>EUR</small></div><b>€820.00</b></div>
            </div>
            <p className="foot-note">Requests carry a currency, not an account. Your broker allocates a deposit to the matching account.</p>
          </section>

          <section className="card card-pad">
            <small className="eyebrow muted">{method.name}</small>
            <h3>Limits</h3>
            <div className="limits">
              <div><span className="limit-icon"><ArrowUp size={14} /></span><span>Minimum</span><b>{money('$', method.min)}</b></div>
              <div><span className="limit-icon"><ArrowDown size={14} /></span><span>Maximum</span><b>{money('$', method.max)}</b></div>
              <div><span className="limit-icon"><DollarSign size={14} /></span><span>Fee</span><b>{method.fee.toFixed(2)}%</b></div>
              <div><span className="limit-icon"><CircleDot size={14} /></span><span>Currencies</span><b>{method.currencies.join(' · ')}</b></div>
              <div><span className="limit-icon"><ArrowLeftRight size={14} /></span><span>Direction</span><b>Deposit and withdraw</b></div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
