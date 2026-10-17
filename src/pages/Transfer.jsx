import { useState } from 'react'
import { ArrowLeftRight, Check, ChevronDown } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { accounts, money } from '../data.js'

const liveAccounts = accounts.filter((a) => a.type === 'Live')
const shortCode = (a) => a.code.toLowerCase().replace('acct-', '')
const quick = [100, 500, 1000]

function Picker({ label, value, options, onChange, balanceLabel, balance }) {
  const acc = options.find((a) => a.id === value)
  return (
    <div>
      <p className="field-label">{label}</p>
      <div className="picker">
        <span className="cur-chip">{acc ? acc.currency : '—'}</span>
        <div>
          <strong>{acc ? acc.name : 'No compatible account'}</strong>
          <small>{acc ? `MT5 · ${shortCode(acc)}` : 'Same currency required'}</small>
        </div>
        <ChevronDown size={16} />
        <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
          {options.length === 0 && <option value="">None</option>}
          {options.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>
      <div className="row-between picker-balance">
        <small>{balanceLabel}</small>
        <b>{acc ? money(acc.symbol, balance) : '—'}</b>
      </div>
    </div>
  )
}

export default function Transfer() {
  // balances live in this page's state so a confirmed transfer updates them
  const [balances, setBalances] = useState(Object.fromEntries(liveAccounts.map((a) => [a.id, a.balance])))
  const [fromId, setFromId] = useState('live-usd')
  const [toId, setToId] = useState('raw-usd')
  const [amount, setAmount] = useState('100.00')
  const [done, setDone] = useState(false)

  const from = liveAccounts.find((a) => a.id === fromId)
  const to = liveAccounts.find((a) => a.id === toId)
  const toOptions = liveAccounts.filter((a) => a.id !== fromId && a.currency === from.currency)

  const value = parseFloat(amount) || 0
  const fromBalance = balances[fromId]
  const toBalance = to ? balances[toId] : 0
  const valid = !!to && value > 0 && value <= fromBalance
  const sym = from.symbol

  function changeFrom(id) {
    const next = liveAccounts.find((a) => a.id === id)
    const options = liveAccounts.filter((a) => a.id !== id && a.currency === next.currency)
    setFromId(id)
    if (!options.find((a) => a.id === toId)) setToId(options[0] ? options[0].id : '')
    setDone(false)
  }

  function swap() {
    if (!to) return
    setFromId(toId)
    setToId(fromId)
    setDone(false)
  }

  function confirm() {
    setBalances({ ...balances, [fromId]: fromBalance - value, [toId]: toBalance + value })
    setAmount('')
    setDone(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Internal transfer"
        title="Move funds between live accounts"
        subtitle="Move settled funds between your own same-currency accounts with a full before-and-after balance preview."
      />

      <section className="tr-banner">
        <span className="tr-banner-icon"><ArrowLeftRight size={26} /></span>
        <div className="tr-banner-text">
          <small className="eyebrow muted">Account to account</small>
          <h3>Move settled funds with a clear preview</h3>
          <p className="muted-text">Choose two compatible accounts, review both resulting balances, then confirm once.</p>
        </div>
        <div className="tr-tiles">
          <div className="tr-tile"><small className="tiny">TRANSFER FEE</small><b>None</b></div>
          <div className="tr-tile"><small className="tiny">CURRENCY</small><b>{from.currency}</b></div>
          <div className="tr-tile"><small className="tiny">ELIGIBLE</small><b>{toOptions.length} account{toOptions.length === 1 ? '' : 's'}</b></div>
        </div>
      </section>

      <div className="tr-grid">
        {/* ---------- Details ---------- */}
        <section className="card card-pad">
          <div className="row-between">
            <small className="eyebrow muted">Transfer details</small>
            <small className="muted-text">Demonstration</small>
          </div>
          <h3>Select your route</h3>

          <div className="steps plain">
            <div className="step"><span className="step-num">1</span><strong>Accounts</strong></div>
            <i />
            <div className="step"><span className="step-num">2</span><strong>Amount</strong></div>
            <i />
            <div className="step"><span className="step-num filled">3</span><strong>Confirm</strong></div>
          </div>

          <div className="route-box">
            <div className="route">
              <Picker label="FROM ACCOUNT" value={fromId} options={liveAccounts} onChange={changeFrom}
                balanceLabel="Available now" balance={fromBalance} />
              <button className="swap-btn" onClick={swap} aria-label="Swap accounts"><ArrowLeftRight size={16} /></button>
              <Picker label="TO ACCOUNT" value={toId} options={toOptions} onChange={(id) => { setToId(id); setDone(false) }}
                balanceLabel="Current balance" balance={toBalance} />
            </div>
          </div>

          <div className="row-between amount-head">
            <p className="field-label">Amount to transfer</p>
            <small className="muted-text">{money(sym, fromBalance)} available</small>
          </div>
          <div className="tr-input">
            <span>{from.currency}</span>
            <input
              value={amount}
              inputMode="decimal"
              onChange={(e) => { setAmount(e.target.value.replace(/[^0-9.]/g, '')); setDone(false) }}
              onBlur={() => amount !== '' && setAmount(value.toFixed(2))}
              placeholder="0.00"
            />
          </div>
          <div className="quick-amounts">
            {quick.map((q) => (
              <button key={q} onClick={() => { setAmount(q.toFixed(2)); setDone(false) }}>{money(sym, q)}</button>
            ))}
            <button onClick={() => { setAmount(fromBalance.toFixed(2)); setDone(false) }}>Max</button>
          </div>

          <div className="checks left">
            <span><Check size={12} /> Same currency only</span>
            <span><Check size={12} /> No transfer fee</span>
            <span><Check size={12} /> Balance checked</span>
          </div>
        </section>

        {/* ---------- Review ---------- */}
        <section className="card card-pad">
          <div className="row-between">
            <small className="eyebrow muted">Review</small>
            <span className={'status ' + (valid ? 'active' : 'neutral')} style={{ marginTop: 0 }}>{valid ? 'Ready' : 'Check details'}</span>
          </div>
          <h3>Transfer summary</h3>

          <div className="tr-moving">
            <small className="tiny">YOU ARE MOVING</small>
            <p>{money(sym, value)}</p>
            <small>Fee {money(sym, 0)}</small>
          </div>

          <div className="tr-after">
            <small className="tiny">FROM · AFTER TRANSFER</small>
            <div className="row-between"><strong>{from.name}</strong><b>{money(sym, fromBalance - value)}</b></div>
          </div>
          <div className="tr-divider"><ArrowLeftRight size={12} /></div>
          <div className="tr-after">
            <small className="tiny">TO · AFTER TRANSFER</small>
            <div className="row-between"><strong>{to ? to.name : '—'}</strong><b>{to ? money(sym, toBalance + value) : '—'}</b></div>
          </div>

          <div className="tr-facts">
            <div><span>Exchange</span><b>Not required</b></div>
            <div><span>Transfer type</span><b>Internal</b></div>
            <div><span>Recorded by</span><b>Your broker</b></div>
          </div>

          {value > fromBalance && <p className="error-text">Amount is higher than the available balance.</p>}
          {!to && <p className="error-text">This account has no other account in the same currency.</p>}
          {done && <p className="success-text">Transfer confirmed. Balances were updated.</p>}

          <button className="btn primary full big" disabled={!valid} onClick={confirm}>Confirm transfer</button>
          <p className="foot-note center">Demonstration transfer — balances update locally after confirmation.</p>
        </section>
      </div>
    </>
  )
}
