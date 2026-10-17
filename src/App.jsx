import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Accounts from './pages/Accounts.jsx'
import Fund from './pages/Fund.jsx'
import Rewards from './pages/Rewards.jsx'
import Transfer from './pages/Transfer.jsx'
import OpenAccount from './pages/OpenAccount.jsx'
import Support from './pages/Support.jsx'
import Games from './pages/Games.jsx'
import Statements from './pages/Statements.jsx'
import Referrals from './pages/Referrals.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/fund" element={<Fund />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/open-account" element={<OpenAccount />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/statements" element={<Statements />} />
        <Route path="/games" element={<Games />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/support" element={<Support />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
