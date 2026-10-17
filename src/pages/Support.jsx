import { useState } from 'react'
import { Plus, Minus, Send } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

function now() {
  return new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

const startTickets = [
  {
    id: 1, title: 'Withdrawal timing for bank transfer', category: 'Funding', status: 'Waiting For Broker',
    opened: 'Aug 11, 2026, 10:12 AM', updated: 'Aug 11, 2026, 3:40 PM', ref: 'tkt-2026-0811-a',
    messages: [
      { from: 'you', text: 'When should my bank-transfer withdrawal complete?', time: 'Aug 11, 2026, 10:12 AM' },
      { from: 'broker', text: 'The payment desk is reviewing it. We will update this ticket as soon as the bank reference is available.', time: 'Aug 11, 2026, 3:40 PM' },
    ],
  },
  {
    id: 2, title: 'MT5 mobile login guidance', category: 'Platform', status: 'Resolved',
    opened: 'Aug 5, 2026, 8:20 AM', updated: 'Aug 5, 2026, 9:05 AM', ref: 'tkt-2026-0805-b',
    messages: [
      { from: 'you', text: 'I cannot sign in to MT5 on my phone. Which server should I choose?', time: 'Aug 5, 2026, 8:20 AM' },
      { from: 'broker', text: 'Use the server name from your welcome email, then sign in with your trading login and password.', time: 'Aug 5, 2026, 9:05 AM' },
    ],
  },
]

const announcements = [
  { title: 'Support hours for 12 Aug 2026', text: 'Client support is available 07:00–19:00 UTC on weekdays. Payment review may take longer during settlement windows.', date: 'Aug 10, 2026, 9:00 AM', badge: 'Information' },
  { title: 'Document refresh recommended', text: 'If your address proof is older than 90 days, upload a fresh copy from Verification before requesting higher limits.', date: 'Aug 8, 2026, 11:30 AM', badge: 'Action Required' },
]

export default function Support() {
  const [tickets, setTickets] = useState(startTickets)
  const [selectedId, setSelectedId] = useState(1)
  const [search, setSearch] = useState('')
  const [newOpen, setNewOpen] = useState(false)
  const [form, setForm] = useState({ subject: '', category: 'Funding', message: '' })
  const [chatOpen, setChatOpen] = useState(false)
  const [chat, setChat] = useState([{ from: 'agent', text: 'Hi Dana, an agent is online. How can we help?' }])
  const [chatText, setChatText] = useState('')

  const selected = tickets.find((t) => t.id === selectedId)
  const shown = tickets.filter((t) => (t.title + t.category).toLowerCase().includes(search.toLowerCase()))
  const openCount = tickets.filter((t) => t.status !== 'Resolved').length

  function createTicket(e) {
    e.preventDefault()
    if (!form.subject.trim() || !form.message.trim()) return
    const time = now()
    const ticket = {
      id: Date.now(), title: form.subject, category: form.category, status: 'Waiting For Broker',
      opened: time, updated: time, ref: 'tkt-' + Date.now().toString().slice(-6),
      messages: [{ from: 'you', text: form.message, time }],
    }
    setTickets([ticket, ...tickets])
    setSelectedId(ticket.id)
    setForm({ subject: '', category: 'Funding', message: '' })
    setNewOpen(false)
  }

  function sendChat(e) {
    e.preventDefault()
    if (!chatText.trim()) return
    setChat((c) => [...c, { from: 'you', text: chatText }])
    setChatText('')
    setTimeout(() => {
      setChat((c) => [...c, { from: 'agent', text: 'Thanks for your message. An agent will reply here shortly.' }])
    }, 900)
  }

  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Help and announcements"
        subtitle="Live chat when agents are online, tickets when they are not, plus broker notices."
      />

      <div className="sp-pills">
        <span className="sp-pill"><b>{openCount}</b> open ticket{openCount === 1 ? '' : 's'}</span>
        <span className="sp-pill"><b>{announcements.length}</b> announcements</span>
        <span className="sp-pill online"><i className="dot green" /> <b>Online</b> live chat</span>
      </div>

      {/* ---------- Tickets ---------- */}
      <section className="card sp-board">
        <div className="sp-main">
          <div className="sp-inbox">
            <small className="eyebrow muted">Inbox</small>
            <small className="eyebrow muted">Search tickets</small>
            <input className="sp-search" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search tickets" />

            {shown.map((t) => (
              <button key={t.id} className={'sp-ticket' + (t.id === selectedId ? ' active' : '')} onClick={() => setSelectedId(t.id)}>
                <strong>{t.title}</strong>
                <small>{t.category} · {t.opened}</small>
                <span className="chip-status">{t.status}</span>
              </button>
            ))}
            {shown.length === 0 && <p className="muted-text sp-empty">No tickets match your search.</p>}
          </div>

          <div className="sp-detail">
            {selected ? (
              <>
                <small className="eyebrow muted">{selected.category}</small>
                <h3 className="sp-title">{selected.title}</h3>
                <span className="chip-status">{selected.status}</span>

                <div className="sp-meta">
                  <div><small className="tiny">OPENED</small><strong>{selected.opened}</strong></div>
                  <div><small className="tiny">UPDATED</small><strong>{selected.updated}</strong></div>
                  <div><small className="tiny">REFERENCE</small><strong>{selected.ref}</strong></div>
                </div>

                <div className="sp-messages">
                  {selected.messages.map((m, i) => (
                    <div key={i} className={'sp-msg ' + m.from}>
                      <small className="who">{m.from === 'you' ? 'YOU' : 'BROKER SUPPORT'}</small>
                      <p>{m.text}</p>
                      <small>{m.time}</small>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="muted-text">Select a ticket to read it.</p>
            )}
          </div>
        </div>

        <button className="sp-row-btn" onClick={() => setNewOpen(!newOpen)}>
          <span>New ticket</span>
          {newOpen ? <Minus size={16} /> : <Plus size={16} />}
        </button>
        {newOpen && (
          <form className="sp-form" onSubmit={createTicket}>
            <label>Subject</label>
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="What do you need help with?" />
            <label>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option>Funding</option><option>Platform</option><option>Account</option><option>Verification</option>
            </select>
            <label>Message</label>
            <textarea rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Describe the issue" />
            <button className="btn primary" type="submit">Send ticket</button>
          </form>
        )}
      </section>

      {/* ---------- Live chat ---------- */}
      <section className="card sp-chat">
        <button className="sp-row-btn dark-text" onClick={() => setChatOpen(!chatOpen)}>
          <span><i className={'tri' + (chatOpen ? ' open' : '')}>▶</i> Live chat</span>
        </button>
        {chatOpen && (
          <div className="sp-chat-body">
            <div className="chat-list">
              {chat.map((m, i) => (
                <div key={i} className={'chat-bubble ' + m.from}>{m.text}</div>
              ))}
            </div>
            <form className="chat-form" onSubmit={sendChat}>
              <input value={chatText} onChange={(e) => setChatText(e.target.value)} placeholder="Type a message" />
              <button className="btn primary" type="submit"><Send size={16} /></button>
            </form>
          </div>
        )}
      </section>

      {/* ---------- Announcements ---------- */}
      <div className="sp-notices">
        <small className="eyebrow muted">Notices</small>
        <h3>Announcements</h3>
        <section className="card">
          {announcements.map((a) => (
            <div className="sp-note" key={a.title}>
              <div>
                <strong>{a.title}</strong>
                <p>{a.text}</p>
                <small>{a.date}</small>
              </div>
              <span className="chip-status">{a.badge}</span>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}
