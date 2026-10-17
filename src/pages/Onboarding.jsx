import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Donut from '../components/Donut.jsx'

const steps = [
  { title: 'Complete profile', text: 'Confirm contact details and preferred language.', done: true },
  {
    title: 'Identity verification', text: 'Submit broker-managed KYC documents for review.', done: true,
    extra: 'Identity verification is complete. Your broker will contact you if any further review is needed.',
  },
  { title: 'First deposit', text: 'Fund a live account through the cashier.', done: true },
  { title: 'Open trading account', text: 'Select an account type from the broker catalogue.', done: true },
]

export default function Onboarding() {
  const doneCount = steps.filter((s) => s.done).length
  const percent = Math.round((doneCount / steps.length) * 100)
  const allDone = doneCount === steps.length

  return (
    <>
      <PageHeader
        eyebrow="Onboarding"
        title={allDone ? "You're all set" : 'Finish your setup'}
        subtitle={allDone
          ? 'Every onboarding step is complete. Funding and account opening are available to you.'
          : 'Complete the remaining steps to unlock funding and account opening.'}
      >
        <Link to="/profile" className="btn light">Profile</Link>
      </PageHeader>

      <section className="card card-pad ob-progress">
        <div className="ob-progress-text">
          <small className="eyebrow muted">Progress</small>
          <h3>{doneCount} of {steps.length} steps complete</h3>
          <p className="muted-text">{allDone ? 'Nothing further is needed from you.' : 'Your broker reviews each step.'}</p>
          <div className="ob-bar"><div style={{ width: percent + '%' }} /></div>
          <p className="muted-text">{allDone ? 'All done' : `${steps.length - doneCount} to go`}</p>
        </div>
        <Donut percent={percent} size={96} stroke={8} />
      </section>

      <div className="ob-steps">
        {steps.map((s) => (
          <section className="card ob-step" key={s.title}>
            <span className="ob-check"><Check size={18} /></span>
            <div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
              {s.extra && <p className="ob-extra">{s.extra}</p>}
            </div>
            <span className={'status ' + (s.done ? 'active' : 'neutral')} style={{ marginTop: 0 }}>{s.done ? 'Complete' : 'To do'}</span>
          </section>
        ))}
      </div>

      <p className="foot-note">Steps are marked complete by your broker's review, not by this portal.</p>
    </>
  )
}
