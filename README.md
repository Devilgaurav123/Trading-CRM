# Trader CRM Portal (Frontend)

A frontend-only replica of the HX Nexus trader portal, built as a home assignment for MTK IT Services LLC.
It focuses on layout, styling, components, navigation and responsiveness. There is **no backend and no API**;
all data is dummy data kept in the code.

**Live demo:** _add your Vercel / Netlify link here_

---

## Tech stack

- [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) for navigation
- [lucide-react](https://lucide.dev/) for icons
- Plain CSS (one stylesheet, CSS variables for the light and dark themes)

No UI library and no state library, to keep the code simple and easy to read.

---

## Getting started

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal (usually http://localhost:5173).

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Starts the development server        |
| `npm run build`   | Creates a production build in `dist` |
| `npm run preview` | Serves the production build locally  |

---

## Pages

| Route             | Page                                                              |
| ----------------- | ----------------------------------------------------------------- |
| `/login`          | Sign-in screen (any email and password work)                      |
| `/dashboard`      | Greeting, quick actions, account overview, balances, margin, points |
| `/accounts`       | Account summary and account cards by currency                     |
| `/transfer`       | Internal transfer between live accounts                           |
| `/open-account`   | Choose an account type and request it                             |
| `/fund`           | Cashier: deposit and withdraw request with live fee calculation   |
| `/statements`     | Statement archive with currency filter and downloads              |
| `/rewards`        | Challenges, reward catalogue, redemptions and points ledger       |
| `/games`          | Prediction arena with leaderboard                                 |
| `/referrals`      | Invite code, share links and invite activity                      |
| `/support`        | Tickets, live chat and announcements                              |
| `/onboarding`     | Onboarding progress and steps                                     |
| `/profile`        | Contact details, security and notification preferences            |

### Things that work

- **Light and dark mode** toggle in the top bar (the choice is remembered in the browser).
- **Responsive layout:** sidebar on desktop, bottom navigation and a "More" sheet on mobile.
- **Dashboard:** switching the account tab updates balance, equity, chart and margin; Chart / Activity toggle.
- **Open account:** pick Live or Demo, then send the request.
- **Fund:** choose the method, enter an amount, and see the fee and credited amount update.
  Amount limits are checked, and the Deposit / Withdraw tabs change the wording.
- **Transfer:** pick from and to accounts (same currency only), swap them, use quick amounts or Max,
  and confirm to update the balances shown on that page.
- **Statements:** All / EUR / USD filter. Download saves a small demo text file; "Generate PDF" opens the print dialog.
- **Games:** select another match to bring it into the arena, enter a prediction, and switch leaderboard tabs.
- **Referrals:** copy the code or link; Email, Message and WhatsApp open a pre-filled share.
- **Support:** search tickets, open a ticket, create a new ticket, and use the demo live chat.
- **Profile:** the two notification toggles work. The top-bar user chip and the sidebar user card open this page.

---

## Project structure

```
trader-crm/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json            # page refresh support on Vercel
├── public/
│   └── _redirects         # page refresh support on Netlify
└── src/
    ├── main.jsx           # app entry
    ├── App.jsx            # routes
    ├── data.js            # all dummy data (accounts, challenges, ledger...)
    ├── index.css          # all styles, light and dark themes
    ├── components/
    │   ├── Layout.jsx     # sidebar, top bar, mobile bottom nav, footer
    │   ├── PageHeader.jsx # eyebrow + title + subtitle block
    │   ├── LineChart.jsx  # small SVG line chart
    │   └── Donut.jsx      # percentage ring
    └── pages/             # one file per page
```

### Where to change things

- Dummy accounts, challenges and ledger entries: `src/data.js`
- Colours for light and dark mode: the CSS variables at the top of `src/index.css`
- Sidebar items: the `groups` list at the top of `src/components/Layout.jsx`

---

## Deployment

1. Push the project to a GitHub repository.
2. Import the repository on [Vercel](https://vercel.com) or [Netlify](https://netlify.com) and deploy.
   The default Vite settings work (build command `npm run build`, output folder `dist`).

`vercel.json` and `public/_redirects` are included so refreshing a page such as `/accounts` does not return a 404.

---

## Notes and assumptions

- The reference site needs a login, so the design was built from screenshots of its pages.
  The login page and a few details that were not visible in the screenshots (for example some older statement periods,
  extra account numbers and the mobile layouts of some pages) are my own best guess.
- The logo is text styled to look like the reference logo. Replace it with the real logo image if you have one.
- Everything is demonstration data. Nothing is sent anywhere, and changes (such as a confirmed transfer) are
  kept only on the page and are lost on refresh.
- Font: Plus Jakarta Sans (loaded from Google Fonts), chosen as a close match to the reference.
