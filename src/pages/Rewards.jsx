import { Link } from 'react-router-dom'
import { User, Gamepad2, ArrowLeftRight, Info } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Donut from '../components/Donut.jsx'
import { challenges, catalogue, ledger } from '../data.js'

const icons = { user: User, game: Gamepad2, swap: ArrowLeftRight }

export default function Rewards() {
  return (
    <>
      <PageHeader
        eyebrow="Rewards"
        title="Challenges and rewards"
        subtitle="Finish broker-managed challenges, then redeem from the catalogue. Games live on their own page."
      >
        <Link to="/games" className="btn light">Open games</Link>
      </PageHeader>

      {/* Hero */}
      <section className="rewards-hero">
        <div className="hero-left">
          <Donut percent={58} size={100} stroke={10} onDark />
          <div className="hero-balance">
            <small className="tiny mintText">AVAILABLE BALANCE</small>
            <p><span className="diamond">◆</span> 1,450</p>
            <small>Nexus Points · AE</small>
          </div>
          <div className="next-up">
            <div className="row-between"><span>Next up · Platform VPS credit</span><b className="mintText">1,050 to go</b></div>
            <div className="hero-bar"><div style={{ width: '58%' }} /></div>
          </div>
        </div>
        <div className="hero-stats">
          <div><small>Can redeem now</small><p>2</p><small>of 3 in the catalogue</small></div>
          <div><small>Earned</small><p>2,200</p><small>all time</small></div>
          <div><small>Redeemed</small><p>750</p><small>all time</small></div>
          <div><small>On offer</small><p>1,100</p><small>from 3 open challenges</small></div>
        </div>
      </section>

      <div className="info-banner"><Info size={14} /> These records show the experience; reward requests remain disabled.</div>

      {/* Challenges */}
      <section className="card card-pad block">
        <div className="row-between">
          <div><small className="eyebrow muted">Challenges</small><h3>Progress you can finish</h3></div>
          <small className="muted-text">3 open · 4 listed</small>
        </div>
        <div className="challenge-grid">
          {challenges.map((c) => {
            const Icon = icons[c.icon]
            return (
              <div key={c.id} className={'challenge' + (c.status === 'Scheduled' ? ' scheduled' : '')}>
                <div className="challenge-top">
                  <span className="soft-icon"><Icon size={16} /></span>
                  <div>
                    <strong>{c.title}</strong>
                    <small>{c.meta}</small>
                    <span className={'status ' + c.status.toLowerCase()}>{c.status}</span>
                  </div>
                </div>
                <p className="challenge-text">{c.text}</p>
                <div className="row-between tiny-row"><span>{c.done}</span><b>{c.pct}%</b></div>
                <div className="bar light"><div style={{ width: c.pct + '%' }} /></div>
                <div className="row-between challenge-foot">
                  {typeof c.reward === 'number'
                    ? <b className="reward"><span className="diamond">◆</span> {c.reward}</b>
                    : <b className="reward link-color">{c.reward}</b>}
                  <button className="btn light small">{c.action}</button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Catalogue */}
      <section className="card card-pad block">
        <div className="row-between">
          <div><small className="eyebrow muted">Catalogue</small><h3>Redeem what you have earned</h3></div>
          <small className="muted-text">Selected by your broker</small>
        </div>
        <div className="catalogue-grid">
          {catalogue.map((item) => {
            const short = item.status.includes('Short')
            return (
              <div key={item.id} className={'catalogue-item' + (short ? ' short' : '')}>
                <div className="row-between">
                  <span className="soft-icon"><span className="diamond">◆</span></span>
                  <span className={'status ' + (short ? 'danger' : 'active')}>{item.status}</span>
                </div>
                <h4>{item.title}</h4>
                <p className="challenge-text">{item.text}</p>
                <div className="facts">
                  <div><small>Cost</small><b><span className="diamond">◆</span> {item.cost}</b></div>
                  <div><small>Inventory</small><b>{item.inventory}</b></div>
                  <div><small>Approval</small><b>{item.approval}</b></div>
                  <div><small>Available until</small><b>{item.until}</b></div>
                </div>
                <p className="foot-note">
                  {short
                    ? <>Finish an open challenge to reach <span className="diamond">◆</span> 2,500.</>
                    : "Reward requests open once your broker's Client API is connected."}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Requests + ledger */}
      <div className="req-grid">
        <section className="card card-pad">
          <small className="eyebrow muted">Requests</small>
          <h3>Your redemptions</h3>
          <div className="list-row">
            <div><strong>Education resource pack</strong><small><span className="diamond">◆</span> 750 · fulfilled 12 Oct</small></div>
            <span className="status active">Fulfilled</span>
          </div>
        </section>

        <section className="card card-pad">
          <div className="row-between">
            <div><small className="eyebrow muted">Ledger</small><h3>Every change, itemised</h3></div>
            <small className="muted-text">Append-only</small>
          </div>
          {ledger.map((l) => (
            <div className="list-row" key={l.title}>
              <div><strong>{l.title}</strong><small>{l.date}</small></div>
              <b className={l.points < 0 ? 'neg' : 'pos'}>{l.points > 0 ? '+' : ''}{l.points}</b>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}
