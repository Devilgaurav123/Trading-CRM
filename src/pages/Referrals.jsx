import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'

const CODE = 'HX-ALEX-4821'
const LINK = 'https://trader.hxnexus.com/register?ref=' + CODE
const SHARE_TEXT = 'Join me on HX Nexus: ' + LINK

const invites = [
  { letter: 'J', email: 'j***@example.com', date: 'Oct 5, 2026', status: 'Funded' },
  { letter: 'S', email: 's***@mail.test', date: 'Sep 28, 2026', status: 'Registered' },
  { letter: 'M', email: 'm***@domain.test', date: 'Sep 23, 2026', status: 'Invited' },
]

const stats = { invited: 7, registered: 2, funded: 2 }

export default function Referrals() {
  const [copied, setCopied] = useState('')

  async function copy(text, key) {
    try {
      await navigator.clipboard.writeText(text)
    } catch (e) {
      // clipboard can be blocked on http pages; the button still gives feedback
    }
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  const pct = (n) => Math.round((n / stats.invited) * 100)

  return (
    <>
      <PageHeader
        eyebrow="Referrals"
        title="Share your invite"
        subtitle="Invite friends with your broker referral code. Whether an invite counts as funded follows your broker's attribution rules."
      />

      <section className="rf-card">
        <div>
          <small className="tiny rf-label">YOUR INVITE CODE</small>
          <div className="rf-code-row">
            <h2>{CODE}</h2>
            <button className="rf-mint" onClick={() => copy(CODE, 'code')}>{copied === 'code' ? 'Copied' : 'Copy code'}</button>
          </div>

          <div className="rf-link">
            <span>{LINK}</span>
            <button className="rf-mint" onClick={() => copy(LINK, 'link')}>{copied === 'link' ? 'Copied' : 'Copy link'}</button>
          </div>

          <div className="rf-share">
            <small className="tiny rf-label">SHARE VIA</small>
            <a href={`mailto:?subject=${encodeURIComponent('Your HX Nexus invite')}&body=${encodeURIComponent(SHARE_TEXT)}`}>Email</a>
            <a href={`sms:?&body=${encodeURIComponent(SHARE_TEXT)}`}>Message</a>
            <a href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>

        <div className="rf-stats">
          <div>
            <div className="row-between"><b>Invited</b><span className="rf-num">{stats.invited}</span></div>
            <div className="rf-bar"><div style={{ width: '100%', background: '#8b9aa0' }} /></div>
            <small>invites sent</small>
          </div>
          <div>
            <div className="row-between"><b>Registered</b><span className="rf-num">{stats.registered}</span></div>
            <div className="rf-bar"><div style={{ width: pct(stats.registered) + '%' }} /></div>
            <small>{pct(stats.registered)}% of invited</small>
          </div>
          <div>
            <div className="row-between"><b>Funded</b><span className="rf-num mint">{stats.funded}</span></div>
            <div className="rf-bar"><div style={{ width: pct(stats.funded) + '%' }} /></div>
            <small>{Math.round((stats.funded / stats.registered) * 100)}% of registered</small>
          </div>
        </div>
      </section>

      <section className="card card-pad rf-activity">
        <small className="eyebrow muted">Recent</small>
        <h3>Invite activity</h3>
        <div className="rf-list">
          {invites.map((i) => (
            <div className="rf-row" key={i.email}>
              <span className="rf-avatar">{i.letter}</span>
              <div>
                <strong>{i.email}</strong>
                <small>Invited {i.date}</small>
              </div>
              <span className="chip-status">{i.status}</span>
            </div>
          ))}
        </div>
        <p className="foot-note">Invitee addresses are masked here and are never shown in full — you invited them, but their account is theirs.</p>
      </section>
    </>
  )
}
