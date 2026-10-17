import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="logo dark-text">
          <span className="logo-hx">hx</span>
          <span className="logo-nexus">nexus</span>
          <span className="logo-dot" />
        </div>
        <h1>Trader sign-in</h1>
        <p className="subtitle">Sign in to your HX Nexus trader workspace.</p>

        <label>Email</label>
        <input type="email" defaultValue="dana.reyes@hxnexus.com" required />
        <label>Password</label>
        <input type="password" defaultValue="nexus-demo-8" required />

        <button className="btn primary full" type="submit">Sign in</button>
        <p className="login-foot">Broker-managed · Identity-bound · No trading incentives</p>
      </form>
    </div>
  )
}
