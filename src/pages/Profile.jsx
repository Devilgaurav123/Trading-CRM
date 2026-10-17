import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Star } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

function Switch({ on, onChange, label }) {
  return (
    <button className={'switch' + (on ? ' on' : '')} role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}>
      <span />
    </button>
  )
}

export default function Profile() {
  const [product, setProduct] = useState(true)
  const [marketing, setMarketing] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="Dana"
        subtitle="Identity, security and contact preferences. Sensitive details stay masked in this CRM view."
      >
        <Link to="/onboarding" className="btn light">Onboarding</Link>
      </PageHeader>

      <section className="card pf-top">
        <div className="pf-who">
          <div className="avatar pf-avatar">D</div>
          <div>
            <strong>Dana</strong>
            <small>da***@hxnexus.com · en-AE</small>
          </div>
        </div>
        <span className="status active" style={{ marginTop: 0 }}>Multi-factor on</span>
      </section>

      <div className="pf-grid">
        <section className="card card-pad pf-card">
          <small className="eyebrow muted">Identity</small>
          <h3>Contact</h3>
          <div className="pf-rows">
            <div><span>Name on file</span><b>Dana</b></div>
            <div><span>Email</span><b>da***@hxnexus.com</b></div>
            <div><span>Locale</span><b>en-AE</b></div>
          </div>
          <p className="pf-note">
            Contact details are held by your broker. Changes go through <Link to="/support">support</Link>; identity documents live in <Link to="/onboarding">onboarding</Link>.
          </p>
        </section>

        <section className="card card-pad pf-card">
          <small className="eyebrow muted">Security</small>
          <h3>Sign-in protection</h3>
          <div className="pf-rows">
            <div><span>Multi-factor</span><span className="status active" style={{ marginTop: 0 }}>Enabled</span></div>
            <div><span>Active sessions</span><b>2</b></div>
          </div>
          <p className="pf-note">
            A session is one signed-in browser or device. If a count looks wrong, <Link to="/support">tell support</Link> — they can end sessions for you.
          </p>
        </section>

        <section className="card card-pad pf-card">
          <small className="eyebrow muted">Preferences</small>
          <h3>What we send you</h3>
          <div className="pf-rows pref">
            <div>
              <span className="soft-icon"><FileText size={16} /></span>
              <div><strong>Product updates</strong><small>Changes to the portal and your account tools</small></div>
              <Switch on={product} onChange={setProduct} label="Product updates" />
            </div>
            <div>
              <span className="soft-icon"><Star size={16} /></span>
              <div><strong>Marketing email</strong><small>Offers and programme news from your broker</small></div>
              <Switch on={marketing} onChange={setMarketing} label="Marketing email" />
            </div>
          </div>
          <p className="pf-note">Service messages about your money — funding, statements, security — are always sent and cannot be turned off.</p>
        </section>
      </div>
    </>
  )
}
