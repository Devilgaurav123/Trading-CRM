import { useState, useEffect } from 'react'
import { NavLink, Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutGrid, CreditCard, Banknote, FileText, Star, Gamepad2, Users,
  CircleHelp, Check, User, Bell, Globe, Sun, Moon, LogOut, ChevronDown, X,
} from 'lucide-react'

const groups = [
  { label: 'Overview', items: [{ to: '/dashboard', label: 'Dashboard', icon: LayoutGrid }] },
  {
    label: 'Money',
    items: [
      { to: '/accounts', label: 'Accounts', icon: CreditCard },
      { to: '/fund', label: 'Fund', icon: Banknote },
      { to: '/statements', label: 'Statements', icon: FileText },
    ],
  },
  {
    label: 'Engagement',
    items: [
      { to: '/rewards', label: 'Rewards', icon: Star },
      { to: '/games', label: 'Games', icon: Gamepad2 },
      { to: '/referrals', label: 'Referrals', icon: Users },
    ],
  },
  {
    label: 'Your account',
    items: [
      { to: '/support', label: 'Support', icon: CircleHelp },
      { to: '/onboarding', label: 'Onboarding', icon: Check },
      { to: '/profile', label: 'Profile', icon: User },
    ],
  },
]

// Items shown inside the mobile "More" sheet
const moreItems = [
  { to: '/statements', label: 'Statements', text: 'Reports and downloads', icon: FileText },
  { to: '/games', label: 'Games', text: 'Predictions and rankings', icon: Gamepad2 },
  { to: '/referrals', label: 'Referrals', text: 'Invite link and activity', icon: Users },
  { to: '/support', label: 'Support', text: 'Tickets and live chat', icon: CircleHelp },
  { to: '/onboarding', label: 'Onboarding', text: 'Finish account setup', icon: Check },
  { to: '/profile', label: 'Profile', text: 'Identity and preferences', icon: User },
]

const pageTitles = {
  '/dashboard': 'Dashboard', '/accounts': 'Accounts', '/transfer': 'Accounts', '/open-account': 'Accounts', '/fund': 'Fund', '/rewards': 'Rewards',
  '/statements': 'Statements', '/games': 'Games', '/referrals': 'Referrals',
  '/support': 'Support', '/onboarding': 'Onboarding', '/profile': 'Profile',
}

function Logo() {
  return (
    <div className="logo">
      <span className="logo-hx">hx</span>
      <span className="logo-nexus">nexus</span>
      <span className="logo-dot" />
    </div>
  )
}

export default function Layout() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [moreOpen, setMoreOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // close the More sheet and scroll to top when the page changes
  useEffect(() => {
    setMoreOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const title = pageTitles[location.pathname] || 'Dashboard'
  const moreActive = moreItems.some((i) => i.to === location.pathname)

  return (
    <div className="app">
      {/* ---------- Desktop sidebar ---------- */}
      <aside className="sidebar">
        <Link to="/dashboard"><Logo /></Link>

        <Link to="/profile" className="side-user" aria-label="Open profile">
          <div className="avatar">D</div>
          <div>
            <strong>Dana</strong>
            <span>Client ···rgan</span>
          </div>
        </Link>

        <nav>
          {groups.map((g) => (
            <div key={g.label}>
              <p className="side-label">{g.label}</p>
              {g.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    'side-link' + (isActive || (item.to === '/accounts' && ['/transfer', '/open-account'].includes(location.pathname)) ? ' active' : '')
                  }
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  <i className="side-dot" />
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="side-foot">
          <p>CRM Workspace</p>
          <span>Balances and funding are for account servicing. No dealing or order tools.</span>
        </div>
      </aside>

      {/* ---------- Main area ---------- */}
      <div className="main">
        <header className="topbar">
          <div className="topbar-title">
            <h2>{title}</h2>
            <button className="snapshot">
              <i /> Demo snapshot <ChevronDown size={12} />
            </button>
          </div>

          <div className="topbar-top">
            <div className="mini-logo">n</div>
            <div className="topbar-actions">
              <div className="theme-toggle">
                <button className={theme === 'light' ? 'on' : ''} onClick={() => setTheme('light')} aria-label="Light mode">
                  <Sun size={15} />
                </button>
                <button className={theme === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')} aria-label="Dark mode">
                  <Moon size={15} />
                </button>
              </div>

              <button className="chip-btn">
                <Globe size={17} />
                <span className="lang-full">English</span>
                <span className="lang-short">EN</span>
                <ChevronDown size={14} className="lang-full" />
              </button>

              <button className="chip-btn icon-only bell" aria-label="Notifications">
                <Bell size={18} />
                <b>2</b>
              </button>

              <Link to="/profile" className="chip-btn user-chip" aria-label="Open profile">
                <div className="avatar small">D</div>
                <div>
                  <strong>Dana</strong>
                  <span>Dana</span>
                </div>
              </Link>

              <button className="chip-btn signout" onClick={() => navigate('/login')}>
                <LogOut size={16} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>

        <footer className="app-footer">
          <span>HX Nexus trader workspace</span>
          <span>Broker-managed · Identity-bound · No trading incentives</span>
        </footer>
      </div>

      {/* ---------- Mobile bottom navigation ---------- */}
      <nav className="bottom-nav">
        <NavLink to="/dashboard"><LayoutGrid size={22} /><span>Home</span></NavLink>
        <NavLink
          to="/accounts"
          className={({ isActive }) => (isActive || ['/transfer', '/open-account'].includes(location.pathname) ? 'active' : '')}
        >
          <CreditCard size={22} /><span>Accounts</span>
        </NavLink>
        <NavLink to="/fund"><Banknote size={22} /><span>Fund</span></NavLink>
        <NavLink to="/rewards"><Star size={22} /><span>Rewards</span></NavLink>
        <button className={moreActive || moreOpen ? 'active' : ''} onClick={() => setMoreOpen(!moreOpen)}>
          <User size={22} /><span>More</span>
        </button>
      </nav>

      {/* ---------- Mobile "More" sheet ---------- */}
      {moreOpen && (
        <div className="sheet-backdrop" onClick={() => setMoreOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-head">
              <div>
                <p className="eyebrow muted">Workspace</p>
                <h2>More</h2>
              </div>
              <button className="close-btn" onClick={() => setMoreOpen(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>
            {moreItems.map((item) => (
              <NavLink key={item.to} to={item.to} className="sheet-item">
                <span className="sheet-icon"><item.icon size={20} /></span>
                <div>
                  <strong>{item.label}</strong>
                  <small>{item.text}</small>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
