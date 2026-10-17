// All dummy data lives here so the pages stay simple.

export function money(symbol, n) {
  const sign = n < 0 ? '-' : ''
  return (
    sign +
    symbol +
    Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  )
}

export const accounts = [
  {
    id: 'live-usd', name: 'Live USD', code: 'ACCT-LIVE-USD', platform: 'MT5', type: 'Live',
    currency: 'USD', symbol: '$', balance: 12450, equity: 12682, unrealised: 232,
    freeMargin: 9824, marginUsed: 2858, marginPct: 77, updated: '5 Oct, 12:09', color: 'green',
    chart: [10300, 12770, 10700, 12100, 12450],
  },
  {
    id: 'raw-usd', name: 'Raw Spread USD', code: 'ACCT-LIVE-USD-RAW', platform: 'MT5', type: 'Live',
    currency: 'USD', symbol: '$', balance: 1000, equity: 1012.4, unrealised: 12.4,
    freeMargin: 940, marginUsed: 72.4, marginPct: 93, updated: '5 Oct, 09:45', color: 'green',
    chart: [800, 1100, 900, 950, 1000],
  },
  {
    id: 'live-eur', name: 'Live EUR', code: 'ACCT-LIVE-EUR', platform: 'MT5', type: 'Live',
    currency: 'EUR', symbol: '€', balance: 820, equity: 824.2, unrealised: 4.2,
    freeMargin: 790, marginUsed: 34.2, marginPct: 96, updated: '5 Oct, 11:20', color: 'navy',
    chart: [600, 900, 700, 780, 820],
  },
  {
    id: 'demo-usd', name: 'Demo USD', code: 'ACCT-DEMO-USD', platform: 'MT5', type: 'Demo',
    currency: 'USD', symbol: '$', balance: 100000, equity: 100000, unrealised: 0,
    freeMargin: 100000, marginUsed: 0, marginPct: 100, updated: '5 Oct, 08:00', color: 'slate',
    chart: [98000, 101500, 99500, 100800, 100000],
  },
]

export const recentMovements = [
  { title: 'Deposit · Visa / Mastercard', date: 'Sep 29', amount: '+$1,500.00' },
  { title: 'Transfer to Raw Spread USD', date: 'Sep 18', amount: '-$1,000.00' },
  { title: 'Deposit · USDT (TRC-20)', date: 'Sep 8', amount: '+$2,000.00' },
]

export const challenges = [
  { id: 1, title: 'Secure your account', meta: 'Monthly · Ends 29 Oct', status: 'Active', text: 'Complete the broker security enrolment checklist.', done: '0 of 1', pct: 0, reward: 350, action: 'Continue', icon: 'user' },
  { id: 2, title: 'Learning week', meta: 'Weekly · Ends 21 Oct', status: 'Active', text: 'Finish two broker education modules this week.', done: '1 of 2', pct: 50, reward: 250, action: 'Continue', icon: 'game' },
  { id: 3, title: 'Ten-lot week', meta: 'Weekly · Ends 21 Oct', status: 'Active', text: 'Trade 10 eligible executed lots during this challenge window.', done: '4.25 of 10 lots', pct: 43, reward: 500, action: 'Continue', icon: 'swap' },
  { id: 4, title: 'Know your workspace', meta: 'Daily · Opens 19 Oct', status: 'Scheduled', text: 'Complete the broker platform orientation before it begins.', done: '0 of 1', pct: 0, reward: 'Direct reward', action: 'Preview', icon: 'game' },
]

export const catalogue = [
  { id: 1, title: 'Broker learning session', text: 'A one-to-one education session with the broker team.', cost: '1,000', inventory: '8', approval: 'Broker review', until: '27 Nov', status: 'Can Redeem' },
  { id: 2, title: 'Education resource pack', text: 'A broker-curated collection of learning materials.', cost: '750', inventory: 'Open', approval: 'Automatic', until: '26 Jan', status: 'Can Redeem' },
  { id: 3, title: 'Platform VPS credit', text: 'Three months of broker-hosted VPS for your MetaTrader terminal.', cost: '2,500', inventory: '3', approval: 'Broker review', until: '27 Dec', status: '1,050 Short' },
]

export const ledger = [
  { title: 'Redeemed Education resource pack', date: '11 Oct 2026, 18:47', points: -750 },
  { title: 'Completed identity verification', date: '8 Oct 2026, 18:47', points: 750 },
  { title: 'Completed broker education challenge', date: '4 Oct 2026, 18:47', points: 250 },
  { title: 'Completed broker profile checklist', date: '28 Sept 2026, 18:47', points: 1200 },
]
