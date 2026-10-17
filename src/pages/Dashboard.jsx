import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus, Banknote, Download, ArrowLeftRight, ArrowUpRight, Clock, MessageSquare, Star,
} from 'lucide-react'
import { accounts, recentMovements, money } from '../data.js'
import LineChart from '../components/LineChart.jsx'
import Donut from '../components/Donut.jsx'

export default function Dashboard() {
  const [selectedId, setSelectedId] = useState('live-usd')
  const [view, setView] = useState('chart')
  const acc = accounts.find((a) => a.id === selectedId)

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Your workspace</p>
          <h1 className="big">Good evening, Dana.</h1>
          <p className="subtitle">Your accounts, activity and next steps. All in one place.</p>
        </div>
        <Link to="/open-account" className="btn light"><Plus size={14} /> Open account</Link>
      </div>

      <div className="quick-actions">
        <Link to="/fund" className="btn primary action"><Banknote size={16} /> Deposit <ArrowUpRight size={14} /></Link>
        <Link to="/fund" className="btn light action"><Download size={16} /> Withdraw <ArrowUpRight size={14} /></Link>
        <Link to="/transfer" className="btn light action"><ArrowLeftRight size={16} /> Transfer <ArrowUpRight size={14} /></Link>
      </div>

      <div className="dash-grid">
        {/* ----- Account overview ----- */}
        <section className="card overview">
          <div className="card-pad">
            <div className="row-between">
              <h3>Account overview</h3>
              <Link to="/accounts" className="link">All accounts <ArrowUpRight size={14} /></Link>
            </div>
            <div className="acc-tabs">
              {accounts.map((a) => (
                <button
                  key={a.id}
                  className={'acc-tab' + (a.id === selectedId ? ' active' : '')}
                  onClick={() => setSelectedId(a.id)}
                >
                  <strong>{a.name}</strong>
                  <b>{money(a.symbol, a.balance)}</b>
                  <small>{a.platform} <i>•</i> {a.type}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="card-pad top-border">
            <div className="balance-row">
              <div>
                <p className="muted-text">Balance <span className="pill">{acc.currency}</span></p>
                <p className="huge">{money(acc.symbol, acc.balance)}</p>
              </div>
              <div className="mini-stats">
                <div>
                  <small>Equity</small>
                  <strong>{money(acc.symbol, acc.equity)}</strong>
                </div>
                <div>
                  <small>Unrealised</small>
                  <strong className="pos">+{money(acc.symbol, acc.unrealised)}</strong>
                </div>
              </div>
            </div>

            <div className="row-between movements-head">
              <p>Recorded movements</p>
              <div className="segmented small">
                <button className={view === 'chart' ? 'on' : ''} onClick={() => setView('chart')}>Chart</button>
                <button className={view === 'activity' ? 'on' : ''} onClick={() => setView('activity')}>Activity</button>
              </div>
            </div>

            {view === 'chart' ? (
              <>
                <LineChart points={acc.chart} symbol={acc.symbol} />
                <div className="chart-x"><span>Sep 5</span><span>Sep 30</span></div>
              </>
            ) : (
              <div className="activity-list">
                {recentMovements.map((m) => (
                  <div className="list-row" key={m.title}>
                    <div><strong>{m.title}</strong><small>{m.date}</small></div>
                    <b className={m.amount.startsWith('+') ? 'pos' : 'neg'}>{m.amount}</b>
                  </div>
                ))}
              </div>
            )}

            <p className="note">Cash movements only. Not trading performance.</p>
            <div className="row-between foot-line">
              <small className="muted-text">Updated Oct 5</small>
              <Link to="/accounts" className="link">Account details <ArrowUpRight size={14} /></Link>
            </div>
          </div>
        </section>

        {/* ----- Right column ----- */}
        <div className="side-col">
          <section className="card dark-card">
            <div className="dark-head">
              <span className="round-icon"><Banknote size={16} /></span>
              <h3>Live balances</h3>
            </div>
            <div className="bal-block">
              <small>USD</small>
              <p className="big-num">$13,450.00</p>
              <small>Accounts: 2</small>
            </div>
            <div className="bal-block">
              <small>EUR</small>
              <p className="big-num">€820.00</p>
              <small>Accounts: 1</small>
            </div>
            <p className="dark-note">Currencies are shown separately. Practice balances are excluded.</p>
            <Link to="/accounts" className="dark-link">All accounts <ArrowUpRight size={14} /></Link>
          </section>

          <section className="card card-pad margin-card">
            <div className="row-between">
              <div>
                <h3>Margin overview</h3>
                <small className="muted-text">{acc.name}</small>
              </div>
              <Donut percent={acc.marginPct} />
            </div>
            <div className="margin-lines">
              <div className="row-between"><span><i className="dot green" />Free margin</span><b>{money(acc.symbol, acc.freeMargin)}</b></div>
              <div className="row-between"><span><i className="dot grey" />Margin in use</span><b>{money(acc.symbol, acc.marginUsed)}</b></div>
            </div>
          </section>
        </div>
      </div>

      {/* ----- Bottom row ----- */}
      <div className="triple-grid">
        <section className="card card-pad">
          <h3>What's open</h3>
          <div className="list-row with-icon">
            <span className="soft-icon"><Clock size={16} /></span>
            <div><strong>Fund requests in progress</strong><small>Awaiting broker review</small></div>
            <span className="count">1</span>
          </div>
          <div className="list-row with-icon">
            <span className="soft-icon"><MessageSquare size={16} /></span>
            <div><strong>Open support threads</strong><small>A reply may be waiting</small></div>
            <span className="count">1</span>
          </div>
        </section>

        <section className="card card-pad">
          <div className="row-between">
            <h3>Points activity</h3>
            <Link to="/rewards" className="link">Ledger →</Link>
          </div>
          <div className="list-row">
            <div><strong>Redeemed Education resource pack</strong><small>Oct 11</small></div>
            <b className="neg">-750</b>
          </div>
          <div className="list-row">
            <div><strong>Completed identity verification</strong><small>Oct 8</small></div>
            <b className="pos">+750</b>
          </div>
        </section>

        <section className="card card-pad points-card">
          <div className="row-between">
            <h3>Nexus Points</h3>
            <Star size={20} className="pos" />
          </div>
          <p className="huge points-num">1,450</p>
        </section>
      </div>
    </>
  )
}
